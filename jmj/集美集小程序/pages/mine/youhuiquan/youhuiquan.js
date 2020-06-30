var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    pageNo:1,
    status:0,//0 待使用 1 已过期
    list:[],
    totalRow:0

  },
  change(e){
    var idx=e.currentTarget.dataset.idx
    vm.setData({
      pageNo:1,
      list:[],
      status:idx
    })
    vm.init();

  },
  lingquan(){
    wx.navigateTo({
      url: '/pages/mine/lingquan/lingquan',
    })
  },
  init() {
    wx.request({
      url: config.myCouponList_url, //优惠券列表
      data: {
        token:vm.data.token,
        pageNo:vm.data.pageNo,
        pageSize:8,
        status:vm.data.status
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '专区优惠券列表');
        if (res.data.status == 1) {
          var lis=res.data.page.list
          for (let index = 0; index < lis.length; index++) {
            lis[index].end_time=lis[index].end_time.slice(0,10)
          }
          vm.setData({
            list:vm.data.list.concat(lis),
            totalRow:res.data.page.totalRow
          })
        }
      },
    });
  },
  use(){
    wx.switchTab({
      url: '/pages/index/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var token=wx.getStorageSync('token')
    vm.setData({
      token:token
    })
    vm.init();

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
    wx.showNavigationBarLoading();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(vm.data.totalRow==vm.data.list.length){
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