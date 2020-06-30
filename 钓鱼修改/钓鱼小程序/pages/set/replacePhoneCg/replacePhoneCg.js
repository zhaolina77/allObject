var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token: '',
        phone: '',
        code: '',
    },
    phone(e) {
        vm.setData({
            phone: e.detail.value
        })
    },
    code(e) {
        vm.setData({
            code: e.detail.value
        })
    },
    yanzheng() {
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (vm.data.phone == '') {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none'
            })
        } else if (!myreg.test(vm.data.phone)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
        } else {
            wx.request({
                url: config.information_change_getMobileCode_url,
                data: {
                    phone: vm.data.phone
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
                            icon: 'none'
                        })
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                },
            })

        }


    },
    next() {
        if (vm.data.phone == '') {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none'
            })
        }
        else if (vm.data.code == '') {
            wx.showToast({
                title: '验证码不能为空',
                icon: 'none'
            })
        } else {
            wx.request({
                url: config.new_phone_save_url,
                data: {
                    token:vm.data.token,
                    phone: vm.data.phone,
                    code: vm.data.code
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                success: function (res) {
                    console.log(res)
                    if (res.data.status == 1) {
                        wx.navigateTo({
                            url: '../account/account',
                        })
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
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