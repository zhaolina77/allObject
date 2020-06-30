var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accout:"",
    token:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    vm.setData({
      token:wx.getStorageSync('token')
    })
    console.log(vm.data.token)
    if(!vm.data.token){
        return
    }else{
      vm.account();
    }

    
  },

  allOrder(e){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/mine/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/order/order/order?index='+e.currentTarget.dataset.index,
    })
  },
// 意见
  yijian(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/mine/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '../yijian/yijian',
    })
  },

  login(){
    wx.navigateTo({
      url: '/pages/mine/login/login',
    })

  },


  // 关于我们
  aboutus(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/mine/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  center(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/mine/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '../center/center',
    })
  },
  address(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/mine/login/login?type=1',
      })
      return;
    }
    wx.navigateTo({
      url: '../address/address',
    })
  },

  account(){
    
    wx.request({
      url: config.account_url,
      data: {
        token:vm.data.token
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
           vm.setData({
            account:res.data.account
           })
            console.log(vm.data.account)
        }
      },
    });
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
    vm.setData({
      token:wx.getStorageSync('token')
    })
    vm.account()

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