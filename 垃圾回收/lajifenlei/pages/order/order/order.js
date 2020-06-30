// pages/shouye/index/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:-1,
    token:"",
    pageNo:1,
    list:[],
    qx:0,
    qxId:0,
    sc:0,
    scId:0,
  },
  change(e){
    vm.setData({
      status:e.currentTarget.dataset.index,
      list:[],
      pageNo:1
    })
    vm.order()
  },
  detail(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order/orderDetail/orderDetail?id='+id,
    })
  },
  order() {
    wx.request({
      url: config.orderList_url,
      data: {
        status:vm.data.status,
        token:vm.data.token,
        pageNo:vm.data.pageNo,
        pageSize:8
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          setTimeout(function(){
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }, 1500);
          vm.setData({
            list:vm.data.list.concat(res.data.page.list),
            totalRow: res.data.page.totalRow
          })
        }
      },
    });
  },
  // 取消订单
  qxOrder(e){
    console.log()
    var id=e.currentTarget.dataset.id;
    vm.setData({
      qxId:id,
      qx:1
    })
  },
  qxN(){
    vm.setData({
      qx:0
    })
  },
  qxY(){
    
    wx.request({
      url: config.cancelOrder_url,
      data: {
        id:vm.data.qxId
      },
      success: (res) => {
        console.log(res)
        vm.setData({
          qx:0
        })
        if(res.data.status==1){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          vm.setData({
            list:[],
           pageNo:1,
           status:4
         })
          vm.order()
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    })
  },

  // 重新发布
  again(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/fabu/fabuDetail/fabuDetail?&type=2&fbid='+e.currentTarget.dataset.id,
    })


  },
// 删除订单
scOrder(e){
  console.log()
  var id=e.currentTarget.dataset.id;
  vm.setData({
    scId:id,
    sc:1
  })
},
scN(){
  vm.setData({
    sc:0
  })
},
scY(){
  vm.setData({
    list:[],
   pageNo:1
 })
  wx.request({
    url: config.delOrder_url,
    data: {
      id:vm.data.scId
    },
    success: (res) => {
      // console.log(res)
      vm.setData({
        sc:0
      })
      if(res.data.status==1){
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        vm.order()
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
    },
  })
},
// 联系对方
lianxi(e){
  var phone=e.currentTarget.dataset.mobile
  wx.makePhoneCall({
    phoneNumber:phone,
  })
},
// 完成
finish(e){
  var id=e.currentTarget.dataset.id
  wx.navigateTo({
    url: '/pages/order/finish/finish?id='+id+'&type=1',
  })
},
// 评价
pingjia(e){
    wx.navigateTo({
      url:'/pages/order/pingjia/pingjia?id='+e.currentTarget.dataset.id+"&type=1",
    })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      vm=this;
      
      var info=options.index

      vm.setData({
        status:info,
        token: wx.getStorageSync('token')
      })
      vm.order()

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
    var ordertype=app.globalData.ordertype
    console.log(ordertype)
      if(ordertype==1){
        vm.setData({
          pageNo:1,
          list:[],
        })
        vm.order()
      }
      app.globalData.ordertype=0

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
    this.setData({
      list: [],
      pageNo: 1
    })
    this.order()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.list.length) {
      return;
    }
    ++vm.data.pageNo;
    vm.order();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})