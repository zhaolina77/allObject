var common = require('../../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token: '',
        index: 0,
        pageNo: 1,
        totleRow: 0,
        list: [],
        status: -1,

    },
    init() {
        wx.request({
            url: config.orderList_url,
            data: {
                status: vm.data.status,
                token: vm.data.token,
                pageNo: vm.data.pageNo,
                pageSize: 8
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success: function (res) {
                console.log(res)
                vm.setData({
                    totleRow: res.data.data.page.totleRow,
                    list: vm.data.list.concat(res.data.data.page.list)
                })
            },
        })

    },
    change(e) {
        var info = e.currentTarget.dataset.index;
        console.log(info)
        vm.setData({
            list: [],
            status: info,
            pageNo: 1
        })
        vm.init();
    },
    //进入订单详情
    todetail(e){
        var url='';
        var id=e.currentTarget.dataset.id;
        var status=e.currentTarget.dataset.status;
        if(status==0){
            url='/pages/order/daifukuan/daifukuan'
        }
        if(status==1){
            url='/pages/order/daifahuo/daifahuo'
        }
        if(status==2){
            url='/pages/order/yifahuo/yifahuo'
        }
        if(status==3){
            url='/pages/order/yiwancheng/yiwancheng'
        }
        if(status==4){
            url='/pages/order/tuikuan/tuikuan'
        }
        if(status==8||status==7){
            url='/pages/order/yiguanbi/yiguanbi'
        }
        wx.navigateTo({
            url:url+'?id='+id
        })
    },
    //立即支付
    wxPay(e){
        console.log(e.currentTarget.dataset.id)
        wx.showModal({
            title: '操作提示',
            content: '确定支付该订单吗',
            success(res) {
                console.log(res)
                if(res.confirm){
                    wx.request({
                        url:config.orderWxBuy_url,
                        data: {
                            id:e.currentTarget.dataset.id
                        },
                        header: {
                            'content-type': 'application/json'
                          },
                        method: 'GET',
                        success: function(res) {
                            console.log(res)
                            if(res.data.status==1){
                                 vm.wxpayshop(res);
                            }
                            else{
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'none',
                                })
                            }
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
        var token = wx.getStorageSync('token');
        var status=options.status;
        vm.setData({
            status:status,
            token: token
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
        if (vm.data.totalRow == vm.data.list.length) {
            return;
        }
        vm.data.pageNo++;
        vm.init();

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})