# seat-select (vue移动端座位选择)

![](https://github.com/zenghao0219/files-store/blob/master/seats/process1.png?raw=true)


![](https://img.shields.io/github/stars/zenghao0219/seat-select.svg?style=social)
![](https://img.shields.io/github/forks/zenghao0219/seat-select.svg?style=social)
![](http://progressed.io/bar/100?title=completed)
![](https://img.shields.io/badge/language-vue-green.svg)
![](https://img.shields.io/github/package-json/dependency-version/zenghao0219/seat-select/vue.svg)
![](https://img.shields.io/github/license/zenghao0219/seat-select.svg)
![](https://img.shields.io/github/release/zenghao0219/seat-select.svg)

### 座位图体系项目导航

- [移动端 seat-select](https://github.com/zenghao0219/seat-select)

- [后台控制端 seat-select-controller](https://github.com/zenghao0219/seat-select-controller)

- [数据接口端 seat-select-api](https://github.com/zenghao0219/seat-select-api)

- [座位JSON结构解析](https://github.com/zenghao0219/seat-select/tree/master/public/mock)


> if this project is useful to you :D , Please star this project~
>
> 如果这个项目对你有帮助 :D 请点个star吧~

> [点击这里demo预览(请使用手机访问)](https://zenghao0219.github.io/seat-select-demo/ "请使用手机访问")
>
> 此次项目是基于vue编写的类似淘票票和猫眼的电影`移动端`锁座页面,经过超过百个影厅的测试,其中包含功能
>
> - 座位图生成
> - 座位预览图生成
> - 座位`留空`检测
> - 座位智能选择`最优座位`算法
> - 自适应影厅大小
> - 座位图左侧导航栏的过道检测
> - 普通座位的选择逻辑
> - 情侣座位的选择逻辑
#### 项目截图

<img src="https://github.com/zenghao0219/files-store/blob/master/seats/demo.jpg?raw=true" width="200" hegiht="300"/>

#### 之后的计划

- 文档补全,功能实现解析
- ~~后台控制端,可以编辑座位图提供接口生成座位图JSON(2019.06.03开发完成,参考项目导航)~~

### 赞助者名单
首先特别感谢赞助者的所有朋友们,真的特别感谢!(所有贡献者列表请在[此处](https://github.com/zenghao0219/contributors))
<details>
<summary>点击此处展开查看赞助最多的几位朋友</summary>

1. [*磊 (KaelLuo) (¥6.66)](http://github.com/KaelLuo)
2. *磊 (涅槃) (¥100)
3. *升平 (¥8.88)
</details>

#### 智能选座示例
```
以下为多个影厅的智能选座gif图演示
```
<img src="https://github.com/zenghao0219/files-store/blob/master/seats/soogif1.gif?raw=true" width="200" hegiht="300"/>

<img src="https://github.com/zenghao0219/files-store/blob/master/seats/soogif2.gif?raw=true" width="200" hegiht="300"/>

<img src="https://github.com/zenghao0219/files-store/blob/master/seats/soogif3.gif?raw=true" width="200" hegiht="300"/>

#### 智能选座示例
```
以下为空位检测逻辑gif图演示
```
<img src="https://github.com/zenghao0219/files-store/blob/master/seats/soogif4.gif?raw=true" width="200" hegiht="300"/>

### 项目依赖组件

该项目引用到的外部常用组件

> 1. [amfe-flexible](https://github.com/amfe/lib-flexible "阿里巴巴弹性rem布局")
>
> 2. [vue-touch](https://github.com/vuejs/vue-touch "vue-touch")
>
> 3. [better-scroll](https://github.com/ustbhuangyi/better-scroll "better-scroll")
>
> 4. [axios](https://github.com/axios/axios "axios")

### 目录结构
```
.public
├── index.html
└── mock
    └── seatLove.json(mock数据在这里)

.src
├── App.vue --(入口组件)
├── assets --(静态文件)
│   ├── images
│   │   └── loading.gif --(加载图片)
│   └── stylus
│       ├── golbal.styl --(全局styl)
│       └── reset.styl --(移动端重写CSS)
├── components --(公用组件)
│   ├── Header.vue --(头部公用组件)
│   └── loading.vue --(载入公用组件)
├── http.js (axios工具类)
├── main.js (vue入口js)
├── pages --(组件目录)
│   └── hallseat
│       ├── HallSeat.vue --(选座父组件)
│       └── component --(选座子组件目录)
│           ├── ConfirmLock.vue --(确认选择组件)
│           ├── PlanDetail.vue --(电影信息组件)
│           ├── QuickSelectTab.vue --(智能选座组件)
│           ├── SeatArea.vue --(座位图生成组件)
│           └── SelectedTab.vue --(已选座展示组件)
└── router.js
```
### 初始化项目 (Project setup)
```
npm install
```

### 直接运行开发环境 (Compiles and hot-reloads for development)
```
npm run serve
```

### 项目打包 (Compiles and minifies for production)
```
npm run build
```
### 讨论

欢迎加群讨论: 3544395

### 项目捐赠
写代码不易...请作者喝杯咖啡呗?

![](https://github.com/zenghao0219/files-store/blob/master/pay.jpeg?raw=true)

(PS: 支付的时候 请带上你的名字/昵称呀 会维护一个赞助列表~ )
