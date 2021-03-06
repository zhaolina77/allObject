var util = require('../../../utils/util.js')
var common = require("../../../common.js");
var WxParse = require("../../../wxParse/wxParse.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    time:"",
    idx:1,
    date:'',
    pageNo:1,
    data:'',
    list:[],
    totalRow:0,
    end_time:''

  },
  change(e){
    var idx=e.currentTarget.dataset.idx 
    vm.setData({
      pageNo:1,
      list:[],
      idx:idx
    })
    vm.init()
  },
 
  bindDateChange: function(e) {
    console.log(e.detail.value)
    console.log(e.detail.value[0])
    var year=e.detail.value.substr(0,4)
    var month=e.detail.value.substr(5,2)
    var time=year+"年"+month+'月'
    var state=year+"-"+month
    this.setData({
      time:time,
      date:state,
      pageNo:1,
      list:[],
      
    })
    vm.init()
  },

  init(){
    wx.request({
      url: config.inviteMilitaryExploits_url, //我的邀请战绩
      data: {
        token:vm.data.token,
        date:vm.data.date,
        pageNo:vm.data.pageNo,
        pageSize:8,
        type:vm.data.idx
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '我的邀请战绩');
        if (res.data.status == 1) {
          vm.setData({
            list:vm.data.list.concat(res.data.data.page.list),
            totalRow:res.data.data.page.totalRow
          })

         
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });

  
  },
  vip(){
    wx.request({
      url: config.inviteFriends_url,//会员中心
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res,'会员中心');
        if(res.data.status==1){
          WxParse.wxParse('article', 'html', res.data.data.content, vm, 5)
        }
      },
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var token=wx.getStorageSync('token')
    vm.setData({
      token:token
    })
    var nowDate=util.formatTime(new Date())
    var year=nowDate.substr(0,4)
    var month=nowDate.substr(5,2)
    var time=year+"年"+month+'月'
    var state=year+"-"+month
    this.setData({
      time:time,
      date:state,
      end_time:state
    })
    console.log(nowDate)
    console.log(vm.data.time)
    vm.init();
    vm.vip();

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
    if(vm.data.totalRow==vm.data.list.length){
      return
    }
    ++vm.data.pageNo
    vm.init()

  },
  onShareAppMessage: function (res) {
    console.log(res);
    var vm = this;
    return {
      title: '邀请好友',
      path: '/pages/index/index/index?token='+vm.data.token,
      success: function (res) {
        console.log('成功', res)
      }
    }
  }
})