import * as types from '../../mutation-types'
import { entityKeyName } from 'core/lib/entities'
import EventBus from 'core/plugins/event-bus'

export default {
  [types.CATEGORY_UPD_CURRENT_CATEGORY] (state, category) {
    state.current = category
    EventBus.$emit('category-after-current', { category: category })
  },
  [types.CATEGORY_UPD_CURRENT_CATEGORY_PATH] (state, path) {
    state.current_path = path // TODO: store to cache
  },
  [types.CATEGORY_UPD_CURRENT_CATEGORY_CHILDS] (state, categories) {
    state.currentChilds = categories.items
  },
  [types.CATEGORY_UPD_ROOT_CATEGORY_CHILDS] (state, categories) {
    state.rootChilds = categories.items
  },
  [types.CATEGORY_UPD_CATEGORIES] (state, categories) {
    state.list = categories.items
    const catCollection = global.db.categoriesCollection
    for (let category of state.list) {
      try {
        catCollection.setItem(entityKeyName('slug', category.slug.toLowerCase()), category).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by slug
        catCollection.setItem(entityKeyName('id', category.id), category).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by id
      } catch (e) {
        console.error(e)
      }
    }
  }
}
