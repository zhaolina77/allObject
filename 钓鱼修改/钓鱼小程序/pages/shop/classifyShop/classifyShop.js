var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopId: '',
    prefectureId: '',
    secondLevelId: 10,
    name: '',
    sales: 0,
    price: 0,
    pageNo: 1,
    pageSize: 10,
    totalRow: 0,
    list: [],
    nomore: false,
    index: 0,
    jg: 0
  },
  init() {
    wx.request({
      url: config.goodsList_url,
      data: {
        shopId: vm.data.shopId,
        prefectureId: vm.data.prefectureId,
        secondLevelId: vm.data.secondLevelId,
        name: vm.data.name,
        sales: vm.data.sales,
        price: vm.data.price,
        pageNo: vm.data.pageNo,
        pageSize: 8,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        vm.setData({
          totalRow: res.data.data.page.totalRow,
          list: vm.data.list.concat(res.data.data.page.list)
        })
      },
    })

  },
  tiaozhuan(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../shopDetail/shopDetail?id=' + e.currentTarget.dataset.id,
    })

  },
  // 综合、销量、价格切换
  change(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    vm.setData({
      list:[],
      index: index,
    })
    if (index == 0) {
      vm.setData({
        sales:0,
        price: 0
      })
    } else if(index == 1){
      vm.setData({
        sales:1,
        price: 0
      })
    }else{
      vm.setData({
        sales: 0
      })
      if(vm.data.price==0){
        vm.setData({
          price: 1
        })
      } else if (vm.data.price == 1){
        vm.setData({
          price:2
        })
      }
       else {
        vm.setData({
          price: 1
        })
      }
    }
    vm.init();

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
    var id = options.id;
    // var index = options.index;
    vm.setData({
      secondLevelId: id,
      // index:index
    })
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
    if (vm.data.totalRow == vm.data.xiehuiList.length) {
      return;
    }
    vm.data.pageNo++;
    vm.data_list();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})