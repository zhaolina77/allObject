var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    xianshi: false,
    first: 1,
    second: 1,
    totalRow: 0,
    third: 1,
    sort: 0,
    list: [],
    classify_id: 0,
    classify_list: [],
    spList: [],
    address: [],
    people_num: -1,
    saiqu_num: 0,
    type: -1,
    type_state: -1,
    jbf: 0,
    people: ["20人以内", "21-50人", "51-100人", "101人以上"],
    min_num: 0,
    max_num: 0,
    region_id: 0
  },
  init() {
    if (vm.data.first == 1) {
      wx.request({
        url: config.matchs_list_url,
        data: {
          is_rec:0,
          type: vm.data.jbf,
          is_charge: vm.data.type,
          min_num: vm.data.min_num,
          max_num: vm.data.max_num,
          region_id: vm.data.region_id,
          sort: vm.data.sort,
          pageNo: vm.data.pageNo,
          pageSize: 8
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded" //post请求头
        },
        method: 'post',
        success: function(res) {
          console.log(res)
          setTimeout(function(){
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            },1500);
          vm.setData({
            list: vm.data.list.concat(res.data.data.page.list),
            totalRow: res.data.data.page.totalRow
          })
        },
      });
    } else {
      wx.request({
        url: config.vedios_list_url,
        data: {
          classify_id: vm.data.classify_id,
          pageNo: vm.data.pageNo,
          pageSize: 8
        },
        method: 'GET',
        success: function(res) {
          console.log(res)
          setTimeout(function(){
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            },1500);
          vm.setData({
            list: vm.data.list.concat(res.data.data.page.list),
            totalRow: res.data.data.page.totalRow,
            classify_list: res.data.data.classify_list
          })
        },
      })
    }
  },
  address() {
    wx.request({
      url: config.data_list_saishi_url,
      data: '',
      header: {},
      method: 'GET',
      success: function(res) {
        console.log(res)
        vm.setData({
          address: res.data.data.address_list
        })
      },
    });
  },
  show() {
    if (vm.data.xianshi == 1) {
      vm.data.xianshi = 0
    } else {
      vm.data.xianshi = 1
    }
    console.log(vm.data.xianshi)
  },
  changeOne(e) {
    vm.setData({
      first: e.currentTarget.dataset.index,
      list: [],
      pageNo: 1,
    })
    vm.init();
  },
  changeTwo(e) {
    vm.setData({
      second: e.currentTarget.dataset.index,
      xianshi: false
    })
    if (e.currentTarget.dataset.index == 1) {
      vm.setData({
        sort: 0,
        list: [],
      })
    } else {
      vm.setData({
        sort: 1,
        list: [],
      })
    }
    vm.init();
  },
  changeThree(e) {
    vm.setData({
      classify_id: e.currentTarget.dataset.id,
      list:[]
    })
    vm.init();
  },
  // 比赛地区
  saiqu(e) {
    vm.setData({
      region_id: e.currentTarget.dataset.index,
    })

  },
  // 参赛人数
  people(e) {
    var index = e.currentTarget.dataset.index;
    if (index == 0) {
      vm.setData({
        min_num: 0,
        max_num: 20,
        people_num: e.currentTarget.dataset.index
      })
    } else if (index == 1) {
      vm.setData({
        min_num: 21,
        max_num: 50,
        people_num: e.currentTarget.dataset.index
      })
    } else if (index == 2) {
      vm.setData({
        min_num: 51,
        max_num: 100,
        people_num: e.currentTarget.dataset.index
      })
    } else {
      vm.setData({
        min_num: 101,
        max_num: 0,
        people_num: e.currentTarget.dataset.index
      })

    }
    vm.setData({
      people_num: e.currentTarget.dataset.index
    })
  },
  // 举办方
  jbf(e) {
    vm.setData({
      jbf: e.currentTarget.dataset.index
    })
  },
  // 赛事类型
  type(e) {
    vm.setData({
      type: e.currentTarget.dataset.index,
      type_state: e.currentTarget.dataset.index,
    })
  },
  // 筛选
  select() {
    var shows = vm.data.xianshi
    console.log(shows)
    vm.setData({
      xianshi: !shows,
      second: 3
    })
  },
  shaixuan() {
    vm.setData({
      xianshi: false,
      list: [],
      pageNo: 1
    })
    vm.init();
  },
  // 重置
  reset() {
    vm.setData({
      type_state: -1,
      people_num: -1,
      type: 1,
      jbf: 0,
      min_num: 0,
      max_num: 0,
      region_id: 0
    })
    vm.setData({
      list: [],
      pageNo: 1
    })
    vm.init();
  },
  jieshao(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/xiehui/jieshao/jieshao?id=' + e.currentTarget.dataset.id,
    })

  },
  xiehui(e) {
    wx.navigateTo({
      url: '/pages/xiehui/xiehuiDetail/xiehuiDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  quan() {
    wx.navigateTo({
      url: '/pages/mine/quan/quan',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    vm = this;
    vm.init();
    vm.address();


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
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
  onReachBottom: function() {
    if (vm.data.totalRow == vm.data.list.length) {
      return;
    }
    ++vm.data.pageNo;
    vm.init();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})