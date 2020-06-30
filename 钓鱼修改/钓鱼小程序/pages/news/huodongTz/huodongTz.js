var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      type:2,
      token:"",
      pageNo:1,
      list:[]


    },
    init(){
      wx.request({
        url: config.message_list_url,
        data:{
          type: vm.data.type,
          token: vm.data.token,
          pageNo: vm.data.pageNo,
          pageSize:8,
          totalRow:0

        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          vm.setData({
            totalRow: res.data.data.page.totalRow,
            list:res.data.data.page.list
          })
        },
      })

    },
    tiaozhuan(e){
      console.log(e)
      var inid = e.currentTarget.dataset.inid;
      var meid = e.currentTarget.dataset.meid;
      wx.navigateTo({
        url: '../newsDetail/newsDetail?inid=' + inid + "&meid=" + meid,
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      var token=wx.getStorageSync("token");
      var type=options.type;
      vm.setData({
        type:type,
        token:token
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
      if (vm.data.totalRow == vm.data.list.length) {
        return;
      }
      vm.data.pageNo++;
      vm.init();

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})