var common = require('../../../common.js');
var config = common.getconfig();
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var vm = null;
const app = getApp()
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    name: '',
    mobile: '',
    address: '',
    card: '',
    job: '',
    type_name: '',
    full_address: [],
    pics: [],
    pic_url: [],
    pics_url: [],
    contacts_name: '',
    list: [],
    lat: '',
    lon: '',

    first: 0,
    type_ids: [],
    array:[],
    shopTypeId:'',
    show: 0
  },
  select(e) {
    var index = e.currentTarget.dataset.index;
    var list = vm.data.list;
    if (list[index].is_del == 1) {
      list[index].is_del = 0
    } else {
      list[index].is_del = 1
    }
    var type_name = []
    for (var i = 0; i < list.length; i++) {
      if (list[i].is_del == 1) {
        type_name.push(list[i].name)
      }
    }
    vm.setData({
      list,
      type_name
    })
  },
  cahnge_type() {
    vm.setData({
      show: 1
    })
  },

  changeAvatar: function () {
    vm = this;
    wx.chooseImage({
      count: 2,
      // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'],
      // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {

        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 1) {
          for (var i = 0; i < tempFilePaths.length; i++) {
            vm.upload(vm, tempFilePaths[i]);
          }
        } else {
          vm.upload(vm, tempFilePaths[0]);
        }
      },
      fail: function () {
        
      },

    })

  },
  upload: function (page, path) {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
      wx.uploadFile({
        url: config.uploadModuleOrFunctionFiles_url,
        filePath: path,
        name: 'file',
        header: { "Content-Type": "multipart/form-data" },
        formData: {
          //和服务器约定的token, 一般也可以放在header中

        },
        success: function (res) {
          console.log(res);
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          var img = JSON.parse(res.data);
          vm.setData({  //上传成功修改显示头像
            pic_url: vm.data.pic_url.concat(img.message)
          })
        },
        fail: function (e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast();  //隐藏Toast
        }
      })
  },

  changeAvatars: function () {
    vm = this;
    wx.chooseImage({
      count: 6,
      // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'],
      // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {

        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 1) {
          for (var i = 0; i < tempFilePaths.length; i++) {
            vm.uploads(vm, tempFilePaths[i]);
          }
        } else {
          vm.uploads(vm, tempFilePaths[0]);
        }
      },
      fail: function () {
        // fail
      },

    })

  },
  uploads: function (page, path) {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
      wx.uploadFile({
        url: config.uploadModuleOrFunctionFiles_url,
        filePath: path,
        name: 'file',
        header: { "Content-Type": "multipart/form-data" },
        formData: {
          //和服务器约定的token, 一般也可以放在header中

        },
        success: function (res) {
          console.log(res);
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          var img = JSON.parse(res.data);
          vm.setData({  //上传成功修改显示头像
            pics_url: vm.data.pics_url.concat(img.message)
          })
        },
        fail: function (e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast();  //隐藏Toast
        }
      })
  },



  //选择地址
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      full_address: e.detail.value
    })
    console.log((e.detail.value.join(' ')))
  },
  //选择类型
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      shopTypeId: vm.data.list[e.detail.value].id
    })
  },
  del: function (e) {
    var arr = vm.data.pic_url;
    arr.splice(e.currentTarget.dataset.index, 1);
    vm.setData({
      pic_url: arr
    })
  },
  dels: function (e) {
    var arr = vm.data.pics_url;
    arr.splice(e.currentTarget.dataset.index, 1);
    vm.setData({
      pics_url: arr
    })
  },
  close() {
    vm.setData({
      show: 0
    })
  },
  //提交地址
  formSubmit(e) {
    if (e.detail.value.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
      return;
    }
    if (e.detail.value.card == '') {
      wx.showToast({
        title: '请输入身份证号码',
        icon: "none"
      })
      return;
    }
    if (e.detail.value.shopName == '') {
      wx.showToast({
        title: '请输入店铺名称',
        icon: "none"
      })
      return;
    }
    if (e.detail.value.phone == '') {
      wx.showToast({
        title: '请填写联系方式',
        icon: "none"
      })
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(e.detail.value.phone))) {
      wx.showToast({
        title: '手机号不合法',
        icon: "none"
      })
      return
    }
    if (e.detail.value.phone.length == 0 || e.detail.value.phone.match(/^[ ]*$/)) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      return
    }
    if (vm.data.full_address.length == 0) {
      wx.showToast({
        title: '请填选择店铺区域',
        icon: "none"
      })
      return;
    }

    if (e.detail.value.address == '') {
      wx.showToast({
        title: '请填写店铺地址',
        icon: "none"
      })
      return;
    }
    if (vm.data.pics_url.length == 0) {
      wx.showToast({
        title: '请上传营业执照照片',
        icon: "none"
      })
      return;
    }
    if (vm.data.pic_url.length != 2) {
      wx.showToast({
        title: '请上传身份证正反面照片',
        icon: "none"
      })
      return;
    }
    var type_ids = []
    for (var i = 0; i < vm.data.list.length; i++) {
      if (vm.data.list[i].is_del == 1) {
        type_ids.push(vm.data.list[i].id)
      }
    }
    if (vm.data.shopTypeId == 0) {
      wx.showToast({
        title: '请选择钓场类型',
        icon: "none"
      })
      return;
    }
    var url = config.shopEnterSub_url;
    var param = {
      token: vm.data.token,
      shopName: e.detail.value.shopName,
      name: e.detail.value.name,
      shopTypeId: vm.data.shopTypeId,
      phone: e.detail.value.phone,
      longitude: vm.data.lon,
      latitude: vm.data.lat,
      detailed_address: e.detail.value.address,
      addresss: vm.data.full_address.join(','),
      address: e.detail.value.now_address,
      pics: vm.data.pics_url.join(','),//图片
      id_card: e.detail.value.card,
      id_card_pic: vm.data.pic_url.join(','),//图片
    }
    //console.log(param); return;
    wx.request({
      url: url,
      data: param,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (ret) {
        console.log(ret.data.status);
        if (ret.data.status == 1) {
          wx.showToast({
            title: ret.data.msg,
            icon: 'success',
            duration: 2000,
          })
          wx.navigateBack({
            delta: 2  // 返回上一级页面。
          })

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
  init() {
    wx.request({
      url: config.shopType_url,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      success: ret => {
        console.log(ret);
        if (ret.data.status == 1) {
          var array = [];
          for (var i = 0; i < ret.data.data.shopTypeList.length; i++) {
            array.push(ret.data.data.shopTypeList[i].name)
          }
          vm.setData({
            list: ret.data.data.shopTypeList,
            array
          })
        } else {
          wx.showToast({
            title: ret.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  map_init() {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        vm.setData({
          lat: res.latitude,
          lon: res.longitude
        })
        setTimeout(function () {
          vm.address_init();
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
                                vm.address_init();
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
  //根据金纬度展示地区
  address_init() {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: vm.data.lat,
        longitude: vm.data.lon
      },
      success: function (res) {
        vm.setData({
          now_address: res.result.address
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    qqmapsdk = new QQMapWX({
      key: 'YGXBZ-LG6KP-DJEDI-LWBZS-YPML7-JFBWZ' //这里自己的key秘钥进行填充
    });
    vm.setData({
      token: wx.getStorageSync('token')
    })
    vm.init();
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