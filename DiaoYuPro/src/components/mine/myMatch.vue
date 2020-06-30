<template>
	<!--左边切换-->

	<!--右边的内容-->
	<div class="mine-right my-match">
		<!--切换-->
		<div class="bg-white nav clearfix">
			<div class="item" :class="{'on':is_part_in==0}" @click="change(0)">待使用</div>
			<div class="item" :class="{'on':is_part_in==1}" @click="change(1)">已使用</div>
			<div class="item" :class="{'on':is_part_in==2}" @click="change(2)">已过期</div>
		</div>

		<!--列表-->
		<div class="">
			<div class="bg-white bisai-list">
				<ul>
					<li class="clearfix" v-for="item in list" @click="enter(item.id)">
						<div class="pic fl">
							<img :src="item.pic" />
						</div>
						<div class="text">
							<div class="ellipsis font-bd font-size-22 margin-t hover">{{item.name}}</div>
							<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/rl.png" /> {{item.open_time}}</div>
							<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/zb.png" />{{item.address}}</div>
							<!--<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/ry.png" />{{item}}/500</div>-->
						</div>
					</li>
				</ul>
				<!--分页-->
				<div id="wr-page" class="page-out bg-white" v-if="list.length != 0">
					<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNo"
					@current-change="changePage">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
	<!--右边的内容结束-->

</template>

<script>
	export default {
		name: '',
		data() {
			return {
				token: '',
				is_part_in: 0,
				pageNo: 1,
				pageSize: 8,
				list:[],
				total:0,
			}
		},
		created() {
			this.token=sessionStorage.getItem('token');
			this.init();
		},
		mounted() {

		},
		methods: {
			//进入赛事详情
			enter(id){
				this.$router.push({name: 'myMatchDetail',path: '/myMatchDetail',query:{id: id}})
			},
			//导航切换
			change(index){
				this.is_part_in=index;
				this.list=''
				this.init()
			},
			//赛事list
			init() {
				var vm = this;
				this.$axios.get(this.$common.my_match_coupon_url, {
					params: {
						token: vm.token,
						is_part_in: vm.is_part_in,
						pageNo: vm.pageNo,
						pageSize: vm.pageSize
					}
				}).then(res => {
					console.log(res)
					if(res.data.status==1){
						vm.list=res.data.data.page.list;
						vm.total=res.data.data.page.totalRow
					}
					

				})
			},
			
			// pageSize 改变时会触发
			handleSizeChange: function(size) {
				console.log(458)
				return 
				this.pageSize = size;
				console.log(size)
				console.log(this.pageSize,7777) //每页下拉显示数据
			},
			// currentPage 改变时会触发
			changePage(currentPage) {
				this.pageNo = currentPage
				console.log(currentPage)
				this.init()
			},
		}
	}
</script>

<style>

.bisai-list li {
	padding: 0;
}

</style>