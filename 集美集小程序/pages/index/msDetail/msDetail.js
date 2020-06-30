var common = require("../../../common.js");
var config = common.getconfig();
var WxParse = require("../../../wxParse/wxParse.js");
var article = "";
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:'',
    token: '',
    id: '',
    good: '',
    cart_count: '',
    end_time: '',
    day: '',
    hou: '',
    min: '',
    sec: '',
    goods_num: 1,
    data_sp: '',
    fuwu: 0,

    couponList: '', //商品优惠券
    couponId: 0,

    idx:0,


    //规格
    data: [],
    tag: '',
    guige: 0,
    guige_list: '',
    goods_num: 1,
    spec_id: '',
    o_idx: 0,
    t_idx: 0,
    th_idx: 0,
    t_list: [],
    th_list: [],

    //商品服务
    serviceList: [],
    //评价
    evaluate:'',

    //团购信息
    bookingList:[]



  },
  init() {
    wx.request({
      url: config.goodsDetails_url, //商品详情
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品详情');
        if (res.data.status == 1) {
          WxParse.wxParse('article', 'html', res.data.data.good.content, vm, 5)
          var bookingList=res.data.data.bookingList
          if(bookingList.length>0){
            for (let index = 0; index < bookingList.length; index++) {
              var nam1=bookingList[index].nick_name.substr(0,1)
              var nam2=bookingList[index].nick_name.substr(-1,1)
              // console.log(nam1,nam2)
              bookingList[index].nick_name=nam1+'***'+nam2
            }
          }
          vm.setData({
            bookingList:bookingList,
            good: res.data.data.good,
            cart_count: res.data.data.cart_count,
            end_time: res.data.data.good.end_time,
            data_sp: res.data.data,
            evaluate:res.data.data.evaluate
          })
          vm.countDown()
        }
      },
    });
  },
  countDown:function(){ //倒计时
    var timer;
    var d,h,m,s;
    timer =  setTimeout(function () {
      vm.countDown()
      console.log(1111)
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
      sec : s,
      timer: timer
    })
  },
  countDowns() {
    var nowTime = new Date().getTime(); //现在时间（时间戳）
    var endTime = new Date(vm.data.end_time).getTime(); //结束时间（时间戳）
    var time = (endTime - nowTime) / 1000; //距离结束的毫秒数
    let day = parseInt(time % (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    day = vm.timeFormin(day),
    hou = vm.timeFormin(hou),
      min = vm.timeFormin(min),
      sec = vm.timeFormin(sec)
    vm.setData({

      day: vm.timeFormat(day),
      hou: vm.timeFormat(hou),
      min: vm.timeFormat(min),
      sec: vm.timeFormat(sec)
    })
    if (time > 0) {
      setTimeout(this.countDown, 1000);
    }
  },
  //小于10的格式化函数（2变成02）
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  //小于0的格式化函数（不会出现负数）
  timeFormin(param) {
    return param < 0 ? 0 : param;
  },

  // 商品规格
  goods_guige() {
    wx.request({
      url: config.goodsSpec_url, //商品规格
      data: {
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品规格');
        vm.setData({
          guige_list: res.data,
          data: res.data,
          tag: res.data.tag, //没有规格不显示规格选择
        })
        if (res.data.tag != 0) {
          console.log('该商品有规格')
          var t_list = [];
          var th_list = [];
          if (vm.data.data.one[vm.data.o_idx].two) {
            t_list = vm.data.data.one[vm.data.o_idx].two;
            if (vm.data.data.one[vm.data.o_idx].two.list.length > 0) {
              if (vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three) {
                th_list = vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three;
              }
            }
          }
          vm.setData({
            t_list,
            th_list,
          })
        }
        setTimeout(function () {
          vm.guige_select();
        }, 500)
      },
    });

  },
  guige_select() {
    if (vm.data.data.tag == 0) {
      vm.setData({
        info: vm.data.data //无商品规格
      })
      return
    } else {
      //有商品规格
      var info = [];
      if (vm.data.data.one.length > 0) {
        if (vm.data.data.one[vm.data.o_idx].two) {
          if (vm.data.data.one[vm.data.o_idx].two.list.length > 0) {
            if (vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three) {
              if (vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three.list.length > 0) {
                info = vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx].three.list[vm.data.th_idx]
              } else {
                info = vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx]
              }
            } else {
              info = vm.data.data.one[vm.data.o_idx].two.list[vm.data.t_idx]
            }
          } else {
            info = vm.data.data.one[vm.data.o_idx]
          }
        } else {
          info = vm.data.data.one[vm.data.o_idx]
        }
      }
    }
    vm.setData({
      info: info
    })

  },

  //单独购买
  buy(e) {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login/login?type=3',
      })
      return;
    }
    var idx=e.currentTarget.dataset.idx
    console.log(idx)
    var spec_id='';
    if (vm.data.data.spec_id) {
      spec_id = vm.data.info.spec_id
    } else {
      spec_id = 0;
    }
    wx.navigateTo({
      url: '/pages/shop/orderTj/orderTj?type=2' + '&state='+idx + '&id=' + vm.data.id + '&spec_id=' + spec_id + '&count=' + vm.data.goods_num + '&couponId=' + vm.data.couponId,
    })
  },
  pinglun(){
    console.log(vm.data.id)
    wx.navigateTo({
      url: '/pages/shop/allPj/allPj?id='+vm.data.id,
    })
  },

  // 去参团
  cantuan(e){
    var account_id=e.currentTarget.dataset.sponsor_account_id
    // var account_id=e.currentTarget.dataset.account_id
    wx.navigateTo({
      url: '/pages/shop/orderTj/orderTj?type=3' + '&id=' + vm.data.id +'&account_id='+account_id+'&state=3',
    })
  },

  

  

  // 商品数量加
  goods_add() {
    var goods_num = vm.data.goods_num
    if (goods_num < vm.data.guige_list.stocknum) {
      goods_num++;
    } else {
      wx.showToast({
        title: '该商品库存不足~',
        icon: 'none',
      })
    }
    vm.setData({
      goods_num: goods_num
    })
  },
  // 商品数量减
  goods_minus() {
    var goods_num = vm.data.goods_num
    if (goods_num > 1) {
      goods_num--;
    } else {
      wx.showToast({
        title: '商品数量不能再少了~',
        icon: 'none',
      })
    }
    vm.setData({
      goods_num: goods_num
    })
  },

  //商品服务
  goods_fuwu() {
    wx.request({
      url: config.goodsService_url, //商品服务
      data: {
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品服务');
        if (res.data.status == 1) {
          vm.setData({
            serviceList: res.data.serviceList
          })
        }
      },
    });

  },
  //商品收藏
  shoucang() {
    wx.request({
      url: config.goodsColl_url, //商品收藏
      data: {
        token: vm.data.token,
        id: vm.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '商品收藏');
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          var data_sp = vm.data.data_sp
          if (data_sp.is_coll == 0) {
            data_sp.is_coll = 1
          } else {
            data_sp.is_coll = 0
          }
          vm.setData({
            data_sp
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }
      },
    });


  },
   //优惠券选择
   radioChange(e){
    console.log(e)
    vm.setData({
      couponId:e.detail.value
    })
  },


  //规格弹窗
  guige(e) {
    vm.setData({
      guige: 1,
      idx:e.currentTarget.dataset.idx
    })
  },
  closeGg() {
    vm.setData({
      guige: 0
    })
  },
  // 服务弹窗
  fuwu() {
    vm.setData({
      fuwu: 1
    })
  },
  closeFw() {
    vm.setData({
      fuwu: 0
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var id = options.id
    vm.setData({
      id: id,
      token: token
    })
    vm.init();
    vm.goods_guige();
    vm.goods_fuwu();


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
    if (this.data.token=='') {
      var token = wx.getStorageSync('token')
      vm.setData({
        token: token
      })
    }

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
  onShareAppMessage: function () {

  }
})