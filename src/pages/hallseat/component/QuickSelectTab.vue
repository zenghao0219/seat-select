/*
  @author zenghao0219
  @description 用于快速选座逻辑实现
  @updateDate 最后更新时间为:2019-07-22
*/
<template>
  <div class='selected'>
    <div class="text">快速选座:</div>
    <div class="scroll" ref="scroll">
      <ul class="scroll-ul">
        <li class="scroll-item" @click="quickSeat(1)">1人座</li>
        <li class="scroll-item" @click="quickSeat(2)">2人座</li>
        <li class="scroll-item" @click="quickSeat(3)">3人座</li>
        <li class="scroll-item" @click="quickSeat(4)">4人座</li>
      </ul>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Bscroll from 'better-scroll'
export default {
// import引入的组件需要注入到对象中才能使用
  props: {
    propSeatList: Array
  },
  components: {

  },
  data () {
    // 这里存放数据
    return {
      seatList: this.propSeatList,
      seatMap: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {
    // 取最大横坐标
    xMax: function () {
      let i = 0
      for (let index in this.seatList) {
        if (this.seatList[index].gCol > i) {
          i = this.seatList[index].gCol
        }
      }
      return i
    },
    // 取最大纵坐标
    yMax: function () {
      let i = 0
      for (let index in this.seatList) {
        if (this.seatList[index].gRow > i) {
          i = this.seatList[index].gRow
        }
      }
      return i
    },
    // 优先左侧
    bestX: function () {
      return parseInt(this.xMax / 2) + 1
    },
    // 四舍五入
    bestY: function () {
      // 0.618为黄金分割比例
      return Math.round(this.yMax * 0.618)
    }
  },
  // 监控data中的数据变化
  watch: {
    propSeatList: function () {
      this.seatList = this.propSeatList
      this.creatSeatMap()
    }
  },
  // 方法集合
  methods: {
    // 快速选择座位函数
    quickSeat: function (value) {
      let _self = this
      // 最优座位数组 里面包含了每排的最佳座位组
      let bestSeatList = []
      let bestRowSeat
      for (let i = _self.yMax; i > 0; i--) {
        // bestRowSeat为 gRow 为 i 的的所有座位对象
        bestRowSeat = _self.seatMap[i]
        if (bestRowSeat === undefined) {
          continue
        } else {
          // 找到每排的最佳座位
          let bestSeat = this.seachBestSeatByRow(bestRowSeat, value)
          if (bestSeat != null) {
            bestSeatList.push(bestSeat)
          }
        }
      }
      if (bestSeatList.length <= 0) {
        alert('没有合适的座位~')
        return
      }
      let bestSeatListIndex = 0
      // 递归每排的最优座位组 找出离中心点最近的最优座位组
      bestSeatList.reduce(function (prev, cur, index, arr) {
        if (Array.isArray(prev)) {
          // 取中心点离 最好坐标 绝对值
          let n = Math.abs((prev[0].gCol + prev[value - 1].gCol) / 2 - _self.bestX)
          let m = Math.abs(prev[0].gRow - _self.bestY)
          // 勾股定理
          prev = Math.sqrt(Math.pow(n, 2) + Math.pow(m, 2))
        }
        // 取中心点离 最好坐标 绝对值
        let x = Math.abs((cur[0].gCol + cur[value - 1].gCol) / 2 - _self.bestX)
        let y = Math.abs(cur[0].gRow - _self.bestY)
        // 勾股定理
        let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        if (z >= prev) {
          return prev
        } else {
          bestSeatListIndex = index
          return z
        }
      })
      // 最佳座位中包含情侣座位
      let notEmitSeatArr = []
      // 发送选择事件
      for (const iterator of bestSeatList[bestSeatListIndex]) {
        if (iterator.otherLoveSeatId !== null) {
          let checkFor = false
          for (const item of notEmitSeatArr) {
            if (iterator.id === item) {
              // 情侣座的另外一半不发送事件
              checkFor = true
              break
            }
          }
          if (checkFor) {
            continue
          }
          notEmitSeatArr.push(iterator.otherLoveSeatId)
        }
        this.$emit('quickSelect', iterator.orgIndex)
      }
    },
    // 找寻每排的最佳座位数组
    seachBestSeatByRow: function (rowSeatList, value) {
      let effectiveSeatLeft = []
      let effectiveSeatRight = []
      let effectiveSeatMiddle = []
      // 检查居中对齐包含最佳座位的
      effectiveSeatMiddle = this.checkSeatMiddle(rowSeatList, value)
      // 左边检查开始
      effectiveSeatLeft = this.checkSeatWithDirection(rowSeatList, value, '-')
      // 右边检查开始
      effectiveSeatRight = this.checkSeatWithDirection(rowSeatList, value, '+')
      // 如果这排中 包含最佳坐标有座位数满足 返回这批座位数组
      if (effectiveSeatMiddle.length === value) {
        return effectiveSeatMiddle
      }
      // 如果这排中 不包含最佳座位 但是左右两侧都有满足座位数 取离中心点近的方向座位数组
      if (effectiveSeatLeft.length === value && effectiveSeatRight.length === value) {
        return Math.abs(effectiveSeatLeft[0].gCol - this.bestX) > Math.abs(effectiveSeatRight[0].gCol - this.bestX) ? effectiveSeatRight : effectiveSeatLeft
      } else {
        // 否则 返回 左右两侧 某一侧满足的座位数组
        if (effectiveSeatLeft.length === value) {
          return effectiveSeatLeft
        }
        if (effectiveSeatRight.length === value) {
          return effectiveSeatRight
        }
        return null
      }
    },
    // 找到次排是否有快速选择座位数有效的数组 寻找的坐标为 最佳座位根据快速选择座位数 取左右两边正负座位数
    checkSeatMiddle: function (rowSeatList, value) {
      let effectiveSeat = []
      let existLoveSeat = false
      // 从负到整的值动态值
      let activeValue = value > 2 ? value - 2 : value - 1
      if (value === this.xMax) {
        activeValue = activeValue - 1
      } else if (value > this.xMax) {
        // 快速选择座位数 大于影厅横向左边值 直接返回没有有效座位
        return effectiveSeat
      }
      // 最佳座位根据快速选择座位数 取左右两边正负座位数
      for (let j = -activeValue; j <= activeValue; j++) {
        // 确认最佳座位状态
        let iter = rowSeatList.find((el) => (parseInt(el.gCol) === this.bestX + j))
        // 最佳座位
        if (iter === undefined) {
          break
        }
        if (iter.nowIcon === iter.soldedIcon || iter.nowIcon === iter.fixIcon) {
          effectiveSeat = []
          existLoveSeat = false
          continue
        } else {
          if (iter.otherLoveSeatId !== null) {
            existLoveSeat = true
          }
          let temp = { ...iter }
          // 标记此座位的选择规则是中心规则
          temp.findMethod = '*'
          effectiveSeat.push(temp)
        }
      }
      if (effectiveSeat.length > value) {
        // 最后找出居中座位数组后 由于会有已售和维修和过道的影响 在数组中 先删除后面的位置值 再删除前面位置值 直到值为value(快速选择座位数)
        for (let i = 0; i < activeValue; i++) {
          effectiveSeat.pop()
          if (effectiveSeat.length === value) {
            break
          }
          effectiveSeat.shift()
          if (effectiveSeat.length === value) {
            break
          }
        }
        // 预检
        if (this.preCheckSeatMakeEmpty(effectiveSeat)) {
          return []
        }
      } else if (effectiveSeat.length < value) {
        return []
      } else {
      // 预检
        if (this.preCheckSeatMakeEmpty(effectiveSeat)) {
          return []
        }
      }
      // 如果最近座位组中存在情侣座
      // 检查数组内情侣座必须成对出现 否则舍弃
      if (existLoveSeat) {
        if (!this.checkLoveSeatIsDouble(effectiveSeat)) {
          return []
        }
      }
      return effectiveSeat
    },
    // 找到次排是否有快速选择座位数有效的数组
    checkSeatWithDirection: function (rowSeatList, value, direction) {
      let activeValue = value
      // 最多允许过道等于3 由于某些影厅 居中的位置不是座位 存在大部分的过道 导致无法选择到最佳座位
      let roadDistance = 3
      let effectiveSeat = []
      let existLoveSeat = false
      for (let j = 0; j < activeValue; j++) {
        let iter
        if (direction === '-') {
          iter = rowSeatList.find((el) => (parseInt(el.gCol) === this.bestX - j))
        } else if (direction === '+') {
          iter = rowSeatList.find((el) => (parseInt(el.gCol) === this.bestX + j))
        }
        if (iter === undefined) {
          activeValue++
          roadDistance--
          if (roadDistance <= 0) {
            break
          } else {
            continue
          }
        }
        if (iter.nowIcon === iter.soldedIcon || iter.nowIcon === iter.fixIcon) {
          activeValue++
          effectiveSeat = []
          existLoveSeat = false
          continue
        } else {
          if (iter.otherLoveSeatId !== null) {
            existLoveSeat = true
          }
          let temp = { ...iter }
          temp.findMethod = direction
          effectiveSeat.push(temp)
        }
        if (effectiveSeat.length === value) {
          // 预检
          if (this.preCheckSeatMakeEmpty(effectiveSeat)) {
            activeValue++
            effectiveSeat.shift()
            continue
          }
        }
      }
      // 如果最近座位组中存在情侣座
      // 检查数组内情侣座必须成对出现 否则舍弃
      if (existLoveSeat) {
        if (!this.checkLoveSeatIsDouble(effectiveSeat)) {
          return []
        }
      }
      return effectiveSeat
    },
    checkLoveSeatIsDouble: function (arr) {
      // 检查数组内必须情侣座是否对出现 否则舍弃
      var orgSet = new Set()
      var loveSeatSet = new Set()
      for (const iterator of arr) {
        orgSet.add(iterator.id)
      }
      for (const iterator of arr) {
        if (iterator.otherLoveSeatId !== null) {
          loveSeatSet.add(iterator.otherLoveSeatId)
        }
      }
      let beforelen = orgSet.size
      let afterlen = new Set([...orgSet, ...loveSeatSet]).size
      return beforelen === afterlen
    },
    // 根据seatList 生成一个类map的对象 key值为gRow坐标 value值为gRow为key值的数组
    creatSeatMap: function () {
      var obj = {}
      for (let index in this.seatList) {
        let seatRowList = this.seatList[index].gRow
        if (seatRowList in obj) {
          // 原本数组下标
          this.seatList[index].orgIndex = index
          obj[seatRowList].push(this.seatList[index])
        } else {
          let seatArr = []
          // 原本数组下标
          this.seatList[index].orgIndex = index
          seatArr.push(this.seatList[index])
          obj[seatRowList] = seatArr
        }
      }
      this.seatMap = obj
    },
    // 预检座位
    preCheckSeatMakeEmpty (arr) {
      let that = this
      // 开始计算是否留下空位 ------------ 开始
      let result = arr.every(function (element, index, array) {
        return that.checkSeat(element, arr)
      })
      // 开始计算是否留下空位 ------------ 结束
      return !result
    },
    // 预检每个座位是否会留下空位
    checkSeat: function (element, selectedSeat) {
    // 标准为 1.左右侧都必须保留 两格座位 + 最大顺延座位(也就是已选座位减去自身)
    // 2.靠墙和靠已售的座位一律直接通过
      const checkNum = 2 + selectedSeat.length - 1
      const gRowBasic = element.gRow
      const gColBasic = element.gCol
      let otherLoveSeatIndex = element.otherLoveSeatIndex
      if (otherLoveSeatIndex != null) {
      // 如果是情侣座 不检测
        return true
      }
      // 检查座位左侧
      let left = this.checkSeatDirection(gRowBasic, gColBasic, checkNum, '-', selectedSeat)
      // 如果左侧已经检查出是靠着过道直接 返回true
      if (left === 'special') {
        return true
      }
      // 检查座位右侧
      let right = this.checkSeatDirection(gRowBasic, gColBasic, checkNum, '+', selectedSeat)
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
    // 预检左右侧座位满足规则状态
    checkSeatDirection: function (gRowBasic, gColBasic, checkNum, direction, selectedSeat) {
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
          let checkSelect = false
          for (const index in selectedSeat) {
            if (selectedSeat[index].id === iter.id) {
            // 已选 顺延一位
              x++
              checkSelect = true
              break
            }
          }
          if (checkSelect) {
            continue
          }
        } else {
          if (iter === undefined) {
          // 过道
            return 'fail'
          }
          if (iter.nowIcon === iter.soldedIcon ||
              iter.nowIcon === iter.fixIcon) {
          // 已售或者维修
            return 'fail'
          }
          for (const index in selectedSeat) {
            if (selectedSeat[index].id === iter.id) {
              return 'fail'
            }
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
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new Bscroll(this.$refs.scroll, {
          scrollX: true,
          // 忽略竖直方向的滚动
          scrollY: false,
          eventPassthrough: 'vertical'
        })
      } else {
        this.scroll.refresh()
      }
    })
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
.selected
  position fixed
  z-index 10
  bottom 90px
  background #ffffff
  width 750px
  padding 20px 0 20px 20px
  height 100px
  overflow hidden
  .text
    width 750px
    height 26px
    line-height 26px
    font-size 28px
    font-weight 400
  .scroll
    position absolute
    height 140px
    width 750px
    top 0
    left 0
    z-index 11
    .scroll-ul
      width 1280px
      display flex
      margin-top 60px
      .scroll-item
        flex: none;
        margin-left 20px
        height 65px
        line-height 65px
        text-align center
        font-size 23px
        width 160px
        color #888888
        border 2px solid #888888
        border-radius 10px
</style>
