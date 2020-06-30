<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="information">
			<!--banner-->
			<div class="banner">
				<div id="topNav" class="swiper-container" style="border-radius:5px">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="item in bannerList">
							<img :src="item.pic" />
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
			</div>
			<!--切换-->
			<div class="tab border-b bg-white">
				<div class="wrap">
					<ul class="clearfix">
						<li :class="{'on':id==item.id}" v-for="item in classify_list" @click="change(item.id)">{{item.name}}</li>

					</ul>
				</div>
			</div>

			<div class="wrap inner">
				<!--简介-->
				<!--<div class="bg-white jianjie clearfix">
					<div class="pic fl">
						<img src="../../assets/images/lizi.png" />
					</div>
					<div class="text">
						<div class="ellipsis font-bd font-size-30 margin-t hover" style="margin-bottom: 40px;">为国人争光 中国选手易军夺冠2016年升钟湖国际舟钓大赛</div>
						<div class="ellipsis-3 font-size-16 text-grayer">钓鱼是一项休闲运动，钓鱼是一项休闲运动，越来越多年轻人都加入钓鱼是一项休闲运动，越来越多年轻人都加入钓鱼是一项休闲运动，越来越多年轻人都加入钓鱼是一项休闲运动，越来越多年轻人都加入，近几年钓鱼这个行业也越来越活跃，各种各样的活动和比赛也大大丰富了钓鱼爱好者的生活，</div>
						<div class="font-size-14 text-grayer" style="margin-top: 30px;">2018-05-29</div>
						<div class="btn font-size-16">查看详情</div>
					</div>
				</div>-->
				<!--列表-->
				<div class="dongtai-xiehui bg-white">
					<ul class="list">
						<li class="clearfix lis" v-for="item in list" @click="tiaozhuan(item.id)">
							<div class="pic fl zixun">
								<img :src="item.thumb" />
								<img class="bofang" src="../../assets/images/player.png" v-if="item.type==3"/>
							</div>
							<div class="text">
								<div class="ellipsis font-size-20 font-bd bt">{{item.title}}</div>
								<div class="ellipsis-3 font-size-16 text-grayer fbt">{{item.class_id}}</div>
								<div class="font-size-12 text-theme bq">
									<span class="font-size-14">查看详情>></span>
									<span class="fr text-grayer">{{item.num}}人浏览过</span>
								</div>
							</div>
						</li>
					</ul>

					<!--分页-->
					<div id="wr-page" class="page-out bg-white" v-if="list.length != 0">
					<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNo"
					@current-change="changePage">
					</el-pagination>
				</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import bus from '../../assets/eventBus.js';
	export default {
		name: 'index',
		components: {

		},
		data() {
			return {
				bannerList:[],
				nav: 0,
				id: 0,
				token: '',
				pageNo: 1,
				totalRow: 0,
				list: [],
				pageSize:8,
				classify_list: [],
				list:[],
				total:0,
				pic:''
			}
		},
		created() {
			this.token = sessionStorage.getItem('token')
			this.init();
			this.getBanner()
			
		},
		updated(){
			var mySwiper = new Swiper('.swiper-container', {
					freeMode: false,
					slidesPerView: 'auto',
					autoplay: {
						disableOnInteraction: false,
						delay: 3000,
					},
					loop: true,
					pagination: {
						el: '.swiper-pagination',
					},
					preventLinksPropagation: false,
			})
			
		},
		methods: {
			//  获取banner
			getBanner() {
				var _this = this;
				this.$axios.get(this.$common.banners, {
					params: {
						module_id: 5
					}
				}).then(function(res) {
					console.log(res)
					if (res.data.status == '1') {
						_this.bannerList = res.data.data.banner_list
					}
				}).catch(function(error) {
					// console.log(err)
				})
			},
			init() {
				var vm=this;
				this.$axios.get(this.$common.pick_list_url, {
					params: {
						token: this.token,
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						classify_id: this.id
					},
				}).then(function(res) {
					console.log(res)
					var pics='';
					var lis=res.data.data.page.list;
					for(var i=0;i<lis.length;i++){
							if(lis[i].thumb==null){
								if(lis[i].pic.length>3){
									pics=lis[i].pic
								}else{
									pics=lis[i].pic[0]
								}
							}else{
								pics=lis[i].thumb
							}
							res.data.data.page.list[i].thumb=pics
							console.log(res.data.data.page.list[i].thumb)
							
						}
					
					vm.classify_list=res.data.data.classify_list;
					vm.list=res.data.data.page.list;
					vm.total=res.data.data.page.totalRow
				})

			},
			change(id) {
				this.id = id;
				this.init()
				console.log(this.id)
			},
			tiaozhuan(id){
				console.log(id)
				this.$router.push({name: 'informationDetail',path: '/informationDetail',query:{id: id}})
			},
//			分页
			// pageSize 改变时会触发
			handleSizeChange: function(size) {
				console.log(458)
				return 
				this.pageSize = size;
				console.log(size)
				console.log(this.pageSize,7777) //每页下拉显示数据
			},
			// currentPage 改变时会触发
			changePage(currentPage) {
				this.pageNo = currentPage
				console.log(currentPage)
				this.init()
			},
			
		}
	}
</script>

<style>
	.dongtai-xiehui .lis{
	padding: 30px 0;
	}
	.dongtai-xiehui li{
	padding: 0;
	}
	.zixun{
	position: relative;
	top: 0;
	left: 0;
}
.zixun .bofang{
	width: 60px !important;
	height: 60px !important;
	position: absolute !important;
	top: 60px;
	left: 110px;
	z-index: 333;
	opacity: .8;
}
</style>