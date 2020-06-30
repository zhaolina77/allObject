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
    totalRow:0,
    list: [],
    type_ids: [],
    charging_standard_id: 0,
    lon: '',
    lat: '',
    sort: '0',
    name: '',
    bList: [], //banner、
    is_open: 1, //石否打开筛选  
    open_type: '', //判断是否认证进入详情
    second: 1,
    xianshi: false,
    angling_list: [],
    charging_list: [],
    angling_id: 0,
    charging_id: 0,
    is_del:0
  },

  amap_init() {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        // console.log(res);
        vm.setData({
          lon: res.longitude,
          lat: res.latitude
        })
        vm.init();
      },
      fail: function(res) {
        // console.log(res);
      }
    })
  },
  init() {
    wx.request({
      url: config.angling_site_list_url,
      data: {
        charging_standard_id: vm.data.charging_standard_id,
        type_ids: vm.data.type_ids.join(','),
        lon: vm.data.lon,
        lat: vm.data.lat,
        sort: vm.data.sort,
        pageNo: vm.data.pageNo,
        pageSize: 8
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        setTimeout(function(){
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          },1500);
        vm.setData({
          list: vm.data.list.concat(res.data.data.page.list),
          totalRow: res.data.data.page.totalRow
        })
      },
    })
  },
  detail(e) {
    var id = e.currentTarget.dataset.id
    if (vm.data.open_type == 0) {
      wx.showToast({
        title: '认证之后才可查看钓场详情',
        icon:'none'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/diaocahng/diaochangDetail/diaochangDetail?id=' + e.currentTarget.dataset.id,
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
  //轮播图
  banner() {
    wx.request({
      url: config.banners_url,
      data: {
        module_id: 2
      },
      method: 'GET',
      success: function(res) {
        // console.log(res)
        vm.setData({
          bList: res.data.data.banner_list
        })
      },
    })
  },
  changeTwo(e) {
    vm.setData({
      second: e.currentTarget.dataset.index,
      xianshi: false
    })
    if (e.currentTarget.dataset.index == 1) {
      vm.setData({
        sort: 0,
        list: [],
        charging_standard_id: 0
      })
    } else {
      vm.setData({
        sort: 1,
        list: [],
        charging_standard_id: 0
      })
    }
    vm.init();
  },
  select() {
    var shows = vm.data.xianshi
    // console.log(shows)
    vm.setData({
      xianshi: !shows,
      second: 3
    })
    //钓场筛选数据列表
    wx.request({
      url: config.data_list_url,
      data: {},
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function(res) {
        // console.log(res)
        vm.setData({
          angling_list: res.data.data.angling_site_type_list,
          charging_list: res.data.data.charging_standard_list
        })
      },
    })
  },
  // 钓场类型
  angling(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var angling_list = vm.data.angling_list;

    if (vm.data.type_ids.indexOf(id)===-1)
    {
      angling_list[index].is_del=1;  
      vm.data.type_ids.push(id)
    }else{
      angling_list[index].is_del = 0;
      vm.data.type_ids.splice(vm.data.type_ids.indexOf(id),1)
    }
    vm.setData({
      angling_list
    })
     console.log(vm.data.type_ids)
  },
  // 收费标准
  charging(e) {
    // console.log(e)
    vm.setData({
      charging_id: e.currentTarget.dataset.id,
      charging_standard_id: e.currentTarget.dataset.id
    })

  },
  // 重置
  reset() {
    vm.setData({
      // xianshi: false,
      list: [],
      type_ids: [],
      charging_standard_id: 0,
      lon: '',
      lat: '',
      sort: '0',
      pageNo: 1,
      angling_id: 0,
      charging_id: 0,
      type_ids:[]

    })
    vm.init();

  },

  // 筛选
  shaixuan() {
    vm.setData({
      xianshi: false,
      list: [],
      pageNo: 1
    })
    vm.init();
    vm.setData({
      type_ids: [],
      charging_standard_id: 0,
      lon: '',
      lat: '',
      sort: '0',
      angling_id: 0,
      charging_id: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
    vm.setData({
      token: wx.getStorageSync('token'),
      open_type:wx.getStorageSync('type')
    })
    vm.amap_init();
    vm.banner();
    vm.opentype();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
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
  onReachBottom: function() {
    if (vm.data.totalRow == vm.data.list.length) {
      return
    }
    ++vm.data.pageNo;
    vm.init();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})