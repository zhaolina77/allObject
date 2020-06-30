// pages/information/information/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: [],
    classify_list: [],
    nav: 0,
    id: 0,
    token: '',
    pageNo: 1,
    totalRow: 0,
    list: [],

  },
  // 轮播图
  banner() {
    wx.request({
      url: config.banners_url,
      data: {
        module_id: 5
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function(res) {
        console.log(res);
        vm.setData({
          bannerList: res.data.data.banner_list
        })
      },
    });
  },
  // 资讯列表
  init() {

    wx.request({
      url: config.pick_list_url,

      data: {
        token: vm.data.token,
        pageNo: vm.data.pageNo,
        pageSize: 8,
        classify_id: vm.data.id
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function(res) {

        console.log(res);
        setTimeout(function(){
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          },1500);
        vm.setData({
          totalRow: res.data.data.page.totalRow,
          list: vm.data.list.concat(res.data.data.page.list),
          classify_list: res.data.data.classify_list
        })

      },
    })
  },
  change(e){
    var index=e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    // console.log(index);
    vm.setData({
      id: e.currentTarget.dataset.id,
      nav: e.currentTarget.dataset.index,
      list: [],
      pageNo:1
    })
    vm.init();

  },
  tiaozhuan(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
    vm.setData({
      token: wx.getStorageSync('token')
    })
    vm.banner();
    vm.init();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
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
  onReachBottom: function() {
    console.log(vm.data.totalRow)
    if (vm.data.totalRow == vm.data.list.length) {
      return;
    }
    ++vm.data.pageNo;
    vm.init();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})