var util = require('../../../utils/util.js')
var dateTimePicker = require('../../../utils/dateTimePicker.js');
var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xuzhi: "",

    fl_list: [],
    fl_name: '请选择',
    data_list: [], //分类原名数据
    classifyId: -1,


    address_id: -1,
    full_address: '',
    address_info: '请选择地址或新建地址',
    // time: '', //预约时间


    token: "",
    cityId: 1,
    name: '',
    content: "",
    img: [],
    price: 0,
    remark: "",

    faceImg: [], //封面图片

    type: 0,


    //预约时间
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    times: '',




  },
  //选择地址
  change_address() {
    wx.navigateTo({
      url: '/pages/mine/address/address?type=2',
    })
  },

  xuzhi() {
    wx.request({
      url: config.publishNotice_url,
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        // console.log(res);
        if (res.data.status == 1) {
          WxParse.wxParse('article', 'html', res.data.dic.content, vm, 5)
          vm.setData({
            xuzhi: res.data.dic.content,
          })
        }
      },
    });
  },
  title(e) {
    vm.setData({
      name: e.detail.value
    })
  },
  content(e) {
    vm.setData({
      content: e.detail.value
    })
  },
  price(e) {
    vm.setData({
      price: e.detail.value
    })
  },
  remark(e) {
    vm.setData({
      remark: e.detail.value
    })
  },
  fabu() {
    wx.showLoading({
      title: '正在发布'
    })
    
    wx.request({
      url: config.publishProduct_url,

      data: {
        token: vm.data.token,
        classifyId: vm.data.classifyId,
        cityId: vm.data.cityId,
        remark: vm.data.remark,
        addressId: vm.data.address_id,
        subscribe_time:vm.data.time
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res);

        if (res.data.status == 1) {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/fabu/fabuCg/fabuCg',
          })
            // vm.toPay()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      },
    });
  },

//   toPay:function( e ){
//     var that = this;
//     //这里增加获取用户订阅消息权限，需要将申请的模板id填写进来。这里填写你自己的
//     var template_ids = ["b9keI6BtAqa8FSidqNHGQT4g0TdTEVFPgc4YyTEny2A" ];
//     //默认不能发送消息，当用户明确选择了允许才可以发.
  
//     wx.requestSubscribeMessage({
//       tmplIds: template_ids,
//       success:function( res ){
//         console.log(res)
//         // that.doPay();
//       },
//       fail:function( res ){
//         console.log('失败')
//       }
//     });
// },
// doPay:function(){
//   wx.request({
//     url:'http://192.168.3.95:9999/webapp/message/index',
//     header: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     method: 'POST',
//     data: {},
//     success: function (res) {
//       console.log(res)
//       var resp = res.data;
//       if (resp.code != 200) {
//         return;
//       }
     
//     }
//   });
// },

  // 分类
  fl() {
    wx.request({
      url: config.moreType_url,
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        // console.log(res);
        if (res.data.status == 1) {
          var arr = [];
          var data_list = res.data.productList;
          for (let index = 0; index < data_list.length; index++) {
            arr.push(data_list[index].name);
          }
          vm.setData({
            fl_list: arr,
            data_list: data_list
          })
        }
      },
    });
  },

  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    var index = e.detail.value;

    this.setData({
      classifyId: vm.data.data_list[index].id,
      fl_name: vm.data.data_list[index].name,

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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var id = options.id
    var na = options.name
    var type = options.type
    vm.setData({
      type: type
    })
    var fbid = options.fbid
    if (type == 2) {
      wx.request({
        url: config.againPublish_url,
        data: {
          id: fbid
        },
        success: (res) => {
          console.log(res)
          if (res.data.status == 1) {
            var data = res.data.product
            vm.setData({
              classifyId: data.product_type_parent,
              cityId: data.city_id,
              content: data.content,
              remark: data.remark,
              address_id: data.address_id,
              full_address: data.full_address,
              address_info: data.address_info,
              fl_name: data.classtag == 1 ? data.class_name : "请选择"
            })
          }
        },
      })

    }
    vm.setData({
      classifyId: id,
      fl_name: na,
      token: wx.getStorageSync('token')
    })
    console.log(vm.data.token)
    vm.fl();
    vm.xuzhi();



    // var nowDate = util.formatTime(new Date())
    // // var year = nowDate.substr(0, 4)
    // // var month = nowDate.substr(5, 2)
    // // var time = year + "年" + month + '月'
    // var tim=nowDate.substr(0, 10)
    // console.log(tim)
    // this.setData({
    //   time: nowDate
    // })
    // console.log(nowDate)
    vm.getNowFormatDate2();
      var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      // 精确到分的处理，将数组的秒去掉
      var lastArray = obj1.dateTimeArray.pop();
      var lastTime = obj1.dateTime.pop();
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.time)

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