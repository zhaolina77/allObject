var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token_status:'',
    token:'',
    array: ['图片', '视频'],
    content: '',
    status: 1, //1 热门 2 推荐 3 关注
    pageNo: 1,
    list: [],
    totalRow: 0,
    attentionList: [],
    foc: ''
  },
  foc() {
    console.log('得到焦点')
    vm.setData({
      foc: true
    })
  },
  blu() {
    console.log('失去焦点')
    vm.setData({
      foc: false
    })
  },
  content(e) {
    vm.setData({
      content: e.detail.value
    })
  },
  search() {
    vm.setData({
      pageNo: 1,
      list: [],
    })
    vm.init();
    vm.setData({
      content:''
    })
  },
  init() {
    console.log(vm.data.status)
    wx.request({
      url: config.index_url, //动态列表
      data: {
        token: vm.data.token,
        statusType: vm.data.status,
        content: vm.data.content,
        pageNo:vm.data.pageNo,
        pageSize:8
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '动态列表');
        var timerTem =setTimeout(function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
        if (res.data.status == 1) {
          var lis = res.data.data.page.list
          for (let index = 0; index < lis.length; index++) {
            lis[index].pics = lis[index].pics.split(',')
            lis[index].elli=0
          }
          vm.setData({
            list: vm.data.list.concat(lis),
            totalRow: res.data.data.page.totalRow,
            timer: timerTem
          })
          // console.log(vm.data.list)
          console.log(vm.data.totalRow,vm.data.list.length)

        }
      },
    });
  },
//全文、收起
quanwen(e){
  console.log(e.currentTarget.dataset.idx)
  var id=e.currentTarget.dataset.id
  var ell=e.currentTarget.dataset.ell
  var lis=vm.data.list
  for (let index = 0; index < lis.length; index++) {
    if(id==lis[index].id){
      if(ell==0){
        lis[index].elli=1
      }else{
        lis[index].elli=0
      }
    }  
  }
  vm.setData({
    list:lis
  })
},


  detail(e) {
    wx.navigateTo({
      url: '/pages/community/comDetail/comDetail?id=' + e.currentTarget.dataset.id,
    })

  },
  care() {
    wx.navigateTo({
      url: '/pages/mine/myGuanzhu/myGuanzhu?type=1',
    })
  },
  changOne(e) {
    var idx = e.currentTarget.dataset.idx
    console.log(idx)
    if (idx == 3) {

      if (!wx.getStorageSync('token')) {
        wx.showToast({
          title: '请登录',
          icon: 'none',
        })
        return
      }
      vm.setData({
        pageNo: 1,
        list: [],
        status: idx
      })


    } else {
      vm.setData({
        pageNo: 1,
        list: [],
        status: idx
      })

    }
    vm.gz();
    vm.init();

  },
  fabu() {
    wx.navigateTo({
      url: '/pages/community/fabu/fabu',
    })
  },


  zhuye(e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/community/zhuye/zhuye?id=' + id + "&type=1",
    })
  },


  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.navigateTo({
      url: '/pages/community/fabu/fabu?type=' + e.detail.value,
    })
  },
  guanzhu(e) {
    if (!vm.data.token) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
      return;
    }
    var id=e.currentTarget.dataset.id
    console.log(id)
    wx.request({
      url: config.attentions_url,
      data: {
        token: vm.data.token,
        memberId: id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          var list = vm.data.list
          for (var i = 0; i < list.length; i++) {
            if (list[i].member_id == e.currentTarget.dataset.id) {
              if (list[i].attentionstag == 1) {
                list[i].attentionstag = 0
              } else {
                list[i].attentionstag = 1
              }
            }
          }
          vm.setData({
            list
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }

      },
    })

  },
  zan(e) {
    if (!vm.data.token) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
      return;
    }
    wx.request({
      url: config.likes_url,
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
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          var list = vm.data.list
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == e.currentTarget.dataset.id) {
              if (list[i].liketag == 1) {
                list[i].liketag = 0
                list[i].likescount--;
              } else {
                list[i].liketag = 1
                list[i].likescount++;
              }
            }
          }
          vm.setData({
            list
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    })

  },
  gz() {
    wx.request({
      url: config.attentionList_url,
      data: {
        token: vm.data.token,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res, '关注列表')
        if (res.data.status == 1) {
          vm.setData({
            attentionList: res.data.data.attentionList.slice(0, 3)
          })

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    })

  },

  //图片预览
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    vm.setData({
      pageNo:1,
      list:[]
    })
    var token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    vm.init();
   
    
    
    
    // vm.gz()

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
  
    config.status();
    if(vm.data.token==''){
      if(wx.getStorageSync('token')){
        this.setData({
          token:wx.getStorageSync('token')
        })
        this.init();
      }

    }

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
    clearInterval(this.data.timer);

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
    vm.init();
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  console.log(vm.data.totalRow,vm.data.list.length)
    if(vm.data.totalRow == vm.data.list.length) {
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