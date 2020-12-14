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

- [微信小程序 seat-select-wechat](https://github.com/zenghao0219/seat-select-wechat)

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
> 4. [px2rem-postcss](https://github.com/songsiqi/px2rem-postcss "px2rem-postcss")
>
> 5. [axios(不是必须,可替换成其他请求组件)](https://github.com/axios/axios "axios(不是必须,可替换成其他请求组件)")

```
*  vue-touch需要使用@next分支

npm install vue-touch@next -S

npm install amfe-flexible -S

npm install postcss-px2rem -S

npm install better-scroll -S

npm install axios -S
```

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
### 跑跑试试看,本地运行此项目 (Project setup,Compiles and hot-reloads for development)
```
下载代码后在文件目录下运行命令

1. npm install 安装全部依赖

(cnpm install 或者 yarn install)

2. npm run serve 运行到开发环境
```
### 项目打包 (Compiles and minifies for production)
```
npm run build
```
### 讨论

欢迎加群讨论: 3544395 (最近有小伙伴反应搜不到群,还有我这边接不到审核)

如果搜不到的情况 加作者的个人qq 424115114 或者微信 forever_loved

<img src="https://raw.githubusercontent.com/zenghao0219/files-store/master/IMG_2250.JPG" width="200" hegiht="300"/>

### 开源详情

当我们使用github或者其它地方的开源项目时候，需要注意开源项目的授权协议。开源不等于免费使用，如果公司使用开源项目时候违反其开源协议，有可能给公司或者个人带来版权纠纷。使用时候需要慎重阅读开源代码提供者的授权条件。
- 再此说明，代码可以给大家学习甚至商用，但是使用或是转载没有经过作者同意 ，甚至修改代码后删除原作者的项目地址等标识，造成作者损失的，存在法律风险

### 项目捐赠
写代码不易...请作者喝杯咖啡呗?

![](https://github.com/zenghao0219/files-store/blob/master/pay.jpeg?raw=true)

(PS: 支付的时候 请带上你的名字/昵称呀 会维护一个赞助列表~ )



### 其他项目

最近开发了一个垃圾分类的小程序 需要的朋友可以关注以下~

<img src="https://i.postimg.cc/9fgDX670/gh-15fa1fdd771b-1280.jpg" width="200" hegiht="300"/>
