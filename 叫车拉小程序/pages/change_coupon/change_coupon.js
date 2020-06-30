// pages/my/coupon/index.js
var common = require("../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    type: 0,
    pageNo: 1,
    pageSize: 10,
    totalPage: 0,
    idx:'',
    state:'',
    list: []
  },
  selectCoupon(e){
    var index = e.currentTarget.dataset.index;
    console.log(vm.data.idx);
    console.log(index);
    
    if (vm.data.idx!=index+1){
      
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

      let prevPage = pages[pages.length - 2];
    console.log(11111111);
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        coupon: vm.data.list[index],
        couponPrice: vm.data.list[index].price,
        idx: index+1
      })
      wx.navigateBack({
        delta: 1  // 返回上一级页面。
      })
    }else{
      console.log(12323);
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

      let prevPage = pages[pages.length - 2];

      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        coupon: [],
        couponPrice: '',
        idx: 0
      })
      wx.navigateBack({
        delta: 1  // 返回上一级页面。
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token');
    console.log(options);
    vm.setData({
      'token': token,
      state: options.state,
      idx:options.idx?options.idx:-1
    })
    vm.getcoupon()
  },
  getcoupon: function () {
    wx.request({
      url: config.myCouponList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: vm.data.token,
        status: vm.data.type,
        pageNo: vm.data.pageNo,
        pageSize: vm.data.pageSize
      },
      success(res) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        console.log(res)
        vm.setData({
          'list': vm.data.list.concat(res.data.data.page.list),
          'totalPage': res.data.data.page.totalPage
        })
        console.log(res)
      }
    })
  },
  tab: function (event) {
    var idx = event.currentTarget.dataset.idx;
    vm.setData({
      type: idx,
      list: [],
      pageNo: 1
    });
    vm.getcoupon();

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(89898989)
    wx.showLoading({
      title: '数据加载中',
    })
    vm.setData({
      list: [],
      pageNo: 1
    })
    vm.getcoupon()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    // 隐藏导航栏加载框
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.pageNo < vm.data.totalPage) {
      var page = vm.data.pageNo + 1;
      console.log(5)
      vm.setData({
        pageNo: page
      })
      vm.getcoupon();
    }
    else {
      wx.showToast({
        title: '然后就没有然后了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})