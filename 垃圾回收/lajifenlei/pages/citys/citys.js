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
    },
    type:''
  },
  init(){
    wx.request({
      url: config.indexCity_url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {     
      },
      success: ret => {
        console.log(ret);
        vm.setData({
          city: ret.data.data.agencyList
        })
      },
    })
  },

  onLoad(option) {
    vm = this;
    vm.setData({
      token:wx.getStorageSync('token'),
    })
    vm.init()

  },
  bindtap(e) {
      console.log(e);
      wx.setStorageSync('cityName', e.detail.name);
      wx.setStorageSync('city_id', e.detail.id);
      wx.setStorageSync('city_lon', e.detail.longitude);
      wx.setStorageSync('city_lat', e.detail.latitude);

      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

      let prevPage = pages[pages.length - 2];

      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        cityName: e.detail.name,
        city_id: e.detail.id,
        lon:  e.detail.longitude,
        lat: e.detail.latitude,
      })
      prevPage.ProductList();
      wx.navigateBack({

        delta: 1  // 返回上一级页面。
      })
  },

})