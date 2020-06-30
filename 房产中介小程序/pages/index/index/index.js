var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    area_id: 0,
    area_name: '选择区域',
    lon: '',
    lat: '',

    pageNo: 1,
    list_data: [],
    totalRow: 0,

    banner_list: [],
    onReady: true,
    two: true,
    activityList:[]
  },
  activityList(){
    wx.request({
      url: config.activityList_url,
      data: {
        cityId: vm.data.area_id
      },
      method: "get",
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        console.log(res, "首页推荐的咨询")
        if (res.data.code == 1) {
          vm.setData({
            activityList: res.data.data
          })
          console.log(vm.data.activityList)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
    })

  },
  zx_detail(){
    wx.navigateTo({
      url: '/pages/index/gonggaoList/gonggaoList',
    })
  },
 





  jump_zu() {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },
  shop_search_function(e) {
    console.log(e);
    vm.setData({
      name: e.detail.value
    })
  },
  banner: function () {
    wx.request({
      url: config.banner_url,
      data: {
        cityId: vm.data.area_id
      },
      header: {
        "content-type": "application/json"
      },
      method: 'get',
      success: function (ret) {
        console.log(ret, 'banner')

        console.log(JSON.stringify(ret), 'banner');
        if (ret) {
          vm.setData({
            banner_list: ret.data.data
          })
        }
      }
    })
  },
  jump(e) {
    var prid = e.currentTarget.dataset.prid
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.status
    app.globalData.id = prid;
    if (prid != 0) {
      if (type == 1) {
        wx.navigateTo({
          url: '/pages/index/fyDetail/fyDetail',
        })
      } else {
        wx.navigateTo({
          url: '/pages/index/fyDetailzu/fyDetailzu',
        })
      }

    }

  },
  city: function () {
    wx.navigateTo({
      url: '/pages/citys/citys',
    })

  },
  more() {
    wx.navigateTo({
      url: '/pages/goods_house/goods_house',
    })
  },
  detail(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type
    app.globalData.id = id;
    if (type == 2) {
      wx.navigateTo({
        url: '/pages/index/fyDetail/fyDetail',
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/fyDetailzu/fyDetailzu',
      })
    }
  },
  old_house(e) {
    console.log(e);
    var status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '/pages/index/chuzu/chuzu?status=' + status,
    })
  },
  init() {
    wx.request({
      url: config.goodHouseInXiAn_url, //优选热卖
      data: {
        cityId: 1
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (ret) => {
        console.log(ret);
        vm.setData({
          list: ret.data.data,
          one: false
        })
      }
    });
  },
  data_list() {
    wx.request({
      url: config.recommendHouse_url,
      data: {
        cityId: vm.data.area_id,
        start: vm.data.pageNo,
        size: 8
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (ret) => {
        console.log(ret);
        vm.setData({
          list_data: vm.data.list_data.concat(ret.data.data),
          totalRow: ret.data.total,
          two: false
        })
      }
    });
  },
  init_all() {

    wx.request({
      url: config.findRecentlyCity_url, //优选热卖
      data: {
        longitude: vm.data.lon,
        latitude: vm.data.lat
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: (ret) => {
        console.log(ret);
        vm.setData({
          area_id: ret.data.data.id,
          area_name: ret.data.data.name
        })
        wx.setStorageSync('area_name', ret.data.data.name);
        wx.setStorageSync('area_id', ret.data.data.id);
        setTimeout(function () {
          vm.init();
          vm.data_list();
          vm.banner();
          vm.activityList();
        }, 500)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    console.log([
      "                   _ooOoo_",
      "                  o8888888o",
      "                  88\" . \"88",
      "                  (| -_- |)",
      "                  O\\  =  /O",
      "               ____/`---'\\____",
      "             .'  \\\\|     |//  `.",
      "            /  \\\\|||  :  |||//  \\",
      "           /  _||||| -:- |||||-  \\",
      "           |   | \\\\\\  -  /// |   |",
      "           | \\_|  ''\\---/''  |   |",
      "           \\  .-\\__  `-`  ___/-. /",
      "         ___`. .'  /--.--\\  `. . __",
      "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
      "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
      "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
      "======`-.____`-.___\\_____/___.-`____.-'======",
      "                   `=---='",
      "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
      "         佛祖保佑       永无BUG"

    ].join('\n'));
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
    vm = this;

    vm.setData({
      area_id: wx.getStorageSync('area_id'),
      area_name: wx.getStorageSync('area_name'),
      token: wx.getStorageSync('token'),
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        vm.setData({
          lat: res.latitude,
          lon: res.longitude
        })
        wx.setStorageSync('lat', res.latitude)
        wx.setStorageSync('lon', res.longitude)
        if (wx.getStorageSync('area_id') && wx.getStorageSync('area_name')) {
          vm.init();
          vm.data_list();
          vm.banner();
          vm.activityList();
        } else {
          vm.init_all();
        }

      },
      fail() {
        wx.showModal({
          title: '授权提示',
          content: '小程序需要您的当前位置才能使用哦~ ',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            if (res.confirm) {
              wx.getSetting({
                success: function (res) {
                  console.log(res);
                  var statu = res.authSetting;
                  if (!statu['scope.userLocation']) {
                    wx.openSetting({
                      success(data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          //授权成功之后，再调用chooseLocation选择地方
                          wx.getLocation({
                            type: 'wgs84',
                            success(res) {
                              console.log('获取位置成功')
                              vm.setData({
                                lat: res.latitude,
                                lon: res.longitude
                              })
                              wx.setStorageSync('lat', res.latitude)
                              wx.setStorageSync('lon', res.longitude)


                              if (wx.getStorageSync('area_id') && wx.getStorageSync('area_name')) {
                                vm.init();
                                vm.data_list();
                                vm.banner();
                                vm.activityList();
                              } else {
                                vm.init_all();
                              }

                            },
                          })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
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
    wx.showLoading({
      title: '数据加载中',
    })
    vm.setData({
      list: [],
      pageNo: 1
    })
    vm.data_list();
    vm.init();
    vm.banner();
    vm.activityList();
    // 显示顶部刷新图标
    setTimeout(function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(vm.data.totalRow, vm.data.list_data.length)
    if (vm.data.totalRow == vm.data.list_data.length) {
      return
    }
    ++vm.data.pageNo;
    vm.data_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})