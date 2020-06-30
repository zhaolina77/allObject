var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    type: '',

    //从购物车提交订单
    cart_id: '',
    data: '',
    list: [],
    //从商品详情提交订单
    state: '',
    id: '',
    spec_id: '',
    count: '',
    couponId: 0,
    goods: '',
    account_id: 0,
    coupon: '',
    is_cart:0,




    //地址信息
    address: null,
    name: '',
    mobile: '',
    address_id: 5,
    full_address: '',
    address_info: '',


    couponList:[],//优惠券列表
    youhui:0,
    couponId:0,
    total_price:'',
    all_price:"",
    meet_price:'0',
    price:'0'
  },
  // 优惠弹窗
  youhui() {
    vm.setData({
      youhui: 1
    })
  },
  yh() {
    vm.setData({
      youhui: 0
    })
  },
  //优惠券选择
  radioChange(e) {
    console.log(e)
    var couponId = e.detail.value
    vm.setData({
      couponId: couponId
    })
    var couponList = vm.data.couponList
    if (couponId == 0) {
      vm.setData({
        couponId: '',
        total_price: vm.data.all_price
      })
    } else {
      for (let index = 0; index < couponList.length; index++) {
        if (couponList[index].id == couponId) {
          vm.setData({
            meet_price: couponList[index].meet_price,
            price: couponList[index].price,
            total_price: vm.data.all_price -couponList[index].price,
          })
        }
      }
    }
  },
  init() {
    // console.log(vm.data.id)
    if (vm.data.type == 1) {
      wx.request({
        url: config.cartSubmit_url, //点击购物车提交到确认订单页面
        data: {
          token: vm.data.token,
          cart_id: vm.data.cart_id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res, '点击购物车提交到确认订单页面');
          if (res.data.status == 1) {
            var address = res.data.data.address
            vm.setData({
              all_price: res.data.data.total_price,
              total_price: res.data.data.total_price,
              data: res.data.data,
              address: res.data.data.address,
              list: res.data.data.cart_list
            })
            if (address != null && address != '') {
              vm.setData({
                address_info: address.address_info,
                full_address: address.full_address,
                address_id: address.id,
                mobile: address.mobile,
                name: address.name
              })
            }

          }
        },
      });
    } else if (vm.data.type == 2) {
      console.log(vm.data.state)
      wx.request({
        url: config.goodsSubmit_url, //立即购买到确认订单页面
        data: {
          token: vm.data.token,
          state: vm.data.state,
          id: vm.data.id,
          spec_id: vm.data.spec_id,
          count: vm.data.count,
          couponId: vm.data.couponId,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res, '立即购买到确认订单页面');
          if (res.data.status == 1) {
            var address = res.data.data.address
            vm.setData({
              all_price: res.data.data.goods.total_price,
              total_price: res.data.data.goods.total_price,
              data: res.data.data.goods,
              address: res.data.data.address,
              goods: res.data.data.goods,
              coupon: res.data.data.coupon,
              couponList: res.data.data.couponList
            })

            // console.log(vm.data.coupon)
            if (address != null && address != '') {
              vm.setData({
                address_info: address.address_info,
                full_address: address.full_address,
                address_id: address.id,
                mobile: address.mobile,
                name: address.name
              })
            }
          }
        },
      });
    } else if (vm.data.type == 3) {
      wx.request({
        url: config.goodsSubmit_url, //
        data: {

          token: vm.data.token,
          state: 3,
          id: vm.data.id,
          spec_id: vm.data.spec_id,
          count: vm.data.count,
          couponId: vm.data.couponId,

          id: vm.data.id,
          accountId: vm.data.account_id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res, '商品详情中点击去拼团');
          if (res.data.status == 1) {
            var address = res.data.data.address
            vm.setData({
              all_price: res.data.data.total_price,
              total_price: res.data.data.total_price,
              data: res.data.data.goods,
              address: res.data.data.address,
              goods: res.data.data.goods
            })
            if (address != null && address != '') {
              vm.setData({
                address_info: address.address_info,
                full_address: address.full_address,
                address_id: address.id,
                mobile: address.mobile,
                name: address.name
              })
            }
          }
        },
      });

    }
  },
  addressAdd() {
    wx.navigateTo({
      url: '/pages/mine/address/address?type=2',
    })
  },

  orderTj() {
    console.log(vm.data.state)
    if (!vm.data.address) {
      wx.showToast({
        title: '请先添加地址',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '提交订单',
      content: '确定提交订单吗？',
      success(ret) {
        console.log(ret)
        if (ret.confirm) {
          if (vm.data.type == 2) {
            wx.request({
              url: config.goodsOrderSubmit_url, //立即提交到确认订单微信支付
              data: {
                token: vm.data.token,
                id: vm.data.id,
                spec_id: vm.data.spec_id,
                count: vm.data.count,
                address_id: vm.data.address_id,
                state: vm.data.state,
                account_id: vm.data.account_id, //团购发起人id
                couponId: vm.data.couponId
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log(res, '立即提交到确认订单微信支付')
                if (res.data.status == 1) {
                  vm.wxpayshop(res);
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                  })
                }

              },
            });

          }else if(vm.data.type == 3){
            wx.request({
              url: config.goodsOrderSubmit_url, //立即提交到确认订单微信支付
              data: {
                token: vm.data.token,
                id: vm.data.id,
                spec_id: vm.data.spec_id,
                count: 1,
                address_id: vm.data.address_id,
                state: 3,
                account_id: vm.data.account_id, //团购发起人id
                couponId: vm.data.couponId
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log(res, '立即提交到确认订单微信支付')
                if (res.data.status == 1) {
                  vm.wxpayshop(res);
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                  })
                }

              },
            });


          }else{
            wx.request({
              url: config.orderSubmit_url, //商城中购物车的商品 订单提交 微信支付
              data: {
                token: vm.data.token,
                address_id: vm.data.address_id,
                couponId: vm.data.couponId,
                cart_id: vm.data.cart_id
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log(res, '商城中购物车的商品 订单提交 微信支付')
                if(res.data.status==1){
                  vm.wxpayshop(res);
                }else{
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                  })
                }
              },
            });
          }
        } else if (ret.cancel) {



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
        wx.showToast({
          title: '支付成功',
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/order/index/index?status=1',
          })
        }, 500)
      },
      fail: function (res) {
        console.log(res)
          wx.navigateTo({
            url: '/pages/order/index/index?status=0',
          })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var type = options.type
    var is_cart = options.is_cart
    vm.setData({
      type: type,
      token: token,
      is_cart: is_cart
    })

    if (type == 1) {
      var cart_id = options.cartId
      vm.setData({
        cart_id: cart_id,
      })
    } else if (type == 2) {
      var state = options.state;
      var id = options.id;
      var spec_id = options.spec_id;
      // console.log(spec_id)
      var count = options.count;
      var couponId = options.couponId
      vm.setData({
        state: state,
        id: id,
        spec_id: spec_id,
        count: count,
        couponId: couponId
      })
      console.log(vm.data.state)
    } else if (type == 3) {
      var account_id = options.account_id
      var id = options.id;

      vm.setData({
        id: id,
        type: type,
        account_id: account_id
      })
    }





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