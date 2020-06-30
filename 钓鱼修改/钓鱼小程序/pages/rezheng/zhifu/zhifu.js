var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      price: '',
      type: '',
      id: '',
      payType: 1,

    },
    pay() {
      
      wx.request({
        url: config.authen_wxpay_url,
        data: {
          token: vm.data.token,
          authen_id: vm.data.id,
          type: vm.data.type
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function (ret) {
          console.log(ret);
          if (ret.data.status == 1) {
            vm.wxpay(ret);
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
    wxpay(ret){
      wx.requestPayment({
        timeStamp: ret.data.data.sortedMap['timeStamp'],
        nonceStr: ret.data.data.sortedMap['nonceStr'],
        package: ret.data.data.sortedMap['package'],
        signType: ret.data.data.sortedMap['signType'],
        paySign: ret.data.data.sortedMap['paySign'],
        success: function (res) {
          wx.showModal({
            title: '支付成功',
            content: '',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1  // 返回上一级页面。
            })
          }, 1000)
        },
        fail: function (res) {
          console.log(res);
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm =this;
      vm.setData({
        id: options.authen_id,
        type: options.type,
        price: options.price,
        token:wx.getStorageSync('token')
      })

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