<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap cart" style=" display: flex;justify-content: space-between;">
			<!-- 左边 -->
			<div class="menu" style="margin-right: 15ppx;">
				<div class="bg-white info">
					<div class="pic">
						<img :src="account.head_portrait" v-if="account.head_portrait" />
						<img src="../../assets/images/head.png" v-else/>
					</div>
					<div class="font-size-16 font-bd">{{account.nick_name}}</div>
					<div class="text-grayer font-size-12" style="margin: 10px auto 20px;">{{account.type_name}}</div>
					<div v-if="account.nick_name">
						<router-link to="/mine/renzheng">
							<div class="text-grayer bj-btn" :class="{'zh':sta==0}" @click="change(0)">账号认证</div>
						</router-link>
						<router-link to="/mine/infor">
							<div class="text-grayer bj-btn" :class="{'zh':sta==1}" @click="change(1)">编辑个人资料</div>
						</router-link>
					</div>
					
					<!--<div class="text-grayer bj-btn" @click="login" v-else>请登录</div>-->
				</div>

				<div class="bg-white tab">
					<ul>
						<router-link to="/mine/myOrder">
							<li :class="{'on': status == 1}" style="border-bottom: solid 1px #E6EBF4;" @click="tab(1)">
								我的订单
							</li>
						</router-link>
						<router-link to="/mine/myMatch">
							<li :class="{'on': status == 2}" @click="tab(2)">
								我的赛事
							</li>
						</router-link>
						<router-link to="/mine/myCollection">
							<li :class="{'on': status == 3}" @click="tab(3)">
								我的收藏
							</li>
						</router-link>
						<!--<router-link to="">
							<li :class="{'on': status == 4}" @click="tab(4)">
								我的积分
							</li>
						</router-link>-->
						<router-link to="/mine/address">
							<li :class="{'on': status == 5}" @click="tab(5)">
								地址管理
							</li>
						</router-link>
						<li class="tc" :class="{'on': status == 6}" @click="tab(6)">退出登录</li>
					</ul>
				</div>
			</div>
			<!-- 右边 -->
			<div class="" style="width: 82%;">
				<router-view />
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
				status: 1,
				token: sessionStorage.getItem('token'),
				account: '',
				sta:-1,
				info:''
			}
		},
		components:{
			
		},
		created() {
			if(this.$route.query.info==1){
				this.sta=1
			}
			this.status = localStorage.getItem('statu')
			this.init();

		},

		watch: {

		},
		computed: {

		},
		mounted() {

		},
		methods: {
			change(index){
				this.status=0;
				this.sta=index;
			},
			//编辑个人资料

			// 切换左边菜单
			tab(index) {
				this.sta=-1
				localStorage.setItem('statu',index)
				this.status = index
				
				
				console.log(index)
				if(index == 6) {
					this.$confirm('确定要退出登录吗？', '退出登录', {
						distinguishCancelAndClose: true,
						confirmButtonText: '确认',
						cancelButtonText: '取消'
					}).then(() => {
						sessionStorage.clear();
						bus.$emit('login',1) // 1-->退出登录
						this.$router.push("/")
						
					}).catch(action => {

					})

				}
			},
			//个人信息
			init() {
				var vm = this;
				this.$axios.get(this.$common.my_url, {
					params: {
						token: this.token
					}
				}).then(res => {
					console.log(res)
					if(res.data.status == 1) {
						vm.account = res.data.data.account
					}

				})
			},
		}
	}
</script>

<style>
	.zh{
		color: white !important;
		background-color: #1765FF
	}

</style>