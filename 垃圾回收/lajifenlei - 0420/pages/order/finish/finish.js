// pages/order/finish/finish.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 30,
    type:0,
    fl_list: [],
    classfyId: 1,
    price: 0,
    prices: []

  },
  // 分类
  fl() {
    wx.request({
      url: config.moreType_url,
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          for (let index = 0; index < res.data.productList.length; index++) {
            res.data.productList[index].names = "names" + index;
          }
          vm.setData({
            fl_list: res.data.productList,
          })
          console.log(res.data.productList);
        }
      },
    });
  },
  // 价格
  submitCode(e) { //点击提交
    console.log(e.detail);
    var prices = [];
    for (let index = 0; index < vm.data.fl_list.length; index++) {
      if (e.detail.value[vm.data.fl_list[index].names] != '') {
        var obj = {
          classifyId: vm.data.fl_list[index].id,
          price: e.detail.value[vm.data.fl_list[index].names]
        }
        prices.push(obj);
        vm.setData({
          prices
        })
      }
      console.log(vm.data.prices);
    }

    wx.request({
      url: config.finishOrder_url,
      data: {
        id: vm.data.id,
        list: vm.data.prices
      },
      success: (res) => {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          if(vm.data.type==1){
            setTimeout(function () {
              let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
              let prevPage = pages[pages.length - 2];
              prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                list: [],
                pageNo: 1,
                status:3
              })
              prevPage.order();
              wx.navigateBack({
                delta: 1  // 返回上一级页面。
              })
            }, 500)
          }else{
            setTimeout(function () {
            
              let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
              let prevPage = pages[pages.length - 2];
              prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                datai:{}
              })
              prevPage.orderDetail();
              wx.navigateBack({
                delta: 1  // 返回上一级页面。
              })
            }, 500)
          }
          
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1 // 返回上一级页面。
            })
          },500)
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var id = options.id
    var type = options.type
    console.log(id)
    vm.setData({
      id:id,
      type:type
    })

    vm.fl();
    wx.removeStorageSync('list');

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