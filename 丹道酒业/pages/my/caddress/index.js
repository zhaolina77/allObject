// pages/my/address/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    token: '',
    province:'',
    city:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
    this.setData({
      province: options.province,
      city: options.city
    })
    this.getaddress()
  },
  gotaddress:function(event){
    var item = event.currentTarget.dataset.item;
    console.log(item)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      caddress: item.province + item.city + item.district + item.address,
      clubId: item.id,
    });


    wx.navigateBack({
      delta: 1
    })
  },
  getaddress: function () {
    var that = this;
    wx.request({
      url: config.clubList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        province: this.data.province,
        city: this.data.city
      },
      success(res) {
        that.setData({ 'list': res.data.clubList })
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
    this.getaddress();
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
  toadd: function () {
    wx.navigateTo({
      url: '../addressadd/index'
    })
  },
  toedit: function (e) {

    console.log(e)
    var str = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../addressedit/index?jsonStr=' + str
    })
  },
  todel: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: config.addressDel_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: e.currentTarget.dataset.id
      },
      success(res) {
        console.log(res)
        if (res.data.status == 1) {
          that.getaddress();
        }
      }
    })
  }
})