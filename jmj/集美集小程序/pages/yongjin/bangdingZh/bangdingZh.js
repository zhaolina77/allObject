var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 160,
    pageNo: 1,
    list: [],

  },
  init() {
    wx.request({
      url: config.cardList_url, //我的银行卡列表
      data: {
        token: vm.data.token,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '我的银行卡列表');
        if (res.data.status == 1) {
          vm.setData({
            list: res.data.data.card_list
          })
          console.log(vm.data.list)
        }
      },
    });

  },
  //银行卡删除
  delItem(e) {
    var id = e.currentTarget.dataset.id
    wx.request({
      url: config.cardDel_url, //银行卡删除
      data: {
        token: vm.data.token,
        id: id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '我的银行卡列表');
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          vm.setData({
            list: []
          })
          vm.init()

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });
  },
  //银行卡编辑
  edit(e) {

    console.log(e)
    var id = e.currentTarget.dataset.id
    var ite = e.currentTarget.dataset.ite
    console.log(ite)
    if(vm.data.type==2){
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            ite:ite
          })
          wx.navigateBack({
            delta: 1 // 返回上一级页面。
          })
    }else{
      wx.navigateTo({
        url: '/pages/yongjin/zhanghuAdd/zhanghuAdd?id=' + id  + '&type=1',
      })
    }
    

  },
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var type = options.type
    vm.setData({
      type: type,
      token: token
    })
    vm.init();



    wx.getSystemInfo({
      success: function (res) {
        vm.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.list) {
      var item = this.data.list[index]
      item.right = 0
    }
    this.setData({
      list: this.data.list,
      startX: touch.clientX,
    })

  },
  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.list[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        list: this.data.list
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        list: this.data.list
      })
    }
  },
  drawEnd: function (e) {
    var item = this.data.list[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        list: this.data.list,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        list: this.data.list,
      })
    }
  },
  addZh() {
    wx.navigateTo({
      url: '/pages/yongjin/zhanghuAdd/zhanghuAdd',
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