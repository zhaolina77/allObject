<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap xiehui-list">
			<!--简介-->
			<div class="bg-white jianjie clearfix">
				<div class="pic fl">
					<img :src="association.thumb" preview='1' />
				</div>
				<div class="text">
					<div class="ellipsis font-bd font-size-30 margin-t hover" style="margin-bottom: 40px;">{{association.name}}</div>
					<div class="ellipsis-3 font-size-16 text-grayer">{{association.content}}</div>
					<div class="font-size-14 text-grayer" style="margin-top: 30px;">{{association.address}}</div>
				</div>
			</div>

			<!--详情-->
			<div class="bg-white detail">
				<div class="tab border-b clearfix">
					<div class="item font-size-16 fl " :class="{on:status == 1}" @click="tabDontai(1)">简介</div>
					<div class="item font-size-16 fl" :class="{on:status == 2}" @click="tabDontai(2)">钓点</div>
					<div class="item font-size-16 fl" :class="{on:status == 4}" @click="tabDontai(4)">赛事</div>
					<div class="item font-size-16 fl" :class="{on:status == 3}" @click="tabDontai(3)">店铺</div>
				</div>
				<!--简介/钓点/店铺-->
				<div class="dongtai-xiehui" v-if="status == 1||status == 2||status == 3">
					<ul class="list">
						<li class="clearfix" v-for="item in dongtaiList" @click="toDetail(item.id)">
							<div class="pic fl xhdt">
								<img :src="item.thumb" />
								<img class="bofang" src="../../assets/images/player.png" v-if="item.type==3" />
							</div>
							<div class="text">
								<div class="ellipsis font-size-20 font-bd bt">{{item.title}}</div>
								<div class="font-size-12 text-grayer bq">{{item.address}}·{{item.create_date}}</div>
							</div>
						</li>
					</ul>
					<!--分页-->
				</div>
				<!-- 协会赛事 -->
				<div class="bisai-list" v-if="status == 4">
					<ul>
						<li class="clearfix" v-for="item in dongtaiList" @click="toMatchDetail(item.id)">
							<div class="pic fl">
								<img :src="item.pic" />
							</div>
							<div class="text">
								<div class="ellipsis font-bd font-size-22 margin-t hover">{{item.name}}</div>
								<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/rl.png" /> {{item.create_date}}
								</div>
								<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/zb.png" />{{item.address}}</div>
								<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/ry.png" />{{item.already_num}}/{{item.num}}</div>
							</div>
						</li>
					</ul>
					<!--分页-->

				</div>
				<!--分页-->
				<div id="wr-page" class="page-out bg-white">
					<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="changePage">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'xiehuiDongtai',
		// components:{

		// },
		data() {
			return {
				id: '',
				currentPage: 1,
				pageSize: 6,
				total: 0,
				dongtaiList: [],
				status: 1,
				association: '', // 协会详情
				class_id: 1,
			}
		},
		created() {
			console.log(this.$route.params)
			this.id = this.$route.query.id
			this.getDetail();
			this.$previewRefresh()
		},
		mounted() {

		},
		methods: {
			tabDontai(class_id) {
				this.dongtaiList = ''
				this.status = class_id
				this.class_id = class_id
				this.currentPage = 1
				if(class_id == 4) {
					this.getMatchList()
				} else {
					this.getDetail()
				}
			},
			getDetail() {
				this.$axios.get(this.$common.xiehui_association_detail, {
					params: {
						id: this.id,
						pageNo: this.currentPage,
						pageSize: this.pageSize,
						class_id: this.class_id
					}
				}).then(res => {
					console.log(res, 'res协会详情')
					if(res.data.status == '1') {

						var pics = ''
						var lis = res.data.data.page.list;
						for(var i = 0; i < lis.length; i++) {
							if(lis[i].thumb == null) {
								if(lis[i].pic.length > 3) {
									pics = lis[i].pic
								} else {
									pics = lis[i].pic[0]
								}
							} else {
								pics = lis[i].thumb
							}
							res.data.data.page.list[i].thumb = pics
						}
						this.association = res.data.data.association
						this.dongtaiList = res.data.data.page.list;
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
					}
				}).catch(function(err) {
				})
			},
			// 赛事列表
			getMatchList() {
				this.$axios.get(this.$common.index_matchs_list, {
					params: {
						is_rec: '', //是否推荐 0-不推荐 1-推荐	
						type: 1, //	1-协会 2-钓场 0-默认	
						module_id: this.id, //协会ID 钓场ID 0-默认	 --》 举办方
						is_charge: -1, //	0-不收费 1-收费 默认-1-->赛事类型	
						min_num: 0, //参赛人数 小 0-默认	
						max_num: 0, //参赛人数 大 0-默认	
						region_id: 0, //	地址ID 0-默认	
						name: '', //	搜索	
						sort: '', //	0-默认 1-最新	
						pageNo: this.currentPage, //1	
						pageSize: this.pageSize, //	是	6
					}
				}).then(res => {
					console.log(res)
					// debugger
					if(res.data.status == 1) {
						this.dongtaiList = res.data.data.page.list
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
					}
				}).catch(err => {
					console.log(err, ' err')
				})
			},
			// currentPage 改变时会触发
			changePage(currentPage) {
				this.currentPage = currentPage
				if(this.status == 4) {
					this.getMatchList()
				} else {
					this.getDetail(this.class_id)
				}
			},
			// 跳转详情
			toDetail(class_id) {
				this.$router.push({
					name: 'dongtaiDetail',
					path: '/dongtaiDetail',
					query: {
						data: class_id
					}
				})
			},
			// 去赛事详情
			toMatchDetail(id) {
				this.$router.push({
					name: 'cansaiDetail',
					path: '/cansaiDetail',
					query: {
						id: id
					}
				})
			},

			//			分页
			// pageSize 改变时会触发
			handleSizeChange: function(size) {
				console.log(458)
				return
				this.pageSize = size;
				console.log(size)
				console.log(this.pageSize, 7777) //每页下拉显示数据
			},
			// currentPage 改变时会触发
			changePage(currentPage) {
				this.currentPage = currentPage
				console.log(currentPage)
				this.getDetail()
				this.getMatchList()
			},
		}
	}
</script>

<style>
	li.number {
		padding: 0 !important;
	}
	
	li.el-icon-more {
		padding: 0 !important;
	}
	
	.dongtai-xiehui li {
		padding: 30px 0;
	}
	
	.xhdt {
		position: relative;
		top: 0;
		left: 0;
	}
	
	.xhdt .bofang {
		width: 60px !important;
		height: 60px !important;
		position: absolute !important;
		top: 60px;
		left: 110px;
		z-index: 333;
		opacity: .8;
	}
</style>