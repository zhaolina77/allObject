// pages/xiehui/xiehui/xiehui.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      associationList:[],
      totalRow: 0

    },
  init(){
    wx.request({
      url: config.association_list_url,
      data: {
        name:"",
        pageNo:1,
        pageSize:10
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'post',
      success: function(res) {
        console.log(res)
        setTimeout(function(){
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          },1500);
        vm.setData({
          associationList:vm.data.associationList.concat(res.data.data.page.list),
          totalRow:res.data.data.totalRow
        })
      },
    })
  },
  tiaozhuan(e){
    console.log(e);
    wx.navigateTo({
      url: "../xiehuiDetail/xiehuiDetail?id=" + e.currentTarget.dataset.id + '&type=2',
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm=this;
      this.init();
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
        associationList: [],
        pageNo: 1
      })
    vm.init()
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

      if (vm.data.totalRow == vm.data.associationList.length) {
        return;
      }
      vm.data.pageNo++;
      vm.init();

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})