<template>
	<div class="content" id="app">
		<div class="content-top"></div>
		<div class="index">
		<div class="fenlei bg-white">
			<div class="wrap bg-white dongtai-xiehui">
				<div v-html="detail">{{detail}}</div>
			</div>
		</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'xiehuiDetail',
		components: {

		},
		data() {
			return {
				id:'',
				detail: '',
				dynamic:''
				
			}
		},
		created() {
			console.log(this.$route.query.id)
			if(this.$route.query.id) {
				this.id = this.$route.query.id
			}
			this.getDetail()
		},
		mounted() {

		},
		updated() {

		},
		methods: {
			getDetail() {
				this.$axios.get(this.$common.xuehui_dynamic_detail, {
					params: {
						id: this.id
					}
				}).then(res => {
					console.log(res)
					if(res.data.status == 1) {
						this.dynamic = res.data.data.dynamic
					}
				}).catch(err => {
					console.log(err)
				})
			}

		}
	}
</script>

<style>
</style>
