Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log(456)
    var that = this;
    return {
      title: '转发',
      path: '/pages/order/order',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  toorder:function(){  //我的订单
    wx.navigateTo({
      url: '../order/order',
    })
  },
  toabout:function(){  // 关于我们
    wx.navigateTo({
      url: '../aboutUs/aboutUs',
    })
  },
  tocoupon:function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  }
})