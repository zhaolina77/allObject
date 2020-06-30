<template>
	<div class="content">
		<div class="content-top"></div>
		<div class="wrap shop-classify">
			<div class="fenlei-tab bg-white">
				<div class="clearfix font-size-16 tab">
					<div class="fl item text-grayer" :class="{'on cla': status == index}" v-for="(item,index) in classifyOneList" :key="index" @click="getclassfyTwoList(item.id,index)">{{item.name}}</div>
					
				</div>
				<ul class="clearfix font-size-16 text-grayer" v-if="classifyTwoList.length>0">
					<li class="fl" :class="{'on ': statusTwo == index}" v-for="(item,index) in classifyTwoList" :key="index" @click="getGoodsList(index,item.id,1)">{{item.name}}</li>
					
				</ul>
			</div>

			<div class="shop-list">
				<ul class="clearfix">
					<li class="bg-white fl" v-for="(item,index) in shopList" @click="toShopDetail(item.id)">
						<div class="pic">
							<img :src="item.thumb" />
						</div>
						<div class="text">
							<div class="ellipsis-2 font-size-16">{{item.name}} </div>
							<div class="text-orange font-size-12 num" style="justify-content: flex-start;">￥<span class="font-size-30 font-w">{{item.market_price}}</span></div>
						</div>
					</li>
				</ul>

			</div>
			<div id="wr-page" class="page-out bg-white" v-if="shopList.length != 0">
				<el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize" :current-page="currentPage" @current-change="changeCurrent">
				</el-pagination>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'shopClassify',
		data() {
			return {
				classId: '',
				classifyOneList: [],
				classifyTwoList: [],
				statusone: 0,
				statusTwo: 0,
				shopList: [], // 商品list
				total: 0, // 总条目数
				pagesize: 8, // 每页显示条目数
				currentPage: 1, // 当前页数
			}
		},
		created() {
//			this.classId = this.$route.params.classId
//			this.statusone = this.$route.params.index
			this.classId = localStorage.getItem('classId')
			this.statusone = localStorage.getItem('index')
			this.getclassfyTwoList(this.classId, this.statusone);
		},
		mounted() {
		},
		methods: {
			toShopDetail(id) {
				this.$router.push({name: 'shopDetail',path: '/shopDetail',query:{id: id}})
			},
			// 点击更多查看商品的一二级分类
			getclassfyTwoList(classId, index) {
				localStorage.setItem('classId',classId)
				localStorage.setItem('index',index)
				this.shopList=''
				this.status = index
				this.$axios.get(this.$common.shop_classifyList, {
					params: {
						classId: classId
					}
				}).then(res => {
					console.log(res, '商品的一二级分类')
					if(res.data.status == 1) {
						this.classifyOneList = res.data.data.classifyOneList
						this.classifyTwoList = res.data.data.classifyTwoList
						console.log(this.classifyTwoList, 'classifyTwoList')
						this.getGoodsList(0, this.classifyTwoList[0].id, 1)
					}
				}).catch(err => {
//					console.log(err, 'err')
				})
			},
			// 点击二级分类获取商品列表
			getGoodsList(index, secondLevelId, currentPage) {
				this.statusTwo = index
				this.secondLevelId = secondLevelId
				this.$axios.get(this.$common.shop_goodsList, {
					params: {
						shopId: '', // 商铺id
						prefectureId: '', // 专区id
						secondLevelId: secondLevelId, // 二级分类id
						name: '', // 搜索 （商品名称、一二级分类）
						sales: '', // 1:销量
						price: '', // 1:降序 2：升序
						pageNo: currentPage,
						pageSize: this.pagesize
					}
				}).then(res => {
//					console.log(res, '商品列表')
					if(res.data.status == 1) {
						this.shopList = res.data.data.page.list
						this.total = res.data.data.page.totalRow
						this.currentPage = res.data.data.page.pageNumber
					}
				}).catch(err => {

				})
			},
			// 点击当前页触发事件
			changeCurrent(currentPage) {
//				console.log(currentPage, 'currentPage----')
				this.getGoodsList(this.statusTwo, this.secondLevelId, currentPage)
			}
		}
	}
</script>

<style>
	.cla{
		color: white !important;
	}
	.txt{
		color: #1765FF !important;
	}

</style>