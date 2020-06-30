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
      loading: true,

      list: [],
      isLoad: '',
      type: '',
      isAgain: '',//是否是再次提交页面信息
      putIndex: '',
      outIndex: '',
      two_list:[],
      one_list:[]
    },
    delAddress(e) {
      var index = e.currentTarget.dataset.index;
      wx.request({
        url: config.address_del_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          token: vm.data.token,
          id: vm.data.list[index].id
        },
        success: ret => {
          console.log(ret);
          vm.setData({
            list: []
          })
          vm.init();
        }
      })
    },
    editAddress(e) {
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/pages/addAddress/addAddress?id=' + vm.data.list[index].id + '&fullAddress=' + vm.data.list[index].full_address + '&name=' + vm.data.list[index].name + '&mobile=' + vm.data.list[index].mobile + '&addressInfo=' + vm.data.list[index].address_info + '&lon=' + vm.data.list[index].longitude + '&lat=' + vm.data.list[index].latitude,
      })
    },
    //添加地址
    add_address() {
      wx.navigateTo({
        url: '/pages/addAddress/addAddress?type='+vm.data.type,
      })
    },
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)

      vm.data.list[e.detail.value].isCheck = 1;
      if (vm.data.outIndex == e.detail.value && vm.data.type == 2) {
        wx.showToast({
          title: '搬出地址与搬入地址不能重复',
          icon:'none'
        })
        return;
      }
      if (vm.data.putIndex == e.detail.value && vm.data.type == 1) {
        wx.showToast({
          title: '搬出地址与搬入地址不能重复',
          icon: 'none'
        })
        return;
      }






      if(vm.data.type==1){
        vm.setData({
          one_list:vm.data.list[e.detail.value]
        })
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

        let prevPage = pages[pages.length - 2];

        //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

          one_list: vm.data.one_list,

          outAddress: vm.data.one_list.full_address + vm.data.one_list.address_info,

          outIndex: e.detail.value

        })

        //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。


        //最后就是返回上一个页面。

        wx.navigateBack({

          delta: 1  // 返回上一级页面。
        })
        return;
      }else{
        vm.setData({
          two_list: vm.data.list[e.detail.value]
        })
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

        let prevPage = pages[pages.length - 2];

        //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

          two_list: vm.data.two_list,

          backAddress: vm.data.two_list.full_address + vm.data.two_list.address_info,

          putIndex: e.detail.value

        })

        //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。


        //最后就是返回上一个页面。

        wx.navigateBack({

          delta: 1  // 返回上一级页面。
        })
      }
      
    },
    init() {
      wx.request({
        url: config.addressList_url,
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        data: {
          token: vm.data.token
        },
        success: ret => {
          console.log(ret);
          if (ret.data.status == 1) {
            var list = ret.data.data.addressList;
            for (var i = 0; i < list.length; i++) {
              if (vm.data.outIndex == i) {
                list[vm.data.outIndex].isCheck = 1;
              } else if (vm.data.putIndex == i) {
                list[vm.data.putIndex].isCheck = 1;
              } else {
                list[i].isCheck = 0;
              }
            }
            console.log(list);
            vm.setData({
              list: list,
              loading: false,
            })
          }else{
            vm.setData({
              loading: false,
            })
          }

        },
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      console.log(options);
      vm.setData({
        type:options.type,
        outIndex: options.outIndex,
        putIndex: options.putIndex
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
      vm.setData({
        token: wx.getStorageSync('token'),
      })
      setTimeout(function(){
        vm.init();
      },500)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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