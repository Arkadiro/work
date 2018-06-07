'use harmony';

const CommandRouter = require('command-router');
const cli = CommandRouter();

const config = require('config');
const mapping = require('../config/category_index_mapping');
const es = require('../src/lib/elastic');
const kue = require('kue');
const request = require('request');

let els = require('elasticsearch');
let queue = kue.createQueue(config.kue);
let client = new els.Client({
    host: config.esHost,
    log: 'debug',
    apiVersion: '5.5',
    requestTimeout: 1000 * 60 * 60,
    keepAlive: false
});

const originalIndex = config.esIndexes[1];
const tempIndex = originalIndex + '_' + Math.round(+new Date() / 1000);

let job = null;
let totalCount = 0;

cli.command('full', () => {
    job = queue.createJob('sync_categories', {
        title: 'Full reindex categories job ' + new Date(),
        receivedAt: new Date()
    }).save();

    job.active().save();

    client.indices.create(
        {
            "index": tempIndex,
            "body": mapping
        }
    ).then(res => {
        getToken()
            .then(result => {
                    let token = result.access_token;
                    return syncCategories(token);
                },
                reject => {
                    job.data.error = reject;
                    job.failed().save();
                    process.exit(1);
                });

    }).catch(err => {
        job.data.error = err
        console.log("ERROR: " + err);
        job.failed().save();
        process.exit(1);
    });
});

function getToken() {
    let key = Buffer.from(config.productsWorker.pim.client + ':' + config.productsWorker.pim.secret).toString('base64');
    return new Promise(function (resolve, reject) {
        request({
            url: 'http://' + config.productsWorker.pim.host + '/api/oauth/v1/token',
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Authorization": 'Basic ' + key
            },
            json: true,
            body: {
                "grant_type": "password",
                "username": config.productsWorker.pim.username,
                "password": config.productsWorker.pim.password
            }
        }, function (error, response, body) {
            if (error || !body.access_token) {
                reject(error);
            }
            resolve(body);
        });
    });
}

function syncCategories(token, url = null) {
    let startUrl = 'http://' + config.productsWorker.pim.host + '/api/rest/v1/categories?limit=100&page=1';
    url = url || startUrl;
    request({
        url: url,
        method: 'GET',
        json: true,
        headers: {
            "Authorization": 'Bearer ' + token
        }
    }, function (error, response, body) {
        if (error) {
            job.data.error = error;
            job.failed().save();
            process.exit(1);
        }
        let bulk = Array();
        let items = body._embedded.items;
        items.forEach(function (item) {
            delete item._links;
            bulk.push(
                {
                    index: {
                        _index: tempIndex,
                        _type: 'pim_catalog_category'
                    }
                }
            );
            bulk.push(item);
        });

        sendBulk(bulk)
            .then(result => {
                    if (body._links.hasOwnProperty('next')) {
                        let next = body._links.next.href;
                        syncCategories(token, next);
                    }
                    else {
                        createAlias();
                    }
                },
                reject => {
                    job.data.error = reject;
                    job.failed().save();
                    process.exit(1);
                });

    });

}

function sendBulk(bulk) {
    return new Promise(function (resolve, reject) {
        client.bulk({
            body: bulk,
        }, function (error, response) {
            if (error) {
                reject(error);
            }
            totalCount += bulk.count;

            resolve(response);
        });
    });
}

function createAlias() {
    es.deleteIndex(client, originalIndex, function (err) {
        if (err) {
            console.log(err);
        }

        es.putAlias(client, tempIndex, originalIndex, function (err) {
            if (err) {
                job.data.error = err;
                job.failed().save();
                process.exit(1);
            }
            job.data.count = totalCount;
            job.complete().save();
            process.exit(0);
        });
    });
}

cli.on('notfound', (action) => {
    console.error("*************************************************************");
    console.error("Command not found. Try this:");
    console.error("'yarn sync-categories full'");
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
