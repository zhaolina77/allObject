var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:"",
      pageNo:1,
      totalRow:0,
      friendId:5,
      friend:[],
      list:[],
      type:''
    },
    init(){
      wx.request({
        url: config.friend_home_page_url,
        data: {
          token: vm.data.token,
          friend_account_id: vm.data.friendId,
          pageNo: vm.data.pageNo,
          pageSize:8
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          vm.setData({
            friend: res.data.data.friend_account,
            totalRow: res.data.data.page.totalRow,
            list:vm.data.list.concat(res.data.data.page.list)
          })
        },
      })

    },
  care() {
    wx.request({
      url: config.releases_friend_url,
      data: {
        token: vm.data.token,
        account_id:vm.data.friendId
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          var friend = vm.data.friend
          if (friend.is_friends == 0) {
            friend.is_friends = 1;
            friend.coll_num++
          } else {
            friend.is_friends = 0;
            friend.coll_num--
          }
          vm.setData({
            friend
          })
        }
      },
    })
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    

    prevPage.init();

  },
  back(e){
    console.log(e.currentTarget.dataset.id);
    if(vm.data.type==1){
      wx.navigateTo({
        url: '../dongtai/dongtai?id='+e.currentTarget.dataset.id,
      })
    }else{
      
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          id: e.currentTarget.dataset.id
        });

      prevPage.init();
    wx.navigateBack({
      delta: 1  // 返回上一级页面。
    })

    }
    
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      var type=options.type;
      var id = options.id
      vm.setData({
        type:type,
        friendId: id,
        token: wx.getStorageSync("token")
      })
      this.init();

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
      if (vm.data.totalRow==vm.data.list.length){
          return;
      }
      ++vm.data.pageNo;
      vm.init();


    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})