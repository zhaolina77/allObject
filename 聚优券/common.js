
var base_url = "https://fan.yunxiaochengxu.top/";
// var base_url = "http://192.168.3.118:8456";

function getconfig() {

  var config = {
    // 首页
    login_url:base_url + "/app/login",//小程序登录
    bannerList_url:base_url + "/app/applet/bannerList",//banner
    appUpload_url:base_url + "/app/appUpload",//上传文件
    industryRuleList_url:base_url + "/app/applet/industryRuleList",//行业规则
    specialQualificationsList_url:base_url + "/app/applet/specialQualificationsList",//资质
    bankList_url:base_url + "/app/applet/bankList",//资质
    mainInformationSave_url:base_url + "/app/applet/mainInformationSave",//添加主体信息（第一步）
    businessformationSave_url:base_url + "/app/applet/businessformationSave",//添加商户信息（第二步）
    industryRuleSave_url:base_url + "/app/applet/industryRuleSave",//添加行业规则（第三步）
    accountCreditedSave_url:base_url + "/app/applet/accountCreditedSave",//添加收款账户（第四步）
    checkMerchantsIntoPieces_url:base_url + "/app/applet/checkMerchantsIntoPieces",//根据商户进件id查看详情
   piecesList_url:base_url + "/app/applet/piecesList",//查看商户进件列表
   auditList_url:base_url + "/app/applet/auditList",//查看商户进件审核状态列表
   updateMerchantsIntoPieces_url:base_url + "/app/applet/updateMerchantsIntoPieces",//更新
  }

  return config;
};
getconfig();
module.exports = {
  getconfig: getconfig
  //num: num
}