var common = require('../../../common.js');
var config = common.getconfig();
var vm = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    pageNo: 1,
    status: -2,
    phone: '',
    list: [],
    totalRow: 0
  },
  sta(e) {
    var idx = e.currentTarget.dataset.idx
    vm.setData({
      status: idx,
      start: 1,
      list: []
    })

  },
  mobile(e) {
    vm.setData({
      phone: e.detail.value,
      pageNo: 1,
      list: []
    })
  },
  init() {
    wx.request({
      url: config.accountMessageList_url, //我的消息
      data: {
        start: vm.data.pageNo,
        size: 8,
      },
      header: {
        'content-type': 'application/json',
        token: vm.data.token,
      },
      method: "GET",
      success: (ret) => {
        console.log(ret);
        vm.setData({
          list: vm.data.list.concat(ret.data.data),
          totalRow: ret.data.total
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.setData({
      token: wx.getStorageSync('token')
    })
    vm.init();

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
    vm.init();
    // 显示顶部刷新图标
    setTimeout(function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 1000);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.list.length) {
      return
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