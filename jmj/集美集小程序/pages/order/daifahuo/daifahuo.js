var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      timer:'',
        token:'',
        id:'',
        order:'',
        goods_list:[],
        end_time:'',
        num:'',
        day:'',
        hou:'',
        min:'',
        sec:''


    },
    init(){
        wx.request({
            url: config.orderDetails_url, //订单详情
            data: {
              id:vm.data.id
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: (res) => {
             
              console.log(res, '订单详情')
              if (res.data.status == 1) {
                vm.setData({
                  order:res.data.data.order,
                  goods_list:res.data.data.goods_list,
                  
                })
                console.log(res.data.data.order.states)
                if(res.data.data.order.states!=0){
                  console.log('执行该方法')
                  //var _num=vm.data.goods_list[0].surplus_num+vm.data.goods_list[0].bookinglist.length
                  vm.setData({
                    shop_id:res.data.data.goods_list[0].id,
                    //num:_num,
                    end_time: res.data.data.goods_list[0].end_date,
                  })
                  console.log(vm.data.end_time)
                  if(res.data.data.order.states!=0){
                    vm.countDown()
                  }
                }
              }
            },
          })
    },
    countDown:function(){ //倒计时
      if(vm.data.end_time){
        var timer;
        var d,h,m,s;
        timer =  setTimeout(function () {
          vm.countDown()
        },1000)
        var nowDate = new Date().getTime();
        var _time = new Date(vm.data.end_time.replace(/-/g,'/')).getTime() - nowDate;
        if(_time>=0){
          d = Math.floor(_time/1000/60/60/24);
          h = Math.floor(_time/1000/60/60%24);
          m = Math.floor(_time/1000/60%60);
          s = Math.floor(_time/1000%60);
        }
        if(d<10){
           d = "0" + d
        }
        if(h < 10){
          h = "0" + h
        }
        if(m < 10){
         
          m = "0" +m
        }
        if(s < 10){
          
          s= "0" +s
        }
        vm.setData({
          day : d,
          hou : h,
          min : m,
          sec : s
        })
      }
      vm.setData({
        timer:timer
      })
      
    },

    tuikuan(e){
      console.log(e);     
      var id=e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/order/tuikuanYy/tuikuanYy?id='+id,
      })

    },
    //跳转退款
    jump_tuikuan(e){
      console.log(e);     
      var id=e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/order/yituikuan/yituikuan?id='+id,
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        vm=this;
        var token=wx.getStorageSync('token')
        var id=options.id
        vm.setData({
            order:[],
            id:id,
            token:token
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
      clearInterval(this.data.timer);

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
    onShareAppMessage: function (res) {
      console.log(res);
    var vm = this;
    return {
      title: '邀请好友',
      path: '/pages/index/msDetail/msDetail?id='+vm.data.shop_id,
      success: function (res) {
        console.log('成功', res)
      }
    }


    }
})