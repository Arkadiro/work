#!/usr/bin/env bash
function render_template() {
  eval "echo \"$(cat $1)\""
}

function generate_storefront {
  render_template storefront_local.json.tmpl > /repo/storefront/config/local.json
}
function generate_api {
  render_template api_local.json.tmpl > /repo/api/config/local.json
}
function generate_mage2nosql {
  render_template mage2nosql.local.js.tmpl > /repo/mage2nosql/src/config.js
}
$1