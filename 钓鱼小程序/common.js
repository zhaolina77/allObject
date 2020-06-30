//var base_url = "http://192.168.3.46:8081";  ///workers-web/
//var base_url = "http://39.100.248.101:8105";
// var base_url = "http://192.168.3.117:8082";
var base_url = "http://diaoyu.yunxiaochengxu.top";

function getconfig() {

  var config = {
    //首页
    icon_list_url: base_url + "/dyapp/index/icon_list", //首页五个图标
    matchs_list_url: base_url + '/dyapp/index/matchs_list', //赛事列表 首页推荐 协会 钓场 数据
    banners_url: base_url + '/dyapp/index/banners', //Banner
    //渔获榜
    releases_detail_url: base_url + '/dyapp/catch/releases_detail', //动态详情
    releases_list_url: base_url + '/dyapp/catch/releases_list', //动态列表
    friends_list_url: base_url + '/dyapp/catch/friends_list', //我的关注
    catch_list_url: base_url + '/dyapp/catch/catch_list', //渔获榜信息
    releases_comment_coll_url: base_url + '/dyapp/catch/releases_comment_coll', //动态评论点赞
    check_all_reply_url: base_url + '/dyapp/catch/check_all_reply', //查看全部回复
    releases_like_url: base_url + '/dyapp/catch/releases_like', //动态点赞
    releases_coll_url: base_url + '/dyapp/catch/releases_coll', //动态收藏
    releases_friend_url: base_url + '/dyapp/catch/releases_friend', //关注好友
    releases_comment_url: base_url + '/dyapp/catch/releases_comment', //动态评论
    releases_comment_reply_url: base_url + '/dyapp/catch/releases_comment_reply', //动态评论回复
    friend_home_page_url: base_url + '/dyapp/my/friend_home_page', //好友主页
    catch_detail_url: base_url + '/dyapp/catch/catch_detail',//渔获榜详情
    publish_url : base_url + '/dyapp/catch/publish',//发布作品 图片 视频
    catch_angling_site_list_url: base_url + '/dyapp/catch/angling_site_list',//认证成功的钓场数据
    reports_url : base_url + '/dyapp/catch/reports',//举报动态
    // 资讯
    pick_list_url: base_url + '/dyapp/pick/pick_list', //资讯列表
    pick_detail_url: base_url + '/dyapp/pick/pick_detail', //资讯详情
    //协会
    home_dynamic_url: base_url + '/dyapp/index/home_dynamic', //首页协会动态
    association_list_url: base_url + '/dyapp/index/association_list', //协会列表
    association_detail_url: base_url + '/dyapp/index/association_detail', //协会详情
    matchs_list_url: base_url + '/dyapp/index/matchs_list', //赛事列表 首页推荐 协会 钓场 数据
    matchs_detail_url: base_url + '/dyapp/index/matchs_detail', //赛事详情
    dynamic_detail_url: base_url + '/dyapp/index/dynamic_detail', //协会 动态/规程/政策详情
    part_match_wxApplepay_url:base_url +'/dyapp/wxapplet/part_match_wxApplepay',//自营协会赛事微信小程序支付
    //赛事
    data_list_saishi_url: base_url + '/dyapp/index/data_list', //地址列表 赛事筛选
    vedios_list_url: base_url + '/dyapp/index/vedios_list', //协会视频列表
    my_match_coupon_detail_url: base_url + '/dyapp/index/my_match_coupon_detail', //我的参赛卷详情
    park_match_url: base_url + '/dyapp/index/park_match', //立即报名
    // 商品详情
    goodDetail_url: base_url + '/dyapp/goods/goodDetail', //商品详情
    goodSpec_url: base_url + '/dyapp/goods/goodSpec', //商品规格
    //钓场
    angling_site_list_url: base_url + '/dyapp/angling/angling_site_list', //钓场列表
    data_list_url: base_url + '/dyapp/angling/data_list', //钓场筛选数据列表
    angling_site_detail_url: base_url + '/dyapp/angling/angling_site_detail',//钓场详情
    angling_site_like_url: base_url + '/dyapp/angling/angling_site_like',//钓场点赞(取消)
   angling_site_coll_url :base_url + '/dyapp/angling/angling_site_coll',//钓场收藏(取消)
    angling_site_comment_url : base_url + '/dyapp/angling/angling_site_comment',//钓场评论
    angling_site_comment_url: base_url + '/dyapp/angling/angling_site_comment',//钓场评论
    //消息
    num_list_url: base_url + '/dyapp/message/num_list',//消息未读数量
    message_list_url: base_url + '/dyapp/message/message_list',//消息列表
    message_detail_url: base_url + '/dyapp/message/message_detail',//消息详情
    dynamic_message_list_url: base_url + '/dyapp/message/dynamic_message_list',//动态消息
    identity_url: base_url + '/dyapp/message/identity',//获取用户身份(单位/个人)
    personal_join_url: base_url + '/dyapp/message/personal_join',//个人参加会议
    company_join_url: base_url + '/dyapp/message/company_join',//单位参加会议
    //商城
    classifyOneList_url:base_url + '/dyapp/goods/classifyOneList', //首页商品的一级分类
    prefectureList_url:base_url + '/dyapp/goods/prefectureList', //首页显示每个专区的两个商品
    choicenessShopList_url:base_url + '/dyapp/goods/choicenessShopList', // 精选商家列表
    recommendedForYou_url:base_url + '/dyapp/goods/recommendedForYou',//为你推荐列表
    classifyList_url:base_url + '/dyapp/goods/classifyList', //点击更多查看商品的一二级分类
    goodsList_url:base_url + '/dyapp/goods/goodsList', //商品列表（商铺下面的商品、专区下面的商品，二级分类下的商品，搜索，销量，价格排序）
    shopDetail_url:base_url + '/dyapp/shop/shopDetail', //点击商铺到商铺详情
    findEvaluatesByProductId_url: base_url + '/dyapp/goods/findEvaluatesByProductId',//查看该商品的所有评论
    shopList_url:base_url + '/dyapp/shop/shopList', //商铺列表
    cartNum_url:base_url + '/dyapp/cart/cartNum', //商城中购物车数量
    goodColl_url:base_url + '/dyapp/goods/goodColl', //商品收藏、取消收藏
    cartAdd_url:base_url + '/dyapp/cart/cartAdd', //加入购物车
    goodSpec_url:base_url + '/dyapp/goods/goodSpec', //商品规格
    checkShopCollect_url:base_url + '/dyapp/shop/checkShopCollect',//商铺收藏、取消收藏
    //购物车
    cartList_url:base_url + '/dyapp/cart/cartList', //购物车列表
    addToCartGoodNum_url:base_url + '/dyapp/cart/addToCartGoodNum', //购物车添加数量
    minusToCartGoodNum_url : base_url + '/dyapp/cart/minusToCartGoodNum',//购物车减数量
    cartDelete_url:base_url + '/dyapp/cart/cartDelete',  //清空商品和删除单个商品
    shopCartSelect_url: base_url + '/dyapp/cart/shopCartSelect', //购物车商铺的全选与不选
    checkCart_url: base_url + '/dyapp/cart/checkCart', //单选和取消勾选;
    selectCart_url: base_url + '/dyapp/cart/selectCart', //购物车全选与全不选
    goodsSubmit_url:base_url + '/dyapp/goods/goodsSubmit', //立即购买 到确认订单页面
    cartSubmit_url:base_url + '/dyapp/cart/cartSubmit',//点击购物车提交到确认订单页面
    //地址
    addressList_url:base_url + '/dyapp/address/addressList',//地址列表
    addAddress_url:base_url + '/dyapp/address/addAddress', ///添加收货地址
    addressDel_url : base_url + '/dyapp/address/addressDel', //收货地址删除
    addressById_url : base_url + '/dyapp/address/addressById', //根据id查看地址详情
    addressUpdate_url: base_url + '/dyapp/address/addressUpdate', //地址修改
    isDefault_url:base_url +'/dyapp/address/isDefault',//将收货地址设为默认
    //订单
    orderList_url:base_url +'/dyapp/goodsOrder/orderList',//我的订单列表
    productOrderById_url:base_url +'/dyapp/goodsOrder/productOrderById',//根据订单id查看商品订单详情
    refundProgress_url:base_url +'/dyapp/goodsOrder/refundProgress',//退款详情进展
    evaluateList_url:base_url +'/dyapp/goodsOrder/evaluateList',//评价中心 商品
    checkGoodEvaluate_url:base_url +'/dyapp/goodsOrder/checkGoodEvaluate',//查看订单商品评论
    addGoodEvaluate_url:base_url +'/dyapp/goodsOrder/addGoodEvaluate',//添加商品评价
    refundCauseList_url:base_url+'/dyapp/goodsOrder/refundCauseList',  //申请退款原因
    refundApplyurl_url:base_url+'/dyapp/goodsOrder/refundApply',//商品的订单列表中点击退款
    cancelOrder_url:base_url+'/dyapp/goodsOrder/cancelOrder',//取消订单
    orderWxBuy_url:base_url+'/dyapp/wxapplet/orderWxBuy',//订单列表中的订单提交 微信支付
    confirmDelivery_url:base_url+'/dyapp/goodsOrder/confirmDelivery',//商品订单 确认收货
    logisticsInformation_url:base_url+'/dyapp/goodsOrder/logisticsInformation',//物流信息
    // goodsWxBuy_url:base_url+'/dyapp/wxapplet/goodsWxBuy',//商品直接立即购买 微信支付
    // cartWxBuy_url:base_url+'/dyapp/wxapplet/cartWxBuy',//购物车提交 微信支付
    goods_wx_applet_buy_url:base_url+'/dyapp/wxapplet/goods_wx_applet_buy',//商品直接立即购买 微信小程序支付
    cart_wx_applet_buy_url:base_url+'/dyapp/wxapplet/cart_wx_applet_buy',//购物车微信小程序支付
    //设置
    help_center_url:base_url+'/dyapp/my/help_center',//常见问题
    show_phone_url:base_url+'/dyapp/login/show_phone',//更换手机号时显示当前登录的手机号
    information_change_getMobileCode_url:base_url + '/dyapp/login/information_change_getMobileCode',//信息变更发送验证码
    next_step_url : base_url + '/dyapp/login/next_step',//更换手机号点击下一步
    new_phone_save_url : base_url+ '/dyapp/login/new_phone_save',//绑定新手机号点击确认
    update_password_url : base_url + '/dyapp/login/update_password',//密码修改
    my_black_url:base_url + '/dyapp/catch/my_black',//我的拉黑列表
    black_url:base_url +'/dyapp/catch/black',//拉黑或取消拉黑
    //上传
    uploadModuleOrFunctionFiles_url: base_url + '/common/imgs', //图片上传
    //首页
    authen_url: base_url + '/dyapp/my/authen', //账号认证接口
    authen_type_list_url: base_url + '/dyapp/my/authen_type_list', //认证类型列表
    is_renewals_url: base_url + '/dyapp/my/is_renewals', //参数:token    0-没有续费按钮 1-有续费按钮
    personal_authen_url: base_url + '/dyapp/my/personal_authen', //个人认证
    association_authen_url: base_url + '/dyapp/my/association_authen', //协会认证
    shopType_url: base_url + '/dyapp/shop/shopType', // 商铺入驻时要选择的商铺类型
    shopEnterSub_url: base_url + '/dyapp/shop/shopEnterSub', //商铺入驻提交
    authen_wxpay_url: base_url + '/dyapp/wxapplet/authen_wxapplet_pay', //认证微信支付
    //我的
    my_save_url: base_url + '/dyapp/my/my_save',//会员信息保存
    user_feedback_save_url: base_url + '/dyapp/my/user_feedback_save', //意见反馈
    hotline_url: base_url + '/dyapp/my/hotline', //关于我们
    xy_url: base_url + '/dyapp/my/user_agreement', //协议  1
    policy_url: base_url + '/dyapp/my/privacy_policy', //政策  1
    my_url: base_url + '/dyapp/my/my', //我的信息
    is_exhibition_url: base_url + '/dyapp/catch/is_exhibition', //会员是否可以发布图片和视频
    my_releases_url: base_url + '/dyapp/my/my_releases', //我的发布
    my_match_coupon_url: base_url + '/dyapp/index/my_match_coupon', //我的参赛卷
    my_friend_url: base_url + '/dyapp/my/my_friend', //我的关注
    coll_del_url: base_url + '/dyapp/my/coll_del', //删除收藏,
    my_coll_angling_site_url: base_url + '/dyapp/my/my_coll_angling_site', //我的收藏钓场
    my_coll_dynamic_url: base_url + '/dyapp/my/my_coll_dynamic', //我的收藏动态
    my_coll_good_url: base_url + '/dyapp/my/my_coll_good', //我的收藏商品
    my_coll_shop_url: base_url + '/dyapp/my/my_coll_shop', //我的收藏商家
    //登录
    authorization_url: base_url + '/dyapp/login/index', //degnlu
    biography_url: base_url + '/dyapp/login/biography', //解析json
    auth_url: base_url + '/dyapp/login/authorization', //微信小程序授权绑定
    is_password_url: base_url + '/dyapp/login/is_password', //判断密码
  }

  return config;
};
getconfig();
module.exports = {
  getconfig: getconfig
  //num: num
}