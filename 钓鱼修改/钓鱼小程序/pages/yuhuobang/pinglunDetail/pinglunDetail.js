var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:"",
      id:15,
      pageNo: 1,
      totlRow: 0,
      list:[],
      replayList:[],
      content:'',
      foc:0,
      open_type: '', //判断是否认证


    },
    init(){
      wx.request({
        url: config.check_all_reply_url,
        data: {
          token: vm.data.token,
          id: vm.data.id,
          pageNo: vm.data.pageNo,
          pageSize: 8
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          vm.setData({
            list: res.data.data.comment,
            replayList: res.data.data.page.list
          })
        },
      })
    },
  zan() {
    wx.request({
      url: config.releases_comment_coll_url,
      data: {
        id: vm.data.id,
        token: vm.data.token
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {

          var replayList = vm.data.list;
          if (replayList.is_likes == 0) {
            replayList.is_likes = 1;
            replayList.like_num++
          } else {
            replayList.is_likes = 0;
            replayList.like_num--
          }
          console.log(res.data.status)
          vm.setData({
            list: replayList
          })
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            replayList: [],
            pageNo:1
          })
          prevPage.init();
        }
      }
    })
  },
  shuru() {
    if (vm.data.open_type == 0) {
      wx.showToast({
        title: '认证之后才可发布评论',
        icon:'none'
      })
      return;
    }
    vm.setData({
      foc: 1
    })

  },
  del() {
    vm.setData({
      foc: 0
    })
  },
  content(e) {
    console.log(e.detail.value);
    vm.setData({
      content: e.detail.value
    })
  },
  fabu() {
    wx.request({
      url: config.releases_comment_reply_url,
      data: {
       
        token: vm.data.token,
        content:vm.data.content,
        comment_id: vm.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          vm.setData({
            list: [],
            pageNo: 1,
            content: ""
          })
          vm.init();
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

          let prevPage = pages[pages.length -2];
          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

            replayList: [],
            pageNo: 1

          })
          prevPage.init();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })

        }

      },
    })

  },
  opentype() {
    wx.request({
      url: config.is_exhibition_url,
      data: {
        token: vm.data.token
      },
      header: {
        "content-type": "application/json"
      },
      method: 'GET',
      success: function(ret) {
        if (ret.data.status == 1) {
          vm.setData({
            open_type: ret.data.data.type
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
      var id=options.id;
      vm.setData({
        id:id,
        token: wx.getStorageSync("token")
      })
      vm.init();
      vm.opentype();
      

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
      if (vm.data.totalRow == vm.data.list.length) {
        return;
      }
      vm.data.pageNo++;

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})