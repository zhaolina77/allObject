<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="fishing">
			<!--banner-->
			<div class="banner">
				<div id="topNav" class="swiper-container" style="border-radius:5px">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="item in bannerList">
							<img :src="item.pic" />
						</div>
						<!--<div class="swiper-slide">
							<img src="../../assets/images/banner.png" />
						</div>-->
					</div>
					<div class="swiper-pagination"></div>
				</div>
			</div>
			<!--切换-->
			<div class="tab border-b bg-white">
				<div class="wrap">
					<ul class="clearfix">
						<li :class="{'on': statusType == 0}" @click="tabType(0)">全部</li>
						<li :class="{'on': statusType == item.id}" v-for="item in typeList" @click="tabType(item.id)">{{item.name}}</li>
					</ul>
				</div>
			</div>

			<!--inner-->
			<div class="wrap bg-white  inner">
				<!--头部的筛选-->
				<div class="border-b public-title">
					<span class="font-size-24 font-bd">钓场类型</span>
					<ul class="clearfix">
						<li :class="{'on': statusStand == 0}" @click="taBStand(0)">全部</li>
						<li :class="{'on': statusStand == item.id}" v-for="item in standarsList" @click="taBStand(item.id)">{{item.name}}</li>
					<!-- 	<li>按斤</li>
						<li>按天</li> -->
					</ul>
				</div>
				<!--内容-->
				<div class="diaochang-list">
					<ul v-if="siteList.length != 0">
						<li class="clearfix" v-for="item in siteList" @click="toFishDetail(item.id)">
							<div class="pic fl">
								<img :src="item.thumb" />
							</div>
							<div class="info">
								<div class="font-size-20 margin-t font-bd hover">{{item.name}}</div>
								<div class="text-orange font-size-14 margin-t">{{item.type_name_list ? item.type_name_list.join('/') : ''}} </div>
								<div class="font-size-14 text-grayer margin-t">
									{{item.fish}}
									<!--<span class="font-bd text-black ditu" @click="map"> <img class="dw" src="../../assets/images/dw.png" /> 查看地图</span>-->
								</div>
								<div class="font-size-14 text-grayer margin-t ellipsis">介绍：{{item.content}}</div>
								<div class="font-size-14  text-grayer margin-t">收费：{{item.price}}元/{{item.charging_standard_name}}</div>
							</div>
						</li>
						<!-- <li class="clearfix">
							<div class="pic fl">
								<img src="../../assets/images/lizi.png" />
							</div>
							<div class="info">
								<div class="font-size-20 margin-t font-bd hover">山水农家乐</div>
								<div class="text-orange font-size-14 margin-t">黑坑 / 农家乐 </div>
								<div class="font-size-14 text-grayer margin-t">
									长安区长安区太乙街办杏元村二组
									<span class="font-bd text-black ditu"> <img class="dw" src="../../assets/images/dw.png" /> 查看地图</span>
								</div>
								<div class="font-size-14 text-grayer margin-t ellipsis">介绍：2、4、6大钓，100一天放鱼1000斤。东边大坑周天放鱼160元/天</div>
								<div class="font-size-14  text-grayer margin-t">收费：30元/斤</div>
							</div>
						</li> -->
					</ul>
					<div v-else class="text-center" style="font-size: 18px;line-height: 94px;"> 暂无钓场</div>
				</div>
				<!--分页-->
				<div id="wr-page" class="page-out bg-white" v-if="siteList.length != 0">
					<el-pagination 
						background layout="prev, pager, next" 
						:total="total" 
						:page-size="pageSize" 
						:current-page="currentPage"
						 @current-change="changeCurrent">
					</el-pagination>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	export default {
		name: 'fishIndex',
		data() {
			return {
				bannerList:[],
				typeList: [], // 钓场类型
				standarsList: [], // 收费标准
				pageSize: 8,
				currentPage: 1,
				total: 0,
				siteList: [], // 列表
				statusType: 0, // 钓场类型状态
				statusStand: 0, // 收费标准状态
				type_ids: '', // 钓场类型
				charging_standard_id: '', // 收费标准
				dc_type:[]
			}
		},
		created() {
			this.getDataList()
			this.getBanner()
		},
		mounted() {
			this.getSiteList(1)
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
						module_id: 2
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
			map(){
//				this.$router.push("/maps")	
			},
			// 类型切换
			tabType (id) {
				this.statusType = id
				this.type_ids = id
				if(id == 0) {
					this.type_ids = ''
				}
				this.getSiteList(1)
			},
			// 收费标准切换
			taBStand (id) {
				this.statusStand = id
				this.charging_standard_id = id
				if(id == 0 ) {
					this.charging_standard_id = ''
				}
				this.getSiteList(1)
			},
			getDataList() {
				this.$axios.get(this.$common.site_data_list, {
					params: {

					}
				}).then(res => {
					if (res.data.status == 1) {
						this.typeList = res.data.data.angling_site_type_list
						this.standarsList = res.data.data.charging_standard_list
						console.log(this.typeList,'====',this.standarsList)
					}
				}).catch(err => {

				})
			},
			// 钓场列表
			getSiteList (currentPage) {
				this.$axios.get(this.$common.site_site_list,{
					params:{
						type_ids: this.type_ids, // 钓场类型(可以多选 例： 1,2)
						charging_standard_id: this.charging_standard_id, // 收费标准ID,
						name: '', // 搜索,
						lon: '', // 用户经度,
						lat: '', //用户纬度,
						sort: 0, // 0-距离 1-最新,
						pageNo: currentPage, // 
						pageSize: this.pageSize //
					}
				}).then( res => {
					console.log(res)
					if(res.data.status == 1) {
						this.siteList = res.data.data.page.list
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
					}
					
				}).catch(err => {
					
				})
			},
			// 分页
			changeCurrent (currentPage) {
				this.getSiteList(currentPage)
			},
			// 去钓场详情页面
			toFishDetail(id) {
				this.$router.push({name: 'fishingDetail', path: '/fishingDetail', query:{ id: id}})
			},
		}
	}
</script>

<style>
</style>
