// pages/mine/aboutUs/aboutUs.js
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
    list:"",
    jianjie:{},
    shijian:{},
    dianhua:{},
    gongzhong:{},
    youxiang:{}
  },

 about() {
    wx.request({
      url: config.aboutUs_url,
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          WxParse.wxParse('article', 'html', res.data.list[0].answer, vm, 5) 
          WxParse.wxParse('article1', 'html', res.data.list[1].answer, vm, 5) 
          WxParse.wxParse('article2', 'html', res.data.list[2].answer, vm, 5) 
          WxParse.wxParse('article3', 'html', res.data.list[3].answer, vm, 5) 
          WxParse.wxParse('article4', 'html', res.data.list[4].answer, vm, 5) 
          vm.setData({
            list:res.data.list,
            jianjie:res.data.list[0],
            shijian:res.data.list[2],
            dianhua:res.data.list[1],
            gongzhong:res.data.list[3],
            youxiang:res.data.list[4],
          })
        }
      },
    });
  },
  phone(){
    console.log('55555555')
      wx.makePhoneCall({
        phoneNumber: vm.data.dianhua.answer
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    vm=this;
    vm.about();

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