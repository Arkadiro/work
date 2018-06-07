import * as types from '../../mutation-types'
import { quickSearchByQuery } from 'core/lib/search'
import builder from 'bodybuilder'
export default {
  /**
  * Load the cmspages
  */
  list (context, {entityType = 'cmspage'}) {
    if (context.state.list.length > 0) {
      console.info('CMS pages served from local memory')
      return new Promise((resolve, reject) => {
        resolve({items: context.state.list})
      })
    } else {
      return quickSearchByQuery({query: builder(), entityType}).then((resp) => {
        context.commit(types.CMSPAGE_UPD_CMSPAGES, resp)
        return resp
      }).catch(function (err) {
        console.error(err)
      })
    }
  }

}
