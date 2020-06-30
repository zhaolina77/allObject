// pages/cart/buy/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync('token'),
    id: '',
    specId: '',
    count: 1,
    address: '',
    cartList: [],
    totalNum:'',
    totalPrice:'',
    caddress: '',
    clubId: '',
    show: false,
    have:0,
    list: [],
    coupon_id:'',
    coupon_money:0

  },
  changeaddress: function () {
    wx.navigateTo({
      url: '../../my/address/index?froms=buy',
    })
  },
  getcaddress: function () {
    if (!this.data.address){
        
        wx.showToast({
          title: '请先选择收货地址',
          icon:'none'
        })

        return false;
    }
    wx.navigateTo({
      url: '../../my/caddress/index?province=' + this.data.address.province + '&city=' + this.data.address.city,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.cartId;
    this.setData({ id: id });
    this.setData({
      token: wx.getStorageSync('token'),
    })
    this.getdata();
    this.getcoupon();
  },
  getdata: function () {
    var that = this;
    wx.request({
      url: config.cartSubmit_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        cartId: this.data.id
      },
      success(res) {
        that.setData({
          'cartList': res.data.data.cartList,
          'address': res.data.data.address,
          'totalNum': res.data.data.totalNum,
          'totalPrice': res.data.data.totalPrice,
          have: res.data.have

        })
        console.log(res)
      }
    })
  },
  choose: function () {
    this.setData({
      show: true
    })
  },
  onClose: function () {
    this.setData({
      show: false
    })
  },
  gotconpun: function (event) {
    var id = event.currentTarget.dataset.id;
    var money = event.currentTarget.dataset.money;
    this.setData({
      coupon_id: id,
      coupon_money: money
    })
    this.onClose();
  },
  getcoupon: function () {
    var that = this;
    wx.request({
      url: config.myCouponList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        type: 0,
        pageNo: 1,
        pageSize: 1000
      },
      success(res) {
        that.setData({ 'list': res.data.page.list })
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
  buynow:function(){
    if (!this.data.address){
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return false;
    }
    if (this.data.clubId=='') {
      wx.showToast({
        title: '请选择俱乐部地址',
        icon: 'none'
      })
      return false;
    }
    var that = this;
    wx.request({
      url: config.cartWxAppletBuy_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        cart_id: this.data.id,
        address_id: this.data.address.id,
        clubId: this.data.clubId,
        coupon_id: this.data.coupon_id
      },
      success(res) {
          if(res.data.status==1){
            console.log(res)
            wx.requestPayment({
              timeStamp: res.data.data.sortedMap.timeStamp,
              nonceStr: res.data.data.sortedMap.nonceStr,
              package: res.data.data.sortedMap.package,
              signType: 'MD5',
              paySign: res.data.data.sortedMap.paySign,
              success(res) {
                if (res.errMsg == 'requestPayment:ok') {  //支付成功

                  wx.showToast({
                    title: '支付成功',
                  })
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '../../my/order/index',
                    })
                  }, 1000)
                }
              },
              fail(res) {
                if (res.errMsg == 'requestPayment:fail cancel') {  //支付失败
                  wx.showToast({
                    title: '取消支付',
                    icon: 'none'
                  })
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '../../my/order/index',
                    })
                  }, 1000)
                }
              }
            })
            console.log(res)
          }
          else {
            wx.showToast({
              title: res.data.msg,
            })
          }
      }
    })
  }
})