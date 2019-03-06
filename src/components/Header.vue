<template>
	<div id="header">
		<!-- <div class="back" v-show="showLeft" @click="backClick"> 返回</div> -->
		<slot name='leftView'><div class="back"></div></slot>
		<slot name='titleView'><div class="title">{{titleText}}</div></slot>
		<slot name='rightView'><div class="right"></div></slot>
		<slot></slot>
	</div>
</template>

<script>
export default {
  name: '',
  props: {
    showLeft: Number,
    titleText: String,
    rightText: String
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped="scoped">
	#header{
		display: flex;
		background: linear-gradient(to right, #6F50F5,#C26DFE);
		height: 81px;
		width: 100%;
		color: white;
	}
	.back{
		width: 140px;
		height: 100%;
		text-align: center;
		line-height: 81px;
		font-size: 25px;
	}
	.backImage{
		margin-left: -70px;
		margin-top: 26px;
		width: 14px;
		height: 28px;
	}
	.title{
		width: 470px;
		height: 100%;
		text-align: center;
		font-size: 30px;
		line-height: 81px;
	}
  .right{
    width: 130px;
    height: 100%;
    text-align: center;
    padding-right: 12px;
    font-size: 30px;
		line-height: 81px;
		color: white
  }

</style>
