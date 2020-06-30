<template>
	<div class="content">
		<div class="content-top"></div>

		<div class="wrap dongtai-detail text-center">
			<div class="font-size-30 font-bd" style="margin-bottom: 20px;">{{data.title}}</div>
			<div class="text-grayer" style="margin-bottom: 50px;"> <span class="text-theme" style="margin-right: 15px;"></span>{{data.create_time}}</div>
			
			
			
			<div class="" v-if="data.url!=''&&data.url!=null&&data.type==3">
				<video width="100%" height="" :src="data.url" controls="controls" :poster="data.thumb" style="object-fit:cover">
				</video>
			</div>
			
			
			<div class="" v-html="data.content">
			</div>
			<div class="" style="margin-top: 50px;">
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'informationDetail',
		components: {},
		data() {
			return {
				id: '',
				data: '',
				type: ''
			}
		},
		created() {
			this.id = this.$route.query.id;
			console.log(this.id)
			this.init();

		},
		methods: {
			init() {
				var vm = this;
				this.$axios.get(this.$common.pick_detail_url, {
					params: {
						id: vm.id
					},
				}).then(function(res) {
					console.log(res)
					vm.data = res.data.data.pick;
					vm.type = res.data.data.pick.type;
					console.log(vm.content)
				})

			},

		}
	}
</script>

<style>

</style>