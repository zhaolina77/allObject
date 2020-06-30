import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '../components/index/Index'
import xiehuiIndex from '../components/xiehui/xiehuiIndex.vue'
import matchIndex from '../components/match/matchIndex.vue'
import zixunIndex from '../components/information/zixunIndex.vue'
import informationDetail from '../components/information/informationDetail.vue'
import fishIndex from '../components/fishing/fishIndex.vue'
import maps from '../components/fishing/maps.vue'
import Login from '../components/login/login.vue'
import xiehuiDetail from '../components/index/xiehuiDatail'
import xiehuiDongtai from '../components/xiehui/xiehuiDongtai.vue'
import dongtaiDetail from '../components/xiehui/dongtaiDetail.vue'

// 商品
import shopIndex from '../components/shop/shopIndex.vue'
import shopClassify from '../components/shop/shopClassify'
import shopDetail from '../components/shop/shopDetail.vue'
import order from '../components/shop/orderTj.vue'
import cart from '../components/shop/cart.vue'
import tehui from '../components/shop/tehui.vue' 

// 协会
import cansaiDetail from '../components/xiehui/cansaiDetail.vue'
import cansai from '../components/xiehui/cansai.vue'
// 我的
import mineIndx from '../components/mine/mineIndex.vue'
import address from '../components/mine/address.vue'
import myOrder from '../components/mine/myOrder.vue'
import myMatch from '../components/mine/myMatch.vue'
import myMatchDetail from '../components/mine/myMatchDetail.vue'
import myCollection from '../components/mine/myCollection.vue'
import infor from '../components/mine/infor.vue'
import renzheng from '../components/mine/renzheng.vue'
// 订单
import orderDaifahuo from '../components/mine/orderDaifahuo.vue'
import logisticsInfo from '../components/mine/logisticsInfo.vue'
import applyRefund from '../components/mine/applyRefund.vue'

// 钓场
import fishingDetail from '../components/fishing/fishingDetail.vue'

// 搜索
import serchJg from '../components/index/serchJg.vue'


//用户协议
import xieyi from '../components/login/xieyi.vue'

Vue.use(Router)

export default new Router({
	routes: [
		// {
		// 	path: '/',
		// 	name: 'Login',
		// 	component: Login
		// },
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/serchJg',
			name: 'serchJg',
			component: serchJg
		},
		// 首页协会详情
		{
			path: '/xiehuiDetail',
			name: 'xiehuiDetail',
			component: xiehuiDetail
		},
		
		
		// 协会 ====================
		{
			path: '/xiehui',
			name: 'xiehuiIndex',
			component: xiehuiIndex
		},
		{
			path: '/cansaiDetail',
			name: 'cansaiDetail',
			component: cansaiDetail
		},
		{
			path: '/cansai',
			name: 'cansai',
			component: cansai
		},
		// 协会动态
		{
			path: '/xiehuiDongtai',
			name: 'xiehuiDongtai',
			component: xiehuiDongtai
		},
		// 动态详情
		{
			path:'/dongtaiDetail',
			name: 'dongtaiDetail',
			component: dongtaiDetail
		},
		{
			path: '/match',
			name: 'matchIndex',
			component: matchIndex
		},
		{
			path: '/zixun',
			name: 'zixunIndex',
			component: zixunIndex
		},
		{
			path: '/informationDetail',
			name: 'informationDetail',
			component: informationDetail
		},
		{
			path: '/fish',
			name: 'fishIndex',
			component: fishIndex
		},
		// 商品
		{
			path: '/shop',
			name: 'shopIndex',
			component: shopIndex
		},
		{
			path: '/shopClassify',
			name: 'shopClassify',
			component: shopClassify
		},
		{
			path: '/shopDetail',
			name: 'shopDetail',
			component: shopDetail
		},
		{
			path: '/order',
			name: 'order',
			component: order
		},
		{
			path: '/cart',
			name: 'cart',
			component: cart
		},
		{
			path: '/tehui',
			name: 'tehui',
			component: tehui
		},
		//  我的
		{
			path: '/mine',
			name: 'mineIndx',
			component: mineIndx,
			children: [
				{
					path:'/mine/address',
					name: 'address',
					component: address
				},
				{
					path: '/mine/myOrder',
					name: 'myOrder',
					component: myOrder
				},
				{
					path: '/mine/myMatch',
					name: 'myMatch',
					component: myMatch
				},
				{
					path: '/mine/myMatchDetail',
					name: 'myMatchDetail',
					component: myMatchDetail
				},
				{
					path: '/mine/myCollection',
					name: 'myCollection',
					component: myCollection
				},
				{
					path: '/mine/infor',
					name: 'infor',
					component: infor
				},
				{
					path: '/mine/renzheng',
					name: 'renzheng',
					component: renzheng
				},
			]
		},
		// 订单
		{
			name: 'orderDaifahuo',
			path: '/orderDaifahuo',
			component: orderDaifahuo
		},
		{
			name: 'logisticsInfo',
			path: '/logisticsInfo',
			component: logisticsInfo
		},
		{
			name: 'applyRefund',
			path: '/applyRefund',
			component: applyRefund
		},
		// 钓场
		{
			name: 'fishingDetail',
			path: '/fishingDetail',
			component: fishingDetail
		},
		{
			name: 'maps',
			path: '/maps',
			component: maps
		},
		{
			name: 'xieyi',
			path: '/xieyi',
			component: xieyi
		}
		
	]
})
