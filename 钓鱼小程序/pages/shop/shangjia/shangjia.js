var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:'',
      shopId:3,
      pageNo:1,
      certification:{},
      list:[],
      totalRow:0,
      sales: 0,
      price: 0,
      index: 0,
      is_coll:0

    },
    init(){
      wx.request({
        url: config.goodsList_url,
        data: {
          sales: vm.data.sales,
          price: vm.data.price,
          shopId: vm.data.shopId,
          pageNo: vm.data.pageNo,
          pageSize: 6,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          vm.setData({
            totalRow: res.data.data.page.totalRow,
            list: vm.data.list.concat(res.data.data.page.list)
          })
        },
      })

    },
    //进入搜索
    sousuo(){
      wx.navigateTo({
        url: '/pages/search/searchJl/searchJl',
      })
    },

    // 商铺信息
    shop(){
      wx.request({
        url: config.shopDetail_url,
        data: {
          id: vm.data.shopId,
          token: vm.data.token
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          vm.setData({
            shop: res.data.data.certification
              
          })
        },
      })

    },
  // 综合、销量、价格切换
  change(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    vm.setData({
      list: [],
      index: index,
    })
    if (index == 0) {
      vm.setData({
        sales: 0,
        price: 0
      })
    } else if (index == 1) {
      vm.setData({
        sales: 1,
        price: 0
      })
    } else {
      vm.setData({
        sales: 0
      })
      if (vm.data.price == 0) {
        vm.setData({
          price: 1
        })
      } else if (vm.data.price == 1) {
        vm.setData({
          price: 2
        })
      }
      else {
        vm.setData({
          price: 1
        })
      }
    }
    vm.init();

  },
  //进入商铺详情
  enter_shop(e){
    wx.navigateTo({
      url: '../shangjiaDetail/shangjiaDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  // 进入商品详情
  enter(e){
      wx.navigateTo({
        url: '../shopDetail/shopDetail?id='+e.currentTarget.dataset.id,
      })
  },
  //商铺收藏、取消收藏
  coll(){
    wx.request({
      url: config.checkShopCollect_url,
      data: {
        token:vm.data.token,
        id:vm.data.shopId
      },
       header: {
          'content-type': 'application/json'
        },
      method: 'GET',
      success: function(res) {
        console.log(res)
        var shop=vm.data.shop;
        if(shop.collecttag==1){
          shop.collecttag=0
          wx.showToast({
            title: '已取消',
            icon: 'none',
          })
        }
        else{
          shop.collecttag=1
          wx.showToast({
            title: '已收藏',
            icon: 'none',
          })
        }
        vm.setData({
          shop
        })
      },
    })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      var token = wx.getStorageSync('token');
      var id = options.id;
      vm.setData({
        shopId: id,
        token: token
      })
      vm.init();
      vm.shop();

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
      if (vm.data.totalRow == vm.data.list.length) {
        return
      }
      ++vm.data.pageNo;
      vm.init();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})