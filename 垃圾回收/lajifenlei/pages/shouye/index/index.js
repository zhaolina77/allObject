// pages/shouye/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fl_list: [],
    city: '',
    cityName: '西安',
    city_list: [],
    index1: -1,
    city_id: 1,
    lon: '',
    token:'',
    lat: '',
    status: 1, //0：最新发布   1:距离排序
    pageNo: 1,
    totalRow: 0,
    bannerList: [], //banner列表
    proList: [], //商品列表
    activityList: [] //资讯
  },
  // 资讯列表
  zx() {
    wx.request({
      url: config.activityList_url,
      data: {
        cityId: vm.data.city_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        // console.log(res, "资讯列表")
        if (res.data.status == 1) {
          vm.setData({
            activityList: res.data.activityList
          })
        }
      },
    })
  },
  
  //banner
  banner() {
    wx.request({
      url: config.bannerList_url,
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        // console.log(res, 'banner')
        if (res.data.status == 1) {
          vm.setData({
            bannerList: res.data.bannerList
          })

        }
      },
    })
  },
  //banner跳转
  bannerJump(e) {
    var bannerId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shouye/zixunDetail/zixunDetail?id=' + bannerId,
    })
  },
  city_list() {
    vm.setData({
      proList: []
    })
    wx.navigateTo({
      url: '/pages/citys/citys',
    })
  },
  change() {
    if (vm.data.status == 0) {
      vm.setData({
        pageNo: 1,
        proList: [],
        status: 1
      })
      vm.ProductList();
    } else {
      vm.setData({
        pageNo: 1,
        proList: [],
        status: 0
      })
      vm.ProductList();
    }


  },
  zixun() {
    wx.navigateTo({
      url: '/pages/shouye/zixun/zixun',
    })

  },


  // 分类
  fl() {
    wx.request({
      url: config.indexlType_url,
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          vm.setData({
            fl_list: res.data.parentList,
          })
        }
      },
    });
  },
  flDetail(e) {
    var flId = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../jingangqu/jingangqu?id=' + flId,
    })
  },
  morefl() {
    wx.navigateTo({
      url: '../jingangqu/jingangqu?id=0',
    })
  },

  latlon() {
    wx.request({
      url: config.lonLat_url,
      data: {
        lon: vm.data.lon,
        lat: vm.data.lat,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        console.log(res)
        var cityName = res.data.city.name
        wx.setStorageSync('cityName', cityName);
        wx.setStorageSync('city_id', res.data.city.id);
        vm.setData({
          cityName,
          city_id: res.data.city.id
        })
        vm.ProductList();
      },
    })
  },
  // 首页商品列表
  ProductList() {
    wx.request({
      url: config.indexProductList_url,
      data: {
        cityId: vm.data.city_id,
        status: vm.data.status,
        lon: vm.data.lon,
        lat: vm.data.lat,
        pageNo: vm.data.pageNo,
        pageSize: 8
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品列表');
        if (res.data.status == 1) {
          setTimeout(function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 1500);
          vm.setData({
            proList: vm.data.proList.concat(res.data.page.list),
            totalRow: res.data.page.totalRow
          })
        }
      },
    });
  },
  proDetail(e) {
    var id = e.currentTarget.dataset.id;
   
    wx.request({
      url:config.productDetails_url,
      data: {
        token:vm.data.token,
        id:id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          wx.navigateTo({
            url: '../huishouDetail/huishouDetail?id=' + id,
          })
        }else{
          wx.showToast({
            icon:'none',
            title: res.data.msg,
          })
        }
        console.log(vm.data.lat,vm.data.lon)
      },
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
   

    vm.zx();
    vm.banner();
    // 分类
    vm.fl();
    
    //判断无city_id的时候去获取有的时候就直接走
    if (!wx.getStorageSync('city_id')) {
      vm.getLocations();
    } else {
      vm.setData({
        cityName: wx.getStorageSync('cityName'),
        city_id: wx.getStorageSync('city_id'),
        lon: wx.getStorageSync('city_lon'),
        lat: wx.getStorageSync('city_lat'),
      })
      vm.ProductList();
    }
  },
  getLocations() {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res)
        vm.setData({
          lat:res.latitude,
          lon: res.longitude
        })
        wx.setStorageSync('city_lon', res.latitude);
        wx.setStorageSync('city_lat', res.longitude);
        vm.latlon();
      },
    })
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
    var isSaveRecord = app.globalData.isSaveRecord;
    if (isSaveRecord == 1) {
      this.setData({
        proList: [],
        pageNo: 1
      })
      this.ProductList()
    }
    vm.setData({
      token:wx.getStorageSync('token')  
    })
    app.globalData.isSaveRecord = 0

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
      proList: [],
      pageNo: 1
    })
    this.ProductList()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.proList.length) {
      return;
    }
    ++vm.data.pageNo;

    vm.ProductList();


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})