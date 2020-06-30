var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:''


  },
  init(){
    wx.request({
      url: config.memberCenter_url,//会员中心
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res,'会员中心');
        if(res.data.status==1){
          WxParse.wxParse('article', 'html', res.data.data.content, vm, 5)
        }
      },
    });
  },

  onShareAppMessage: function (res) {
    var vm = this;
    return {
      title: '邀请好友',
      path: '/pages/index/index/index?token='+vm.data.token,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var token=wx.getStorageSync('token')
    vm.setData({
      token:token
    })
   vm.init()

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
})