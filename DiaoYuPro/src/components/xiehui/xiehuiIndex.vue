<template>
	<div class="content">
		<div class="content-top"></div>
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

		<!--协会列表-->
		<div class="wrap bg-white dongtai-xiehui">
			<div class="public-title border-b">
				<span class="font-size-24 font-bd">协会列表</span>
				<!--<span class="text-grayer hover">更多比赛</span>-->
			</div>
			<ul class="list" v-if="xiehuiList.length != 0">
				<li class="clearfix lis" v-for="item in xiehuiList" @click="toDetail(item.id)">
					<div class="pic fl">
						<img :src="item.thumb" />
					</div>
					<div class="text">
						<div class="ellipsis font-size-20 font-bd bt">{{item.name}}</div>
						<div class="ellipsis-3 font-size-16 text-grayer fbt">{{item.content}}
							<span class="font-size-14" style="color: #1765FF;float: right;">查看详情>></span>
						</div>
						<div class="font-size-12 text-grayer bq">{{item.address}}·{{item.create_date}}</div>
					</div>
				</li>
				<!-- <li class="clearfix">
					<div class="pic fl">
						<img src="../../assets/images/lizi.png"/>
					</div>
					<div class="text">
						<div class="ellipsis font-size-20 font-bd bt">钓鱼人都在哪里买渔具，实体渔具店和网购究竟有何区别？</div>
						<div class="ellipsis-3 font-size-16 text-grayer fbt">今天刮起北至东北风3一4级。北方冷空到达上海。己经耗尽力量，天刚亮，拿着鱼具包，沿河岸一路寻觅最佳位置。今天是农历十八，乃是大潮汐，也是放水日，故沿岸不见一个钓友。 迎面吹来阵阵西北风，夾着花香。己经耗尽力量，天刚亮，拿着鱼具包，沿河岸一...</div>
						<div class="font-size-12 text-grayer bq">西安钓鱼协会·2小时前</div>
					</div>
				</li> -->
			</ul>
			<div v-else class="text-center" style="font-size: 18px;line-height: 94px;">暂无协会信息</div>

			<!--分页-->
			<div id="wr-page" class="page-out bg-white" v-if="xiehuiList.length != 0">
				<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage"
				 @current-change="changePage">
				</el-pagination>
			</div>
		</div>
		<div>{{count}}</div>
		<input type="text" v-model="count">
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import bus from '../../assets/eventBus.js';
	export default {
		name: 'xiehuiIndex',
		components: {

		},
		data() {
			return {
				xiehuiList: [], // 协会列表
				currentPage: 1,
				pageSize: 4,
				total: 0,
				bannerList:[]
			}
		},
		created() {
			this.getBanner()
			console.log(this.$store.state.showFooter,45656666778)
		},
		mounted() {
			this.getXiehuiList()
			
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
		computed:{
			count() {
				return this.$store.state.count
			}
		},
		methods: {
			//  获取banner
			getBanner() {
				var _this = this;
				this.$axios.get(this.$common.banners, {
					params: {
						module_id: 6
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
			// 获取协会列表
			getXiehuiList() {
				var _self = this;
				this.$axios.get(this.$common.xiehui_association_list, {
					params: {
						name: '', // 搜索
						pageNo: this.currentPage,
						pageSize: this.pageSize,  
					}
				}).then(function(res) {
					console.log(res, '协会列表')
					if (res.data.status == '1') {
						_self.xiehuiList = res.data.data.page.list
						_self.total = res.data.data.page.totalRow
						_self.currentPage = res.data.data.page.pageNumber
						console.log(_self.xiehuiList, 7777)
					}
				}).catch(function(err) {

				})
			},
			// pageSize 改变时会触发
			handleSizeChange: function(size) {
				console.log(458)
				return 
				this.pagesize = size;
				console.log(this.pagesize,7777) //每页下拉显示数据
			},
			// currentPage 改变时会触发
			changePage(currentPage) {
				this.currentPage = currentPage
				this.getXiehuiList()
			},
			// 跳转详情
			toDetail(id){
				console.log(this.$router,3333333333333)
				this.$router.push({name:'xiehuiDongtai',path:'/xiehuiDongtai',query:{id:id}})
			},
		}
	}
</script>

<style>
	li.number {
		padding: 0 !important;
	}

	li.el-icon-more {
		padding: 0 !important;
	}
</style>
