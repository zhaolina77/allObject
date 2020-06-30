var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      id: '',
      token: '',
      list: [],
      totalRow: 0,
      pageNo: 1,
      is_load: '',
      data: [],
    },
    detail(e){
      var id = e.currentTarget.dataset.id;
      console.log(id)
      wx.navigateTo({
        url: '/pages/yuhuobang/dongtai/dongtai?id='+id,
      })
    },
    init(){
      wx.request({
        url: config.my_releases_url,
        data: {
          token: vm.data.token,
          pageNo: vm.data.pageNo,
          pageSize: 8
        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
         console.log(ret)
         setTimeout(function(){
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          },1500);
         // console.log(ret.data.data.page.list)
          
          if (ret.data.status == 1) {
            var lis=ret.data.data.page.list;
            //将url字符串转为数组
            for(var i=0;i<ret.data.data.page.list.length;i++){
              var li=ret.data.data.page.list[i].url.split(',')
              // console.log(li)
              ret.data.data.page.list[i].url=li
            }
            //
            vm.setData({
              data: ret.data.data.data,
              list: vm.data.list.concat(ret.data.data.page.list),
              totalRow: ret.data.data.page.totalRow,
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      vm.setData({
        token : wx.getStorageSync('token')
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
      wx.showLoading({
        title: '数据加载中',
      })
      vm.setData({
        list: [],
        pageNo: 1
      })
    vm.init()
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();

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