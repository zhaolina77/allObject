// var base_url = "http://192.168.3.113:8081";//zhao
// var base_url = "http://192.168.3.95:8111";//cao
// var base_url = "http://192.168.3.117:8011";//yi
var base_url = "https://jmjup.jimeijimc.com";
function getconfig() {
  var config = {  
    createPrefecturePoster_url: base_url + '/jmjapp/index/createPrefecturePoster',//创业专区海报
    // 登录
    authorization_url: base_url + "/jmjapp/login/authorization", //授权登录
    binding_phone_url: base_url + "/jmjapp/login/binding_phone", //绑定手机号
    biography_url: base_url + '/jmjapp/index/biography', //解析json
    // 地址
    addressList_url: base_url + "/jmjapp/address/addressList", //地址列表
    addAddress_url: base_url + "/jmjapp/address/addAddress", //添加收货地址
    addressDel_url: base_url + "/jmjapp/address/addressDel", //删除收货地址
    addressUpdate_url: base_url + "/jmjapp/address/addressUpdate", //地址修改 
    // 首页
    jugeBC_url:base_url + "/jmjapp/index/jugeBC",//区分b端c端
    bannerList_url:base_url + "/jmjapp/index/bannerList",//banner
    indexPrefectureList_url:base_url + "/jmjapp/index/indexPrefectureList",//首页专区列表
    groupBuyingList_url:base_url + "/jmjapp/index/groupBuyingList",//团购列表
    prefectureGoodsList_url:base_url + "/jmjapp/index/prefectureGoodsList",//专区商品列表
    categoryList_url:base_url + "/jmjapp/index/categoryList",//分类列表
    categoryGoodsList_url:base_url + "/jmjapp/index/categoryGoodsList",//分类商品列表
    createPrefecture_url:base_url + "/jmjapp/index/createPrefecture",//创业专区/星选好物/0元购福利社(列表)
    indexModelGoods_url:base_url + "/jmjapp/index/indexModelGoods",//首页模块商品(1:星选好物 2:0元购福利社 3:团购秒杀 4:青春正当季)
    poster_url:base_url + "/jmjapp/index/poster",//青春正当季海报
    optimizationHost_url:base_url + "/jmjapp/index/optimizationHost",//优选热卖
    createPrefectureInfo_url:base_url + "/jmjapp/index/createPrefectureInfo",//创业专区申请说明
    submitApply_url:base_url + "/jmjapp/index/submitApply",//提交创业专区申请
    indexSearch_url:base_url + "/jmjapp/index/indexSearch",//首页搜索
    // 商品
    goodsDetails_url:base_url + "/jmjapp/index/goodsDetails",//商品详情
    allGoodsCollection_url:base_url + "/jmjapp/index/allGoodsCollection",//商品全部评价
    goodsSpec_url:base_url + "/jmjapp/index/goodsSpec",//商品规格
    goodsService_url:base_url + "/jmjapp/index/goodsService",//商品服务
    goodsColl_url:base_url + "/jmjapp/index/goodsColl",//商品收藏、取消收藏
    goodsSubmit_url:base_url + "/jmjapp/index/goodsSubmit",//立即购买到确认订单页面
    getGroupBooking_url:base_url + "/jmjapp/index/getGroupBooking",//商品详情中点击去拼团
    // 优惠券
    getCouponCenter_url:base_url + "/jmjapp/my/getCouponCenter",//领券中心
    getCoupon_url:base_url + "/jmjapp/my/getCoupon",//领取优惠券
    myCouponList_url:base_url + "/jmjapp/my/myCouponList",//优惠券列表
    // 购物车
    cartList_url:base_url + "/jmjapp/cart/cartList",//购物车列表
    cartAdd_url:base_url + "/jmjapp/cart/cartAdd",//加入购物车
    addToCart_url:base_url + "/jmjapp/cart/addToCart",//购物车添加数量
    minusToCart_url:base_url + "/jmjapp/cart/minusToCart",//购物车减数量
    checkOneCart_url:base_url + "/jmjapp/cart/checkOneCart",//单选和取消勾选
    selectCart_url:base_url + "/jmjapp/cart/selectCart",//购物车全选与全不选 默认全选
    cartDelete_url:base_url + "/jmjapp/cart/cartDelete",//清空商品和删除单个商品
    cartSubmit_url:base_url + "/jmjapp/cart/cartSubmit",//点击购物车提交到确认订单页面
    // 社区
    index_url:base_url + "/jmjapp/community/index",//动态列表
    dynamicsDetail_url:base_url + "/jmjapp/community/dynamicsDetail",//动态详情
    dynamicSub_url:base_url + "/jmjapp/community/dynamicSub",//发布动态提交
    attentions_url:base_url + "/jmjapp/community/attentions",//关注、取消关注
    likes_url:base_url + "/jmjapp/community/likes",//动态点赞/取消点赞
    commentList_url:base_url + "/jmjapp/community/commentList",//评论列表
    commentSub_url:base_url + "/jmjapp/community/commentSub",//提交评论
    replyList_url:base_url + "/jmjapp/community/replyList",//查看更多回复列表
    replyCommentSub_url:base_url + "/jmjapp/community/replyCommentSub",//提交评论的回复
    my_url:base_url + "/jmjapp/community/my",//我的个人主页
    personal_url:base_url + "/jmjapp/community/personal",//好友主页
    dynamicDel_url:base_url + "/web/communityWeb/dynamicDel",//动态删除
    attentionList_url:base_url + "/jmjapp/community/attentionList",//我的关注列表  
    // 订单
    orderList_url:base_url + "/jmjapp/my/orderList",//订单列表
    orderCancel_url:base_url + "/jmjapp/my/orderCancel",//取消订单
    delOrder_url:base_url + "/jmjapp/my/delOrder",//删除订单
    confirmDelivery_url:base_url + "/jmjapp/my/confirmDelivery",//确认收货
    evaluationCenter_url:base_url + "/jmjapp/my/evaluationCenter",//评价中心
    addEvaluate_url:base_url + "/jmjapp/my/addEvaluate",//添加评价保存
    checkEvaluate_url:base_url + "/jmjapp/my/checkEvaluate",//查看当前商品的评论
    orderDetails_url:base_url + "/jmjapp/my/orderDetails",//订单详情
    refundCause_url:base_url + "/jmjapp/my/refundCause",//申请退款页面
    refundApply_url:base_url + "/jmjapp/my/refundApply",//app商品的订单列表中点击退款 
    logisticsInformation_url:base_url + "/jmjapp/my/logisticsInformation",//物流信息 
    //我的
    persionData_url:base_url + "/jmjapp/my/persionData",//个人信息
    updateAccount_url:base_url + "/jmjapp/my/updateAccount",//修改个人信息
    myCollect_url:base_url + "/jmjapp/my/myCollect",//我的收藏列表
    feedbackSub_url:base_url + "/jmjapp/community/feedbackSub",//意见反馈提交
    memberCenter_url:base_url + "/jmjapp/commission/memberCenter",//会员中心
    inviteFriends_url:base_url + "/jmjapp/commission/inviteFriends",//邀请好友页面
    // 我的佣金
    addCard_url:base_url + "/jmjapp/commission/addCard",//添加银行卡
    cardTypeList_url:base_url + "/jmjapp/commission/cardTypeList",//银行列表
    cardList_url:base_url + "/jmjapp/commission/cardList",//我的银行卡列表
    cardDel_url:base_url + "/jmjapp/commission/cardDel",//银行卡删除
    editCard_url:base_url + "/jmjapp/commission/editCard",//编辑银行卡
    cardUpdate_url:base_url + "/jmjapp/commission/cardUpdate",//银行卡更新
    myCommission_url:base_url + "/jmjapp/commission/myCommission",//我的佣金
    sameMonthCommission_url:base_url + "/jmjapp/commission/sameMonthCommission",//本月的佣金
    immediateWithdrawal_url:base_url + "/jmjapp/commission/immediateWithdrawal",//立即提现页面
    sendRegCode_url:base_url + "/jmjapp/commission/sendRegCode",//验证手机时发送验证码
    immediateWithdrawalSubmit_url:base_url + "/jmjapp/commission/immediateWithdrawalSubmit",//立即提现提交
    transactionRecord_url:base_url + "/jmjapp/commission/transactionRecord",//交易记录
    inviteMilitaryExploits_url:base_url + "/jmjapp/commission/inviteMilitaryExploits",//我的邀请战绩



    // 微信支付
    goodsOrderSubmit_url:base_url + "/jmjapp/wxapplet/goodsOrderSubmit",//立即提交到确认订单微信支付
    orderSubmit_url:base_url + "/jmjapp/wxapplet/orderSubmit",//商城中购物车的商品 订单提交 微信支付
    myOrderSubmit_url:base_url + "/jmjapp/wxapplet/myOrderSubmit",//订单列表中的未付款的订单提交 微信支付
    
    //图片上传
    appletImgs_url:base_url + "/common/appletImgs",//小程序多图上传接口


    status(){
      var sta = wx.getStorageSync('status')
      if(sta==1){
        wx.setTabBarItem({
          index: 1,
          text: '采购'
        })
        wx.setTabBarItem({
          index: 3,
          text: '采购单'
        })
      }else{
        wx.setTabBarItem({
          index: 1,
          text: '分类'
        })
        wx.setTabBarItem({
          index: 3,
          text: '购物车'
        })
      }




      // if(sta==1){
      //   wx.setTabBarItem({
      //     index: 1,
      //     text: '分类'
      //   })
      //   wx.setTabBarItem({
      //     index: 3,
      //     text: '购物车'
      //   })
      // }else{
      //   wx.setTabBarItem({
      //     index: 1,
      //     text: '采购'
      //   })
      //   wx.setTabBarItem({
      //     index: 3,
      //     text: '采购单'
      //   })
      // }
    },

    

  }

  
  return config;

  
};
getconfig();
module.exports = {
  getconfig: getconfig
  //num: num
}