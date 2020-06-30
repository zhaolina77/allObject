//index.js
//获取应用实例
var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require('../../../wxParse/wxParse.js');
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canvasS: false,
    path: "",
    head:'',
    name:'',
    rcode:'',
    pics:[],
    pic:''
  },
  onLoad: function (options) {
    console.log(JSON.stringify(options))
      this.setData({
        head: options.head,
        name: options.name,
        rcode: options.rcode
      })
    this.getdata();
    this.getpic();
  },
  getpic:function(){
    var that = this;
    wx.request({
      url: config.backGroundImgs, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },

      success(res) {
        if(res.data.status==1){
          that.setData({
          pics: res.data.data

        })
        }
        console.log(res)
        console.log(that.data.pics)
      
      }
    })
  },
  getdata: function () {
    var that = this;
    wx.request({
      url: config.inviteInfo_url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },

      success(res) {
        // that.setData({
        //   'goods': res.data.data.goods,
        //   'address': res.data.data.address

        // })
        console.log(res)
        WxParse.wxParse('content', 'html', res.data.inviteInfo, that, 5);
      }
    })
  },
  share: function () {

  },
  canvasShow: function (e) {
    this.setData({
      canvasS: true
    })
  },
  canvasShow2: function (e) {
    console.log(e)
    wx.showToast({
      icon: 'loading'
    })
    this.setData({
      pic: e.currentTarget.dataset.index
    })
    this.imageInitialization();
    this.setData({
      canvasS: true
    })
  },
  canvasHide: function (e) {
    this.setData({
      canvasS: false
    })
  },
  imageInitialization: function (bgsrc) {
    let that = this;
    let nickName = 'ohio';
    let nickName2 = '1233213213';
    let promise = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.pic,
        success: function (res) {
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.rcode,
        success: function (res) {
          resolve(res);
        }
      })
    });
    let promise3 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: that.data.head,
        success: function (res) {
          resolve(res);
        }
      })
    });
    Promise.all(
      [promise, promise2, promise3]
    ).then(function (res) {
      const ctx = wx.createCanvasContext('shareCanvas');
      ctx.drawImage(res[0].path, 0, 0, 300, 500);
      ctx.drawImage(res[1].path, 200, 415, 70, 70);
      ctx.font = "14px bold 黑体";
      ctx.fillText(that.data.name, 85, 440);
      ctx.font = "14px bold 黑体";
      ctx.fillText('邀您一起加入', 85, 465);
      ctx.arc(50, 450, 30, 0, 2 * Math.PI);
      ctx.strokeStyle = '#fff'
      ctx.save();
      ctx.clip();
      ctx.drawImage(res[2].path, 20, 420, 60, 60);
      ctx.stroke();
      ctx.draw();
      wx.hideToast();
    });
  },
  baocunImg: function () {
    console.log(123)
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 500,
      destWidth: 600,
      destHeight: 1000,
      canvasId: 'shareCanvas',
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res2) {
            console.log(res2);
            wx.showModal({
              content: '图片已保存到相册，赶紧晒一下吧~',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res3) {

              }
            })
          }
        })
      },
      fail: function (res) {

      }
    });
  }
})
