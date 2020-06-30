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
      id:30,
      list:[]

    },
    init(){
      wx.request({
        url: config.pick_detail_url,
        data: {
          id:vm.data.id
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          WxParse.wxParse('article', 'html', res.data.data.pick.content, vm, 5)  
          vm.setData({
            list:res.data.data.pick
          })
        },
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
     var id=options.id;
     vm.setData({
       id:id
     })
      console.log(vm.data.id)
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