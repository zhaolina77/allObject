var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    dic:"",
    pic1: '',
    pic2: '',
    pic3: '',
    img:[]

  },
  init(){
    wx.request({
      url: config.createPrefectureInfo_url,//创业专区申请说明
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res,'创业专区申请说明');
        if(res.data.status==1){
          WxParse.wxParse('article', 'html', res.data.dic.content, vm, 5)  
          // vm.setData({
          //   dic:res.data.dic
          // })
        }
      },
    });

  },
  changeAvatar(e) {
    var idx = e.currentTarget.dataset.idx
    // console.log(idx)
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
      // 最多可以选择的图片张数
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
            vm.upload(vm, tempFilePaths[i], idx);
          }
        } else {
          vm.upload(vm, tempFilePaths[0], idx);
        }
        // vm.upload(vm, tempFilePaths, idx);
      },
      fail: function () {},
    })
  },
  upload: function (page, path, idx) {
    console.log(idx)
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
          vm.setData({  //
            img: img.data.fileNames
          })
          if (idx == 1) {
            vm.setData({
              pic1:vm.data.img
            })
          }else if(idx==2){
            vm.setData({
              pic2:vm.data.img
            })
          }else{
            vm.setData({
              pic3:vm.data.img
            })
          }
          console.log(vm.data.img)
        },
        fail: function (e) {
          console.log(e);
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
  tijiao(){
    wx.request({
      url: config.submitApply_url,//提交创业专区申请
      data: {
        token:vm.data.token,
        businessLicense:vm.data.pic1,
        frontIdentityCard:vm.data.pic2,
        sideIdentityCard:vm.data.pic3
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res,'提交创业专区申请');
        if(res.data.status==1){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          wx.navigateTo({
            url: '/pages/index/shenqingCg/shenqingCg',
          })
          
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 500);
         
        }
      },
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token=wx.getStorageSync('token')
    vm.setData({
      token:token
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