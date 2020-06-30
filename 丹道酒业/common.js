// var base_url = "http://101.37.28.67:9099/";
//  var base_url = "http://192.168.1.105:8080/";
 // var base_url = "http://192.168.3.21:8082";
//  var base_url = "http://192.168.3.146:8080";
var base_url = "https://xcx.dandaojiuye.com";
function getconfig(){
    var config = {
      index_url: base_url +"/wxapp/index/appindex",//首页
      authorization_url: base_url +'/dandaoapp/login/authorization',
      bannerList_url: base_url +'/dandaoapp/index/bannerList',
      areaList_url: base_url +'/dandaoapp/index/areaList',//首页商品列表
      goodsDetails_url: base_url + '/dandaoapp/index/goodsDetails', //商品详情
      couponImg_url: base_url + '/dandaoapp/index/couponImg',  //优惠券封面图
      couponList_url: base_url + '/dandaoapp/index/couponList', //优惠券列表
      goodsService_url: base_url + '/dandaoapp/index/goodsService', //查看商品更多服务
      goodsSpec_url: base_url + '/dandaoapp/index/goodsSpec', //商品规格
      posterImg_url: base_url + '/dandaoapp/index/posterImg', //查询申请俱乐部广告图
      applyClub_url: base_url + '/dandaoapp/index/applyClub', //申请俱乐部
      personData_url: base_url + '/dandaoapp/my/personData', //查看个人资料
      myCouponList_url: base_url + '/dandaoapp/my/myCouponList', // 我的优惠券
      myOrderList_url: base_url + '/dandaoapp/my/myOrderList', //我的订单
      getCoupon_url: base_url + '/dandaoapp/index/getCoupon', //领取优惠券
      addressList_url: base_url + '/dandaoapp/my/addressList',//收货地址列表
      addAddress_url: base_url + '/dandaoapp/my/addAddress',//添加收货地址
      addressUpdate_url: base_url + '/dandaoapp/my/addressUpdate', //修改收货地址
      addressDel_url: base_url + '/dandaoapp/my/addressDel', //删除收货地址
      cartAdd_url: base_url + '/dandaoapp/cart/cartAdd',  //加入购物车
      goodsSpec_url: base_url + '/dandaoapp/index/goodsSpec',//商品规格
      addNum_url: base_url + '/dandaoapp/index/addNum', //商品详情规格添加数量
      cart_list_url: base_url + '/dandaoapp/cart/cartList', //购物车列表
      add_cart_url: base_url + '/dandaoapp/cart/addToCart', //购物车添加数量
      cutdown_cart_url: base_url + '/dandaoapp/cart/minusToCart',//购物车减数量
      one_select_url: base_url + '/dandaoapp/cart/checkOneCart',//单选和取消勾选
      all_select_url: base_url + '/dandaoapp/cart/selectCart', //购物车全选与全不选 默认全选
      cartDelete_url: base_url + '/dandaoapp/cart/cartDelete', //清空商品和删除单个商品
      goodsSubmit_url: base_url + '/dandaoapp/index/goodsSubmit', //立即购买到确认订单页面
      inviteInfo_url: base_url + '/dandaoapp/my/inviteInfo', //邀请好友说明
      levelInfo_url: base_url + '/dandaoapp/my/levelInfo', //会员升级说明
      cartSubmit_url: base_url + '/dandaoapp/cart/cartSubmit', //点击购物车提交到确认订单页面
      myMoney_url: base_url + '/dandaoapp/my/myMoney', //我的钱包
      clubList_url: base_url + '/dandaoapp/my/clubList', //发货地址列表
      goodsWxAppletBuy_url: base_url + '/dandaoapp/wxapplet/goodsWxAppletBuy',//商品直接立即购买
      cartWxAppletBuy_url: base_url + '/dandaoapp/wxapplet/cartWxAppletBuy', //购物车支付
      orderCancel_url: base_url + '/dandaoapp/my/orderCancel', //取消订单
      confirmDelivery_url: base_url + '/dandaoapp/my/confirmDelivery',//订单列表中 点击确认收货
      delOrder_url: base_url + '/dandaoapp/my/delOrder',//订单删除
      getEvaluateList: base_url + '/dandaoapp/my/getEvaluateList',//点击去评价进入商品评价列表
      getEvaluate_url: base_url + '/dandaoapp/my/getEvaluate', //添加评价保存
      orderDetails_url: base_url + '/dandaoapp/my/orderDetails',//订单列表中 查看详情
      noPayOrder_url: base_url + '/dandaoapp/wxapplet/noPayOrder', //未支付的订单点击支付
      addCard_url: base_url + '/dandaoapp/my/addCard',  //添加银行卡
      cartList_url: base_url +'/dandaoapp/my/cartList',//
      refundApply_url: base_url + '/dandaoapp/my/refundApply',  //app商品的订单列表中点击退款
      refundAfter_url: base_url + '/dandaoapp/my/refundAfter', //退款/售后
      cardTypeList_url: base_url + '/dandaoapp/my/cardTypeList', //银行卡类型列表
      immediateWithdrawalSubmit_url: base_url + '/dandaoapp/my/immediateWithdrawalSubmit', //立即提现提交
      putMoneyList_url: base_url + '/dandaoapp/my/putMoneyList', //提现记录
      commissionList: base_url + '/dandaoapp/my/commissionList',//奖励金记录
      allGoodsCollection_url: base_url + '/dandaoapp/index/allGoodsCollection', //查看商品全部评论
      checkEvaluate_url: base_url + '/dandaoapp/my/checkEvaluate', //查看当前商品的评论
      cardDel_url: base_url + '/dandaoapp/my/cardDel', //银行卡删除
      cardUpdate_url: base_url + '/dandaoapp/my/cardUpdate', //银行卡更新
      uploadModuleOrFunctionFiles_url: base_url +'/common/imgs',
      aboutUs_url: base_url +'/dandaoapp/index/aboutUs',
      useInfo_url: base_url + '/dandaoapp/my/useInfo', //使用攻略
      searchGoods_url: base_url + '/dandaoapp/index/searchGoods',// 查询商品
      commissionByMonth_url: base_url + '/dandaoapp/my/commissionByMonth',//本月奖励金总数
      activityList_url: base_url + '/dandaoapp/index/activityList', //活动通知列表
      activityDetail: base_url + '/dandaoapp/index/activityDetail',  //活动详情
      backGroundImgs: base_url + '/dandaoapp/index/backGroundImgs',  //查询分享背景图
      myphone_url: base_url +'/dandaoapp/my/phone', //


    }

    return config;
}

module.exports = {
  getconfig: getconfig
}