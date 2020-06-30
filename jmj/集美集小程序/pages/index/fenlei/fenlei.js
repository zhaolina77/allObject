var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    classifyId: '',
    categoryList: [],
    pageNo: 1,
    list: [],
    totalRow: 0
  },
  classfy() {
    wx.request({
      url: config.categoryList_url, //分类列表
      data: {
        token: vm.data.token
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '分类列表');
        if (res.data.status == 1) {
          vm.setData({
            categoryList: res.data.categoryList,
            classifyId: res.data.categoryList[0].id
          })
          vm.init();
          if (vm.data.totalRow == vm.data.list.length) {
            return
          }
         

        }
      },
    });
  },
  init() {
    wx.request({
      url: config.categoryGoodsList_url,
      data: {
        token: vm.data.token,
        classifyId: vm.data.classifyId,
        pageNo: vm.data.pageNo,
        pageSize: 8
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        console.log(res, '分类商品列表')
        if (res.data.status == 1) {
          vm.setData({
            list: vm.data.list.concat(res.data.page.list),
            totalRow: res.data.page.totalRow
          })
        }

      },
    })

  },
  change(e) {
    var id = e.currentTarget.dataset.id
    vm.setData({
      list: [],
      pageNo: 1,
      classifyId: id
    })
    vm.init();
  },
  detail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop/shopDetail/shopDetail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请登录',
        icon: "none"
      })
      return
    }
    var token = wx.getStorageSync('token')
    vm.setData({
      pageNo: 1,
      list: [],
      token: token
    })
    vm.classfy()
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
    config.status();
    if (vm.data.token == '') {
      if (wx.getStorageSync('token')) {
        this.setData({
          token: wx.getStorageSync('token')
        })
        this.classfy()
      }

    }

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
    if(vm.data.totalRow==vm.data.list.length){
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