var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 135,
        token: '',
        order: [],
        goodsList: []

    },
    init() {
        wx.request({
            url: config.productOrderById_url,
            data: {
                id: vm.data.id
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success: function (res) {
                console.log(res)
                vm.setData({
                    order: res.data.data.order,
                    goodsList: res.data.data.goodsList
                })
            },
        })

    },
    qr_shouhuo() {
        wx.request({
            url: config.confirmDelivery_url,
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
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    })
                    setTimeout(function () {
                        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

                        let prevPage = pages[pages.length - 2];
                       
                        prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

                            list: [],
                            pageNo: 1

                        })
                        prevPage.init();
                        wx.navigateBack({
                            delta: 1 // 返回上一级页面。
                        })
                    },1000)

                }

            },
        })

    },
    wuliu(e){
        wx.navigateTo({
            url: '../wuliu/wuliu?id='+e.currentTarget.dataset.id,
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        vm = this;
        var id = options.id;
        var token = wx.getStorageSync('token')
        vm.setData({
            token: token,
            id:id
        })
        vm.init();

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