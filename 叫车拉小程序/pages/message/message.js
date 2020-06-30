// pages/message/message.js
var common = require("../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getdata()
  },

  getdata:function(){
    var that = this;
    wx.request({
      url: config.activityList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
      
      },

      success(res) {
        if (res.data.status==1){

            that.setData({
              list: res.data.data.activityList
                 })
        }
        
        console.log(res)
       
      }
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

  },
  todetail:function(e){
    var str = encodeURIComponent(JSON.stringify(this.data.list[e.currentTarget.dataset.id]))
    wx.navigateTo({
      url: '../mdetails/mdetails?item=' + str,
    })
  }
})