module.exports = {

  magento: {
    url:  process.env.MAGENTO_URL || 'http://m2.test.trg.kt-team.de/rest',
    consumerKey: process.env.MAGENTO_CONSUMER_KEY || 'fo75fvbohsyhbv2sl1jxnrhwwc6xfqmj',
    consumerSecret: process.env.MAGENTO_CONSUMER_SECRET || '2e5hut9vo2mpogeyr8edm28o1qiurbux',
    accessToken: process.env.MAGENTO_ACCESS_TOKEN || 'oepkpicxn22oxyyhahvqt1mah6v48hep',
    accessTokenSecret: process.env.MAGENTO_ACCESS_TOKEN_SECRET || '4fp0jy4cgdhp57i8p00wshg0jmu5px23'
  },

  kue: {}, // default KUE config works on local redis instance

  db: {
    /*    driver: 'mongo',
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/rcom' */

    driver: 'elasticsearch',
    url: process.env.DATABASE_URL || 'http://localhost:9200',
    indexName: 'vue_storefront_catalog'
  },

  redis: {
    host: '127.0.0.1',
    port: 6379
  },

  passport: {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
      session: false
    }
  }

}