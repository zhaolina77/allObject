var common = require("../../../common.js");
var config = common.getconfig();
var vm = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    type: '',
    // 开户银行
    card_list_all: [],
    card_list: [],
    card_name: '',
    array: ['银行卡', '支付宝'],
    token: '',
    card_type: 1, //类型(1-银行卡 2-支付宝 )
    open_bank_id: '', //开户银行id
    open_bank_names: '', //开户行全称
    card_number: '', //银行卡号
    card_member_name: '', //	持卡人姓名
    default_status: 0, //0:默认 1：不默认
    alipay_number:'',//支付宝账号

  },
  init() {
    wx.request({
      url: config.cardTypeList_url, //银行列表
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res, '银行列表');
        if (res.data.status == 1) {
          vm.setData({
            card_list_all: res.data.data.card_list,
            card_name: res.data.data.card_list[0].name,
            open_bank_id: res.data.data.card_list[0].id
          })
          var lis = res.data.data.card_list
          var card_lis = []
          for (let index = 0; index < lis.length; index++) {
            vm.setData({
              card_list: vm.data.card_list.concat(lis[index].name)
            })
          }

        }
      },
    });

  },
  save() {
    if (vm.data.card_member_name == '') {
      wx.showToast({
        title: '请输入持卡人真实姓名',
        icon: 'none',
      })
      return
    }
    if (vm.data.card_type==1){
      if (vm.data.open_bank_names == '') {
        wx.showToast({
          title: '请输入开户行全称',
          icon: 'none',
        })
        return
      }
      if (vm.data.card_number == '') {
        wx.showToast({
          title: '请输入银行卡号',
          icon: 'none',
        })
        return
      }
    }else{
      if (vm.data.alipay_number == '') {
        wx.showToast({
          title: '请输入支付宝账号',
          icon: 'none',
        })
        return
      }
    }

    if(vm.data.type==1){   
      
      
      wx.request({
        url: config.cardUpdate_url, //银行卡更新
        data: {
          id:vm.data.id,
          alipay_number: vm.data.alipay_number,
          token: vm.data.token,
          type: vm.data.card_type, //类型(1-银行卡 2-支付宝 )
          open_bank_id: vm.data.open_bank_id, //开户银行id
          open_bank_names: vm.data.open_bank_names, //开户行全称
          card_number: vm.data.card_number, //银行卡号
          card_member_name: vm.data.card_member_name, //	持卡人姓名
          default_status: vm.data.default_status //0:默认 1：不默认
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res, '银行卡更新');
          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
            setTimeout(function(){
              let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
              let prevPage = pages[pages.length - 2];
              prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                list: [],
                pageNo: 1
              })
              prevPage.init()
              wx.navigateBack({
                delta: 1 // 返回上一级页面。
              })
            },800)
  
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
  
          }
        },
      });

    }else{     

      wx.request({
        url: config.addCard_url, //添加账户
        data: {
          alipay_number: vm.data.alipay_number,
          token: vm.data.token,
          type: vm.data.card_type, //类型(1-银行卡 2-支付宝 )
          open_bank_id: vm.data.open_bank_id, //开户银行id
          open_bank_names: vm.data.open_bank_names, //开户行全称
          card_number: vm.data.card_number, //银行卡号
          card_member_name: vm.data.card_member_name, //	持卡人姓名
          default_status: vm.data.default_status //0:默认 1：不默认
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res, '添加账户');
          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
            let prevPage = pages[pages.length - 2];
            prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
              list: [],
              pageNo: 1
            })
            prevPage.init()
            wx.navigateBack({
              delta: 1 // 返回上一级页面。
            })

          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })

          }
        },
      });
    }
  },
  //账户类型
  bindPickerChange: function (e) {
    if (e.detail.value == 0) {
      vm.setData({
        card_type: 1
      })
    } else {
      vm.setData({
        card_type: 2
      })
    }
  },
  //开户行
  bindPickerChange_card: function (e) {
    var card_list_all = vm.data.card_list_all
    console.log(e)
    var idx = e.detail.value
    vm.setData({
      card_name: card_list_all[idx].name,
      open_bank_id: card_list_all[idx].id
    })
  },
  //开户行全称
  open_bank_names(e) {
    vm.setData({
      open_bank_names: e.detail.value
    })
  },

  //银行卡号
  card_number(e) {
    vm.setData({
      card_number: e.detail.value
    })
  },
  alipay_number(e){
    vm.setData({
      alipay_number: e.detail.value
    })
  },
  //持卡人姓名
  card_member_name(e) {
    vm.setData({
      card_member_name: e.detail.value
    })
  },

  // 默认
  switch1Change(e) {
    console.log(e.detail.value)
    if (e.detail.value) {
      vm.setData({
        default_status: 0
      })
    } else {
      vm.setData({
        default_status: 1
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this;
    var token = wx.getStorageSync('token')
    var type = options.type
    vm.setData({
      type: type,
      token: token
    })
    if (type == 1) {
      vm.setData({
        id: options.id
      })
      wx.request({
        url: config.editCard_url, //编辑银行卡
        data: {
          token: vm.data.token,
          id: options.id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res, '编辑银行卡');
          if (res.data.status == 1) {
            if(res.data.data.card.type==1){
              vm.setData({
                card_type: res.data.data.card.type,
                open_bank_id: res.data.data.card.card_type.id,
                card_name: res.data.data.card.card_type.name,
                open_bank_names: res.data.data.card.open_bank_names,
                card_number: res.data.data.card.card_number,
                card_member_name: res.data.data.card.card_member_name,
                default_status: res.data.data.card.default_status,
                id: res.data.data.card.id,
              })
            }else{
              vm.setData({
                card_type: res.data.data.card.type,
                id: res.data.data.card.id,
                card_member_name: res.data.data.card.card_member_name,
                alipay_number: res.data.data.card.alipay_number,
              })
            }
            
          }
        },
      });
    }

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