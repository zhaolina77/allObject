// pages/shop/cart/cart.js
var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 160,
    data: [{ content: "1", right: 0 }, { content: "1", right: 0 }],
    token: '',
    len: '',
    unexpired_list: [],//失效商品
    expired_list: [],//未失效商品
    expired_len: 0,
    unexpired_len: 0,
    edit_text: '编辑',
    is_all_select: 0,
    is_edit: true,
    total: ''
  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.expired_list) {
      var item = this.data.expired_list[index]
      item.right = 0
    }
    this.setData({
      expired_list: this.data.expired_list,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.expired_list[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        expired_list: this.data.expired_list
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        expired_list: this.data.expired_list
      })
    }
  },
  drawEnd: function (e) {
    var item = this.data.expired_list[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        expired_list: this.data.expired_list,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        expired_list: this.data.expired_list,
      })
    }
  },

  delItem: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: config.cartDelete_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        cartId:id
      },
      success(res) {
    //    that.setData({ 'list': res.data.data.addressList })
        console.log(res)
        if (res.data.status==1){

          that.init();
        }
      }
    })

  },
  init: function () {

    if (vm.data.token == "") {
      return;
    }

    wx.request({
      url: config.cart_list_url,
      data: {
        token: vm.data.token
      },
      header: {
        "content-type": 'application/json'
      },
      method: "get",
      success: function (ret) {

        console.log(ret)


        var unexpired_list = [], expired_list = [];



        // if (list.length != 0) {

        //   vm.setData({

        //     is_all_select: expired_list[0].is_all_select

        //   });

        // }
        var isall=1;
        ret.data.data.validGoodList.map(function(item){
          isall*=item.is_select;
          item.content="1";
            item.right=0;
          console.log(item.is_select)
        })
        vm.setData({
          unexpired_list: ret.data.data.invalidGoodsList,
          unexpired_len: ret.data.data.invalidGoodsList.length,
          expired_list: ret.data.data.validGoodList,
          expired_len: ret.data.data.validGoodList.length,
          total: ret.data.data.totalPrice,
          is_all_select:isall
        })

        console.log(vm.data.expired_list)
      }
    })

  },

  addcart: function (e) {//购物车增加

    var idx = e.currentTarget.dataset.index;

    wx.request({
      url: config.add_cart_url,
      data: {
        token: vm.data.token,
        cartId: vm.data.expired_list[idx].cart_id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "post",
      success: function (ret) {

        if (ret) {
          vm.init();
        }
      }
    })

  },

  miuscart: function (e) {//购物车减少
    var idx = e.currentTarget.dataset.index;

    if (vm.data.expired_list[idx].goods_num == 1) {

      return;
    }
    wx.request({
      url: config.cutdown_cart_url,
      data: {
        token: vm.data.token,
        cartId: vm.data.expired_list[idx].cart_id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'post',
      success: function (ret) {
        if (ret) {
          vm.init();
        }

      }
    })

  },

  all_select: function () {

    var status = '';

    if (vm.data.is_all_select == 1) {

      status = 0;
    } else {
      status = 1;
    }

    wx.request({
      url: config.all_select_url,
      data: {
        token: vm.data.token,
        tag: status
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "post",
      success: function (ret) {

        if (ret) {
          vm.init();
        }

      }
    })

  },

  one_select: function (e) {
    var idx = e.currentTarget.dataset.index;

    var status = '';

    if (vm.data.expired_list[idx].is_select == 1) {

      status = 0;
    } else {

      status = 1;
    }
    wx.request({
      url: config.one_select_url,
      data: {
        token: vm.data.token,
        cartId: vm.data.expired_list[idx].cart_id,
        isSelect: status
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'post',
      success: function (ret) {
        if (ret) {
          vm.init();
        }
      }
    })
  },

  edit: function () {

    if (vm.data.is_edit) {

      vm.setData({

        is_edit: false,
        edit_text: "完成"

      })



    } else {

      vm.setData({

        is_edit: true,
        edit_text: "编辑"

      });
    }
  },

  del_goods: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: config.del_cart_one_url,
      data: {
        token: vm.data.token,
        id: id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "post",
      success: function (ret) {

        if (ret) {

          vm.init()
        }

      }
    })
  },

  empty_unexpired: function () {//清空失效商品

    wx.request({
      url: config.empty_cart_url,
      data: {
        token: vm.data.token,
        is_enough: 0
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "post",
      success: function (ret) {

        if (ret) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
          vm.init();
        }

      }
    })

  },

  empty_cart: function () {//清空所有商品

    wx.request({
      url: config.empty_cart_url,
      data: {
        token: vm.data.token
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "post",
      success: function (ret) {

        if (ret) {

          vm.init();

        }
      }
    })

  },

  subOrder: function () {

    wx.navigateTo({
      url: '/pages/classify/subOrder/subOrder',
    })
  },

  onLoad: function (options) {
    vm = this;
  },

  onShow: function () {

    vm.setData({

      token: wx.getStorageSync("token")

    })

    vm.init();
  },
  buallbuy:function(){
    var ids=[];
    this.data.expired_list.map(function(item){
      if (item.is_select){
         ids.push(item.cart_id)
       }
    })
    if(ids.length==0){
      return false;
    }
    ids=ids.join(',')
    wx.navigateTo({
      url: '../allbuy/index?cartId='+ids,
    })
  }
})