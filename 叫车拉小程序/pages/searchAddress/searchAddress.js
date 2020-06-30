var common = require('../../common.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '西安市',
    lat: '',
    lon: '',
    backfill: '',    //搜索结果点击的值
    suggestion: [],  //搜索的列表
    province: '',
    inputValue: '',//输入框
    list: [],
    city_name:''
  },
  city(){
    wx.navigateTo({
      url: '/pages/citys/citys?type=1',
    })
  },
  backfills: function (e) {
    console.log(e);
    var id = e.currentTarget.id;
    // for (var i = 0; i < vm.data.suggestion.length; i++) {
    //   if (i == id) {
    //     vm.setData({
    //       backfill: vm.data.suggestion[i].title
    //     });
    //   }
    // }
    console.log(vm.data.suggestion[id]);
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];

    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

      fullAddress: vm.data.suggestion[id].title,

      lat: vm.data.suggestion[id].latitude,//vm.data.suggestion[id].location.lat,

      lon: vm.data.suggestion[id].longitude

    })

    //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。


    //最后就是返回上一个页面。

    wx.navigateBack({

      delta: 1  // 返回上一级页面。
    })
  },
  cahange() {
    console.log(vm.data.list);
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];

    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

      fullAddress: vm.data.list[0].name,

      lat: vm.data.lat,

      lon: vm.data.lon

    })

    //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。


    //最后就是返回上一个页面。

    wx.navigateBack({

      delta: 1  // 返回上一级页面。
    })
  },
  //搜索框文本内容显示
  inputBinds: function (event) {
    console.log(event)
    vm.setData({
      inputValue: event.detail.value
    })
    console.log('bindInput' + vm.data.inputValue)

  },
  //触发关键词输入提示事件
  getsuggest: function (e) {
    console.log(vm.data.inputValue);
    if (vm.data.inputValue == '') {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return;
    }
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: vm.data.inputValue, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      location: vm.data.lat +","+vm.data.lon,
      region: vm.data.city, //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        vm.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          list: [],
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  //根据金纬度展示地区
  init() {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: vm.data.lat,
        longitude: vm.data.lon
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        var city = res.result.address_component.city
        var list = [];
        var obj = {
          name: res.result.formatted_addresses.recommend,
          address: res.result.address
        }
        list.push(obj);
        vm.setData({
          city: city,
          list: list,
          city_name: res.result.address_component.street_number
        })
        console.log(vm.data.list);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  //选择之后的方法
  city_init() {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: vm.data.lat,
        longitude: vm.data.lon
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        var list = [];
        var obj = {
          name: res.result.formatted_addresses.recommend,
          address: res.result.address
        }
        list.push(obj);
        vm.setData({
          list: list,
          city_name: res.result.address_component.street_number
        })
        console.log(vm.data.list);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  map_init() {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res);
        vm.setData({
          lat: res.latitude,
          lon: res.longitude
        })
        setTimeout(function () {
          vm.init();
        }, 500)
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
                              vm.setData({
                                lat: res.latitude,
                                lon: res.longitude
                              })
                              setTimeout(function () {
                                vm.init();
                              }, 500)
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    qqmapsdk = new QQMapWX({
      key: 'N2MBZ-3WUKO-5UXW4-SAQRN-G3WT6-CUFXA' //这里自己的key秘钥进行填充
    });
    vm.map_init();
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