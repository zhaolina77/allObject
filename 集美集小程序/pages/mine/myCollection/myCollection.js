var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        timer:"",
        delBtnWidth: 160,
        token: '',
        pageNo: 1,

        data: [],

    },
    init() {
        wx.request({
            url: config.myCollect_url, //收藏列表
            data: {
                token: vm.data.token,
                pageNo: vm.data.pageNo,
                pageSize: 8
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success: function (res) {
                console.log(res, '收藏列表')
                if (res.data.status == 1) {
                    var timerTem =setTimeout(function () {
                        wx.hideLoading()
                        wx.hideNavigationBarLoading() //完成停止加载
                        wx.stopPullDownRefresh() //停止下拉刷新
                      }, 1500);
                    vm.setData({
                        data: vm.data.data.concat(res.data.page.list),
                        timer: timerTem,
                        totalRow: res.data.page.totalRow
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
    detail(e) {
        var id = e.currentTarget.dataset.id
        var gro=e.currentTarget.dataset.gro
        if(gro==1){
            wx.navigateTo({
                url: '/pages/shop/shopDetail/shopDetail?id=' + id,
            })
        }else{
            wx.navigateTo({
                url: '/pages/index/msDetail/msDetail?id=' + id,
            })
        }
       
    },
    coll(e) {
        console.log(e.currentTarget.dataset.id)

        wx.request({
            url: config.goodsColl_url,
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
                    vm.setData({
                        pageNo: 1,
                        data: []
                    })
                    vm.init();


                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    })
                }

            },
        })
    },

    onLoad: function (options) {
        vm = this;
        var token = wx.getStorageSync('token')
        vm.setData({
            token: token
        })
        vm.init();
        wx.getSystemInfo({
            success: function (res) {
                vm.setData({
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