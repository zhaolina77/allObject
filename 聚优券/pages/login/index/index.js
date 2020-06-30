var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },
  phone(e) {
    vm.setData({
      phone: e.detail.value
    })
  },
  password(e) {
    vm.setData({
      password: e.detail.value
    })
  },
  login() {
    console.log(12232333);
    if(vm.data.phone==''){
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
      })
      return
    }
    if(vm.data.password==''){
      wx.showToast({
        title: '请输入登录密码',
        icon: 'none',
      })
      return
    }
    wx.request({
      url: config.login_url,
      data: {
        phone: vm.data.phone,
        password: vm.data.password
      },
      header: {
        contentType: "application/json;charset=UTF-8",
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if(res.data.code==1){
          wx.setStorageSync('token', res.data.data.token)
          wx.navigateBack({
            delta: 1,
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
        
      },
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;

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