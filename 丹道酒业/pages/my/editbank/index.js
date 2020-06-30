// pages/my/addbank/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    token: wx.getStorageSync('token'),
    type: 1,
    typename: '银行卡',
    openBank: '',
    openBankName: '请选择',
    cardNumber: '',
    realName: '',
    phone: '',
    show: false,
    pshow: false,
    actions: [

    ],
    pactions: [
      { name: "银行卡", id: 1 },
      { name: "支付宝", id: 2 },
      { name: "微信", id: 3 }
    ]
  },
  getcarnumber: function (e) {
    this.setData({
      cardNumber: e.detail.value
    })
  },
  getname: function (e) {
    this.setData({
      realName: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
    var item = JSON.parse(options.item);
    this.setData({
      id:item.id,
      type:item.type,
      openBankName: item.open_bank,
      openBank: item.cardtypeid,
      cardNumber: item.card_number,
      realName: item.real_name


    })
    this.getcardtype();
  },
  onopenptype: function () {
    this.setData({ pshow: true });
  },
  onopencardtype: function () {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
    this.setData({
      openBank: event.detail.id,
      openBankName: event.detail.name,
    })
  },
  onpClose() {
    this.setData({ pshow: false });
  },

  onpSelect(event) {
    this.setData({
      'typename': event.detail.name,
      'type': event.detail.id
    })
  },
  getcardtype: function () {
    var that = this;
    wx.request({
      url: config.cardTypeList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {

      },
      success(res) {
        that.setData({ 'actions': res.data.data.typeList })
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
  tosuccess: function () {
    if (this.data.type == 1) {
      if (this.data.openBank == '') {
        wx.showToast({
          title: '请选择开户行',
          icon: 'none'
        })
        return false
      }
    }
    if (this.data.cardNumber == '') {
      wx.showToast({
        title: '请填写收款账号',
        icon: 'none'
      })
      return false
    }
    if (this.data.realName == '') {
      wx.showToast({
        title: '请填写真实姓名',
        icon: 'none'
      })
      return false
    }
    wx.request({

      url: config.cardUpdate_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id:this.data.id,
        token: this.data.token,
        type: this.data.type,
        openBank: this.data.openBank,
        cardNumber: this.data.cardNumber,
        realName: this.data.realName

      },
      success(res) {
        wx.showToast({
          title: res.data.msg,
        })
        if (res.data.status == 1) {
          wx.navigateBack({
            delta: 1
          })
        }
        console.log(res)
      }
    })
  }
})