'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf') // 生产和开发环境通用的基础 webpack 配置
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝插件
// html-webpack-plugin 自动为html引入css,js，并加上一些hash值等
const HtmlWebpackPlugin = require('html-webpack-plugin') // 动态生成 html 插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')  // 能够获取一个可用的随机端口号

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//合并基础配置加载器的配置部分
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 为 .vue 文件意外的独立样式文件配置加载器
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // 在开发攻击的控制台中显示信息，便于开发调试，你可以将参数配置成 "none" 来进行关闭
    clientLogLevel: "warning",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html")
        }
      ]
    },
    hot: true, // 启用项目热刷新
    contentBase: false, // since we use CopyWebpackPlugin. 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。这里禁用，因为配置了 CopyWebpackPlugin 的使用
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser, // 是否自动打开浏览器
    overlay: config.dev.errorOverlay // 当有错误或则警告的时候在页面上显示一个全屏的遮罩提示
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, //此路径下的打包文件可在浏览器中访问
    proxy: config.dev.proxyTable, //代理API的请求
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    new webpack.HotModuleReplacementPlugin(), //启用热替换模块(Hot Module Replacement)，也被称为 HMR
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update. 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
    new webpack.NoEmitOnErrorsPlugin(), // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html", // 生成 html 文件的文件名。默认为 index.html.
      template: "index.html", //根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是 html, jade, ejs, hbs, 等等，但是要注意的是，需要提前安装对应的 loader， 否则webpack不能正确解析。
      inject: true // script 标签位于body底部
    }),
    // copy custom static assets
    // 拷贝自定义的静态资源文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.dev.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ]
});
// 实例一个异步对象，执行 devWebpackConfig 配置编译
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port //设置基础端口
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      // 如果进行 e2e 测试，需要发布新端口
      process.env.PORT = port
      // add port to devServer config
      // 更新 devServer 的端口
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))
       //执行打包配置文件
      resolve(devWebpackConfig)
    }
  })
})
