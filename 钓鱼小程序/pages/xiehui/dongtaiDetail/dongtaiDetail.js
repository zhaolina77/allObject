// pages/xiehui/dongtaiDetail/dongtaiDetail.js
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
      jianjieList:[],
      id:'',
      jump_type:''

    },
    init(){
      wx.request({
        url: config.dynamic_detail_url,
        data: {
            id:vm.data.id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'post',
        success: function(res) {
          console.log(res);
          WxParse.wxParse('article', 'html', res.data.data.dynamic.content, vm, 5)  
          vm.setData({
            jianjieList: res.data.data.dynamic
          })
        },
      })

    },
    tiaozhuan(e){
      if(vm.data.jump_type==2){
        wx.navigateBack({
          delta: 1,
        });//返回上一页面
      }else{
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
          url: '/pages/xiehui/xiehuiDetail/xiehuiDetail?id=' + e.currentTarget.dataset.id,
          
        })
      }
     
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        vm=this;
        var id = options.id;
        var jump_type=options.type;
        vm.setData({
          id:id,
          jump_type:jump_type
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