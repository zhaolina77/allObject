// pages/index/products/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:'',
    pageNumber:1,
    pageSize:4,
    level:0,
    evaluaNum:'',
    list:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'goodsId': options.id
    })
    this.getdata();
  },
  getdata: function () {
    console.log(this.data.goodsId)
    var that = this;
    wx.request({
      url: config.allGoodsCollection_url, //仅为示例，并非真实的接口地址
      data: {
        goodsId: this.data.goodsId,
        pageNumber: this.data.pageNumber,
        pageSize: this.data.pageSize,
        level: this.data.level
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          evaluaNum: res.data.data.evaluaNum,
          totalPage: res.data.data.page.totalPage,
          list: that.data.list.concat(res.data.data.page.list)

        })
        console.log(res);
  
      }
    })
  },
  tab: function (event) {
    var that = this;
    var idx = event.currentTarget.dataset.idx;
    this.setData({
      level: idx,
      pageNumber:1,
      list:[]
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.pageNo)
    console.log(this.data.totalPage)
    if (this.data.pageNumber < this.data.totalPage) {
      var page = this.data.pageNumber + 1;
      console.log(5)
      this.setData({
        pageNumber: page
      })
      this.getdata();
    }
    else {
      wx.showToast({
        title: '然后就没有然后了',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})