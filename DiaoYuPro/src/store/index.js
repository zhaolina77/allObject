import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
	showFooter: true,
	count: 0, // 要设置的初始属性值
}
const store = new Vuex.Store({
	state
})
export default store;