var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    contacts_name: '',
    contacts_mobile: '',
    id_card: ''

  },
  //联系人姓名
  user(e) {
    vm.setData({
      contacts_name: e.detail.value
    })
  },
  //联系人身份证号
  personid(e) {
    vm.setData({
      id_card: e.detail.value
    })
  },
  //联系方式
  phone(e) {
    vm.setData({
      contacts_mobile: e.detail.value
    })
  },
  submit() {
    var mobile_res = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/;
    var card = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (vm.data.id_card.length == 0 || vm.data.id_card.match(/^[ ]*$/)) {
      wx.showToast({
        title: '身份证号不能为空',
        icon: 'none'
      })
      return
    }
    if (vm.data.contacts_mobile.length == 0 || vm.data.contacts_mobile.match(/^[ ]*$/)) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      return
    }
    if (!card.test(vm.data.id_card)) {
      wx.showToast({
        title: '请输入正确的身份证号',
        icon: 'none'
      })
      return
    }
    if (!mobile_res.test(vm.data.contacts_mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: config.personal_join_url,
      data: {
        token: vm.data.token,
        contacts_name: vm.data.contacts_name,
        contacts_mobile: vm.data.contacts_mobile,
        id_card: vm.data.id_card
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 2 // 返回上一级页面。
            })
          }, 1000);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    vm.setData({
      token: token
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

  }
})