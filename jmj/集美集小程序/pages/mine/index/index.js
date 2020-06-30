// pages/mine/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    data:'',
    totalMoney:''
  },
  init() {
    wx.request({
        url: config.persionData_url, //个人信息
        data: {
            token: vm.data.token,
        },
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: (res) => {
            console.log(res, '个人信息')
            if (res.data.status == 1) {
                vm.setData({
                    data: res.data.data,
                    
                })
            }
        },
    });
    wx.request({
      url: config.sameMonthCommission_url, //本月的佣金
      data: {
        token: vm.data.token,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '本月的佣金');
        if (res.data.status == 1) {
          vm.setData({
            totalMoney:res.data.data.totalMoney
          })
        }
      },
    });
},
  login(){
    wx.navigateTo({
      url: '/pages/login/login/login',
    })
  },
  personal(){
    wx.navigateTo({
      url: '/pages/mine/personal/personal',
    })
  },
  // 商品订单
  order(e){
    console.log(e.currentTarget.dataset.index)
    var idx=e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/order/index/index?status='+idx,
    })
  },
  // 会员中心
  huiyuan(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/yongjin/huiyuan/huiyuan',
    })
  },
  // 邀请好友
  yaoqing(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/yongjin/yaoqing/yaoqing',
    })
  },
  // 佣金
  yongjin(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/yongjin/index/index',
    })
  },
  // 我的主页
  zhuye(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/myFabu/myFabu',
    })
  },
   // 我的优惠券
   youhui(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/youhuiquan/youhuiquan',
    })
  },
  // 我的收藏
  shoucang(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/myCollection/myCollection',
    })
  },
  // 我的地址
  address(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/address/address',
    })
  },
  // 意见反馈
  yijian(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/mine/yijian/yijian',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    

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
    var token=wx.getStorageSync('token')
    vm.setData({
      token:token
    })
  
    vm.init()
    // var sta = wx.getStorageSync('status')
    // if(sta==0){
    //   wx.setTabBarItem({
    //     index: 1,
    //     text: '分类'
    //   })
    // }else{
    //   wx.setTabBarItem({
    //     index: 1,
    //     text: '单购'
    //   })
    // }

    config.status();

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