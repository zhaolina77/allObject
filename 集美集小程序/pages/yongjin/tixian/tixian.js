var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commission:'',
    jine:'',
    phone:'',
    code:'',
    ite:'',
    codename: '获取验证码',
    dis:0
  },
  bdZhanghu(){
    wx.navigateTo({
      url: '/pages/yongjin/bangdingZh/bangdingZh?type=2',
    })
  },
  init(){
    wx.request({
      url: config.myCommission_url, //我的佣金
      data: {
        token: vm.data.token,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '我的佣金');
        if (res.data.status == 1) {
          vm.setData({
            commission:res.data.data.commission
          })
        }
      },
    });
      wx.request({
        url: config.cardList_url, //我的银行卡列表
        data: {
          token: vm.data.token,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res, '我的银行卡列表');
          
          if (res.data.status == 1) {
            var lis=res.data.data.card_list
            for (let index = 0; index < lis.length; index++) {
              if(lis[index].default_status==0){
                vm.setData({
                  ite:lis[index]
                })
              }
              
            }
            console.log(vm.data.ite)
          }
        },
      });
  
  },

  all(){
    var commission=vm.data.commission
    vm.setData({
      jine:commission
    })
  },
  codeNum(e){
    console.log(e.detail.value)
    vm.setData({
      code:e.detail.value
    })
  },
  jine(e){
    vm.setData({
      jine:e.detail.value
    })
  },
  code(){
    if(vm.data.jine==''){
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none',
      })
      return
    }
    if(vm.data.jine<1){
      wx.showToast({
        title: '提现金额至少为1元',
        icon: 'none',
      })
      return
    }
    vm.setData({
      dis: 0
    })
    wx.request({
      url: config.sendRegCode_url, //验证手机时发送验证码
      data: {
        phone: vm.data.phone,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '验证手机时发送验证码');
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          var num = 60;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              vm.setData({
                codename: '重新发送',
                dis: 0
              })

            } else {
              vm.setData({
                codename: num + "s后重新发送",
                dis:1
              })
            }
          }, 1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });
  },
  sub(){
    if(vm.data.code==''){
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
      })
      return
    }
    console.log(vm.data.jine,vm.data.ite.id,vm.data.code)
    wx.request({
      url: config.immediateWithdrawalSubmit_url, //立即提现提交
      data: {
        token:vm.data.token,
        money:vm.data.jine,
        id:vm.data.ite.id,
        code:vm.data.code
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '立即提现提交');
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          console.log(res.data.data)
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/yongjin/tixianCg/tixianCg?name=' + res.data.data.accountName + '&money=' + res.data.data.money + '&cardNo=' + res.data.data.cardNo + '&card=' + res.data.data.cardNoName,
            })
          },500)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var phone=options.phone
    var token = wx.getStorageSync('token')
    vm.setData({
      phone:phone,
      token: token
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