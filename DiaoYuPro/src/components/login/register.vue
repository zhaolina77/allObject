<template>
	<div class="popup">
		<div class="bg-white login set-password" >
			<div class="inner">
				<div class="clearfix">
					<img class="close" src="../../assets/images/close.png" @click="close()"/>
				</div>
				<div class="text-center" style="margin: 8px auto;">
					<div class="font-size-20 font-bd">注册账号</div>
					<div class="text-grayer" style="margin-top: 10px;">注册成功后即可用此账登录</div>
				</div>
				
				<div class="form">
					<div class="inpt">
						手机号
						<input type="" name="" id="" value="" placeholder="请输入手机号" />
					</div>
					<div class="yzm clearfix">
						<input class="fl" type="" name="" id="" value="" placeholder="请输入短信中的验证码"/>
						<div class="yzm-btn fr">获取验证码</div>
					</div>
					<div class="inpt">
						<input type="" name="" id="" value="" placeholder="请输入6位字符以上新密码"/>
					</div>
					<div class="tj-btn"  style="margin-top: 40px;">登录</div>
				</div>
			</div>
			
			<div class="more  clearfix">
				<div class="fr text-grayer">
					<span style="vertical-align: middle;">已有账号？</span>
					<span class="qita text-theme hover" @click="toLogin">去登陆</span>
					<img class="right-icon" src="../../assets/images/right.png"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bus from '../../assets/eventBus.js';
	export default{
		name:'login',
		components:{
			
		},
		data(){
			return{
				
			}
		},
		methods:{
			close() {
				bus.$emit('login',5) // 0-->关闭
			},
			toLogin(){
				bus.$emit('login', 1)   // 1--》 登录
			}
		}
	}
</script>

<style>
</style>
