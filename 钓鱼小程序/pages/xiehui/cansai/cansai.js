var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',
    id: '',
    check: true,
    token: "",
    contact_name: "",
    contact_mobile: "",
    id_number: "",
    is_charge: '',
    type: 1
  },
  user(e) {
    // console.log(e.detail.value);
    vm.setData({
      contact_name: e.detail.value
    })
  },
  phone(e) {
    // console.log(e.detail.value);
    vm.setData({
      contact_mobile: e.detail.value
    })
  },
  idNumber(e) {
    vm.setData({
      id_number: e.detail.value
    })
  },
  cansai() {
    var mobile_res=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/;
    var card=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if(vm.data.contact_name==''){
        wx.showToast({
          title: '请输入参赛人姓名',
          icon: 'none',
        })
        return;
    }
    if (vm.data.contact_mobile.length == 0 || vm.data.contact_mobile.match(/^[ ]*$/)) {
      wx.showToast({
        title: '请输入联系电话',
        icon: "none"
      })
      return
    }
    if (vm.data.id_number.length == 0 || vm.data.id_number.match(/^[ ]*$/)) {
      wx.showToast({
        title: '请输入身份证号',
        icon: 'none'
      })
      return
    } 
    if(!mobile_res.test(vm.data.contact_mobile)){
      wx.showToast({
        title: '请输入正确的联系电话',
        icon: 'none'
      })
      return
    }
    if(!card.test(vm.data.id_number)){
      wx.showToast({
        title: '请输入正确的身份证号',
        icon: 'none'
      })
      return
    }
    var url = '';
      if (vm.data.is_charge == 0) {
        url = config.park_match_url
      } else {
        url = config.part_match_wxApplepay_url
      }
    wx.request({
      url: url,
      data: {
        id: vm.data.id,
        token: vm.data.token,
        contact_name: vm.data.contact_name,
        contact_mobile: vm.data.contact_mobile,
        id_number: vm.data.id_number
      },
      header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
      success: (res) => {
        console.log(res)
        if(res.data.status==1){
          if(vm.data.is_charge == 0){
            wx.showToast({
              title:res.data.msg,
              icon: 'none',
            })
            setTimeout(function(){
              wx.navigateBack({
                delta: 2  // 返回上一级页面。
              })
            },1000)
          }else{
            vm.wxpay(res);
          }
        }else{
          wx.showToast({
            title:res.data.msg,
            icon: 'none',
          })
        }
      },
    })


  },
  wxpay(ret) {
    wx.requestPayment({
      timeStamp: ret.data.data.sortedMap['timeStamp'],
      nonceStr: ret.data.data.sortedMap['nonceStr'],
      package: ret.data.data.sortedMap['package'],
      signType: ret.data.data.sortedMap['signType'],
      paySign: ret.data.data.sortedMap['paySign'],
      success: function (res) {
        wx.showModal({
          title: '支付成功',
          content: '',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1  // 返回上一级页面。
          })
        }, 1000)
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var id = options.id;
    var price = options.price;
    var is_charge = options.is_charge;
    var token = wx.getStorageSync("token")
    // console.log(price,is_charge)
    vm.setData({
      token: token,
      id: id,
      price: price,
      is_charge: is_charge
    })
    // vm.init();

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