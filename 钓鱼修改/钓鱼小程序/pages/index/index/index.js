// pages/index/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    xiehuiBanner: [],
    iconList: [],
    saishiList: [],
    xiehuiList: [],
    onePic: [],
    threePic: [],
    vadioList: "",
    pageNo: 1,
    totalRow: 0
  },
  init() {
    // 轮播图
    wx.request({
      url: config.banners_url,
      data: {
        module_id: 1
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        vm.setData({
          bannerList: res.data.data.banner_list
        })
      },
    });
    //协会banner
    wx.request({
      url: config.banners_url,
      data: {
        module_id: 6
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function (res) {
        // console.log(res);
        vm.setData({
          xiehuiBanner: res.data.data.banner_list
        })
      },
    });
    // 5个图标
    wx.request({
      url: config.icon_list_url,
      method: 'GET',
      success: function (res) {
        // console.log(res)
        vm.setData({
          iconList: res.data.data.icon_list
        })
      },
    });
    // 赛事推荐
    wx.request({
      url: config.matchs_list_url,
      data: '',
      method: 'GET',
      success: function (res) {
        // console.log(res);
        vm.setData({
          saishiList: res.data.data.page.list
        })
      },
    });


  },
  // 更多赛事推荐
  more() {
    wx.navigateTo({
      url: '/pages/saishi/saishi/saishi',
    })
  },
  data_list() {
    // 首页协会动态
    wx.request({
      url: config.home_dynamic_url,
      data: {
        pageSize: 8,
        pageNo: vm.data.pageNo,
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        var data = res.data.data.page.list;
        setTimeout(function (){
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 1500);
        vm.setData({
          xiehuiList: vm.data.xiehuiList.concat(data),
          totalRow: res.data.data.page.totalRow
        })
      },
    })
  },
  // 5个图标跳转
  tiaozhuan(e) {
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        url: '../../xiehui/xiehui/xiehui',
      })
    }
    if (e.currentTarget.dataset.index == 1) {
      wx.navigateTo({
        url: '../../saishi/saishi/saishi',
      })
    }
    if (e.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: '../../diaocahng/diaocahng/diaocahng',
      })
    }
    if (e.currentTarget.dataset.index == 3) {
      wx.navigateTo({
        url: '../business/business',
      })
    }
    if (e.currentTarget.dataset.index == 4) {
      wx.navigateTo({
        url: '../../shop/index/index',
      })
    }
  },
  // 协会动态详情
  jump(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/xiehui/dongtaiDetail/dongtaiDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  // 进入赛事详情
  saishi(e) {
    console.log(e.currentTarget.dataset.id);

    wx.navigateTo({
      url: '/pages/xiehui/jieshao/jieshao?id=' + e.currentTarget.dataset.id,
    })
  },
  // 进入消息列表
  xiaoxi() {
    wx.navigateTo({
      url: '/pages/news/index/index',
    })
  },
  search() {
    wx.navigateTo({
      url: '/pages/search/searchJl/searchJl',
    })
  },
  //搜索

  /**i
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.init();
    vm.data_list();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    wx.showLoading({
      title: '数据加载中',
    })
    vm.setData({
      xiehuiList: [],
      pageNo: 1
    })
    vm.data_list()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.xiehuiList.length) {
      return;
    }
    vm.data.pageNo++;
    vm.data_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})