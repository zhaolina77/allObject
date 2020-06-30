var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      token:'',
        delBtnWidth: 160,
        data: [],

    },
    init(){
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
            console.log(res,'关注列表')
            if (res.data.status == 1) {
              vm.setData({
                data:res.data.data.attentionList
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
            memberId: e.currentTarget.dataset.id
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
              var list = vm.data.data
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
                data:list
              })
              vm.init()
              if (vm.data.type==1) {
                let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                let prevPage = pages[pages.length - 2];
                prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                    list: [],
                    pageNo: 1,
                    attentionList:[]
                })
                prevPage.gz();
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
      detail(e){
        var id=e.currentTarget.dataset.id
        console.log(id)
        wx.navigateTo({
          url: '/pages/community/zhuye/zhuye?id='+id+'&type=2',
        })

      },
    onLoad: function (options) {
        vm=this;
        var that = this;
        var token=wx.getStorageSync('token')
        var type=options.type
        vm.setData({
            type:type,
            token:token
        })
        vm.init();
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    windowHeight: res.windowHeight
                });
            }
        });
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})