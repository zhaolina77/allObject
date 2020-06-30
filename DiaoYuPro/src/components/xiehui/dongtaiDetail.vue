<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap dongtai-detail text-center">
			<div class="font-size-30 font-bd" style="margin-bottom: 20px;">{{dynamic.title}}</div>
			<div class="text-grayer" style="margin-bottom: 50px;"> <span class="text-theme" style="margin-right: 15px;">{{dynamic.address}}</span>{{dynamic.create_date}}</div>
			<div class="" v-if="dynamic.url!=''&&dynamic.url!=null&&dynamic.type==3">
				<video width="100%" height="" :src="dynamic.url" controls="controls" :poster="dynamic.thumb" style="object-fit:cover">
<!--					<source :src="dynamic.url" type="video/mp4"></source>-->
				</video>
			</div>
			<div v-html="dynamic.content"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'dongtaiDetail',
		components: {

		},
		data() {
			return {
				dynamic: '',
				id: ''
			}
		},
		created() {
			if(this.$route.query.data) {
				this.id = this.$route.query.data
			}
			this.getDetail()
		},
		mounted() {

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