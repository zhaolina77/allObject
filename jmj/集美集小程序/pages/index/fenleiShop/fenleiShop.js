var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:'',
    token: '',
    prefectureId: 1,
    pageNo: 1,
    status: 0,
    prList: [],
    list: [],
    totalRow: 0
  },
  init() {
    wx.request({
      url: config.indexPrefectureList_url, //专区列表
      data: {
        token: vm.data.token
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '专区列表');
        if (res.data.status == 1) {
          vm.setData({
            prList: res.data.prList
          })
        }
      },
    });
  },

  lists() {
    wx.request({
      url: config.prefectureGoodsList_url, //专区商品列表
      data: {
        token: vm.data.token,
        prefectureId: vm.data.prefectureId,
        status: vm.data.status,
        pageNo: vm.data.pageNo,
        pageSize: 8,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '专区商品列表');
        if (res.data.status == 1) {
          var timerTem =setTimeout(function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 1500);
          vm.setData({
            list: vm.data.list.concat(res.data.page.list),
            totalRow: res.data.page.totalRow,
            timer: timerTem
          })
        }
      },
    });
  },
  detail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop/shopDetail/shopDetail?id=' + id,
    })
  },
  changOne(e) {
    var id = e.currentTarget.dataset.id
    vm.setData({
      status: 0,
      pageNo: 1,
      list: [],
      prefectureId: id
    })

    vm.lists();
  },
  changTwo(e) {
    vm.setData({
      pageNo: 1,
      list: [],
    })
    var status = e.currentTarget.dataset.idx
    if (status == 2) {
      if (vm.data.status == 2) {
        vm.setData({
          status: 3
        })
      } else {
        vm.setData({
          status: 2
        })
      }
    } else {
      vm.setData({
        status: status
      })
    }

    vm.lists()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var id = options.id
    console.log(id)
    vm.setData({
      token: token,
      prefectureId: id
    })
    vm.init();
    vm.lists();



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
    clearInterval(this.data.timer);

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
    vm.lists();
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
    vm.lists();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})