// pages/my/wallet/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      token:wx.getStorageSync('token'),
      type:0,
      totalMoney:0,
      date:'',
      list:[],
      count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
      var date=new Date();
      var year=date.getFullYear();
      var month=date.getMonth()+1;
    month = month > 9 ? month : '0' + month;
    this.setData({
      date: year+'-'+month
    })
    console.log(month)
    console.log(this.data.date)
      this.getdata();
    this.getcommissionList();
  },
  getcommissionList:function(){
    this.setData({
      type:0
    })
    var that = this;
    wx.request({
      url: config.commissionList, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token
      },

      success(res) {
        that.setData({
          'count': res.data.data.totalMoney,
          'list': res.data.data.commissionList.list

        })
         console.log(res)

        //  WxParse.wxParse('content', 'html', res.data.inviteInfo, that, 5);
      }
    })
  },
  getdata:function(){
    var that = this;
    wx.request({
      url: config.myMoney_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
          token:this.data.token
      },

      success(res) {
        that.setData({
          'totalMoney': res.data.totalMoney

        })

      //  WxParse.wxParse('content', 'html', res.data.inviteInfo, that, 5);
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
  tixian:function(){
    this.setData({
      type: 1
    })
    var that = this;
    wx.request({
      url: config.putMoneyList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        date:this.data.date
      },

      success(res) {
        that.setData({
          'list': res.data.data.putMoneyList.list,
          'count': res.data.data.totalMoney

        })
         console.log(res)

        //  WxParse.wxParse('content', 'html', res.data.inviteInfo, that, 5);
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  totixian:function(){
    wx.navigateTo({
      url: '../tixian/index?wallet=' + this.data.totalMoney,
    })
  },
  bindDateChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      list:[]
    })
    if(this.data.type==0){
      this.getcommissionList();
    }
    else {
      this.tixian();
    }
  }
})