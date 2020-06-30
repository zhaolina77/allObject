var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    list: [],
    user: "", //昵称
    sexli: ["男", "女"], //性别
    sex: 1,
    birthday: "", //生日
    date: '',
    remark: '', //简介
    address: "", //地址
    background: "/image/lizi.png", //背景图
    head_portrait: '/image/ali.jpg', //头像
    type: 1,
    show1:false,
    show2:true,


  },
  change1(){
    vm.setData({
      show1:false,
    show2:true,
    })
  },
  change2(){
    vm.setData({
      show1:true,
    show2:false,
    })
  },
  // 用户昵称
  user(e) {
    var user = e.detail.value;
    vm.setData({
      user: user
    })
    console.log(vm.data.user)
  },
  // 用户性别选择
  sex(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    vm.setData({
      index1: e.detail.value
    })
    if (e.detail.value == 0) {
      vm.setData({
        sex: 1 //男
      })
    } else {
      vm.setData({
        sex: 2 //女
      })
    }
  },
  // 出生日期选择
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  //简介
  remark(e) {
    console.log(e.detail.value)
    vm.setData({
      remark: e.detail.value
    })

  },
  //地址
  address(e) {
    vm.setData({
      address: e.detail.value
    })
  },
  //上传背景图
  backImg(e) {
    var info = e.currentTarget.dataset.info;
    wx.chooseImage({
      count: 1,
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
            vm.upload(vm, tempFilePaths[i], info);
          }
        } else {
          vm.upload(vm, tempFilePaths[0], info);
        }
      },
      fail: function () {},
    })
  },
  upload: function (page, path, info) {
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
        formData: { //和服务器约定的token, 一般也可以放在header中
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
          if (info == 1) {
            vm.setData({ //上传成功修改显示头像
              background: img.message
            })
          } else {
            vm.setData({ //上传成功修改显示头像
              head_portrait: img.message
            })
          }


          console.log(vm.data.background);
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
  init() {
    wx.request({
      url: config.my_url,
      data: {
        token: vm.data.token,
      },
      header: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        var data = res.data.data.account;
        vm.setData({
          background: data.background,
          user: data.nick_name,
          birthday: data.birthday,
          sex: data.sex,
          address: data.address,
          remark: data.remark,
          head_portrait: data.head_portrait
        })
      },
    })
  },
  save() {
    wx.request({
      url: config.my_save_url,
      data: {
        token: vm.data.token,
        head_portrait: vm.data.head_portrait,
        nick_name: vm.data.user,
        sex: vm.data.sex,
        birthday: vm.data.birthday,
        address: vm.data.address,
        background: vm.data.background,
        remark: vm.data.remark
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          vm.init();
          if (vm.type == 1) {
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[pages.length - 2];
            prevPage.init();
            wx.navigateBack({
              delta: 2 // 返回上一级页面。
            })
          }else{
            wx.navigateBack({
              delta: 2 // 返回上一级页面。
            })
          }

        }

      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync("token")
    var type = options.type;
    vm.setData({
      type: type,
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