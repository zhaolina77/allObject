// pages/club/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    pics:'',
    show:false,
    name:'',
    phone:'',
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    this.setData({
      token:token
    })
    this.getbanner();
  },

  getbanner: function () {
    var that = this;
    wx.request({
      url: config.posterImg_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({ 'pics': res.data.data.pics })
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
   onClose() {
     console.log(88888888)
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },
  opensheect: function () {
    this.setData({ show: true });
  },
  getname:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  getphone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  getaddress:function(e){
    this.setData({
      address: e.detail.value
    })
  },
  submit:function(){
    if (this.data.name==''){
      wx.showToast({
        title: '请输入真实姓名',
        icon:'none'
      })
      setTimeout(function(){
        wx.hideToast()
      },1000)
    }
    var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的联系方式',
        icon: 'none'
      })
      return false
    }
    if (this.data.address == '') {
      wx.showToast({
        title: '请输入店铺地址',
        icon: 'none'
      })
      return false
    }
    var that = this;
    wx.request({
      url: config.applyClub_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
            token:this.data.token,
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.address
      },
      success(res) {
        wx.showToast({
          title: res.data.msg,
        })
        if (res.data.status==1){
          that.onClose();
        }
      
      }
    })

  }
})