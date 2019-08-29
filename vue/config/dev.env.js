'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"https://aeroedge-wallet-testing.imagine-orb.com"',
  COINEY_URL: '"https://aeroedge-wallet-testing.imagine-orb.com"'
})
