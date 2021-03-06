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

## watch 和 computed 的区别
computed 计算属性只有在相关的数据发生变化时才会改变要计算的属性，当相关数据没有变化是，它会读取缓存。
而motheds方法 和 watch 方法是的每次都去执行函数。
如果需要执行一些异步操作，或者开销比较大的操作，那么 watch还是比较好用的

官方文档：
computed vs method
计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。


## Vue.nextTick()
作用：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

也就是说，数据更新了，但是dom还没更新，此时你想操作dom，则用此方法，则可以等到dom更新后，执行你的操作

使用例子：
```javascript
new Vue({
  el: '#app',
  data: {
    list: []
  },
  mounted: function () {
    this.get()
  },
  methods: {
    get: function () {
      this.$http.get('/api/article').then(function (res) {
        this.list = res.data.data.list
        // ref  list 引用了ul元素，我想把第一个li颜色变为红色
        this.$refs.list.getElementsByTagName('li')[0].style.color = 'red'
      })
    },
  }
})
```
我想给第一li更改颜色，但在执行这段代码时，ul下面并没有li，也就是说当前并没有引起视图层的更新。
在这样的情况下，vue给我们提供了$nextTick方法，如果我们想对未来更新后的视图进行操作，我们只需要把要执行的函数传递给this.$nextTick方法，vue就会给我们做这个工作。

原理：
可以看这篇，写的不错，https://juejin.im/entry/595e48705188250d914dd32c#comment
主要是用事件队列，Vue 在内部尝试对异步队列使用原生的setImmediate Promise.then和MessageChannel，如果当前执行环境不支持，就采用setTimeout(fn, 0)代替


## v-model原理

```javascript
// v-model相当于
<input v-bind:value="something" v-on:input="something=$event.target.value">

// vue中的实现
// 父组件：
// 要让model生效，必须接受一个value,在有新的value时，触发input事件
<a-input :value.sync="text" ></a-input>

// 子组件
<template>
 <div>
    <input v-model="currentValue" @input="handleModelInput">
 </div>
</template>
<script>
 export default {
  props: { 
    value: [String,Number,Date],
  },
  methods: {
    handleModelInput() {
      this.$emit("update:value", this.currentValue);
    }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    }
</script>
```  
vue数据双向绑定是通过数据劫持结合发布者-订阅者模式的方式来实现的
数据劫持主要是通过Object.defineProperty()来实现
主要通过Object.defineProperty()的get方法和set方法
通过Object.defineProperty( )对属性设置一个set函数，当数据改变了就会来触发这个函数


## Vue 项目里戳中你痛点的问题及解决办法
文章链接： https://juejin.im/post/5b174de8f265da6e410e0b4e


vue-cli 中webpack配置学习： https://bailinlin.github.io/2018/05/07/vue-cli-webpack/
上次学习到：webpack.prod.conf.js

## vue源码以实现原理
![](https://user-gold-cdn.xitu.io/2018/5/21/16382dd265b21a7d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

vent & v-model: 事件和v-model的实现原理
template原理
slot & keep-alive: 内置组件的实现原理
transition: 过渡的实现原理
vue-router: 官方路由的实现原理
vuex: 官方状态管理的实现原理


Vue中Compile过程说

双飞翼布局怎么保证三列的高度一致呢？
双飞翼布局具体怎么实现的？
假设用flex实现双飞翼布局，让三列等高？

https://juejin.im/post/5b08d234f265da0dda38ceea  这些问题过一过，学一学