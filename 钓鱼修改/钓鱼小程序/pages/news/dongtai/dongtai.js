var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:"",
      pageNo:1,
      totalRow:0,
      list:[]
      

    },
    init(){
      wx.request({
        url: config.dynamic_message_list_url,
        data: {
          token:vm.data.token,
          pageNo: vm.data.pageNo,
          pageSize:8

        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          vm.setData({
            totalRow: res.data.data.page.totalRow,
            list:vm.data.list.concat(res.data.data.page.list)
          })
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.init();
        },
      })
    },
    tiaozhuan(e){
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/yuhuobang/dongtai/dongtai?id='+e.currentTarget.dataset.id,
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      var token = wx.getStorageSync("token");
      vm.setData({
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
      if (vm.data.totalRow==vm.data.list.length){
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