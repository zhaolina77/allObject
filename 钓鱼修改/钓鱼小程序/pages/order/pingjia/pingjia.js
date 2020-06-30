var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    goodsId: 17,
    orderId: 135,
    level: 3,
    pic: [],
    content: '',
    evaluate: {},
    star: 1

  },
  submit() {
    wx.request({
      url: config.addGoodEvaluate_url,
      data: {
        goodsId: vm.data.goodsId,
        orderId: vm.data.orderId,
        token: vm.data.token,
        level: vm.data.level,
        pic: vm.data.pic.join(','),
        content: vm.data.content,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          setTimeout(() => {
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[pages.length - 2];
            prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

              list: [],
              pageNo: 1

            })
            prevPage.init();
            wx.navigateBack({
              delta: 2  // 返回上一级页面。
            })

          }, 1000);

        }

      }
    })
  },
  // 内容部分
  content(e) {
    // console.log(e.detail.value)
    vm.setData({
      content: e.detail.value
    })
  },
  // 提交评价

  // 评分等级
  star(e) {
    // console.log(e.currentTarget.dataset.num)
    vm.setData({
      level: e.currentTarget.dataset.num
    })
  },
  // 图片上传
  changeAvatar: function () {
    vm = this;
    if (3 - vm.data.pic.length == 0) {
      wx.showToast({
        title: '最多上传9张照片',
        icon: 'none',
      })
      return;
    } else {
      var count = 3 - vm.data.pic.length;
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
          vm.setData({ //上传成功修改显示头像
            pic: vm.data.pic.concat(img.message)
          })
          console.log(vm.data.pic);
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
  // 删除图片
  del(e) {
    var arr = vm.data.pic;
    arr.splice(e.currentTarget.dataset.index, 1);
    vm.setData({
      pic: arr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var goodId = options.goodId;
    var orderId = options.orderId;
    var token = wx.getStorageSync('token');
    vm.setData({
      // goodsId: goodId,
      // orderId: orderId,
      token: token
    })
    console.log(vm.data.goodsId, vm.data.orderId)
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