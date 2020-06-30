var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    id: '',
    good: '',
    cart_count: '',
    youhui: 0,
    fuwu: 0,
    data_sp: '',
    loading: true,

    couponList: '', //商品优惠券
    couponId: 0,
    coupon: '',

    //规格
    data: [],
    tag: '',
    guige: 0,
    guige_list: '',
    goods_num: 1,
    spec_id: '',
    o_idx: 0,
    t_idx: 0,
    th_idx: 0,
    t_list: [],
    th_list: [],

    //商品服务
    serviceList: [],

    //评价
    evaluate: '',


    price: ''


  },

  init() {
    wx.request({
      url: config.goodsDetails_url, //商品详情
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品详情');
        if (res.data.status == 1) {
          if (res.data.data.good.content) {
            WxParse.wxParse('article', 'html', res.data.data.good.content, vm, 5)
          }
          vm.setData({
            data_sp: res.data.data,
            good: res.data.data.good,
            cart_count: res.data.data.cart_count,
            couponList: res.data.data.couponList,
            evaluate: res.data.data.evaluate,
            loading: false,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',

          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1, // 返回上一级页面。
            })
          }, 1000)
        }
      },
    });
  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  goods_guige() {
    wx.request({
      url: config.goodsSpec_url, //商品规格
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品规格');
        vm.setData({
          guige_list: res.data,
          data: res.data,
          tag: res.data.tag, //没有规格不显示规格选择
        })
        if (res.data.tag != 0) {
          console.log('该商品有规格')
          var t_list = [];
          var th_list = [];
          if (vm.data.data.one[vm.data.o_idx].two) {
            t_list = vm.data.data.one[vm.data.o_idx].two;
            if (vm.data.data.one[vm.data.o_idx].two.list.length > 0) {
              if (vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three) {
                th_list = vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three;
              }
            }
          }
          vm.setData({
            t_list,
            th_list
          })


        }
        setTimeout(function () {
          vm.guige_select();
        }, 500)

      },
    });

  },
  pinglun() {
    console.log(vm.data.id)
    wx.navigateTo({
      url: '/pages/shop/allPj/allPj?id=' + vm.data.id,
    })
  },
  guige_select() {
    if (vm.data.data.tag == 0) {
      if (vm.data.good.member_price > 0) {
        vm.setData({
          price: vm.data.good.member_price
        })
      } else {
        vm.setData({
          price: vm.data.good.market_price
        })
      }
      vm.setData({
        info: vm.data.data //无商品规格
      })
      return
    } else {
      //有商品规格
      var info = [];
      if (vm.data.data.one.length > 0) {
        if (vm.data.data.one[vm.data.o_idx].two) {
          if (vm.data.data.one[vm.data.o_idx].two.list.length > 0) {
            if (vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three) {
              if (vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three.list.length > 0) {
                info = vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three.list[vm.data.th_idx]
              } else {
                info = vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx]
              }
            } else {
              info = vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx]
            }
          } else {
            info = vm.data.data.one[vm.data.o_idx]
          }
        } else {
          info = vm.data.data.one[vm.data.o_idx]
        }
      }
    }
    vm.setData({
      info: info
    })
    if (vm.data.info.member_price > 0) {
      vm.setData({
        price: vm.data.info.member_price
      })
    } else {
      vm.setData({
        price: vm.data.info.market_price
      })
    }

  },
  one_spec(e) { //一级规格
    vm.setData({
      o_idx: e.currentTarget.dataset.id, //点击以后把一级规格下标赋值，用来做规格展示（下标默认为0，点击以后改变默认的值）
      t_idx: 0,
      th_idx: 0
    })
    vm.guige_select();
  },
  t_spec(e) { //二级规格
    vm.setData({
      t_idx: e.currentTarget.dataset.id, //点击以后把二级规格下标赋值，用来做规格展示（下标默认为0，点击以后改变默认的值）
      th_idx: 0
    })
    vm.guige_select();
  },
  th_spec(e) { //三级规格
    vm.setData({
      th_idx: e.currentTarget.dataset.id, //点击以后把三级规格下标赋值，用来做规格展示（下标默认为0，点击以后改变默认的值）
    })
    vm.guige_select();
  },
  goods_fuwu() {
    wx.request({
      url: config.goodsService_url, //商品服务
      data: {
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品服务');
        if (res.data.status == 1) {
          vm.setData({
            serviceList: res.data.serviceList
          })
        }
      },
    });

  },

  // 商品数量加
  goods_add() {
    var goods_num = vm.data.goods_num
    if (goods_num < vm.data.info.stocknum) {
      goods_num++;
    } else {
      wx.showToast({
        title: '该商品库存不足~',
        icon: 'none',
      })
    }
    vm.setData({
      goods_num: goods_num
    })
  },
  // 商品数量减
  goods_minus() {
    var goods_num = vm.data.goods_num
    if (goods_num > 1) {
      goods_num--;
    } else {
      wx.showToast({
        title: '商品数量不能再少了~',
        icon: 'none',
      })
    }
    vm.setData({
      goods_num: goods_num
    })
  },
  // 加入购物车
  addCart() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login?type=3',
      })
      return;
    }
    var spec_id = '';
    if (vm.data.data.tag == 1) {
      spec_id = vm.data.info.spec_id
    } else {
      spec_id = 0;
    }
    console.log(spec_id)
    wx.request({
      url: config.cartAdd_url,
      data: {
        token: vm.data.token,
        id: vm.data.id,
        spec_id: spec_id,
        num: vm.data.goods_num
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          vm.setData({
            guige: 0
          })
          var num = vm.data.cart_count + vm.data.goods_num
          vm.setData({
            cart_count: num
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
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
        coupon: ''
      })
    } else {
      for (let index = 0; index < couponList.length; index++) {
        if (couponList[index].id == couponId) {
          vm.setData({
            coupon: couponList[index]
          })
        }
      }
    }
  },
  //商品收藏
  shoucang() {
    wx.request({
      url: config.goodsColl_url, //商品收藏
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品收藏');
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          var data_sp = vm.data.data_sp
          if (data_sp.is_coll == 0) {
            data_sp.is_coll = 1
          } else {
            data_sp.is_coll = 0
          }
          vm.setData({
            data_sp
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });


  },
  //立即购买
  buy() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login?type=3',
      })
      return;
    }
    var spec_id = '';
    if (vm.data.data.tag == 1) {
      spec_id = vm.data.info.spec_id
    } else {
      spec_id = 0;
    }

    console.log(vm.data.id)
    wx.navigateTo({
      url: '/pages/shop/orderTj/orderTj?type=2' + '&state=0' + '&id=' + vm.data.id + '&spec_id=' + spec_id + '&count=' + vm.data.goods_num + '&couponId=' + vm.data.couponId,
    })
  },

  cart() {
    wx.switchTab({
      url: '/pages/index/cart/cart',
    })
  },
  // 优惠弹窗
  youhui() {
    vm.setData({
      youhui: 1
    })
  },
  closeYh() {
    vm.setData({
      youhui: 0
    })
  },
  yh() {
    vm.setData({
      youhui: 0
    })
  },
  //规格弹窗
  guige() {
    vm.setData({
      guige: 1
    })
  },
  closeGg() {
    vm.setData({
      guige: 0
    })
  },

  addcar() {
    // if (!wx.getStorageSync('token')) {
    //   wx.showToast({
    //     title: '请登录',
    //     icon: 'none',
    //   })
    //   return
    // }
    vm.setData({
      guige: 1
    })

  },
  // 服务弹窗
  fuwu() {
    vm.setData({
      fuwu: 1
    })
  },
  closeFw() {
    vm.setData({
      fuwu: 0
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

      vm.init();
      vm.goods_guige();
      vm.goods_fuwu();






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
    if (this.data.token=='') {
      var token = wx.getStorageSync('token')
      vm.setData({
        token: token
      })
    }

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