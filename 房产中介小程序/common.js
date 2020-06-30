// var base_url = "http://192.168.3.142:8080";
var base_url = "https://shuxiang.yunxiaochengxu.top";



function getconfig() {

  var config = {
    uploadModuleOrFunctionFiles_url:base_url +"/app/upload",//上传
    // 登录
    wxMiNiProgramLogin_url: base_url + '/app/wxMiNiProgramLogin',//微信小程序登录（返回一个jwt生成的token）
    bindingPhone_url: base_url + '/app/bindingPhone',//绑定手机号
    biography_url: base_url + '/app/biography',//获取sessionKey
    index_city_url: base_url + '/app/city/list',//获取sessionKey
    banner_url: base_url + '/app/banner/list',//广告列表
    //shoue
    goodHouseInXiAn_url: base_url + '/app/index/goodHouseInXiAn',//西安必看好房 查看更多传start size就行了
    findRecentlyCity_url: base_url + '/app/city/findRecentlyCity',//根据经纬度获取最近的一个城市
    recommendHouse_url: base_url + '/app/index/recommendHouse',//推荐的房子
    house_list_url: base_url + '/app/house/list',///查看新房二手房租房列表
    getNewHouseDetailById_url: base_url + '/app/house/getNewHouseDetailById',//查看新房详细信息
    getOldHouseDetailById_url: base_url + '/app/house/getOldHouseDetailById',//根据id获取旧房详情（二手和租房）
    nearbyHourse_url: base_url + '/app/house/nearbyHourse',//附近房源
    collect_url: base_url + '/app/house/collect',//收藏 取消收藏
    getHourseType_url: base_url + '/app/house/getHourseType',//房子户型列表（针对二手房和租房）
    info_url: base_url + '/app/account/info',//用户信息
    submitFeedBack_url: base_url + '/app/feedBack/submitFeedBack',//反馈
    collectList_url: base_url + '/app/account/collectList',//我的收藏 返回值和列表一样
    insertClient_url: base_url + '/app/clients/insertClient',//新增报备客户
    phone_list_url: base_url + '/app/clients/list',//客户列表
    subReport_url: base_url + '/app/report/subReport',//提交报备
    reportRecord_url: base_url + '/app/report/reportRecord',//
    accountMessageList_url: base_url + '/app/account/accountMessageList',//
    abortUs_url: base_url + '/app/account/abortUs',///个人中心



    activityList_url: base_url + '/app/ac/indexAcList',//首页推荐的咨询
    acList_url: base_url + '/app/ac/acList',//资讯列表
    findActivityById_url: base_url + '/app/ac/findActivityById',//资讯详情


 
  }

  return config;
};
function type(){
  
  
}
getconfig();
module.exports = {
  getconfig: getconfig
  //num: num
}