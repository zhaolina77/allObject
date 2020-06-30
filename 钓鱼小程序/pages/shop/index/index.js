var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:'',
      pageNo:1,
      totalRow:0,
      banner:[],
      classifyOneList:[],
      special_area_list:[],
      shopList:[],
      rlist:[]

    },
    init(){
      //轮播图
      wx.request({
        url: config.banners_url,
        data: {
          module_id: 4
        },
        header: {
          'content-type': 'application/json'//get请求头
        },
        method: 'GET',
        success: function (res) {
          vm.setData({
            banner: res.data.data.banner_list
          })
        },
      });
      //首页商品的一级分类
      wx.request({
        url: config.classifyOneList_url,
        data: '',
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
          // console.log(res)
          vm.setData({
            classifyOneList: res.data.data.classifyOneList
          })
        },
      })
      //首页显示每个专区的两个商品
      wx.request({
        url: config.prefectureList_url,
        data: {},
        header: {
          'content-type': 'application/json'//get请求头
        },
        method: 'GET',
        success: function(res) {
          console.log(res,'专区列表')
          vm.setData({
            special_area_list: res.data.data.special_area_list
          })

        },
      })
      //精选商家列表
      wx.request({
        url: config.choicenessShopList_url,
        data: '',
        header: {
          'content-type': 'application/json'//get请求头
        },
        method: 'GET',
        success: function(res) {
          // console.log(res)
          vm.setData({
            shopList: res.data.data.shopList
          })
        },
      })
    },
    cartCount(){
      //商城中购物车数量
      wx.request({
        url: config.cartNum_url,
        data: {
          token:vm.data.token
        },
        header: {
          'content-type': 'application/json'//get请求头
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          vm.setData({
            cartCount:res.data.data.cartCount
          })
        },
      })

    },
  rlist(){
    //为你推荐列表
    wx.request({
      url: config.recommendedForYou_url,
      data: {
        pageNo: vm.data.pageNo,
        pageSize: 8
      },
      header: {
        'content-type': 'application/json'//get请求头
      },
      method: 'GET',
      success: function (res) {
        // console.log(res)
        vm.setData({
          rlist: vm.data.rlist.concat(res.data.data.page.list),
          totalRow: res.data.data.page.totalRow
        })
      },
    })

  },
  // 分类
  classify(e){
    wx.navigateTo({
      url: '../classify/classify?classify_id=' + e.currentTarget.dataset.id + '&index=' + e.currentTarget.dataset.index,
    })
  },
  // 更多分类
  more(){
    wx.navigateTo({
      url: '../classify/classify?classify_id=1&index=0',
    })

  },
  special(e){
    wx.navigateTo({
      url: '../xianshigou/xianshigou?id=' + e.currentTarget.dataset.id+'&pic='+e.currentTarget.dataset.pic,
    })
  },
  //进入商铺
  shop(e) {
    wx.navigateTo({
      url: '../shangjia/shangjia?id=' + e.currentTarget.dataset.id,
    })
  },
  //进入推荐详情
  tuijian(e){
    wx.navigateTo({
      url: '../shopDetail/shopDetail?id=' + e.currentTarget.dataset.id+'&add_type=1',
    })
  },
  cart(){
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
//搜索商品
sousuo(){
  wx.navigateTo({
    url: '/pages/search/searchJl/searchJl',
  })
},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      vm.setData({
        token:wx.getStorageSync('token')
      })
      vm.init();
      
      vm.rlist();
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
      vm.cartCount();

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
      if (vm.data.totalRow == vm.data.rlist.length){
          return
      }
      ++vm.data.pageNo;
      vm.rlist();

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})