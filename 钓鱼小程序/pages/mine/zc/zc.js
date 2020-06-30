var common = require("../../../common.js");
var WxParse = require("../../../wxParse/wxParse.js");
var config = common.getconfig();
var vm = null;
var article = "";
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:''
    },
    init() {
      wx.request({
        url: config.policy_url,
        data: {

        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          console.log(ret)
          if (ret.data.status == 1) {
            content: WxParse.wxParse('article', 'html', ret.data.data.privacy.content, vm, 5)
          } else {
            wx.showToast({
              title: ret.data.msg,
              icon: "none",
              duration: 1000,
            })
          }
        }
      })
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