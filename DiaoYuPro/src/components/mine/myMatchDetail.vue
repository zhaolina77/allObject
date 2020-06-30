<template>
	<div class="content">
		<div class="wrap my-matchdetail">

			<div class="bg-white jianjie clearfix">
				<div class="pic fl">
					<img :src="data.pic" />
				</div>
				<div class="text">
					<div class="ellipsis-2 font-bd font-size-30 margin-t hover border-b" style="padding-bottom: 20px;">{{data.name}}</div>
					<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/rl.png" /> {{data.open_time}}</div>
					<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/zb.png" />{{data.address}}</div>
					<!--<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/ry.png" />124/500</div>-->
				</div>
			</div>

			<div class="detail bg-white">
				<div class="public-title clearfix">
					<span class="font-size-24 font-bd">参赛信息</span>
				</div>
				<ul class="text-grayer font-size-16">
					<li>举办单位：{{data.association_name==null?'':data.association_name==null}}</li>
					<li>参赛费用：{{data.price}}元</li>
					<li>参赛人姓名：{{data.contacts_name}}</li>
					<li>联系电话：{{data.contacts_mobile}}</li>
					<li>身份证号：{{data.id_number}}</li>
				</ul>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				token:'',
				id:'',
				data:[]
			}
		},
		created() {
			this.token=sessionStorage.getItem('token');
			this.id=this.$route.query.id
			this.init();
		},
		mounted() {

		},
		methods: {
			init() {
				var vm = this;
				this.$axios.get(this.$common.my_match_coupon_detail_url, {
					params: {
						token:vm.token,
						id:vm.id
					}
				}).then(res => {
					console.log(res)
					if(res.data.status==1){
						vm.data=res.data.data.record;
					}
					

				})
			},
			
		}
	}
</script>

<style>

</style>