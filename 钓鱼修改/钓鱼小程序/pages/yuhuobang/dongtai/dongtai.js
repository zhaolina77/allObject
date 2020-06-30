var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 16,
    id_zan: 15,
    zan: 0,
    foc: 0,
    token: "",
    content: "",
    dongtaiList: [],
    replayList: [],
    pageNo: 1,
    totlRow: 0,
    status: {},
    open_type: '', //判断是否认证
  },
  init() {
    wx.request({
      url: config.releases_detail_url,
      data: {
        token: vm.data.token,
        id: vm.data.id,
        pageNo: vm.data.pageNo,
        pageSize: 6
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        vm.setData({
          status: res.data.status,
        })
        if (res.data.status == 1) {
          vm.setData({
            dongtaiList: res.data.data.releases,
            replayList: vm.data.replayList.concat(res.data.data.page.list),
            totlRow: res.data.data.page.totalRow
          })
        }
      }
    });


  },

  zan(e) {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    } else {
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      // console.log(index, id)
      wx.request({
        url: config.releases_comment_coll_url,
        data: {
          id: id,
          token: vm.data.token
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          // console.log(res);
          if (res.data.status == 1) {

            var replayList = vm.data.replayList;
            if (replayList[index].is_likes == 0) {
              replayList[index].is_likes = 1;
              replayList[index].like_num++
            } else {
              replayList[index].is_likes = 0;
              replayList[index].like_num--
            }
            console.log(res.data.status)
            vm.setData({
              replayList
            })
          }
        }
      })
    }
  },
  like() {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    } else {
      wx.request({
        url: config.releases_like_url,
        data: {
          id: vm.data.id,
          token: vm.data.token
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          // console.log(res)
          if (res.data.status == 1) {
            var dongtaiList = vm.data.dongtaiList
            if (dongtaiList.is_like == 0) {
              dongtaiList.is_like = 1;
              dongtaiList.like_num++
            } else {
              dongtaiList.is_like = 0;
              dongtaiList.like_num--
            }
            vm.setData({
              dongtaiList
            })
          }
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

            list: [],
            pageNo: 1

          })
          prevPage.init();


        },
      })
    }

  },
  coll() {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    } else {
      wx.request({
        url: config.releases_coll_url,
        data: {
          id: vm.data.id,
          token: vm.data.token
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.status == 1) {
            var dongtaiList = vm.data.dongtaiList
            if (dongtaiList.is_coll == 0) {
              dongtaiList.is_coll = 1;
              dongtaiList.coll_num++
            } else {
              dongtaiList.is_coll = 0;
              dongtaiList.coll_num--
            }
            vm.setData({
              dongtaiList
            })
          }
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

            list: [],
            pageNo: 1

          })
          prevPage.init();
        },
      })
    }

  },
  care(e) {
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    } else {
      wx.request({
        url: config.releases_friend_url,
        data: {
          token: vm.data.token,
          account_id: e.currentTarget.dataset.id
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.status == 1) {
            var dongtaiList = vm.data.dongtaiList
            if (dongtaiList.is_friends == 0) {
              dongtaiList.is_friends = 1;
              wx.showToast({
                title: '已关注',
                icon: 'none'
              })
            } else {
              dongtaiList.is_friends = 0;
              wx.showToast({
                title: '已取消',
                icon: 'none',
              })
            }
            vm.setData({
              dongtaiList
            })
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[pages.length - 2];
            prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
              list: [],
              pageNo: 1
            })
            prevPage.init();
          }

        },
      })

    }


  },
  shuru() {
    if (vm.data.open_type == 0) {
      wx.showToast({
        title: '认证之后才可发布评论',
        icon:'none'
      })
      return;
    }
    vm.setData({
      foc: 1
    })

  },
  del() {
    vm.setData({
      foc: 0
    })
  },
  content(e) {
    console.log(e);
    vm.setData({
      content: e.detail.value
    })
  },
  fabu() {
    
    if (!vm.data.token) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return;
    } else {
      if (vm.data.content == '') {
        wx.showToast({
          title: '请输入您要评论的内容',
          icon: 'none'
        })
        return;
      }
      wx.request({
        url: config.releases_comment_url,
        data: {
          id: vm.data.id,
          token: vm.data.token,
          content: vm.data.content,
          pic: ""

        },
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res);
          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            vm.setData({
              replayList: [],
              pageNo: 1,
              content: ""
            })
            vm.init();

          }

        },
      })

    }
  },
  allReplay(e) {
    if(!wx.getStorageSync("token")){
      wx.showToast({
        title: '请先登录',
        icon:"none"
      })
      return
    }


    wx.navigateTo({
      url: '/pages/yuhuobang/pinglunDetail/pinglunDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  tiaozhuan(e) {
    if(vm.data.dongtaiList.is_self==0){
      wx.navigateTo({
        url: '/pages/yuhuobang/home/home?id=' + e.currentTarget.dataset.id+'&type=2',
      })
    }
  },
  person(e) {
    wx.navigateTo({
      url: '/pages/yuhuobang/home/home?id=' + e.currentTarget.dataset.id,
    })
  },
  imgYu(event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  jubao(e) {
    console.log(e)
    wx.navigateTo({
      url: '../jubao/jubao?id=' + e.currentTarget.dataset.id,
    })
  },
  lahei(e) {
    wx.request({
      url: config.black_url,
      data: {
        token: vm.data.token,
        id: e.currentTarget.dataset.id

      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      },
    })
  },
  opentype() {
    wx.request({
      url: config.is_exhibition_url,
      data: {
        token: vm.data.token
      },
      header: {
        "content-type": "application/json"
      },
      method: 'GET',
      success: function(ret) {
        if (ret.data.status == 1) {
          vm.setData({
            open_type: ret.data.data.type
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
    
    var id = options.id;
    vm.setData({
      id: id,
      token: wx.getStorageSync("token")
    })
    vm.init();
    vm.opentype();
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
    if (vm.data.totalRow == vm.data.replayList.length) {
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