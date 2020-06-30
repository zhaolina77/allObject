var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    type: 0,
    pageNo: 1,
    totleRow: 0,
    list: [],

    status: 3,
    open_type: '' //判断是否认证

  },
  init() {
    wx.request({
      url: config.evaluateList_url,
      data: {
        type: vm.data.type,
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
          totleRow: res.data.data.page.totleRow,
          list: vm.data.list.concat(res.data.data.page.list)
        })
      },
    })

  },
  change(e) {
    var index = e.currentTarget.dataset.index;
    vm.setData({
      list: [],
      type: index,
      pageNo: 1

    })
    console.log(vm.data.type)

    vm.init();
  },
  chakan(e){
    console.log(e)
    wx.navigateTo({
      url: '../pingjiaDetail/pingjiaDetail?orderId='+e.currentTarget.dataset.orderid+'&goodId='+e.currentTarget.dataset.goodid,
    })
  },
  pingjia(e){
    console.log(e)
    if (vm.data.open_type == 0) {
      wx.showToast({
        title: '认证之后才可发布评论',
        icon:'none'
      })
      return;
    }
    wx.navigateTo({
      url: '../pingjia/pingjia?orderId='+e.currentTarget.dataset.orderid+'&goodId='+e.currentTarget.dataset.goodid,
    })
  },
  opentype() {
    wx.request({
      url: config.is_exhibition_url,
      data: {
        token: vm.data.token
      },
      header: {
        "content-type": "application/json"
      },
      method: 'GET',
      success: function(ret) {
        if (ret.data.status == 1) {
          vm.setData({
            open_type: ret.data.data.type
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token');
    vm.setData({
      token: token
    })
    vm.init();
    vm.opentype();

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
    if (vm.data.totalRow == vm.data.list.length) {
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