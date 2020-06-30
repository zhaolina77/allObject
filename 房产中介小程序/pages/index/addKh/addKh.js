var common = require('../../../common.js');
var config = common.getconfig();
var vm = '';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    nick_name:'',
    state:1,
    phone:'',
    list:[]

  },
  phone_data(e){
    vm.setData({
      phone: e.detail.value//将input至与data中的name绑定
    })
  },
  change(e){
    var index = e.currentTarget.dataset.index;
    vm.setData({
      state: index,
    })
  },
  nick_names: function (e) {
    vm.setData({
      nick_name: e.detail.value//将input至与data中的name绑定
    })
  },
  sub(){
    vm = this;
    if (vm.data.nick_name == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: "none"
      })
      return
    }
    if (!(/^1[34578]\d{9}$/.test(vm.data.phone))) {
      wx.showToast({
        title: '手机号不合法',
        icon: "none"
      })
      return
    }
    if (vm.data.phone.length == 0 || vm.data.phone.match(/^[ ]*$/)) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      return
    }
    wx.request({
      url: config.insertClient_url,
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        token: vm.data.token,
      },
      data: {       
        name: vm.data.nick_name,
        phone: vm.data.phone,
        sex:vm.data.state
      },
      success: ret => {
        console.log(ret);
        wx.showToast({
          title: ret.data.msg,
          icon: 'none'
        })
        setTimeout(function () {
     
          wx.redirectTo({
            url: '/pages/index/selectKh/selectKh?type=1',
          })
        }, 500)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.setData({
      token: wx.getStorageSync('token'),
      accountType: wx.getStorageSync('accountType')
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