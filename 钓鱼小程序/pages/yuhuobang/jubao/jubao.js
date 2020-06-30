var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{
                'name': '低俗色情',
                'is_check': 0
            },
            {
                'name': '政治敏感',
                'is_check': 0
            },
            {
                'name': '违法行为',
                'is_check': 0
            },
            {
                'name': '垃圾广告',
                'is_check': 0
            },
            {
                'name': '辱骂谩骂',
                'is_check': 0
            },
            {
                'name': '违法行为（赌博，违禁品，反动）',
                'is_check': 0
            },
            {
                'name': '其他',
                'is_check': 0
            }
        ],
        token: '',
        id: 25
    },
    check(e) {
        var idx = e.currentTarget.dataset.index;
        // console.log(idx)
        var list = vm.data.list;

        if (list[idx].is_check == 0) {
            list[idx].is_check = 1;
        } else {
            list[idx].is_check = 0
        }
        vm.setData({
            list
        })
    },
    qr() {
        var list = vm.data.list;
        var arr = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].is_check == 1) {
                arr.push(list[i].name)
            }
        }
        // console.log(arr)
        if (arr.length == 0) {
            wx.showToast({
                title: '请选择举报原因',
                icon: 'none',
            })

        } else {
            wx.request({
                url: config.reports_url,
                data: {
                    token: vm.data.token,
                    id: vm.data.id,
                    content: arr

                },
                header: {
                    'content-type': 'application/json'
                },
                method: 'GET',
                success: function (res) {
                    // console.log(res)
                    if (res.data.status == 1) {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                        })
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1 // 返回上一级页面。
                            })
                        }, 1000);
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                        })
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1 // 返回上一级页面。
                            })
                        }, 1000);
                    }
                },
            })

        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        vm = this;
        var id = options.id;
        vm.setData({
            id:id,
            token: wx.getStorageSync('token')
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