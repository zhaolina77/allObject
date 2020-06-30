var common = require("../../common.js");
var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({


  data: {
    canIuse: wx.canIUse('button.open-type.getUserInfo'),
    open: "true",
    appid: 'wx3fdab7c17255af98',
    openid:'',
    pid:'0',
    token:''

  },
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
    //用户允许授权
    console.log("lv", e.detail.iv);
    console.log(e.detail.encryptedData);
    wx.showLoading()
    var vm = this
    //1. 调用登录接口获取临时登录code
    wx.login({
      success: res => {
        if (res.code) {
          //2. 访问登录凭证校验接口获取session_key、openid
          wx.request({
            // url: "https://api.weixin.qq.com/sns/jscode2session",
            // data: {
            //   'appid': vm.data.appid,
            //   'secret': "4721648cec18924d4aeb159062ffea44",
            //   'js_code': res.code,
            //   'grant_type': "authorization_code"
            // },
            url: config.biography_url,
            data: {
              'js_code': res.code
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (data) {
              console.log(data.data.data.info);
              //if (data.data.status==1) {
                wx.hideLoading()
                var pc = new WXBizDataCrypt(vm.data.appid, data.data.data.info);
                var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
                var phone = data.phoneNumber;
                console.log(phone);
                //3. 解密
                 wx.request({
                   url: config.is_password_url,
                   data: {
                     'phone': phone,
                     'token':vm.data.token,
                     openid: vm.data.openid,
                     pid: vm.data.pid != undefined  ? vm.data.pid : 0,
                     rec:vm.data.rec
                   },
                   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                   header: {
                     'content-type': 'application/json'
                   }, // 设置请求的 header
                   success: function (data2) {
                     wx.hideLoading()
                     if (data2.data.data.is_password==1){
                       wx.setStorageSync('token', data2.data.data.token)
                       wx.reLaunch({
                         url: '/pages/index/index'
                       })
                     }else{
                      
                       wx.navigateTo({
                         url: '/pages/password/password?phone=' + phone
                       })
                     }
                   },
                   fail: function (err) {
                     console.log(err);
                   }
                 })
              //}
            },
            fail: function (err) {
              wx.hideLoading()
              console.log(err);
            }
          })
        }

      }
    })
  },
  onLoad: function (options) {
    vm = this;
    console.log(wx.getStorageSync('token'));
    vm.setData({
      openid: options.open_id,
      rec: app.globalData.rec,
      pid: options.pid != undefined ? options.pid:0,
      token: wx.getStorageSync('token')
    })
    

  },
})