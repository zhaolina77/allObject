// pages/index/products/index.js
var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    id: '',
    have: '',
    evaluate: '',
    good: '',
    service: '',
    serviceList: [],
    buytype: 0,
    imgUrls: [

    ],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    show: false,
    showspec: false,
    num: 1,
    spec_name: '',
    spec2_name: '',
    firstindex: 0,
    oneindex: 0,
    twoindex: 0,
    sstocknum: '',
    specimg: '',
    spec_id: '',
    spec_price: 0,
    tag: 0,
    speclist: [],
    actions: [{
        name: '选项'
      },
      {
        name: '选项'
      },
      {
        name: '选项',
        openType: 'share'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token');
    this.setData({
      'token': token
    })
    this.setData({
      'id': options.id
    })
    this.getdetails();
    this.getserver();
    this.getspec();
  },
  getdetails: function () {
    console.log(this.id)
    var that = this;
    wx.request({
      url: config.goodsDetails_url, //仅为示例，并非真实的接口地址
      data: {
        token: this.data.token,
        goodsId: this.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          'have': res.data.have,
          'evaluate': res.data.data.evaluate,
          'good': res.data.data.good,
          'service': res.data.data.service,
        })
        console.log(res, '详情');
        WxParse.wxParse('content', 'html', that.data.good.content, that, 5);
      }
    })
  },
  allpingjia: function () {
    wx.navigateTo({
      url: '../allpingjia/index?id=' + this.data.id,
    })
  },
  getserver: function () {
    var that = this;
    wx.request({
      url: config.goodsService_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        goodsId: this.data.id
      },
      success(res) {
        that.setData({
          'serviceList': res.data.data.serviceList
        })
        console.log(res)
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
    // this.getdetails();
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
    var that = this;
    return {
      title: '转发',
      path: '/pages/index/products/index?id=' + that.data.id,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  buynow: function () {
    if (this.data.tag == 1) {

      this.openspec();
      this.setData({
        buytype: 1
      })

    } else {
      wx.navigateTo({
        url: '../../cart/buy/index?id=' + this.data.id
      })
    }

  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    console.log(event.detail);
  },
  opensheect: function () {
    this.setData({
      show: true
    });
  },
  openspec: function () {
    this.setData({
      showspec: true
    })
  },
  closespec: function () {
    this.setData({
      showspec: false
    })
  },
  getspec: function () {
    var that = this;
    wx.request({
      url: config.goodsSpec_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        goodsId: this.data.id,
        token: this.data.token
      },
      success(res) {
        if (res.data.tag == 1) {
          that.setData({
            oneindex: 0,
            twoindex: 0,
            'spec_name': res.data.spec_name,
            spec2_name: res.data.one[0].two.spec_name,
            speclist: res.data.one,
            speclist1: res.data.one[0].two.list,
            specimg: res.data.one[0].two.list[0].thumb,
            spec_id: res.data.one[0].two.list[0].spec_id,
            sstocknum: res.data.one[0].two.list[0].stocknum,
            spec_price: res.data.one[0].two.list[0].market_price,
            tag: res.data.tag

          })
        }
        console.log(2222)
        console.log(res)
        console.log(2222)
      }
    })
  },
  addcart: function () {
    if (this.data.tag == 1) {

      this.openspec();
      this.setData({
        buytype: 0
      })
    } else {

      var that = this;
      wx.request({
        url: config.cartAdd_url, //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: this.data.id,
          token: this.data.token,
          num: 1
        },
        success(res) {

          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.msg,
            })
          }

        }
      })
    }
  },
  getpect: function (e) {
    var index = e.currentTarget.dataset.index;
    var data = this.data.speclist;
    var twoindex = this.data.twoindex;
    this.setData({
      oneindex: index,
      speclist1: data[index].two.list,
      specimg: data[index].two.list[twoindex].thumb,
      spec_id: data[index].two.list[twoindex].spec_id,
      sstocknum: data[index].two.list[twoindex].stocknum,
      spec_price: data[index].two.list[twoindex].market_price,
    })
  },
  getpects: function (e) {
    var index = e.currentTarget.dataset.index;
    var data = this.data.speclist;
    var oneindex = this.data.oneindex;
    this.setData({
      twoindex: index,
      speclist1: data[oneindex].two.list,
      specimg: data[oneindex].two.list[index].thumb,
      spec_id: data[oneindex].two.list[index].spec_id,
      sstocknum: data[oneindex].two.list[index].stocknum,
      spec_price: data[oneindex].two.list[index].market_price,
    })
  },
  specaddcart: function () {

    var that = this;
    if (this.data.buytype == 0) {
      wx.request({
        url: config.cartAdd_url, //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: this.data.id,
          token: this.data.token,
          num: this.data.num,
          specId: this.data.spec_id
        },
        success(res) {

          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.msg,
            })
            that.closespec();
          }

        }
      })
    } else {
      console.log(5555)
      wx.navigateTo({
        url: '../../cart/buy/index?id=' + this.data.id + '&count=' + this.data.num + '&specId=' + this.data.spec_id
      })
    }
  },
  jian: function () {
    var that = this;
    if (this.data.num > 1) {
      var num = this.data.num - 1
      this.setData({
        num: num
      })
    }
  },
  jia: function () {
    var that = this;
    var num = this.data.num + 1
    this.setData({
      num: num
    })
    wx.request({
      url: config.cartAdd_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        goodsId: this.data.id,
        num: this.data.num,
        modelId: this.data.spec_id
      },
      success(res) {

        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
          })
          that.closespec();
        }

      }
    })
  },
  toget: function () {
    wx.navigateTo({
      url: '../coupon/index',
    })
  },
  tocart: function () {
    console.log(898989)
    wx.switchTab({
      url: '../../cart/index/index',
    })
  }
})