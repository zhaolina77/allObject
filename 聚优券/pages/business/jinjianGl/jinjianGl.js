var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    list:[]

  },
  init(){
    wx.request({
      url: config.auditList_url,
      data: {
      },
      header: {
        contentType: "application/json;charset=UTF-8",
        'token':vm.data.token
        
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if(res.data.code==1){
          vm.setData({
            list:res.data.data.list
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });


  },
  detail(e){
    var status=e.currentTarget.dataset.status
    var count=e.currentTarget.dataset.count
    if(count<=0){
      wx.showToast({
        title: '暂无相关数据',
        icon:'none'
      })
return
    }
    wx.navigateTo({
      url: '/pages/business/shenhe/shenhe?status='+status,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})