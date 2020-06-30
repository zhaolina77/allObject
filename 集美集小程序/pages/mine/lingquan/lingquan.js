var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    pageNo: 1,
    list: []
  },
  init() {
    wx.request({
      url: config.getCouponCenter_url, //领券中心
      data: {
        pageNo: vm.data.pageNo,
        pageSize: 8,
        token:vm.data.token,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '领券中心');
        if (res.data.status == 1) {
          setTimeout(function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 1500);
          var lis = res.data.page.list
          for (let index = 0; index < lis.length; index++) {
            lis[index].end_time = lis[index].end_time.slice(0, 10)
          }
          vm.setData({
            list: vm.data.list.concat(lis),
            totalRow: res.data.page.totalRow
          })
        }
      },
    });
  },
  lingquan(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.request({
      url: config.getCoupon_url, //领取优惠券
      data: {
        token: vm.data.token,
        id: id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          vm.setData({
            pageNo: 1,
            list: []
          })
          setTimeout(function(){
            vm.init()
          },300)
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            list: [],
            pageNo: 1
          })
          prevPage.init()

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }

      },
    });



  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
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
    wx.showLoading({
      title: '数据加载中',
    })
    vm.setData({
      list: [],
      pageNo: 1
    })
    vm.init();
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