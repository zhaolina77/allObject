var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    id: '',
    flag: 1,
    img: [],
    val: '',
    orderId: '',
    goodsId:'',
    goods_name:'',
    goods_num:0,
    thumb:'',
    spec_name:'',
    goods_price:''

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
  //图片上传
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
  sub() {
    console.log(vm.data.val);
    if (vm.data.val == '') {
      wx.showToast({
        title: '请输入评价内容内容',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    console.log(vm.data.goodsId)
    wx.request({
      url: config.getEvaluate_url,
      data: {
        token: vm.data.token,
        goodsId: vm.data.goodsId,
        orderId: vm.data.orderId,
        content: vm.data.val,
        pic: vm.data.img.join(','),
        level: vm.data.flag,


      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (ret) {
        console.log(ret)
        if (ret.data.status == 1) {
          wx.showToast({
            title: ret.data.msg,
            icon: "none",
            duration: 1000,
          })
          wx.hideLoading()
          setTimeout(function () {
            wx.navigateBack({

            })
          }, 1000)

        } else {
          wx.showToast({
            title: ret.data.msg,
            icon: "none",
            duration: 1000,
          })
        }
      }
    })
  },
  //获取input的值
  verification: function (e) {
    console.log(e);
    var val = e.detail.value;
    vm.setData({
      val: val
    })
  },
  // 整体服务
  changeColor1(e) {
    vm.setData({
      flag: e.currentTarget.dataset.idx
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;

    var item = JSON.parse(options.item)
    console.log(item)
    vm.setData({
      token: wx.getStorageSync('token'),
      goodsId: item.goods_id,
      orderId: item.order_id,
      goods_name: item.goods_name,
      goods_num: item.goods_num,
      thumb: item.thumb,
      spec_name: item.spec_name,
      goods_price: item.goods_price
    })
    console.log(vm.data.goodsId)

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