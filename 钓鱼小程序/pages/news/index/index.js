var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:"",
      list:[]

    },
    init(){
      wx.request({
        url: config.num_list_url,
        data:{
          token:vm.data.token
        },
        header: {
          'content-type': 'application/json'//get请求头
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          vm.setData({
            list:res.data.data
          })
        },
      })
    },
    // 活动、会议、通知消息
    news(e){
        wx.navigateTo({
          url: '../huodongTz/huodongTz?type='+e.currentTarget.dataset.type,
        })
    },
    // 动态消息
    dongtai(){
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
        wx.navigateTo({
          url: '../dongtai/dongtai',
        })
      }
     

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      var token=wx.getStorageSync("token");
      vm.setData({
        token:token
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