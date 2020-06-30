var common = require('../../common.js');
var config = common.getconfig();
var vm = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgInfoArrLength: 0,  // 轮播图列表的长度
        centerItem: 0,  // 居中项的位置
        imgInfoArr: [
            {
                src: '/image/bigcar.jpg',
                text: '含1位师傅+全程搬运',
                id: 0
            },
            {
                src: '/image/bigcar.jpg',
                text: '含1位师傅+全程搬运',
                id: 1
            },
            {
                src: '/image/bigcar.jpg',
                text: '含1位师傅+全程搬运',
                id: 2
            },
            {
                src: '/image/bigcar.jpg',
                text: '含1位师傅+全程搬运',
                id: 3
            },
        ],

        list: [],  //车辆列表
        state: 0,
        left: '',
        dl:[]
    },
    //切换数据
    tap(e) {
      var idx = e.currentTarget.dataset.index;
      vm.setData({
        state: idx,
        detail: vm.data.list[idx].detail,
        dl: vm.data.list[idx],
      })
    },
    //车辆列表
    init() {
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
            list: ret.data.data.carList,
            dl: ret.data.data.carList[center],
            left: 'sw' + ret.data.data.carList[vm.data.state].id,
            // detail: ret.data.data.carList[center].detail,
            // basic_cost_details: ret.data.data.carList[center].basic_cost_details,
            // price: ret.data.data.carList[center].basic_cost
          })
        }
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      vm = this;
      vm.init();
    },

    changeFun(e) {
      vm.setData({
        state: e.detail.current,
        dl: vm.data.list[e.detail.current],
        left: 'sw' + vm.data.list[e.detail.current].id
      })
    }
})
