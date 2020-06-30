var common = require('../../common.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      outAddress: '',
      backAddress: '',
      carInfo: '',
      time: '',
      token: '',
      num: 0,
      coupon: '',
      idx:'',
      couponPrice: 0,
      remark: '',
      elsePrice: '',
      terrace_discounts: '',
      type: 0,
      distance: 0,
      id: ''
    },
    //获取input的值
    verification: function (e) {
      console.log(e);
      var val = e.detail.value;
      vm.setData({
        remark: val
      })
    },
    //优惠券
    coupon_list(){
      wx.navigateTo({
        url: '/pages/change_coupon/change_coupon?state=1&idx=' + vm.data.idx,
      })
    },
    //提交
    sub(){
      wx.request({
        url: config.submitOrder_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          token: vm.data.token,
          terrace_discounts: vm.data.terrace_discounts,
          orderStatus: vm.data.type,
          elsePrice: vm.data.elsePrice,
          remark: vm.data.remark,
          couponId: vm.data.coupon ? vm.data.coupon.id : '',
          intoId: vm.data.backAddress.id,
          outId: vm.data.outAddress.id,
          token: vm.data.token,
          serviceTime: vm.data.time,
          carId: vm.data.carInfo.carInfo.id,
          
        },
        success: ret => {
          console.log(ret);
          wx.navigateTo({
            url: '/pages/orderCg/orderCg',
          })
        }
      })
    },
    init(){
      wx.request({
        url: config.verifyOrder_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          token: vm.data.token,
          outId: vm.data.outAddress.id,
          intoId: vm.data.backAddress.id,
          carId: vm.data.carInfo.carInfo.id
        },
        success: ret => {
          console.log(ret);
          vm.setData({
            num: ret.data.data.cpCount,
            elsePrice: ret.data.data.elsePrice,
            distance: ret.data.data.distance,
            terrace_discounts: ret.data.data.terrace_discounts
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
      vm = this;
      if (options.id){
        this.setData({
          token: wx.getStorageSync('token'),
          id: options.id
        })
        this.getdata();

      }
      else {
        
        vm.setData({
          token: wx.getStorageSync('token'),
          carInfo: app.globalData.obj_list,
          outAddress: app.globalData.obj_list.outAddress,
          backAddress: app.globalData.obj_list.backAddress,
          time: app.globalData.obj_list.time,
          type: app.globalData.obj_list.type,
        })
        vm.init();
      }
    },
    getdata:function(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month > 9 ? month : '0' + month;
      var day=date.getDate();
      day = day > 9 ? day : '0' + day;
      var hour=date.getHours();
      hour = hour > 9 ? hour : '0' + hour;
      var minter=date.getMinutes();
      minter = minter > 9 ? minter : '0' + minter;
      var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minter
      var that = this;
      wx.request({
        url: config.againOrder_url, //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          orderId: this.data.id
        },

        success(res) {
          // that.setData({
          //   'goods': res.data.data.goods,
          //   'address': res.data.data.address

          // })
          console.log(res)
          var carInfo={
            carInfo:res.data.data.car
          }
          if (res.data.status==1){
            that.setData({
              carInfo: carInfo,
              outAddress: res.data.data.outAddress,
              backAddress: res.data.data.putAddress,
              time: time,
              type:0,
            })
            vm.init();
          }
        }
      })
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