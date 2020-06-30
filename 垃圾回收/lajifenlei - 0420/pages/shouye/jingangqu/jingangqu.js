var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cityId:1,
      flList:[],
      flId:1,
      pageNo:1,
      productList:[],
      token:'',
      val:''
  },
//  更多分类
  fl() {
    wx.request({
      url: config.moreType_url,
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          vm.setData({
            flList:res.data.productList
          })
        }
      },
    });
  },
  left(e){
    vm.setData({
      flId:e.currentTarget.dataset.id,
      name:e.currentTarget.dataset.name,
      productList:[],
      pageNo:1,
    })
    vm.productList();
  },

  // 点击更多根据分类查看商品
  productList() {
    wx.request({
      url: config.productList_url,
      data: {
        cityId:vm.data.cityId,
        pageNo:vm.data.pageNo,
        pageSize:8,
        product_type_parent:vm.data.flId,
        name:vm.data.val
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          vm.setData({
            productList:vm.data.productList.concat(res.data.page.list),
            totalRow:res.data.page.totalRow
          })
        }
      },
    });
  },
  detail(e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url:config.productDetails_url,
      data: {
        token:vm.data.token,
        id:id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          wx.navigateTo({
            url: '../huishouDetail/huishouDetail?id=' + id,
          })
        }else{
          wx.showToast({
            icon:'none',
            title: res.data.msg,
          })
        }
        console.log(vm.data.lat,vm.data.lon)
      },
    });
   
  },


  verification: function (e) {
    var val = e.detail.value;
    vm.setData({
      val: val
    })
  },
  serch(e) {
    console.log(e)
    var val=e.detail.value
    vm.setData({
      val:val,
      productList:[]
    })
    wx.request({
      url: config.productList_url,
      data: {
        name:vm.data.val
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          vm.setData({
            productList:vm.data.productList.concat(res.data.page.list),
            totalRow:res.data.page.totalRow
          })
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var token=wx.getStorageSync('token')
    var flId=options.id;
    console.log(flId)
     vm.setData({
      flId:flId,
      token:token
     })
    vm.fl();
    vm.productList();
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
    if (vm.data.totalRow == vm.data.productList.length) {
      return;
    }
    ++vm.data.pageNo;
    vm.productList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})