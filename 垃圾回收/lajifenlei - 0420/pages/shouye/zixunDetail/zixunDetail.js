// pages/shouye/zixunDetail/zixunDetail.js
var common = require("../../../common.js");
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
var config = common.getconfig();
var vm = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,
    content:""

  },


  detail(){
      wx.request({
        url: config.activityDetails_url,
        data: {
          id:vm.data.id
        },
        success: (res) => {
          console.log(res)
          if(res.data.status==1){
            WxParse.wxParse('article', 'html', res.data.activity.content, vm, 5)  
              vm.setData({
                content:res.data.activity.content
              })
          }
        },
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var id=options.id;
    vm.setData({
      id:id
    })

    vm.detail();



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