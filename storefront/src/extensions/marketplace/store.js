import config from 'config'

const state = {
}

const getters = {
}

// actions
const actions = {
  storeGet (context, sellerId) {
    return fetch(config.marketplace.endpoint + '/marketplace/store/get?sellerId=' + sellerId, {
      method: 'GET'
    }).then(resp => { return resp.json() })
  },

  storeUpdate (context, sellerData) {
    return fetch(config.marketplace.endpoint + '/marketplace/store/save', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      json: true,
      body: JSON.stringify(sellerData)
    }).then(resp => { return resp.json() })
  },

  registerSeller (context, seller) {
    return fetch(config.marketplace.endpoint + '/marketplace/registerseller', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      json: true,
      body: JSON.stringify(seller)
    }).then(resp => { return resp.json() })
  }
}

// mutations
const mutations = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
