/*
  @author zenghao0219
  @description 上方用于展示信息模块
  @updateDate 最后更新时间为:2019-02-21
*/
<template>
  <div>
    <div class="plan-detail">
      <div class="plan-detail-item">{{propShowDate}}</div>
      <div class="plan-detail-item">{{propShowTime}}</div>
      <div class="plan-detail-item">{{propHallName}}</div>
    </div>
    <div class="seat-detail">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    propHallName: String,
    propShowDate: String,
    propShowTime: String
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped='scoped'>
//@import url(); 引入公共css类
.plan-detail
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  font-size 26px
  color #888888
  height 90px
  width 750px
  background #ffffff
  .plan-detail-item
    width 250px
    text-align center
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
.seat-detail
  display flex
  flex-direction row
  justify-content space-around
  align-items center
  font-size 26px
  color #888888
  height 90px
  width 710px
  background #f3f4f6
  padding 0 20px 0 20px
</style>
