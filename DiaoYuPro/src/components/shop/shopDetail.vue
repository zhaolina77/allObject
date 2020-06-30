<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap shop-detail">

			<div class="shop-sel bg-white clearfix big_box">
				<div class="shop-nr fl">
					<div class="big-pic " @mouseenter="enter" @mouseleave="leave" @mousemove="marks">
						<img :src="imgs" />
						<div class="scale" v-if="shows" :style="{top:top+'px',left:left+'px'}" @mousemove.stop>
						</div>
					</div>
					<div class="small-pic clearfix">
						<div class="fl pic" :class="{'img_on':imgIndex==index}" v-for="(img,index) in good.pictures" @click="changeImg(index)">
							<img :src="img" />
						</div>
					</div>
				</div>
				<div class="scale_pic" v-if="shows">
					<img :src="imgs" :style="{top:marginTop+'px',left:marginLeft+'px'}" />
					<!--<img :src="imgs" :style="{margin-left:marginLeft+'px',margin-top:marginTop+'px'}"/>-->
				</div>
				<div class="text fr">
					<div class="title font-size-16 ellipsis-2">{{good.name}}</div>

					<div class="msxq bg-grayer">
						<ul>
							<li class="" style="height: 50px;line-height: 50px;border-bottom: solid 1px #E6EBF4;">
								<div class="left text-grayer">库存</div>
								<div class="right clearfix">{{stocknum}}件</div>
							</li>
							<li class="margin-b" style="height: 50px;line-height: 50px;">
								<div class="left text-grayer">数量</div>
								<div class="right clearfix">
									<span v-for="item in serviceList">{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
							</li>
						</ul>
					</div>

					<div class="msxq">
						<ul>
							<li class="margin-b">
								<div class="left text-grayer">商家</div>
								<div class="right text-theme">{{shop.shop_name}}</div>
							</li>
							<li class="">
								<div class="left text-grayer">{{typeName}}</div>
								<div class="right clearfix" v-for="(item,index) in typeArr" @click="oneSpec(index)">
									<div class="sel" :class="{'on': statusOne == index}">{{item}}</div>
								</div>
							</li>
							<li class="">
								<div class="left text-grayer">{{typeTwoName}}</div>
								<div class="right clearfix" v-for="(item,index) in typeTwoArr" @click="twoSpec(index)">
									<div class="sel" :class="{'on': statusTwo == index}">{{item}}</div>
								</div>
							</li>
							<li class="margin-b">
								<div class="left text-grayer">{{typeThreeName}}</div>
								<div class="right clearfix" v-for="(item, index) in typeThreeArr" @click="ThreeSpec(index)">
									<div class="sel" :class="{'on': statusThree == index}">{{item}}</div>
								</div>
							</li>
							<li class="margin-b">
								<div class="left text-grayer">数量</div>
								<div class="right">
									<div class="num">
										<span class="jian" @click="reduce()">-</span>
										<span class="sl">{{num}}</span>
										<span class="add" @click="add()">+</span>
									</div>
								</div>
							</li>
							<li class="margin-b">
								<div class="left text-grayer">金额</div>
								<div class="right text-orange">￥<span class="font-size-30 font-w">{{good.market_price}}</span></div>
							</li>
						</ul>
					</div>
					<div class="caozuo clearfix">
						<div class="btn fl" @click="add_Cart()">加入购物车</div>
						<div class="btn jia fl" @click="goodSubmit()">立即购买</div>
						<div class="shoucang fl" v-if="isColl == 0" @click="shopCollect(good.id)">
							<img class="margin-t10" src="../../assets/images/sc.png" />
						</div>
						<div class="shoucang fl" v-else>
							<img class="margin-t10" src="../../assets/images/sc-on.png" @click="shopCollect(good.id)" />
						</div>
					</div>
				</div>
			</div>

			<!--详情内容-->
			<div class="bg-white detail">
				<div class="fenlei-tab bg-white">
					<div class="clearfix font-size-16 tab ">
						<div class="fl item text-grayer" :class="{'on xq':status == 0 }" @click="shopDetail()">商品详情</div>
						<div class="fl item text-grayer " :class="{'on xq':status == 1 }" @click="shopComment(0,good.id)">商品评价</div>
					</div>
				</div>
				<!--详情-->
				<div class="inner" v-html="good.content" v-if="status == 0">

				</div>
				<!--评价-->
				<div class="bg-white public-pingjia" v-else>
					<div class="fenlei-tab bg-white">
						<!-- 0:全部1好评2中评3差评 4:有图 -->
						<ul class="clearfix font-size-16 text-grayer">
							<li class="fl" :class="{'on': statusComment == 0}" @click="shopComment(0,good.id)">全部 <span class="font-size-12">({{allCount}})</span></li>
							<li class="fl" :class="{'on': statusComment == 4}" @click="shopComment(4,good.id)">有图<span class="font-size-12">({{picCount}})</span></li>
							<li class="fl" :class="{'on': statusComment == 1}" @click="shopComment(1,good.id)">好评<span class="font-size-12">({{fineCount}})</span></li>
							<li class="fl" :class="{'on': statusComment == 2}" @click="shopComment(2,good.id)">中评<span class="font-size-12">({{middleCount}})</span></li>
							<li class="fl" :class="{'on': statusComment == 3}" @click="shopComment(3,good.id)">差评<span class="font-size-12">({{inferorCount}})</span></li>
						</ul>
					</div>
					<!--头部的筛选-->
					<div class="inner text-center noneComment" v-if="commentList.length == 0">暂无评价信息</div>
					<div v-else>
						<ul class="inner">
							<li class="border-b clearfix" v-for="item in commentList">
								<div class="info clearfix">
									<div class="head-pic">
										<img :src="item.head_portrait" />
									</div>
									<div class="pingfen">
										<div class="ellipsis font-size-16 name">{{item.nick_name}}</div>

										<div class="" v-if="item.level==5">
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<span class="font-size-14 text-orange">{{item.level}}</span>
										</div>
										<div class="" v-else-if="item.level==4">
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<span class="font-size-14 text-orange">{{item.level}}</span>
										</div>
										<div class="" v-else-if="item.level==3">
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<span class="font-size-14 text-orange">{{item.level}}</span>
										</div>
										<div class="" v-else-if="item.level==2">
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<span class="font-size-14 text-orange">{{item.level}}</span>
										</div>
										<div class="" v-else-if="item.level==1">
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<img class="star1" src="../../assets/images/star.png" />
											<span class="font-size-14 text-orange">{{item.level}}</span>
										</div>
										<div class="" v-else>
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<img class="star1" src="../../assets/images/star-on.png" />
											<span class="font-size-14 text-orange">{{item.level}}</span>
										</div>

									</div>
								</div>
								<div class="pingjia">
									<div class="nr">{{item.content}}</div>
									<div class="clearfix">
										<div class="pic" v-for="vo in item.pic"><img :src="vo" preview='5' /></div>
									</div>
									<div class="text-grayer font-size-12 time">{{item.create_date}}</div>

								</div>
							</li>
						</ul>
						<div id="wr-page" class="page-out bg-white">
							<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="changeCurrent">
							</el-pagination>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import bus from '../../assets/eventBus.js'
	export default {
		name: 'shopDetail',
		data() {
			return {
				id: '', // 商品id
				token: sessionStorage.getItem('token'),
				good: '', // 商品信息
				shop: '', // 商铺信息
				shopId: '', // 商铺id
				isColl: 0, // 是否收藏
				num: 1, // 选择数量
				status: 0, //
				total: 0,
				pageSize: 10,
				currentPage: 1,
				level: 0, // 评价级别
				allCount: 0, // 全部
				fineCount: 0, // 好评
				middleCount: 0, // 中ping
				inferorCount: 0, // 差评
				picCount: 0, // 有图
				commentList: [], // 评论list
				typeName: '', // 规格名称
				typeTwoName: '', // 二级规格名称
				typeThreeName: '', // 三级规格名称
				typeArr: [], // 规格类型
				typeTwoArr: [], // 二级规格内容
				typeThreeArr: [], // 三级规格内容
				statusOne: 0, // 规格类型选择状态
				statusTwo: 0, // 
				statusThree: 0,
				specListOne: [], // 一级规格存放
				specListTwo: [], // 二级规格存放
				specListThree: [], // 三级规格存放
				info: '', // 规格信息
				spec_id: '', // 规格id
				stocknum: '', // 库存
				orderInfo: '', // 立即购买订单信息
				statusComment: 0,
				serviceList: [],
				//商品图片切换及放大效果
				imgs: '',
				imgIndex: -1,
				left: 50,
				top: 0,
				shows: false,
				marginLeft: 250,
				marginTop: 250
			}
		},
		created() {
			this.id = this.$route.query.id // 商品id
			console.log(this.id, 'id----')
			console.log(this.token, 'token---')
		},
		mounted() {
			this.getGoodDetail();
			this.getShopSpec();

		},
		methods: {
			enter() {
				this.shows = true
			},
			leave() {
				this.shows = false
			},
			marks(e) {
				var marksWidth = 250; //marks的宽
				var marksHeight = 250;
				console.log(e.offsetX, e.offsetY)
				if(this.shows == true) {
					this.left = e.offsetX - marksWidth / 2;
					this.top = e.offsetY - marksHeight / 2;
					if(this.left < 0) {
						this.left = 0
					}
					if(this.left > 250) {
						this.left = 250
					}
					if(this.top < 0) {
						this.top = 0
					}
					if(this.top > 250) {
						this.top = 250
					}
				}
				this.marginLeft = -this.left * 2;
				this.marginTop = -this.top * 2;
			},
			//主图切换
			changeImg(index) {
				console.log(index)
				this.imgIndex = index;
				this.imgs = this.good.pictures[index];
				console.log(this.imgs)
			},
			getGoodDetail() {
				this.$axios.get(this.$common.shop_goodDetail, {
					params: {
						token: this.token,
						id: this.id
					}
				}).then(res => {
					console.log(res, 'res==detail')
					this.good = res.data.data.good
					this.imgs = res.data.data.good.thumb
					this.shop = res.data.data.shop
					this.shopId = res.data.data.shop.id
					this.isColl = res.data.data.isColl
					this.serviceList = res.data.data.serviceList
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 减
			reduce() {
				if(this.num <= 1) {
					return
				}
				this.num--
					this.addGoodNum();
			},
			// 加
			add() {
				if(this.num >= this.stocknum) {
					this.$confirm('库存不足', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					return
				}
				this.num++
					this.addGoodNum();
			},
			// 点击商品详情
			shopDetail() {
				this.status = 0
			},
			// 切换商品评价
			shopComment(level, id) {
				this.status = 1
				this.statusComment = level
				this.$axios.get(this.$common.shop_goodComment, {
					params: {
						id: id, // 商品id
						level: level, // 0:全部1好评2中评3差评 4:有图
						pageNo: this.currentPage, // 当前页
						pageSize: this.pageSize
					}
				}).then(res => {
					console.log(res, 'res===评论')
					if(res.data.status == 1) {
						this.allCount = res.data.data.allEvaluateCount
						this.fineCount = res.data.data.fineEvaluateCount
						this.middleCount = res.data.data.mediumEvaluateCount
						this.inferorCount = res.data.data.inferiorEvaluateCount
						this.picCount = res.data.data.picEvaluateCount
						this.commentList = res.data.data.page.list
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
						
						this.$previewRefresh()
					}
					
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 页码切换
			changeCurrent(page) {
				console.log(page, 'page')
				this.currentPage = page
				this.shopComment(this.statusComment, this.id)
			},
			// 商品规格
			getShopSpec() {
				this.$axios.get(this.$common.shop_goodSpec, {
					params: {
						id: this.id
					}
				}).then(res => {
					console.log(res, 'res==商品规格')
					if(res.data.tag == 0) {
						this.spec_id = res.data.spec_id
						this.stocknum = res.data.stocknum
					} else {
						this.typeName = res.data.spec_name
						// 一级
						let specListOne = res.data.one
						if(specListOne && specListOne.length !== 0) {
							this.specListOne = specListOne
							specListOne.map(item => {
								this.typeArr.push(item.item_name)
								if(item.spec_id) {
									this.spec_id = specListOne[0].spec_id
									this.stocknum = specListOne[0].stocknum
								}
							})
							// 二级
							if(specListOne[0].two) {
								this.typeTwoName = specListOne[0].two.spec_name
								let specListTwo = specListOne[0].two.list
								this.specListTwo = specListTwo
								if(specListTwo && specListTwo.length !== 0) {
									specListTwo.map(item => {
										this.typeTwoArr.push(item.item_name)
										if(item.spec_id) {
											this.spec_id = specListTwo[0].spec_id
											this.stocknum = specListTwo[0].stocknum
										}
									})
									this.typeThreeName = specListTwo[0].three.spec_name
									let specListThree = specListTwo[0].three.list
									this.specListThree = specListThree
									if(specListThree && specListThree.length !== 0) {
										specListThree.map(item => {
											this.typeThreeArr.push(item.item_name)
											if(item.spec_id) {
												this.spec_id = specListThree[0].spec_id
												this.stocknum = specListThree[0].stocknum
											}
										})
									}
								}
								console.log(this.typeTwoArr, 'typeTwoArr======')
							}
						}
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},

			// 切换一级规格类型
			oneSpec(index) {
				this.typeTwoArr = []
				this.typeThreeArr = []
				this.statusOne = index
				this.statusTwo = 0
				this.statusThree = 0
				console.log(this.specListOne, 'specListOne-------')
				console.log(index, 'index')
				if(this.specListOne[index].two) {
					this.typeTwoName = this.specListOne[index].two.spec_name
					let specListTwo = this.specListOne[index].two.list
					this.specListTwo = specListTwo // 存储以便三级循环
					if(specListTwo && specListTwo.length !== 0) {
						specListTwo.map(item => {
							this.typeTwoArr.push(item.item_name)
							if(item.spec_id) {
								this.spec_id = specListThree[0].spec_id
								this.stocknum = specListThree[0].stocknum
							}
						})
						this.typeThreeName = specListTwo[0].three.spec_name
						let specListThree = specListTwo[0].three.list
						this.specListThree = specListThree
						if(specListThree && specListThree.length !== 0) {
							specListThree.map(item => {
								this.typeThreeArr.push(item.item_name)
								if(item.spec_id) {
									this.spec_id = specListThree[0].spec_id
									this.stocknum = specListThree[0].stocknum
								}
							})
						}
					}
					console.log(this.typeTwoArr, 'typeTwoArr--------')
					console.log(this.specListTwo, 'specListTwo', 1234567)
				} else {
					this.spec_id = specListOne[index].spec_id
					this.stocknum = specListOne[index].stocknum
				}
			},
			// 切换二级规格
			twoSpec(index) {
				this.typeThreeArr = []
				this.statusTwo = index
				this.statusThree = 0
				console.log(this.specListTwo, '二级规格存储')
				console.log(index, 'index')
				if(this.specListTwo[index].three) {
					this.typeThreeName = this.specListTwo[index].three.spec_name
					if(this.specListTwo[index].three.list && this.specListTwo[index].three.list.length !== 0) {
						this.specListThree = this.specListTwo[index].three.list
						this.specListTwo[index].three.list.map(item => {
							this.typeThreeArr.push(item.item_name)
							if(item.spec_id) {
								this.spec_id = this.specListTwo[index].three.list[0].spec_id
								this.stocknum = this.specListTwo[index].three.list[0].stocknum
							}
						})
					}
					console.log(this.typeThreeArr, 'typeThreeArr===')
				} else {
					this.spec_id = specListTwo[index].spec_id
					this.stocknum = specListTwo[index].stocknum
				}
			},
			// 切换三级规格
			ThreeSpec(index) {
				this.statusThree = index
				console.log(this.specListThree, 'specListThree')
				this.spec_id = this.specListThree[index].spec_id
				this.stocknum = this.specListThree[index].stocknum
			},
			// 商品详情规格添加数量
			addGoodNum() {
				console.log(this.spec_id, 'this.spec_id=====')
				this.$axios.get(this.$common.shop_addGoodNum, {
					params: {
						goodsId: this.id, // 商品id
						specId: this.spec_id, // 规格id
						num: this.num // 商品数量
					}
				}).then(res => {
					console.log(res, '商品详情规格添加数量')
					if(res.data.status == 0) {
						this.$confirm(res.data.msg, {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						})
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 加入购物车
			add_Cart() {
				this.$axios.get(this.$common.shop_cartAdd, {
					params: {
						token: this.token,
						id: this.id, // 商品id
						specId: this.spec_id, // 规格id
						num: this.num,
						shopId: this.shopId, // 商铺id
					}
				}).then(res => {
					console.log(res, 'res加入购物车')
					if(res.data.status == 1) {
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 150
						});
						bus.$emit('cartNum', 1)
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 150
						});
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 立即购买

			goodSubmit() {
				this.$axios.get(this.$common.shop_goodsSubmit, {
					params: {
						token: this.token,
						id: this.id, // 商品id
						specId: this.spec_id, // 规格id
						count: this.num
					}
				}).then(res => {
					console.log(res, '立即购买')
					if(res.data.status == 1) {
						this.orderInfo = res.data.data
						this.$router.push({
							name: 'order',
							path: '/order',
							params: {
								data: this.orderInfo
							}
						})
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 商品收藏/取消
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
						this.isColl = !this.isColl
						console.log(this.isColl, 'this.isColl')
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
		},
	}
</script>

<style scoped>
	.noneComment {
		font-size: 16px;
		margin-top: 34px;
		margin-bottom: 30px;
	}
	
	.xq {
		color: white !important;
	}
	
	.img_on {
		border: 1px solid red;
	}
	
	.big-pic {
		position: relative;
		top: 0;
		left: 0;
	}
	
	.big-pic img {
		width: 500px;
		height: 500px;
	}
	
	.scale {
		width: 250px;
		height: 250px;
		background-color: rgba(1, 1, 1, .5);
		position: absolute;
	}
	
	.big_box {
		position: relative;
		top: 0;
		left: 0;
	}
	
	.scale_pic {
		width: 500px;
		height: 500px;
		overflow: hidden;
		/*background-color: yellow;*/
		position: absolute;
		left: 550px;
	}
	
	.scale_pic img {
		width: 1000px;
		height: 1000px;
		position: absolute;
	}
</style>