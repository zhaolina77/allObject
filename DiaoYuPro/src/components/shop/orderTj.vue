<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap order-tj">
			<!--地址-->
			<div class="bg-white address">
				<div class="font-size-24 font-bd">确认收货地址</div>
				<ul>
					<!-- <li :class="{'on': chooseAddress == index}" v-for="(item,index) in addressList" @click="choodeAdress(index)">
						<div class="">
							<input type="checkbox" name="" id="" value="" />
							<span>{{item.full_address}} {{item.address_info}} （{{item.name}} 收）{{item.mobile}} {{item.is_default == 0 ? '默认地址': ''}}
							</span>
						</div>
					</li> -->
					<li :class="{'on':index==idx}" v-for="(item,index) in addressList" @click="change(item.id,index)">
						<div>
							<input type="checkbox" name="" id="" value="" :checked="idx==index" />
							<span>{{item.full_address}} {{item.address_info}} （{{item.name}} 收）{{item.mobile}}    </span>
							<span v-if="item.is_default==0" style="margin-top: -2px;">
									默认地址
								</span>

						</div>
					</li>
				</ul>
				<div class="addAddress" @click="addAddress()">添加新地址</div>
			</div>

			<!--商品-->
			<div class="bg-white cart-inner">
				<div class="font-size-24 font-bd" style="margin-bottom: 30px;">商品信息</div>
				<table class="cart-body border-none" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;">
					<tr>
						<td width="55px"></td>
						<td width="505px" class="info">
							<span class="font-size14 text-grayer">商品</span>
						</td>
						<td width="170px">
							<span class="font-size14 text-grayer">单价</span>
						</td>
						<td width="170px">
							<span class="font-size14 text-grayer">数量</span>
						</td>
						<td width="100px">
							<span class="font-size14 text-grayer">小计</span>
						</td>
						<!-- <td width="100px">
							<span class="font-size14 text-grayer">操作</span>
						</td> -->
					</tr>
				</table>
				<template v-for="item in shopList" v-if="statusOdd == 1">
					<div class="name clearfix">
						<div style="float: left;width: 55px;text-align: center;"></div>
						<div class="font-size-16 font-bd" style="float: left;margin-left: 30px;"><span class="text-grayer">店铺：</span>{{item.shop_name}}</div>
					</div>

					<table class="cart-body" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;" v-for="vo in item.goodlist">
						<tr>
							<td width="560px" class="info">
								<div class="pic fl border">
									<img :src="vo.thumb" />
								</div>
								<div class="fl jiajie">
									<p class="ellipsis-2">{{vo.name}}</p>
									<p class="font-size12 text-grayer margin-t10">{{vo.model_name}}</p>
								</div>
							</td>
							<td width="170px">
								<p class="font-size16">￥{{vo.market_price}}</p>
							</td>
							<td width="170px">
									{{vo.goods_num}}
								
							</td>
							<td width="100px">
								<span class="text-orange font-size18 font-w">￥{{Math.round(vo.market_price * vo.goods_num*100)/100}}</span>
							</td>
							<!-- <td width="100px">
								<span class="del text-theme">删除</span>
							</td> -->
						</tr>
					</table>
				</template>
				<template v-if="statusOdd == 0">
					<div class="name clearfix">
						<div class="font-size-16 font-bd" style="float: left;margin-left: 30px;"><span class="text-grayer">店铺：</span>{{orderGoods.shop_name}}</div>
					</div>

					<table class="cart-body" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;">
						<tr>
							<td width="560px" class="info">
								<div class="pic fl border">
									<img src="../../assets/images/banner.png" />
								</div>
								<div class="fl jiajie">
									<p class="ellipsis-2">{{orderGoods.name}}</p>
									<p class="font-size12 text-grayer margin-t10">{{orderGoods.model_name}}</p>
								</div>
							</td>
							<td width="170px">
								<p class="font-size16">￥{{orderGoods.market_price}}</p>
							</td>
							<td width="170px">
								{{orderGoods.total_num}}
							</td>
							<td width="100px">
								<span class="text-orange font-size18 font-w">￥{{orderGoods.total_price}}</span>
							</td>
							<!-- <td width="100px">
							<span class="del text-theme">删除</span>
						</td> -->
						</tr>
					</table>
				</template>
			</div>

			<!--支付方式-->
			<div class="bg-white pay">
				<div class="font-size-24 font-bd">支付方式</div>
				<div class="lx clearfix">
					<div class="sel" :class="{'on':state==1}" @click="pay(1)">
						<img src="../../assets/images/paywx.png" />
						<img class="duihao" src="../../assets/images/paysel.png" v-if="state==1" />
					</div>
					<div class="sel" :class="{'on':state==2}" @click="pay(2)">
						<img src="../../assets/images/payzfb.png" />
						<img class="duihao" src="../../assets/images/paysel.png" v-if="state==2" />
					</div>
				</div>
			</div>

			<!--支付-->
			<div class="bg-white" style="margin-top: 30px;padding: 7px 30px;">
				<!--合计-->
				<table class="cart-head" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;">
					<tr>
						<th width="55px"></th>
						<th width="70px"></th>
						<th width="395px"></th>
						<th width="250px"></th>
						<th width="290px">
							<div class="money text-grayer font-size-14" style="border-left:none">实付款合计：<span class="text-orange">￥</span><span class="text-orange font-size-24 font-bd">{{statusOdd == 1 ? paidPay : orderGoods.total_price}}</span> </div>
						</th>
						<th width="140px" @click="account">
							<div class="xiadan">结算</div>
						</th>
					</tr>
				</table>
			</div>
			<template>
				<addAddress v-if="status == 0" @close="close"></addAddress>
			</template>
		</div>
	</div>
</template>

<script>
	import addAddress from '../mine/addAddress.vue'
	export default {
		name: 'order',
		components: {
			addAddress
		},
		data() {
			return {
				token: sessionStorage.getItem('token'),
				orderInfo: '', // 订单信息
				orderGoods: '', // 订单商品
				status: 1,
				chooseAddress: 0, // 是否选中收货地址 0 否 1是
				addressList: [], // 地址列表
				statusOdd: 0,
				shopList: [], // 商品列表
				paidPay: '',
				address: '', // 选择地址默认
				state: 1,
				addr: 0,
				idx: 0
			}
		},
		created() {
			if(this.$route.params.data && this.$route.params.data.goods) {
				console.log('单个商品立即购买')
				this.statusOdd = 0
				console.log(this.$route.params.data, 'this.$route.params.data')
				this.orderInfo = this.$route.params.data
				this.orderGoods = this.$route.params.data.goods
				this.address = this.$route.params.data.address
			}
			if(this.$route.params.cartData) {
				console.log(this.$route.params.cartData, 'this.$route.params.cartData')
				this.statusOdd = 1
				let cartData = this.$route.params.cartData
				this.shopList = cartData.shopList
				this.paidPay = cartData.paidPay
				this.address = cartData.address
			}
		},
		mounted() {
			this.getAddressList()
		},
		watch: {},
		methods: {
			//订单结算
			account() {

			},
			//地址切换
			change(id, index) {
				console.log(id)
				this.idx = index;
				this.addr = id
			},
			pay(index) {
				this.state = index
				console.log(this.state)

			},
			getAddressList() {
				this.$axios.get(this.$common.wode_addressList, {
					params: {
						token: this.token
					}
				}).then(res => {
					console.log(res, 'res--地址列表')
					if(res.data.status == 1) {
						console.log(res.data.data.addressList)
						this.addressList = res.data.data.addressList.slice(0, 3)
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 监听子组件关闭事件
			close(e) {
				console.log(e, '监听到子组件$emit了')
				this.status = e
			},
			// 添加新地址
			addAddress() {
				this.status = 0
			},
			// 选择地址
			choodeAdress(index) {
				this.chooseAddress = index
			},
		}
	}
</script>

<style scoped>
	.addAddress {
		margin-left: 15px;
		height: 30px;
		width: 84px;
		text-align: center;
		border: 1px solid rgba(230, 235, 244, 1);
		line-height: 30px;
		border-radius: 2px
	}
	
	.order-tj .address ul li.on {
		color: #1765FF;
	}
</style>