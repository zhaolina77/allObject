// pages/yuhuobang/index/index.js
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
    totalRow: 0,
    huojiangList: [],
    pageNo: 1,
    list: [],
    friends: [],
    friendsList: [],
    friendsList_url:[],
    first: 1,
    token:"",
    type:0,
    is_open:0
  },
  cate() {
    wx.request({
      url: config.catch_list_url,
      data: {
        type: vm.data.first
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //post请求头
      },
      method: 'post',
      success: function(res) {
        // console.log(res)
        vm.setData({
          huojiangList: res.data.data.catch_list
        })
      },
    })
  },
  
  init() {
    // console.log(11111)
    // 池钓、自然水域
    if (vm.data.first == 1 || vm.data.first==2){
      var url = config.releases_list_url
    }else{
      if (!vm.data.token) {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }, 1000)
        return;
      }else{
        console.log(111111111111)
        var url = config.friends_list_url
      }
    }
    wx.request({
      url: url,
      data: {
        catch_type: vm.data.first,
        pageNo: vm.data.pageNo,
        pageSize: 6,
        token: vm.data.token
      },
      header: {
        'content-type': 'application/json'//get请求头
      },
      method: 'get',
      success: function(res) {
        console.log(res)
        var data=res.data.data.page.list;
        if (vm.data.first == 3) {
            var friends = res.data.data.friend_list
          }
        vm.setData({
          list: vm.data.list.concat(res.data.data.page.list),
          totalRow: res.data.data.page.totalRow,
          friends: friends ? friends:''
        })
      },
    });
    wx.request({
      url: config.is_exhibition_url,
      data: {
        token: vm.data.token
      },
      header: {
        'content-type': 'application/json'//get请求头
      },
      method: 'GET',
      success: function (res) {
        if (res.data.status == 1) {
          wx.setStorageSync('is_open', res.data.data.is_exhibition)
          wx.setStorageSync('type', res.data.data.type)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 1000,
          })
        }
      },
    })
  },

  changeOne(e) {
    var fir = e.currentTarget.dataset.index;
    // console.log(fir)
    if(fir==1||fir==2){
      vm.setData({
        first: fir,
        list:[],
        pageNo:1
      })
    }else{
      if(!vm.data.token){
        wx.showToast({
          title: '登录之后才可查看关注',
          icon: 'none',
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/login/login',
          })
        },1000)
        
        return;
      }
      vm.setData({
        first: fir,
        list:[],
        pageNo:1
      })
    }
    vm.init()
      vm.cate();
    
  },
  tiaozhuan(e){
    wx.navigateTo({
      url: '../dongtai/dongtai?id=' + e.currentTarget.dataset.id,
    })
  },
  dongtai(e){
    wx.navigateTo({
      url: '../dongtai/dongtai?id=' + e.currentTarget.dataset.id,
    })
  },
  guanzhu(){
    wx.navigateTo({
      url: '/pages/mine/myGuanzhu/myGuanzhu?type=1',
    })
  },
  huojiang(e){
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../guize/guize?id=' + e.currentTarget.dataset.id,
    })
  },
  fabu(e){
      wx.navigateTo({
        url: '../fabu/fabu?type=' + e.currentTarget.dataset.index,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
    var token = wx.getStorageSync("token");
    var type = wx.getStorageSync("type");
    var is_open = wx.getStorageSync("is_open");
    vm.setData({
      token:token,
      type: type,
      is_open: is_open
    })
    vm.init();
    vm.cate();
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
    if (vm.data.totalRow == vm.data.list.length) {
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