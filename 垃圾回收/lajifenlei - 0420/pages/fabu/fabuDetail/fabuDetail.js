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
    xuzhi:"",

    fl_list:[],
    fl_name:'请选择',
    data_list:[],//分类原名数据
    classifyId:-1,


    address_id:-1,
    full_address: '',
    address_info:'请选择地址或新建地址',

    
    token:"",    
    cityId:1,
    name:'',
    content:"",
    img: [],
    price:0,
    remark:"",

    faceImg:[],//封面图片

    type:0
  },
  //选择地址
  change_address(){
    wx.navigateTo({
      url: '/pages/mine/address/address?type=2',
    })
  },

  xuzhi() {
    wx.request({
      url: config.publishNotice_url,
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        // console.log(res);
        if(res.data.status==1){
          WxParse.wxParse('article', 'html', res.data.dic.content, vm, 5) 
          vm.setData({
            xuzhi:res.data.dic.content,
          })
        }
      },
    });
  },
  title(e){
    vm.setData({
      name:e.detail.value
    })
  },
  content(e){
    vm.setData({
      content:e.detail.value
    })
  },
  price(e){
    vm.setData({
      price:e.detail.value
    })
  },
  remark(e){
    vm.setData({
      remark:e.detail.value
    })
  },
  fabu(){
    wx.showLoading({
      title: '正在发布'
    })
    wx.request({
      url: config.publishProduct_url,
      
      data: {
        token:vm.data.token,
        classifyId:vm.data.classifyId,
        cityId:vm.data.cityId,
        remark:vm.data.remark,
        addressId:vm.data.address_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        // console.log(res);
        if(res.data.status==1){
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/fabu/fabuCg/fabuCg',
            })

          },1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
        
      },
    });

  },

// 分类
  fl() {
    wx.request({
      url: config.moreType_url,
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function(res) {
        // console.log(res);
        if(res.data.status==1){
          var arr=[];
          var data_list= res.data.productList;
          for (let index = 0; index < data_list.length; index++) {
            arr.push(data_list[index].name);            
          }
          vm.setData({
            fl_list:arr,
            data_list:data_list
          })
        }
      },
    });
  },

  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    var index= e.detail.value;

    this.setData({
      classifyId:vm.data.data_list[index].id,
      fl_name:vm.data.data_list[index].name,

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      vm=this;
      var id=options.id
      var na=options.name
      var type=options.type
      vm.setData({
        type:type
      })
      var fbid=options.fbid
      if(type==2){
        wx.request({
            url: config.againPublish_url,
            data: {
              id:fbid
            },
            success: (res) => {
              console.log(res)
              if(res.data.status==1){
                var data=res.data.product
                vm.setData({
                  classifyId:data.product_type_parent,
                  cityId:data.city_id,
                  content:data.content,
                  remark:data.remark,
                  address_id:data.address_id,
                  full_address:data.full_address,
                  address_info:data.address_info,
                  fl_name:data.classtag==1?data.class_name:"请选择"
                })
              }
            },
          })

      }
      vm.setData({
        classifyId:id,
        fl_name:na,
        token:wx.getStorageSync('token')
      })
      console.log(vm.data.token)
      vm.fl();
      vm.xuzhi();





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