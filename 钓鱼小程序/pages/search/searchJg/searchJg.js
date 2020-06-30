var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token: '',
      state: 0,
      list: [],
      pageNo: 1,
      totalRow: 0,
      search_name: '比赛',
      is_load: '',
      open_type: '',
      history: [],
    val: '',
    is_search: 0

    },
    init(){
      var url = '';
      if (vm.data.state == 0) {
        url = config.goodsList_url;
      } else if (vm.data.state == 1) {
        url = config.shopList_url;
      } else if (vm.data.state == 2) {
        url = config.releases_list_url;
      } else if (vm.data.state == 3) {
        url = config.angling_site_list_url;
      } else if (vm.data.state == 4) {
        url = config.association_list_url;
      } else {
        url = config.matchs_list_url;
      }
      wx.request({
        url:url,
        data: {
          token: vm.data.token,
          name: vm.data.search_name,
          pageNo: vm.data.pageNo,
          pageSize:8
        },
        header: {
          'content-type': 'application/json'//get请求头
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          vm.setData({
            totalRow: res.data.data.page.totalRow,
            list:vm.data.list.concat(res.data.data.page.list)
          })
          
        },
      })
    },
    change(e){
      vm.setData({
        state:e.currentTarget.dataset.index,
        list:[]
      })
      vm.init();
    },
    verification(e){
      console.log(e)
      vm.setData({
        search_name:e.detail.value
      })
    },


    
    // 进入商品详情
  enterSp(e){
      wx.navigateTo({
        url: '/pages/shop/shopDetail/shopDetail?id='+e.currentTarget.dataset.id,
      })
  },
  //进入商铺
  enterSj(e) {
    wx.navigateTo({
      url: '/pages/shop/shangjia/shangjia?id=' + e.currentTarget.dataset.id,
    })
  },
  //进入热帖
  enterRt(e) {
    wx.navigateTo({
      url: '/pages/yuhuobang/dongtai/dongtai?id=' + e.currentTarget.dataset.id,
    })
  },
  //进入钓场
  enterDc(e) {
    wx.navigateTo({
      url: '/pages/diaocahng/diaochangDetail/diaochangDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  //进入协会
  enterXh(e) {
    wx.navigateTo({
      url: '/pages/xiehui/xiehuiDetail/xiehuiDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  //进入比赛
  enterBs(e) {
    wx.navigateTo({
      url: '/pages/xiehui/jieshao/jieshao?id=' + e.currentTarget.dataset.id,
    })
  },
  search(e){
    // console.log(e.detail.value)
    vm.setData({
      search_name:e.detail.value,
      list:[],
      pageNo:1,
    })
    vm.init();
    vm.hc(e.detail.value);
  },
   //初始化缓存
   huancun: function() {
    var history = wx.getStorageSync("history");
    if (history != "" && history != null) {
      vm.setData({
        history: JSON.parse(history),
        is_search: 1
      })
      
    } else {
      vm.setData({
        is_search: 0
      })
    }
  },
  hc(val){
    console.log(val)
    let serchArr = [];
    var vals = val;
    if (vals == '') {
      wx.showToast({
        title: '请输入您想搜索名称',
        icon: "none"
      })
      return
    }
    let jsonStr = {
      name: vals
    };
    wx.getStorage({//获取缓存并设置缓存
      key: 'history',
      success: function (res) {
        var serchArr = JSON.parse(res.data);
        for (var i = 0; i < serchArr.length; i++) {
          if (serchArr[i].name == vals) {
            return;
          }
        }
        serchArr.push(jsonStr);
        wx.setStorage({
          key: 'history',
          data: JSON.stringify(serchArr)
        })
        vm.huancun();
        setTimeout(function(){
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[pages.length - 2];
          prevPage.init();
          console.log(vm.data.history)
        },100)
      },
      fail: function () {
        serchArr.push(jsonStr);
        wx.setStorage({
          key: 'history',
          data: JSON.stringify(serchArr)
        })
      },
    });
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm=this;
      var content=options.content;
      vm.setData({
        search_name:content
      })
      vm.init();
      vm.huancun();

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
      vm.init();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})