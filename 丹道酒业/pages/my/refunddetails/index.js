// pages/my/orderdetials/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    type:'',
    id: '',
    address: '',
    goodsList: '',
    order: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
    this.setData({
      id: options.id,
      type: options.type
    })
    this.getdata();
  },
  getdata: function () {
    var that = this;
    console.log(this.data.id)
    wx.request({
      url: config.orderDetails_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        id: this.data.id
      },
      success(res) {
        that.setData({
          'address': res.data.data.address,
          'goodsList': res.data.data.goodsList,
          'order': res.data.data.order
        })
        console.log(res)
      }
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