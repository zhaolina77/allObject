// pages/mine/address/address.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	
    delBtnWidth: 160,
    token: '',
    addressList: [],
    type: '1', //等于2的时候是地址选择
  },

  add() {
    wx.navigateTo({
      url: '../addressAdd/addressAdd?type=' + vm.data.type,
    })
  },
  del(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id

    wx.request({
      url: config.addressDel_url,
      data: {
        id: e.currentTarget.dataset.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })

          vm.address();
        }
      },
    });


  },
  address() {
    wx.request({
      url: config.addressList_url,
      data: {
        token: vm.data.token
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {

          setTimeout(function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 1500);
          vm.setData({
            addressList: res.data.addressList,
          })
        }
      },
    });
  },

  bianji(e) {
    if (vm.data.type == 2) {
      setTimeout(function () {
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        let prevPage = pages[pages.length - 2];
        prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          address_id: e.currentTarget.dataset.id,
          full_address: e.currentTarget.dataset.full,
          address_info: e.currentTarget.dataset.info,
        })
        wx.navigateBack({
          delta: 1 // 返回上一级页面
        })
      })
      return;
    }
    var name = e.currentTarget.dataset.name
    var id = e.currentTarget.dataset.id
    var mobile = e.currentTarget.dataset.mobile
    var def = e.currentTarget.dataset.def
    var full = e.currentTarget.dataset.full
    var info = e.currentTarget.dataset.info
    var lat = e.currentTarget.dataset.lat
    var lon = e.currentTarget.dataset.lon
    wx.navigateTo({
      url: '../addressDel/addressDel?id=' + id + "&name=" + name + "&mobile=" + mobile + "&def=" + def + "&full=" + full + "&info=" + info + "&lat=" + lat + "&lon=" + lon,
    })
  },
  drawStart: function (e) {
    // console.log(e);
    var touch = e.touches[0]

    for (var index in this.data.addressList) {
      var item = this.data.addressList[index]
     
      item.right = 0
      console.log(item.right)
    }
    this.setData({
      addressList: this.data.addressList,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    // console.log(e);
    var touch = e.touches[0]
    var item = this.data.addressList[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        addressList: this.data.addressList
      })
      console.log(item.right)
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        addressList: this.data.addressList
      })
    }
  },
  drawEnd: function (e) {
    // console.log(e);
    var item = this.data.addressList[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        addressList: this.data.addressList,
      })
      console.log(item.right)
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.addressList,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var type = 1;
    if (options) {
      type = options.type
    } else {
      type = 1
    }
    vm.setData({
      token: wx.getStorageSync('token'),
      type: type
    })
    vm.address();

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
    this.setData({
      addressList: [],
      pageNo: 1
    })
    this.address()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

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