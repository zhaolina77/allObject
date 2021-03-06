// pages/my/invit/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      token:wx.getStorageSync('token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
      this.getdata();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getdata:function(){
    var that = this;
    wx.request({
      url: config.inviteInfo_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
  
      success(res) {
        // that.setData({
        //   'goods': res.data.data.goods,
        //   'address': res.data.data.address

        // })
        console.log(res)
        WxParse.wxParse('content', 'html', res.data.inviteInfo, that, 5);
      }
    })
  },
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
  onvisit:function(){
    this.onShareAppMessage()  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    // if (res.from === 'button') {
    // }
    var that=this;
    return {
      title: '转发',
      path: '/pages/login/login?pid=' + that.data.token,
      success: function (res) {
        console.log('成功', res)
      }
    }
  }
})