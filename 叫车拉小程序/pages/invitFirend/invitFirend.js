var common = require("../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    data:''
  },
  init(){
    wx.request({
      url: config.accountShare_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: vm.data.token
      },

      success(res) {
        vm.setData({
          data: res.data.data
        })
        console.log(res)

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm =this;
    vm.setData({
      token :wx.getStorageSync('token')
    })
    vm.init();
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

  onShareAppMessage: function () {
    console.log(vm.data.data.account_id)
    return {
      title: '叫车拉小程序',
      path: '/pages/login/login?pid=' + vm.data.data.account_id,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
})