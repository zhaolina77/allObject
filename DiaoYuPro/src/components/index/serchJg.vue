<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap serch">
			<div class="bg-white tab clearfix">
				<div class="fl item" :class="{'on':state==0}" @click="change(0)">商品</div>
				<div class="fl item" :class="{'on':state==1}" @click="change(1)">商家</div>
				<div class="fl item" :class="{'on':state==2}" @click="change(2)">钓场</div>
				<div class="fl item" :class="{'on':state==3}" @click="change(3)">协会</div>
				<div class="fl item" :class="{'on':state==4}" @click="change(4)">比赛</div>
			</div>

			<!--商品-->
			<div class="shop-list" v-if="state==0">
				<ul class="clearfix">
					<li class="bg-white fl" v-for="item in list" @click="shop(item.id)">
						<div class="pic">
							<img :src="item.thumb" />
						</div>
						<div class="text">
							<div class="ellipsis-2 font-size-16">{{item.name}}</div>
							<div class="text-orange font-size-12 num" style="display: flex;justify-content: flex-start;">￥<span class="font-size-30 font-w" style="float：left">{{item.market_price}}</span></div>
							
						</div>
					</li>
				</ul>
				<!--分页-->
				<div id="wr-page" class="page-out bg-white sp" v-if="list.length != 0">
					<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNo"
					@current-change="changePage">
					</el-pagination>
				</div>
			</div>

			<!--商家-->
			<div class="bg-white shangjia-list" v-if="state==1">
				<ul>
					<li class="clearfix" v-for="item in list" >
						<div class="info fl" @click="shangjia(item.id)">
							<div class="nr clearfix">
								<div class="sj-pic fl"><img :src="item.thumb" /></div>
								<div class="xinxi">
									<div class="font-size-16 margin-t5 text-theme">{{item.shop_name}}</div>
									<div class="font-size-12 margin-t5" style="margin-top: 20px;"><span class="text-grayer">{{item.distance}}m</span></div>
									<!--<div class="font-size-12 margin-t5 ellipsis"><span class="text-grayer">地址：</span>灞桥区鹿塬街林河春天小区3号楼1904室</div>-->
								</div>
							</div>
							<div class="text-grayer num">共计{{item.goodnum}}件商品  | 月销{{item.sales}}</div>
						</div>
						<div class="pic fr clearfix">
							<div class="fl wc" v-for="v in item.goodlist" @click="shop(v.id)">
								<div class="pic-nr">
									<img :src="v.thumb" />
								</div>
								<div class="num text-orange font-size-16 text-center">￥{{v.market_price}}</div>
							</div>
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

			<!--钓场-->
			<div class="bg-white diaochang-list" v-if="state==2">
				<ul>
					<li class="clearfix" v-for="item in list" @click="diaochang(item.id)">
						<div class="pic fl">
							<img :src="item.thumb" />
						</div>
						<div class="info">
							<div class="font-size-20 margin-t font-bd hover">{{item.name}}</div>
							<div class="text-orange font-size-14 margin-t">{{item.type_names}} </div>
							<div class="font-size-14 text-grayer margin-t">
								{{item.fish}}
								<span class="font-bd text-black ditu"> <img class="dw" src="../../assets/images/dw.png"/> 查看地图</span>
							</div>
							<div class="font-size-14 text-grayer margin-t ellipsis">介绍：{{item.content}}</div>
							<div class="font-size-14  text-grayer margin-t">收费：{{item.price}}元/{{item.charging_standard_name}}</div>
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

			<!--协会-->
			<div class="bg-white dongtai-xiehui" v-if="state==3">
				<ul class="list">
					<li class="clearfix" v-for="item in list" @click="xiehui(item.id)">
						<div class="pic fl">
							<img :src="item.thumb" />
						</div>
						<div class="text">
							<div class="ellipsis font-size-20 font-bd bt">{{item.name}}</div>
							<div class="ellipsis-3 font-size-16 text-grayer fbt">{{item.content}}</div>
							<div class="font-size-12 text-grayer bq">{{item.address}}·{{item.create_date}}</div>
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

			<!--比赛-->
			<div class="bg-white bisai-list" v-if="state==4">
				<ul>
					<li class="clearfix" v-for="item in list" @click="bisai(item.id)"> 
						<div class="pic fl">
							<img :src="item.pic" />
						</div>
						<div class="text">
							<div class="ellipsis font-bd font-size-22 margin-t hover">{{item.name}}</div>
							<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/rl.png" />{{item.open_time}}</div>
							<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/zb.png" />{{item.address}}</div>
							<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/ry.png" />{{item.already_num}}/{{item.num}}</div>
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
</template>

<script>
	import bus from '../../assets/eventBus.js';
	export default {
		data() {
			return {
				token: '',
				state: 0,
				list: [],
				pageNo: 1,
				pageSize:12,
				total: 0,
				search_name: '',
				is_load: '',
				open_type: '',
				history: [],
				val: '',
				is_search: 0
			}
		},
		created() {
			this.search_name = this.$route.query.vals
			this.token = sessionStorage.getItem('token'),
				this.init();
		},
		mounted(){
			bus.$on('search', (data) => {
				console.log(data, '搜索搜索sssssssssssssssss')
				if(data==1){
//					this.search_name = this.$route.query.vals
					console.log(this.search_name)
					setTimeout(res=>{
						this.init()
					})
					
				}
			})
		},
		methods: {
			//进入商品详情
			shop(id){
				this.$router.push({name: 'shopDetail',path: '/shopDetail',query:{id: id}})
			},
			//进入商家详情
			shangjia(id){
				this.$router.push({name: 'tehui', path: '/tehui', query:{prefectureId:id}})
			},
			//进入钓场详情
			diaochang(id){
				this.$router.push({name: 'fishingDetail', path: '/fishingDetail', query:{ id: id}})
			},
			//进入协会详情
			xiehui(id){
				this.$router.push({name:'xiehuiDongtai',path:'/xiehuiDongtai',query:{id:id}})
			},
			//进入比赛详情
			bisai(id){
				this.$router.push({name: 'cansaiDetail',path: '/cansaiDetail',query:{id: id}})
			},
			//导航切换
			change(state) {
				this.state = state;
				this.init();
			},
			init() {
				console.log('yuyuyuyuy')
				var vm = this;
				var nam=vm.$route.query.vals
				var url = vm.$common.shop_goodsList;
				if(vm.state == 0) {
					url = vm.$common.shop_goodsList;
				} else if(vm.state == 1) {
					url = vm.$common.shopList_url;
				} else if(vm.state == 2) {
					url = vm.$common.site_site_list;
				} else if(vm.state == 3) {
					url = vm.$common.xiehui_association_list;
				} else {
					url = vm.$common.index_matchs_list;
				}
				this.$axios.get(url, {
					params: {
						token: vm.token,
						pageSize: vm.pageSize,
						name: nam,
						pageNo: vm.pageNo,
					}
				}).then(res=>{
					console.log(res)
					vm.list=res.data.data.page.list;
					vm.total=res.data.data.page.totalRow
				})

			},
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

		},

	}
</script>

<style>
	.bisai-list li{
		padding: 0;
	}
	.shangjia-list li{
		padding: 20px;
	}
	.dongtai-xiehui li{
		padding: 0;
	}
	.diaochang-list li{
		/*padding: 0;*/
	}
	.sp li{
		width:30px ;
		padding: 0;
		margin-top: -30px !important;
	}
	.el-pager li{padding: 0;}

</style>