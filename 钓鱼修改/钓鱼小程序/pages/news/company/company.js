var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    contacts_name: '',
    contacts_mobile: '',
    id_card: '',
    company_name:'',
    job:'',
    num:6

  },
  init() {

  },
  //联系人姓名
  user(e) {
    vm.setData({
      contacts_name: e.detail.value
    })
  },

  //联系人身份证号
  personid(e) {
    vm.setData({
      id_card: e.detail.value
    })
  },
  //联系方式
  phone(e) {
    vm.setData({
      contacts_mobile: e.detail.value
    })
  },
  //协会名称
  comname(e) {
    vm.setData({
      company_name: e.detail.value
    })
  },

  //协会职务
  job(e) {
    vm.setData({
      job: e.detail.value
    })
  },
  //参赛人数
  num(e) {
    vm.setData({
      num: e.detail.value
    })
  },
  submit() {
    wx.request({
      url: config.company_join_url,
      data: {
        token: vm.data.token,
        contacts_name: vm.data.contacts_name,
        contacts_mobile: vm.data.contacts_mobile,
        id_card: vm.data.id_card,
        company_name: vm.data.company_name,
        job:vm.data.job,
        num: vm.data.num
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
            icon: 'none'
          })
          wx.navigateBack({
            delta: 2  // 返回上一级页面。
          })

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
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
    vm.setData({
      token: token
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