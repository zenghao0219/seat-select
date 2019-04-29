/*
  @author zenghao0219
  @description 用于选定座位后的检测空位逻辑,和下单逻辑
  @updateDate 最后更新时间为:2019-02-29
*/
<template>
<div class='confirm' @click="lockSeat()">
  确认选座
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    propSelectedSeat: Array,
    propSeatList: Array,
    propIsCheap: Number,
    propServiceFee: String,
    propPlanId: String
  },
  data () {
    // 这里存放数据
    return {
      selectedSeat: this.propSelectedSeat,
      seatList: this.propSeatList
    }
  },
  // 监听属性 类似于data概念
  computed: {
    chPrice () {
      let totalPrice = 0
      let selectedSeat = this.selectedSeat
      for (const iterator of selectedSeat) {
        totalPrice += parseInt(iterator.price)
      }
      return totalPrice
    },
    seatIdList () {
      let seatIdList = []
      let selectedSeat = this.selectedSeat
      for (const iterator of selectedSeat) {
        seatIdList.push(iterator.id)
      }
      return seatIdList
    }
  },
  // 监控data中的数据变化
  watch: {
    propSelectedSeat: function () {
      this.selectedSeat = this.propSelectedSeat
    },
    propSeatList: function () {
      this.seatList = this.propSeatList
    },
    propIsCheap: function (value) {
      this.isCheap = value
    },
    propServiceFee: function (value) {
      this.serviceFee = value
    },
    propPlanId: function (value) {
      this.planId = value
    }
  },
  // 方法集合
  methods: {
    lockSeat: function () {
      let _this = this
      // 防止连点
      let check = _this.$once(new Date().getTime())
      if (!check) {
        return
      }
      if (_this.selectedSeat.length === 0) {
        alert('请至少选择一个座位~')
        return
      }
      // 开始计算是否留下空位 ------------ 开始
      let result = _this.selectedSeat.every(function (element, index, array) {
        return _this.checkSeat(element)
      })
      // 开始计算是否留下空位 ------------ 结束
      if (!result) {
        // 如果 result 为false
        alert('请不要留下空位~')
      } else {
        if (_this.chPrice === 0) {
          alert('锁座失败了~,金额为0')
          return
        }
        // 允许锁座
        this.createOrder()
      }
    },
    createOrder () {
      alert('在这里开始走锁座逻辑')
    },
    // 检查每个座位是否会留下空位
    checkSeat: function (element) {
      // 标准为 1.左右侧都必须保留 两格座位 + 最大顺延座位(也就是已选座位减去自身)
      // 2.靠墙和靠已售的座位一律直接通过
      const checkNum = 2 + this.selectedSeat.length - 1
      const gRowBasic = element.gRow
      const gColBasic = element.gCol
      let otherLoveSeatIndex = element.otherLoveSeatIndex
      if (otherLoveSeatIndex != null) {
        // 如果是情侣座 不检测
        return true
      }
      // 检查座位左侧
      let left = this.checkSeatDirection(gRowBasic, gColBasic, checkNum, '-')
      // 如果左侧已经检查出是靠着过道直接 返回true
      if (left === 'special') {
        return true
      }
      // 检查座位右侧
      let right = this.checkSeatDirection(gRowBasic, gColBasic, checkNum, '+')
      if (right === 'special') {
        // 无论左侧是否是什么状态 检查出右侧靠着过道直接 返回true
        return true
      } else if (right === 'normal' && left === 'normal') {
        // 如果左右两侧都有富裕的座位 返回true
        return true
      } else if (right === 'fail' || left === 'fail') {
        // 如果左右两侧都是不通过检测 返回false
        return false
      }
      return true
    },
    // 检查左右侧座位满足规则状态
    checkSeatDirection: function (gRowBasic, gColBasic, checkNum, direction) {
      // 空位个数
      let emptySeat = 0
      let x = 1 // 检查位置 只允许在x的位置出现过道,已售,维修
      for (let i = 1; i <= checkNum; i++) {
        let iter // 根据 gRow gCol direction 找出检查座位左边按顺序排列的checkNum
        if (direction === '-') {
          iter = this.seatList.find((el) => (el.gRow === gRowBasic && el.gCol === gColBasic - i))
        } else if (direction === '+') {
          iter = this.seatList.find((el) => (el.gRow === gRowBasic && el.gCol === gColBasic + i))
        }
        if (x === i) {
          if (iter === undefined) {
          // 过道
            return 'special'
          }
          if (iter.nowIcon === iter.soldedIcon || iter.nowIcon === iter.fixIcon) {
          // 已售或者维修
            return 'special'
          }
          if (iter.nowIcon === iter.selectedIcon) {
          // 已选 顺延一位
            x++
            continue
          }
        } else {
          if (iter === undefined) {
          // 过道
            return 'fail'
          }
          if (iter.nowIcon === iter.soldedIcon ||
              iter.nowIcon === iter.fixIcon ||
              iter.nowIcon === iter.selectedIcon) {
          // 已售或者维修
            return 'fail'
          }
        }
        emptySeat++
        if (emptySeat >= 2) {
          return 'normal'
        }
      }
    }
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
  // 生命周期 - 更新之后
  updated () {},
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped='scoped'>
//@import url(); 引入公共css类
.confirm
  position fixed
  bottom 0
  z-index 10
  width 750px
  background: linear-gradient(to right, #6F50F5,#C26DFE);
  line-height 90px
  text-align center
  color white
  font-size 30px
</style>
