var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    name:'',
    pageNo:1,
    list:[]
  },
  init(){
    wx.request({
      url: config.indexSearch_url,//首页搜索
      data: {
        token:vm.data.token,
        pageNo:vm.data.pageNo,
        pageSize:8,
        name:vm.data.name
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        setTimeout(function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
        console.log(res,'首页搜索');
        if(res.data.status==1){
           vm.setData({
            list:vm.data.list.concat(res.data.page.list),
            totalRow:res.data.page.totalRow
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
  verification(e) {
    var vals = e.detail.value
    vm.setData({
      name: vals
    })
  },
  search(){
    vm.setData({
      pageNo:1,
    list:[]
    })
    vm.init();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var name=options.name
    vm.setData({
      name:name
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