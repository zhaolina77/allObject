var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    indicatorActiveColor: '#FA8B1D',
    id: 3,
    level: 0,
    pageNo: 1,
    totalRow:0,
    list:[],
    num:{},
    level:0

  },
  init() {
    wx.request({
      url: config.findEvaluatesByProductId_url,
      data: {
        id: vm.data.id,
        level: vm.data.level,
        pageNo: vm.data.pageNo,
        pageSize: 8
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        vm.setData({
          totalRow: res.data.data.page.totalRow,
          list:vm.data.list.concat(res.data.data.page.list),
          num:res.data.data
        })
      },
    })

  },
  change(e){
    vm.setData({
      list:[],
      level:e.currentTarget.dataset.index
    })
    vm.init();

  },
  //图片预加载
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var imglist = e.target.dataset.list;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls:imglist // 需要预览的图片http链接列表  
    })
  } , 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
    var id=options.id;
    vm.setData({
      id:id
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
    if (vm.data.totalRow==vm.data.list.length){
        return;
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