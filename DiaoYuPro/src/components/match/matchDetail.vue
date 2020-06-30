<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap match-detail">
			<div class="text-grayer" style="padding: 30px 0;">
				<a href="">首页 > </a>
				<a href="">钓鱼视频 > </a>
				<a href="">四海钓鱼 > </a>
				<a href="">寻根溯源 > </a>
				寻根溯源 横刀跃马 征战全国之刘松松 [视频]
			</div>
			
			<div class="video clearfix">
				<div class="fl inner">
					<div class="text-center" style="color: #656565;margin-bottom: 10px;">寻根溯源 横刀跃马 征战全国之刘松松 [视频]</div>
					<video width="910" height="507" src="http://vd4.bdstatic.com/mda-jk3e3cmqafq8fj4t/sc/mda-jk3e3cmqafq8fj4t.mp4"  controls="controls">
					
					</video>
				</div>
				<div class="fr list">
					<div class="title">播放列表</div>
					<ul>
						<li class="ellipsis on">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
						<li class="ellipsis">第一讲：握笔正确姿势以及纸握笔正确姿势以及纸</li>
					</ul>
				</div>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'matchDetail',
		components:{
		},
		data() {  
			return {
				id:5,
				content:""
				
			}
		},
		created() {
			
//			this.id = this.$route.params.data;
//			console.log(this.id)
			this.init();
			
		},
		init(){
			var _this=this;
			this.$axios.get(this.$common.match_matchs_detail, {
					params: {
						id:5
					},
				}).then(function(res) {
					console.log(res)
				})
		},	
		}
	}
</script>

<style>
</style>
