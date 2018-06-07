'use harmony';

const CommandRouter = require('command-router');
const cli = CommandRouter();

const config = require('config');
const mapping = require('../config/product_index_mapping');
const es = require('../src/lib/elastic');
const kue = require('kue');

let els = require('elasticsearch');
let queue = kue.createQueue(config.kue);
let client = new els.Client({
    host: config.esHost,
    log: 'debug',
    apiVersion: '5.5',
    requestTimeout: 1000 * 60 * 60,
    keepAlive: false
});


cli.command('refresh', () => {
    kue.Job.rangeByType('sync_products', 'complete', -1, -1, 'asc', function (err, jobs) {
        if(!!jobs[0]) {
            let lastScheduled = jobs[0].data.receivedAt;
            refreshIndex(lastScheduled);
        }
        else {
            console.log('Run full reindex first!');
        }
    });
});

function refreshIndex(dateStart) {
    let timeStart = new Date();
    const job = queue.createJob('sync_products', {
        title: 'Products update received on ' + new Date(),
        receivedAt: new Date(),
        dateStart: dateStart
    }).save();
    job.active().save();

    client.reindex({
        waitForCompletion: true,
        body: {
            "conflicts": "proceed",
            "source": {
                "remote": {
                    "host": "http://" + config.productsWorker.pimElastic
                },
                "query": {
                    "range": {
                        "updated": {
                            "gte": dateStart,
                            "lte": timeStart
                        }
                    }
                },
                "sort": {"created": "desc", "updated": "desc"},
                "index": "akeneo_pim_product",
                "type": "pim_catalog_product",
                "_source": [
                    "id",
                    "identifier",
                    "associations",
                    "values",
                    "categories",
                    "label",
                    "enabled",
                    "family",
                    "created",
                    "updated"
                ]
            },
            "dest": {
                "index": config.esIndexes[2],
                "type": "pim_catalog_product",
                "version_type": "external"
            },
            "script": {
                "inline": "ctx._source.created_at = ctx._source.remove(\"created\"); ctx._source.sku = ctx._source.remove(\"identifier\")"
            }
        }
    }).then(res => {
        let timeEnd = new Date() - timeStart;

        job.data.total = res.total;
        job.data.updated = res.updated;
        job.data.created = res.created;
        job.data.deleted = res.deleted;
        job.data.exectionTime = timeEnd;
        job.complete().save();
        process.exit(0);
    }).catch(err => {
        console.log(err);
        job.data.error = err;
        job.failed().save();
        process.exit(1);
    });
}

cli.command('full', () => {
    const job = queue.createJob('sync_products', {
        title: 'Full reindex job ' + new Date(),
        receivedAt: new Date()
    }).save();

    const originalIndex = config.esIndexes[2];
    const tempIndex = originalIndex + '_' + Math.round(+new Date() / 1000);

    job.active().save();

    client.indices.create(
        {
            "index": tempIndex,
            "body": mapping
        }
    ).then(res => {
        client.reindex({
            waitForCompletion: true,
            body: {
                "conflicts": "proceed",
                "source": {
                    "remote": {
                        "host": "http://" + config.productsWorker.pimElastic
                    },
                    "sort": {"created": "desc", "updated": "desc"},
                    "index": "akeneo_pim_product",
                    "type": "pim_catalog_product",
                    "_source": [
                        "id",
                        "identifier",
                        "associations",
                        "values",
                        "categories",
                        "label",
                        "enabled",
                        "family",
                        "created",
                        "updated"
                    ]
                },
                "dest": {
                    "index": tempIndex,
                    "type": "pim_catalog_product",
                    "version_type": "external"
                },
                "script": {
                    "inline": "ctx._source.created_at = ctx._source.remove(\"created\"); ctx._source.sku = ctx._source.remove(\"identifier\")"
                }
            }
        }).then(res2 => {
            job.data.total = res2.total;
            job.data.updated = res2.updated;
            job.data.created = res2.created;
            job.data.deleted = res2.deleted;

            es.deleteIndex(client, originalIndex, function (err) {
                if (err) {
                    console.log(err);
                }

                es.putAlias(client, tempIndex, originalIndex, function (err) {
                    if (err) {
                        console.log(err);
                        job.data.error = err;
                        job.failed().save();
                        process.exit(1);
                    }
                    job.complete().save();
                    process.exit(0);
                });
            });
        }).catch(err => {
            console.log(err);
            job.data.error = err;
            job.failed().save();
            process.exit(1);
        });
    }).catch(err => {
        job.data.error = err;
        job.failed().save();
        process.exit(1);
    });
});

cli.on('notfound', (action) => {
    console.error("*************************************************************");
    console.error("Command not found. Try this:");
    console.error(" 'yarn sync-products refresh' - refresh indexes by last scheduled time\n 'yarn sync-products full' - create new index and reindex all products\n");
    console.error("*************************************************************");
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('uncaughtException', function (exception) {
    console.error(exception);
});

cli.parse(process.argv);
