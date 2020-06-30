var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
Page({

    /**
     * 页面的初始数据
     */
    data: {
      inid:6,
      meid:63,
      token:'',
      type:''


    },
    init(){
      wx.request({
        url: config.message_detail_url,
        data: {
          token: vm.data.token,
          infor_id: vm.data.inid,
          me_id: vm.data.meid

        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          WxParse.wxParse('article', 'html', res.data.data.informations.content, vm, 5)  
          
        },
      })
    },
    getSf(){
      wx.request({
        url: config.identity_url,
        data: {
          token:vm.data.token
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          if(res.data.data.type==0){
            wx.showToast({
              title: '请先完成个人认证',
              icon: 'none'
            })
          } else if (res.data.data.type == 1){
            wx.navigateTo({
              url: '../personal/personal',
            })
          }else{
            wx.navigateTo({
              url: '../company/company',
            })
          }
        },
      })
    },
    canhui(){
      if (!vm.data.token) {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }, 1000)
        return;
      }else{
        vm.getSf();
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      var inid = options.inid;
      var meid = options.meid;
      var token = wx.getStorageSync("token");
      vm.setData({
        inid: inid,
        meid: meid,
        token: token
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})