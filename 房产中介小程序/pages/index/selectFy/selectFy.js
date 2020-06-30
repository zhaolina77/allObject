var common = require('../../../common.js');
var config = common.getconfig();
var vm = '';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 160,
    list: [],
    token: '',
    area_id: '',
    state: 2,

    pageNo: 1,
    totalRow: 0,
    name:'',
    value:''
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    vm.setData({
      value: e.detail.value
    })
  },
  shop_search_function(e) {
    console.log(e);
    vm.setData({
      name: e.detail.value
    })
  },
  sub(){
    if (vm.data.value == '') {
      wx.showToast({
        title: '请选择备案房源',
        icon: "none"
      })
      return
    }
    var arr=[];
    for (var i = 0; i < vm.data.list.length; i++) {     
      if (vm.data.list[i].houseId==vm.data.value) {
        arr = vm.data.list[i]
      }
    }
    console.log(vm.data.value)
    console.log(arr)

    wx.setStorageSync('house_list', arr);
    wx.setStorageSync('house_id', vm.data.value);
     wx.navigateBack({
      delta: 1  // 返回上一级页面。
    })


    // let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    // let prevPage = pages[pages.length - 2];

    // prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
    //   house_id: vm.data.value,
    //   house_list: arr
    // })
   
  },
  //切换选择
  change(e) {
    
    var index = e.currentTarget.dataset.index;
    
    vm.setData({
      state: index,
      list: [],
      pageNo: 1,
      value:''
    })
    vm.init()
  },
  init() {
    wx.request({
      url: config.house_list_url,
      data: {
        cityId: vm.data.area_id,
        start: vm.data.pageNo,
        size: 8,
        status: vm.data.state,
        name: vm.data.name,
        longitude: vm.data.lon,
        latitude: vm.data.lat
      },
      header: {
        "content-type": "application/json",
        token: vm.data.token,
      },
      method: 'GET',
      success: function (ret) {
        console.log(ret)
        // console.log(ret.data.data.page.list)
        if (ret.data.code == 1) {
          vm.setData({
            list:vm.data.list.concat(ret.data.data),
            totalRow: ret.data.total,
          })
          //console.log(ret.data.data.page.list)
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
  onLoad: function (options) {
    vm = this;
    vm.setData({
      area_id: wx.getStorageSync('area_id'),
      token: wx.getStorageSync('token'),
      lat: wx.getStorageSync('lat'),
      lon: wx.getStorageSync('lon')
    })
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