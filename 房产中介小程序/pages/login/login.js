var common = require("../../common.js");
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({


  data: {
    canIuse: wx.canIUse('button.open-type.getUserInfo'),
    open: "true",
    pid: '0'
  },

  bindGetUserInfo: function (e) {
    console.log(JSON.stringify(e));
    wx.showLoading({
      title: '加载中...',
    })
    if (e.detail.userInfo) {
      wx.getUserInfo({
        success: function (ret) {
          console.log(ret);
          wx.login({
            success: function (res) {
              console.log(res)
              if (res.code) {
                wx.request({
                  url: config.wxMiNiProgramLogin_url,
                  data: {
                    "code": res.code,
                    "rawData": ret.rawData,
                    "signature": ret.signature
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  success: function (info) {
                    console.log(info);                                        
                    if (info.data.data.bindingPhoneStatus === true) {                            
                      wx.setStorageSync('token', info.data.data.token)
                      wx.setStorageSync('accountType', info.data.data.accountType)
                      wx.navigateBack({
                        delta: 1,
                      })
                      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                      let prevPage = pages[pages.length - 2];
                      prevPage.onLoad()

                    }else{
                      wx.navigateTo({
                        url: '/pages/userinfo/userinfo?token=' + info.data.data.token + '&accountType=' + info.data.data.accountType,
                      })
                    }

                  }
                })
              }

            }

          })

        }
      })


    } else {
      wx.hideLoading()
      console.log('拒绝');
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
            vm.setData({
              open: false
            })
          }
        }
      })

    }

  },

  onLoad: function (options) {
    vm = this;
    vm.setData({
      pid: options.pid != undefined ? options.pid : 0
    })
    if (options) {
      var token1 = options.token
      wx.setStorageSync('token1', token1)
    }
  },
})