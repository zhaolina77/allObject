var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      prefectureId: '',
      pageNo: 1,
      totalRow: 0,
      list: [],
      pic:''
    },
    init(){
      wx.request({
        url: config.goodsList_url,
        data: {
          prefectureId: vm.data.prefectureId,
          pageNo: vm.data.pageNo,
          pageSize: 6,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          setTimeout(function(){
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            },1500);
          vm.setData({
            totalRow: res.data.data.page.totalRow,
            list: vm.data.list.concat(res.data.data.page.list)
          })
        },
      })


    },
    enter(e){
        wx.navigateTo({
          url: '../shopDetail/shopDetail?id='+e.currentTarget.dataset.id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm=this;
      var id=options.id;
      var pic=options.pic;
      console.log(pic)
      vm.setData({
        prefectureId:id,
         pic:options.pic
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
    vm.init()
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();

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