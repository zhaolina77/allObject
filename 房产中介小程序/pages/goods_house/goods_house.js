var common = require("../../common.js");
var config = common.getconfig();
const app = getApp()
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    pageNo:1,
    totalRow:0,
    list:[],
    area_id:'',
    name:''
  },
  shop_search_function(e) {
    console.log(e.detail.value);
    vm.setData({
      name: e.detail.value
    })
  },
  search() {
    console.log()
    vm.setData({
      pageNo: 1,
      list: []
    })
    vm.init()
  },
  init() {
    wx.request({
      url: config.recommendHouse_url, //优选热卖
      data: {
        name:vm.data.name,
        cityId: 1,
        start: vm.data.pageNo,
        size: 8
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (ret) => {
        console.log(ret);
        vm.setData({
          list: vm.data.list.concat(ret.data.data),
          totalRow: ret.data.total
        })
      }
    });
  },

  detail(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type
    app.globalData.id = id;
    if (type == 2) {
      wx.navigateTo({
        url: '/pages/index/fyDetail/fyDetail',
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/fyDetailzu/fyDetailzu',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.setData({
      token: wx.getStorageSync('token'),
      area_id: wx.getStorageSync('area_id'),
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
    wx.showLoading({
      title: '数据加载中',
    })
    vm.setData({
      list: [],
      pageNo: 1
    })
    vm.init();
    // 显示顶部刷新图标
    setTimeout(function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.list.length) {
      return
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