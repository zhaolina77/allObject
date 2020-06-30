var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    data:'',
    totalMoney:''

  },
  init(){
    wx.request({
      url: config.immediateWithdrawal_url, //立即提现页面
      data: {
        token: vm.data.token,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '立即提现页面');
        if (res.data.status == 1) {
          vm.setData({
            data:res.data.data
          })
        }
      },
    });
    wx.request({
      url: config.sameMonthCommission_url, //本月的佣金
      data: {
        token: vm.data.token,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '本月的佣金');
        if (res.data.status == 1) {
          vm.setData({
            totalMoney:res.data.data.totalMoney
          })
        }
      },
    });
  },

  yaoqing(){
    wx.navigateTo({
      url: '/pages/yongjin/yaoqing/yaoqing',
    })
  },
  tixian(){
    wx.navigateTo({
      url: '/pages/yongjin/tixian/tixian?phone='+vm.data.data.phone,
    })
  },
  yongjinMx(){
    wx.navigateTo({
      url: '/pages/yongjin/yongjinMx/yongjinMx',
    })
  },
  bangdingZh(){
    wx.navigateTo({
      url: '/pages/yongjin/bangdingZh/bangdingZh',
    })
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    vm.setData({
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