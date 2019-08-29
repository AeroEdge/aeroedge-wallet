'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_URL: '"https://aeroedge-wallet-testing.imagine-orb.com"',
  COINEY_URL: '"https://aeroedge-wallet-testing.imagine-orb.com"',
  EXCHANGER_ID: '"sbi_vc"'
})
