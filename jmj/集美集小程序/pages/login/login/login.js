var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({


  data: {
    canIuse: wx.canIUse('button.open-type.getUserInfo'),
    open: "true",
    pid: '0',
    type: ''
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
                  url: config.authorization_url,
                  data: {
                    "js_code": res.code,
                    "rawData": ret.rawData,
                    "token": wx.getStorageSync('token1')
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  success: function (info) {
                    console.log(info);
                    if (info.data.data.token == '') {
                      wx.showToast({
                        title: '登录失败',
                        icon: 'none',
                        duration: 1500
                      })
                    } else {
                      wx.setStorageSync('status', info.data.data.status)
                      if (info.data.data.is_phone == 0) {
                        if (vm.data.type == 3) {
                          wx.navigateTo({
                            url: '/pages/login/userinfo/userinfo?token=' + info.data.data.token+'&type='+vm.data.type,
                          })
                        } else {
                          wx.navigateTo({
                            url: '/pages/login/userinfo/userinfo?token=' + info.data.data.token,
                          })
                        }
                      } else {
                        wx.setStorageSync('token', info.data.data.token)
                        if (vm.data.type == 3) {
                          wx.navigateBack({
                            delta: 1,
                          })
                        } else {
                          wx.reLaunch({
                            url: '/pages/index/index/index',
                          })

                        }

                      }
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
    var type = options.type
    vm.setData({
      type: type,
      pid: options.pid != undefined ? options.pid : 0
    })
    if (options) {
      var token1 = options.token
      wx.setStorageSync('token1', token1)
    }
  },
})