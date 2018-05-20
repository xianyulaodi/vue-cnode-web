'use strict'
const merge = require('webpack-merge') // 通过 webpack-merge 工具的“通用”配置，我们不必在环境特定的配置中重复代码
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
