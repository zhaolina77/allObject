// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import $ from 'jquery'
import store from './store'; // 引入store
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/public.css'
import './assets/css/style.css'
import './assets/css/swiper-4.3.3.min.css'
import './assets/js/adsbygoogle.js'
import './assets/js/jquery.min.js'
import './assets/js/jquery.qrcode.min.js'
import './assets/js/pace.min.js'
import './assets/js/swiper-4.3.3.min.js'
import './assets/js/adsbygoogle.js'
import axios from 'axios'
import common from './assets/utils/common'

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//地图插件
import AMap from 'vue-amap';
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
	// 高德key
	key: 'aa55709ae6d2b461815b97e5437bc3aa',
	// 插件集合 （插件按需引入）
	plugin: ['AMap.Geolocation']
});

//查看图片
import preview from 'vue-photo-preview'
  import 'vue-photo-preview/dist/skin.css'
  Vue.use(preview)


Vue.prototype.$common = common
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	$,
	components: {
		App
	},
	template: '<App/>'
})