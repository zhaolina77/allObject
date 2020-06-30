// pages/xiehui/xiehui/xiehui.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      associationList:[]

    },
  init(){
    wx.request({
      url: config.association_list_url,
      data: {
        name:"",
        pageNo:1,
        pageSize:10
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        vm.setData({
          associationList:res.data.data.page.list

        })
      },
    })
  },
  tiaozhuan(e){
    console.log(e);
    wx.navigateTo({
      url: "../xiehuiDetail/xiehuiDetail?id=" + e.currentTarget.dataset.id + '&type=2',
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm=this;
      this.init();
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