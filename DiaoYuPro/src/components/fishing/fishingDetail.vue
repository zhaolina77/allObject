<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap fishing-detail">
			<!--简介-->
			<div class="bg-white jianjie clearfix">
				<div class="pic fl">
					<img :src="angling_site.thumb" preview='2'/>
				</div>
				<div class="text">
					<div class="ellipsis font-bd font-size-30 margin-t hover">{{angling_site.name}}</div>
					<div class="text-orange border-b" style="padding: 10px 0;display: flex;align-items: center;">
						<span>
							{{angling_site.type_name_list ? angling_site.type_name_list.join('/' ) : ''}}
						</span>
						<span>
							<span v-if="isColl == 1" @click="shopCollect(angling_site.id)">
								<img class="margin-t10 collect" src="../../assets/images/sc.png"/>
							</span>
							<span v-else>
								<img class="margin-t10 collect" src="../../assets/images/sc-on.png" @click="shopCollect(angling_site.id)" />
							</span>
						</span>
					</div>

					<div class="text-grayer">
						<div class="" style="margin-top: 15px;">
							{{angling_site.addresss}}
							<span class="text-black font-bd" @click="map(angling_site.lat,angling_site.lon)">
								<img src="../../assets/images/dw.png" style="width: 15px;vertical-align: middle;margin-left: 20px;">
								<span style="vertical-align: middle;">查看地图</span>
							</span>
						</div>
						<div class="" style="margin-top: 15px;">介绍：{{angling_site.content}}</div>
						<div class="" style="margin-top: 15px;">陕西省电话：{{angling_site.mobile}}</div>
						<div class="" style="margin-top: 15px;">鱼种：{{angling_site.fish}}</div>
						<div class="" style="margin-top: 15px;">收费：{{angling_site.price}}元/{{angling_site.charging_standard_name}}</div>
					</div>
				</div>
			</div>

			<!--详情-->
			<div class="bg-white detail">
				<div class="public-title border-b clearfix">
					<span class="font-size-24 font-bd">钓场赛事</span>
				</div>

				<!--协会赛事-->
				<div class="bisai-list">

					<ul v-if="matchs">
						<li class="clearfix">
							<div class="pic fl">
								<img :src="matchs.pic" />
							</div>
							<div class="text">
								<div class="ellipsis font-bd font-size-22 margin-t hover">{{matchs.name}}</div>
								<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/rl.png" />
									{{matchs.open_time}}</div>
								<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/zb.png" />{{matchs.address}}</div>
								<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/ry.png" />{{matchs.num}}</div>
							</div>
						</li>
					</ul>
					<div v-else class="text-center" style="font-size: 18px;line-height: 94px;">暂无赛事</div>
				</div>

			</div>

			<!--评价-->
			<div class="bg-white public-pingjia">
				<!--头部的筛选-->
				<div class="border-b public-title">
					<span class="font-size-24 font-bd">用户评价({{commentNum}})</span>
				</div>

				<ul class="inner" v-if="comment.length != 0">
					<li class="border-b clearfix" v-for="item in comment">
						<div class="info clearfix">
							<div class="head-pic">
								<img :src="item.head_portrait" />
							</div>
							<div class="pingfen">
								<div class="ellipsis font-size-16 name">{{item.nick_name}}</div>
							</div>
						</div>
						<div class="pingjia">
							<div class="nr">{{item.content}}</div>
							<div class="clearfix">
								<div class="pic" v-for="vo in item.pic"><img :src="vo" preview='3'/></div>
							</div>
							<div class="text-grayer font-size-12 time">{{item.comment_time}}</div>
							<!--商家回复-->
							 <div class="sjgf" v-if="item.reply_list.length>0">
								<div class="text-orange" v-for="vs in item.reply_list">
									<div class="">商家回复：</div>
									<div class="nr">{{vs.content}}</div>
									<!--<div class="text-grayer font-size-12 time">2天前</div>-->
								</div>
							</div> 
						</div>
					</li>
				</ul>
				<div v-else class="text-center" style="font-size: 18px;line-height: 94px;">暂无评价信息</div>
				<!--分页-->
				<div id="wr-page" class="page-out bg-white" v-if="comment.length != 0">
					<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="currentPage"
					 @current-change="changeCurrent">
					</el-pagination>
				</div>
			</div>




		</div>
	</div>

</template>

<script>
	export default {
		name: 'fishingDetail',
		data() {
			return {
				token: sessionStorage.getItem('token'),
				id: '',
				angling_site: '', // 钓场详情
				matchs: '', // 钓场赛事
				comment: [], // 钓场评价
				commentNum: 0, // 评价数量
				currentPage: 1,
				pageSize: 10,
				total: 0,
				isColl: 0, // 是否收藏
			}
		},
		created() {
			if (this.$route.query) {
				this.id = this.$route.query.id
			}
			
		},
		mounted() {
			this.getSiteDetail()
			this.$previewRefresh()
			
		},
		methods: {
			map(lat,lon){
				this.$router.push({name: 'maps', path: '/maps', query:{lat:lat,lon:lon}})
			},
			getSiteDetail() {
				this.$axios.get(this.$common.site_angling_site_detail, {
					params: {
						token: this.token,
						id: this.id, // 钓场id
						pageNo: this.currentPage, //
						pageSize: this.pageSize //
					}
				}).then(res => {
					console.log(res)
					if (res.data.status == 1) {
						this.angling_site = res.data.data.angling_site
						this.isColl = res.data.data.angling_site.isColl
						if (res.data.data.matchs && res.data.data.matchs != null) {
							this.matchs = res.data.data.matchs
						}
						this.comment = res.data.data.page.list
						this.commentNum = res.data.data.page.totalRow
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
					}
				}).catch(err => {

				})
			},
			changeCurrent(page) {
				this.currentPage = page
				this.getSiteDetail()
			},
			// 钓场收藏
			shopCollect(id){
				this.$axios.get(this.$common.site_angling_site_coll,{
					params:{
						id: id, // 钓场id
						token: this.token, //
					}
				}).then( res => {
					if (res.data.status == 1) {
						this.$message({
							message: res.data.msg,
							type: 'success',
							offset: 100
						})
						this.isColl = !this.isColl
						console.log(this.isColl, 'this.isColl')
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning',
							offset: 100
						})
					}
				}).catch( err => {
					console.log(err,'err==')
				})
			}
		}
	}
</script>

<style scoped>
	.collect{
		width: 30px;
		height: 30px;
		margin-left: 10px;
	}
</style>
