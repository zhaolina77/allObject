var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    pageNo: 1,
    pageSize: 8,
    distance: 0,
    sales: 0,
    list: [],
    totalRow: 0,
    bannerList: [],
    index: 0

  },
  // banner图
  banner() {
    wx.request({
      url: config.banners_url,
      data: {
        module_id: 3
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function (res) {
        // console.log(res);
        vm.setData({
          bannerList: res.data.data.banner_list
        })
      },
    });
  },
  // 获取当前经纬度
  location() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
        vm.init();
      }

    })
  },
  init() {
    wx.request({
      url: config.shopList_url,
      data: {
        longitude: vm.data.longitude,
        latitude: vm.data.latitude,
        pageNo: vm.data.pageNo,
        pageSize: 8,
        distance: vm.data.distance,
        sales: vm.data.sales
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        setTimeout(function(){
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          },1500);
        vm.setData({
          totalRow: res.data.data.page.totalRow,
          list: vm.data.list.concat(res.data.data.page.list)
        })
      },
    })

  },

  enter(e) {
    wx.navigateTo({
      url: '/pages/shop/shangjia/shangjia?id=' + e.currentTarget.dataset.id,
    })
  },
  change(e) {
    var index = e.currentTarget.dataset.index;
    vm.setData({
      index: index,
      list: [],
      pageNo: 1
    })
    if (index == 0) {
      vm.setData({
        distance: 0,
        sales: 0,
      })
    }
    if (index == 1) {
      vm.setData({
        distance: 1,
        sales: 0,
      })
    }
    if (index == 2) {
      vm.setData({
        distance: 0,
        sales: 1,
      })
    }
    vm.init();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.banner();
    vm.location();
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
      list: [],
      pageNo: 1
    })
  vm.init()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.list.length) {
      return;
    }
    ++vm.data.pageNo;
    vm.init();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})