var common = require('../../common.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var qqmapsdk;
var config = common.getconfig();
var vm = null;
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        imgInfoArrLength: 0,  // 轮播图列表的长度
        centerItem: 0,  // 居中项的位置
        list: [],  //车辆列表
        state: 0,
        left:'',
        token: '',
        ac: '',
        cityName: '西安市',
        score:'',
        num:[],


        time:'选择搬家时间',
				onecTime:'',
        one_list:[],// 搬出地址
        two_list:[],
				outAddress:'选择搬出地址',
				backAddress:'选择搬入地址',
				state:0,
				detail:'',
				price:'',
				outIndex:-1,
				putIndex:-1,
				minDate:'',
				basic_cost_details:'',
        lat:'',
        lon:'',

        date: '2018-10-01',
        time: '12:00',
        dateTimeArray: null,
        dateTime: null,
        dateTimeArray1: null,
        dateTime1: null,
        startYear: 2000,
        endYear: 2050,
        times:''


    },
    //修改个人资料
    personal(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/personData/personData',
      })
    },
    inv(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/invitFirend/invitFirend',
      })
    },

    //拨打电话
    freeTell: function () {

      wx.makePhoneCall({

        phoneNumber:vm.data.score,

      })

    },
    showPopup() {
      wx.showLoading()
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.hideLoading();
      vm.setData({ show: true });
    },

    onClose() {
      vm.setData({ show: false });
    },
    member(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/mine/mine',
      })
    },
    //提交
    sub(){
      if (vm.data.time == "选择搬家时间") {
        wx.showToast({
          title: '选择搬家时间',
          icon:'none'
        })
        return;
      }

      if (vm.data.outAddress == "选择搬出地址") {
        wx.showToast({
          title: '请选择搬出地址',
          icon: 'none'
        })
        return;
      }

      if (vm.data.backAddress == "选择搬入地址") {
        wx.showToast({
          title: '请选择搬入地址',
          icon: 'none'
        })
        return;
      }
      var time = '';
      if (new Date(vm.data.time).getTime() <= vm.getNowFormatDate2()) {
        time = vm.getNowFormatDate();
        
      }else{
        time=vm.data.time;
        
      }
      console.log(time);
      var type = 0;
      if (new Date(vm.data.time).getTime() - vm.getNowFormatDate2()>=3600){
        type=1;
      }else{
        type=0
      }
      var obj ={
        outAddress: vm.data.one_list,
        backAddress: vm.data.two_list,
        carInfo: vm.data.list[vm.data.state],
        time: time,
        type: type
      };
      app.globalData.obj_list=obj
      wx.navigateTo({
        url: '/pages/confirmeInfo/confirmeInfo',
      })
    },
    city_list(){
      wx.navigateTo({
        url: '/pages/citys/citys',
      })
    },
    //消息
    news(){
      if (!vm.data.token) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/new/new',
      })
    },
    getNowFormatDate: function () {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //外国的月份都是从0开始的，所以+1
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var getMinutes = date.getMinutes();
      var getHours = date.getHours();
      //1-9月用0补位
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      //1-9日用0补位
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      //1-9日用0补位
      if (getMinutes >= 0 && getMinutes <= 9) {
        getMinutes = "0" + getMinutes;
      }
      //1-9日用0补位
      if (getHours >= 0 && getHours <= 9) {
        getHours = "0" + getHours;
      }
      //获取当前时间 yyyy-MM-dd HH:mm:ss
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + getHours + seperator2 + getMinutes;      
      console.log(currentdate);
      return currentdate;
    },
    getNowFormatDate2: function () {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //外国的月份都是从0开始的，所以+1
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var getMinutes = date.getMinutes();
      var getHours = date.getHours();
      //1-9月用0补位
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      //1-9日用0补位
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      //1-9日用0补位
      if (getMinutes >= 0 && getMinutes <= 9) {
        getMinutes = "0" + getMinutes;
      }
      //1-9日用0补位
      if (getHours >= 0 && getHours <= 9) {
        getHours = "0" + getHours;
      }
      //获取当前时间 yyyy-MM-dd HH:mm:ss
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + getHours + seperator2 + getMinutes;        
      var times = new Date(currentdate).getTime();
      return times;
      vm.setData({
        times: times
      })
    },
    changeDateTime1(e) {
      vm.setData({ dateTime1: e.detail.value });
    },
    changeDateTimeColumn1(e) {
      var arr = vm.data.dateTime1, dateArr = vm.data.dateTimeArray1;

      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      var time = dateArr[0][arr[0]] + '-' + dateArr[1][arr[1]] + '-' + dateArr[2][arr[2]] + ' ' + dateArr[3][arr[3]] + ':' + dateArr[4][arr[4]];
      // console.log(vm.data.times);
      // console.log(new Date(time).getTime());

      var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      // 精确到分的处理，将数组的秒去掉
      var lastArray = obj1.dateTimeArray.pop();
      var lastTime = obj1.dateTime.pop();
      console.log(vm.getNowFormatDate2());
      if (new Date(time).getTime() <= vm.getNowFormatDate2()){
        wx.showToast({
          title: "选择的日期不能小于当前日期",
          icon:'none'
        })
        vm.setData({
          dateTimeArray1: obj1.dateTimeArray,
          dateTime1: obj1.dateTime,
        })
        return;
      }
      vm.setData({
        dateTimeArray1: dateArr,
        time: time,
        dateTime1: arr
      });
    },
    //用车情况
    use_car(){
      wx.navigateTo({
        url: '/pages/carInfo/carInfo',
      })
    },
    //选择地址
    change_address(e){
      var idx = e.currentTarget.dataset.index
      if (!vm.data.token){
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      wx.navigateTo({
        url: '/pages/address/address?type=' + idx + "&outIndex=" + vm.data.outIndex + '&putIndex=' + vm.data.putIndex,
      })
    },


    onShareAppMessage: function () {
      console.log(456)
      vm.onClose();
      var that = this;
      return {
        title: '邀请好友',
        path: '/pages/login/login',
        imageUrl:'/image/logo.png',
        success: function (res) {
          console.log('成功', res)
        }
      }
    },
    toorder: function () {  //我的订单
      wx.navigateTo({
        url: '../order/order',
      })
    },
    toabout: function () {  // 关于我们
      wx.navigateTo({
        url: '../aboutUs/aboutUs',
      })
    },
    tocoupon: function () {
      wx.navigateTo({
        url: '../coupon/coupon',
      })
    },



    
    //
    use_price(){
      wx.navigateTo({
        url: '/pages/otherPay/otherPay',
      })
    },
    //切换数据
    tap(e){
      var idx = e.currentTarget.dataset.index;
      vm.setData({
        state:idx,
        detail: vm.data.list[idx].detail,
        basic_cost_details: vm.data.list[idx].basic_cost_details,
        price: vm.data.list[idx].basic_cost
      })
    },
    //车辆列表
    init(){
      wx.request({
        url: config.carList_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          
        },
        success: ret => {
          console.log(ret);
          var len = vm.data.list.length;
          var center = parseInt(len / 2);
          vm.setData({
            imgInfoArrLength: len,
            state: center,
            list : ret.data.data.carList,
            left: 'sw' + ret.data.data.carList[vm.data.state].id,
            detail: ret.data.data.carList[center].detail,
            basic_cost_details: ret.data.data.carList[center].basic_cost_details,
            price: ret.data.data.carList[center].basic_cost
          })
        }
      })

    },
    //搬家日期
    bindDateChange: function (e) {
      vm.setData({
        time: e.detail.value
      })
    },
    //根据金纬度展示地区
    city_name() {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: vm.data.lat,
          longitude: vm.data.lon
        },
        success: function (res) {
          var city = res.result.address_component.city
          vm.setData({
            cityName: city
          })
          wx.setStorageSync('cityName', city)
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          // console.log(res);
        }
      });
    },
    mine(){
      wx.request({
        url: config.personData_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          token :vm.data.token
        },
        success: ret => {
          console.log(ret);
          if(ret.data.status){
            vm.setData({
              ac: ret.data.data.account
            })
          }
        }
      })
      wx.request({
        url: config.serviceDetails_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          token: vm.data.token
        },
        success: ret => {
          console.log(ret);
          if (ret.data.status) {
            vm.setData({
              score:ret.data.dic.score
            })
          }
        }
      })
      wx.request({
        url: config.hintList_url,
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        data: {
          token: vm.data.token
        },
        success: ret => {
          console.log(ret);
          if (ret.data.status) {
            vm.setData({
              num: ret.data.data
            })
          }
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm =this;
      vm.init();
      vm.getNowFormatDate2();
      var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      // 精确到分的处理，将数组的秒去掉
      var lastArray = obj1.dateTimeArray.pop();
      var lastTime = obj1.dateTime.pop();
      qqmapsdk = new QQMapWX({
        key: 'N2MBZ-3WUKO-5UXW4-SAQRN-G3WT6-CUFXA' //这里自己的key秘钥进行填充
      });
      var time = obj1.dateTimeArray[0][obj1.dateTime[0]] + '-' + obj1.dateTimeArray[1][obj1.dateTime[1]] + '-' + obj1.dateTimeArray[2][obj1.dateTime[2]] + ' ' + obj1.dateTimeArray[3][obj1.dateTime[3]] + ':' + obj1.dateTimeArray[4][obj1.dateTime[4]];
      vm.setData({
        dateTime: obj.dateTime,
        dateTimeArray: obj.dateTimeArray,
        dateTimeArray1: obj1.dateTimeArray,
        dateTime1: obj1.dateTime,
        time: time,
        token:wx.getStorageSync('token')
      })
    },
    onShow(){
     
      if (!wx.getStorageSync('cityName')){
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            vm.setData({
              lat: res.latitude,
              lon: res.longitude
            })
            vm.city_name();
          },
          fail() {
            wx.showModal({
              title: '授权提示',
              content: '小程序需要您的当前位置才能使用哦~ ',
              showCancel: false,
              confirmText: '返回授权',
              success: function (res) {
                if (res.confirm) {
                  wx.getSetting({
                    success: function (res) {
                      console.log(res);
                      var statu = res.authSetting;
                      if (!statu['scope.userLocation']) {
                        wx.openSetting({
                          success(data) {
                            if (data.authSetting["scope.userLocation"] === true) {
                              wx.showToast({
                                title: '授权成功',
                                icon: 'success',
                                duration: 1000
                              })
                              //授权成功之后，再调用chooseLocation选择地方
                              wx.getLocation({
                                type: 'wgs84',
                                success(res) {
                                  vm.setData({
                                    lat: res.latitude,
                                    lon: res.longitude
                                  })
                                  vm.city_name();
                                },
                              })
                            } else {
                              wx.showToast({
                                title: '授权失败',
                                icon: 'success',
                                duration: 1000
                              })
                            }
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }else{
        vm.setData({
          cityName: wx.getStorageSync('cityName')
        })
      }
      vm.mine();
      
    },

    changeFun(e) {
      vm.setData({
        state: e.detail.current,
        left: 'sw' + vm.data.list[e.detail.current].id,
        detail: vm.data.list[e.detail.current].detail,
        basic_cost_details: vm.data.list[e.detail.current].basic_cost_details,
        price: vm.data.list[e.detail.current].basic_cost
      })
    }
})
