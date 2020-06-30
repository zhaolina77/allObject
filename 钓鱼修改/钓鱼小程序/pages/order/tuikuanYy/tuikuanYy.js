var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 2,
        token: '',
        causeId: [],
        causeList: []

    },
    init() {
        wx.request({
            url: config.refundCauseList_url,
            data: '',
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success: function (res) {
                console.log(res)
                vm.setData({
                    causeList: res.data.data.causeList
                })
            },
        })

    },
    // 退款原因
    select(e) {
        var j = 0;
        console.log(e.currentTarget.dataset.index)
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.id;
        var causeList = vm.data.causeList;
        var causeId = vm.data.causeId;
        if (causeList[index].is_del == 0) {
            causeList[index].is_del = 1
        } else {
            causeList[index].is_del = 0; 
        }
        if(causeId.indexOf(id)===-1){
            causeId.push(id)
        }else{
            causeId.splice(causeId.indexOf(id),1)
        }
        vm.setData({
            causeList:causeList,
            causeId:causeId
        })
        console.log(vm.data.causeId)

    },
    //提交退款申请
    queding() {
        wx.request({
            url: config.refundApplyurl_url,
            data: {
                id: vm.data.id,
                token: vm.data.token,
                causeId: vm.data.causeId
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
            success: function (res) {
                console.log(res)
                if(res.data.status==1){
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    })
                    wx.navigateBack({
                        delta: 2  // 返回上一级页面。
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
        var token = wx.getStorageSync('token')
        var id = options.id;
        vm.setData({
            token: token,
            // id:id
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})