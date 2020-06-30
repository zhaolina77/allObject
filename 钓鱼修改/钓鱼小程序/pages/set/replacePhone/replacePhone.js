var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token:'',
        phone:'',
        code:''
    },
    init(){
        wx.request({
            url: config.show_phone_url,
            data: {
                token:vm.data.token
            },
            header: {},
            method: 'GET',
            success: function(res) {
                console.log(res)
                vm.setData({
                    phone:res.data.data.account.phone
                })
            },
        })
    },
    //信息变更发送验证码
    yanzheng(){
        var mobile_res=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[0-9])\d{8}$/;
        if(vm.data.phone==''){
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
            })
            return;
        }
        if(!mobile_res.test(vm.data.phone)){
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
            })
            return;
        }
        wx.request({
            url: config.information_change_getMobileCode_url,
            data: {
                phone:vm.data.phone
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
            success: function(res) {
                console.log(res)
                if(res.data.status==1){
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            },
        })
    },
    code(e){
        // console.log(e.detail.value)
        vm.setData({
            code:e.detail.value
        })
    },
    //进入下一步
    next(){
        console.log(vm.data.phone)
        console.log(vm.data.code)
        if(vm.data.phone==''){
            wx.showToast({
                title:'手机号不能为空',
                icon: 'none'
            })
            return;
        }
        if(vm.data.code==''){
            wx.showToast({
                title:'验证码不能为空',
                icon: 'none'
            })
            return;
        }
            wx.request({
                url: config.next_step_url,
                data: {
                    // token:vm.data.token,
                    phone:vm.data.phone,
                    code:vm.data.code
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                success: function(res) {
                    console.log(res)
                    if(res.data.status==1){
                        wx.navigateTo({
                            url: '../replacePhoneCg/replacePhoneCg',
                        })
                    }else{
                        wx.showToast({
                            title:res.data.msg,
                            icon: 'none'
                        })
                    }
                },
            }) 
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        vm=this;
        vm.setData({
            token:wx.getStorageSync('token')
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