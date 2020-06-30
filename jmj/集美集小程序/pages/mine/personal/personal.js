var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],
    array: ['男', '女'],
    token: '',
    head_portrait: '',
    nick_name: '',
    phone: '',
    sex: '',
    birthday: '',
    remark: '',
  },
  init() {
    
    wx.request({
      url: config.persionData_url, //个人信息
      data: {
        token: vm.data.token,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        console.log(res, '个人信息')
        if (res.data.status == 1) {
          vm.setData({
            account: res.data.data.account,
            head_portrait: res.data.data.account.head_portrait,
            nick_name: res.data.data.account.nick_name,
            phone: res.data.data.account.phone,
            sex: res.data.data.account.sex,
            birthday: res.data.data.account.birthday,
            remark: res.data.data.account.remark
          })
        }
      },
    })
  },

  //昵称
  nick_name(e){
    vm.setData({
      nick_name: e.detail.value
    })
  },
  //签名remark
  remark(e) {
    vm.setData({
      remark: e.detail.value
    })
  },

  //   性别
  bindPickerChange: function (e) {
    console.log(e)
    var sexType = e.detail.value
    console.log(sexType)
    if (sexType == 0) {
      vm.setData({
        sex: 1
      })
    } else {
      vm.setData({
        sex: 2
      })
    }
  },

  //出生日期
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  save() {
    if(vm.data.nick_name==''){
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
      })
      return
    }
    if(vm.data.remark==''){
      wx.showToast({
        title: '请输入个性签名',
        icon: 'none',
      })
      return
    }
    if(vm.data.birthday==''){
      wx.showToast({
        title: '请选择出生日期',
        icon: 'none',
      })
      return
    }

    wx.request({
      url: config.updateAccount_url, //个人信息
      data: {
        token: vm.data.token,
        head_portrait:vm.data.head_portrait,
        nick_name:vm.data.nick_name,
        sex: vm.data.sex,
        birthday: vm.data.birthday,
        remark: vm.data.remark
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          vm.init();

          setTimeout(function () {
            wx.navigateBack({
              delta: 2 // 返回上一级页面。
            })
          }, 500)


        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }


      },
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
        url: config.appletImgs_url,
        filePath: path,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          //和服务器约定的token, 一般也可以放在header中

        },
        success: function (res) {
          console.log(res);
          if (res.statusCode != 200) {
            console.log('上传失败')
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
          vm.setData({ //
            head_portrait: img.data.fileNames
          })
          console.log(vm.data.img)
        },
        fail: function (e) {
          console.log('上传失败')
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
    vm.setData({
      token: token
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})