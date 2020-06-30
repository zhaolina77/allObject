var common = require('../../../common.js');
var config = common.getconfig();
var that = '';
var app = getApp()
Page({
    data: {
      delBtnWidth: 160,
      data: [],
      token:'',
      state:1,
      lon:'',
      lat:'',
      totalRow:0,
      pageNo:1,
      pic:{}
    },
    open_shop_detail(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/shop/shangjia/shangjia?id=' + id,
      })
    },
    del_shop(e){
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
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
                  var data= that.data.data;
                  data.splice(index, 1)
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
    detail_shop(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/shop/shopDetail/shopDetail?id=' + id,
      })
    },
    yhb(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/yuhuobang/dongtai/dongtai?id=' + id,
      })
    },
    dc_detail(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/diaocahng/diaochangDetail/diaochangDetail?id=' + id,
      })
    },
    del(e){
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
    //切换选择
    change(e){
      var index = e.currentTarget.dataset.index;
      that.setData({
        state:index,
        data: [],
        pageNo:1
      })
      that.init()
    },
     init(){
       var url ='';
       if (that.data.state==1){
        url = config.my_coll_good_url
       } else if (that.data.state == 2) {
        url = config.my_coll_shop_url
       } else if (that.data.state == 3) {
        url = config.my_coll_angling_site_url
       } else if (that.data.state == 4) {
        url = config.my_coll_dynamic_url
      }
      wx.request({
        url: url,
        data: {
          token: that.data.token,
          pageNo: that.data.pageNo,
          pageSize: 8,
          lon: that.data.lon,
          lat: that.data.lat
        },
        header: {
          "content-type": "application/json"
        },
        method: 'GET',
        success: function (ret) {
          setTimeout(function(){
            wx.hideLoading()
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            },1500);
          console.log(ret)
          // console.log(ret.data.data.page.list)
          if (ret.data.status == 1) {
            //将url字符串转为数组
            if(that.data.state==4){
              for(var i=0;i<ret.data.data.page.list.length;i++){
                var li=ret.data.data.page.list[i].url.split(',')
                // console.log(li)
                ret.data.data.page.list[i].url=li
              }
              that.setData({
                data: that.data.data.concat(ret.data.data.page.list),
                totalRow: ret.data.data.page.totalRow
              })
             }else{
              that.setData({
                data: that.data.data.concat(ret.data.data.page.list),
                totalRow: ret.data.data.page.totalRow
              })
            }
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
    map_init(){
      that = this;
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          that.setData({
            lat: res.latitude,
            lon: res.longitude
          })
          that.init();

        },
        fail() {
          wx.showModal({
            title: '授权提示',
            content: '小程序需要您的当前位置才能使用哦~ ',
            showCancel: false,
            confirmText: '返回授权',
            success: function (res) {

              if (res.confirm) {
                wx.getSetting({
                  success: function (res) {
                    console.log(res);
                    var statu = res.authSetting;
                    if (!statu['scope.userLocation']) {
                      wx.openSetting({
                        success(data) {
                          if (data.authSetting["scope.userLocation"] === true) {
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 1000
                            })
                            //授权成功之后，再调用chooseLocation选择地方
                            wx.getLocation({
                              type: 'wgs84',
                              success(res) {
                                that.setData({
                                  lat: res.latitude,
                                  lon: res.longitude
                                })
                                that.init();
                               

                              },
                            })
                          } else {
                            wx.showToast({
                              title: '授权失败',
                              icon: 'success',
                              duration: 1000
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      })
    },
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight,
                    token:wx.getStorageSync('token')
                });
            }
        });
        that.map_init();
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

    },
    onPullDownRefresh: function () {  
      wx.showLoading({
        title: '数据加载中',
      })
      this.setData({
        list: [],
        pageNo: 1
      })
    this.init()
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
    },
  
      /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      if(that.data.totalRow==that.data.data.length){
        return;
      }
      ++that.data.pageNo;
      that.init();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})