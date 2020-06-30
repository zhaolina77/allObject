var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token: '',
      list: [],
      totalRow: 0,
      is_load: '',
      pageNo: 1,
      type:''
    },
    del(e){
      // console.log(e)
      var id = e.currentTarget.dataset.id;
      console.log(id)
      

      wx.showModal({
        title: '温馨提示',
        content: '确认取消关注该好友吗？',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: config.releases_friend_url,
              method: 'get',
              header: {
                'content-type': 'application/json'
              },
              data: {
                account_id: id,
                token: vm.data.token
              },
              success: ret => {
                console.log(ret)
               
                if (ret.data.status == 1) {
                  wx.showToast({
                    title: ret.data.msg,
                    icon: 'none'
                  })
                  vm.setData({
                    list: [],
                    state: 3,
                    pageNo: 1
                  })
                  vm.init();
                  if(vm.data.type==1){
                    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                    let prevPage = pages[pages.length - 2];
                    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                      list: [],
                      pageNo:1
                    })
                    prevPage.init();
                  }
                  else{
                    return
                  }
                } else {
                  wx.showToast({
                    title: ret.data.msg,
                    icon: 'none'
                  })
                }
              },
            })
          }
        }
      })
    },
    detail(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/yuhuobang/home/home?id='+id,
      })
    },
    enter(e){
      wx.navigateTo({
        url: '/pages/yuhuobang/home/home?id=' + e.currentTarget.dataset.id+'&type=1',
      })
    },
    init(){
      wx.request({
        url: config.my_friend_url,
        data: {
          token: vm.data.token,
          pageNo: vm.data.pageNo,
          pageSize: 8
        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          console.log(ret)
          setTimeout(function(){
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            },1500);
          if (ret.data.status == 1) {
            vm.setData({
              list: vm.data.list.concat(ret.data.data.page.list),
              totalRow: ret.data.data.page.totalRow

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
      vm.setData({
        token: wx.getStorageSync('token'),
        type:options.type,
      })
      vm.init();
      console.log(vm.data.type)
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
      wx.showLoading({
        title: '数据加载中',
      })
      vm.setData({
        list: [],
        pageNo: 1
      })
    vm.init()
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      if(vm.data.totalRow==vm.data.list.length){
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