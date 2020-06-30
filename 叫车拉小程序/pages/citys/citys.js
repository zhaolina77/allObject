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
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: {
        token: vm.data.token,        
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
      type:option.type
    })
    vm.init()

  },
  bindtap(e) {
    console.log(e.detail)
    if(vm.data.type){
      wx.setStorageSync('cityName', e.detail.name);
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

      let prevPage = pages[pages.length - 2];

      //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

        city: e.detail.name,

        lat: e.detail.latitude,

        lon: e.detail.longitude,

      })

      prevPage.city_init();

      //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。


      //最后就是返回上一个页面。

      wx.navigateBack({

        delta: 1  // 返回上一级页面。
      })
    }else{
      wx.setStorageSync('cityName', e.detail.name);
      wx.navigateBack({

        delta: 1  // 返回上一级页面。
      })

      
    }
  },

})