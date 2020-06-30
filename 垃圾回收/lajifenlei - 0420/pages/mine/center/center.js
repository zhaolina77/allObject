// pages/mine/center/center.js
var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require("../../../wxParse/wxParse.js");
// var WxParse = require("../../../wxParse/html2json.js");
var article = "";
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    idx:0,
    answer:"",
    answers:[],
    htmlAry:[]
  },
  center(){
    wx.request({
      url: config.helpCenterList_url,
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        console.log(res);
        if(res.data.status==1){
          res.data.list[0].type=1
            var answers=vm.data.answers
 
            var htmlAry=[];
            // for (let i = 0; i < res.data.list.length; i++) {
            //   // console.log(res.data.list[i].answer)
            //     htmlAry[i] = WxParse.html2json(res.data.list[i].answer, 'returnData');//重点，就是这里。只要这么干就能直接获取到转化后的node格式数据；
            //     console.log(htmlAry[i]);
            //     vm.setData({
            //       htmlAry:htmlAry
            //     })
            //   }
          WxParse.wxParse('article', 'html', res.data.list[vm.data.idx].answer, vm, 5) 
          vm.setData({
           list:res.data.list,
          })
        }
      },
    });
  },
  xiala(e){
    var idx=e.currentTarget.dataset.index
    var list=vm.data.list
    for(var i=0;i<list.length;i++){
      if(i==idx){
        if(list[idx].type==2){
          list[idx].type=1
          vm.setData({
            idx:idx,
            list:list
          })
        }else{
          list[idx].type=2
          vm.setData({
            idx:idx,
            list:list
          })
        }
      }else{
        list[i].type=2
        vm.setData({
          idx:idx,
          list:list
        })
      }
    }
    console.log(vm.data.list[idx].type)
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    vm.center();

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