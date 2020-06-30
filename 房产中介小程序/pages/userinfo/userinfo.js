// pages/mine/userinfo/userinfo.js
var common = require("../../common.js");
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    appid: 'wxf8b731460952e24c',
    accountType:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token=options.token
    vm.setData({
      token:token,
      accountType: options.accountType
    })
  },
  getPhoneNumber(e) {
    console.log(e)
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
    wx.showLoading()
    var vm = this;
    wx.login({
      success: (res) => {
        console.log(res,'获取手机号')
        wx.request({
          url: config.biography_url,
          data: {
            code: res.code
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            token: vm.data.token
          },
          method: "POST",
          success: (ret) => {
            console.log(ret)
            var pc = new WXBizDataCrypt(vm.data.appid,ret.data.data);
            var data = pc.decryptData(e.detail.encryptedData,e.detail.iv);
            var phone = data.phoneNumber;
            console.log(phone);

            wx.request({
              url: config.bindingPhone_url,
              data: {
                phone: phone                
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
                token: vm.data.token
              },
              method: "POST",
              success: (result) => {
                console.log(result)
                if (result.data.code == 1) {
                  wx.showToast({
                    title: result.data.msg,
                    icon: 'none',
                  })
                  wx.setStorageSync('token', vm.data.token)
                  wx.setStorageSync('accountType', vm.data.accountType)
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 2 // 返回上一级页面。
                    })
                  }, 500)
                } else {
                  wx.showToast({
                    title: result.data.msg,
                    icon: 'none',
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1 // 返回上一级页面。
                    })
                    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

                    let prevPage = pages[pages.length - 2];

                    prevPage.onLoad()
                  }, 500)
                }

              },
            })
          },
        })
      },
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