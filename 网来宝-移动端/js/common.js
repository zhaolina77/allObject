
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f0d18c91ff220a3560ab9a04444bc2ea";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
$('#menuNav').on('click',function () {
	console.log(1111111)
    $('.leftSide,.leftSideCover').css('display','block');
    $('body').css({
        "position" : "fixed"
    });
});

$('#closeNav,.leftSideCover').on('click',function () {
    $('.leftSide,.leftSideCover').css('display','none');
    $('body').css({
        "position" : "relative"
    });
})

$(function (){
    var _width = $(window).width(); 
    // console.log( $(window).width() );
    $('.linkBtn').attr('href','https://demo.ls365.com/freeOpen.aspx');
})