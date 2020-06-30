<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap bg-white cansai">
			<div class="public-title border-b">
				<span class="font-size-24 font-bd">立即参赛</span>
				<!--<span class="text-grayer hover">更多比赛</span>-->
			</div>
			<div class="inner">
				<ul>
					<li class="clearfix">
						<div class="fl name font-size-16">参赛人</div>
						<div class="fl">
							<input type="" name="" id="" v-model="contact_name" placeholder="请输入参赛人员姓名" />
						</div>
					</li>
					<li class="clearfix">
						<div class="fl name font-size-16">电&nbsp;&nbsp;&nbsp;话</div>
						<div class="fl">
							<input type="" name="" id="" v-model="contact_mobile" placeholder="请输入联系电话" />
						</div>
					</li>
					<li class="clearfix">
						<div class="fl name font-size-16">身份证</div>
						<div class="fl">
							<input type="" name="" id="" v-model="id_number" placeholder="请输入参赛人身份证号" />
						</div>
					</li>
					<li class="clearfix">
						<div class="fl name font-size-16">性 &nbsp;&nbsp;&nbsp;别</div>
						<div class="fl">
							<select name="">
								<option value="">请选择性别</option>
								<option value="">男</option>
								<option value="">女</option>
							</select>
						</div>
					</li>
				</ul>
			</div>
			<div class="pay text-center " v-if="is_charge == 1">
				<div class="money text-grayer font-size-16">应付金额：<span class="text-orange font-size-30 font-bd">{{price}}元</span></div>
				<div class="lx">
					<div class="sel" :class="{'on':zf==0}"  @click="wxSign()">
						<img src="../../assets/images/paywx.png" />
						<img class="duihao" src="../../assets/images/paysel.png" v-if="zf==0"/>
					</div>
					<div class="sel" :class="{'on':zf==1}" @click="paySign()">
						<img src="../../assets/images/payzfb.png" />
						<img class="duihao" src="../../assets/images/paysel.png" v-if="zf==1"/>
					</div>
				</div>
			</div>
			<div style="display: flex;justify-content: flex-end;">
				<div class="btnSign" @click="okSign()" v-if="is_charge == 0">
					立即报名参赛
				</div>
			</div>
		</div>
		<div class="text-grayer text-center" style="margin: 30px auto;">温馨提示：网站设置防盗刷系统，请合理使用下载账号，如果用户短时间内高频或大量下载可能触发该系统，将暂停账号下载功能。如有疑问请联系客服
			QQ：800053384</div>
	</div>
</template>

<script>
	export default {
		name: 'caisai',
		data() {
			return {
				is_charge: '',
				price: '',
				id: '', // 赛事id
				token: sessionStorage.getItem('token'), // 令牌
				contact_name: '', // 姓名
				contact_mobile: '', // 电话
				id_number: '', // 身份证号
				zf:0
			}
		},
		created() {
			if (this.$route.query) {
				this.id = this.$route.query.id
				this.is_charge = this.$route.query.is_charge
				this.price = this.$route.query.price
			}
		},
		mounted() {

		},
		methods: {
			
			// 免费报名
			okSign() {
				let myPhoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
				let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				
				if(this.contact_name == ''){
					this.$message({
						message:'请输入参赛人姓名',
						type:'warning',
						offset:100
					})
					return
				}
				if(this.contact_mobile == '') {
					this.$message({
						message:'请输入参赛人电话',
						type:'warning',
						offset:100
					})
					return
				}
				if(!myPhoneReg.test(this.contact_mobile)) {
					this.$message({
						message:'您输入的电话号码格式不正确',
						type:'warning',
						offset:100
					})
					return
				}
				if(this.id_number == '') {
					this.$message({
						message:'请输入参赛人身份证号码',
						type:'warning',
						offset:100
					})
					return
				}
				if(!idcard_patter.test(this.id_number)){
					this.$message({
						message:'您输入的身份证号码格式不正确',
						type:'warning',
						offset:100
					})
					return
				}
				this.$axios.get(this.$common.match_park_match,{
					params:{
						id: this.id, // 赛事id
						token: this.token, // 令牌
						contact_name: this.contact_name, // 姓名
						contact_mobile: this.contact_mobile, // 电话
						id_number: this.id_number, // 身份证号
					}
				}).then( res => {
					console.log(res)
					if(res.data.status == 1){
						this.$message({
							message:res.data.msg,
							type:'success',
							offset:100
						})
						this.$route.go(-2)
					}else{
						this.$message({
							message:res.data.msg,
							type:'warning',
							offset:100
						})
					}
				}).catch( err => {
					
				})
			},
			// 支付宝支付
			paySign () {
				let myPhoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
				let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				if(this.contact_name == ''){
					this.$message({
						message:'请输入参赛人姓名',
						type:'warning',
						offset:100
					})
					return
				}
				if(this.contact_mobile == '') {
					this.$message({
						message:'请输入参赛人电话',
						type:'warning',
						offset:100
					})
					return
				}
				if(!myPhoneReg.test(this.contact_mobile)) {
					this.$message({
						message:'您输入的电话号码格式不正确',
						type:'warning',
						offset:100
					})
					return
				}
				if(this.id_number == '') {
					this.$message({
						message:'请输入参赛人身份证号码',
						type:'warning',
						offset:100
					})
					return
				}
				if(!idcard_patter.test(this.id_number)){
					this.$message({
						message:'您输入的身份证号码格式不正确',
						type:'warning',
						offset:100
					})
					return
				}
				this.zf=1
				this.$axios.get(this.$common.match_part_match_alipay,{
					params:{
						id: this.id, // 赛事id
						token: this.token, // 令牌
						contact_name: this.contact_name, // 姓名
						contact_mobile: this.contact_mobile, // 电话
						id_number: this.id_number, // 身份证号
					}
				}).then( res => {
					console.log(res)
					if(res.data.status == 1){
						this.$message({
							message:res.data.msg,
							type:'success',
							offset:100
						})
						this.$route.go(-2)
					}else{
						this.$message({
							message:res.data.msg,
							type:'warning',
							offset:100
						})
					}
				}).catch( err => {
					
				})
			},
			// 微信支付
			wxSign(){
				
				let myPhoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
				let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				if(this.contact_name == ''){
					this.$message({
						message:'请输入参赛人姓名',
						type:'warning',
						offset:100
					})
					return
				}
				if(this.contact_mobile == '') {
					this.$message({
						message:'请输入参赛人电话',
						type:'warning',
						offset:100
					})
					return
				}
				if(!myPhoneReg.test(this.contact_mobile)) {
					this.$message({
						message:'您输入的电话号码格式不正确',
						type:'warning',
						offset:100
					})
					return
				}
				if(this.id_number == '') {
					this.$message({
						message:'请输入参赛人身份证号码',
						type:'warning',
						offset:100
					})
					return
				}
				if(!idcard_patter.test(this.id_number)){
					this.$message({
						message:'您输入的身份证号码格式不正确',
						type:'warning',
						offset:100
					})
					return
				}
				this.zf=0
				this.$axios.get(this.$common.match_part_match_wxpay,{
					params:{
						id: this.id, // 赛事id
						token: this.token, // 令牌
						contact_name: this.contact_name, // 姓名
						contact_mobile: this.contact_mobile, // 电话
						id_number: this.id_number, // 身份证号
					}
				}).then( res => {
					if(res.data.status == 1){
						this.$message({
							message:res.data.msg,
							type:'success',
							offset:100
						})
						this.$route.go(-2)
					}else{
						this.$message({
							message:res.data.msg,
							type:'warning',
							offset:100
						})
					}
				}).catch( err => {
					
				})
			}
		}
	}
</script>

<style>
	.btnSign {
		margin-top: 40px;
		border-radius: 2px;
		width: 200px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		background-color: #1765FF;
		color: #fff;
		font-size: 16px;
	}
</style>
