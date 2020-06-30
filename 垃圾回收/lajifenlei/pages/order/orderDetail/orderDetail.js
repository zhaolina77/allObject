// pages/order/orderDetail/orderDetail.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    id:2,
    datai:{}
  },
  orderDetail() {
    wx.request({
      url: config.orderDetails_url,
      data: {
        token:vm.data.token,
        id:vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          vm.setData({
            detail:res.data.product,
          })
        }
      },
    });
  },

  call(){
    wx.makePhoneCall({
      phoneNumber:vm.data.detail.mobile,
    })
  },


  // 评价
pingjia(e){
  wx.navigateTo({
    url:'/pages/order/pingjia/pingjia?id='+vm.data.id+"&type=2",
  })
},

// 完成
finish(e){
  wx.request({
    url: config.finishOrder_url,
    data:{
      id:vm.data.id
    },
    success: (res) => {
      console.log(res)
      if(res.data.status==1){
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        setTimeout(function(){
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
         let prevPage = pages[pages.length - 2];
         prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          list: [],
          pageNo:1
        })
        prevPage.order();
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })


        },500)
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        setTimeout(function(){
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
        },500)
      }
    },
  })

},

// 重新发布
again(){
  wx.navigateTo({
    url: '/pages/fabu/fabuDetail/fabuDetail?&type=2&fbid='+vm.data.id,
  })
},
// 完成
finish(e){
  wx.navigateTo({
    url: '/pages/order/finish/finish?id='+vm.data.id+'&type=2',
  })
},


// 取消订单

qxOrder(){
  wx.request({
    url: config.cancelOrder_url,
    data: {
      id:vm.data.id
    },
    success: (res) => {
      console.log(res)
      if(res.data.status==1){
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        setTimeout(function(){
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
         let prevPage = pages[pages.length - 2];
         prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          list: [],
          pageNo:1,
          status:4
        })
        prevPage.order();
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
        },500)
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1  // 返回上一级页面。
          })
          },500)
      }
    },
  })
},
address(){
  wx.openLocation({
    latitude:Number(vm.data.detail.latitude) ,
    longitude:Number(vm.data.detail.longitude),
    scale:16,
    name:vm.data.detail.full_address,
    address:vm.data.detail.address_info
  })

},




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var id=options.id;
    vm.setData({
      id:id,
      token: wx.getStorageSync('token')
    })

    vm.orderDetail()
    


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