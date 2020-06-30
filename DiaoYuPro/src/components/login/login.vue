<template>
	<div class="popup">
		<div class="bg-white login zj-login">
			<div class="inner">
				<div class="clearfix">
					<img class="close" src="../../assets/images/close.png" @click="close()"/>
				</div>
				<div class="text-center font-size-20 font-bd" style="margin: 8px auto;">
					<span style="vertical-align: middle;">账号密码登录</span>
				</div>

				<div class="form">
					<div class="inpt">
						账号
						<input type="" name="" id="" value="" placeholder="请输入手机号" v-model="phone"/>
					</div>
					<div class="inpt">
						密码
						<input type="password" name="" id="" value="" placeholder="请输入密码" v-model="password" @keyup.enter="login" />
					</div>
					<div class="text-theme hover" style="text-align: right;">忘记密码</div>
					<div class="tj-btn" @click="login">登录</div>
				</div>


				<div class="" style="padding: 0 80px;">
					<div class="text-grayer" style="text-align: center;display: flex;justify-content: space-between;align-items: center;">
						<div class="text-center">
							<img src="../../assets/images/qt-phone.png" />
							<div class="font-size-12" style="margin-top: 5px;">账号登录</div>
						</div>
						<div class="text-center">
							<img src="../../assets/images/qt-saoma.png" />
							<div class="font-size-12" style="margin-top: 5px;">APP扫码登录</div>
						</div>
					</div>
				</div>

			</div>
			<div class="more  clearfix">
				<div class="fl text-grayer">登录即同意<span class="text-orange" @click="xieyi(1)">用户协议</span>&nbsp;&nbsp;和 &nbsp;&nbsp;<span class="text-orange" @click="xieyi(2)">隐私政策</span></div>
				<div class="fr">
					<span class="qita text-theme hover" @click="toRegistr()" >手机号注册</span>
					<img class="right-icon" src="../../assets/images/right.png" />
				</div>
			</div>

		</div>
		<!-- 注册 -->
	</div>
</template>

<script>
	import bus from '../../assets/eventBus.js';
	export default {
		name: 'login',
		components: {

		},
		data() {
			return {
				phone: '',
				password: ''
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			//查看协议和政策
			xieyi(index){
				this.$router.push({name:'xieyi',path:'/xieyi',query:{index:index}})
				bus.$emit('login',5)
			},
			
			// 登录
			login(){
				if(this.phone==''){
					this.$message({
						message:'用户名不能为空',
						type: 'warning',
						offset: 100
					});
					return false;
				}
				if(this.password==''){
					this.$message({
						message:'密码不能为空',
						type: 'warning',
						offset: 100
					});
					return false;
				}
				this.$axios.get(this.$common.login_login,{
					params:{
						phone: this.phone,
						password:this.password,
						wx_openid: ''
					}
				}).then(function(res){
					if(res.data.status == 1){
						sessionStorage.setItem('token',res.data.data.token)
						
						console.log(res.data.data.token,'登录成功')
						
							bus.$emit('login',0) // 0-->登录成功
							bus.$emit('cartNum',1)
						
					}else{
						this.$message({
							message:res.data.msg,
							type: 'warning',
							offset: 100
						});
					}
				}).catch(function(err){
						console.log(err,'err')
				})
			},
			// 去注册页面
			toRegistr() {
				bus.$emit('login',2) // 2--》注册
			},
			// 关闭登录页面
			close() {
				bus.$emit('login',5) // 0-->关闭
			},
		},
}
</script>

<style>
</style>
