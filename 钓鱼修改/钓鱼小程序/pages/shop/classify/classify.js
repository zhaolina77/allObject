var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      classify_id:1,
      classifyOneList: [],
      classifyTwoList:[],
      cname:[],
      index:0,
    },
    init(){
      wx.request({
        url: config.classifyList_url,
        data: {
          classId: vm.data.classify_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          vm.setData({
            classifyOneList: res.data.data.classifyOneList,
            classifyTwoList: res.data.data.classifyTwoList,
            cname: res.data.data.classifyOneList[vm.data.index].name
          })
        },
      })
     
    },

  classify(e){
      vm.setData({
        classify_id: e.currentTarget.dataset.id,
        index:e.currentTarget.dataset.index
      })
      vm.init()
  },
  classifyTwo(e){
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../classifyShop/classifyShop?id=' + e.currentTarget.dataset.id,
      })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      var classify_id = options.classify_id;
      var index = options.index;
      vm.setData({
        classify_id: classify_id,
        index:index
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