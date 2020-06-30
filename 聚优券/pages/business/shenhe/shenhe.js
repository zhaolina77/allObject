var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:null,
    token:'',
    pageNo:1,
    pagination:0,
    list:[]



  },
  init(){
    wx.request({
      url: config.piecesList_url,
      data: {
        status:vm.data.status,
        pageNo:vm.data.pageNo,
        pageSize:12
      },
      header: {
        contentType: "application/json;charset=UTF-8",
        'token':vm.data.token
        
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if(res.data.code==1){
          vm.setData({
            list:vm.data.list.concat(res.data.data.merchantsIntoPiecesList),
            pagination:res.data.data.pagination
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
  detail(e){
    var id=e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/business/zhuti/zhuti?id='+id+'&type=1'+'&status='+vm.data.status,
    })
  },

  //驳回原因
  content(e){
    wx.navigateTo({
      url: '/pages/business/bohuiYy/bohuiYy?content='+e.currentTarget.dataset.content,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm=this;
    var token=wx.getStorageSync('token')
    var status=options.status
    vm.setData({
      status:status,
      token:token
    })
    vm.init()

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
    if(vm.data.pagination==vm.data.pageNo){
      return
    }
    ++vm.data.pageNo;
    vm.init()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})