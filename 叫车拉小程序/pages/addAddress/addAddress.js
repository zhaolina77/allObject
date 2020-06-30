var common = require('../../common.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    fullAddress: '',
    addressInfo: '',
    mobile: '',
    name: '',
    lat: '',
    lon: '',
    type:'',
    id: ''
  },
  //选择服务地址
  change_city() {
    wx.navigateTo({
      url: '/pages/searchAddress/searchAddress',
    })
  },
  //提交地址
  formSubmit(e) {
    if (e.detail.value.name == '') {
      wx.showToast({
        title: '请输入联系人',
        icon: "none"
      })
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(e.detail.value.mobile))) {
      wx.showToast({
        title: '手机号不合法',
        icon: "none"
      })
      return
    }
    if (e.detail.value.mobile.length == 0 || e.detail.value.mobile.match(/^[ ]*$/)) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      return
    }
    if (e.detail.value.fullAddress == '') {
      wx.showToast({
        title: '请选择搬家地址',
        icon: "none"
      })
      return;
    }
    if (e.detail.value.addressInfo == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: "none"
      })
      return;
    }
    if (vm.data.id) {
      var url = config.address_update_url;
      var param = {
        id: vm.data.id,
        name: e.detail.value.name,
        mobile: e.detail.value.mobile,
        fullAddress: vm.data.fullAddress,
        addressInfo: e.detail.value.addressInfo,
        lon: vm.data.lon,
        lat: vm.data.lat,
        type:1

      }
    } else {
      var url = config.addAddress_url;
      var param = {
        token: vm.data.token,
        name: e.detail.value.name,
        mobile: e.detail.value.mobile,
        fullAddress: vm.data.fullAddress,
        addressInfo: e.detail.value.addressInfo,
        lon: vm.data.lon,
        lat: vm.data.lat,
        type: 1
      }
    }
    wx.request({
      url: url,
      data: param,
      header: {
        "content-type": "application/json"
      },
      method: 'GET',
      success: function (ret) {
        console.log(ret);
        if (ret.data.status == 1) {
          wx.showToast({
            title: ret.data.msg,
            icon: 'success',
            duration: 2000,
          })
          //你需要把你的数据写到show
          setTimeout(function () {
            if (vm.data.type == 1) {
              let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

              let prevPage = pages[pages.length - 3];

              //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

              prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

                one_list: ret.data.add,

                outAddress: ret.data.add.full_address + ret.data.add.address_info,

                outIndex: ret.data.addressSize - 1

              })
              wx.navigateBack({
                delta: 2  // 返回上一级页面。
              })
            }else{
              let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

              let prevPage = pages[pages.length - 3];

              //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

              prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

                two_list: ret.data.add,

                backAddress: ret.data.add.full_address + ret.data.add.address_info,

                putIndex: ret.data.addressSize - 1

              })
              wx.navigateBack({
                delta: 2  // 返回上一级页面。
              })
            }
          }, 2000)

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.setData({
      id: options.id,
      type:options.type,
      fullAddress: options.fullAddress,
      addressInfo: options.addressInfo,
      mobile: options.mobile,
      name: options.name,
      lon: options.lon,
      lat: options.lat,
      token: wx.getStorageSync('token'),
    })
    if(options.id){
      wx.setNavigationBarTitle({
        title: '修改地址'
      })
    }
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