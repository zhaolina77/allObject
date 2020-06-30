var common = require('../../../common.js');
var config = common.getconfig();
var vm = '';
var app = getApp()
var checkboxItems;
var arr_id;
var list;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 160,
    data: [],
    token: '',
    area_id: '',
    state: 2,
    type:1,
    pageNo: 1,
    totalRow: 0,
    phone:'',
    checkboxItems:[],
    arr_id:[]
  },
  //报备
  change_phone() {
    vm.setData({
      is_show: 1
    })
  },
  shop_search_function(e) {
    console.log(e);
    vm.setData({
      phone: e.detail.value
    })
  },
  checkboxChange: function (e) {    
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    
    let value = e.detail.value;
    var arr = [];
    for (var i = 0; i < value.length; i++) {
      arr.push(parseInt(value[i]))
    }
    // console.log(arr)
    checkboxItems=[];
    for (var i = 0; i < list.length;i++){    
      if (arr.indexOf(list[i].clientsId)>-1){
        checkboxItems.push(list[i]);
        arr_id.push(list[i].clientsId);
      }else{
        checkboxItems.splice(list[i].clientsId, 1);
      }
    }
    // console.log(checkboxItems);
    vm.setData({
      arr_id: arr_id,
      // arr_id: e.detail.value,
      checkboxItems:checkboxItems
    })
  },
  sub(){
    if (checkboxItems.length==0){
      wx.showToast({
        title: '请先选择报备用户',
        icon: "none"
      })
      return
    }
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    console.log(prevPage)
   
   
    console.log(checkboxItems);
    console.log(vm.data.arr_id);
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      list:checkboxItems,
      arr_id: vm.data.arr_id,
      is_show:0
    })
    console.log(prevPage.data.list);
    if(vm.data.type==2){
      wx.navigateBack({
        delta: 1  // 返回上一级页面。
      })
    }else{
      wx.navigateBack({
        delta: 2  // 返回上一级页面。
      })
    }
  },
  init() {
    wx.request({
      url: config.phone_list_url,
      data: {
        cityId: vm.data.area_id,
        start: vm.data.pageNo,
        size: 8,
        phone: vm.data.phone
      },
      header: {
        "content-type": "application/json",
        token: vm.data.token,
      },
      method: 'GET',
      success: function (ret) {
        console.log(ret)
        // console.log(ret.data.data.page.list)
        if (ret.data.code == 1) {
          vm.setData({
            data: vm.data.data.concat(ret.data.data),
            totalRow: ret.data.total,
          })
          list = vm.data.data;
          if(checkboxItems!=""){
            for (let index = 0; index < list.length; index++) {
              for (let indexs = 0; indexs < checkboxItems.length; indexs++) {
                if(list[index].clientsId==checkboxItems[indexs].clientsId){
                  list[index].checked=true; 
                }
              }
             }
           }
         vm.setData({
          data: list,
        })
          //console.log(ret.data.data.page.list)
        } else {
          wx.showToast({
            title: ret.data.msg,
            icon: "none",
            duration: 1000,
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
    checkboxItems =app.globalData.kh_list;
    arr_id =app.globalData.arr_id;

    vm.setData({
      type: options.type,
      token: wx.getStorageSync('token'),
      accountType: wx.getStorageSync('accountType')
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
    if (vm.data.totalRow == vm.data.data.length) {
      return
    }
    ++vm.data.pageNo;
    vm.init();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})