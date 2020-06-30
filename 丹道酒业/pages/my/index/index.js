// pages/my/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    account:'',
    orderNum:'',
    totalMoney:0,
    customerService:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    this.setData({
      token: token
    })
    this.getinfo();
    this.getshouyi();
    this.getphone();
  },
  getinfo:function(){
    var that = this;
    wx.request({
      url: config.personData_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        token:this.data.token
      },
      success(res) {
        that.setData({
           'account': res.data.data.account,
           'orderNum': res.data.data.orderNum

         })
        console.log(res)
      }
    })
  },
  getphone:function(){
    var that = this;
    wx.request({
      url: config.myphone_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token
      },
      success(res) {
        that.setData({
          // 'account': res.data.data.account,
          // 'orderNum': res.data.data.orderNum
          customerService: res.data.customerService

        })
        console.log(res)
      }
    })
  },
  getshouyi: function () {
    var that = this;
    wx.request({
      url: config.commissionByMonth_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token
      },
      success(res) {
        that.setData({
          'totalMoney': res.data.data.totalMoney

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

  },
  toinvit:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../orcode/index?head=' + this.data.account.head + '&name=' + this.data.account.nick_name + '&rcode=' + this.data.account.code_url
    })
  },
  tomember:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../member/index?head=' + this.data.account.head + '&level=' + this.data.account.level
    })
  },
  tocoupon:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../coupon/index'
    })
  },
  toaddress:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../address/index'
    })
  },
  togonglue:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../gonglue/index'
    })
  },
  toabout:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../about/index'
    })
  },
  towallet:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../wallet/index'
    })
  },
  toorder:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../order/index',
    })
  },
  topingjia:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../pingjia/index',
    })
  },
  torefund:function(){
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: '../refund/index',
    })
  }
})