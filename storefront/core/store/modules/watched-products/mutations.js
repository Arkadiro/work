import * as types from '../../mutation-types'

export default {
  /**
  * Add product to Watched
  * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
  */
  [types.WATCHED_ADD_ITEM] (state, { product }) {
    const record = state.itemsWatched.find(p => p.sku === product.sku)
    if (!record) {
      state.itemsWatched.push({
        ...product
      })
    }
  },
  [types.WATCHED_LOAD_ITEM] (state, storedItems) {
    state.itemsWatched = storedItems || []
  }
}
