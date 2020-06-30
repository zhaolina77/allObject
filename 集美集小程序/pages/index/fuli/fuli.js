var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    val:"",
    // idx:3,
    pageNo:1,
    list:[]

  },
  verification(e){
    vm.setData({
      val:e.detail.value
    })
  },
  init() {
    wx.request({
      url: config.createPrefecture_url, //0元购福利社
      data: {
        token: vm.data.token,
        type: 3,
        pageNo: vm.data.pageNo,
        pageSize: 8,
        name: vm.data.val,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '0元购福利社');
        if (res.data.status == 1) {
          setTimeout(function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 1500);
          vm.setData({
            list:vm.data.list.concat(res.data.page.list),
            totalRow: res.data.page.totalRow
          })
        }
      },
    });
  },
  detail(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop/shopDetail/shopDetail?id='+id,
    })

  },
  search(){
    vm.setData({
      pageNo:1,
      list:[]
    })
    vm.init()
  },
  banner(){
    wx.request({
      url: config.bannerList_url,//banner
      data: {
        status:12,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res,'banner');
        if(res.data.status==1){
           vm.setData({
            bannerList:res.data.bannerList
           })
        }
      },
    });
  },
  bannerJump(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop/shopDetail/shopDetail?id='+id,
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
    vm.banner();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(vm.data.totalRow==vm.data.list.length){
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