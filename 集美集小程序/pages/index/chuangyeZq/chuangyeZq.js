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
    status: 0,
    idx: '',
    val: '',
    pageNo: 1,
    list: [],
    totalRow: 0,
    val: "",
    bannerList: [],
    timer : '',
    sta_type: ''
  },
  verification(e) {
    vm.setData({
      val: e.detail.value
    })
  },
  renzheng() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/index/shenqing/shenqing',
    })
  },
  banner() {
    console.log(vm.data.idx)
    var status = ''
    if (vm.data.idx == 1) {
      status = 16
    } else if (vm.data.idx == 2) {
      status = 11
    } else if (vm.data.idx == 4) {
      status = 14
    }
    wx.request({
      url: config.bannerList_url, //banner
      data: {
        status: status,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, 'banner');
        if (res.data.status == 1) {
          vm.setData({
            bannerList: res.data.bannerList
          })
        }
      },
    });
  },
  init() {
    wx.request({
      url: config.createPrefecture_url, //创业专区/星选好物/0元购福利社
      data: {
        token: vm.data.token,
        type: vm.data.idx,
        pageNo: vm.data.pageNo,
        pageSize: 8,
        name: vm.data.val,
        status: vm.data.status
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '创业专区/星选好物/0元购福利社');
        if (res.data.status == 1) {
          var timerTem =setTimeout(function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 1500);
          vm.setData({
            list: vm.data.list.concat(res.data.page.list),
            timer: timerTem,
            totalRow: res.data.page.totalRow
          })
        }
      },
    });
  },
  changTwo(e) {
    vm.setData({
      pageNo: 1,
      list: []
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
    vm.init();
  },
  detail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop/shopDetail/shopDetail?id=' + id,
    })
  },
  search() {
    vm.setData({
      pageNo: 1,
      list: []
    })
    vm.init()
  },
  bannerJump(e) {
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
    var token = wx.getStorageSync('token')
    var idx = options.idx
    if (idx == 1) {
      wx.setNavigationBarTitle({
        title: '创业专区',
      })
    } else if (idx == 2) {
      wx.setNavigationBarTitle({
        title: '星选好物',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '青春正当季',
      })
    }
    vm.setData({
      idx: idx,
      token: token
    })
    vm.banner();
    vm.init()


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
    var sta_type = wx.getStorageSync('status')
    vm.setData({
      sta_type: sta_type
    })

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
    //销毁定时器
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
    vm.init()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})