// pages/my/tixian/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:wx.getStorageSync('token'),
    wallet:0,
    money:10,
    id:0,
    img:'',
    pname:'',
    carnumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
      this.setData({
        wallet: options.wallet
      })
  },
  getmoney:function(e){
    this.setData({
      money: e.detail.value
    })
  },
  getall:function(){
      this.setData({
        money:this.data.wallet
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
  tosuccess:function(){
    if (this.data.money==0){
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none'
      })
      return false;
    }
    if (this.data.money > this.data.wallet) {
      wx.showToast({
        title: '余额不足',
        icon: 'none'
      })
      return false;
    }
    if (this.data.money <10) {
      wx.showToast({
        title: '最低提现金额为10',
        icon: 'none'
      })
      return false;
    }
    if (this.data.money % 10 !=0) {
      wx.showToast({
        title: '提现金额为10的整数倍',
        icon: 'none'
      })
      return false;
    }
    var that = this;
    wx.request({
      url: config.immediateWithdrawalSubmit_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        money: this.data.money,
        id: this.data.id
      },
      success(res) {
           wx.showToast({
             title: res.data.msg,
           })
     //   that.setData({ 'list': res.data.data.cardList })
        if (res.data.status==1){
          wx.navigateBack({
            delta: 1
          })
        }
      }
    }) 
    // wx.navigateTo({
    //   url: '../success/index',
    // })
  },
  tobanklist:function(){
    wx.navigateTo({
      url: '../banklist/index',
    })
  }
})