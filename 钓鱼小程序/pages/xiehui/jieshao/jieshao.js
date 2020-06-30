// pages/xiehui/jieshao/jieshao.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:"",
      num:1,
      id:5,
      is_type:'',
      saishiList:[]

    },
init(){
  wx.request({
    url: config.matchs_detail_url,
    data: {
      id:vm.data.id
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'post',
    success: function(res) {
      console.log(res)
      console.log(vm.data.num)
      if(vm.data.num==1){
        WxParse.wxParse('article', 'html', res.data.data.matchs.match_detail, vm, 5) 
      }else{
        WxParse.wxParse('article', 'html', res.data.data.matchs.match_process, vm, 5)   
      }
      vm.setData({
        saishiList: res.data.data.matchs
      })
    },
  })

},
change(e){
  vm.setData({
    num: e.currentTarget.dataset.index
  })
  vm.init();
},
enter(e){
  // console.log(e.currentTarget.dataset.id)
  wx.navigateTo({
      url: '../xiehuiDetail/xiehuiDetail?id='+e.currentTarget.dataset.id,
    });
  },
  cansai(){
    wx.request({
      url: config.is_exhibition_url,
      data:{
        token:vm.data.token
      },
      header: {
        'content-type': 'application/json'//get请求头
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        vm.setData({
          is_type:res.data.data.type
        })
      },
    })
  },
   jump(e){
     if(vm.data.is_type==0){
       wx.showToast({
         title: '认证之后才可报名参赛',
         icon: 'none',
       })
       return;
     }
     console.log(e);
     wx.navigateTo({
       url: '../cansai/cansai?id=' + e.currentTarget.dataset.id + '&price=' + e.currentTarget.dataset.price + '&is_charge=' + e.currentTarget.dataset.charge,
     })
   },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm=this;
      var id=options.id;
      var token = wx.getStorageSync("token")
      vm.setData({
        token: token,
        id: id
      })
      vm.init();
      vm.cansai();
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