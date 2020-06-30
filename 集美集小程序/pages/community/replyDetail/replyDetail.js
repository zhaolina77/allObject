var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    token:'',
    comment:'',
    content:''

  },
  init(){
    wx.request({
      url: config.replyList_url,
      data: {
        id: vm.data.id,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          vm.setData({
            comment:res.data.data.comment,
            replyList:res.data.data.replyList
          })
          

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }

      },
    })


  },
  content(e){
    vm.setData({
      content:e.detail.value
    })

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
      url: config.replyCommentSub_url,
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
            content: ''
          })
          vm.init()
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            commentList: [],
            pageNo: 1
          })
          prevPage.comment();

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }

      },
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var id = options.id
    console.log(id)
    vm.setData({
      id: id,
      token: token
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