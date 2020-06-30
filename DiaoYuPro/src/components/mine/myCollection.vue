<template>

	<!--左边切换-->

	<!--右边的内容-->
	<div class="mine-right my-collection">
		<!--切换-->
		<div class="bg-white nav clearfix">
			<div class="item" :class="{'on': status == 1}" @click="myCollGood (1)">商品</div>
			<div class="item" :class="{'on': status == 2}" @click="myCollShop(1)">商家</div>
			<div class="item" :class="{'on': status == 3}" @click="myCollsite(1)">钓场</div>
		</div>

		<!--切换后的内容-->
		<!--商品-->
		<div class="shop-list" v-if="status == 1">
			<ul class="clearfix">
				<li class="bg-white fl" v-for="item in shopList" @click="toShopDetail(item.goods_id)">
					<div class="pic">
						<img :src="item.thumb" />
					</div>
					<div class="text">
						<div class="ellipsis-2 font-size-16">{{item.name}} </div>
						<div class="num">
							<span class="text-orange font-size-12 ">￥<span class="font-size-30 font-w">{{item.market_price}}</span></span>
							<span class="text-grayer" @click.stop="shopCollect(item.goods_id)">取消收藏</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!--商家-->
		<div class="bg-white shangjia-list" v-if="status == 2">
			<ul>
				<li class="" v-for="item in shopList" >
					<div class="info"  @click="shangjia(id)">
						<div class="nr clearfix">
							<div class="sj-pic fl"><img :src="item.thumb" /></div>
							<div class="xinxi">
								<div class="font-size-16 margin-t5 text-theme">{{item.name}}</div>
								<div class="font-size-12 margin-t5"><span class="text-grayer">联系电话：</span>{{item.phone}}</div>
								<div class="font-size-12 margin-t5 ellipsis"><span class="text-grayer">地址：</span>{{item.address}}</div>
							</div>
						</div>
					</div>
					<div class="pic">
						<div class="qx-btn font-size-12 text-grayer" @click="shangCollect(item.shop_id)">取消收藏</div>
					</div>
				</li>
			</ul>
		</div>
		<!--钓场-->
		<div class="bg-white diaochang-list" v-if="status == 3">
			<ul>
				<li class="clearfix" v-for="item in shopList">
					<div class="pic fl">
						<img :src="item.thumb" />
					</div>
					<div class="info">
						<div class="name">
							<div class="font-size-20 margin-t font-bd hover" @click="toFishDetail(item.angling_site_id)">
								{{item.name}}
							</div>
							<div class="qx-btn font-size-12 text-grayer" @click="siteCollect(item.angling_site_id)">取消收藏</div>
						</div>
						<div @click="toFishDetail(item.angling_site_id)">
							<div class="text-orange font-size-14 margin-t">{{item.type_name_list ? item.type_name_list.join('/') : ''}} </div>
							<div class="font-size-14 text-grayer margin-t">
								{{item.fish}}
							</div>
							<div class="font-size-14 text-grayer margin-t ellipsis">{{item.content}}</div>
							<div class="font-size-14  text-grayer margin-t">收费：{{item.price}}元/{{item.charging_standard_name}}</div>

						</div>

					</div>
				</li>
			</ul>
		</div>
		<!-- 分页 -->
		<div id="wr-page" class="page-out bg-white">
			<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="changeCurrent">
			</el-pagination>
		</div>

	</div>

</template>

<script>
	export default {
		name: 'myCollection',
		data() {
			return {
				token: sessionStorage.getItem('token'),
				currentPage: 1,
				pageSize: 8,
				total: 0,
				status: 1,
				shopList: [], // 商家list 商品list
			}
		},
		created() {
			this.myCollGood()
		},
		mounted() {
		},
		methods: {
			shangjia(id) {
				this.$router.push({
					name: 'tehui',
					path: '/tehui',
					query: {
						id: id
					}
				})
			},
			// 去钓场详情页面
			toFishDetail(id) {
				this.$router.push({
					name: 'fishingDetail',
					path: '/fishingDetail',
					query: {
						id: id
					}
				})
			},
			// // 我的收藏商品
			myCollGood(pageNo) {
				this.status = 1
				this.$axios.get(this.$common.wode_my_coll_good, {
					params: {
						token: this.token,
						pageNo: pageNo,
						pageSize: this.pageSize
					}
				}).then(res => {
					console.log(res, "我的收藏商品")
					if(res.data.status == 1) {
						this.shopList = res.data.data.page.list
						this.currentPage = res.data.data.page.pageNumber
						this.total = res.data.data.page.totalRow
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 我的收藏商家
			myCollShop(pageNo) {
				this.status = 2
				this.$axios.get(this.$common.wode_my_coll_shop, {
					params: {
						token: this.token,
						pageNo: pageNo,
						pageSize: this.pageSize
					}
				}).then(res => {
					console.log(res, "我的收藏商家")
					if(res.data.status == 1) {
						this.shopList = res.data.data.page.list
						this.currentPage = res.data.data.page.pageNumber
						this.total = res.data.data.page.totalRow
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},

			// 我的收藏钓场
			myCollsite(pageNo) {
				this.status = 3
				this.$axios.get(this.$common.wode_my_coll_angling_site, {
					params: {
						token: this.token,
						pageNo: pageNo,
						pageSize: this.pageSize,
						lon: '', // 经度
						lat: '', // 维度
					}
				}).then(res => {
					console.log(res, "我的收藏钓场")
					if(res.data.status == 1) {
						this.shopList = res.data.data.page.list
						this.currentPage = res.data.data.page.pageNumber
						this.total = res.data.data.page.totalRow
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 分页
			changeCurrent(pageNo) {
				if(this.status == 1) {
					this.myCollGood(pageNo)
				} else if(this.status == 2) {
					this.myCollShop(pageNo)
				} else {
					this.myCollsite(pageNo)
				}
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
			// 取消商品收藏
			shopCollect(id) {
				this.$axios.get(this.$common.shop_goodColl, {
					params: {
						id: id, // 商品id
						token: this.token
					}
				}).then(res => {
					if(res.data.status == 1) {
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 100
						})
						this.myCollGood(1)
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 取消钓场收藏
			siteCollect(id) {
				this.$axios.get(this.$common.site_angling_site_coll, {
					params: {
						id: id, // 钓场id
						token: this.token, //
					}
				}).then(res => {
					if(res.data.status == 1) {
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 100
						})
						this.myCollsite(1)
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
					console.log(err, 'err==')
				})
			},
			//取消商家收藏
			shangCollect(id){
				console.log(55555555555555)
				this.$axios.get(this.$common.checkShopCollect_url, {
					params: {
						id: id, // 商家id
						token: this.token, //
					}
				}).then(res => {
					console.log(res)
					if(res.data.status == 1) {
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 100
						})
						this.myCollShop(1)
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
					console.log(err, 'err==')
				})
				
				
			},
		}
	}
</script>

<style>

</style>