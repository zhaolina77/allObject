var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:0,
    bannersList:[],
    type:0

  },
  jinjian(){
    if(!wx.getStorageSync('token')){
      wx.navigateTo({
        url: '/pages/login/index/index',
      })
      return
    }
    vm.setData({
      show:1
    })
  },
  close(){
    vm.setData({
      show:0
    })
  },
  start(){
    // wx.showLoading({
    //   title: 'title',
    // })
    wx.navigateTo({
      url: '/pages/business/jinjian/jinjian',
    })
  },
  guanli(){
    if(!wx.getStorageSync('token')){
      wx.navigateTo({
        url: '/pages/login/index/index',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/business/jinjianGl/jinjianGl',
    })
  },
  init(){
    wx.request({
      url: config.bannerList_url,
      data: {
      },
      header: {
        contentType: "application/json;charset=UTF-8",
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if(res.data.code==1){
          vm.setData({
            list:res.data.data.bannersList
          })
        
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
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
    if(wx.getStorageSync('token')){
      vm.setData({
        type:1
      })
    }

  },
  exit(){
    wx.showModal({
      title: '退出',
      content: '确认退出登录？',
      success (res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.showToast({
            title: '退出成功',
            icon: 'none',
          })
          vm.setData({
            type:0
          })
        } else if (res.cancel) {

          
        }
      }
    })

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