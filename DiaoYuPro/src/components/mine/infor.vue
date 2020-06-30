<template>
	<div class="content">
		<div class="wrap clearfix">
			<div class="mine-right bg-white my-address">
				<div class="public-title border-b">
					<span class="font-size-24 font-bd">个人资料</span>
				</div>
				<div class="aui-bg-white" id="app" v-cloak>
					<div class="aui-padded-15 ">
						<div class="aui-padded-t-15">
							<div class="aui-font-size-12 aui-text-gray aui-padded-b-10 aui-padded-t-10 titl">昵称</div>
							<div class="aui-border-b">
								<input class="txt" placeholder="请输入昵称" v-model="user" type="text" />
							</div>
						</div>
						<div class="aui-padded-t-15">
							<div class="aui-font-size-12 aui-text-gray aui-padded-b-10 aui-padded-t-10 titl">性别</div>
							<div class="aui-border-b list">
								<div class="txt">
									<input style="margin-top:10px;" type="radio" name="1" id="" value="1" @change="sex_select" :checked="sex==1" /><span style="margin-left: 6px;">男</span>
									<input type="radio" name="1" id="" value="2" @change="sex_select" :checked="sex==2" style="margin-left: 30px;margin-top: 10px;" /><span style="margin-left: 6px;">女</span>
								</div>
							</div>
						</div>
						<div class="aui-padded-t-15">
							<div class="aui-font-size-12 aui-text-gray aui-padded-b-10 aui-padded-t-10 titl">生日</div>
							<div class="aui-border-b list">
								<input class="txt" placeholder="请输入出生日期" @focus="xuanze" v-model="birthday" type="text" v-if="show" />
								<input class="txt" placeholder="请输入出生日期" @change="date_select" type="date" v-else/>
							</div>
						</div>
						<div class="aui-padded-t-15">
							<div class="aui-font-size-12 aui-text-gray aui-padded-b-10 aui-padded-t-10 titl">所在城市</div>
							<div class="aui-border-b list">
								<input class="txt" placeholder="请输入所在城市" v-model="address" type="text" />
								<!--<img class="icon" src="../../assets/images/jt-right2.png" />-->
							</div>
						</div>
						<div class="aui-padded-t-15">
							<div class="aui-font-size-12 aui-text-gray aui-padded-b-10 aui-padded-t-10 titl">简介</div>
							<div class="">
								<textarea class="area" cols="160" rows="10" style="font-size: 14px;" v-model="remark" placeholder="请输入简介" type="text" onclick="focus()"></textarea>
							</div>
						</div>
						<div class="foo" @click="save">保存</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'infor',
		data() {
			return {
				user: '',
				birthday: '',
				sex: '',
				address: '',
				remark: '',
				head_portrait: '',
				background: '',
				show: ''
			}
		},
		created() {
			this.token = sessionStorage.getItem('token')
			this.init()
		},
		methods: {
			xuanze() {
				this.show = false
			},
			date_select(e) {
				this.birthday = e.srcElement.value
			},
			//			性别选择
			sex_select(e) {
				console.log(e.srcElement.attributes.value.nodeValue)
				this.sex = e.srcElement.attributes.value.nodeValue
			},
			//保存更改后的信息
			save() {
				var vm = this;
				this.$axios.get(this.$common.my_save_url, {
					params: {
						token: vm.token,
						head_portrait: vm.head_portrait,
						background: vm.background,
						user: vm.user,
						birthday: vm.birthday,
						sex: vm.sex,
						address: vm.address,
						remark: vm.remark,
					}
				}).then(res => {
					console.log(res)
					if(res.data.status == 1) {
						vm.init()
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 100
						})
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				})
			},
			//获取个人信息
			init() {
				var vm = this;
				this.$axios.get(this.$common.my_url, {
					params: {
						token: this.token
					}
				}).then(res => {
					//					console.log(res)
					if(res.data.status == 1) {
						var data = res.data.data.account;
						this.user = data.nick_name;
						this.address = data.address;
						this.remark = data.remark;
						this.head_portrait = data.head_portrait;
						this.background = data.background;
						this.sex = data.sex;
						this.birthday = data.birthday;
						if(data.birthday != '') {
							this.birthday = data.birthday;
							this.show = true
						} else {
							this.show = false
						}
					}
				})
			},

		}
	}
</script>
<style>
	#app {
		margin-top: 30px;
	}
	.txt {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #E6EBF4;
	}
	.titl {
		color: gray;
		line-height: 50px;
	}
	
	.foo {
		width: 100px;
		line-height: 50px !important;
		border-radius: 5px;
		background-color: dodgerblue;
		text-align: center;
		color: white;
		font-size: 20px;
		margin:0 auto;
		
		margin-bottom: 30px !important;
	}
	
	.my-address {
		padding: 0 30px 30px 30px;
	}
</style>