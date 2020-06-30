var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    memberId: '', //个人主页id
    pageNo: 1,
    data: '',
    account: '', //个人信息
    list: [], //发布列表
    totalRow: 0,
    delId: '',
    del: 0,
    type: ""

  },
  init() {
    wx.request({
      url: config.personal_url, //我的个人主页
      data: {
        token: vm.data.token,
        memberId: vm.data.memberId,
        pageNo: 1,
        pageSize: 8
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '我的个人主页');
        if (res.data.status == 1) {
          var lis = res.data.data.page.list
          for (let index = 0; index < lis.length; index++) {
            lis[index].pics = lis[index].pics.split(',')
            lis[index].elli=0
          }
          vm.setData({
            data: res.data.data,
            account: res.data.data.account,
            list: vm.data.list.concat(lis),
            totalRow: res.data.data.page.totalRow
          })
          console.log(vm.data.list)
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
  //关注
  guanzhu(e) {
    if (!vm.data.token) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
      return;
    }
    wx.request({
        url: config.attentions_url,
        data: {
          token: vm.data.token,
          memberId: vm.data.memberId
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
            vm.init()
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[pages.length - 2];
            if (vm.data.type == 1) {
              prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                list: [],
                pageNo: 1,
                attentionList: []
              })
              prevPage.gz();
              prevPage.init();
            } else if (vm.data.type == 2) {
              prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                data: []
              })
              prevPage.init();
            }
          
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
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
        let prevPage = pages[pages.length - 2];
        prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          list: [],
          pageNo: 1
        })
        prevPage.init();






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
  var token = wx.getStorageSync('token')
  var id = options.id
  console.log(id)
  var type = options.type
  vm.setData({
    type: type,
    memberId: id,
    token: token
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
  if (vm.data.totalRow == vm.data.list.length) {
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