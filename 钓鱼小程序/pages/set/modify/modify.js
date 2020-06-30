var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        old_password: '',
        password: '',
        token: '',
        re_password: '',
    },
    old_pass(e) {
        vm.setData({
            old_password: e.detail.value
        })
    },
    new_pass(e) {
        vm.setData({
            password: e.detail.value
        })
    },
    re_pass(e) {
        vm.setData({
            re_password: e.detail.value
        })
    },
    qr_pass() {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
        if (vm.data.old_password == '') {
            wx.showToast({
                title: '请输入当前密码',
                icon: 'none',
            })
            return;
        }
        if (vm.data.password == '') {
            wx.showToast({
                title: '请输入新密码',
                icon: 'none',
            })
            return;
        }
        if (!reg.test(vm.data.password)) {
            wx.showToast({
                title: '密码长度要大于6位，由数字和字母组成',
                icon: 'none',
            })
            return;
        }

        if (vm.data.re_password == '') {
            wx.showToast({
                title: '请输入确认密码',
                icon: 'none',
            })
            return;
        }
        if (vm.data.password != vm.data.re_password) {
            wx.showToast({
                title: '两次密码不一致',
                icon: 'none',
            })
            return;
        }
        wx.request({
            url: config.update_password_url,
            data: {
                old_password: vm.data.old_password,
                password: vm.data.password,
                token: vm.data.token,
                re_password: vm.data.re_password,
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
                console.log(res)
                    if (res.data.status == 1) {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                        })
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 2  // 返回上一级页面。
                              })
                        }, 1000);
                    }else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
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
        vm.setData({
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