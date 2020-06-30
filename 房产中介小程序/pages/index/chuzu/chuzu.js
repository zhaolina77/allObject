var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hx_type: 1,


    token: '',
    area_id: '',
    list: [],
    totalRow: 0,
    pageNo: 1,
    status: 1, //1新房2二手房3租房
    typeId: 0, //新房没有户型搜索 户型id
    name: '', //名字
    orderStatus: '0', //排序1 价格升序 2 价格降序
    show: 0,
    open_type: 1,
    type_list: [],



    lat: "",
    lon: ''
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
    console.log(vm.data.list)
    vm.init()
  },
  rec() {
    vm.setData({
      typeId: '',
      list: [],
      pageNo: 1
    })
    vm.init();
  },
  change_class(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    vm.setData({
      typeId: id,
    })
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
  changTwos() {
    vm.setData({
      pageNo: 1,
      list: [],
    })
    if (vm.data.open_type == 2) {
      vm.setData({
        open_type: 1,
        show: 0
      })
    } else {
      vm.setData({
        open_type: 2,
        show: 1
      })

    }
  },
  changTwo(e) {
    vm.setData({
      pageNo: 1,
      list: [],
    })
    if (vm.data.orderStatus == 0) {
      vm.setData({
        orderStatus: 1
      })
    } else if (vm.data.orderStatus == 1) {
      vm.setData({
        orderStatus: 2
      })
    } else {
      vm.setData({
        orderStatus: 1
      })
    }
    vm.init()
  },
  init() {
    wx.request({
      url: config.house_list_url,
      data: {
        cityId: vm.data.area_id,
        start: vm.data.pageNo,
        size: 8,
        status: vm.data.status,
        name: vm.data.name,
        orderStatus: vm.data.orderStatus,
        typeId: vm.data.typeId,
        longitude: vm.data.lon,
        latitude: vm.data.lat
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (ret) => {
        console.log(ret,'列表');
        vm.setData({
          list: vm.data.list.concat(ret.data.data),
          totalRow: ret.data.total,
          show: 0,
          open_type: 1
        })
      }
    });
  },
  getHourseType() {
    wx.request({
      url: config.getHourseType_url, //优选热卖
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (ret) => {
        console.log(ret);
        vm.setData({
          type_list: ret.data.data
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.setData({
      status: options.status,
      token: wx.getStorageSync('token'),
      area_id: wx.getStorageSync('area_id'),
      lat: wx.getStorageSync('lat'),
      lon: wx.getStorageSync('lon')
    })
    if (options.status == 1) {
      vm.setData({
        hx_type: 0
      })
      wx.setNavigationBarTitle({
        title: '新房',
      })
    } else if (options.status == 2) {
      wx.setNavigationBarTitle({
        title: '二手房',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '租房',
      })
    }
    vm.init()
    vm.getHourseType()
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