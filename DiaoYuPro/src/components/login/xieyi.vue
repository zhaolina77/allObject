<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="agreement">
			<div class="name font-bd font-size-30">{{data.name}}</div>
			<!--<div class="text-grayer" style="margin: 20px 0;">更新时间：2019-9-9</div>-->
			<div class="" style="margin-top: 30px;" v-html="data.content">

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "xieyi",
		data() {
			return {
				data: '',
				index: '',
				title: ''
			}
		},
		created() {
			this.index = this.$route.query.index
			this.init();
		},
		methods: {
			init() {
				var urls = '';
				if(this.index == 1) {
					this.$axios.get(this.$common.user_agreement_url).then(res => {
						console.log(res)
						this.data = res.data.data.agreement
					})
				} else {
					this.$axios.get(this.$common.policy_url).then(res => {
							console.log(res)
							this.data = res.data.data.privacy

					})

					}

				}

			}
		}
</script>

<style>

</style>