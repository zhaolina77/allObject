var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
var vm = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo:1,
    totle:0,
    token: '',
    id: app.globalData.id ,
    data: [],
    area_id: '',
    hoursePics: [],
    list: [],
    collectStatus:0,
    loading: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    markers: [],
    accountType: '0',
    list_data:[]
  },
  phone(e){
    var phone=e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber:phone,
    })
  },
  sub(){
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    var param={
      houseCoverImage: vm.data.data.houseCoverImage,
      houseName: vm.data.data.hourseName,
      address: vm.data.data.address,
      price: vm.data.data.price,
    }
    wx.setStorageSync('house_list', param);
    wx.setStorageSync('house_id', app.globalData.id);
    wx.navigateTo({
      url: '/pages/index/datailBb/datailBb',
    })
  },
  //资讯详情
  pick_detail(e) {
    wx.showLoading({
      title: '玩命加载中...',
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
    app.globalData.id = e.currentTarget.dataset.id
    vm.setData({
      //id: e.currentTarget.dataset.id,
      list_data: [],
      data: [],
      list:[],
    })
    vm.init();
    vm.near();
  },
  //收藏
  coll: function () {
    if (!vm.data.token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return;
    }
    wx.request({
      url: config.collect_url,
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: vm.data.token,
      },
      data: {        
        hourseId: app.globalData.id
      },
      success: ret => {
        wx.showToast({
          title: ret.data.msg,
        })
        if (vm.data.collectStatus==1){
          var collectStatus=0
        }else{
          var collectStatus=1
        }
        vm.setData({
          collectStatus
        })
      },
    })
  },
  markere: function (e) {
    console.log(e);
    wx.openLocation({
      latitude: Number(vm.data.data.latitude),
      longitude: Number(vm.data.data.longitude),
      scale: 18,
      name: vm.data.data.hourseName,
      address: vm.data.data.address
    })
  },
  
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    var arr=[];
    arr.push(src)
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  init() {
    wx.request({
      url: config.getNewHouseDetailById_url,
      data: {
        hourseId: app.globalData.id,
        cityId: vm.data.area_id
      },
      header: {
        'content-type': 'application/json',
        "token": vm.data.token
      },
      method: "GET",
      success: (ret) => {
        console.log(ret)
        wx.hideLoading()
        if (ret) {
          if (ret.data.code == 1) {
            if (ret.data.data.rimContent) {
              WxParse.wxParse('article', 'html', ret.data.data.rimContent, vm, 5)
            }
            var markers=[];
            var obj={
              iconPath: ret.data.data.houseCoverImage,
              id: 0,
              latitude: ret.data.data.latitude,
              longitude: ret.data.data.longitude,
              width: 30,
              height: 30
            }
            markers.push(obj);
            console.log(markers);
            vm.setData({
              data: ret.data.data,
              hoursePics: ret.data.data.hoursePics,
              loading: false,
              markers: markers,
              collectStatus: ret.data.data.collectStatus
            })
          }
        }
      }
    });
  },
  near() {
    wx.request({
      url: config.nearbyHourse_url,
      data: {
        start:vm.data.pageNo,
        size:8,
        hourseId: app.globalData.id,
        cityId: vm.data.area_id
      },
      header: {
        'content-type': 'application/json',
        "token": vm.data.token
      },
      method: "GET",
      success: (ret) => {
        console.log(ret)
        if (ret) {
          if (ret.data.code == 1) {
            vm.setData({
              list_data: vm.data.list_data.concat(ret.data.data),
              totle:ret.data.total
            })
          }
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    
    vm.setData({
      token: wx.getStorageSync('token'),
      area_id: wx.getStorageSync('area_id'),
      accountType: wx.getStorageSync('accountType'),
    })
    vm.init();
    vm.near();
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
    if(vm.data.totle==vm.data.list_data.length){
      return
    }
    ++vm.data.pageNo;
    vm.near()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})