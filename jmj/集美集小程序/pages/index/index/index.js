var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer : '',
    bannerList: [],
    prList: [],
    haowoList: [],
    fuliList: [],
    tuangouList: [],
    qingchunList: [],
    poster: '',


    //优选热卖
    pageNo: 1,
    list: [],
    totalRow: 0,

    img:'',


  },
  search() {
    wx.navigateTo({
      url: '/pages/search/searchJl/searchJl',
    })
  },
  init() {
    wx.request({
      url: config.bannerList_url, //banner
      data: {
        status: 0
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, 'banner');
        if (res.data.status == 1) {
          vm.setData({
            bannerList: res.data.bannerList
          })
        }
      },
    });
    wx.request({
      url: config.createPrefecturePoster_url, //banner
      data: {
        status: 0
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '');
        if (res.data.status == 1) {
          vm.setData({
            img: res.data.poster
          })
        }
      },
    });
    wx.request({
      url: config.indexPrefectureList_url, //专区列表
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
        console.log(res, '专区列表');
        if (res.data.status == 1) {
          vm.setData({
            prList: res.data.prList
          })
        }
      },
    });
    wx.request({
      url: config.poster_url, //青春正当季海报
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
        // console.log(res,'青春正当季海报');
        if (res.data.status == 1) {
          vm.setData({
            poster: res.data.poster,
            
          })
        }
      },
    });
  },
  mokuai(status) {
    wx.request({
      url: config.indexModelGoods_url, //首页模块商品
      data: {
        status: status
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '首页模块商品');
        setTimeout(function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);

        if (res.data.status == 1) {
          if (status == 1) {
            vm.setData({
              haowoList: res.data.goodsList
            })
          } else if (status == 2) {
            vm.setData({
              fuliList: res.data.goodsList
            })
          } else if (status == 3) {
            vm.setData({
              tuangouList: res.data.goodsList
            })
          } else {

            vm.setData({
              qingchunList: res.data.goodsList
            })
          }
        }
      },
    });
  },
  list() {
    wx.request({
      url: config.optimizationHost_url, //优选热卖
      data: {
        token: vm.data.token,
        pageNo: vm.data.pageNo,
        pageSize: 8
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var timerTem =setTimeout(function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
        console.log(res, '优选热卖');
        if (res.data.status == 1) {
          vm.setData({
            list: vm.data.list.concat(res.data.page.list),
            totalRow: res.data.page.totalRow,
            timer: timerTem
          })
        }
      },
    });


  },

  prList(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/fenleiShop/fenleiShop?id=' + id,
    })
  },
  zhuanqu(e) {
    var idx = e.currentTarget.dataset.idx
    if (idx == 3) {
      wx.navigateTo({
        url: '/pages/index/fuli/fuli',
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/chuangyeZq/chuangyeZq?idx=' + idx,
      })
    }

  },
  more() {
    wx.navigateTo({
      url: '/pages/index/tuangouMs/tuangouMs',
    })
  },
  fuli() {
    wx.navigateTo({
      url: '/pages/index/fuli/fuli',
    })
  },
  tg_detail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/index/msDetail/msDetail?id=' + id,
    })
  },
  detail(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/shop/shopDetail/shopDetail?id=' + id,
    })
  },
  bannerJump(e){

    var id=e.currentTarget.dataset.id
    console.log(id)
    if(id==null){
      return
    }else{
      if(id==0){
        wx.navigateTo({
          url: '/pages/yongjin/yaoqing/yaoqing',
        })
      }else if(id==-1){
        wx.navigateTo({
          url: '/pages/yongjin/huiyuan/huiyuan',
        })
      }else{
        wx.navigateTo({
          url: '/pages/shop/shopDetail/shopDetail?id='+id,
        })
      }

    }

    

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    vm = this;
    vm.init();
    vm.list();
    vm.mokuai(1);
    vm.mokuai(2);
    vm.mokuai(3);
    vm.mokuai(4);

    if (options) {
      var token1 = options.token
      wx.setStorageSync('token1', token1)
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
    
    wx.request({
      url: config.jugeBC_url, //区分b端c端
      data: {
        token:wx.getStorageSync('token')
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '区分b端c端');
        if (res.data.status == 1) {
          wx.setStorageSync('status', res.data.tag)
        }
      },
    });

    config.status();
    
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
    clearInterval(this.data.timer);

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '数据加载中',
    })
    vm.setData({
      list: [],
      pageNo: 1
    })
    vm.list();
    vm.init();
    vm.mokuai(1);
    vm.mokuai(2);
    vm.mokuai(3);
    vm.mokuai(4);
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.list.length) {
      return
    }
    ++vm.data.pageNo;
    vm.list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})