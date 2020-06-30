var common = require("../../common.js");
var config = common.getconfig();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    status:-1,
    pageNo:1,
    pageSize:10,
    list:[],
    totalPage:0
  },

  openUs:function(){
    
  },
  
  onLoad: function (options) {
    this.setData({
      token: wx.getStorageSync('token')

    })
   
  },

  getorder:function(){
    var that = this;
    wx.request({
      url: config.myOrderList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        token: this.data.token,
        status: this.data.status,
        pageNo: this.data.pageNo,
        pageSize: this.data.pageSize
      },

      success(res) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
        that.setData({
          
          list:that.data.list.concat(res.data.data.page.list),
          totalPage: res.data.data.page.totalPage

        })
        console.log(res)
       
      }
    })
  },
  onReady: function () {
    this.setData({
      token: wx.getStorageSync('token')

    })
    this.getorder();
  },

  onShow: function () {
    
  },
  tab: function (event) {
    var that = this;
    var idx = event.currentTarget.dataset.idx;
    this.setData({
      status: idx,
      list: [],
      pageNo: 1
    });
    this.getorder();

  }, 
  onPullDownRefresh: function () {  
    wx.showLoading({
      title: '数据加载中',
    })
    this.setData({
      list: [],
      pageNo: 1
    })
    this.getorder()
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    // 隐藏导航栏加载框

  },
  onReachBottom: function () {
    if (this.data.pageNo < this.data.totalPage) {
      var page = this.data.pageNo + 1;
      console.log(5)
      this.setData({
        pageNo: page
      })
      this.getorder();
    }
    else {
      wx.showToast({
        title: '然后就没有然后了',
        icon: 'none'
      })
    }
  },
  call:function(e){  //联系
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  cancel:function(e){  // 取消
    var id = e.currentTarget.dataset.id;
    console.log(id)
    var that = this;
    wx.request({
      url: config.cancelOrder_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        orderId: id
      },

      success(res) {
        console.log(res)
        if (res.data.status==1){
          that.setData({
            list: [],
            pageNo: 1
          });
          that.getorder();
        }

      }
    })
  },
  del:function(e){   //删除
    var id = e.currentTarget.dataset.id;
    console.log(id)
    var that = this;
    wx.request({
      url: config.delOrder_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        orderId: id
      },

      success(res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
          })
          that.setData({
            list: [],
            pageNo: 1
          });
          that.getorder();
        }

      }
    })
  },
  confirm:function(e){   //支付
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: config.finishOrder_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        orderId: id
      },

      success(res) {
        if(res.data.status==1){
          wx.requestPayment({
            timeStamp: res.data.data.sortedMap.timeStamp,
            nonceStr: res.data.data.sortedMap.nonceStr,
            package: res.data.data.sortedMap.package,
            signType: 'MD5',
            paySign: res.data.data.sortedMap.paySign,
            success(res) {
              if (res.errMsg == 'requestPayment:ok') {  //支付成功

                wx.showToast({
                  title: '支付成功',
                })
                setTimeout(function(){
                  that.setData({
                    list: [],
                    pageNo: 1,
                    status:1
                  });
                  that.getorder();
                },800)
           
              }
            },
            fail(res) {
              if (res.errMsg == 'requestPayment:fail cancel') {  //支付失败
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })
          
              }
            }
          })
          console.log(res)
        }
      

      }
    })
  },
  rebuy:function(e){

    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../re_confirmeInfo/re_confirmeInfo?id='+id
    })
  },
  todetail:function(e){  //订单详情

    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../orderdetail/orderdetail?id='+id,
    })

  },
  evaluat:function(e){    //去评价
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../evaluat/evaluat?id=' + data.id + '&head=' + data.head + '&cnumber=' + data.cnumber + '&name=' + data.name + '&type=order',
    })
  },
  complain:function(e){   //投诉司机
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../complain/complain?id=' + data.id + '&head=' + data.head + '&cnumber=' + data.cnumber + '&name=' + data.name + '&type=order',
    })
  }

 
})