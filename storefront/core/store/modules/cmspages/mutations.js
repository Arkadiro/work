import * as types from '../../mutation-types'
import { entityKeyName } from 'core/lib/entities'

export default {
  [types.CMSPAGE_UPD_CMSPAGES] (state, cmsPages) {
    const cache = global.db.cmspagesCollection
    for (let tc of cmsPages.items) { // we store each product separately in cache to have offline acces for products/single method
      const cacheKey = entityKeyName('tc', tc.id)
      cache.setItem(cacheKey, tc).catch((err) => {
        console.error('Cannot store cache for ' + tc.id + ', ' + err)
      })
    }
    state.list = cmsPages.items // extract fields from ES _source
  }
}
