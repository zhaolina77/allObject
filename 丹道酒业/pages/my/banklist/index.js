// pages/my/banklist/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:wx.getStorageSync('token'),
    type:1,
    list:[]
  },
  getdata:function(){
    var that = this;
    wx.request({
      url: config.cartList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        type: this.data.type
      },
      success(res) {
        console.log(res)
        that.setData({ 'list': res.data.data.returnList })
      }
    }) 
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
  toaddbank:function(){
    wx.navigateTo({
      url: '../addbank/index',
    })
  },
  del:function(event){
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: config.cardDel_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        id: id
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        if (res.data.status == 1) {

          that.getdata();
        }
      }
    }) 
  },
  edit:function(event){
    var item = event.currentTarget.dataset.item;
    item=JSON.stringify(item);
    wx.navigateTo({
      url: '../editbank/index?item='+item,
    })
  },
  gotitem: function (event){
    var item = event.currentTarget.dataset.item;
    console.log(item)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var name = item.open_bank ? item.open_bank : item.name
    prevPage.setData({
      id: item.id,
      img: item.thumb,
      pname: name,
      carnumber: item.card_number
    });


    wx.navigateBack({
      delta: 1
    })
  }
})