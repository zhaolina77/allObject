// pages/evaluat/evaluat.js
var common = require("../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    orderId: 0,
    head:'',
    cnumber: '',
    list: [],
    token: '',
    level:0,
    pic:[],
    te_label:'',
    content:'',
    focus:false,
    type:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    this.setData({
      orderId: options.id,
      head: options.head,
      cnumber: options.cnumber,
      token: wx.getStorageSync('token'),
      name:options.name,
      type: options.type
      
    })

    this.getdata();

  },
  getdata:function(){  //获取投诉列表
    var that = this;
    wx.request({
      url: config.labelList_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        type: 0
      },

      success(res) {
        // wx.hideNavigationBarLoading();
        // wx.hideLoading();
        // // 停止下拉动作
        // wx.stopPullDownRefresh();
        if (res.data.status == 1) {
          that.setData({

            list: res.data.labelList

          })
        }
        console.log(that.data.list)

      }
    })
  },
  tab:function(e){   //选择标签
    var index = e.currentTarget.dataset.index;
    console.log(index)
    // 提前准备好对象
     var list=this.data.list;
    list[index].is_del = list[index].is_del?0:1;

    // 依旧是根据index获取数组中的对象


    this.setData({
      list: list
    })
    console.log(this.data.list)
  },
  getlevel:function(e){
    this.setData({
      level: e.currentTarget.dataset.level
    })
  },
  del: function (e) {

    var arr = vm.data.pic;
    arr.splice(e.currentTarget.dataset.index, 1);
    vm.setData({
      pic: arr
    })
  },
  //图片上传
  changeAvatar: function () {
     vm = this;
    if (3 - vm.data.pic.length == 0) {
      wx.showToast({
        title: '最多上传3张照片',
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
      url: config.imgs_url,
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
          wx.hideToast();  //隐藏Toast
        }
      })
  },
  getphone:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  sub() {
    console.log(this.data.content);
    this.setData({
      focus: 'false',
      content: this.data.content,
    })
    var that=this;
    var te_label=[];
    that.data.list.map(function(item){
          if(item.is_del==1){

            te_label.push(item.id)
          }
    })
    if (that.data.content == '') {
      wx.showToast({
        title: '请输入评价内容',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: config.addEvaluate_url,
      data: {
        token: that.data.token,
        orderId: that.data.orderId,
        level: that.data.level,
        pic: that.data.pic.join(','),
        te_label: te_label.join(','),
        content: that.data.content,




      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
          })
          var pages = getCurrentPages();
          if (that.data.type=='order'){
            var prevPage = pages[pages.length - 2];  //上一个页面
            prevPage.setData({
              list: [],
              pageNo: 1
            });
            prevPage.getorder();
            wx.navigateBack({
              delta: 1
            })
          }
          else {
            var prevPage = pages[pages.length - 3];  //上一个页面
            prevPage.setData({
              list: [],
              pageNo: 1
            });
            prevPage.getorder();
            wx.navigateBack({
              delta: 1
            })
          }

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 1000,
          })
        }
      }
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