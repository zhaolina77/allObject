var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    time: "",
    time1: '',
    img: [],
    imgType: 1,
    array: ['中华人民共和国身份证', '中国香港居民通行证'],
    readConver: "",
    id:"",
    status:-1,
    type:'',



    //传参
    mainType: '1', //主体类型
    businessLicense: '', //营业执照
    socialCreditCode: '', //统一社会信用代码
    merchantName: '', //商户名称
    certificateType: 1, //证件类型 1：中华人民共和国身份证2：中国香港居民通行证
    identityCardFront: '', //身份证正面
    identityCardSide: '', //身份证反面
    papersName: '', //证件姓名
    papersNumber: '', //证件号码
    papersValidity: 1, //证件有效期 1定期 2长期
    papersEffectiveDate: '', //证件生效日期
    papersExpiryDate: '', //证件失效日期
    beneficiaryOrNot: 1, //是否为受益人(1:是  2：否)


  },

  //主体类型
  radioChange(e) {
    // console.log(e)
    vm.setData({
      mainType: e.detail.value
    })
    console.log(vm.data.mainType)
  },
  //营业执照
  changeAvataryy(e) {
    vm.setData({
      imgType: e.currentTarget.dataset.idx1
    })
    vm.changeAvatar();
  },
  //统一社会信用代码
  socialCreditCode(e) {
    vm.setData({
      socialCreditCode: e.detail.value
    })
  },
  //商户名称
  merchantName(e) {
    vm.setData({
      merchantName: e.detail.value
    })
  },
  //证件类型
  bindPickerChange: function (e) {
    var idx = e.detail.value
    if (idx == 0) {
      vm.setData({
        certificateType: 1,
        readConver: vm.data.array[idx]
      })
    } else {
      vm.setData({
        certificateType: 2,
        readConver: vm.data.array[idx]
      })
    }
    console.log(idx, vm.data.certificateType)
  },
  //身份证正面
  changeAvatarz(e) {
    vm.setData({
      imgType: e.currentTarget.dataset.idx1
    })
    vm.changeAvatar();
  },
  //身份证反面
  changeAvatarf(e) {
    vm.setData({
      imgType: e.currentTarget.dataset.idx1
    })
    vm.changeAvatar();
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    console.log(e.detail.value[0])
    var year = e.detail.value.substr(0, 4)
    var month = e.detail.value.substr(5, 2)
    var day = e.detail.value.substr(8, 2)
    var time = year + "年" + month + '月' + day + '日'
    vm.setData({
      papersEffectiveDate: time
    })

  },
  bindDateChange1(e) {
    console.log(e.detail.value)
    console.log(e.detail.value[0])
    var year = e.detail.value.substr(0, 4)
    var month = e.detail.value.substr(5, 2)
    var day = e.detail.value.substr(8, 2)
    var time = year + "年" + month + '月' + day + '日'
    vm.setData({
      papersExpiryDate: time
    })

  },
  // 证件人姓名
  papersName(e) {
    vm.setData({
      papersName: e.detail.value
    })
  },
  //证件号码
  papersNumber(e) {
    vm.setData({
      papersNumber: e.detail.value
    })
  },
  //有效期
  radioChange1(e) {
    // console.log(e)
    vm.setData({
      papersValidity: e.detail.value
    })
    console.log(vm.data.papersValidity)
  },
  //受益人
  radioChange2(e) {
    // console.log(e)
    vm.setData({
      beneficiaryOrNot: e.detail.value
    })
    console.log(vm.data.beneficiaryOrNot)
  },


  next() {
    var status = vm.data.status
    var url = null
    if (status == 0||status == 4) {
      console.log('更新')
      console.log(vm.data.id)
      url = config.updateMerchantsIntoPieces_url
      
      wx.request({
        url: config.updateMerchantsIntoPieces_url,
        data: {
          id:vm.data.id,
          mainType: vm.data.mainType,
          businessLicense: vm.data.businessLicense,
          socialCreditCode: vm.data.socialCreditCode,
          merchantName: vm.data.merchantName,
          certificateType: vm.data.certificateType,
          identityCardFront: vm.data.identityCardFront,
          identityCardSide: vm.data.identityCardSide,
          papersName: vm.data.papersName,
          papersNumber: vm.data.papersNumber,
          papersValidity: vm.data.papersValidity,
          papersEffectiveDate: vm.data.papersEffectiveDate,
          papersExpiryDate: vm.data.papersExpiryDate,
          beneficiaryOrNot: vm.data.beneficiaryOrNot
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
              url: '/pages/business/shanghu/shanghu?id='+res.data.data.id+'&status='+vm.data.status+'&type='+vm.data.type
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
          }
        },
      });
    } else{
      console.log('添加')
      wx.request({
        url: config.mainInformationSave_url,
        data: {
          mainType: vm.data.mainType,
          businessLicense: vm.data.businessLicense,
          socialCreditCode: vm.data.socialCreditCode,
          merchantName: vm.data.merchantName,
          certificateType: vm.data.certificateType,
          identityCardFront: vm.data.identityCardFront,
          identityCardSide: vm.data.identityCardSide,
          papersName: vm.data.papersName,
          papersNumber: vm.data.papersNumber,
          papersValidity: vm.data.papersValidity,
          papersEffectiveDate: vm.data.papersEffectiveDate,
          papersExpiryDate: vm.data.papersExpiryDate,
          beneficiaryOrNot: vm.data.beneficiaryOrNot
        },
        header: {
          contentType: "application/json;charset=UTF-8",
          'token': vm.data.token
  
        },
        method: "POST",
        success: function (res) {
          console.log(res);
          if (res.data.code == 1) {
            vm.setData({
              id:res.data.data.id
            })
  
            wx.navigateTo({
              url: '/pages/business/shanghu/shanghu?id='+vm.data.id+'&status='+vm.data.status+'&type='+vm.data.type
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
          }
        },
      });

    }

    
      

    
    
  },
  next1(){
    wx.redirectTo({
      url: '/pages/business/shanghu/shanghu?id='+vm.data.id+'&status='+vm.data.status+'&type='+vm.data.type,
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
            mainType: res.data.data.merchantsIntoPieces.mainType,
            businessLicense: res.data.data.merchantsIntoPieces.businessLicense,
            socialCreditCode: res.data.data.merchantsIntoPieces.socialCreditCode,
            merchantName: res.data.data.merchantsIntoPieces.merchantName,
            certificateType: res.data.data.merchantsIntoPieces.certificateType,
            identityCardFront: res.data.data.merchantsIntoPieces.identityCardFront,
            identityCardSide: res.data.data.merchantsIntoPieces.identityCardSide,
            papersName: res.data.data.merchantsIntoPieces.papersName,
            papersNumber: res.data.data.merchantsIntoPieces.papersNumber,
            papersValidity: res.data.data.merchantsIntoPieces.papersValidity,
            papersEffectiveDate: res.data.data.merchantsIntoPieces.papersEffectiveDate,
            papersExpiryDate: res.data.data.merchantsIntoPieces.papersExpiryDate,
            beneficiaryOrNot: res.data.data.merchantsIntoPieces.beneficiaryOrNot
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



  //图片上传
  changeAvatar: function () {
    vm = this;
    if (1 - vm.data.img.length == 0) {
      wx.showToast({
        title: '最多上传1张照片',
        icon: 'none',
      })
      return;
    } else {
      var count = 1 - vm.data.img.length;
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
        //vm.upload(vm, tempFilePaths);
      },
      fail: function () {
        // fail
      },

    })

  },
  upload: function (page, path) {
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
          if (vm.data.imgType == 1) {
            vm.setData({
              businessLicense: img.data.fileNames
            })
          } else if (vm.data.imgType == 2) {
            vm.setData({
              identityCardFront: img.data.fileNames
            })
          } else {
            vm.setData({
              identityCardSide: img.data.fileNames
            })
          }
          // vm.setData({ 
          //   img: vm.data.img.concat(img.message)
          // })
        },
        fail: function (e) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var status=options.status
    console.log(status)
    var type=options.type
    var id=options.id
    vm.setData({
      status:status,
      id:id,
      type:type,
      readConver: vm.data.array[0],
      token: token
    })
    if(type==1){
      vm.init()
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