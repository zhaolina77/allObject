// pages/fabu/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fl_list:[],
    idx:0,
    id:-1,
    name:'',
    token:''

  },
  choose(e){
    var idx=e.currentTarget.dataset.index
    var id=e.currentTarget.dataset.id
    var na=e.currentTarget.dataset.name
    vm.setData({
      idx:idx,
      id:id,
      name:na
    })
  },
  qd(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/mine/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '../fabuDetail/fabuDetail?id='+vm.data.id+"&name="+vm.data.name,
    })
  },

  fl(){
    wx.request({
      url: config.moreType_url,
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          vm.setData({
            fl_list:res.data.productList,
            id:res.data.productList[0].id,
            name:res.data.productList[0].name
          })
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    vm.setData({
      token: wx.getStorageSync('token')
    })
    vm.fl();
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
    vm.setData({
      token: wx.getStorageSync('token')
    })

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})