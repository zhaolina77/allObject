var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    id: '',
    data: '',
    totalRow: '',
    // 评论
    commentList: [],
    content: '',

  },
  init() {
    wx.request({
      url: config.dynamicsDetail_url, //动态详情
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '动态详情');
        if (res.data.status == 1) {
          var data = res.data.data.dynamics
          data.pics = data.pics.split(',')
          vm.setData({
            data: data
          })
          // console.log(vm.data.data)
        }
      },
    });
  },
  comment() {
    wx.request({
      url: config.commentList_url, //评论列表
      data: {
        id: vm.data.id,
        pageNo: 1,
        pageSize: 8
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '评论列表');
        if (res.data.status == 1) {
          vm.setData({
            commentList: vm.data.commentList.concat(res.data.data.page.list),
            totalRow: res.data.data.page.totalRow
          })

          // console.log(vm.data.data)
        }
      },
    });
  },
  guanzhu(e) {
    if (!vm.data.token) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
      return;
    }
    wx.request({
      url: config.attentions_url,
      data: {
        token: vm.data.token,
        memberId: e.currentTarget.dataset.id
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
          var data = vm.data.data
          if (data.attentionstag == 1) {
            data.attentionstag = 0
          } else {
            data.attentionstag = 1
          }
          vm.setData({
            data
          })
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            list: [],
            pageNo: 1
          })
          prevPage.init();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }

      },
    })

  },
  content(e) {
    console.log(e)
    vm.setData({
      content: e.detail.value
    })
    console.log(vm.data.content)
  },
  fabu() {
    if (vm.data.content == '') {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none',
      })
      return

    }

    wx.request({
      url: config.commentSub_url,
      data: {
        token: vm.data.token,
        id: vm.data.id,
        content: vm.data.content
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
          vm.setData({
            content: '',
            commentList: []
          })
          vm.comment();
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            list: [],
            pageNo: 1
          })
          prevPage.init();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }

      },
    })

  },

  // 回复评论
  reply(e) {
    if (!wx.getStorageSync('token')) {
      wx.showToast({
        title: '请登录',
        icon: 'none',
      })
      return

    }

    wx.navigateTo({
      url: '/pages/community/replyDetail/replyDetail?id=' + e.currentTarget.dataset.id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var id = options.id
    vm.setData({
      token: token,
      id: id
    })
    vm.init();
    vm.comment();

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
    if (vm.data.totalRow == vm.data.commentList.length) {
      return
    }
    ++vm.data.pageNo;
    vm.comment();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})