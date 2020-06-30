// pages/index/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [

    ],
    areaList: [],
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    youhuiquan: '',
    token: '',
    activityList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var scene = decodeURIComponent(query.scene)
    if (scene.toString() == 'undefined') {

      scene = 0;
    }
    wx.setStorage({
      key: 'pid',
      data: scene,
    })
    this.getbanner();
    var token = wx.getStorageSync('token');
    this.setData({
      'token': token
    })
    this.getgoods();
    this.getcoupon();
    this.getinfo();
  },
  getbanner: function () {
    var that = this;
    wx.request({
      url: config.bannerList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res, 'banner列表')
        that.setData({
          imgUrls: res.data.data.bannerList
        })

      }

    })
  },
  getinfo: function () {
    var that = this;
    wx.request({
      url: config.activityList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res, '活动通知')
        that.setData({
          activityList: res.data.data.activityList
        })

      }
    })
  },
  getcoupon: function () {
    var that = this;
    wx.request({
      url: config.couponImg_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          'youhuiquan': res.data.data.pics
        })

      }
    })
  },
  getgoods: function () {
    console.log(this.data.token)
    var that = this;
    wx.request({
      url: config.areaList_url, //仅为示例，并非真实的接口地址
      data: {
        token: this.data.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        setTimeout(function(){
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          },1500);
          
        that.setData({
          areaList: res.data.data.areaList
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
    wx.showLoading({
      title: '数据加载中',
    })
    this.setData({
      imgUrls:[],
      activityList:[],
      areaList: [],
    })
    this.getinfo()
    this.getgoods()
    this.getbanner()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
  },

  tosearch: function (event) {
    var token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    var value = event.detail.value;
    wx.navigateTo({
      url: '../search/index?keywords=' + value,
    })
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
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  tocoupon: function () {
    var token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '../coupon/index'
    })
  },
  todetails: function (event) {
    var token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '../products/index?id=' + event.currentTarget.dataset.id
    })
  },
  toinfo: function (event) {
    var token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '../info/index?id=' + event.currentTarget.dataset.id
    })
  }
})