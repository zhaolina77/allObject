var common = require('../../common.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

  data: {
    city: [],
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: true // 是否开启标题吸顶
    }
  },
  init(){
    wx.request({
      url: config.index_city_url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        token: vm.data.token,        
      },
      success: ret => {
        console.log(ret);
        vm.setData({
          city: ret.data.data
        })
      },
    })
  },

  onLoad() {
    vm = this;
    vm.setData({
      token:wx.getStorageSync('token')
    })
    vm.init()

  },
  bindtap(e) {
    console.log(e.detail)
    wx.setStorageSync('area_id', e.detail.id);
    wx.setStorageSync('area_name', e.detail.name);
    wx.switchTab({
      url: '/pages/index/index/index'
    })
  },

})