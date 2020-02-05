## 标签管理系统 单页路由

> 技术站：vue+router+element-ui+vuex

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
```


```
    增加页面 components文件夹下
    commons ==》公共文件
    其他文件，渲染页面组建
    header，Main，menu公共组建

    js 文件下 events-bus 事件总线

    router 文件下 路由配置

    server 文件下 接口方法

    store 文件下index.js vuex引入
    /modules/user.js 各组建间公共组建字段及方法配置

    element-ui  编辑下拉框选中展现之前的内容 必须是Number传入

    一个页面很多组建创建一个公用stroe
    多个页面创建多个store 
    ****这次项目中把所有的数据放在一个store里，左边切换菜单的时候原先页面的数据不会刷新，会有问题需要额外操作
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
