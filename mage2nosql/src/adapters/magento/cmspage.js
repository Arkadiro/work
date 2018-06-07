'use strict';

let AbstractMagentoAdapter = require('./abstract');
const CacheKeys = require('./cache_keys');
const util = require('util');

class CmspageAdapter extends AbstractMagentoAdapter {


  getEntityType() {
    return 'cmspage';
  }

  getName() {
    return 'adapters/magento/CmspageAdapter';
  }

  getQuery() {
    return ['searchCriteria[filterGroups][0][filters][0][field]=is_active',
      'searchCriteria[filterGroups][0][filters][0][value]=1',
      'searchCriteria[filterGroups][0][filters][0][conditionType]=eq'].join('&');
  }

  getSourceData(context) {
    return this.api.cmsPages.list(this.getQuery());
  }

  getLabel(source_item) {
    return '[(' + source_item.id + ') ' + source_item.name + ']';
  }

  isFederated() {
    return false;
  }

  preProcessItem(item) {
    return new Promise((function (done, reject) {
      if(item) {
        logger.debug(item);
        const key = util.format(CacheKeys.CACHE_KEY_CMSPAGE, item.id);
        logger.debug(util.format('Storing cms page to cache under: %s', key));
        this.cache.set(key, JSON.stringify(item));
        // store the item into local redis cache
      }
      return done(item);
    }).bind(this));

  }

  /**
   * We're transorming the data structure of item to be compliant with Smile.fr Elastic Search Suite
   * @param {object} item  document to be updated in elastic search
   */
  normalizeDocumentFormat(item) {
    return item;
  }

}

module.exports = CmspageAdapter;
