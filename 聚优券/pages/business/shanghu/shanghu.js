var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgType: '',
    region: '',
    id:"",
    img: [],
    status:'',
    type:'',


    // 参数
    merchantNameTwo: "", //商户名称
    merchantTelephone: "", //商户电话
    businessEmail:"",//商户邮箱
    developerName:"",//拓展员姓名
    developerPhone:"",//拓展员电话
    agreedDiscount:"",//约定折扣


    shopName: "", //店铺名称
    shopProvincialCode: "", //店铺省市编码
    shopAddress: "", //店铺地址
    shopDoorHeadPhoto: "", //店铺门头照片
    shopEnvironmentalPhoto: "" //店铺环境照片

  },


  //商户名称
  merchantNameTwo(e) {
    vm.setData({
      merchantNameTwo: e.detail.value
    })
  },
  //商户电话
  merchantTelephone(e) {
    vm.setData({
      merchantTelephone: e.detail.value
    })
  },
   //商户邮箱
   businessEmail(e) {
    vm.setData({
      businessEmail: e.detail.value
    })
  },
  //拓展员姓名
  developerName(e) {
    vm.setData({
      developerName: e.detail.value
    })
  },
  //拓展员电话
  developerPhone(e) {
    vm.setData({
      developerPhone: e.detail.value
    })
  },
  //约定折扣
  agreedDiscount(e) {
    vm.setData({
      agreedDiscount: e.detail.value
    })
  },



  shopAddress(e){
    vm.setData({
      shopAddress: e.detail.value
    })
  },

  // bindRegionChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   var x = e.detail.value.join("")
  //   // console.log(x)
  //   this.setData({
  //     shopAddress: x
  //   })
  // },

  //店铺名称
  shopName(e) {
    vm.setData({
      shopName: e.detail.value
    })
  },
  //商户简称
  shopProvincialCode(e) {
    vm.setData({
      shopProvincialCode: e.detail.value
    })
  },

  // 照片
  changeAvatar1(e) {
    vm.setData({
      imgType: e.currentTarget.dataset.idx1
    })
    vm.changeAvatar();
  },
  changeAvatar2(e) {
    vm.setData({
      imgType: e.currentTarget.dataset.idx1
    })
    vm.changeAvatar();
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
            id:vm.data.id,
            merchantNameTwo: res.data.data.merchantsIntoPieces.merchantNameTwo,
            merchantTelephone: res.data.data.merchantsIntoPieces.merchantTelephone,
            businessEmail:res.data.data.merchantsIntoPieces.businessEmail,
            developerName:res.data.data.merchantsIntoPieces.developerName,
            developerPhone:res.data.data.merchantsIntoPieces.developerPhone,
            agreedDiscount:res.data.data.merchantsIntoPieces.agreedDiscount,
            shopName: res.data.data.merchantsIntoPieces.shopName,
            shopProvincialCode: res.data.data.merchantsIntoPieces.shopProvincialCode,
            shopAddress: res.data.data.merchantsIntoPieces.shopAddress,
            shopDoorHeadPhoto: res.data.data.merchantsIntoPieces.shopDoorHeadPhoto,
            shopEnvironmentalPhoto: res.data.data.merchantsIntoPieces.shopEnvironmentalPhoto
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

  next() {
    console.log(vm.data.id)
      wx.request({
        url: config.businessformationSave_url,
        data: {
          id:vm.data.id,
          merchantNameTwo: vm.data.merchantNameTwo,
          merchantTelephone: vm.data.merchantTelephone,
          businessEmail:vm.data.businessEmail,
          developerName:vm.data.developerName,
          developerPhone:vm.data.developerPhone,
          agreedDiscount:vm.data.agreedDiscount,
          shopName: vm.data.shopName,
          shopProvincialCode: vm.data.shopProvincialCode,
          shopAddress: vm.data.shopAddress,
          shopDoorHeadPhoto: vm.data.shopDoorHeadPhoto,
          shopEnvironmentalPhoto: vm.data.shopEnvironmentalPhoto
  
        },
        header: {
          contentType: "application/json;charset=UTF-8",
          'token': vm.data.token
        },
        method: "POST",
        success: function (res) {
          console.log(res);
          if (res.data.code == 1){
            wx.redirectTo({
              url: '/pages/business/guize/guize?id='+res.data.data.id+'&status='+vm.data.status+'&type='+vm.data.type,
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
  next1(){
    wx.redirectTo({
      url: '/pages/business/guize/guize?id='+vm.data.id+'&status='+vm.data.status+'&type='+vm.data.type,
    })
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
              shopDoorHeadPhoto: img.data.fileNames
            })
          } else if (vm.data.imgType == 2) {
            vm.setData({
              shopEnvironmentalPhoto: img.data.fileNames
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
    var type=options.type
    var id=options.id
    vm.setData({
      type:type,
      status:status,
      id:id,
      token: token
    })
    if(type==1){
      vm.init()
    }
    console.log(vm.data.id)

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