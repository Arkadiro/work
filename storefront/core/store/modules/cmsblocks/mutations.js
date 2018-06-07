import * as types from '../../mutation-types'
import { entityKeyName } from '../../../lib/entities'

export default {
  [types.CMSBLOCK_UPD_CMSBLOCKS] (state, cmsBlocks) {
    const cache = global.db.elasticCacheCollection
    for (let tc of cmsBlocks.items) { // we store each product separately in cache to have offline acces for products/single method
      const cacheKey = entityKeyName('tc', tc.id)
      cache.setItem(cacheKey, tc).catch((err) => { console.error('Cannot store cache for ' + cacheKey + ', ' + err) })
    }
    state.list = cmsBlocks.items // extract fields from ES _source
  }
}
