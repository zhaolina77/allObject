var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    pageNo: 1,
    list: [],
    totleRow:0

  },
  init() {
    wx.request({
      url: config.my_black_url,
      data: {
        token: vm.data.token,
        pageNo: vm.data.pageNo,
        pageSize: 8
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        vm.setData({
          totleRow:res.data.data.page.totleRow,
          list:vm.data.list.concat(res.data.data.page.list)
        })
      },
    })
  },
  jiechu(e){
    wx.request({
      url: config.black_url,
      data: {
        token:vm.data.token,
        id:e.currentTarget.dataset.id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        vm.setData({
          list:[],
          pageNo:1
        })
          wx.showToast({
            
            title:res.data.msg,
            icon: 'none',
          })
          vm.init();
        
        
      },
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
    if(vm.data.totleRow==vm.data.list.length){
      return;
    }
    ++vm.data.pageNo;
    vm.init();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})