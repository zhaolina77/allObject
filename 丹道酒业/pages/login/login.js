var common = require("../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  
  data: {
    canIuse: wx.canIUse('button.open-type.getUserInfo'),
    open:"true",
    pid:''
  },
  
  bindGetUserInfo: function (e) {
    console.log(88888888888)
    console.log(vm.data.pid)
    console.log(88888888888)
    console.log(JSON.stringify(e));
    wx.showLoading({
      title: '加载中...',
    })
    if (e.detail.userInfo){
    wx.getUserInfo({
      success: function (ret) { 
        console.log(ret); 
        wx.login({
          success: function (res) {
            console.log(res.code);
            if (res.code) {
                  wx.request({
                    url: config.authorization_url,
                      data: {
                        "js_code": res.code,
                        "rawData": ret.rawData,
                        pToken:vm.data.pid
                      }, 
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: "POST",
                      success: function (info) {
                        
                          if(info.data.token==''){

                            wx.showToast({
                              title: '登录失败',
                              icon: 'none',
                              duration: 1500
                            })

                          }else{
                            console.log(info)
                            wx.setStorageSync('token', info.data.data.token)
                            if (info.data.data.is_phone==1){
                              wx.reLaunch({
                                url: '/pages/index/index/index'
                              })
                            }else{
                              wx.reLaunch({
                                url: '/pages/index/index/index'
                              })
                            }
                               
                          }
                         
                      }
                  })
               }

            }

        })

      }
    })


    }else{
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
    console.log(99999999999)
    var pid = wx.getStorageSync('pid');
    console.log(pid)
    vm.setData({
      pid: pid
    })
    console.log(pid)
    var token = wx.getStorageSync('token');
    if(token){
      wx.switchTab({
        url: '/pages/index/index/index',
      })
    }
  },
})