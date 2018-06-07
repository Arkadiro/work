import * as types from '../../mutation-types'

export default {
  clear (context) {
    context.commit(types.WATCHED_LOAD_ITEM, [])
  },
  load (context) {
    const commit = context.commit
    global.db.watchedCollection.getItem('watched-history', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.WATCHED_LOAD_ITEM, storedItems)
    })
  },
  addItem (context, product) {
    const commit = context.commit
    if (context.state.itemsWatched.length < 50) {
      commit(types.WATCHED_ADD_ITEM, { product })
    }
  }
}
