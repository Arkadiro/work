import * as types from '../../mutation-types'
import bodybuilder from 'bodybuilder'
import { quickSearchByQuery } from '../../../lib/search'

export default {
  /**
   * Load the cmsblocks
   */
  list (context, { entityType = 'cmsblock' }) {
    if (context.state.list.length > 0) {
      console.info('CMS blocks served from local memory')
      return new Promise((resolve, reject) => {
        resolve({ items: context.state.list })
      })
    } else {
      return quickSearchByQuery({ query: bodybuilder(), entityType }).then((resp) => {
        context.commit(types.CMSBLOCK_UPD_CMSBLOCKS, resp)
        return resp
      }).catch(function (err) {
        console.error(err)
      })
    }
  },
  single (context, { cmsBlockId }) {
    return context.state.list.find((e) => { return e.id.indexOf(parseInt(cmsBlockId)) >= 0 })
  }
}
