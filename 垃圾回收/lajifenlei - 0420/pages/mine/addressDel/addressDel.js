// pages/mine/addressAdd/addressAdd.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:"",
    customItem: '',
    id:-1,
    token:'',
    name:'',
    mobile:'',
    
    addressInfo:'',
    isDefault:0,
    lat:'',
    lon:''

  },

  user(e){
    vm.setData({
      name:e.detail.value
    })
  },
  phone(e){
    vm.setData({
      mobile:e.detail.value
    })
  },
  address(e){
    vm.setData({
      addressInfo:e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var x= e.detail.value.join("")
    // console.log(x)
    this.setData({
      region: x
    })
  },
  getlocation(){
    wx.getLocation({
      success: function (res){
        console.log(res)
        vm.setData({
          lat:res.latitude,
          lon:res.longitude
        })
      }
     
    })
  },
  switch1Change(e){
      console.log(e)
      if(e.detail.value){
        vm.setData({
          isDefault:0
        })
      }else{
        vm.setData({
          isDefault:1
        })
      }
      console.log(vm.data.isDefault)
  },

  baocun(){
    // var region=vm.data.region.join("")
    if(vm.data.name==''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
      return
    }
    if(vm.data.mobile==''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
      })
      return
    }
      var mobile_res=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/;
      if(!mobile_res.test(vm.data.mobile)){
        wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none',
        })
        return;
      }
      if(vm.data.region==''){
        wx.showToast({
          title: '请选择地区',
          icon: 'none',
        })
        return
      }
      if(vm.data.addressInfo==''){
        wx.showToast({
          title: '请输入详细地址',
          icon: 'none',
        })
        return
      }
      
   
    

    wx.request({
      url: config.addressUpdate_url,
      data: {
        id:vm.data.id,
        token:vm.data.token,
        name:vm.data.name,
        mobile:vm.data.mobile,
        fullAddress:vm.data.region,
        addressInfo:vm.data.addressInfo,
        isDefault:vm.data.isDefault,
        lat:vm.data.lat,
        lon:vm.data.lon
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          setTimeout(function(){
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[pages.length - 2];
            prevPage.address();
            wx.navigateBack({
              delta: 2  // 返回上一级页面。
            })
          },1000)
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
      token: wx.getStorageSync('token'),

      id:options.id,
      name:options.name,
      mobile:options.mobile,
      addressInfo:options.info,
      region:options.full,
      isDefault:options.def,
      lat:options.lat,
      lon:options.lon
    })
    vm.getlocation();
    
    // var name=e.currentTarget.dataset.name
    // var id=e.currentTarget.dataset.id
    // var mobile=e.currentTarget.dataset.mobile
    // var def=e.currentTarget.dataset.def
    // var full=e.currentTarget.dataset.full
    // var info=e.currentTarget.dataset.info
    // var lat=e.currentTarget.dataset.lat
    // var lon=e.currentTarget.dataset.lon
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