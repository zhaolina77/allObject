<template>
	<div class="content">
		<div class="content-top"></div>
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
		<!--内容-->
		<div class="wrap shop">
			<!--类型-->
			<div class="bg-white type clearfix">
				<div class="item" v-for="(item,index) in classfyOneList">
					<div class="">
						<span class="font-bd font-size-16">{{item.name}}</span>
						<span class="fr text-theme hover" @click="Toclassfy(item.id)">更多</span>
					</div>
					<!--<ul class="text-grayer clearfix">
							<li>台钓竿</li>
							<li>手竿</li>
							<li>溪流竿</li>
							<li>鲫鱼竿</li>
							<li>路亚竿</li>
							<li>海竿</li>
							<li>战斗竿</li>
							<li>竞技竿</li>
							<li>抛竿</li>
							<li>罗非竿</li>
						</ul>-->
				</div>
			</div>
			
			<!--新品推荐 超值特惠 新手指南 热销渔具  分类-->
			<div class="four clearfix">
				<div class="bg-white fl nr" v-for="item in specialList">
					<div class="text-black font-bd title font-size-26" style="text-align: left;">{{item.name}}</div>
					<ul class="clearfix" @click="toTehui(item.id,item.pic)">
						<li class="fl" v-for="vo in item.good_list" >
							<div class="pic">
								<img :src="vo.thumb"/>
							</div>
							<div class="text ellipsis text-center text-grayer font-size-16" style="width: 160px;">{{vo.name}}</div>
						</li>
					</ul>
				</div>
			</div>
			
			
			<!--精选商家-->
			<div class="shangjia bg-white">
				<div class="text-black font-bd title font-size-26" style="text-align: left;">精选商家</div>
				<ul class="clearfix">
					<li class="fl pic" v-for="(item, index) in selectList" :key="index" @click="toTehuiShop(item.id)">
						<img :src="item.thumb"/>
					</li>
				</ul>
			</div>
			
			<!--为你推荐-->
			<div class="text-black font-bd text-center font-size-26" style="text-align: left;padding-top: 25px;padding-left: 25px;">为你推荐</div>
			<div class="shop-list">
				<ul class="clearfix">
					<li class="bg-white fl" v-for="item in recommendedList" @click="toShopDetail(item.id)">
						<div class="pic">
							<img :src="item.thumb"/>
						</div>
						<div class="text">
							<div class="ellipsis-2 font-size-16">{{item.name}}</div>
							<div class="text-orange font-size-12 num" style="justify-content: flex-start;">￥<span class="font-size-30 font-w">{{item.market_price}}</span></div>
						</div>
					</li>
				</ul>
			</div>
				<!--分页-->
			<div id="wr-page" class="page-out bg-white">
				<el-pagination
				  background
				  layout="prev, pager, next"
				  :total="total"
				  :page-size="pagesize"
				  :current-page="currentPage"
				  @current-change="changeCurrent"
				 >
				</el-pagination>				
			</div>
			
		</div>
		
		
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import bus from '../../assets/eventBus.js';
	export default {
		name: 'shopIndex',
		data () {
			return {
				classfyOneList: [], // 一级分类列表
				classifyTwoList: [], // 二级分类列表
				recommendedList: [], // 为你推荐列表
				selectList: [],  // 精选商家列表
				specialList : [] , // 专区列表
				total: 0, // 总条目数
				pagesize: 8, // 每页显示条目数
				currentPage: 1, // 当前页数
				bannerList:[]
			}
		},
		created() {
			this.getclassifyOneList();
//			this.getclassfyTwoList()
		},
		mounted() {
			this.recommendedForYou(1);
			this.selectShopData();
			this.getSpecialList()
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
						module_id: 4
					}
				}).then(function(res) {
//					console.log(res)
					if (res.data.status == '1') {
						_this.bannerList = res.data.data.banner_list
					}
				}).catch(function(error) {
					// console.log(err)
				})
			},
			
			getclassifyOneList () {
				this.$axios.get(this.$common.shop_classifyOneList,{
					params: {
						
					}
				}).then(res => {
//					console.log(res,'分类')
					if(res.data.status == 1) {
						this.classfyOneList = res.data.data.classifyOneList.slice(0,3)
//						console.log(this.classfyOneList)
					}
				}).catch(err => {
					
				})
			},
			
			// 查看商品的一二级分类
//			getclassfyTwoList() {
//				this.$axios.get(this.$common.shop_classifyList,{
//					params: {
//						classId: 4
//					}
//				}).then(res => {
//					console.log(res,'res二级分类0000000000000000000000000000000')
//					if(res.data.status == 1){
//						// this.classfyOneList = res.data.data.classifyOneList.slice(0,3)
//						this.classifyTwoList = res.data.data.classifyTwoList
//						console.log(this.classifyTwoList,'classifyTwoList')
//					}
//				}).catch(err => {
//					console.log(err,'err')
//				})
//			},
			// 为你推荐
			recommendedForYou(currentPage) {
				this.$axios.get(this.$common.shop_recommendedForYou,{
					params:{
						pageNo: currentPage,
						pageSize: this.pagesize
					}
				}).then(res => {
//					console.log(res,'res为你推荐')
					if(res.data.status == 1) {
						this.recommendedList = res.data.data.page.list
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
//						console.log(this.recommendedList,'recommendedList')
					}
				}).catch( err => {
//					console.log(err,'err')
				})
			},
			// currentpage改变时触发
			changeCurrent(currentPage) {
//				console.log(currentPage,'page===')
				this.recommendedForYou(currentPage)
			},
			// 去二级分类页面
			Toclassfy(classId,index) {
				localStorage.setItem('classId',classId)
				localStorage.setItem('index',index)
//				this.$router.push({name:'shopClassify',path:'/shopClassify',params:{classId:classId,index: index}})
				this.$router.push({name:'shopClassify',path:'/shopClassify'})
			},
			// 精选商家数据
			selectShopData () {
				this.$axios.get(this.$common.shop_choicenessShopList, {
					params: {
						
					}
				}).then( res => {
//					console.log(res,'精选商家列表')
					this.selectList = res.data.data.shopList
				}).catch( err => {
//					console.log(err, 'err')
				})
			},
			// 首页展示每个专区的商品
			getSpecialList () {
				this.$axios.get(this.$common.shop_prefectureList, {
					params: {
						type: 1
					}
				}).then(res => {
					console.log(res,'首页展示每个专区的列表')
					if(res.data.status == 1){
						this.specialList = res.data.data.special_area_list
					}
				}).catch(err => {
//					console.log(err,'err')
				})
			},
			// 去详情页面
			toShopDetail(id) {
				this.$router.push({name: 'shopDetail',path: '/shopDetail',query:{id: id}})
			},
			// 去特惠页面
			toTehui (id,pic) {
				this.$router.push({name: 'tehui', path: '/tehui', query:{prefectureId:id,pic:pic}})
			},
			// 从上铺进入特惠页面
			toTehuiShop(id) {
				this.$router.push({name: 'tehui', path: '/tehui', query:{shopId:id}})
			}
		}
	}
</script>

<style scoped>
	.el-pager li {
		width: 30px;
	}
</style>
