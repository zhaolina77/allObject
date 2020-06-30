var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token:'',
        id:'',
        order:'',
        goods_list:[]


    },
    init(){
        wx.request({
            url: config.orderDetails_url, //订单详情
            data: {
              id:vm.data.id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: (res) => {
             
              console.log(res, '订单详情')
              if (res.data.status == 1) {
                vm.setData({
                  order:res.data.data.order,
                  goods_list:res.data.data.goods_list
                })
              }
            },
          })
    },
    //删除订单
  delOrder(e) {
    var id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除订单',
      content: '确定要删除订单吗？',
      success(ret) {
        console.log(ret)
        if (ret.confirm) {
          wx.request({
            url: config.delOrder_url, //删除订单
            data: {
              token: vm.data.token,
              id: id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: (res) => {
              console.log(res, '删除订单')
              if (res.data.status == 1) {
                let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                let prevPage = pages[pages.length - 2];
                prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                  list: [],
                  pageNo: 1,
                  status:-1
                })
                prevPage.init()
                wx.navigateBack({
                    delta: 1 // 返回上一级页面。
                  })
              }
            },
          })
        } else if (ret.cancel) {}
      }
    })


  },

    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        vm=this;
        var token=wx.getStorageSync('token')
        var id=options.id
        vm.setData({
            id:id,
            token:token
        })
        vm.init()

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