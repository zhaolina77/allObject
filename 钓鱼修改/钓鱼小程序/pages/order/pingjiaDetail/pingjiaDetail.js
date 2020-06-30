var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodId: 10,
    orderId: 80,
    token: '',
    evaluate:{}

  },

  init() {
    wx.request({
      url: config.checkGoodEvaluate_url,
      data: {
        goodId: vm.data.goodId,
        orderId: vm.data.orderId,
        token: vm.data.token
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        vm.setData({
          evaluate:res.data.data.evaluate
        })
        // console.log(res.data.data.evaluate.pictures)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var goodId = options.goodId;
    var  orderId=options. orderId;
    var token = wx.getStorageSync('token');
    vm.setData({
      goodId: goodId,
      orderId: orderId,
      token: token
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})