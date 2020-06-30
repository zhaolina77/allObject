var common = require('../../common.js');
var config = common.getconfig();
var WxParse = require("../../wxParse/wxParse.js");
var vm = null;
var article = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgInfoArrLength: 0,  // 轮播图列表的长度   
    list: [],  //车辆列表
    state: 0,
    left: '',
    dl: []
  },

  //车辆列表
  init() {
    wx.request({
      url: config.carList_url,
      header: {
        'content-type': 'application/json'
      },
      method: 'get',
      data: {

      },
      success: ret => {
        console.log(ret);
        var len = vm.data.list.length;
        var center = parseInt(len / 2);
        WxParse.wxParse('article', 'html', ret.data.data.carList[center].extra_charges_intro, vm, 5)
        vm.setData({
          imgInfoArrLength: len,
          state: center,
          list: ret.data.data.carList,
          dl: ret.data.data.carList[center],
          left: 'sw' + ret.data.data.carList[vm.data.state].id,
          // detail: ret.data.data.carList[center].detail,
          // basic_cost_details: ret.data.data.carList[center].basic_cost_details,
          // price: ret.data.data.carList[center].basic_cost
        })
      }
    })
  },
  //切换数据
  tap(e) {
    var idx = e.currentTarget.dataset.index;
    WxParse.wxParse('article', 'html', vm.data.list[idx].extra_charges_intro, vm, 5)
    vm.setData({
      state: idx,
      detail: vm.data.list[idx].detail,
      dl: vm.data.list[idx],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.init();
  },

  changeFun(e) {
    WxParse.wxParse('article', 'html', vm.data.list[e.detail.current].extra_charges_intro, vm, 5)
    vm.setData({
      state: e.detail.current,
      dl: vm.data.list[e.detail.current],
      left: 'sw' + vm.data.list[e.detail.current].id
    })
  }
})
