// pages/xiehui/xiehuiDetail/xiehuiDetail.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      nav:["简介","钓点","赛事","店铺"],
      number:1,
      id:'',
      detailTitle: [],
      detailPage:[],
      matchList:[],
      juml_type:''

    },
    init(){
      wx.request({
        url: config.association_detail_url,
        data: {
          id:vm.data.id,
          pageNo:1,
          pageSize:8,
          class_id: vm.data.number
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'post',
        success: function(res) {
          console.log(res)
          vm.setData({
            detailList: res.data.data.association,
            detailPage:res.data.data.page.list
          })
        },
      });
      wx.request({
        url: config.matchs_list_url,
        data: {
          type:1,
          module_id: vm.data.id,
          pageNo:1,
          pageSize:6

        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'post',
        success: function(res) {
          // console.log(res)
          vm.setData({
            matchList:res.data.data.page.list
          })
        },
      })
    },
    change(e){
        var index=e.currentTarget.dataset.index;
        vm.setData({
          number:index
        })
        console.log(index);
        vm.init();
    },
    tiaozhuan(e){
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../dongtaiDetail/dongtaiDetail?id=' + e.currentTarget.dataset.id + '&type=2',
      });
    },
    tiaozhuan_saishi(e) {
      console.log(e.currentTarget.dataset.id);
    
      wx.navigateTo({
        url: '../jieshao/jieshao?id=' + e.currentTarget.dataset.id,
      });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      var id = options.id;
    var type=options.type;
      vm.setData({
        id:id,
        juml_type:type
      })
      this.init();
      
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