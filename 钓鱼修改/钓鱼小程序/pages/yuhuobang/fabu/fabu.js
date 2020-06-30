var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id:1,
    token: "",
    type:'', //	1-图片 2-视频
    catch_type: -1, //1-池钓 2-自然水域
    angling_site_id: -1, //钓场ID
    img: [],
    array: ['池钓', '自然水域'],
    diaochang: [],
    site_id: [],
    index1: -1,
    index2: -1,
    content: "",
    lat: '',
    lon: '',
    now_address: "获取位置中...",
    video:'',
    video_url:'',
    video_thumb:''
  },
  init() {
    //钓场数据
    wx.request({
      url: config.catch_angling_site_list_url,
      data: '',
      header: {},
      method: 'GET',
      success: function(res) {
        // console.log(res)
        var data = res.data.data.catch_list;
        var diaochang = vm.data.diaochang;
        var site_id = vm.data.site_id;
        for (var i = 0; i < data.length; i++) {
          diaochang.push(data[i].name);
          site_id.push(data[i].id)
        }
        vm.setData({
          diaochang
        })
        // console.log(diaochang)
        // console.log(site_id)
      },
    })
  },
  // 位置
  map_init() {
    // qqmapsdk = new QQMapWX({
    //   key: '' // 必填
    //   });
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        vm.setData({
          lat: res.latitude,
          lon: res.longitude
        })
        setTimeout(function() {
          vm.address_init();
        }, 500)
      },
      fail() {
        wx.showModal({
          title: '授权提示',
          content: '小程序需要您的当前位置才能使用哦~ ',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
            if (res.confirm) {
              wx.getSetting({
                success: function(res) {
                  // console.log(res);
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
                              setTimeout(function() {
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
  //根据经纬度展示地区
  address_init() {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: vm.data.lat,
        longitude: vm.data.lon
      },
      success: function(res) {
        // console.log(res)
        vm.setData({
          now_address: res.result.address
        })
      },
      fail: function(res) {
        // console.log(res);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },

  // 文本内容
  content(e) {
    console.log(e.detail.value)
    vm.setData({
      content: e.detail.value
    })
  },
  // 选择渔获类型
  bindPickerChange_yh(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      index1: e.detail.value
    })
    if (e.detail.value == 0) {
      vm.setData({
        catch_type: 1
      })
    } else {
      vm.setData({
        catch_type: 2
      })
    }

  },
  // 选择钓场
  bindPickerChange_dc(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      index2: e.detail.value
    })
    var ss = e.detail.value;
    var site_id = vm.data.site_id;
    vm.setData({
      angling_site_id: site_id[ss]
    })
  },

  // 图片上传
  changeAvatar: function() {
    vm = this;
    if (3 - vm.data.img.length == 0) {
      wx.showToast({
        title: '最多上传9张照片',
        icon: 'none',
      })
      return;
    } else {
      var count = 3 - vm.data.img.length;
    }
    wx.chooseImage({
      count: count,
      // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'],
      // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // console.log(res)
        console.log(res.tempFilePaths + "修改页面")

        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 1) {
          for (var i = 0; i < tempFilePaths.length; i++) {
            vm.upload(vm, tempFilePaths[i]);
          }
        } else {
          vm.upload(vm, tempFilePaths[0]);
        }
        //vm.upload(vm, tempFilePaths);
      },
      fail: function() {
        // fail
      },

    })

  },
  upload: function(page, path) {
    wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
      wx.uploadFile({
        url: config.uploadModuleOrFunctionFiles_url,
        filePath: path,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {//和服务器约定的token, 一般也可以放在header中
        },
        success: function(res) {
          console.log(res);
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          console.log(JSON.parse(res.data));
          var img = JSON.parse(res.data);
          console.log(img);
          vm.setData({ //上传成功修改显示头像
            img: vm.data.img.concat(img.message)
          })
          console.log(vm.data.img);
        },
        fail: function(e) {
          console.log(e);
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function() {
          wx.hideToast(); //隐藏Toast
        }
      })
  },
  // 视频上传
  chooseVideo: function () {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 15,
      camera: 'back',
      success: function (res) {
        console.log(res);
        vm.setData({
          video: res.tempFilePath,//视频
          video_thumb: res.thumbTempFilePath//缩略图
        })
        wx.showLoading({
          title: '上传中，请稍等',
        })
        vm.uploadvideo();
        //vm.upload_thumbs(vm, res.thumbTempFilePath);

      }
    })
  },
  upload_thumbs: function (page, path) {
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    }),
      wx.uploadFile({
        url: config.uploadModuleOrFunctionFiles_url,
        filePath: path,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {//和服务器约定的token, 一般也可以放在header中
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
          console.log(JSON.parse(res.data));
          var img = JSON.parse(res.data);
          console.log(img);
          vm.setData({ //上传成功修改显示头像
            video_thumb: img.message
          })
          console.log(vm.data.img);
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
          wx.hideToast(); //隐藏Toast
        }
      })
  },
  uploadvideo: function () {
    var src = vm.data.video;
    wx.uploadFile({
      url: config.uploadModuleOrFunctionFiles_url,//服务器接口
      filePath: src,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {//和服务器约定的token, 一般也可以放在header中
      },
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        var img = JSON.parse(res.data);
        vm.setData({
          video_url: img.message
        })
      },
      fail: function () {
        console.log('接口调用失败')
      }
    })
  },
  // 删除图片
  del(e) {
    var arr = vm.data.img;
    arr.splice(e.currentTarget.dataset.index, 1);
    vm.setData({
      img: arr
    })
  },
  // 删除视频
  del_video(){
    vm.setData({
      video: '',
      video_url:''
    })
  },
  //发布图片和视频
  fabu() {
    if(vm.data.catch_type==-1){
      wx.showToast({
        title: '请选择渔获类型',
        icon: 'none',
      })
    }else if(vm.data.angling_site_id==-1){
      wx.showToast({
        title: '请选择你的钓场',
        icon: 'none',
      })
    }else{
      var url="";
    if(vm.data.type==1){
      url=vm.data.img
      if(vm.data.img.length==0){
      wx.showToast({
        title: '图片为必填项',
        icon: 'none',
      })
     }
    }else{
      url = vm.data.video_url
      if(vm.data.video_url==''){
      wx.showToast({
        title: '视频为必填项',
        icon: 'none',
      })
      }
    }
    wx.request({
      url: config.publish_url,
      data: {
        token: vm.data.token,
        type: vm.data.type,
        catch_type: vm.data.catch_type, //1-池钓 2-自然水域
        angling_site_id: vm.data.angling_site_id, //钓场ID
        url: url,
        content: vm.data.content,
        vedio_thumb:'http://diaoxie.yunxiaochengxu.top/dy/20191218/1576660284432.jpg'

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res)
        if(res.data.status==1){
          wx.showToast({
            title: '发布成功',
            icon: 'success',
          })
          vm.setData({
            img: [],
            diaochang: [],
            site_id: [],
            index1: -1,
            index2: -1,
            content: "",
            video_url:""
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 2  // 返回上一级页面。
            })
          }, 1000);
        }
      },
    })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
    var token = wx.getStorageSync("token");
    var type = options.type;
   
    vm.setData({
      token: token,
      type: type
    })
    vm.init();
    vm.map_init();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    qqmapsdk = new QQMapWX({
      key: 'YGXBZ-LG6KP-DJEDI-LWBZS-YPML7-JFBWZ' //这里自己的key秘钥进行填充
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})