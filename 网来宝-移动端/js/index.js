var enableShine = true;
$(function () {
    var index = 0,
        bannerCur = $('.banner ul li');
    function carrousel(index) {
        for (var i = 0; i < bannerCur.length; i++) {
            bannerCur[i].className = "";
        }
        bannerCur[index].className = "cur";
    }
    var timer = setInterval(function () {
        if (index == bannerCur.length - 1) {
            index = 0;
        } else {
            index += 1;
        }
        carrousel(index)
    }, 4000);

    $(window).scroll(function () {
        if($(window).scrollTop() >= 300){
            $('.header').removeClass('header1');
        }else{
            var current = $('.header')
            current.addClass('header1');
            current = $(this);
        }
     });
     renderCover();
});
function renderCover(){
    new LsGlobal.shiningBg('banner-1-cover', {
        directionX: 0,
        directionY: -1,
        velocityX: [.1, .5],
        velocityY: [.2 ,1],
        bounceX: true,
        bounceY: true,
        parallax: .1,
        pivot: 0,
        density: 10000,
        backgroundColor: '',
        dotRadius:[1,3],
        dotColor: 'rgba(249,99,99,.3)',
        linkColor: 'rgba(255,255,255,.3)',
        linkDistance: 100,
        linkWidth: 1
    }, false);
}

$(function () {
	var btn_index = 0;//褰撳墠鐐瑰嚮鐨勬寜閽储寮�
    var bannerHolder = $('.solve-banner ul li'),
        curIndex = $('.solve-ul li');
    //鍥剧墖榛樿浣嶇疆涓衡€渃lassCur鈥濈殑榛樿鍊�
    var classCur = ['cur', 'left' , 'right' , 'behind'];
    curIndex.each(function(index){
    	$(this).on('click', function () {
	        $(this).addClass('cur').siblings().removeClass('cur');
	        //鏇存柊鎸夐挳绱㈠紩锛屸€滆嚜鍔ㄦ挱鏀锯€濊鐢�
	        btn_index = index;
	        //浠ョ偣鍑荤殑鎸夐挳缂栧彿锛堝嵆 index锛夋敼鍙樺浘鐗囨樉绀虹殑浣嶇疆
	        switch(index){
	        	case 0:classCur[0] = 'cur';classCur[1] = 'behind';classCur[2] = 'right';classCur[3] = 'left';break;
	        	case 1:classCur[0] = 'left';classCur[1] = 'right';classCur[2] = 'cur';classCur[3] = 'behind';break;
	        	case 2:classCur[0] = 'behind';classCur[1] = 'cur';classCur[2] = 'left';classCur[3] = 'right';break;
	        	case 3:classCur[0] = 'right';classCur[1] = 'left';classCur[2] = 'behind';classCur[3] = 'cur';break;
	        }
	        for(var i=0; i<classCur.length; i++){
	            bannerHolder[i].className = classCur[i];
	        }
	    })
    })
    //鑷姩鎾斁
    setInterval(function(){
    	if(btn_index == 3){
    		btn_index = -1;
        }
	   $('.solve-ul li').eq([btn_index+1]).trigger('click');
	},6000)
});


$(function () {
     //鍙充晶娴姩鑿滃崟
     $('.right_icon_school,.control_a_school').on('mouseover',function(){
        $('.control_a_school').show();
    })//鐧惧害鍟嗘ˉ
    $('.right_icon_school,.control_a_school').on('mouseout',function(){
        $('.control_a_school').hide();
    })//鐧惧害鍟嗘ˉ
     $('.right_icon_phone,.control_a_phone').on('mouseover',function(){
        $('.control_a_phone').show()
    })//鍜ㄨ鐢佃瘽
    $('.right_icon_mes,.control_a_mes').on('mouseover',function(){
        $('.control_a_mes').show();
    })//鐧惧害鍟嗘ˉ
    $('.right_icon_mes,.control_a_mes').on('mouseout',function(){
        $('.control_a_mes').hide();
    })//鐧惧害鍟嗘ˉ
    $('.right_ico_phone,.control_a_phone').on('mouseout',function(){
        $('.control_a_phone').hide()
    })
    $('.right_icon_code,.control_a_code').on('mouseover',function(){
        $('.control_a_code').show()
    })//浜岀淮鐮�
    $('.right_icon_code,.control_a_code').on('mouseout',function(){
        $('.control_a_code').hide()
    });
});


$(".right_icon_top").click(function () {
    if ($('html').scrollTop()) {
        $('html').animate({ scrollTop: 0 }, 300, function(){
            $(this).scrollTop(0);
        });
        return false;
    }
    $('body').animate({ scrollTop: 0 }, 300, function(){
        $(this).scrollTop(0);
    });
    return false;
});

//宸︿晶瀵艰埅鏍忔敹缂�
$('.shrink').on('click',function(){
    var rightList = $('.lfd-ul li');
    $(rightList).toggle();
})

//鏁板瓧鑷姩婊戝姩
var fun = function(num,max_num,increase_num){
    var now_num = 0; //褰撳墠鏁板瓧锛岄粯璁や粠0寮€濮�
    var add_num = setInterval(function() {
        now_num += increase_num ;   //1.now_num鏁板瓧瑕佹洿杩緱蹇嚜澧炴暟灏辫皟澶х偣
        document.getElementById(num).innerText = now_num;
        //鏇磋凯鑷虫渶澶ф暟鍗冲仠姝㈠惊鐜�
        if(now_num == max_num) {
            clearInterval(add_num);
        }
    }, 50) //杩欎釜鏃堕棿涓烘绉掞紝2.鏁板瓧瑕佹洿杩緱蹇氨璋冨皬鐐�
    // console.log(document.getElementById(num))
    enableShine = false;
}
function scrollSpy(triggerTrg) {
    window.onscroll=function(){
        // console.log(window.scrollY);
        // console.log(triggerTrg.offsetTop);
        if (triggerTrg.offsetTop < window.scrollY + window.innerHeight / 2) {
            numShine();
        }
    }
}
function numShine() {
    if (!enableShine) {
        return false;
    }
    var max_num_arr = [5, 20, 100, 150, 8000],
    increase_num = [0.5, 1, 10, 15, 400];
    for (var i= 0;  i < max_num_arr.length;i ++) {
        fun("num-"+ (i +1),max_num_arr[i], increase_num[i]);
    }
}
scrollSpy(document.getElementsByClassName('commentary')[0]);



