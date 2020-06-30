var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      delBtnWidth: 160,
      data: [],
      token: '',
      totalPrice: 0,
      state:'1'
    },
    // 按钮的选中状态
    selectBox: function (e) {
      var index = e.currentTarget.dataset.index;
      var tindex = e.currentTarget.dataset.tindex;
      var data = vm.data.data;
      // console.log(data[tindex].cart[index].is_select); 
      // console.log(tindex);
      if (data[tindex].cart[index].is_select == 1) {
        data[tindex].cart[index].is_select = 0;
      } else {
        data[tindex].cart[index].is_select = 1;
      }
      vm.setData({
        data: data
      });
      //修改数据表状态值
      vm.updateSelected(data[tindex].cart[index].cart_id, data[tindex].cart[index].is_select);
    },

    //修改数据表状态值
    updateSelected: function (goodsId, selected) {
      wx.request({
        url: config.checkCart_url,
        method: "post",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          token: vm.data.token,
          cartId: goodsId,
          isSelect: selected
        },
        success: ret => {
          // console.log(ret);
          vm.init();
        }
      })

    },

    //全选反选
    checkAll: function () {
      var state = vm.data.state;
      if(state==1){
        vm.setData({
          state:0
        })
      }else{
        vm.setData({
          state: 1
        })
      }
      vm.updateCheckAll();
    },
    //全选反选操作数据表
    updateCheckAll: function () {
      wx.request({
        url: config.selectCart_url,
        method: "post",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          token: vm.data.token,
          tag: vm.data.state
        },
        success: ret => {
          // console.log(ret);
          vm.init();
        }
      })
    },

    //全选反选操作数据表   单个商铺下全选
    shopall: function (e) {
      var index = e.currentTarget.dataset.idx;
      var shop_id = e.currentTarget.dataset.shop_id;
      var state = '';
      console.log(index);
      if (vm.data.data[index].state == 0) {
        state = 1
      } else {
        state = 0;
      }
      var cart_id = [];
      var list = vm.data.data[index].cart;
      for (var i = 0; i < list.length; i++) {
        cart_id.push(list[i].cart_id)
      }
      wx.request({
        url: config.shopCartSelect_url,
        method: "post",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          token: vm.data.token,
          tag: state,
          cartId: cart_id,
          shopId: shop_id
        },
        success: ret => {
          // console.log(ret);
          vm.init();
        }
      })
    },
    init(){
      wx.request({
        url: config.cartList_url,
        data: {
          token: wx.getStorageSync('token')
        },
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        success: ret => {
          console.log(ret);
          if (ret.statusCode == 200) {
            if (ret.data.status == 1) {
              var cart_list_length ='';
              var state=0;
              cart_list_length = ret.data.data.shopList.length;
              if (ret.data.data.shopList) {
                if (cart_list_length > 0) {
                  for (var i = 0; i < cart_list_length; i++) {
                    ret.data.data.shopList[i].state = 0;
                    if (ret.data.data.shopList[i].cart) {
                      for (var j = 0; j < ret.data.data.shopList[i].cart.length; j++) {
                        ret.data.data.shopList[i].cart[j].right = 0;
                        if (ret.data.data.shopList[i].cart[j].is_select ==0) {
                          // vm.cart_id.push(vm.cart_list[i].goods_list[j].cart_id)
                          ret.data.data.shopList[i].state = 0;
                          break;
                        } 
                          ret.data.data.shopList[i].state = 1;
                          //return;
                      }
                    }
                  }
                }
              }
              console.log(ret.data.data.shopList);
              for (var i = 0; i < ret.data.data.shopList.length; i++) {
                if (ret.data.data.shopList[i].state==0){
                  state=0;
                  break;
                }
                state = 1;
              }
              // console.log(state);
              vm.setData({
                data: ret.data.data.shopList,
                totalPrice: ret.data.data.totalPrice,
                state: state
              })
            } else {
              wx.showToast({
                title: ret.data.msg,
                icon: 'none'
              })
            }

          }
        }
      })
    },
    //数量减
    cut(e){
      var index = e.currentTarget.dataset.idx;
      var cart_id = e.currentTarget.dataset.cart_id;
      wx.request({
        url: config.minusToCartGoodNum_url,
        method: "post",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          token: vm.data.token,
          cartId: cart_id
        },
        success: ret => {
          // console.log(ret);
          if(ret.data.status==1){
            vm.init();
          }else{
            wx.showToast({
              title: ret.data.msg,
              icon:'none'
            })
          }
        }
      })
    },
    //数量加
    add(e){
      var index = e.currentTarget.dataset.idx;
      var cart_id = e.currentTarget.dataset.cart_id;
      wx.request({
        url: config.addToCartGoodNum_url,
        method: "post",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          token: vm.data.token,
          cartId: cart_id
        },
        success: ret => {
          // console.log(ret);
          if (ret.data.status == 1) {
            vm.init();
          } else {
            wx.showToast({
              title: ret.data.msg,
              icon: 'none'
            })
          }
        }
      })
    },
    sub(){
      if (vm.data.totalPrice <= 0) {
        wx.showToast({
          title: '请选择结算商品',
          icon: "none"
        })
        return;
      }
      var list = [];
      for (var i = 0; i <vm.data.data.length; i++) {
        for (var k = 0; k < vm.data.data[i].cart.length; k++) {
          if (vm.data.data[i].cart[k].is_select == 1) {
            list.push(vm.data.data[i].cart[k].cart_id)
          }
        }
      }
      
      app.globalData.cart_id = list.join(',')
      wx.navigateTo({
        url: '/pages/shop/orderTj/orderTj?order_type=2',
      })
      return;
    },
    onLoad: function (options) {
        var vm = this;
        wx.getSystemInfo({
          success: function (res) {
            vm.setData({
                windowHeight: res.windowHeight
            });
          }
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      vm = this;
      vm.setData({
        token: wx.getStorageSync('token')
      })

      vm.init();
    },
    drawStart: function (e) {
        console.log(e);  
      var touch = e.touches[0]

      for (var i =0;i<vm.data.data.length;i++) {
        for (var j = 0; j < vm.data.data[i].cart.length; j++) {
        var item = vm.data.data[i].cart[j];
          item.right = 0
        }
        
      }
      vm.setData({
        data: vm.data.data,
        startX: touch.clientX,
      })
       

    },
    drawMove: function (e) {
      console.log(e);  

        var touch = e.touches[0]
        var item = vm.data.data[e.currentTarget.dataset.tindex].cart[e.currentTarget.dataset.index]
        var disX = vm.data.startX - touch.clientX
        if (disX >= 20) {
          if (disX > vm.data.delBtnWidth) {
              disX = vm.data.delBtnWidth
            }
            item.right = disX
            vm.setData({
                isScroll: false,
                data: vm.data.data
            })
        } else {
            item.right = 0
            vm.setData({
                isScroll: true,
                data: vm.data.data
            })
        }
    },
    drawEnd: function (e) {
      console.log(e)
      var item = vm.data.data[e.currentTarget.dataset.tindex].cart[e.currentTarget.dataset.index]
      console.log(item);
      if (item.right >= vm.data.delBtnWidth / 2) {
        item.right = vm.data.delBtnWidth
            vm.setData({
                isScroll: true,
                data: vm.data.data,
            })
        } else {
            item.right = 0
            vm.setData({
                isScroll: true,
                data: vm.data.data,
            })
        }
    },
    delItem: function (e) {
      var index = e.currentTarget.dataset.index;
      var cart_id = e.currentTarget.dataset.cart_id;
      wx.showModal({
        title: '提示',
        content: '确定要删除吗？',
        success: function (sm) {
          if (sm.confirm) {
            wx.request({
              url: config.cartDelete_url,
              method: "get",
              header: {
                'content-type': 'application/json'
              },
              data: {
                token: vm.data.token,
                cartId:cart_id
              },
              success: ret => {
                // console.log(ret);
                if (ret.data.status == 1) {
                  vm.setData({
                    list : [],
                    pageNo:1,
                  })
                  vm.init();
                } else {
                  wx.showToast({
                    title: ret.data.msg,
                    icon: 'none'
                  })
                }

              },
              fail: ret => {
                wx.showToast({
                  title: ret.data.msg,
                })
              }
            })
          } else if (sm.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
})