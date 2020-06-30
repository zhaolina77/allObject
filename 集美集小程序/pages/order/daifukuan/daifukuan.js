var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:'',
    token: '',
    id: '',
    order: '',
    goods_list: [],
    create_time: '',
    countDownList: []

  },
  init() {
    wx.request({
      url: config.orderDetails_url, //订单详情
      data: {
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {

        console.log(res, '订单详情')
        if (res.data.status == 1) {
          vm.setData({
            order: res.data.data.order,
            goods_list: res.data.data.goods_list,
            create_time: res.data.data.order.create_time
          })
          vm.coutDown();
        }
      },
    })
  },
  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  coutDown() {
    let newTime = new Date().getTime();
    let endTimeList = vm.data.create_time;
    // consol.log(newTime,endTimeList)
    let countDownArr = [];
    let endTime = new Date(vm.data.create_time.replace(/-/g, '/')).getTime() + 1800 * 1000;
    let obj = null;
    if (endTime - newTime > 0) {
      let time = (endTime - newTime) / 1000;
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
      obj = {
        hou: vm.timeFormat(hou),
        min: vm.timeFormat(min),
        sec: vm.timeFormat(sec)
      }
      vm.setData({
        countDownList: obj
      })
      var timer=setTimeout(vm.coutDown, 1000);
    } else { //活动已结束，全部设置为'00'
      wx.showToast({
        title: '订单支付超时，已关闭',
        icon: 'none',
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1 // 返回上一级页面。
        })
      }, 500)
    }

  },

  //取消订单
  qxOrder(e) {
    wx.showModal({
      title: '取消订单',
      content: '确定取消该订单吗？',
      success(ret) {
        console.log(ret)
        if (ret.confirm) {
          wx.request({
            url: config.orderCancel_url, //取消订单
            data: {
              token: vm.data.token,
              id: vm.data.id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: (res) => {
              console.log(res, '订单列表')
              if (res.data.status == 1) {
                let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                let prevPage = pages[pages.length - 2];
                prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                  list: [],
                  pageNo: 1,
                  status: 7
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
  //订单支付
  wxPay(e) {
    wx.showModal({
      title: '订单支付',
      content: '确定支付该订单吗？',
      success(ret) {
        console.log(ret)
        if (ret.confirm) {
          wx.request({
            url: config.myOrderSubmit_url, //订单列表中的未付款的订单提交 微信支付
            data: {
              token: vm.data.token,
              id: vm.data.id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
              console.log(res, '订单列表中的未付款的订单提交 微信支付')
              vm.wxpayshop(res);
            },
          });
        } else if (ret.cancel) {}
      }
    })

  },
  wxpayshop(ret) {
    wx.requestPayment({
      timeStamp: ret.data.data.sortedMap.timeStamp,
      nonceStr: ret.data.data.sortedMap.nonceStr,
      package: ret.data.data.sortedMap.package,
      signType: ret.data.data.sortedMap.signType,
      paySign: ret.data.data.sortedMap.paySign,
      success: function (res) {
        console.log(res)
        if (res) {
          if (res.data.data.status == 1) {
            wx.showModal({
              title: '支付成功',
              content: '',
            })
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[pages.length - 2];
            prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
              list: [],
              pageNo: 1,
              status: 1
            })
            prevPage.init()
            wx.navigateBack({
              delta: 1 // 返回上一级页面。
            })

          } else {
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/order/index/index?status=0',
              })
            }, 1000)
          }
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var id = options.id
    vm.setData({
      id: id,
      token: token
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
    clearInterval(this.data.timer);

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