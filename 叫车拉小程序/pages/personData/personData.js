var common = require('../../common.js');
var config = common.getconfig();
var vm = '';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    birthday: '',
    head: '',
    cover_url: '',
    name: '',
  },
  //搜索框文本内容显示
  inputBinds: function (event) {
    console.log(event)
    vm.setData({
      name: event.detail.value
    })
    console.log('bindInput' + vm.data.name)

  },
  changeAvatar: function () {
    vm = this;
    // var childId = wx.getStorageSync("child_id");
    // var token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 1,
      // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'],
      // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'],
      // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        console.log(res.tempFilePaths + "修改页面")

        var tempFilePaths = res.tempFilePaths;

        vm.upload(vm, tempFilePaths[0]);
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
        url: config.uploadModuleOrFunctionFiles_url,
        filePath: path,
        name: 'file',
        header: { "Content-Type": "multipart/form-data" },
        formData: {
          //和服务器约定的token, 一般也可以放在header中
          'tid': wx.getStorageSync('tid')
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
            cover_url: img.message
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
  save: function () {
    wx.request({
      url: config.editPerson_url,
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        token: vm.data.token,
        headPortrait: vm.data.cover_url,
        nickName: vm.data.name,
        birthday: vm.data.birthday,

      },
      success: ret => {
        console.log(ret);
        wx.showToast({
          title: ret.data.msg,
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1  // 返回上一级页面。
          })
        }, 500)
      }
    })
  },
  init() {
    wx.request({
      url: config.personData_url,
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: {
        token: vm.data.token
      },
      success: ret => {
        console.log(ret);
        vm.setData({
          name: ret.data.data.account.nick_name,
          birthday: ret.data.data.account.birthday,
          head: ret.data.data.account.head_portrait,
          cover_url: ret.data.data.account.head_portrait,
        })
      },
    })
  },
  bindDateChange(e){
    console.log(e)
    vm.setData({
      birthday: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.setData({
      token: wx.getStorageSync('token')
    })
    vm.init()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})