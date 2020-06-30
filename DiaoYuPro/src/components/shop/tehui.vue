<template>
	<div class="content">
		<div class="content-top"></div>
		<!--banner-->
		<div class="banner">
			<div id="topNav" class="swiper-container" style="border-radius:5px">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in bannerList" >
						<img :src="item.pic" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<div class="wrap discount">
			<div class="shop-list">
				<ul class="clearfix">
					<li class="bg-white fl" v-for="item in shopList" @click="toShopDetail(item.id)">
						<div class="pic">
							<img :src="item.thumb" />
						</div>
						<div class="text">
							<div class="ellipsis-2 font-size-16">{{item.name}}</div>
							<div class="text-orange font-size-12 num" style="justify-content: flex-start ;">￥<span class="font-size-30 font-w">{{item.market_price}}</span></div>
						</div>
					</li>
				</ul>
			</div>
			<!--分页-->
			<div id="wr-page" class="page-out bg-white">
				<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="changeCurrent">
				</el-pagination>
			</div>

		</div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	export default {
		name: 'tehui',
		data() {
			return {
				shopList: [],
				currentPage: 1,
				pageSize: 16,
				total: 0,
				prefectureId: '', // 专区id
				shopId: '', // 上铺id
				bannerList:[]
			}
		},
		created() {
			if(this.$route.query.prefectureId) {
				this.prefectureId = this.$route.query.prefectureId
			}
			if(this.$route.query.shopId) {
				this.shopId = this.$route.query.shopId
			}
			this.getBanner()
		},
		mounted() {
			this.getTehuiList(1)
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
			//banner
			getBanner() {
				var _this = this;
				this.$axios.get(this.$common.banners, {
					params: {
						module_id: 3
					}
				}).then(function(res) {
										console.log(res,"banner-----------------")
					if(res.data.status == '1') {
						_this.bannerList = res.data.data.banner_list
					}
				}).catch(function(error) {
					// console.log(err)
				})
			},
			getTehuiList(currentPage) {
				this.$axios.get(this.$common.shop_goodsList, {
					params: {
						shopId: this.shopId, // 商铺id
						prefectureId: this.prefectureId, // 专区id
						secondLevelId: '', // 二级分类id
						name: '', // 搜索 （商品名称、一二级分类）
						sales: '', // 1:销量
						price: '', // 1:降序 2：升序
						pageNo: currentPage,
						pageSize: this.pageSize
					}
				}).then(res => {
					console.log(res, '商品列表')
					if(res.data.status == 1) {
						this.shopList = res.data.data.page.list
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
					}
				}).catch(err => {

				})
			},
			// 分页
			changeCurrent(currentPage) {
				this.getTehuiList(currentPage)
			},
			// 去详情页面
			toShopDetail(id) {
				this.$router.push({
					name: 'shopDetail',
					path: '/shopDetail',
					query: {
						id: id
					}
				})
			},
		}
	}
</script>

<style>

</style>