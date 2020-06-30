<template>
	<div class="content">
		<div class="content-top "></div>
		<div class="wrap order-daishouhuo">
			
			<div class="bg-white state">
				<div class="" >
					<div class="font-size-24 font-bd zt">{{orderInfo.pay_name}}</div>
					<div class="text-grayer">{{statusInfo}}</div>
				</div>
				<div class="btn text-black hover" @click="apply_Refund()" style="float: right;">申请退款</div>
				<!--<div class="btn text-black hover" @click="confirmShouhuo()">确认收货</div>-->
				
				<!--<div class="btn text-black hover" v-if="orderInfo.status == 1" @click="apply_Refund()">申请退款</div>
				<div class="btn text-black hover" v-if="orderInfo.status == 2" @click="confirmShouhuo()">确认收货</div>
				<div class="btn text-black hover" @click="back">返回</div>-->
			</div>
			
			<div class="bg-white state">
				<div class="">
					<div class="font-size-24 font-bd zt">收货地址</div>
					<div class="text-grayer">{{orderInfo.address_info}} （{{orderInfo.name}} 收）{{orderInfo.mobile}} 
						<!-- <span>默认地址</span> -->
					</div>
				</div>
			</div>
			<div class="bg-white state" v-if="orderInfo.status == 2">
				<div class="">
					<div class="font-size-24 font-bd zt">物流信息</div>
					<div class="text-grayer">物流名称：{{logistics.tran_name}} </div>
					<div class="text-grayer">物流单号：{{logistics.logistics_number}}</div>
				</div>
				<div class="btn" @click="go_logistics()">查看物流</div>
			</div>
			<!--商品-->
			<div class="bg-white cart-inner" style="margin-top: 30px;">
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
						<td width="100px">
							<span class="font-size14 text-grayer"></span>
						</td>
					</tr>
				</table>
				
				<div class="name clearfix">
					<div style="float: left;width: 55px;text-align: center;"></div>
					<div class="font-size-16 font-bd" style="float: left;margin-left: 30px;"><span class="text-grayer">店铺：</span>{{orderInfo.shop_name}}</div>
				</div>
				
				<table class="cart-body" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;">
					<tr v-for="item in goodsList">
						<td width="560px" class="info">
							<div class="pic fl border">
								<img :src="item.thumb"/>
							</div>
							<div class="fl jiajie">
								<p class="ellipsis-2">{{item.goods_name}}</p>
								<p class="font-size12 text-grayer margin-t10">黑色 3.6m</p>
							</div>
						</td>
						<td width="170px">
							<p class="font-size16">￥{{item.goods_price}}</p>
						</td>
						<td width="170px">{{item.goods_num}}</td>
						<td width="100px">
							<span class="text-orange font-size18 font-w">￥{{item.goods_total}}</span>
						</td>
						<td width="100px"></td>
					</tr>
				</table>
				
			</div>
		
			<!--价格-->
			<div class="bg-white state">
				<div class=""></div>
				<div class="text-grayer" style="text-align: right;">
					<div class="" style="margin-bottom: 10px;">实付金额：<span class="text-orange">￥<span class="font-size-30 font-bd">{{orderInfo.pay_price}}</span></span></div>
					<div class="" style="margin-bottom: 10px;">支付时间：{{orderInfo.pay_time}}</div>
					<div class="">支付方式：{{orderInfo.pay_type == 1 ? '微信支付' : '支付宝支付'}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'orderDaifahuo',
		data() {
			return {
				token: sessionStorage.getItem('token'),
				id: '', // 订单id
				goodsList: [], // 订单list
				orderInfo: '', // 订单信息
				statusInfo: '', // 订单状态描述
				logistics: '', // 物流信息
				mapList: [], // 物流信息
			}
		},
		created () {
			console.log(this.$route.query,'params=========')
			this.id = this.$route.query.id
		},
		mounted () {
			this.getOrderDetail()
			this.logistics_Info()
		},
		methods:{
			back(){
				this.$router.push({
					name:'myOrder',
					path:'/mine/myOrder'
				})
			},
			// 订单详情
			getOrderDetail () {
				this.$axios.get(this.$common.order_productOrderById,{
					params:{
						id: this.id
					}
				}).then( res => {
					if(res.data.status == 1) {
						this.goodsList = res.data.data.goodsList
						this.orderInfo = res.data.data.order
						let status = res.data.data.order.status
						// <!-- -1:全部 3:待评价 0：待付款 1：待发货 2：待收货 售后/退货 大于3的( 4：退款中 5：退款失败 6：已退款 )) -->
						if(status == 1){
							this.statusInfo = '订单已支付，等待商家发货'
						}else if(status == 2){ // 待收货
							this.statusInfo = '商家已发货，请注意收货'
						}else if(status == 3){ // 已完成
							this.statusInfo = '订单已完成'
						}else if(status == 4){ //退款中
							this.statusInfo = '订单退款进行中'
						}else if(status == 6){
							this.statusInfo = '订单已退款完成'
						}else if(status == 8){
							this.statusInfo = '订单已关闭'
						}else{
							this.statusInfo = '订单已关闭'
						}
						console.log(this.goodsList,'goodsList====')
					}else{
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch( err => {
					console.log(err,'err')
				})
			},
			// 物流信息
			logistics_Info () {
				this.$axios.get(this.$common.order_logisticsInformation,{
					params: {
						id: this.id // 订单id
					}
				}).then(res => {
					if(res.data.status == 1){
						this.logistics = res.data.data.logistics
						this.mapList = res.data.data.mapList
						console.log(this.logistics,'logistics',this.mapList)
					}
				}).catch( err => {
					console.log(err,'err')
				})
			},
			// 申请退款
			apply_Refund() {
				this.$router.push({name: 'applyRefund', path:'/applyRefund', query:{id: this.id}})
			},
			// 去物流信息
			go_logistics () {
				this.$router.push({name:'logisticsInfo',path: '/logisticsInfo',query:{logistics: this.logistics, mapList: this.mapList}})
			},
			// 确认收货
			confirmShouhuo () {
				this.$axios.get(this.$common.order_confirmDelivery,{
					params:{
						token:this.token,
						id:this.id
					}
				}).then( res => {
					if(res.data.status == 1){
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 100
						})
						setTimeout(() => {
							this.$router.go(-1)
						},1000)
					}else{
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch( err => {
					console.log(err,'err')
				})
			},
		}
	}
</script>

<style scoped>
	.hover:hover{
		border: 1px solid #1765FF !important;
		color: #1765FF !important;
	}
</style>
