// if you need to have BABEL applied to extensions inside node_modules
// (by default excluded from BABEL) please add ".js" file ext inside require

export default [
  require('droppoint-shipping/index.js'),
  require('google-analytics/index.js'),
  require('mailchimp-subscribe/index.js'),
  require('payment-backend-methods/index.js'),
  require('payment-cash-on-delivery/index.js'),
  require('template/index.js'),
  require('marketplace/index.js')
]
