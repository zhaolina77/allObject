//var base_url = "http://diaoyu.yunxiaochengxu.top";
var base_url = "http://39.98.110.28:8081";
//var base_url = "http://192.168.3.117:8082";

//首页
var banners = base_url + '/dyapp/index/banners';
var index_matchs_list = base_url + '/dyapp/index/matchs_list'; // 赛事列表 首页推荐 协会 钓场 数据
var index_home_dynamic = base_url + '/dyapp/index/home_dynamic'; // 首页协会动态
var login_login = base_url + '/dyapp/login/login'; // 账号登录
// 协会
var xiehui_association_list = base_url + '/dyapp/index/association_list'; // 协会列表
var xiehui_association_detail = base_url + '/dyapp/index/association_detail'; // 协会详情
var xuehui_dynamic_detail = base_url + '/dyapp/index/dynamic_detail'; // 协会 动态/规程/政策详情
// 商品
var shop_classifyOneList = base_url + '/dyapp/goods/classifyOneList'; //  点击更多查看商品的一二级分类
var shop_classifyList = base_url + '/dyapp/goods/classifyList'; // 点击更多查看商品的一二级分类
var shop_recommendedForYou = base_url + '/dyapp/goods/recommendedForYou'; // 为你推荐
var shop_choicenessShopList = base_url + '/dyapp/goods/choicenessShopList'; // 精选商家列表
var shop_prefectureList = base_url + '/dyapp/goods/prefectureList'; // 首页展示每个专区的两个商品
var shop_goodsList = base_url + '/dyapp/goods/goodsList'; // 商品列表(商铺下面的商品、专区下面的商品，二级分类下的商品，搜索，销量，价格排序)
var shop_goodDetail = base_url + '/dyapp/goods/goodDetail'; // 商品详情
var shop_goodComment = base_url + '/dyapp/goods/findEvaluatesByProductId'; // 商品评价
var shop_goodSpec = base_url + '/dyapp/goods/goodSpec'; // 商品规格
var shop_addGoodNum = base_url + '/dyapp/goods/addGoodNum'; // 商品详情规格添加数量
var shop_cartAdd = base_url + '/dyapp/cart/cartAdd'; // 加入购物车
var shop_goodsSubmit = base_url + '/dyapp/goods/goodsSubmit'; // 立即购买
var shop_goodColl = base_url + '/dyapp/goods/goodColl'; // 商品收藏/取消
var shopList_url=base_url + '/dyapp/shop/shopList';//商铺列表
//收货地址
var wode_addAddress = base_url + '/dyapp/address/addAddress'; // 添加收货地址
var wode_addressList = base_url + '/dyapp/address/addressList'; // 地址列表
var wode_addressDel = base_url + '/dyapp/address/addressDel'; // 收获地址删除
var wode_address_isDefault = base_url + '/dyapp/address/isDefault'; // 将收货地址设为默认
var wode_addressUpdate = base_url + '/dyapp/address/addressUpdate'; // 地址修改

//购物车
var cart_cartList = base_url + '/dyapp/cart/cartList'; // 购物车列表
var cart_addToCartGoodNum = base_url + '/dyapp/cart/addToCartGoodNum'; // 购物车添加数量
var cart_minusToCartGoodNum = base_url + '/dyapp/cart/minusToCartGoodNum'; // 购物车减少数量 
var cart_shopCartSelect = base_url + '/dyapp/cart/shopCartSelect'; // 购物车商铺的全选与不选
var cart_selectCart = base_url + '/dyapp/cart/selectCart'; // 购物车全选与不全选
var cart_cartDelete = base_url + '/dyapp/cart/cartDelete'; // 清空商品和清楚单个商品
var cart_checkCart = base_url + '/dyapp/cart/checkCart'; // 单选和取消按钮
var cart_cartNum = base_url + '/dyapp/cart/cartNum'; // 商城中购物车数量
var cart_cartSubmit = base_url + '/dyapp/cart/cartSubmit'; // 点击购物车提交到订单页面

//订单
var order_orderList = base_url + '/dyapp/goodsOrder/orderList'; // 我的订单列表
var order_productOrderById = base_url + '/dyapp/goodsOrder/productOrderById'; // 根据商品id查看商品订单详情
var order_logisticsInformation = base_url + '/dyapp/goodsOrder/logisticsInformation'; // 物流信息
var order_confirmDelivery = base_url + '/dyapp/goodsOrder/confirmDelivery'; // 商品订单 确认收货
var order_refundCauseList = base_url + '/dyapp/goodsOrder/refundCauseList'; // 申请退款原因
var order_refundApply = base_url + '/dyapp/goodsOrder/refundApply'; // 商品的订单列表中点击退款
//我的
var wode_my_coll_shop = base_url + '/dyapp/my/my_coll_shop'; // 我的收藏商家
var wode_my_coll_good = base_url + '/dyapp/my/my_coll_good'; // 我的收藏商品
var wode_my_coll_angling_site = base_url + '/dyapp/my/my_coll_angling_site'; // 我的收藏钓场
var my_url=base_url + '/dyapp/my/my';//我的信息
var my_match_coupon_url=base_url + '/dyapp/index/my_match_coupon';//我的参赛券
var my_match_coupon_detail_url=base_url + '/dyapp/index/my_match_coupon_detail';//我的参赛券详情
// 钓场
var site_data_list = base_url + '/dyapp/angling/data_list'; // 钓场筛选数据列表
var site_site_list = base_url + '/dyapp/angling/angling_site_list'; // 钓场列表
var site_angling_site_detail = base_url + '/dyapp/angling/angling_site_detail'; // 钓场详情
var site_angling_site_coll = base_url + '/dyapp/angling/angling_site_coll'; // 钓场收藏(取消)
 var checkShopCollect_url=base_url + '/dyapp/shop/checkShopCollect';//商铺收藏、取消收藏
// 赛事
var match_data_list = base_url + '/dyapp/index/data_list'; // 地址列表 赛事筛选
var match_vedios_list = base_url + '/dyapp/index/vedios_list'; // 赛事视频
var match_matchs_detail = base_url + '/dyapp/index/matchs_detail'; // 赛事详情
var match_park_match = base_url + '/dyapp/index/park_match'; // 参赛立即报名(不收费)
var match_part_match_alipay = base_url + '/dyapp/alipay/part_match_alipay'; // 自营协会赛事报名支付宝支付
var match_part_match_wxpay = base_url + '/dyapp/wx/part_match_wxpay'; // 自营协会赛事报名微信支付
//资讯
var pick_list_url = base_url + '/dyapp/pick/pick_list';//资讯列表
var pick_detail_url = base_url + '/dyapp/pick/pick_detail'; //资讯详情
//个人中心
 var my_save_url=base_url + '/dyapp/my/my_save';//会员信息保存
 var user_agreement_url=base_url+'/dyapp/my/user_agreement';//用户协议
 var policy_url= base_url + '/dyapp/my/privacy_policy';//政策  1
//评价中心
var evaluateList_url=base_url +'/dyapp/goodsOrder/evaluateList';//评价中心 商品
export default {
	index_matchs_list,
	banners,
	login_login,
	index_home_dynamic,
	xiehui_association_list,
	xiehui_association_detail,
	xuehui_dynamic_detail,
	// 商品
	shop_classifyOneList,
	shop_classifyList,
	shop_recommendedForYou,
	shop_choicenessShopList,
	shop_prefectureList,
	shop_goodsList,
	shop_goodDetail,
	shop_goodComment,
	shop_goodSpec,
	shop_addGoodNum,
	shop_cartAdd,
	shop_goodsSubmit,
	shop_goodColl,
	shopList_url,
	
	//我的
	wode_addAddress,
	wode_addressList,
	wode_addressDel,
	wode_address_isDefault,
	wode_addressUpdate,
	my_url,
	my_match_coupon_url,
	my_match_coupon_detail_url,
	my_save_url,
	
	//购物车
	cart_cartList,
	cart_addToCartGoodNum,
	cart_minusToCartGoodNum,
	cart_shopCartSelect,
	cart_selectCart,
	cart_cartDelete,
	cart_checkCart,
	cart_cartNum,
	cart_cartSubmit,
	// 订单
	order_orderList,
	order_productOrderById,
	order_logisticsInformation,
	order_confirmDelivery,
	order_refundCauseList,
	order_refundApply,
	// wwode 
	wode_my_coll_shop,
	wode_my_coll_good,
	wode_my_coll_angling_site,
	
	// 钓场
	site_data_list,
	site_site_list,
	site_angling_site_detail,
	site_angling_site_coll,
	checkShopCollect_url,
	// 赛事
	match_data_list,
	match_vedios_list,
	match_matchs_detail,
	match_park_match,
	match_part_match_alipay,
	match_part_match_wxpay,
	
	//资讯
	pick_detail_url,
	pick_list_url,
	//用户协议
	user_agreement_url,
	policy_url,
	//评价中心
	evaluateList_url
}