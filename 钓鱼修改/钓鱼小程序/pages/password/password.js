var common = require("../../common.js");
var WxParse = require("../../wxParse/wxParse.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      tel: '',
      type: '',
      inviter_id:0,
      open_id:''
    },
    submitCode(e) {   //点击提交
    console.log(e);
      if (e.detail.value.password==''){
        wx.showToast({
          title: '请输入密码',
          icon: "none"
        })
        return;
      }
      if (e.detail.value.password != e.detail.value.re_password) {
        wx.showToast({
          title: '俩次输入的密码不一致',
          icon: "none"
        })
        return;
      }
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(e.detail.value.password))) {
        wx.showToast({
          title: '密码长度要大于6位，由数字和字母组成',
          icon: "none"
        })
        return
      }
      wx.request({
        url: config.auth_url,
        data: {
          phone: vm.data.phone,
          password: e.detail.value.password
        },
        success(res) {
          if (res) {
            if(res.data.status){
              wx.setStorageSync('token', res.data.token);
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 2000,
              })
              setTimeout(function () {
                wx.reLaunch({
                  url: '/pages/index/index/index',
                })
              }, 2000)
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              })
            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      vm.setData({
        phone: options.phone
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

    }
})