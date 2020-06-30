var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:'',
      account: '',
      list: [],
      state: '',
      authen_id: '',
      data: [],
      type: ''
    },
    init() {
      wx.request({
        url: config.authen_url,
        data: {
          token: vm.data.token
        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          if (ret.data.status == 1) {
            vm.setData({
              account: ret.data.data.account,
              state:ret.data.data.state,
              data : ret.data.data.authen_type,
              authen_id : ret.data.data.authen_id,
              type : ret.data.data.type
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
      wx.request({
        url: config.authen_type_list_url,
        data: {
          token: vm.data.token
        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          if (ret.data.status == 1) {
              vm.setData({
                list: ret.data.data.authen_type_list
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
    people_auth: function () {
      wx.navigateTo({
        url: '/pages/rezheng/rz/rz?type=1',
      })
    },
    company_auth: function () {
      wx.navigateTo({
        url: '/pages/rezheng/rz/rz?type=2',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      vm.setData({
        token: wx.getStorageSync('token')
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