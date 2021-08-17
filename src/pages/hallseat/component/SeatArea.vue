/*
  @author zenghao0219
  @description 用于动态生成座位图,缩略图,座位左边栏
  @updateDate 最后更新时间为:2019-02-21
*/
<template>
    <div class="activity-area" :style="{ width:seatAreaWidthRem + 'rem',height:seatAreaHeightRem + 'rem'}">
      <div class="screen">
        <div class="screen-text">屏幕方向</div>
      </div>
      <div class="thumbnail" v-show="thumbnailShow" :style="{ transform: 'scale('+seatScale+')',width:thumbnailWidthRem + 'rem',height:thumbnailHeighthRem + 'rem'}">
        <!--红色外框开始-->
        <div class="thumbnail-border" :style="{transform: 'scale('+scalereciprocal+')',top:topthumbnail + 'rem',left:leftthumbnail + 'rem'}">
        </div>
        <!--红色外框结束-->
        <slot name="thumbnail-seat-solt">
          <!--这里是缩略图中的所有座位放入此插槽-->
        </slot>
      </div>
      <v-touch @pinchout="pinchout" @pinchin="pinchin" @panmove="panmove" @panstart="panstart" @panend="panend" class="box" ref="pinchAndPan"
      :pinch-options="{ threshold: 0.09 }" :pan-options="{ threshold: 0.01 }" :style="{transform: 'scale('+scale+')',transformOrigin: transformOrigin,top:top + 'rem',left:left + 'rem',
      width:seatAreaWidthRem + 'rem',height:seatAreaHeightRem + 'rem'}">
        <slot name="seat-area-solt">
          <!--所有可以点击座位的数据会放入此插槽,此插槽可以缩放,拖动-->
        </slot>
      </v-touch>
        <!--座位左边栏-->
      <div class="seat-tool-parent" :style="{height:seatAreaHeightRem + 'rem'}">
        <div class="seat-tool" :style="{transform: 'scale('+seatScale+')',transformOrigin: transformOriginTool,marginTop:seatToolMargin+'rem',
        fontSize:seatToolFontSize +'rem'}">
          <template  v-for="(item, index) in seatToolArr">
            <div class="seat-tool-item" :key="'seat-tool' + index"
            :style="{height:seatHeightWithScale+'rem',width:seatToolWidthWithScale+'rem',lineHeight:seatHeightWithScale+'rem'}">
                {{item}}
            </div>
          </template>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'SeatArea',
  props: {
    propThumbnailAreaWidth: Number,
    propThumbnailAreaHeight: Number,
    propYMax: Number,
    propSeatScale: Number,
    propSeatHeight: Number,
    propSeatAreaWidthRem: Number,
    propSeatAreaHeightRem: Number,
    propMiddleLine: Number,
    propHorizontalLine: Number,
    propSeatBoxHeight: Number,
    propSeatToolArr: Array
  },
  data: function () {
    return {
      scale: 1, // 区域放大尺寸
      top: 0, // 单位rem
      left: 0, // 单位rem
      topthumbnail: 0, // 单位rem
      leftthumbnail: 0, // 单位rem
      startX: 0, // ---移动的起点X轴 单位px
      startY: 0, // ---移动的起点Y轴 单位px
      seatAreaWidthRem: this.propSeatAreaWidthRem, // 座位区域宽  rem
      seatAreaHeightRem: this.propSeatAreaHeightRem, // 座位区域高  rem
      thumbnailWidthRem: this.propThumbnailAreaWidth, // 缩略图宽 rem
      thumbnailHeighthRem: this.propThumbnailAreaHeight, // 缩略图高 rem
      seatToolWidth: 0.3, // 0.3为座位栏合适的初始宽度 单位rem
      middleLine: this.propMiddleLine,
      horizontalLine: this.propHorizontalLine,
      // 最大排数
      yMax: this.propYMax,
      // 内部座位图缩放比例(为了一次可以显示全部座位)
      seatScale: this.propSeatScale,
      // 项目 rem计算值
      pxtorem: 75,
      // 设备 rem计算值
      screenRem: (document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth) / 10,
      // 缩略图是否显示
      thumbnailShow: false,
      // 定时器对象
      timer: {},
      // 每个座位dom的高度
      seatHeight: this.propSeatHeight,
      // .seatBox的高度
      seatBoxHeight: this.propSeatBoxHeight,
      // 触摸状态
      touchStatus: false,
      // 座位左边栏的数组
      seatToolArr: this.propSeatToolArr
    }
  },
  methods: {
    // 第一次点击座位改变放大比例
    changeScale: function () {
      if (this.maxscale === 1) {
        return
      }
      this.scale = this.maxscale
    },
    // 第一次点击座位改变偏移
    changePosition: function (top, left) {
      if (this.maxscale === 1) {
        return
      }
      let _this = this
      // 0.67是上方 屏幕方向dom 部分偏移的部分 也是 .box margin-top 的50px
      _this.top = top * (this.scale - 1) + 0.67
      _this.left = left * (this.scale - 1)
    },
    // 当缩放 放大的时候触发
    pinchout: function () {
      let _this = this
      if (_this.scale >= 0 && _this.scale < _this.maxscale) {
        _this.scale += 0.1
      }
    },
    // 当缩放 缩小的时候触发
    pinchin: function () {
      let _this = this
      if (_this.scale > 1) {
        _this.scale -= 0.1
      }
    },
    // 当手指拖动的过程中
    panmove: function (ev) {
      let _this = this
      if (_this.touchStatus) {
        // 本次座位图移动横纵坐标rem的值
        _this.top = (ev.deltaY + _this.startY) / _this.screenRem
        _this.left = (ev.deltaX + _this.startX) / _this.screenRem
        // .seatBox的高和缩略图的高 换算比例
        let heightProportion = (_this.seatBoxHeight * _this.seatScale / _this.thumbnailHeighthRem)
        // .seatBox的宽和缩略图的宽 换算比例
        let widthProportion = (_this.seatAreaWidthRem / _this.thumbnailWidthRem)
        // 本次缩略图移动横纵坐标rem的值
        _this.topthumbnail = -_this.top / heightProportion * _this.scalereciprocal
        _this.leftthumbnail = -_this.left / widthProportion * _this.scalereciprocal
      }
    },
    // 当手指拖动开始的时候
    panstart: function (ev) {
      let _this = this
      // 优化触摸性能
      _this.touchStatus = true
      // 展示缩略图
      _this.thumbnailShow = true
      // 获取上次记录的xy坐标作为起点
      _this.startY = _this.top * _this.screenRem
      _this.startX = _this.left * _this.screenRem
      clearTimeout(_this.timer)
    },
    // 当手指拖动结束的时候
    panend: function (ev) {
      let _this = this
      // 优化触摸性能
      _this.touchStatus = false
      if (_this.scale === 1) {
        _this.top = 0
        _this.left = 0
        _this.topthumbnail = 0
        _this.leftthumbnail = 0
      } else {
        // 如果宽度度移动超过了边界值 把移动置为边界值
        if (_this.left > _this.crossleft) {
          _this.left = _this.crossleft
        } else if (_this.left < -_this.crossleft) {
          _this.left = -_this.crossleft
        }
        // 缩略图移动超过了边界值 把移动置为边界值
        if (_this.leftthumbnail > _this.thumbnailWidthRemProportion) {
          _this.leftthumbnail = _this.thumbnailWidthRemProportion
        } else if (_this.leftthumbnail < -_this.thumbnailWidthRemProportion) {
          _this.leftthumbnail = -_this.thumbnailWidthRemProportion
        }
        // 如果高度移动超过了边界值 把移动置为边界值
        if (_this.top > _this.crosstop) {
          _this.top = _this.crosstop
        } else if (_this.top < -_this.crosstop) {
          _this.top = -_this.crosstop
        }
        // 缩略图移动超过了边界值 把移动置为边界值
        if (_this.topthumbnail > _this.thumbnailHeighthRemProportion) {
          _this.topthumbnail = _this.thumbnailHeighthRemProportion
        } else if (_this.topthumbnail < -_this.thumbnailHeighthRemProportion) {
          _this.topthumbnail = -_this.thumbnailHeighthRemProportion
        }
      }
      _this.timer = setTimeout(() => {
        _this.thumbnailShow = false
      }, 2000)
    }
  },
  computed: {
    // 最大放大比例
    maxscale: function () {
      return 1 + 1 / this.seatScale
    },
    // 左边触边吸附边界值rem
    crossleft: function () {
      let _this = this
      return (_this.scale - 1) * _this.seatAreaWidthRem * _this.scaleXCross
    },
    // 上边触边吸附边界值rem
    crosstop: function () {
      let _this = this
      return (_this.scale - 1) * _this.seatAreaHeightRem * _this.scaleYCross
    },
    // scale的倒数
    scalereciprocal: function () {
      return 1 / this.scale
    },
    // 缩略图宽度触边吸附边界值
    thumbnailWidthRemProportion: function () {
      let _this = this
      return (1 - _this.scalereciprocal) * _this.thumbnailWidthRem / 2
    },
    // 缩略图高度触边吸附边界值
    thumbnailHeighthRemProportion: function () {
      let _this = this
      return (1 - _this.scalereciprocal) * _this.thumbnailHeighthRem / 2
    },
    // 每个座位放大后的高度
    seatHeightWithScale: function () {
      let _this = this
      return _this.seatHeight * _this.scale
    },
    // seat-tool 内的字体大小
    seatToolFontSize: function () {
      let fontsize = 20 / this.pxtorem
      return fontsize * this.scale
    },
    // seat-tool-item 的宽度
    seatToolWidthWithScale: function () {
      let _this = this
      return _this.seatToolWidth * _this.scale
    },
    // 座位侧边栏需要偏移的长度
    seatToolMargin: function () {
      let _this = this
      let height = (_this.seatHeightWithScale * _this.yMax) * _this.scaleYCross * (_this.seatScale - 1)
      return _this.top + _this.seatHeightWithScale * _this.seatScale - _this.crosstop + height
    },
    // css样式控制.box缩放中心点
    transformOrigin: function () {
       return 'center ' + this.scaleYCross * 100 + '%'
    },
    // css样式控制.seat-tool缩放中心点
    transformOriginTool: function () {
      return '0 ' + this.scaleYCross * 100 + '%'
    },
    // 缩放.box区域 x轴的中心点比例 用于缩放原点
    scaleXCross: function () {
      // .box的所有尺寸与内部.seatbox的换算比例都是seatScale,例如外部seatAreaWidthRem其实是固定的10rem
      // 但是因为有了自适应缩放seatScale比例的关系 内部设置的属性都会被乘上seatScale
      // seatAreaWidthRem/seatScale大小=外部seatAreaWidthRem
      return (this.middleLine / this.seatAreaWidthRem) * this.seatScale
    },
    // 缩放.box区域 y轴的中心点比例 用于缩放原点
    scaleYCross: function () {
      return (this.horizontalLine / this.seatAreaHeightRem) * this.seatScale
    }
  },
  watch: {
    propThumbnailAreaWidth: function (value) {
      this.thumbnailWidthRem = value
    },
    propThumbnailAreaHeight: function (value) {
      this.thumbnailHeighthRem = value
    },
    propYMax: function (value) {
      this.yMax = value
    },
    propSeatScale: function (value) {
      this.seatScale = value
    },
    propMiddleLine: function (value) {
      this.middleLine = value
    },
    propHorizontalLine: function (value) {
      this.horizontalLine = value
    },
    propSeatBoxHeight: function (value) {
      this.seatBoxHeight = value
    },
    propSeatToolArr: function (value) {
      this.seatToolArr = value
    }
  },
  mounted: function () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
  .activity-area
    position relative
    background #f3f4f6
    overflow hidden
    padding-bottom 50px
    .thumbnail
      position absolute
      z-index 3
      top 0
      left 0
      background rgba(0,0,0,0.4)
      overflow hidden
      transform-origin: 0 0
      .thumbnail-border
        position absolute
        z-index 4
        box-sizing border-box
        width 100%
        height 100%
        padding 1px
        border-2px(red,0)
    .screen
      width: 630px
      border-top 42px solid #DFDFDF
      border-right 60px solid transparent
      border-left 60px solid transparent
      color white
      position absolute
      top 0px
      z-index 2
      left 50%
      transform translateX(-50%);
      .screen-text
        text-align center
        white-space nowrap;
        font-size 34px;
        font-weight 600;
        margin-top:-38px;
    .box
      margin-top 50px
      position absolute
      z-index 0
    .seat-tool-parent
      overflow hidden
      margin-top 50px
      .seat-tool
        display flex
        flex-direction column
        position absolute
        z-index 1
        left 0.1rem
        border-radius 50px;
        background rgba(0,0,0,0.3)
        text-align center
        color white
        font-weight bold
        .seat-tool-item
          padding 0 0.05rem
</style>
