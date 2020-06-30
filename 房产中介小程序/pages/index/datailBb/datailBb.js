var common = require('../../../common.js');
var config = common.getconfig();
var vm = '';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    accountType:'',
    is_show:0,
    list:[],  //备案客户
    arr_id:[],

    house_list:[],//备案房源
    house_id:'0',//备案防御nid
  },
  sub() {
    if (vm.data.house_id=='') {
      wx.showToast({
        title: '请选择备案房源',
        icon: "none"
      })
      return
    }
    if (vm.data.arr_id.lenth==0) {
      wx.showToast({
        title: '请选择备案客户',
        icon: "none"
      })
      return
    }
    wx.request({
      url: config.subReport_url,
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        token: vm.data.token,
      },
      data: {
        cityId:wx.getStorageSync('area_id'),
        hourseId: vm.data.house_id,
        clientIds: vm.data.arr_id.join(',')
      },
      success: ret => {
        wx.removeStorageSync('house_list');
        wx.removeStorageSync('house_id');
        wx.showToast({
          title: ret.data.msg,
          icon: 'none'
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1,
          })
        },500)
      }
    })
  },
  login() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  del(e){
    var idx = e.currentTarget.dataset.idx
    console.log(vm.data.list[idx])
    var lis=vm.data.list
    var arr_id = vm.data.arr_id
    for(var i=0;i<lis.length;i++){
      if (idx==i){
        lis.splice(e.currentTarget.dataset.idx, 1)
        arr_id.splice(e.currentTarget.dataset.idx, 1)
      }
    }
    vm.setData({
      list:lis,
      arr_id: arr_id

    })
   
  },
  //寻找
  change_kh(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    app.globalData.kh_list = vm.data.list;
    app.globalData.arr_id = vm.data.arr_id;
    wx.navigateTo({
      url: '/pages/index/selectKh/selectKh?type=2',
    })
  },
  //x新增
  add_phone(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/index/addKh/addKh',
    })
  },
  //报备
  change_phone(){
    vm.setData({
      is_show:1
    })
  },
  cancel(){
    vm.setData({
      is_show: 0
    })
  },
  change_more(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/index/selectFy/selectFy',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm =this;
    
    
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
    if (wx.getStorageSync('house_id')){
      
          vm.setData({
            house_id: wx.getStorageSync('house_id'),
            house_list: wx.getStorageSync('house_list'),
          })
    }
    vm.setData({
      token: wx.getStorageSync('token'),
      accountType: wx.getStorageSync('accountType'),
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
    wx.showLoading({
      title: '数据加载中',
    })
    vm.setData({
      accountType: wx.getStorageSync('accountType'),
    })
    setTimeout(function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 1000);

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