<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap match">
			<!--切换-->
			<div class="bg-white fenlei-tab">
				<div class="clearfix font-size-16 tab">
					<div class="fl item text-grayer" :class="{'on': status == 0}" @click="tabMatch(0)">比赛</div>
					<div class="fl item text-grayer" :class="{'on': status == 1}" @click="tabMatch(1)">视频</div>
				</div>
				<!--比赛-->
				<ul class="bisai" v-if="status == 0">
					<li class="">
						<div class="fl name text-grayer">赛事类型：</div>
						<div class="nr">
							<span :class="{'on': statusMatch == 0}" @click="matchTab(0)">免费</span>
							<span :class="{'on': statusMatch == 1}" @click="matchTab(1)">收费</span>
						</div>
					</li>
					<li class="">
						<div class="fl name text-grayer">举办方：</div>
						<div class="nr">
							<span :class="{'on':statusSite == 2}" @click="typeTab(2)">钓场</span>
							<span :class="{'on':statusSite == 1}" @click="typeTab(1)">协会</span>
						</div>
					</li>
					<li class="">
						<div class="fl name text-grayer">参赛人数：</div>
						<div class="nr">
							<span :class="{'on': statusNum == 1}" @click="numTab(1)">20人以内</span>
							<span :class="{'on': statusNum == 2}" @click="numTab(2)">21-50人</span>
							<span :class="{'on': statusNum == 3}" @click="numTab(3)">51-100人</span>
							<span :class="{'on': statusNum == 4}" @click="numTab(4)">101人以上</span>
						</div>
					</li>
					<li class="">
						<div class="fl name text-grayer">比赛地区：</div>
						<div class="nr">
							<span :class="{'on': statusAddress == item.id}" v-for="item in address_list" @click="addressTab(item.id)">{{item.name}}</span>
							<!-- <span>北京</span> -->
						</div>
					</li>
				</ul>
				<!--视频-->
				<ul class="shiping clearfix" v-else>
					<li class="fl font-size-16 text-grayer" v-for="item in classify_list" :class="{'onMatch': statusVedio == item.id }"
					 @click="vedioTab(item.id)">{{item.name}}</li>
					<!-- 	<li class="fl font-size-16 text-grayer ">最新</li>
					<li class="fl font-size-16 text-grayer ">协会</li>
					<li class="fl font-size-16 text-grayer ">黑坑</li> -->
				</ul>
			</div>

			<!--赛事-->
			<div class="bg-white bisai-list" v-if="status == 0">
				<ul v-if="matchList.length != 0">
					<li class="clearfix" v-for="item in matchList" @click="tiaozhuan(item.id)">
						<div class="pic fl">
							<img :src="item.pic" />
						</div>
						<div class="text">
							<div class="ellipsis font-bd font-size-22 margin-t hover">{{item.name}}</div>
							<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/rl.png" />
								{{item.open_time}}
								<span class="font-size-14" style="color: #1765FF;float: right;">查看详情>></span>
							</div>
							<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/zb.png" />{{item.address}}</div>
							<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/ry.png" />{{item.already_num}}/{{item.num}}</div>
							
						</div>
					</li>
				</ul>
				<div v-else class="text-center" style="font-size: 18px;line-height: 94px;">暂无比赛信息</div>
				
			</div>
			<!--视频-->
			<div class="shiping-list" v-else>
				<ul class="clearfix">
					<li class="bg-white fl" v-for="item in matchList">
						<div class="pic">
							<!-- <img src="../../assets/images/lizi.png" /> -->
							<video width="100%" height="100%" :src="item.url" :poster="item.vedio_img"    controls="controls"  style="object-fit:cover">
								<!--<source :src="item.url">
								</source>-->
							</video>
							<!-- <div class="bofang">
								<img src="../../assets/images/bf.png" />
								<span>10:0</span>
								
							</div> -->
						</div>
						<div class="text" @click="sp(item.association_id)">
							<div class="ellipsis-2 font-size-16">{{item.name}} </div>
							<div class="info clearfix">
								<div class="fl tu">
									<img :src="item.association_thumb" />
								</div>
								<div class="wz">
									<div class="font-size-12 text-grayer ellipsis">{{item.association_name}}</div>
									<div class="font-size-12 text-grayer ellipsis margin-t">{{item.create_date}}</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<!-- 分页 -->
			<div id="wr-page" class="page-out bg-white" v-if="matchList.length != 0">
				<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage"
				 @current-change="changeCurrent">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'matchIndex',
		data() {
			return {
				total: 0,
				pageSize: 8,
				currentPage: 1,
				matchList: [], // 赛事列表 频list
				status: 0,
				module_id: '', // 举办方
				address_list: [], // 地址列表
				statusMatch: -1, // 赛事类型状态
				statusSite: '', /// 状态钓场类型
				statusNum: '', // 状态人数
				statusAddress: '', // 状态地区
				is_charge: -1, // 赛事类型
				region_id: 0, // 地址id
				min_num: 0, // 最小人数
				max_num: 0, // 最大人数
				type: 0,
				classify_list: [], // 赛事视频类型
				statusVedio: 0, // 状态视频切换
				// vedioList: [], // 视频list
				id:0
			}
		},
		created() {
			this.getAddressList()
			this.getMatchList()
		},
		mounted() {

		},
		methods: {
//			进入协会
			sp(id){
				this.$router.push({name:'xiehuiDongtai',path:'/xiehuiDongtai',query:{id:id}})
			},
//			跳转详情
			tiaozhuan(id){
				this.$router.push({name: 'cansaiDetail',path: '/cansaiDetail',query:{id: id}})
				
			},
			// 切换tab
			tabMatch(idx) {
				this.status = idx
				this.currentPage = 1
				if (idx == 0) {
					this.pageSize = 4
					this.statusMatch = -1 // 赛事类型状态
					this.statusSite = '' /// 状态钓场类型
					this.statusNum = '' // 状态人数
					this.statusAddress = '' // 状态地区
					this.is_charge = -1 // 赛事类型
					this.region_id = 0 // 地址id
					this.min_num = 0 // 最小人数
					this.max_num = 0 // 最大人数
					this.type = 0
					this.getMatchList()
				} else {
					this.pageSize = 12
					this.matchVedioList()
				}
			},
			// 赛事筛选地址列表
			getAddressList() {
				this.$axios.get(this.$common.match_data_list, {
					params: {

					}
				}).then(res => {
					if (res.data.status == 1) {
						this.address_list = res.data.data.address_list
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 切换赛事类型
			matchTab(idx) {
				this.statusMatch = idx
				this.is_charge = idx
				this.currentPage = 1
				this.getMatchList()
			},
			// 切换钓场类型
			typeTab(idx) {
				this.statusSite = idx
				this.type = idx
				this.currentPage = 1
				this.getMatchList()
			},
			// 切换参赛人数
			numTab(idx) {
				this.statusNum = idx
				if (idx == 1) {
					this.min_num = 0 // 最小人数
					this.max_num = 20 // 最大人数
				} else if (idx == 2) {
					this.min_num = 21
					this.max_num = 50
				} else if (idx == 3) {
					this.min_num = 51
					this.max_num = 100
				} else {
					this.min_num = 100
					this.max_num = 0
				}
				this.currentPage = 1
				this.getMatchList()
			},
			// 切换地址
			addressTab(idx) {
				this.statusAddress = idx
				this.region_id = idx
				this.currentPage = 1
				this.getMatchList()
			},
			// 比赛列表
			getMatchList() {
				this.$axios.get(this.$common.index_matchs_list, {
					params: {
						is_rec: 0, //是否推荐 0-不推荐 1-推荐	
						type: this.type, //	1-协会 2-钓场 0-默认	
						module_id: '', //协会ID 钓场ID 0-默认	 --》 举办方
						is_charge: this.is_charge, //	0-不收费 1-收费 默认-1-->赛事类型	
						min_num: this.min_num, //参赛人数 小 0-默认	
						max_num: this.max_num, //参赛人数 大 0-默认	
						region_id: this.region_id, //	地址ID 0-默认	
						name: '', //	搜索	
						sort: '', //	0-默认 1-最新	
						pageNo: this.currentPage, //1	
						pageSize: this.pageSize, //	是	6
					}
				}).then(res => {
					console.log(res)
					// debugger
					if (res.data.status == 1) {
						this.matchList = res.data.data.page.list
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
					}
				}).catch(err => {
					console.log(err, ' err')
				})
			},
			// 分页
			changeCurrent(page) {
				this.currentPage = page
				if (this.status == 0) {
					this.getMatchList()
				} else {
					this.matchVedioList()
				}
			},
			vedioTab(id) {
				this.statusVedio = id
				this.matchVedioList(id)
			},
			// 赛事视频列表
			matchVedioList(id) {
				this.$axios.get(this.$common.match_vedios_list, {
					params: {
						classify_id: id,
						pageNo: this.currentPage,
						pageSize: this.pageSize
					}
				}).then(res => {
					console.log(res)
					if (res.data.status == 1) {
						this.classify_list = res.data.data.classify_list
						this.matchList = res.data.data.page.list
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			}
		}
	}
</script>

<style scoped>
	.onMatch {
		color: #1765FF !important
	}
	.tab .on{
		color: white !important;
	}
</style>
