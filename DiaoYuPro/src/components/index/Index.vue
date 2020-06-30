<template>
	<div class="content" id="app">
		<div class="content-top"></div>
		<div class="index">
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

			<div class="fenlei bg-white">
				<div class="wrap inner">
					<div class="item">
						<div class="nr clearfix">
							<img class="fl" src="../../assets/images/index1.png" />
							<div class="text fl">
								<div class="text-theme font-size-30 font-bd">326,00</div>
								<div class="font-size-14 text-grayer">举办钓鱼赛事（场）</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="nr clearfix">
							<img class="fl" src="../../assets/images/index2.png" />
							<div class="text fl">
								<div class="text-theme font-size-30 font-bd">320,00</div>
								<div class="font-size-14 text-grayer">合作钓场</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="nr clearfix">
							<img class="fl" src="../../assets/images/index3.png" />
							<div class="text fl">
								<div class="text-theme font-size-30 font-bd">580,00</div>
								<div class="font-size-14 text-grayer">地方钓鱼协会</div>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="nr clearfix">
							<img class="fl" src="../../assets/images/index4.png" />
							<div class="text fl">
								<div class="text-theme font-size-30 font-bd">330,00</div>
								<div class="font-size-14 text-grayer">渔具是商家/厂家</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--赛事推荐-->
			<div class="wrap bg-white saishi-tuijian">
				<div class="public-title">
					<span class="font-size-24 font-bd">赛事推荐</span>
					<router-link to="/match">
					<span class="text-grayer hover" @click="more">更多比赛</span>
					</router-link>
				</div>
				<ul class="clearfix">
					<li class="fl" v-for="item in matchList" @click="detail(item.id)">
						<div class="pic">
							<img :src="item.pic" />
						</div>
						<div class="text text-grayer ellipsis font-size-16 hover">{{item.name}}</div>
					</li>
				</ul>
			</div>

			<!--协会动态-->
			<div class="wrap bg-white dongtai-xiehui">
				<div class="public-title border-b">
					<span class="font-size-24 font-bd">协会动态</span>
				</div>
				<ul class="list">
					<li class="clearfix lis" v-for="item in dynamicList" @click="toDetail(item.id)" >
						<div class="pic fl xh">
							<img :src="item.thumb" />
							<img class="bofang" src="../../assets/images/player.png" v-if="item.type==3"/>
						</div>
						<div class="text">
							<div class="ellipsis font-size-20 font-bd bt">{{item.title}}</div>
							<div class="ellipsis-3 font-size-16 text-grayer fbt" >{{item.title}}</div>
							<div class="font-size-12 text-grayer bq">{{item.address}}·{{item.create_date}}</div>
						</div>
					</li>
				</ul>
				<!--分页-->
				<div id="wr-page" class="page-out bg-white" v-if="dynamicList.length != 0">
					<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNo"
					@current-change="changePage">
					</el-pagination>
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
		
		data() {  
			return {
				matchList: [], 
				bannerList: [],
				token: '',
				dynamicList: [], // 协会动态列表
				currentPage: 1,
				pageSize: 6,
				total:0,
				pageNo:1,
			}
		},
		created() {
			this.init();
			this.getBanner()
			this.getDynamic()
			// 获取token
//			this.token = sessionStorage.getItem('token')
			console.log(this.token,'token值',1111)
		},
		mounted() {
			
			
		},
		watch:{
			loginblock:function(){
				console.log(this.loginblock,'1111111111dsfdsfsd')
			}
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
			more(){
				this.$router.push({name: 'match',path: '/match'})
			},
			// 首页数据
			init() {
				var _this = this;
				this.$axios.get(this.$common.index_matchs_list, {
					params: {
						type: 0,
						module_id: 0,
						pageNo: 1,
						pageSize: _this.pageSize

					},
				}).then(function(res) {
					console.log(res)
					_this.matchList = res.data.data.page.list
				}).catch(function(error) {
					console.log(error) //错误处理 相当于error
				})
			},
			//  获取banner
			getBanner() {
				var _this = this;
				this.$axios.get(this.$common.banners, {
					params: {
						module_id: 1
					}
				}).then(function(res) {
//					console.log(res,"banner-----------------")
					if (res.data.status == '1') {
						_this.bannerList = res.data.data.banner_list
					}
				}).catch(function(error) {
					// console.log(err)
				})
			},
			// 首页协会动态
			getDynamic (){
				var _self = this;
				this.$axios.get(this.$common.index_home_dynamic,{
					params:{
						pageNo:_self.pageNo,
						pageSize:_self.pageSize
					}
				}).then(function(res){
					console.log(res,'首页协会动态')
					if(res.data.status == '1'){
						var pics=''
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
						_self.dynamicList = res.data.data.page.list;
						_self.total = res.data.data.page.totalRow;

						console.log(_self.dynamicList,8888888)
					}
				}).catch(function(err){
					
				})
			},
			//赛事推荐跳转详情
			detail(id){
				console.log(id)
				this.$router.push({name: 'cansaiDetail',path: '/cansaiDetail',query:{id: id}})
			},
			// 协会动态跳转详情
			toDetail(id){
				console.log(id)
				this.$router.push({name:'dongtaiDetail',path:'/dongtaiDetail',query:{data:id}});
			},
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
				this.getDynamic()
			},
			
			
		}
	}
</script>
<style>
	.dongtai-xiehui li{
	padding: 0;
}
	.dongtai-xiehui .lis{
	padding: 30px 0;
}
.xh{
	position: relative;
	top: 0;
	left: 0;
}
.xh .bofang{
	width: 60px !important;
	height: 60px !important;
	position: absolute !important;
	top: 60px;
	left: 110px;
	z-index: 333;
	opacity: .8;
}
</style>
