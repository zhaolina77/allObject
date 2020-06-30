// pages/order/pingjia/pingjia.js
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    id:5,
    content:'',
    level:1,
    labelList:[],
    choosid:[],
    labelIds:[],
    type:1

  },
  choose(e){
    console.log(e)
    var idx=e.currentTarget.dataset.index
    var id=e.currentTarget.dataset.id
    console.log(idx)
    var lable=vm.data.labelList
    var labelIds=vm.data.labelIds
      if(lable[idx].del_status==0){
        lable[idx].del_status=1
        labelIds.push(id)
      }else{
        lable[idx].del_status=0
        labelIds.splice(labelIds.indexOf(id),1)
      }
      console.log(lable)
      vm.setData({
        labelIds:labelIds,
        labelList:lable
      })
      console.log(vm.data.labelIds)
  },
  lable(){
    wx.request({
      url: config.labelList_url,
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
        console.log(res)
        vm.setData({
          labelList:res.data.labelList
        })
      },
    })
  },

  content(e){
    console.log(e)
    vm.setData({
      content:e.detail.value
    })
  },

  // 评分

  star(e) {
    // console.log(e.currentTarget.dataset.num)
    vm.setData({
      level: e.currentTarget.dataset.num
    })
  },

  tijiao(){
    if(vm.data.content==''){
      wx.showToast({
        title: '请输入您的评价内容',
        icon: 'none',
      })
      return
    }
    wx.request({
      url: config.addTeveluate_url,
      data: {
          token:vm.data.token,
          id:vm.data.id,
          level:vm.data.level,
          content:vm.data.content,
          labelIds:vm.data.labelIds
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: (res) => {
      console.log(res)
      if(res.data.status==1){
        wx.navigateTo({
          url: '/pages/order/pingjiaCg/pingjiaCg?type='+vm.data.type,
        })
          
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
        setTimeout(function(){
            wx.navigateBack({
              delta: 1,
            })
        },500)
      }
      },
    })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var id=options.id;
    var type=options.type
    vm.setData({
      type:type,
      token:wx.getStorageSync('token'),
      id:id
    })
    console.log(vm.data.token)
    vm.lable();

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