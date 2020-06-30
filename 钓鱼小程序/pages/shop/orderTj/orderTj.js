var common = require('../../../common.js');
var config = common.getconfig();
var vm = '';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    cartId: '',
    cartIds: [],
    paidPay: '',
    shopList: [],
    address: [],
    paytype: 1,

    id: '',
    specId: '',
    num: '',
    goods: [],
    is_sub: '',
    paidPay: '',
    order_type: 1
  },
  //添加地址
  add_address() {
    wx.navigateTo({
      url: '/pages/mine/addressAdd/addressAdd',
    })
  },
  //选择地址
  change_add() {
    wx.navigateTo({
      url: '/pages/mine/address/address?is_change=1',

    })
  },
  init() {
    if (vm.data.is_sub == 1) {
      var url = config.goodsSubmit_url;
      var param = {
        token: vm.data.token,
        id: vm.data.id,
        specId: vm.data.specId,
        count: vm.data.num
      }
      wx.request({
        url: url,
        data: param,
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        success: ret => {
          console.log(ret);
          vm.setData({
            address: ret.data.data.address,
            goods: ret.data.data.goods,
            paidPay: ret.data.data.goods.total_price
          })
        },
      })
    } else {
      var url = config.cartSubmit_url;
      var param = {
        token: vm.data.token,
        cartId: app.globalData.cart_id
      }
      wx.request({
        url: url,
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        data: param,
        success: ret => {
          console.log(ret);
          vm.setData({
            address: ret.data.data.address,
            shopList: ret.data.data.shopList,
            paidPay: ret.data.data.paidPay
          })
          if (vm.data.order_type == 2) {
            var shopList = ret.data.data.shopList;
            var cartIds = vm.data.cartIds;
            for (var i = 0; i < shopList.length; i++) {
              for (var j = 0; j < shopList[i].goodlist.length; j++) {
                cartIds.push(shopList[i].goodlist[j].cart_id)
              }
            }
            vm.setData({
              cartIds: cartIds
            })
            console.log(app.globalData.cart_id)
          }
        },
      })
    }
  },
  wxPay() {
    var url = '';
    var params = {};
    if (vm.data.order_type == 1) {
      url = config.goods_wx_applet_buy_url;
      params = {
        token: vm.data.token,
        id: vm.data.id,
        specId: vm.data.specId,
        count: vm.data.num,
        addressId: vm.data.address.id
      }
    } else if (vm.data.order_type == 2) {
      url = config.cart_wx_applet_buy_url;
      console.log(vm.data.token, app.globalData.cart_id, vm.data.address.id)
      params = {
        token: vm.data.token,
        cartId: app.globalData.cart_id,
        addressId: vm.data.address.id
      }
    }
    wx.showModal({
      title: '操作提示',
      content: '确定提交该订单吗',
      success(res) {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: url,
            data: params,
            header: {
              'content-type': 'application/json'
            },
            method: 'GET',
            success: function (res) {
              console.log(res)
              vm.wxpayshop(res);
            },
          })
        }
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
          if (res.data.status == 1) {
            wx.showModal({
              title: '支付成功',
              content: '',
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/order/myOrder/myOrder?status=1',
              })
            }, 1000)
          } else {
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/order/myOrder/myOrder?shop_status=0',
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
    var order_type = options.order_type;
    console.log(order_type)
    vm.setData({
      order_type: order_type,
      token: wx.getStorageSync('token'),
      id: options.id,
      specId: options.specId,
      num: options.num,
      is_sub: options.is_sub
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})