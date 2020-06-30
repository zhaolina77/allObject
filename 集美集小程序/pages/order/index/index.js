var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    status: -1, //-1:全部 3:待评价 0：待付款 1：待发货 2：待收货 售后/退货 大于3的( 4：退款中 5：退款失败 6：已退款 ) 7-已取消(用户自己取消) 8-已关闭(定时任务关闭订单)
    list: [],
    pageNo: 1,

    list: [],
    totalRow: 0

  },
  init() {
    wx.request({
      url: config.orderList_url, //订单列表
      data: {
        token: vm.data.token,
        pageNo: vm.data.pageNo,
        pageSize: 8,
        status: vm.data.status
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        setTimeout(function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
        console.log(res, '订单列表')
        if (res.data.status == 1) {
          vm.setData({
            list: vm.data.list.concat(res.data.page.list),
            totalRow: res.data.page.totalRow
          })
        }
      },
    })
  },
  change(e) {
    var idx = e.currentTarget.dataset.idx
    vm.setData({
      pageNo: 1,
      list: [],
      status: idx
    })
    vm.init();
  },

  //取消订单
  qxOrder(e) {
    var id = e.currentTarget.dataset.id
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
              id: id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: (res) => {
              console.log(res, '订单列表')
              if (res.data.status == 1) {
                vm.setData({
                  pageNo: 1,
                  list: [],
                  status: 7
                })
                vm.init()
              }
            },
          })
        } else if (ret.cancel) {}
      }
    })
  },
  //订单支付
  wxPay(e) {
    var id = e.currentTarget.dataset.id
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
              id: id
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
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/order/index/index?status=1',
              })
            }, 1000)
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

  //订单详情
  detail(e) {
    var id = e.currentTarget.dataset.id
    var status = e.currentTarget.dataset.status
    if (status == 0) {
      wx.navigateTo({
        url: '/pages/order/daifukuan/daifukuan?id=' + id+'&type==1',
      })
    }else if(status==1){
      wx.navigateTo({
        url: '/pages/order/daifahuo/daifahuo?id=' + id+'&type==1',
      })
    }else if(status==2){
      wx.navigateTo({
        url: '/pages/order/yifahuo/yifahuo?id=' + id+'&type==1',
      })
    }else if(status == 4) {
      wx.navigateTo({
        url: '/pages/order/yituikuan/yituikuan?id=' + id + '&type==1',
      })
    }else if(status==3){
      wx.navigateTo({
        url: '/pages/order/pingjia/pingjia?id=' + id+'&type==1',
      })
    }else if(status==6){
      wx.navigateTo({
        url: '/pages/order/yituikuan/yituikuan?id=' + id+'&type==1',
      })
    }else if(status==7){
      wx.navigateTo({
        url: '/pages/order/yiquxiao/yiquxiao?id=' + id+'&type==1',
      })
    }else if(status==8){
      wx.navigateTo({
        url: '/pages/order/yiguanbi/yiguanbi?id=' + id+'&type==1',
      })
    }
  },

  //确认收货
  getGoods(e){
    var id=e.currentTarget.dataset.id
    wx.showModal({
      title: '确认收货',
      content: '您要确认收货吗？',
      success(ret) {
        console.log(ret)
        if (ret.confirm) {
          wx.request({
            url: config.confirmDelivery_url, //确认收货
            data: {
              token: vm.data.token,
              id:id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: (res) => {
              console.log(res, '订单列表')
              if (res.data.status == 1) {
                vm.setData({
                  pageNo:1,
                  list: [],
                  
                })
                vm.init()
              }
            },
          })
        } else if (ret.cancel) {
         }
      }
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
                vm.setData({
                  pageNo: 1,
                  list: [],
                })
                vm.init()
              }
            },
          })
        } else if (ret.cancel) {}
      }
    })


  },
  pingjia(){
    wx.navigateTo({
      url: '/pages/order/pingjiaZx/pingjiaZx',
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var status=options.status
    vm.setData({
      status:status,
      token: token
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
    vm.init();
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.list.length) {
      return
    }
    ++vm.data.pageNo;
    vm.init()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})