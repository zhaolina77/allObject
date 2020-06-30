var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    hot_list: [],
    history: [],
    val: '',
    is_search: 0
  },
  //初始化缓存
  init: function() {
    var history = wx.getStorageSync("history");
    if (history != "" && history != null) {
      vm.setData({
        history: JSON.parse(history),
        is_search: 1
      })
      // console.log(vm.data.history)
    } else {
      vm.setData({
        is_search: 0
      })
    }
  },
  //清除全部缓存
  close: function () {
    wx.removeStorageSync('history');
    vm.setData({
      history:[],
      is_search: 0
    })
    console.log(vm.data.history)
    vm.init();
  },
  //获取input的值
  verification: function (e) {
    var val = e.detail.value;
    vm.setData({
      val: val
    })
  },
  tiaozhuan(e) {
    wx.navigateTo({
      url: '../searchJg/searchJg?content=' + e.currentTarget.dataset.content,
    })
  },
  serch: function (e) {
    let serchArr = [];
    var vals = e.detail.value;
    if (vals == '') {
      wx.showToast({
        title: '请输入您想搜索名称',
        icon: "none"
      })
      return
    }
    vm.search_list(vals);
    let jsonStr = {
      name: vals
    };
    wx.getStorage({//获取缓存并设置缓存
      key: 'history',
      success: function (res) {
        var serchArr = JSON.parse(res.data);
        for (var i = 0; i < serchArr.length; i++) {
          if (serchArr[i].name == vals) {
            return;
          }
        }
        serchArr.push(jsonStr);
        wx.setStorage({
          key: 'history',
          data: JSON.stringify(serchArr)
        })

      },
      fail: function () {
        serchArr.push(jsonStr);
        wx.setStorage({
          key: 'history',
          data: JSON.stringify(serchArr)
        })
      },
    });
    vm.init();
  },
  search_list(vals){
    wx.navigateTo({
      url: '../searchJg/searchJg?content=' + vals,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
    var history = wx.getStorageSync("history")
    vm.init();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})