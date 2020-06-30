var common = require('../../common.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:'',
      moble:''
    },
    jump_index(){
      wx.redirectTo({
        url: '/pages/order/order'
      })
    },
    init() {
      wx.request({
        url: config.serviceDetails_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          token: vm.data.token
        },
        success: ret => {
          console.log(ret);
          vm.setData({
            moble:ret.data.dic.score
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      vm.setData({
        token : wx.getStorageSync('token')
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