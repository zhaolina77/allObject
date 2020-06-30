var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 9,
    page_number: 1,
    level: 0,
    list:[]


  },
  init() {
    wx.request({
      url: config.allGoodsCollection_url,//商品全部评价
      data: {
        id: vm.data.id,
        page_number: vm.data.page_number,
        page_size: 8,
        level: vm.data.level
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        console.log(res, '商品全部评价')
        if (res.data.status == 1) {
          vm.setData({
            evalua_num:res.data.data.evalua_num,
            list:vm.data.list.concat(res.data.data.page.list),
            totalRow:res.data.data.page.totalRow
          })
        }

      },
    })

  },
  change(e) {
    var idx = e.currentTarget.dataset.idx
 
    vm.setData({
      page_number: 1,
      list:[],
      level: idx
    })
    vm.init();

  },


    //图片预览
    imgYu: function (event) {
      var src = event.currentTarget.dataset.src; //获取data-src
      var imgList = event.currentTarget.dataset.list; //获取data-list
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    // var id=options.id
    vm.setData({
      // id:id
    })

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