// var base_url = "http://192.168.3.46:8081";  ///workers-web/
//var base_url = "http://39.100.248.101:8105";
var base_url = "https://xcx.jiaochela.cn";
function getconfig() {

    var config = {
      //上传
      uploadModuleOrFunctionFiles_url: base_url + '/common/imgs',//图片上传
      //首页
      carList_url : base_url + "/jclapp/index/carList",//车辆列表
      indexCity_url: base_url + "/jclapp/index/index_city",//区域列表
      verifyOrder_url: base_url + "/jclapp/index/verifyOrder",//确认订单页面
      submitOrder_url: base_url + "/jclapp/index/submitOrder",//确认订单页面
      myCouponList_url: base_url + "/jclapp/my/couponList",//优惠券列表
      serviceDetails_url : base_url + '/jclapp/driver/serviceDetails',//客服信息
      activityList_url: base_url + "/jclapp/index/activityList",//活动消息
      //地址
      addressList_url: base_url + '/jclapp/index/addressList',//地址列表
      addAddress_url: base_url + '/jclapp/index/addAddress',//添加地址
      address_update_url: base_url + '/jclapp/index/editAddress',//修改地址
      address_del_url: base_url + '/jclapp/index/delAddress',//删除地址


      //我的
      couponList_url: base_url + "/jclapp/my/couponList",//优惠券列表
      personData_url: base_url + "/jclapp/my/personData",//查看个人资料
      editPerson_url: base_url + "/jclapp/my/editPerson",//修改个人资料
      feedBack_url : base_url + "/jclapp/driver/feedBack",//提交反馈
      //登录
      authorization_url: base_url + '/jclapp/login/index',//degnlu
      biography_url : base_url + '/jclapp/login/biography',//解析json
      auth_url: base_url + '/jclapp/login/authorization',//微信小程序授权绑定
      is_password_url : base_url + '/jclapp/login/is_password',//判断密码啊
	  
	  
	    aboutUs_url: base_url + '/jclapp/my/aboutUs',  //关于我们
      activityList_url: base_url + '/jclapp/index/activityList', //活动消息列表
      myOrderList_url: base_url + '/jclapp/my/myOrderList',  //我的订单
      cancelOrder_url: base_url + '/jclapp/my/cancelOrder', //取消订单
      delOrder_url: base_url + '/jclapp/my/delOrder', //删除订单
      orderDetails_url: base_url + '/jclapp/my/orderDetails', //订单详情
      verifyOrder_url: base_url + '/jclapp/index/verifyOrder', //确认订单页面
      myCouponList_url: base_url + '/jclapp/my/couponList',//优惠券列表
      labelList_url: base_url + '/jclapp/my/labelList', //评价标签/投诉原因
      imgs_url: base_url + '/common/imgs', //上传图片
      addEvaluate_url: base_url + '/jclapp/my/addEvaluate', //评价订单
      complain_url: base_url + '/jclapp/my/complain', //投诉司机
      finishOrder_url: base_url + '/jclapp/wxapplet/finishOrder', //小程序完成结算
      againOrder_url: base_url + '/jclapp/my/againOrder', //再次下单


      serviceDetails_url:base_url + '/jclapp/driver/serviceDetails',//客服信息
      hintList_url : base_url + "/jclapp/my/hintList",//提示消息列表
      accountShare_url : base_url + "/jclapp/share/accountShare",//邀请好友
    }

    return config;
};
getconfig();
module.exports = {
    getconfig: getconfig
    //num: num
}
