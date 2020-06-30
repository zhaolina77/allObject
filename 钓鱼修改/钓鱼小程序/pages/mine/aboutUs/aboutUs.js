var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:'',
      hotline:''
    },
    xieyi(){

    },
    call(){
      wx.makePhoneCall({
        phoneNumber: vm.data.hotline,
        success: function (res) {
          console.log("接口调用成功返回的回调")
        },
        fail: function (res) {
          console.log("接口调用失败返回的回调")
        },
        complete: function (res) {
          console.log("接口调用结束的回调函数（调用成功、失败都会执行）")
        }
      })
    },
    xieyi(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/mine/yinsi/yinsi',
      })
    },
    zc(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/mine/zc/zc',
      })
    },
    init() {
      wx.request({
        url: config.hotline_url,
        data: {

        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          if (ret.data.status == 1) {
            vm.setData({
              hotline: ret.data.data.hotline
            })
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
      vm =this;
      vm.setData({
        token:wx.getStorageSync('token')
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