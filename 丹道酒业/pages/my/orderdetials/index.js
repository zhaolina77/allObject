// pages/my/orderdetials/index.js
var common = require("../../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:wx.getStorageSync('token'),
    id:'',
    address:'',
    goodsList:'',
    order:'',
    club:'',
    time:15,
    endtime:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token'),
    })
      this.setData({
        id:options.id
      })
    this.getdata();
  },
  getdata:function(){
    var that = this;
    console.log(this.data.id)
    wx.request({
      url: config.orderDetails_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        id: this.data.id
      },
      success(res) {
        that.setData({ 
          'address': res.data.data.address,
          'goodsList': res.data.data.goodsList,
          'order': res.data.data.order,
          'club': res.data.data.club
           })
        console.log(res)
        if (that.data.order.status==0){
          var time = that.data.order.create_time;
          var date = new Date(time).getTime() + 15 * 60 * 1000;
          that.setData({
            endtime: date
          })
          var timer = setInterval(function () {
            var now = new Date().getTime();
            if (now < that.data.endtime) {
              that.setData({
                time: Math.floor((that.data.endtime - now) / 1000 / 60)
              })
            }
            else {
              clearInterval(timer)
            }
          }, 1000)
        }
      
      }
    })
  },
  pay: function (event) {
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
  cancel: function (event) {
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: config.orderCancel_url, //仅为示例，并非真实的接口地址
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

          that.getdata();
        }
      }
    })
  },
  refund: function (event) {
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

          that.getdata();
        }
      }
    })
  },
  confirm: function (event) {
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

          that.getdata();
        }
      }
    })
  },
  delorder: function (event) {
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

          that.getdata();
        }
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