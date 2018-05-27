## 使用vue构建cnode中文网

> 用vue全家桶写的一个cnode社区，主要是用来学会vue的使用以及注意事项等，并且组内已经在使用vue了，所以后面将会对vue做一些总结，以及研究vue的实现原理，而不是仅仅停留在会用的状态，不然多没意思啊。
  对框架的态度，如果项目中有用到，研究透它。如果没有用到，学会使用它即可

## 技术栈

* vue 
* vuex
* vue-router
* axios
* es6 
* vue-cli

## 使用方法

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
## 完成功能

[x] get /topics 主题首页
[x] get /topic/:id 主题详情
[x] post /topics 新建主题
[x] post /topics/update 编辑主题 
[x] post /topic/:topic_id/replies 新建评论
[x]post /reply/:reply_id/ups 为评论点赞
[] get /topic_collect/:loginname 用户所收藏的主题
[] post /topic_collect/collect 收藏主题
[] post /topic_collect/de_collect 取消收藏

用户
[x] get /user/:loginname 用户详情
[x] get /messages 获取已读和未读消息
[x] get /message/count 获取未读消息数
[] post /message/mark_all 标记全部已读
[] post /message/mark_one/:msg_id 标记单个消息为已读

参考： https://github.com/soulcm/vue-cnode-mobile


## 零碎知识点

1. package.json里面  加个 --open可以自动打开浏览器

  `"dev": "webpack-dev-server --inline --open --progress --config build/webpack.dev.conf.js"`

2. [如何在Github Pages搭建自己写的页面？](https://www.cnblogs.com/lijiayi/p/githubpages.html)

3. 快速删除 node_modules文件夹
  `npm install -g rimraf` 然后 `rimraf node_modules`

## vue知识点

1. vue的生命周期
  beforeCreate: 组件实例刚刚被创建,组件属性计算之前, el 和 data 并未初始化 
  created: 组件实例创建完成,属性已绑定,但是DOM还未完成,$el属性还不存在，完成了 data 数据的初始化，el没有
  beforeMount:模板编译/挂载之前，完成了 el 和 data 初始化 
  mounted: 模板编译/挂载之后
  beforeUpdate: 组件更新之前
  updated: 组件更新之后
  activated: for keep-alive,组件被激活时调用
  deactivated: for keep-alive,组件被移除时调用
  beforeDestroy: 组件销毁前被调用，实例仍然完全可用
  destoryed: 组件销毁后调用，实例不可用


2. vue组件之间的通信

  * 父组件传递数据给子组件

父组件：
```javascript
<parent>
  <child :child-msg="msg"></child> //这里必须要用 - 代替驼峰
</parent>

data(){
  return {
    msg: [1,2,3]
  };
}
```

子组件通过props来接收数据: 

```javascript
  props: ['childMsg']
```
  或者

```javascript
  childMsg: {
    type: Array,
    default: [0,0,0] // 指定默认的值
  }
 ```

  * 子组件与父组件通信
```javascript
// 子组件:
<template>
  <div @click="someFn"></div>
</template>

methods: {
  someFn() {
    this.$emit('sonFn','123'); // 主动触发sonFn方法，'123'为向父组件传递的数据
  }
}
```
```javascript
// 父组件
<div>
  <child @sonFn="change" :msg="msg"></child> //监听子组件触发的sonFn事件,然后调用change方法
</div>
methods: {
    change(msg) {
        this.msg = msg;
    }
}
```

* 子组件向子组件通信
vue没有这方面的通信，可以通过vuex，或者子组件传给给父组件，再由父组件传给子组件来实现，即弄一个中间件来过渡

 * keep-alive用法
 keep-alive 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。尤其是用在一些tab切换上，很有用
 http://www.cnblogs.com/tugenhua0707/p/8076245.html?utm_source=tuicool&utm_medium=referra

3. ref：相当于更好的访问dom。
```javascript
<div id="app">
    <navbar ref="navbar"></navbar>
    <pagefooter ref="pagefooter"></pagefooter>
</div>

new Vue({
    el:'#app',
    mounted:function () {
        console.log(this.$refs.navbar.navs);
        console.log(this.$refs.pagefooter.footer);
    }
})
```

4.  slot-scope 相当于子组件把可以替换的地方的数据传了过来，具体怎样显示由父组件决定
```javascript
<template>
  <div class="father">
    <h3>这里是父组件</h3>
    <!--第一次使用：用flex展示数据-->
    <child>
      <template slot-scope="user">
        <div class="tmpl">
          <span v-for="item in user.data">{{item}}</span>
        </div>
      </template>

    </child>

    <!--第二次使用：用列表展示数据-->
    <child>
      <template slot-scope="user">
        <ul>
          <li v-for="item in user.data">{{item}}</li>
        </ul>
      </template>

    </child>

    <!--第三次使用：直接显示数据-->
    <child>
      <template slot-scope="user">
       {{user.data}}
      </template>

    </child>

    <!--第四次使用：不使用其提供的数据, 作用域插槽退变成匿名插槽-->
    <child>
      我就是模板
    </child>
  </div>
</template>
```

```javascript
<template>
  <div class="child">

    <h3>这里是子组件</h3>
    // 作用域插槽
    <slot  :data="data"></slot>
  </div>
</template>

 export default {
    data: function(){
      return {
        data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
      }
    }
}
```

5. .async修饰符
.sync 修饰符: 当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。一般用于子组件和父组件有通信的情况
demo：
```javascript
<template>
    <div class="details">
        <myComponent :show.sync='valueChild' style="padding: 30px 20px 30px 5px;border:1px solid #ddd;margin-bottom: 10px;"></myComponent>
        <button @click="changeValue">toggle</button>
    </div>
</template>
<script>
import Vue from 'vue'
Vue.component('myComponent', {
      template: `<div v-if="show">
                    <p>默认初始值是{{show}}，所以是显示的</p>
                    <button @click.stop="closeDiv">关闭</button>
                 </div>`,
      props:['show'],
      methods: {
        closeDiv() {
          this.$emit('update:show', false); //触发 input 事件，并传入新值
        }
      }
})
export default{
    data(){
        return{
            valueChild:true,
        }
    },
    methods:{
        changeValue(){
            this.valueChild = !this.valueChild
        }
    }
}
</script>

```

## webpack配置

1. 优化css 
`optimize-css-assets-webpack-plugin`

2. 删除文件 
`clean-webpack-plugin`

3. 全局定义模块
```javascript
new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Vue: ['vue', 'default'],
  Vuex: ['vuex', 'default']
}),
```
4. extract-text-webpack-plugin 
所有样式，包括 chunk 的样式，打包都 [name].css 文件内
new ExtractTextPlugin({ filename: '[name].css', allChunks: true })


## css step()
看这篇文章：
https://segmentfault.com/a/1190000007042048


<span style="diaplay:none;"> "1654f40d-ffc9-4e0a-8ce2-c08f6d773fe4" </span>


vue-cli 中webpack配置学习： https://bailinlin.github.io/2018/05/07/vue-cli-webpack/
上次学习到：webpack.prod.conf.js



