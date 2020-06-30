<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap cansei-detail">
			<!--简介-->
			<div class="bg-white jianjie clearfix">
				<div class="pic fl">
					<img :src="matchs.pic" preview='0'/>
				</div>
				<div class="text">
					<div class="ellipsis-2 font-bd font-size-30 margin-t hover" style="margin-bottom: 30px;">{{matchs.name}}</div>
					<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/rl.png" /> {{matchs.create_date}}</div>
					<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/zb.png" />{{matchs.address}}</div>
					<div class="font-size-16 ellipsis margin-t text-grayer"><img class="icon" src="../../assets/images/ry.png" />{{matchs.already_num}}/{{matchs.num}}</div>
					<div class="btn" @click="signUp(matchs.id,matchs.is_charge,matchs.price)">
						立即报名参赛
					</div>
				</div>
			</div>

			<!--详情-->
			<div class="bg-white detail">
				<div class="tab border-b clearfix">
					<div class="item font-size-16 fl " :class="{on: status == 1}" @click="tabMatch(1)">赛事详情</div>
					<div class="item font-size-16 fl" :class="{on: status == 2}" @click="tabMatch(2)">赛事流程</div>
					<div class="item font-size-16 fl" :class="{on: status == 3}" @click="tabMatch(3)">基础信息</div>
				</div>
				<div class="inner" v-if="status == 1">
					<div class="font-bd font-size-30">{{matchs.name}}</div>
					<div class="text-grayer" style="margin: 15px 0 50px;"><span class="text-theme" style="margin-right: 20px;">{{matchs.address}}</span>{{matchs.create_date}}</div>
					<div class="" v-html="matchs.match_detail">

					</div>
				</div>
				<div class="inner" v-if="status == 2">
					<div class="" v-html="matchs.match_process">

					</div>
				</div>
				<div class="inner" v-if="status == 3">
					<ul class="proLi">
						<li>
							<span class="process">举办单位</span><span class="proCon">{{matchs.module_name}}</span>
						</li>
						<li>
							<span class="process">赛事名称</span><span class="proCon">{{matchs.name}}</span>
						</li>
						<li>
							<span class="process">报名截止日期</span><span class="proCon">{{matchs.open_time}}</span>
						</li>
						<li>
							<span class="process">比赛地址</span><span class="proCon">{{matchs.address}}</span>
						</li>
						<li>
							<span class="process">比赛人数</span><span class="proCon">{{matchs.already_num}}</span>
						</li>
						<li>
							<span class="process">参赛要求</span><span class="proCon">{{matchs.require}}</span>
						</li>
					</ul>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'cansaiDetail',
		data() {
			return {
				token: '',
				id: '', // 赛事id
				matchs: '',
				status: 1, // tab状态
			}
		},
		created() {
			this.token = sessionStorage.getItem('token')
			if(this.$route.query) {
				this.id = this.$route.query.id
			}
			this.getCansaiDatail()
			this.$previewRefresh()
		},
		mounted() {
			
		},
		methods: {
			// 切换tab
			tabMatch(idx) {
				this.status = idx
			},
			// 获取赛事详情
			getCansaiDatail() {
				this.$axios.get(this.$common.match_matchs_detail, {
					params: {
						id: this.id
					}
				}).then(res => {
					console.log(res)
					if(res.data.status == 1) {
						this.matchs = res.data.data.matchs
					}
				}).catch(err => {
					console.log(err, 'err')
				})
			},
			// 立即报名参赛
			signUp(id, is_charge, price) {
				console.log(this.token)
				if(!this.token) {
					this.$message({
							message: '请登录/注册',
							type: 'warning',
							offset: 150
						});
				}else{
					this.$router.push({
					name: 'cansai',
					path: 'cansai',
					query: {
						id: id,
						is_charge: is_charge,
						price: price
					}
				})
					
				}
				
			},
		},
	}
</script>

<style>
	.process {
		font-size: 16px;
		color: rgb(34, 34, 34);
		font-weight: 700;
	}
	
	.proCon {
		font-size: 16px;
	}
	
	.proLi li {
		border-bottom: 1px solid #eee;
		line-height: 50px;
		display: flex;
		justify-content: space-between;
	}
</style>