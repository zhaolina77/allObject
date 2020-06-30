var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 153,
        order: [],
        goodsList: [],
        create_time: '',
        countDownList: []
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
                    goodsList: res.data.data.goodsList,
                    create_time: res.data.data.order.create_time
                })
                vm.coutDown();
            },
        })
    },
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    coutDown() {
        let newTime = new Date().getTime();
        let endTimeList = vm.data.create_time;
        let countDownArr = [];
        let endTime = new Date(vm.data.create_time.replace(/-/g, '/')).getTime() + 1800 * 1000;
        let obj = null;
        if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            let hou = parseInt(time % (60 * 60 * 24) / 3600);
            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
                hou: vm.timeFormat(hou),
                min: vm.timeFormat(min),
                sec: vm.timeFormat(sec)
            }
        } else { //活动已结束，全部设置为'00'
            // wx.navigateBack({
            //     delta: 1 // 返回上一级页面。
            // })
        }
        vm.setData({
            countDownList: obj
        })
        setTimeout(vm.coutDown, 1000);
    },

    //取消订单
    shopQx() {
        wx.showModal({
            title: '操作提示',
            content: '确定取消该订单吗',
            success(res) {
                if (res.confirm) {
                    wx.request({
                        url: config.cancelOrder_url,
                        data: {
                            token: vm.data.token,
                            id: vm.data.id,
                        },
                        method: 'GET',
                        success: function (ret) {
                            console.log(ret)
                            if (ret.data.status == 1) {
                                wx.showToast({
                                    title: ret.data.msg,
                                    icon: "none",
                                    duration: 1000,
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
                                }, 1000)
                            } else {
                                wx.showToast({
                                    title: ret.data.msg,
                                    icon: "none",
                                    duration: 1000,
                                })
                            }
                        }
                    })
                }
            }
        })

    },
    wxPay(){
        
        wx.showModal({
            title: '操作提示',
            content: '确定支付该订单吗',
            success(res) {
                console.log(res)
                if(res.confirm){
                    wx.request({
                        url:config.orderWxBuy_url,
                        data: {
                            id:vm.data.id,
                        },
                        header: {
                            'content-type': 'application/json'
                          },
                        method: 'GET',
                        success: function(res) {
                           console.log(res)
                            vm.wxpayshop(res);
                        },
                    })

                }

            }
        })

    },
    wxpayshop(ret){
        wx.requestPayment({
            timeStamp: ret.data.data.sortedMap.timeStamp,
            nonceStr: ret.data.data.sortedMap.nonceStr,
            package: ret.data.data.sortedMap.package,
            signType: ret.data.data.sortedMap.signType,
            paySign: ret.data.data.sortedMap.paySign,
          success: function (res) {
              console.log(res)
            if(res){
              if(res.data.status){
                wx.showModal({
                  title: '支付成功',
                  content: '',
                })
                setTimeout(function () {
                  wx.reLaunch({
                    url: '/pages/order/myOrder/myOrder?status=0',
                  })
                }, 1000)
              }else{
                setTimeout(function () {
                  wx.reLaunch({
                    url: '/pages/order/myOrder/myOrder?shop_status=0',
                  })
                }, 1000)
              }
            }
            
          },
          fail: function (res) {
            console.log(res);
          }
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
            id: id
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