// pages/my/addressadd/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:[],
    token: wx.getStorageSync('token'),
    name:'',
    mobile:'',
    fullAddress:'',
    addressInfo:'',
    isDefault:0,
    province:'',
    city:'',
    district:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getphone:function(e){
    this.setData({
      mobile: e.detail.value
    })
    this.setData({
      token: wx.getStorageSync('token'),
    })
  },
  getname:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  getfulladdress:function(e){
    this.setData({
      addressInfo: e.detail.value
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      fullAddress: e.detail.value[0] + e.detail.value[1] + e.detail.value[2],
      province: e.detail.value[0],
      city: e.detail.value[1],
      district: e.detail.value[2]
    })
  },
  submit:function(){
    console.log(this.data.name)
    console.log(this.data.mobile)
    console.log(this.data.fullAddress)
    console.log(this.data.addressInfo)
    console.log(this.data.isDefault)
    if (this.data.addressInfo == '') {
      wx.showToast({
        title: '请选择收货地区',
        icon: 'none'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
      return false;
    }
    if (this.data.fullAddress == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
      return false;
    }
    if (this.data.name == '') {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
      return false;
    }
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请输入收货人手机号',
        icon: 'none'
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
      return false;
    }

    var that = this;
    wx.request({
      url: config.addAddress_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        name: this.data.name,
        mobile: this.data.mobile,
        fullAddress: this.data.fullAddress,
        addressInfo: this.data.addressInfo,
        isDefault: this.data.isDefault,
        province: this.data.province,
        city: this.data.city,
        district: this.data.district
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        if (res.data.status == 1) {
      //    that.onClose();
          wx.navigateBack({
            delta: 1
          })
        }

      }
    })





    
  }
})