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
    id: "",
    bank: '',
    bankList: [],
    accountList: [],
    img:[],
    //传参
    accountType: 1, //账户类型
    accountName: '', //开户名称
    banksId: '', //银行表id
    accountOpeningBranch: '', //开户支行
    cardNumber: '', //银行卡号
    payCode: "", //支付码
    status: '',
    cardPhoto:'',//





  },

  //主体类型
  radioChange(e) {
    // console.log(e)
    vm.setData({
      accountType: e.detail.value
    })
    console.log(vm.data.accountType)
  },

  accountName(e) {
    console.log(e)
    vm.setData({
      accountName: e.detail.value
    })
  },
  accountOpeningBranch(e) {
    vm.setData({
      accountOpeningBranch: e.detail.value
    })
  },
  cardNumber(e) {
    vm.setData({
      cardNumber: e.detail.value
    })
  },
  payCode(e) {
    vm.setData({
      payCode: e.detail.value
    })
  },
  //商户名称
  merchantName(e) {
    vm.setData({
      merchantName: e.detail.value
    })
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


  next(e) {
    var idx=e.currentTarget.dataset.idx
    var status = vm.data.status
    var url = null
    if (status == 0) {
      url = config.updateMerchantsIntoPieces_url
    } else(
      url = config.accountCreditedSave_url
    )

    wx.request({
      url: url,
      data: {
        id: vm.data.id,
        accountType: vm.data.accountType,
        accountName: vm.data.accountName,
        banksId: vm.data.banksId,
        accountOpeningBranch: vm.data.accountOpeningBranch,
        cardNumber: vm.data.cardNumber,
        payCode: vm.data.payCode,
        cardPhoto:vm.data.cardPhoto,
        status: idx
      },
      header: {
        contentType: "application/json;charset=UTF-8",
        'token': vm.data.token

      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.data.code == 1) {
          // vm.setData({
          //   id: res.data.data.id
          // })
          wx.redirectTo({
            url: "/pages/business/index/index",
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
      url: "/pages/business/index/index",
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
            accountType: res.data.data.merchantsIntoPieces.accountType,
            accountName: res.data.data.merchantsIntoPieces.accountName,
            banksId: res.data.data.merchantsIntoPieces.banksId,
            accountOpeningBranch: res.data.data.merchantsIntoPieces.accountOpeningBranch,
            cardNumber: res.data.data.merchantsIntoPieces.cardNumber,
            payCode: res.data.data.merchantsIntoPieces.payCode,
            cardPhoto:res.data.data.merchantsIntoPieces.cardPhoto,
          })
          for (let index = 0; index < vm.data.accountList.length; index++) {
            if (res.data.data.merchantsIntoPieces.banksId == vm.data.accountList[index].id) {
              vm.setData({
                bank: vm.data.accountList[index].name,
                banksId: vm.data.accountList[index].id
              })


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


  account() {

    wx.request({
      url: config.bankList_url,
      data: {},
      header: {
        contentType: "application/json;charset=UTF-8",

      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if (res.data.code == 1) {
          vm.setData({
            accountList: res.data.data.bankList
          })
          var lis1 = res.data.data.bankList
          var list1 = []
          for (let index = 0; index < lis1.length; index++) {
            list1.push(lis1[index].name)
          }
          vm.setData({
            bankList: list1
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
      bank: vm.data.accountList[idx].name,
      banksId: vm.data.accountList[idx].id
    })
    console.log(vm.data.guize)
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
            vm.setData({
              cardPhoto: img.data.fileNames
            })
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
    var status = options.status
    console.log(status)
    var type = options.type
    var token = wx.getStorageSync('token')
    var id = options.id
    vm.setData({
      type: type,
      status: status,
      token: token,
      id: id,
    })
    if (type == 1) {
      vm.init()
    }
    vm.account();
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