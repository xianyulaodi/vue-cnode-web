# vue-cnode-web

> use vue faimly to rebuild cnode webside

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 使用vue构建cnode中文网

  技术栈： vue、vuex、vue-router、axios、element-ui


  可以参考这个项目： https://github.com/soulcm/vue-cnode-mobile

  package.json里面  加个 --open可以自动打开浏览器

  `"dev": "webpack-dev-server --inline --open --progress --config build/webpack.dev.conf.js"`


  [如何在Github Pages搭建自己写的页面？](https://www.cnblogs.com/lijiayi/p/githubpages.html)

  1. 快速删除 node_modules文件夹
  `npm install -g rimraf` 然后 `rimraf node_modules`

  登录： myAccessToken: "1654f40d-ffc9-4e0a-8ce2-c08f6d773fe4"



[x] get /topics 主题首页
[x] get /topic/:id 主题详情
[x] post /topics 新建主题
[] post /topics/update 编辑主题
[] post /topic_collect/collect 收藏主题
[] post /topic_collect/de_collect 取消主题
[] get /topic_collect/:loginname 用户所收藏的主题
[] post /topic/:topic_id/replies 新建评论
[x]post /reply/:reply_id/ups 为评论点赞


用户
[] get /user/:loginname 用户详情
[x] get /messages 获取已读和未读消息
[x] get /message/count 获取未读消息数
[] post /message/mark_all 标记全部已读
[] post /message/mark_one/:msg_id 标记单个消息为已读