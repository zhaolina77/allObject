// pages/my/pingjia/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    token:wx.getStorageSync('token'),
    type:1,
    pageNo:1,
    pageSize:10
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

  getdata:function(){
    var that = this;
    wx.request({
      url: config.getEvaluateList, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        type: this.data.type,
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      },
      success(res) {
        that.setData({
           'goodsList': res.data.data.page.list ,
          'totalPage': res.data.data.page.totalPage
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
    this.getdata();
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

  },
  tab: function (event) {
    var that = this;
    var idx = event.currentTarget.dataset.idx;
    this.setData({
      type: idx
    });
    this.getdata();

  },
  toadd:function(event){
    var item = event.currentTarget.dataset.item;
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../addpingjia/index?item='+item,
    })
  },
  toview: function (event){
    var item = event.currentTarget.dataset.item;
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../pingjiadetails/index?item=' + item,
    })
  }
})