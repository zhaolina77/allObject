var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";

Page({

    /**
     * 页面的初始数据
     */
    data: {
      type: 1
    },
    rz(){
      if (vm.data.type == 4) {
        wx.navigateTo({
          url: '/pages/rezheng/renzhengTj/renzhengTj',
        })
      } else if (vm.data.type == 1) {
        wx.navigateTo({
          url: '/pages/rezheng/personalAuth/personalAuth',
        })
      } else if (vm.data.type == 2) {
        wx.navigateTo({
          url: '/pages/rezheng/xhAuth/xhAuth',
        })
      } else if (vm.data.type == 3) {
        wx.navigateTo({
          url: '/pages/rezheng/dcAuth/dcAuth',
        })
      } else if (vm.data.type == 5) {
        wx.navigateTo({
          url: '/pages/rezheng/otherAuth/otherAuth',
        })
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      WxParse.wxParse('article', 'html', app.globalData.content, vm, 5),
      vm.setData({
        type:options.type
      })
      if (options.type==4) {
        wx.setNavigationBarTitle({
          title: '商家认证'
        })
      } else if (options.type==1) {
        wx.setNavigationBarTitle({
          title: '个人认证'
        })
      } else if (options.type==2) {
        wx.setNavigationBarTitle({
          title: '协会认证'
        })
      } else if (options.type==3) {
        wx.setNavigationBarTitle({
          title: '钓场认证'
        })
      } else if (options.type==5) {
        wx.setNavigationBarTitle({
          title: '单位认证'
        })
      }
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