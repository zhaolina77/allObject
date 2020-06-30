var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:3,
    token:"",
    content:"",
    img:[]

  },
  content(e) {
    // console.log(e.detail.value);
    vm.setData({
      content: e.detail.value
    })
  },
  submit(){
    wx.request({
      url: config.angling_site_comment_url,
      data: {
        id:vm.data.id,
        token:vm.data.token,
        content:vm.data.content,
        pic:vm.data.img
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      responseType: 'text',
      success: function(res) {
        console.log(res)
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

        let prevPage = pages[pages.length - 2];
        prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

          pinglunList: [],
          pageNo: 1

        })
        prevPage.init();
        wx.navigateBack({
          delta: 1,
        })
      },
    })

  },

  changeAvatar: function () {
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
          console.log(JSON.parse(res.data));
          var img = JSON.parse(res.data);
          console.log(img);
          vm.setData({  //上传成功修改显示头像
            img: vm.data.img.concat(img.message)
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
          wx.hideToast();  //隐藏Toast
        }
      })
  },
  del: function (e) {
    console.log((vm.data.img));
    console.log(e);
    var arr = vm.data.img;
    arr.splice(e.currentTarget.dataset.index, 1);
    vm.setData({
      img: arr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var id=options.id;
    vm.setData({
      id:id,
      token: wx.getStorageSync('token'),
    })
    // vm.init();

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