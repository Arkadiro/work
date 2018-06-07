import { apiStatus } from '../../../lib/util';
import { Router } from 'express';

module.exports = ({ config, db }) => {

  let marketplaceApi = Router();

  marketplaceApi.get('/store/get', (req, res) => {

    if (!req.query.sellerId) {
      return apiStatus(res, 'sellerId is required', 500);
    }

    let request = require('request');

    request({
      url: config.magento2.api.url + 'all/V1/apptha/store/get?sellerId=' + req.query.sellerId,
      headers: { 'Authorization': 'Bearer ' + config.magento2.api.accessToken, 'Content-Type':'application/json'},
      method: 'GET',
      json: true
    }, function (error, response, body) {
      if (error) {
        apiStatus(res, error, 500)
      } else {
        apiStatus(res, body, 200)
      }
    })
  })

  marketplaceApi.put('/store/save', (req, res) => {
    let sellerData = req.body

    if (!sellerData.customer_id) {
      return apiStatus(res, 'customer_id" is required', 500);
    }

    let request = require('request');

    request({
      url: config.magento2.api.url + 'all/V1/apptha/store/save',
      headers: { 'Authorization': 'Bearer ' + config.magento2.api.accessToken, 'Content-Type':'application/json'},
      method: 'PUT',
      json: true,
      body: { store: sellerData }
    }, function (error, response, body) {
      if (error) {
        apiStatus(res, error, 500)
      } else {
        apiStatus(res, body, 200)
      }
    })
  })

  marketplaceApi.post('/registerseller', (req, res) => {
    let seller = req.body

    if (!seller.customer.email) {
      return apiStatus(res, 'email" is required', 500);
    }

    let request = require('request');

    request({
      url: config.magento2.api.url + 'all/V1/customers',
      headers: { 'Authorization': 'Bearer ' + config.magento2.api.accessToken, 'Content-Type':'application/json'},
      method: 'POST',
      json: true,
      body: { customer: seller.customer, password: seller.password }
    }, function (error, response, body) {
      if (error) {
        apiStatus(res, error, 500)
      } else {
        apiStatus(res, body, 200)
      }
    })
  })

  return marketplaceApi
}
