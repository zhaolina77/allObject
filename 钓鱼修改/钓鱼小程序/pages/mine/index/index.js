var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:'',
      account:''
    },
    fb(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/mine/myFabu/myFabu',
      })
    },
    colls(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/mine/myCollection/myCollection',
      })
    },
    ss(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/mine/quan/quan',
      })
    },
    login(){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
    gz(){
      if(!vm.data.token){
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/mine/myGuanzhu/myGuanzhu?type=2',
      })
    },
    sest(){
      if(!vm.data.token){
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/set/index/index',
      })
    },
    rz(){
      if(!vm.data.token){
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/rezheng/onindex/onindex',
      })
    },
    about(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/mine/aboutUs/aboutUs',
      })
    },
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
    init(){
      wx.request({
        url: config.my_url,
        data: {
          token: vm.data.token
        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          console.log(ret)
          if (ret.data.status == 1) {
            vm.setData({
              account: ret.data.data.account
            })
          } else {
            wx.showToast({
              title: ret.data.msg,
              icon: "none",
              duration: 1000,
            })
          }
        }
      })
    },
    is_open(){
      wx.request({
        url: config.is_exhibition_url,
        data: {
          token: vm.data.token
        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          if (ret.data.status == 1) {
            wx.setStorageSync('is_open', ret.data.data.is_exhibition)
            wx.setStorageSync('type', ret.data.data.type)
          } else {
            wx.showToast({
              title: ret.data.msg,
              icon: "none",
              duration: 1000,
            })
          }
        }
      })
    },
    enter(){
      wx.navigateTo({
        url: '/pages/set/personalData/personalData?type=1',
      })
    },
    address(){
      if(!vm.data.token){

        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '../address/address',
      })
    },
    order(e){
      // console.log(e.currentTarget.dataset.index)
      
      if(!vm.data.token){
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/order/myOrder/myOrder?status='+e.currentTarget.dataset.index,
      })
    },
    pingjia(){
      if(!vm.data.token){
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/order/pingjiaZx/pingjiaZx',
      })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm =this;
      vm.setData({
        token:wx.getStorageSync('token')
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
      vm.init();
      vm.is_open();
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