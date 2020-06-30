// pages/my/refund/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    type:0,
    pageNo:1,
    pageSize:10,
    list:[],
    totalPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
    this.getdata()
  },
  getdata: function () {
    var that = this;
    wx.request({
      url: config.refundAfter_url, //仅为示例，并非真实的接口地址
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
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        that.setData({ 
          'list': that.data.list.concat(res.data.data.page.list),
          'totalPage': res.data.data.page.totalPage
          })
        console.log(res)
      }
    })
  },
  tab: function (event) {
    var that = this;
    var idx = event.currentTarget.dataset.idx;
    this.setData({
      type: idx,
      list: [],
      pageNo: 1
    });
    this.getdata();

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
    console.log(89898989)
    wx.showLoading({
      title: '数据加载中',
    })
    this.setData({
      list: [],
      pageNo: 1
    })
    this.getdata()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pageNo < this.data.totalPage) {
      var page = this.data.pageNo + 1;
      console.log(5)
      this.setData({
        pageNo: page
      })
      this.getdata();
    }
    else {
      wx.showToast({
        title: '然后就没有然后了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  torefunddetails: function (event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../refunddetails/index?id=' + id + '&type=' + this.data.type,
    })
  }
})