// pages/index/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    token: '',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    this.setData({
      'token': token,
      'name': options.keywords
    })
    this.getgoods();

  },
  getgoods: function () {
    console.log(this.data.token)
    console.log(this.data.name)
    var that = this;
    wx.request({
      url: config.searchGoods_url, //仅为示例，并非真实的接口地址
      data: {
        token: this.data.token,
        name: this.data.name
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          'goodsList': res.data.data.goodsList
        })

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
  tosearch: function (event) {

    var value = event.detail.value;
    this.setData({
      name: value
    })
    this.getgoods();
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

  },
  todetails: function (event) {
    wx.navigateTo({
      url: '../products/index?id=' + event.currentTarget.dataset.id
    })
  }
})