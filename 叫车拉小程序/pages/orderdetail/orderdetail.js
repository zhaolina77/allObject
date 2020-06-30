// pages/orderdetail/orderdetail.js
var common = require("../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:0,
    carDetails:'',
    couponPrice:0,
    distance:0,
    dll:'',
    driver:'',
    chargesList: [],
    morePrice:'',
    more_distance:0,
    terrace_discounts:'',
    order:'',
    outAddress:'',
    putAddress:'',
    time:0,
    markers: [{
      iconPath: "/image/car.png",
      id: 0,
      latitude: 34.229507,
      longitude: 108.891136,
      width: 50,
      height: 50,
      callout:{
        content:'司机正在火速赶来',
        padding:20,
        display: 'ALWAYS'
      }
    }]
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id,
      token: wx.getStorageSync('token'),
    })

  //  this.getdata()
  },
  getdata:function(){
    var that = this;
    wx.request({
      url: config.orderDetails_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        orderId:this.data.id
      },

      success(res) {
        // wx.hideNavigationBarLoading();
        // wx.hideLoading();
        // // 停止下拉动作
        // wx.stopPullDownRefresh();
        console.log(res);
        if(res.data.status==1){
          var data = res.data.data;
          that.setData({

            carDetails: data.carDetails,
            couponPrice: data.couponPrice,
            distance: data.distance,
            dll: data.dll,
            driver: data.driver,
            morePrice: data.morePrice,
            more_distance: data.more_distance,
            order: data.order,
            outAddress: data.outAddress,
            putAddress: data.putAddress,
            time: data.time,
            terrace_discounts: data.order.terrace_discounts,
            chargesList:data.chargesList,
          })
        }
        console.log(res)

      }
    })
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
    this.getdata()
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

  },
  cancel: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    var that = this;
    wx.request({
      url: config.cancelOrder_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        orderId: this.data.id
      },

      success(res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
          })
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            list: [],
            pageNo: 1
          });
          prevPage.getorder();
          wx.navigateBack({
            delta: 1
          })
        }

      }
    })
  },
  del:function(){   //删除订单

    var that = this;
    wx.request({
      url: config.delOrder_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        orderId: this.data.id
      },

      success(res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
          })
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.setData({
            list: [],
            pageNo: 1
          });
          prevPage.getorder();
          wx.navigateBack({
            delta: 1
          })
          
        }

      }
    })
  },
  confirm: function (e) {
    var that = this;
    wx.request({
      url: config.finishOrder_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        orderId: this.data.id
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

                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];  //上一个页面
                prevPage.setData({
                  list: [],
                  pageNo: 1
                });
                prevPage.getorder();
                wx.navigateBack({
                  delta: 1
                })

              }
            },
            fail(res) {
              if (res.errMsg == 'requestPayment:fail cancel') {  //支付失败
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })

              }
            }
          })
          console.log(res)
        }


      }
    })
  },
  call: function (e) {  //联系
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  evaluat: function (e) {
    var driver = this.data.driver;
    wx.navigateTo({
      url: '../evaluat/evaluat?id=' + this.data.id + '&head=' + driver.head_portrait + '&cnumber=' + driver.plate_number + '&name=' + driver.name+'&type=orderdetail',
    })
  },
  complain: function (e) {
    var driver = this.data.driver;
    wx.navigateTo({
      url: '../complain/complain?id=' + this.data.id + '&head=' + driver.head_portrait + '&cnumber=' + driver.plate_number + '&name=' + driver.name + '&type=orderdetail',
    })
  },
  rebuy: function (e) {

    wx.navigateTo({
      url: '../re_confirmeInfo/re_confirmeInfo?id=' + this.data.id
    })
  }
})