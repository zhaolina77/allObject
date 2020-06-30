var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
const app = getApp()
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    name: '',
    mobile: '',
    sex: '0',
    sex_name: '男',
    address: '',
    card: '',
    full_address: [],
    pics: [],
    pic_url: [],
    array: ['男', '女'],
  },
  changeAvatar: function () {
      vm = this;
      wx.chooseImage({
        count: 2,
        // 最多可以选择的图片张数，默认9
        sizeType: ['compressed'],
        // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {

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
            var img = JSON.parse(res.data);
            vm.setData({  //上传成功修改显示头像
              pic_url: vm.data.pic_url.concat(img.message)
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
    //选择地址
    bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      vm.setData({
        full_address: e.detail.value
      })
      console.log((e.detail.value.join(' ')))
    },
    //选择性别
    bindPickerChange(e) {
      var index = e.detail.value;
      vm.setData({
        sex: index
      })
    },
    del:function(e){
      var arr = vm.data.pic_url;
      arr.splice(e.currentTarget.dataset.index,1);
      vm.setData({
        pic_url: arr
      })
    },
    //提交地址
    formSubmit(e){
      if(e.detail.value.name==''){
        wx.showToast({
          title: '请输入姓名',
          icon: "none"
        })
        return;
      }
      if (e.detail.value.sex == '') {
        wx.showToast({
          title: '请选择性别',
          icon: "none"
        })
        return;
      }
      if (e.detail.value.card == '') {
        wx.showToast({
          title: '请输入身份证号码',
          icon: "none"
        })
        return;
      }
      if (e.detail.value.mobile == '') {
        wx.showToast({
          title: '请填写联系方式',
          icon: "none"
        })
        return;
      }
      if (!(/^1[34578]\d{9}$/.test(e.detail.value.mobile))) {
        wx.showToast({
          title: '手机号不合法',
          icon: "none"
        })
        return
      }
      if (vm.data.full_address.length == 0) {
        wx.showToast({
          title: '请选择居住地址',
          icon: "none"
        })
        return;
      }
      if (e.detail.value.mobile.length == 0 || e.detail.value.mobile.match(/^[ ]*$/)) {
        wx.showToast({
          title: '手机号不能为空',
          icon: "none"
        })
        return
      }
      if (e.detail.value.address == '') {
        wx.showToast({
          title: '请填写居住地址',
          icon: "none"
        })
        return;
      }
      if (vm.data.pic_url.length !=2){
        wx.showToast({
          title: '请上传身份证正反面照片',
          icon: "none"
        })
        return;
      }
      var sex=1;
      if (e.detail.value.sex == 0) {
        sex = 1
      } else {
        sex = 2
      }
      var url = config.personal_authen_url;
      var param = {
        token: vm.data.token,
        name: e.detail.value.name,
        sex: sex,
        mobile: e.detail.value.mobile,
        address: vm.data.full_address.join(','),
        detailed_address: e.detail.value.address,
        id_number: e.detail.value.card,
        id_card_pic: vm.data.pic_url.join(','),//图片
      } 
       wx.request({
        url: url,
        data: param,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        success: function (ret) {
          console.log(ret.data.status);
          if (ret.data.status == 1) {
            wx.showToast({
              title: ret.data.msg,
              icon: 'success',
              duration: 2000,
            })
            wx.navigateBack({
              delta: 2  // 返回上一级页面。
            })
            
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      vm.setData({
        token: wx.getStorageSync('token')
      })
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