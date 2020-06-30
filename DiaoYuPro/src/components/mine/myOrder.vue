<template>
	<!--右边的内容-->
	<div class="mine-right mine">
		<!--切换-->
		<!-- -1:全部 3:待评价-已完成 0：待付款 1：待发货 2：待收货 售后/退货 大于3的( 4：退款中 5：退款失败 6：已退款 )) -->
		<div class="bg-white nav clearfix">
			<div class="item" :class="{'on': status == -1}" @click="tabOrder(-1)">全部订单</div>
			<div class="item" :class="{'on': status == 1}" @click="tabOrder(1)">待发货</div>
			<div class="item" :class="{'on': status == 2}" @click="tabOrder(2)">待收货</div>
			<div class="item" :class="{'on': status == 3}" @click="tabOrder(3)">已完成</div>
			<div class="item" :class="{'on': status == 4}" @click="tabOrder(4)">退款中</div>
			<div class="item" :class="{'on': status == 6}" @click="tabOrder(6)">已退款</div>
			<div class="item" :class="{'on': status == 8}" @click="tabOrder(8)">已关闭</div>
			<!--<div class="item" :class="{'on': status ==9}" @click="tabOrder(9)">评价中心</div>-->
		</div>

		<div class="state-list bg-white">
			<p class="text-center" v-if="allOrderList.length == 0">暂无数据</p>
			<table class="table" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;"  v-if='status==9'>
				
				<tr v-for="item in pj_list">
					<td width="350px" class="info">
						<div class="pic fl border">
							<img :src="item.thumb" />
						</div>
						<div class="fl jiajie" style="text-align: left;">
							<p class="ellipsis-2 font-size-12">{{item.good_name}}</p>
						</div>
					</td>
					<!--<td width="130px" class="font-size12 text-grayer">数量：<span class="text-black">{{vo.goods_num}}</span></td>-->
					<td width="270px" class="font-size12 text-grayer">
						订单金额：<span class="text-orange font-size18 font-w">￥{{item.market_price}}</span>
					</td>
					<td width="230px" class="text-center">
						<!--<div class="btn" @click="orderDetail(item.id)">订单详情</div>-->
						<div class="btn" >订单详情</div>
					</td>
				</tr>
			</table>
			<table class="table" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;" v-for="item in allOrderList" v-else>
				<tr>
					<th colspan="3" style="text-align: left;">
						<span class="text-grayer" style="margin-left: 20px;">店铺：<span class="text-black">{{item.shop_name}}</span></span>
						<span class="text-grayer" style="margin-left: 50px;">订单号：<span class="text-black">{{item.order_sn}}</span></span>
					</th>
					<th class="text-orange">{{item.pay_name}}</th>
				</tr>
				<tr v-for="vo in item.goods_order_list">
					<td width="350px" class="info">
						<div class="pic fl border">
							<img :src="vo.thumb" />
						</div>
						<div class="fl jiajie" style="text-align: left;">
							<p class="ellipsis-2 font-size-12">{{vo.goods_name}}</p>
						</div>
					</td>
					<td width="130px" class="font-size12 text-grayer">数量：<span class="text-black">{{vo.goods_num}}</span></td>
					<td width="200px" class="font-size12 text-grayer">
						订单金额：<span class="text-orange font-size18 font-w">￥{{vo.goods_total}}</span>
					</td>
					<td width="170px" class="text-center">
						<div class="btn" @click="orderDetail(item.id)">订单详情</div>
					</td>
				</tr>
			</table>
		</div>
		<div id="wr-page" class="page-out bg-white" v-if="allOrderList.length != 0">
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total"
			  :page-size="pageSize"
			  :current-page="pageNo"
			  @current-change="changeCurrent"
			 >
			</el-pagination>				
		</div>
	</div>

</template>

<script>
	export default{
		name: '',
		data() {
			return {
				token:sessionStorage.getItem('token'),
				pageNo:1,
				pageSize: 16,
				total: 0,
				allOrderList: [], // 全部订单
				status: -1,
				pj_list:[]
			}
		},
		created() {
			this.status=localStorage.getItem('order_status')
			this.getOrderList(this.pageNo,this.status)
		},
		mounted () {
			
		},
		methods: {
			// 切换订单tab
			tabOrder(status) {
				localStorage.setItem('order_status',status)
				this.status = status
				if(status == 9){
					this.pingjia(1)
				}else{
					this.getOrderList(1,status)
				}
			},
			pingjia(pageNo){
				this.$axios.get(this.$common.evaluateList_url,{
					params:{
						token: this.token,
						pageNo: pageNo,
						pageSize: this.pageSize,
						type:1
					}
				}).then(res=>{
					console.log(res)
					this.pj_list=res.data.data.page.list
				})
			},
			getOrderList (pageNo,status) {
				this.$axios.get(this.$common.order_orderList,{
					params: {
						status: status, // -1:全部 3:待评价 0：待付款 1：待发货 2：待收货 售后/退货 大于3的( 4：退款中 5：退款失败 6：已退款 ))
						token: this.token,
						pageNo: pageNo,
						pageSize: this.pageSize
					}
				}).then( res => {
					if(res.data.status == 1) {
						this.allOrderList = res.data.data.page.list
						this.pageNo = res.data.data.page.pageNumber
						this.total = res.data.data.page.totalRow
					}else{
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch( err => {
					console.log( err, 'err')
				})
			},
			// 切换页码
			changeCurrent (pageNo){
				console.log(pageNo,'currentPage')
				this.getOrderList(pageNo,this.status)
			},
			// 查看订单详情
			orderDetail (id) {
				console.log(id,'=================')
				this.$router.push({name: 'orderDaifahuo',path: '/orderDaifahuo',query:{id: id}})
			},
		}
	}
</script>

<style>
</style>
