var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    id: 11,
    list: [],
    serviceList: [],
    shop: {},
    evaluateCount: 0,
    evaluateList: [],
    show: false,
    shows: false,
    cartCount: 0,
    iscoll: 0,
    open_type: 1,
    add_type: '',



    //规格
    tag: '',
    o_idx: 0,
    t_idx: 0,
    th_idx: 0,
    t_list: [],
    th_list: [],
    data: [],
    shop_id: '',

    info: [], //选择以后给商品旁边展示的数据
    spec_id: '', //规格id
    num: 1,
    state: 0
  },
  //立即购买
  payment() {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    }
    if (vm.data.open_type != 1) {
      wx.showToast({
        title: '个人认证才可购买商品',
        icon: 'none'
      })
      return;
    }
    var spec_id = '';
    console.log(vm.data.info)
    if (vm.data.info.spec_id) {
      spec_id = vm.data.info.spec_id
    } else {
      spec_id = 0;
    }
    wx.navigateTo({
      url: '/pages/shop/orderTj/orderTj?id=' + vm.data.id + '&is_sub=1&num=' + vm.data.num + '&specId=' + spec_id + '&order_type=1',
    })
  },
  //是否认证
  is_open() {
    wx.request({
      url: config.is_exhibition_url,
      data: {
        token: vm.data.token
      },
      header: {
        "content-type": "application/json"
      },
      method: 'GET',
      success: function (ret) {
        if (ret.data.status == 1) {
          vm.setData({
            open_type: ret.data.data.is_exhibition
          })
        } else {
          wx.showToast({
            title: ret.data.msg,
            icon: "none",
            duration: 1000,
          })
        }
      }
    })
  },
  spec() {
    wx.request({
      url: config.goodSpec_url,
      data: {
        id: vm.data.id,
      },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: ret => {
        console.log(ret);
        vm.setData({
          data: ret.data,
          tag: ret.data.tag, //发给详情页面，没有规格不显示规格选择
        })
        if (ret.data.tag) {
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
        }

        vm.setData({
          t_list,
          th_list,
        })
        setTimeout(function () {
          vm.is_spec();
        }, 500)
      }
    })
  },
  is_spec: function () { //这一步是选择
    if (vm.data.data.tag == 0) {
      vm.setData({
        info: vm.data.data
      })

      return;
    } else {
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
  },
  one_spec(e) { //一级规格
    vm.setData({
      o_idx: e.currentTarget.dataset.id, //点击以后把一级规格下标赋值，用来做规格展示（下标默认为0，点击以后改变默认的值）+
      t_idx: 0,
      th_idx: 0
    })
    vm.spec();
  },
  t_spec(e) { //二级规格
    vm.setData({
      t_idx: e.currentTarget.dataset.id, //点击以后把一级规格下标赋值，用来做规格展示（下标默认为0，点击以后改变默认的值）+
      th_idx: 0
    })
    vm.spec();
  },
  th_spec(e) { //三级规格
    vm.setData({
      th_idx: e.currentTarget.dataset.id, //点击以后把一级规格下标赋值，用来做规格展示（下标默认为0，点击以后改变默认的值）+
    })
    vm.spec();
  },
  fuwu() {
    vm.setData({
      shows: false
    })

  },
  //数量加减
  miusNum() {
    if (vm.data.num == 1) {
      return;
    }
    vm.setData({
      num: vm.data.num - 1
    })
  },
  addNum() {
    if (vm.data.num >= vm.data.info.stocknum) {
      wx.showToast({
        title: '库存不足',
        icon: 'none'
      })
      return;
    }
    vm.setData({
      num: vm.data.num + 1
    })
  },
  //加入购物车小
  add_cart() {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    }
    if (vm.data.open_type != 1) {
      wx.showToast({
        title: '个人认证才可加入购物车',
        icon: 'none'
      })
      return;
    }
    var spec_id = '';
    if (!vm.data.info.spec_id) {
      spec_id = 0;
    } else {
      spec_id = vm.data.info.spec_id
    }
    wx.request({
      url: config.cartAdd_url,
      data: {
        token: vm.data.token,
        id: vm.data.id,
        specId: spec_id,
        num: vm.data.num,
        shopId: vm.data.list.shop_id
      },
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: ret => {
        console.log(ret);
        wx.showToast({
          title: ret.data.msg,
          icon: 'none'
        })
        vm.setData({
          show: false
        })
        vm.cart();
        if (vm.data.add_type == 1) {
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.cartCount();
        }

      }
    })
  },
  init() {
    wx.request({
      url: config.goodDetail_url,
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'get',
      success: function (res) {
        console.log(res)
        WxParse.wxParse('article', 'html', res.data.data.good.content, vm, 5)
        vm.setData({
          list: res.data.data.good,
          serviceList: res.data.data.serviceList,
          shop: res.data.data.shop,
          evaluateCount: res.data.data.evaluateCount,
          evaluateList: res.data.data.evaluateList,
          isColl: res.data.data.isColl,
        })
      },
    })

  },
  //进入购物车
  cart_list() {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    }
    wx.navigateTo({
      url: '/pages/shop/cart/cart',
    })
  },
  //收藏
  toremark() {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    }
    wx.request({
      url: config.goodColl_url,
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'get',
      success: function (res) {
        console.log(res)
        var isColl = vm.data.isColl;
        if (isColl == 1) {
          isColl = 0;
        } else {
          isColl = 1;
        }
        vm.setData({
          isColl
        })
      },
    })
  },
  // 规格
  guige(e) {
    console.log(vm.data.info)
    vm.setData({
      show: true
    })
  },
  //服务
  fuwu(e) {
    vm.setData({
      shows: true
    })
  },
  // 关闭规格
  close() {
    vm.setData({
      show: false
    })
  },
  // 关闭服务
  close1() {
    vm.setData({
      shows: false
    })
  },
  // 进入评论
  pinglun(e) {
    wx.navigateTo({
      url: '../quanbupingjia/quanbupingjia?id=' + e.currentTarget.dataset.id,
    })
  },
  //进入商铺
  shop(e) {
    wx.navigateTo({
      url: '../shangjia/shangjia?id=' + e.currentTarget.dataset.id,
    })
  },
  cart() {
    wx.request({
      url: config.cartNum_url,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: {
        token: vm.data.token
      },
      success: ret => {
        vm.setData({
          cartCount: ret.data.data.cartCount
        })
      },
    })
  },
  //图片预加载
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var imglist = e.target.dataset.list;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist // 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token');
    var id = options.id;
    var add_type = options.add_type;
    // console.log(id)
    vm.setData({
      add_type: add_type,
      id: id,
      token: token
    })
    vm.init();
    vm.cart();
    vm.spec();
    vm.is_open();

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