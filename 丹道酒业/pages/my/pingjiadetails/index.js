// pages/my/pingjiadetails/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    goodsId:'',
    token:wx.getStorageSync('token'),
    goods_name: '',
    goods_num: 0,
    thumb: '',
    spec_name: '',
    goods_price: '',
    evaluate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
    var item=JSON.parse(options.item);
    console.log(item)
    this.setData({
      orderId: item.order_id,
      goodsId: item.goods_id,
      goods_name: item.goods_name,
      goods_num: item.goods_num,
      thumb: item.thumb,
      spec_name: item.spec_name,
      goods_price: item.goods_price

    })
    this.getdata();
  },
  getdata:function(){

    var that = this;
    wx.request({
      url: config.checkEvaluate_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        orderId: this.data.orderId,
        goodsId: this.data.goodsId
      },
      success(res) {
        that.setData({ 'evaluate': res.data.data.evaluate })
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