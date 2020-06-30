<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap cart">
			<div class="bg-white cart-inner">
				<div class="font-size-24 font-bd" style="margin-bottom: 30px;">购物车（{{cartCount}}）</div>
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
							<span class="font-size14 text-grayer">操作</span>
						</td>
					</tr>
				</table>
				<template v-for="(item,index) in shopList">
					<div class="name clearfix">
						<div style="float: left;width: 55px;text-align: center;">
							  <input class="checkbox" type="checkbox" name="" id="" :checked="ischeck[index] == true ? true : false" @change="shopSelect($event,item.shop_id,index)" />
						</div>
						<div class="font-size-16 font-bd" style="float: left;"><span class="text-grayer">店铺：</span>{{item.shop_name}}</div>
					</div>

					<table class="cart-body" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;">
						<tr v-for="vo in item.cart">
							<td width="55px"><input class="checkbox" type="checkbox" name="" id="" value="" :checked="vo.is_select == 1 ? true : false"
								 @change="checkCart($event,vo.cart_id)" /></td>
							<td width="505px" class="info">
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
								<div class="num bg-white border">
									<div class="cz jia" @click="addToCartNum(vo.cart_id)">+</div>
									<div class="">{{vo.goods_num}}</div>
									<div class="cz jian" @click="reduceToCartNum(vo.cart_id,vo.goods_num)">-</div>
								</div>
							</td>
							<td width="100px">
								<span class="text-orange font-size18 font-w">￥{{Math.round(vo.market_price*vo.goods_num*100)/100}}</span>
							</td>
							<td width="100px">
								<span class="del text-theme" slot="reference" @click="cartDelete(vo.cart_id)">删除</span>
							</td>
						</tr>
					</table>
				</template>
			</div>
     
			<div class="bg-white" style="margin-top: 30px;padding: 7px 30px;" >
				<!--合计-->
				<table class="cart-head" border="0" cellspacing="0" cellpadding="0" style="table-layout: fixed;">
					<tr>
						<th width="55px"><input class="checkbox" type="checkbox" name="" id="" v-model="checkAllVal" @change="cartAllSelect()" /></th>
						<th width="70px">全选</th>
						<th width="395px" class="text-grayer" style="text-align: left;cursor: pointer;" @click="delectAll()">删除</th>
						<th width="250px">
							<div class="heji text-grayer">已选商品 <span class="text-theme">{{chooseNum}} </span>件 </div>
						</th>
						<th width="290px">
							<div class="money text-grayer font-size-14">合计：<span class="text-orange">￥</span><span class="text-orange font-size-24 font-bd">{{totalPrice}}</span>
							</div>
						</th>
						<th width="140px">
							<div class="xiadan" v-bind:style="{'background':statusSub == 0 ? '#B0B0B0 !important' : ''}" @click="cartSubmit()">结算</div>
						</th>
					</tr>
				</table>
			</div>

		</div>
	</div>
</template>

<script>
	import bus from '../../assets/eventBus.js';
	export default {
		name: 'cart',
		data() {
			return {
				token: sessionStorage.getItem('token'),
				shopList: [], // 购物车列表
				totalPrice: '', // 总价格
				checkAllVal: true, // 所有全选
				statusCheck: '',
				chooseNum: 0,
				statusSub: 0,
				cartCount:''
			}
		},
		created() {
			this.init();
				
		},
		watch:{
			'shopList': function (val) {
				let _self = this;
				this.checkAllVal=true;
//				console.log(val,'val')
//				console.log(this.checkAllVal,'checkAllVal')
				let arr = []
				if(val && val.length !== 0){
					val.map(item => {
						item.cart.map(vo => {
							if(vo.is_select == 1){
								arr.push(vo.is_select)
							}
							if(vo.is_select == 0) {
								_self.checkAllVal = false
								return 
							}
						})
						_self.chooseNum = arr.length
					})					
				}else{
					this.checkAllVal=false;
					this.chooseNum = 0
				}
//				console.log(_self.checkAllVal,'_self.checkAllVal')
			}
		},
		computed:{
			// computed中监听值不在data中定义，而watch需要在data中定义，下边的监听checkAllVal和watch里边监听shopList 同效果
				// checkAllVal:function(){
				// 		let  ischeck=true;
				// 		this.shopList.map(function(item){
				// 			item.cart.map(function(voo){
				// 				if(voo.is_select==0){
				// 					ischeck=false;
				// 					return;
				// 				}
				// 			})
				// 		})
				// 		return ischeck;
				// },
				ischeck:{
					cache:false,
					get(){
						let arr=[]
						let list=this.shopList;
						list.map(function(item){
								let ischeck=true;
								item.cart.map(function(voo){
										if(voo.is_select==0){
											ischeck=false;
											return;
										}	
								})
								arr.push(ischeck)
						})
						return arr
					}
				},
				// for(let i = 0; i < ischeck.length; i++) {
				// 	if(ischeck[i] == false) {
				// 		this.checkAllVal = false
				// 	}
				// }
				// ischeckAll: function() {
				// 	let arr = [];
				// 	this.shopList.map(item => {
				// 		item.cart.map(vo => {
				// 			let ischeckAll = true
				// 			if(vo.is_select == 0) {
				// 				ischeckAll = false
				// 				return
				// 			}
				// 		})
				// 		return ischeckAll
				// 	})
				// }
				
		},
		mounted() {
			this.getCartList()
			
		},
		methods: {
			init(){
				this.$axios.get(this.$common.cart_cartNum,{
					params:{
						token:this.token
					}
				}).then(res=>{
					console.log(res)
					this.cartCount=res.data.data.cartCount
				})
			},
			getCartList() {
				this.$axios.get(this.$common.cart_cartList, {
					params: {
						token: this.token
					}
				}).then(res => {
					if (res.data.status == 1) {
						this.shopList = res.data.data.shopList
						this.totalPrice = res.data.data.totalPrice
						if(this.shopList && this.shopList.length !== 0){
							let arr  = []
							this.shopList.map(item => {
								item.cart.map(vo => {
									if(vo.is_select == 1){
										arr.push(vo.cart_id)
									}
								})
							})
							console.log(arr,'arr---card-id',arr.length)
							if(arr.length == 0){
								this.statusSub = 0
							}else{
								this.statusSub = 1
							}
						}
						bus.$emit('cartNum',1)
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			add() {

			},
			reduce() {

			},
			// 购物车添加数量
			addToCartNum(cart_id) {
				this.$axios.get(this.$common.cart_addToCartGoodNum, {
					params: {
						token: this.token,
						cartId: cart_id, // 购物车id
					}
				}).then(res => {
					if (res.data.status == 1) {
						// 刷新购物车列表
						this.getCartList()
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
//					console.log(err, 'err')
				})
			},
			// 购物车减少数量
			reduceToCartNum(cart_id, goods_num) {
				if (goods_num <= 1) {
					this.$message({
						message: '商品数量最小为1',
						type: 'warning',
						offset: 100
					})
					return
				}
				this.$axios.get(this.$common.cart_minusToCartGoodNum, {
					params: {
						token: this.token,
						cartId: cart_id, // 购物车id
					}
				}).then(res => {
					if (res.data.status == 1) {
						// 刷新购物车列表
						this.getCartList()
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
//					console.log(err, 'err')
				})
			},
			// 单选和取消按钮
			checkCart(e, cartId) {
//				console.log(e, 'eeeeeeeeeeeeeeeeee', e.target.checked)
				this.$axios.get(this.$common.cart_checkCart, {
					params: {
						token: this.token,
						cartId: cartId, //购物车id
						isSelect: e.target.checked == true ? 1 : 0, // 勾选还是取消 1：勾选 0：未勾选
					}
				}).then(res => {
					if (res.data.status == 1) {
						// 刷新购物车列表
						this.getCartList()
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
//					console.log(err, 'err==')
				})
			},
			// 店铺全选与否
			shopSelect(e, shop_id, index) {
				let arr = []
				this.shopList[index].cart.map(item => {
					arr.push(item.cart_id)
				})
				let cartId = arr.join()
				this.$axios.get(this.$common.cart_shopCartSelect, {
					params: {
						tag: e.target.checked == true ? 1 : 0, //  1 全选 0 不全选
						token: this.token,
						cartId: cartId, // 购物车id,传一个或多个，格式为1，或1,2
						shopId: shop_id, // 商铺id
					}
				}).then(res => {
					if (res.data.status == 1) {
						// 刷新购物车列表
					//	this.shopList=[];
						this.getCartList()
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
//					console.log(err, 'err')
				})
			},
			// 购物车的全选与不选
			cartAllSelect() {
//				console.log(this.checkAllVal, 'checkAllVal')
				this.$axios.get(this.$common.cart_selectCart, {
					params: {
						tag: this.checkAllVal == true ? 1 : 0, //  1 全选 0 不全选
						token: this.token,
					}
				}).then(res => {
					if (res.data.status == 1) {
						// 刷新购物车列表
						this.getCartList()
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
//					console.log(err, 'err')
				})
			},
			// 清空商品和清楚单个商品
			delete(cartId) {
				this.$axios.get(this.$common.cart_cartDelete, {
					params: {
						token: this.token,
						cartId: cartId, // 购物车id,传一个或多个，格式为1，或1,2
					}
				}).then(res => {
					if (res.data.status == 1) {
						// 刷新购物车列表
						this.getCartList()
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch(err => {
//					console.log(err, 'err')
				})
			},
			// 清楚单个商品
			cartDelete(cartId) {
				this.$confirm('确认要删除宝贝吗？', '删除宝贝', {
				          distinguishCancelAndClose: true,
				          confirmButtonText: '确认',
				          cancelButtonText: '取消'
				        }).then(() => {
				           this.delete(cartId)
				        }).catch( action => {
				            // this.$message({
				            //   type: 'info',
				            //   message: action === 'cancel'
				            //     ? '放弃保存并离开页面'
				            //     : '停留在当前页面'
				            // })
				   });
			},
			// 全部清空
			delectAll() {
				if (this.checkAllVal == true) {
					// let arr = []
					// this.shopList.map(item => {
					// 	item.cart.map(vo => {
					// 		arr.push(vo.cart_id)
					// 	})
					// })
					// let cartId = arr.join()
					this.$confirm('确定要删除这些宝贝吗？','删除宝贝',{
						distinguishCancelAndClose: true,
						confirmButtonText: '确认',
						cancelButtonText: '取消'
					}).then(() => {
						this.delete(-1)
					}).catch(action => {
						
					})
				} else {
					this.$message({
						message: '请选择宝贝',
						type: 'warning',
						offset: 100
					})
				}
				
				
			},
			// 点击购物车提交到点确认订单页面 结算
			cartSubmit () {
				if(this.shopList && this.shopList.length !== 0){
					let arr  = []
					this.shopList.map(item => {
						item.cart.map(vo => {
							if(vo.is_select == 1){
								arr.push(vo.cart_id)
							}
						})
					})
//					console.log(arr,'arr---card-id')
					
					this.$axios.get(this.$common.cart_cartSubmit,{
						params: {
							token: this.token,
							cartId: arr.join() // 购物车id,可以传多个，比如1，或者1,2
						}
					}).then(res => {
						if(res.data.status == 1) {
							let cartData = res.data.data
							this.$router.push({name: 'order',path: '/order',params:{cartData:cartData}})
						}
					}).catch( err => {
						console.log(err,'err==')
					})
				}
			},
		}
	}
</script>

<style>
</style>