// pages/my/order/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    status: -1,
    pageNo: 1,
    pageSize: 5,
    list:[],
    totalPage:0,
    orderNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    this.setData({
      'token': token
    })
    // this.getorder()
  },
  getorder:function(){
    var that = this;
    console.log(this.data.pageNo)
    wx.request({
      url: config.myOrderList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        status: this.data.status,
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      },
      success(res) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        that.setData({ 
          'list': that.data.list.concat(res.data.data.page.list),
          totalPage: res.data.data.page.totalPage,
          orderNum: res.data.data.orderNum
           })
        console.log(res)
      }
    })
  },
  tab: function (event) {
    var that = this;
    var idx = event.currentTarget.dataset.idx;
    this.setData({
      status: idx,
      list: [],
      pageNo: 1
    });
    this.getorder();

  },
  pay: function (event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    wx.request({
      url: config.noPayOrder_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        id: id,
      },
      success(res) {
        if (res.data.status == 1) {
          wx.requestPayment({
            timeStamp: res.data.data.sortedMap.timeStamp,
            nonceStr: res.data.data.sortedMap.nonceStr,
            package: res.data.data.sortedMap.package,
            signType: 'MD5',
            paySign: res.data.data.sortedMap.paySign,
            success(res) {
              if (res.errMsg == 'requestPayment:ok') {  //支付成功

                wx.showToast({
                  title: '支付成功',
                })
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../../my/order/index',
                  })
                }, 1000)
              }
            },
            fail(res) {
              if (res.errMsg == 'requestPayment:fail cancel') {  //支付失败
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../../my/order/index',
                  })
                }, 1000)
              }
            }
          })
          console.log(res)
        }
        else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })  
  },
  cancel:function(event){
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: config.orderCancel_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        id:id
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        if (res.data.status==1){
          that.setData({
            list: [],
            pageNo: 1
          })
          that.getorder();
        }
      }
    })
  },
  refund: function (event){
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: config.refundApply_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        id: id
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        if (res.data.status == 1) {
          that.setData({
            list: [],
            pageNo: 1
          })
          that.getorder();
        }
      }
    })
  },
  confirm: function (event){
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: config.confirmDelivery_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        id: id
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        if (res.data.status == 1) {
          that.setData({
            list: [],
            pageNo: 1
          })
          that.getorder();
        }
      }
    })
  },
  delorder:function(event){
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: config.delOrder_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        orderId: id
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        if (res.data.status == 1) {
          that.setData({
            list: [],
            pageNo: 1
          })
          that.getorder();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPullDownRefresh: function () {
    console.log(89898989)
    wx.showLoading({
      title: '数据加载中',
    })
    this.setData({
      list:[],
      pageNo:1
    })
    this.getorder()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    // 隐藏导航栏加载框
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      list: [],
      pageNo: 1
    })
    this.getorder();
  },
  nothing:function(){

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
 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pageNo < this.data.totalPage){
      var page = this.data.pageNo + 1;
      console.log(5)
      this.setData({
        pageNo: page
      })
      this.getorder();
    }
    else {
      wx.showToast({
        title: '然后就没有然后了',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  todetail:function(event){
    var id = event.currentTarget.dataset.id;
    var status = event.currentTarget.dataset.status;
    console.log(status)
    if (status==6){
      wx.navigateTo({
        url: '../refunddetails/index?id=' + id+'&type=1',
      })
      return 
    }
    else {
      if (status == 8) {
        wx.navigateTo({
          url: '../refunddetails/index?id=' + id + '&type=0',
        })
        return
      }
      else {
        wx.navigateTo({
          url: '../orderdetials/index?id=' + id,
        })
      }
    }
  },
  addpingjia:function(event){

    wx.navigateTo({
      url: '../pingjia/index',
    })
  }
})