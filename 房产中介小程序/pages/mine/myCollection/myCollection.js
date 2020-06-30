var common = require('../../../common.js');
var config = common.getconfig();
var vm = '';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 160,
    data: [],
    token: '',
    area_id: '',
    state:2,

    pageNo: 1,
    totalRow: 0,
},
//切换选择
change(e) {
  var that = this;
  var index = e.currentTarget.dataset.index;
  that.setData({
    state: index,
    data: [],
    pageNo: 1
  })
  console.log(that.data.state)
  that.init()
},
init() {
  var that = this;
  wx.request({
    url: config.collectList_url,
    data: {
      // cityId: that.data.area_id,
      start: that.data.pageNo,
      size: 8,
      status: that.data.state
    },
    header: {
      "content-type": "application/json",
      token: that.data.token,
    },
    method: 'GET',
    success: function (ret) {
      console.log(ret)
      if (ret.data.code == 1) {
        that.setData({
          data: that.data.data.concat(ret.data.data),
          totalRow: ret.data.total,
        })
        //console.log(ret.data.data.page.list)
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
detail(e){
  console.log(this.data.state)
 
  app.globalData.id = e.currentTarget.dataset.id;
  if(this.data.state==1){
    wx.navigateTo({
      url: '/pages/index/fyDetail/fyDetail',
    })
    
  }else{
    wx.navigateTo({
      url: '/pages/index/fyDetailzu/fyDetailzu',
    })
    
  }
},
onLoad: function (options) {
  var that = this;
  wx.getSystemInfo({
      success: function (res) {
          that.setData({
              windowHeight: res.windowHeight
          });
      }
  });
  that.setData({
    area_id: wx.getStorageSync('area_id'),
    token: wx.getStorageSync('token'),
  })
  that.init()
},
drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.data) {
        var item = this.data.data[index]
        item.right = 0
    }
    this.setData({
        data: this.data.data,
        startX: touch.clientX,
    })

},
drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.data[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
        if (disX > this.data.delBtnWidth) {
            disX = this.data.delBtnWidth
        }
        item.right = disX
        this.setData({
            isScroll: false,
            data: this.data.data
        })
    } else {
        item.right = 0
        this.setData({
            isScroll: true,
            data: this.data.data
        })
    }
},
drawEnd: function (e) {
    var item = this.data.data[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
        item.right = this.data.delBtnWidth
        this.setData({
            isScroll: true,
            data: this.data.data,
        })
    } else {
        item.right = 0
        this.setData({
            isScroll: true,
            data: this.data.data,
        })
    }
},

delItem: function (e) {
  var id = e.currentTarget.dataset.id;
  wx.showModal({
    title: '温馨提示',
    content: '确认删除该收藏吗？',
    success(res) {
      if (res.confirm) {
        wx.request({
          url: config.coll_del_url,
          method: 'get',
          header: {
            'content-type': 'application/json'
          },
          data: {
            id: id,
            token: that.data.token
          },
          success: ret => {
            if (ret.data.status == 1) {
              wx.showToast({
                title: ret.data.msg,
              })
              that.setData({
                data: [],
                pageNo: 1
              })
              that.init();
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
      data: [],
      pageNo: 1
    })
    vm.init();
    // 显示顶部刷新图标
    setTimeout(function () {
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }, 1000);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (vm.data.totalRow == vm.data.data.length) {
      return
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