var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    token: '',
    status: '',
    img: [],
    id: 1,
    list: [],
    zzList: [],
    guize: "",
    tixing: '',
    zizhi: "",
    is_update: '', //判断是修改
    zizhiList: [],
    industryRuleList: [], //规则列表
    industryRuleId: "", //行业规则
    specialQualificationsId: '', //特殊资质表id
    photosOfQualification: '', //特殊资质照片
  },
  next() {

    wx.request({
      url: config.industryRuleSave_url,
      data: {
        id: vm.data.id,
        industryRuleId: vm.data.industryRuleId,
        specialQualificationsId: vm.data.specialQualificationsId,
        photosOfQualification: vm.data.img.join(',')
        // photosOfQualification: vm.data.photosOfQualification
      },
      header: {
        contentType: "application/json;charset=UTF-8",
        'token': vm.data.token
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '/pages/business/zhanghu/zhanghu?id=' + res.data.data.id + '&status=' + vm.data.status + '&type=' + vm.data.type,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });
  },
  next1() {
    wx.redirectTo({
      url: '/pages/business/zhanghu/zhanghu?id=' + vm.data.id + '&status=' + vm.data.status + '&type=' + vm.data.type,
    })
  },

  guize() {
    wx.request({
      url: config.industryRuleList_url,
      data: {},
      header: {
        contentType: "application/json;charset=UTF-8",
      },
      method: "POST",
      success: function (res) {
        console.log(res, '规则');
        if (res.data.code == 1) {
          vm.setData({
            industryRuleList: res.data.data.industryRuleList
          })
          var lis = res.data.data.industryRuleList
          var list = []
          for (let index = 0; index < lis.length; index++) {
            list.push(lis[index].name)
          }
          vm.setData({
            list: list
          })


          if (vm.data.type == 1) {
            vm.init()
          }



        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });

  },
  zizhi() {
    wx.request({
      url: config.specialQualificationsList_url,
      data: {
        id: vm.data.industryRuleId
      },
      header: {
        contentType: "application/json;charset=UTF-8",
      },
      method: "POST",
      success: function (res) {
        console.log(res, '资质');
        if (res.data.code == 1) {
          vm.setData({
            zizhiList: res.data.data.specialQualificationsList
          })
          var lis1 = res.data.data.specialQualificationsList
          var list1 = []
          for (let index = 0; index < lis1.length; index++) {
            list1.push(lis1[index].name)
          }
          if (vm.data.is_update == 1) {
            for (let index = 0; index < vm.data.zizhiList.length; index++) {
              if (vm.data.specialQualificationsId == vm.data.zizhiList[index].id) {
                vm.setData({
                  zizhi: vm.data.zizhiList[index].name
                })
              }

            }
          }
          vm.setData({
            zzList: list1
          })


        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });

  },
  bindPickerChange(e) {
    console.log(e)
    var idx = e.detail.value
    vm.setData({
      guize: vm.data.industryRuleList[idx].name,
      tixing: vm.data.industryRuleList[idx].explains,
      industryRuleId: vm.data.industryRuleList[idx].id
    })
    vm.zizhi()
    console.log(vm.data.guize)
  },
  bindPickerChange1(e) {

    var idx = e.detail.value
    console.log(idx)
    vm.setData({
      zizhi: vm.data.zizhiList[idx].name,
      specialQualificationsId: vm.data.zizhiList[idx].id
    })
  },

  //图片上传
  changeAvatar: function () {
    vm = this;
    if (vm.data.img == null) {
      vm.setData({
        img: [],
        photosOfQualification: ''
      })
    }
    if (3 - vm.data.img.length == 0) {
      wx.showToast({
        title: '最多上传1张照片',
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
      success: function (res) {
        console.log(res)
        console.log(res.tempFilePaths + "修改页面")

        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 1) {
          for (var i = 0; i < tempFilePaths.length; i++) {
            vm.upload(vm, tempFilePaths[i]);
          }

        } else {
          vm.upload(vm, tempFilePaths[0]);
        }
        // vm.upload(vm, tempFilePaths);
      },
      fail: function () {
        // fail
      },
    })

  },
  upload: function (page, path) {
    console.log("图片上传")
    wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
      wx.uploadFile({
        url: config.appUpload_url,
        filePath: path,
        name: 'file',
        header: {
          contentType: "application/json;charset=UTF-8",
        },
        formData: {
          //和服务器约定的token, 一般也可以放在header中

        },

        success: function (res) {
          console.log("图片上传成功")
          console.log(res);
          if (res.statusCode != 200) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            return;
          }
          // console.log(JSON.parse(res.data));
          var img = JSON.parse(res.data);
          console.log(img)

          vm.setData({
            img: vm.data.img.concat(img.data.fileNames),
            photosOfQualification: img.data.fileNames
          })
        },
        fail: function (e) {
          console.log("图片上传失败")
          // console.log(e);
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
  del: function (e) {
    console.log(vm.data.img);
    console.log(e.currentTarget.dataset.index);
    var arr = vm.data.img;
    arr.splice(e.currentTarget.dataset.index, 1);
    vm.setData({
      img: arr
    })
  },

  init() {
    wx.request({
      url: config.checkMerchantsIntoPieces_url,
      data: {
        id: vm.data.id
      },
      header: {
        contentType: "application/json;charset=UTF-8",
        'token': vm.data.token

      },
      method: "POST",
      success: function (res) {
        console.log(res, '根据商户进件id查看详情');
        if (res.data.code == 1) {
          vm.setData({
            industryRuleId: res.data.data.merchantsIntoPieces.industryRuleId,
            specialQualificationsId: res.data.data.merchantsIntoPieces.specialQualificationsId,
            img: res.data.data.merchantsIntoPieces.photosOfQualificationList,
            photosOfQualification: res.data.data.merchantsIntoPieces.photosOfQualification
          })
          for (let index = 0; index < vm.data.industryRuleList.length; index++) {
            
            if (res.data.data.merchantsIntoPieces.industryRuleId == vm.data.industryRuleList[index].id) {
              vm.setData({
                guize: vm.data.industryRuleList[index].name,
                industryRuleId: vm.data.industryRuleList[index].id,
                is_update: 1
              })
              console.log('查询12121212')
              setTimeout(function(){
                vm.zizhi()

              },500)
              
            }else{
              console.log('查询资质列表')
              
            }
          }





        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var status = options.status
    console.log(status)
    var type = options.type
    var token = wx.getStorageSync('token')
    var id = options.id
    vm.setData({

      type: type,
      status: status,
      id: id,
      token: token
    })
    vm.guize();
    
    


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