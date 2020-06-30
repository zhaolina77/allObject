// pages/set/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    //个人资料
    personal(){
        wx.navigateTo({
            url: '../personalData/personalData?type=2',
        })
    },
    //常见问题
    question(){
        wx.navigateTo({
            url: '../help/help',
        })
    },
    //账号安全
    safe(){
        wx.navigateTo({
            url: '../account/account',
        })
    },
    //黑名单
    heimingdan(){
        wx.navigateTo({
            url: '../heimingdan/heimingdan',
        })
    },
    //清除缓存
    clear(){
       
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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