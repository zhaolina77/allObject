
// var base_url = "http://192.168.3.95:9999";
var base_url = "https://beirong.yunxiaochengxu.top";
function getconfig() {
  var config = {
    // 首页
    bannerList_url:base_url + "/webapp/index/bannerList",//banner
    indexlType_url: base_url + "/webapp/index/indexlType", //首页分类
    moreType_url: base_url + "/webapp/index/moreType", //更多分类
    indexProductList_url: base_url + "/webapp/index/indexProductList", //首页商品列表
    productDetails_url: base_url + "/webapp/index/productDetails", //商品详情
    productList_url: base_url + "/webapp/index/productList", //点击更多根据分类查看商品
    activityList_url: base_url + "/webapp/index/activityList", //资讯列表
    activityDetails_url: base_url + "/webapp/index/activityDetails", //资讯详情
    indexCity_url: base_url + '/webapp/index/indexCity', //首页城市列表
    lonLat_url: base_url + '/webapp/index/lonLat', //进入首页根据经纬度获取就近的地区信息
    // 发布
    publishProduct_url: base_url + "/webapp/index/publishProduct", //发布商品
    publishNotice_url: base_url + "/webapp/index/publishNotice", //发布须知
    inform_url: base_url + "/webapp/index/inform", 
    // 登录
    authorization_url: base_url + "/webapp/login/authorization", //授权登录
    binding_phone_url: base_url + "/webapp/login/binding_phone", //绑定手机号
    biography_url: base_url + '/webapp/index/biography', //解析json
    // 我的
    account_url: base_url + "/webapp/my/account", //个人资料
    aboutUs_url: base_url + "/webapp/my/aboutUs", //关于我们
    helpCenterList_url: base_url + "/webapp/my/helpCenterList", //帮助中心
    feedBack_url: base_url + "/webapp/my/feedBack", //提交反馈
    // 地址
    addressList_url: base_url + "/webapp/address/addressList", //地址列表
    addAddress_url: base_url + "/webapp/address/addAddress", //添加收货地址
    addressDel_url: base_url + "/webapp/address/addressDel", //删除收货地址
    addressUpdate_url: base_url + "/webapp/address/addressUpdate", //地址修改
    // 上传图片
    imgs_url: base_url + "/common/imgs",
    // 订单
    takeOrder_url:base_url + "/webapp/index/takeOrder",//接单
    orderList_url: base_url + "/webapp/my/orderList", //订单列表
    orderDetails_url: base_url + "/webapp/my/orderDetails", //订单详情
    cancelOrder_url:base_url + "/webapp/my/cancelOrder",//取消订单
    againPublish_url:base_url + "/webapp/my/againPublish",//重新发布商品
    delOrder_url:base_url + "/webapp/my/delOrder",//删除订单
    finishOrder_url:base_url + "/webapp/my/finishOrder",//完成
    //评价
    addTeveluate_url:base_url + "/webapp/my/addTeveluate",//添加评价
    labelList_url:base_url + "/webapp/my/labelList",//评价标签列表
    // 消息推送
    message_url:base_url + "/webapp/message/index",//消息推送

  }

  return config;
};
getconfig();
module.exports = {
  getconfig: getconfig
  //num: num
}