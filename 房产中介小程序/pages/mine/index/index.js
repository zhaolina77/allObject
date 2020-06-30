var common = require('../../../common.js');
var config = common.getconfig();
var vm ='';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '', 
    agreementContent:'',
    data:[]
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: vm.data.data.agreementContent,
      success: function (res) {
        console.log("接口调用成功返回的回调")
      },
      fail: function (res) {
        console.log("接口调用失败返回的回调")
      },
      complete: function (res) {
        console.log("接口调用结束的回调函数（调用成功、失败都会执行）")
      }
    })
  },
  //登录
  login(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  init() {
    wx.request({
      url: config.info_url, //优选热卖
      data: {
      },
      header: {
        'content-type': 'application/json',
        token: vm.data.token,
      },
      method: "GET",
      success: (ret) => {
        console.log(ret);
        if(ret.data.code==1){
          wx.setStorageSync('accountType', ret.data.data.accountType)   /** 用户类型 1中介0普通用户 .*/
          vm.setData({
            data: ret.data.data,
          })

        }
       
      }
    });
  },
  //意见建议
  yj() {
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/yijian/yijian',
    })
  }, 

  // 收藏
  coll() {
    if(!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/myCollection/myCollection',
    })
  }, 
// 我的消息
  infor(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/myInformation/myInformation',
    })

  },

  // 关于我们
  about(){
    wx.navigateTo({
      url: '/pages/mine/aboutUs/aboutUs',
    })

  },
  history(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/myJilu/myJilu',
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.setData({
      token : wx.getStorageSync('token')
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
    wx.showLoading({
      title: '数据加载中',
    })
    vm.init();
    setTimeout(function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 1000);

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