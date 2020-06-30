var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token: '',
      pageNo: 1,
      totalRow: '',
      list: [],
      is_load: '',
      is_part_in: 0
    },
    detail(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/saishi/quanDetail/quanDetail?id='+id,
      })
    },
    init(){
      wx.request({
        url: config.my_match_coupon_url,
        data: {
          token: vm.data.token,
          is_part_in: vm.data.is_part_in,
          pageNo: vm.data.pageNo,
          pageSize: 8
        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          
          if (ret.data.status == 1) {
            console.log(ret)
            vm.setData({
              list: vm.data.list.concat(ret.data.data.page.list),
              totalRow: ret.data.data.page.totalRow

            })
          } else {
            wx.showToast({
              title: ret.data.msg,
              icon: "none",
              duration: 1000,
            })
          }
        }
      })
    },
    //切换选择
    change(e){
      var index = e.currentTarget.dataset.index;
      vm.setData({
        is_part_in:index,
        pageNo:1,
        list:[]
      })
      vm.init()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      vm.setData({
        token: wx.getStorageSync('token')
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
        wx.showToast({
          title: '没有更多数据了！',
          icon: "none"
        })
        return;
      }
      ++vm.data.pageNo;
      vm.init();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})