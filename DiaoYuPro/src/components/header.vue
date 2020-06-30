<template>
	<div class="bg-white heard font-size-16" style="z-index: 99;">
		<div class="wrap clearfix">

			<div class="logo font-bd fl font-size-18" @click="page1">
				<img src="../assets/images/logo.png" />
				<!--<span>钓鱼协会</span>-->
				<span class="dyxh">钓鱼协会</span>
			</div>
			<ul class="font-size-16 text-center fl clearfix nav">
				<li class="fl" :class="{'on':choose == 0}" @click="tabClick(0)">
					<a href="">首页</a>
				</li>
				<router-link to="/xiehui">
					<li class="fl" :class="{'on':choose == 1}" @click="tabClick(1)">
						<a href="">协会</a>
					</li>
				</router-link>
				<router-link to="/match">
					<li class="fl" :class="{'on':choose == 2}" @click="tabClick(2)">
						<a href="">赛事</a>
					</li>
				</router-link>
				<router-link to="/shop">
					<li class="fl" :class="{'on':choose == 3}" @click="tabClick(3)">
						<a href="">商城</a>
					</li>
				</router-link>
				<router-link to="/zixun">
					<li class="fl" :class="{'on':choose == 4}" @click="tabClick(4)">
						<a href="">资讯</a>
					</li>
				</router-link>
				<router-link to="/fish">
					<li class="fl" :class="{'on':choose == 5}" @click="tabClick(5)">
						<a href="">钓场</a>
					</li>
				</router-link>
			</ul>
			<div class="fl seach">
				<div class="inpt">
					<span class="text-grayer font-size-14">商品<i class="iconfont font-size-12" style="margin-left: 5px;">&#xe62f;</i></span>
					<input type="" name="" id="" v-model="vals" value="" @keyup.enter="enter" />
					<i class="iconfont " @click="enter">&#xe62e;</i>
				</div>
			</div>
			<!--未登录-->
			<!--<div class="fr zhuce font-size-14 text-center" style="line-height: 80px;" v-if="statusAdaver == 1" @click="showLogin()">
				<a class="text-white" href="">注册/登录</a>-->
			<div class="fr zhuce font-size-14 text-center" style="line-height: 80px;" v-if="login_status == 0||!account.head_portrait" @click.preventDefault="showLogin()">
				<a class="text-white">注册/登录</a>
			</div>
			<!--已登录-->
			<div class="fr already clearfix" v-if="login_status == 1&&account.head_portrait">
				<!--个人中心-->
				<div class="grxx head-pic">
					<img :src="account.head_portrait" />
					<div class="pop" id="pop">
						<div class="inner">
							<div class="info clearfix">
								<div class="pic">
									<img :src="account.head_portrait" />
								</div>
								<div class="name">
									<p class="font-size-14 ellipsis">{{account.nick_name}}</p>
									<div class="font-size-12 text-grayer" style="margin-top: 5px;">{{account.type_name}}</div>
								</div>
							</div>
							<div class="gkls">
								<span></span>
							</div>
							<div class="jl">

								<ul>
									<li @click="tabSta(1)">
										我的订单
									</li>
									<li @click="tabSta(2)">
										我的赛事
									</li>
									<li @click="tabSta(3)">
										我的收藏
									</li>
									<li @click="tabSta(7)">
										个人中心
									</li>
								</ul>

								<!--<ul>
									<li>
										<router-link to="/mine/myOrder">我的订单</router-link>
									</li>
									<li>
										<router-link to="/mine/myMatch">我的赛事</router-link>
									</li>
									<li>
										<router-link to="/mine/myCollection">我的收藏</router-link>
									</li>
									<li>
										<router-link to="/mine">个人中心</router-link>
									</li>
								</ul>-->
							</div>
							<div class="quit" @click="exit">退 出</div>
						</div>
					</div>
				</div>
				<!--购物车-->
				<div class="gwc head-pic" @click="goCart()">
					<img style="width: 20px;height: 20px;margin-top: 7px;margin-left: 7px;" src="../assets/images/care.png" />
					<div class="line">{{cartNum}}</div>
				</div>

			</div>
			<template v-if="loginblock == 1">
				<login style="z-index: 999;"></login>
			</template>

			<register style="z-index: 999;" v-if="loginblock == 2"></register>
		</div>
	</div>
</template>

<script>
	import bus from '../assets/eventBus.js';
	import login from './login/login.vue';
	import register from './login/register.vue';
	import mine from './mine/mineIndex.vue'
	export default {
		name: 'app-header',
		components: {
			login,
			register,
			mine
		},
		data() {
			return {
				choose: 0,
				token: '',
				cartNum: 0,
				account: '',
				loginblock: 0, // 0-》不出现 1 出现
				vals: '',
				login_status: 0,
			}
		},
		created() {
			this.token = sessionStorage.getItem('token')
			if(this.token) {
				this.init()
				this.login_status = 1
			} else {
				this.login_status = 0
			}
		},
		mounted() {
			this.getCartNum(sessionStorage.getItem('token'))
			bus.$on('cartNum', (data) => {
				console.log(data, '$ondata============')
				if(data == 1) {
					this.getCartNum(sessionStorage.getItem('token'))
				}
			})
			var _self = this;
			// 监听事件
			bus.$on('login', function(data) {
				console.log(data, '$on监听到的login值')
				_self.loginblock = data;
				if(_self.loginblock == 0) { /// 0 ->登录成功
					this.token = sessionStorage.getItem('token')
					setTimeout(() => {
						_self.init();
						_self.login_status = 1;
					}, 500)
				} else if(_self.loginblock == 1) {
					setTimeout(() => {
						this.token = sessionStorage.getItem('token')
						_self.init();
						_self.login_status = 0;
						//						console.log(_self.login_status, '退出')
					}, 500)
				} else if(_self.loginblock == 5) {
					_self.login_status = 0;
					setTimeout(() => {
						this.token = sessionStorage.getItem('token')
						_self.init();
					}, 500)
				}
			})
		},
		methods: {
			tabSta(idx) {
				localStorage.setItem('statu', idx)

				if(idx == 1) {
					this.$router.push({
						name: 'myOrder',
						path: '/mine/myOrder'
					})
				}else if(idx==2){
					this.$router.push({
						name: 'myMatch',
						path: '/mine/myMatch'
					})
				}else if(idx==3){
					this.$router.push({
						name: 'myCollection',
						path: '/mine/myCollection'
					})
				}else if(idx==7){
					this.$router.push({
						name: 'infor',
						path: '/mine/infor',
						query:{
							info:1
						}
					})
				}

			},
			page1() {
				localStorage.setItem('choose', 0)
				this.choose = localStorage.getItem('choose')
				this.$router.push({
					name: 'Index',
					path: '/'
				})
			},
			exit() {
				this.$confirm('确定要退出登录吗？', '退出登录', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确认',
					cancelButtonText: '取消'
				}).then((res) => {
					this.login_status = 0;
					this.$router.push({
						name: 'Index',
						path: '/'
					});
					this.choose = 0
					sessionStorage.clear();
				}).catch(action => {})
			},
			init() {
				var vm = this;
				console.log("888888888888888888888888888888888888888")
				console.log(vm.token)
				this.$axios.get(this.$common.my_url, {
					params: {
						token: sessionStorage.getItem('token')
					}
				}).then(res => {
					console.log(res)
					if(res.data.status == 1) {
						vm.account = res.data.data.account
					}
				})
			},
			enter() {
				bus.$emit('search', 1)

				console.log(this.vals)
				if(this.vals == '') {
					this.$message({
						message: "请输入搜索名称",
						type: 'warning',
						offset: 100
					})
				} else {

					this.$router.push({
						name: 'serchJg',
						path: '/serchJg',
						query: {
							vals: this.vals
						}
					})

				}

			},

			tabClick(choose) {
				localStorage.setItem('choose', choose)
				this.choose = localStorage.getItem('choose')
			},
			// 点击登录注册
			showLogin() {
				this.loginblock = 1;
				console.log(this.loginblock);
			},
			// 跳转购物车
			goCart() {
				this.$router.push({
					name: 'cart',
					path: '/cart'
				})
			},
			// 商城中购物车数量
			getCartNum(token) {
				this.$axios.get(this.$common.cart_cartNum, {
					params: {
						token: token
					}
				}).then(res => {
					if(res.data.status == 1) {
						this.cartNum = res.data.data.cartCount
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},

		}
	}
</script>

<style scoped>
	.logo img {
		width: 80px;
		height: 80px;
		float: left;
	}
	
	.dyxh {
		display: block;
		float: left;
		line-height: 80px;
		margin-left: 10px;
	}
	
	.heard ul.nav {
		margin: 0 10px;
	}
	/*.heard .logo{
		line-height: 80px !important;
	}*/
	
	.on {
		color: red
	}
</style>