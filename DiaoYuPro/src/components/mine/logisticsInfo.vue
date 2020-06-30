<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap order-daishouhuo">
			
			<div class="bg-white state">
				<div class="">
					<div class="font-size-24 font-bd zt">物流信息</div>
					<div class="text-grayer">物流名称：{{logistics.tran_name}} </div>
					<div class="text-grayer">物流单号：{{logistics.logistics_number}}</div>
				</div>
			</div>
			<div class="bg-white state">
				<div class="">
					<div class="font-size-24 font-bd zt">物流详情</div>
					<ul style="padding-left: 16px;">
						<li class="logistic " v-for="item in mapList">
							<span style="margin-right: 20px;color: #838998 !important;">{{item.AcceptTime}}</span>
							<span style="color: #838998">{{item.AcceptStation}}</span>
						</li>
					</ul>
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
				logistics:'',
				mapList: []
			}
		},
		created() {
			if(this.$route.query) {
				this.logistics = this.$route.query.logistics
				this.mapList = this.$route.query.mapList
			}
		},
		mounted () {
			
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.logistic{
		padding: 20px 10px;
		list-style-type: disc !important; 
	}
</style>
