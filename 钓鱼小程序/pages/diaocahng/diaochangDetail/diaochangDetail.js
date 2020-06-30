var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 3,
    token: "",
    list: [],
    matchs: [],
    pinglunList: [],
    pageNo: 1,
    totalRow: 0,
    latitude: "",
    longitude: ""
  },
  init() {
    wx.request({
      url: config.angling_site_detail_url,
      data: {
        id: vm.data.id,
        token: vm.data.token,
        pageNo: vm.data.pageNo,
        pageSize: 8
      },
      header: {
        'content-type': 'application/json' //get请求头
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        vm.setData({
          list: res.data.data.angling_site,
          latitude:res.data.data.angling_site.lat,
          longitude: res.data.data.angling_site.lon,
          matchs: res.data.data.matchs,
          pinglunList: vm.data.pinglunList.concat(res.data.data.page.list),
          totalRow: res.data.data.page.totalRow
        })
       
      },
    })

  },
  saishi(e) {
    wx.navigateTo({
      url: '/pages/xiehui/jieshao/jieshao?id=' + e.currentTarget.dataset.id,
    })
  },
  all_saishi() {
    wx.navigateTo({
      url: '/pages/saishi/saishi/saishi',
    })
  },
  evalute(e) {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    } else {
      wx.navigateTo({
        url: '../dccomment/dccomment?id=' + e.currentTarget.dataset.id,
      })
    }

  },
  like() {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    } else {
      wx.request({
        url: config.angling_site_like_url,
        data: {
          id: vm.data.id,
          token: vm.data.token
        },
        header: {
          'content-type': 'application/json' //get请求头
        },
        method: 'GET',
        success: function (ret) {
          var list = vm.data.list;
          if (ret.status == 1) {
            if (list.is_like == 0) {
              list.is_like = 1;
              list.like_num++
            } else {
              list.is_like = 0;
              list.like_num--
            }
          }
          vm.setData({
            list: list
          })
          vm.init()
        },
      })
    }


  },
  coll() {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    } else {
      wx.request({
        url: config.angling_site_coll_url,
        data: {
          id: vm.data.id,
          token: vm.data.token
        },
        header: {
          'content-type': 'application/json' //get请求头
        },
        method: 'GET',
        success: function (ret) {
          console.log(ret)
          var list = vm.data.list;
          if (ret.status == 1) {
            if (list.is_coll == 0) {
              list.is_coll = 1;
              list.coll_num++
            } else {
              list.is_coll = 0;
              list.coll_num--
            }
          }
          vm.setData({
            list: list
          })
          vm.init()
        },
      })
    }
  },
  // enter(e) {
  //   console.log(e)
  //   wx.navigateTo({
  //     url: '/pages/yuhuobang/home/home?id=' + e.currentTarget.dataset.accountid,
  //   })
  // },
  imgYu(e) {
    console.log(e)
    var src = e.currentTarget.dataset.src; //获取data-src
    var imgList = e.currentTarget.dataset.idx; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  map(){
    console.log(vm.data.latitude,vm.data.longitude)
    wx.openLocation({
      latitude:Number(vm.data.latitude),
      longitude:Number(vm.data.longitude),
      scale: 16,
      name: vm.data.list.name,
      address: vm.data.list.address
    })
  },
  call() {
    wx.makePhoneCall({
      phoneNumber:vm.data.list.mobile,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var id = options.id;
    vm.setData({
      id: id,
      token: wx.getStorageSync('token'),
    })
    vm.init();
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
    if (vm.data.totalRow == vm.data.pinglunList.length) {
      return
    }
    ++vm.data.pageNo;
    vm.init();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})