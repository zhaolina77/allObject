<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap order-daishouhuo">

			<div class="bg-white state">
				<div class="" style="width: 100%;">
					<div class="font-size-24 font-bd zt">选择退款原因</div>
					<ul style="padding-left: 16px;">
						<li class="logistic " v-for="item in causeList">
							<input class="check" type="checkbox" :value="item.id">
							<span style="margin-left: 10px; color: #838998 !important;">{{item.name}}</span>
						</li>
					</ul>
					<div class="btn text-black hover" style="float: right;" @click="okRefund()">确认退款</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'logisticsInfo',
		data () {
			return {
				id: '',
				causeList: [],
				token: sessionStorage.getItem('token')
			}
		},
		created() {
			this.refundReson()
			if(this.$route.query) {
				this.id = this.$route.query.id
			}
		},
		mounted () {
			
		},
		methods:{
			refundReson () {
				this.$axios.get(this.$common.order_refundCauseList,{
					params:{
						
					}
				}).then(res => {
					if(res.data.status == 1) {
						this.causeList = res.data.data.causeList
					}
				}).catch( err => {
					console.log(err,'err==')
				})
			},
			// 确定退款
			okRefund () {
				let check = document.getElementsByClassName('check');
				let causeArr = []
				for(let i = 0; i < check.length; i++) {
					if(check[i].checked == true){
						causeArr.push(check[i].value)
					}
				}
				this.$axios.get(this.$common.order_refundApply,{
					params: {
						token: this.token,
						id: this.id, // 订单id
						causeId: causeArr.join()
					}
				}).then( res => {
					if(res.data.status == 1){
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 100
						})
						setTimeout(() => {
							this.$router.go(-2)
						},500)
					}else{
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch( err => {
					console.log(err,'err--')
				})
			}
		}
	}
</script>

<style scoped>
	.logistic{
		padding: 20px 10px;
	}
	.hover:hover{
		border: 1px solid #1765FF !important;
		color: #1765FF !important;
	}
</style>
