var common = require('../../../common.js');
var config = common.getconfig();
var vm = '';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      area_id: '',
      id: '',
      token: '',
      region: [],  //地区
      is_default: 1,
      address_info: '',
      name: '',
      mobile: '',
    },

    //q切换开关
    switch1Change() {
      var is_default=vm.data.is_default;
      if (is_default == 0) {
        is_default=1;
      } else {
        is_default=0;
      }
      vm.setData({
        is_default:is_default
      })
      console.log(vm.data.is_default)
    },
    init() {
      wx.request({
        url: config.addressById_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          token: vm.data.token,
          id: vm.data.id
        },
        success: ret => {
          console.log(ret);
          if (ret.data.data.address) {
            if (ret.data.data.address.full_address) {
              var region = [];
              region = ret.data.data.address.full_address.split(' ');
            }
          }
          vm.setData({
            region: region,
            address_info: ret.data.data.address.address_info,
            is_default: ret.data.data.address.is_default,
            mobile: ret.data.data.address.mobile,
            name: ret.data.data.address.name,
          })
        }
      })
    },
    mr_address(){
      wx.request({
        url: config.isDefault_url,
        data: {
          id:vm.data.id,
          is_default:vm.data.is_default
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        success: function(res) {
          console.log(res)
        },
      })
    },

    //提交地址
    formSubmit(e) {
      if (e.detail.value.name == '') {
        wx.showToast({
          title: '请输入收货人姓名',
          icon: "none"
        })
        return;
      }
      if (e.detail.value.mobile.length == 0 || e.detail.value.mobile.match(/^[ ]*$/)) {
        wx.showToast({
          title: '手机号不能为空',
          icon: "none"
        })
        return
      }
      if (!(/^1[34578]\d{9}$/.test(e.detail.value.mobile))) {
        wx.showToast({
          title: '手机号不合法',
          icon: "none"
        })
        return
      }
      if (vm.data.regionlength == 0) {
        wx.showToast({
          title: '请选择收货地址',
          icon: "none"
        })
        return;
      }
      if (e.detail.value.address_info == '') {
        wx.showToast({
          title: '请输入详细地址',
          icon: "none"
        })
        return;
      }
      if (vm.data.id) {
        var url = config.addressUpdate_url;
        var param = {
          id: vm.data.id,
          token: vm.data.token,
          name: e.detail.value.name,
          mobile: e.detail.value.mobile,
          full_address: vm.data.region.join(' '),
          address_info: e.detail.value.address_info,
          is_default: vm.data.is_default

        }
      } else {
        var url = config.addAddress_url;
        var param = {
          token: vm.data.token,
          name: e.detail.value.name,
          mobile: e.detail.value.mobile,
          full_address: vm.data.region.join(' '),
          address_info: e.detail.value.address_info
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
          console.log(ret)
          console.log(ret.data.status);
          if (ret.data.status == 1) {
            wx.showToast({
              title: ret.data.msg,
              icon: 'success',
              duration: 2000,
            })
            if (vm.data.id) {
              let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                let prevPage = pages[pages.length - 2];
                prevPage.init();
              wx.navigateBack({
                delta: 1  // 返回上一级页面。
              })
            } else {
              setTimeout(function () {

                let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

                let prevPage = pages[pages.length - 2];

                var param = {
                  name: e.detail.value.name,
                  mobile: e.detail.value.mobile,
                  full_address: vm.data.region.join(' '),
                  address_info: e.detail.value.address_info
                }


                prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                  address: param

                })


                wx.navigateBack({

                  delta: 1  // 返回上一级页面。

                })

              }, 2000)
            }

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
    //选择地址
    bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      vm.setData({
        region: e.detail.value
      })
      console.log((e.detail.value.join(' ')))
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      console.log(options);
      vm.setData({
        id: options.id,
        token: wx.getStorageSync('token'),

      })
      if (options) {
        if (options.id) {
          vm.init()
        }
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