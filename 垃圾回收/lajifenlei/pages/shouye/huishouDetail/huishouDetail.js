// pages/shouye/huishouDetail/huishouDetail.js

var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    id:2,
    order:{},
    productDetail:{},
    service:{},
    lat:'',
    lon:'',
    cg:0,
    content:""
  },
  xieyi(e){
    var content=e.currentTarget.dataset.content
    wx.navigateTo({
      url: '/pages/mine/xieyi/xieyi?content='+content,
    })
  },
 detail() {
    wx.request({
      url:config.productDetails_url,
      data: {
        token:vm.data.token,
        id:vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          WxParse.wxParse('article', 'html', res.data.data.order.content, vm, 5)  
          vm.setData({
            order:res.data.data.order,
            productDetail:res.data.data.productDetail,
            service:res.data.data.service,
            content:res.data.data.order.content,
            lat:res.data.data.productDetail.latitude,
            lon:res.data.data.productDetail.longitude
          })
        }
        console.log(vm.data.lat,vm.data.lon)
      },
    });
  },
  address(e){
    console.log(e)
        wx.openLocation({
          latitude:Number(vm.data.lat) ,
          longitude:Number(vm.data.lon),
          scale:16,
          name:vm.data.productDetail.full_address,
          address:vm.data.productDetail.address_info
        })
  },
  call:function(e){  //联系
    wx.makePhoneCall({
      phoneNumber: vm.data.productDetail.mobile //仅为示例，并非真实的电话号码
    })
  },
  jiedan(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/mine/login/login',
      })
      return;
    }
    wx.request({
      url:config.takeOrder_url,
      data: {
        token:vm.data.token,
          id:vm.data.id,
      },
       header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        console.log(res)
        if(res.data.status==1){
          vm.setData({
            cg:1
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    })  
  },


  qd(){
    
    vm.setData({
      cg:0
    })
    app.globalData.isSaveRecord = 1
    app.globalData.ordertype = 1
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/order/order/order?index=2',
      })
    },500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var id=options.id
    console.log(id)
    vm.setData({
      token: wx.getStorageSync('token'),
      id:id
    })
    vm.detail();
  
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