/*官网 app js*/
$(function() {

    //导航
    $(".nav li:nth-child(1) a").addClass("j_color");
    $(".nav li a").mouseenter(function() {
        $(this).addClass("j_color");
        $(".nav li").siblings().find("a").removeClass("j_color");
        $(this).addClass("j_color");
    })

    $(".nav li a").mouseenter(function() {
        $("#run").animate({
            left: $(this).offset().left - $('li').eq(0).offset().left,
        }, 200)
        $("#run").css({
            width: $(this).width(),
        })
    })

    //		$(".nav").mouseleave(function(){
    //			$("#run").css({
    //				width:'44',
    //			})
    //			$("#run").animate({
    //				left:"58px",
    //			},100)
    //		})
    // $("ul.nav").html('<div id="run"></div>')
    $(".nav_box ul").append('<div id="run"></div>');
    //首页箭头

    setInterval(function() {
        $(".ban_jump").animate({ bottom: '160px', opacity: '1' }, 600).animate({ bottom: '120px', opacity: '0.4' }, 600)
    }, 1000)

    //banner按钮
    $(".swiper-container").mouseenter(function() {
        $(".prev,.next").fadeIn(1000);
    }).mouseleave(function() {
        $(".prev,.next").fadeOut(1000);
    })
    //固定导航
    //	var navHeight = $('header').height();
    var navHeight = '500';
    $(window).scroll(function() {
        var scrollHeight = $(window).scrollTop();
        if (scrollHeight > navHeight) {

            $('header').addClass("nav_header");
            $('header').css("border", "none");
            $('header .logo img').attr("src", "images/ap_logo2.png");
            $('header .tel_pic1 img').attr("src","images/dianhua1.png");
            $('.nav li a').addClass("h_color");
            $('.nav li:nth-child(1) a').addClass("j_color");
            $(".nav li").mouseenter(function() {
                $(this).find("a").removeClass("h_color");
                $(this).find("a").addClass("j_color");
                $(this).siblings().find("a").addClass("h_color");

            })
        } else {
            $('header').removeClass("nav_header");
            $('header .logo img').attr("src", "ap_logo.png");
          	$('header .tel_pic1 img').attr("src","images/dianhua.png");
            $('.nav li a').removeClass("h_color");
            $(".nav li").mouseenter(function() {

                $(this).find("a").removeClass("h_color");

                $(this).siblings().find("a").addClass("hui_color");
                $(this).siblings().find("a").removeClass("h_color");
                //				$(this).siblings().find("a").removeClass("j_color");

            })
        }
    })



    //	首页字切换
    /*
    var num = 0;
    $(".lunbo .item div").eq(0).show()
    $(".lunbo span").animate({ 'margin': 0, 'opacity': 1 }, 800);
    $(".lunbo p").animate({ 'margin': 0, 'opacity': 1 }, 800);
    $(".next").click(function() {
        if (!$(".lunbo .item div").eq(num).find("p").is(":animated")) {
            $(".lunbo span").css({ 'margin-right': '300px', "opacity": 0 });
            $(".lunbo p").css({ 'margin-left': '300px', "opacity": 0 });
            num++;
            if (num > 2) {
                num = 0;
            }
            $(".lunbo .item div").eq(num).show().siblings().hide();
            $(".lunbo span").animate({ 'margin': 0, 'opacity': 1 }, 1500);
            $(".lunbo p").animate({ 'margin': 0, 'opacity': 1 }, 1500);
        }
    })
    $(".prev").click(function() {
        if (!$(".lunbo .item div").eq(num).find("p").is(":animated")) {
            $(".lunbo span").css({ 'margin-right': '300px', "opacity": 0 });
            $(".lunbo p").css({ 'margin-left': '300px', "opacity": 0 });
            num--;
            if (num < 0) {
                num = 2;
            }
            $(".lunbo .item div").eq(num).show().siblings().hide();
            $(".lunbo span").animate({ 'margin': 0, 'opacity': 1 }, 1500);
            $(".lunbo p").animate({ 'margin': 0, 'opacity': 1 }, 1500);
        }
    })

    function zidong() {
        $(".next").trigger("click");
    }
    var se = setInterval(zidong, 5000);
    $(".lunbo span,.lunbo p").hover(function() {
        clearInterval(se);
    }, function() {
        se = setInterval(zidong, 5000);
    })
		*/
    //经过
    /*app 分类*/
    //  $(".ser_box img").mouseenter(function(){
    //      $(this).addClass('animated bounceIn');
    //      $(this).css("animation-iteration-count");
    //  }).mouseleave(function(){
    //      $(this).removeClass('animated bounceIn');
    //  });


    $(".per_list li img").mouseenter(function() {
        $(this).addClass('animated rubberBand');
        $(this).css("animation-iteration-count", "1");
    }).mouseleave(function() {
        $(this).removeClass('animated rubberBand');
    });


    // $(".project").hover3d({
    //    	selector: ".project__card"
    // });   

    (function() {
        window.scrollReveal = new scrollReveal({ reset: true, move: '200px' });
    })();


    //边框效果--移入
    function biankuang(obj) {
        $(obj).find('.biankuang_1').stop(true).animate({
            height: '150px'
        }, 300)
        $(obj).find('.biankuang_2').stop(true).delay(300).animate({
            width: '590px'
        }, 300)
        $(obj).find('.biankuang_3').stop(true).animate({
            height: '150px'
        }, 300)
        $(obj).find('.biankuang_4').stop(true).delay(300).animate({
            width: '590px'
        }, 300)

        $(obj).find('.biankuangs_1').stop(true).animate({
            height: '392px'
        }, 300)
        $(obj).find('.biankuangs_2').stop(true).delay(300).animate({
            width: '227px'
        }, 300)
        $(obj).find('.biankuangs_3').stop(true).animate({
            height: '392px'
        }, 300)
        $(obj).find('.biankuangs_4').stop(true).delay(300).animate({
            width: '227px'
        }, 300)
    }
    //边框效果--移出
    function biankuang1(obj) {

        $(obj).find('.biankuang_1,.biankuangs_1').stop(true).delay(100).animate({
            height: '0px'
        }, 100)
        $(obj).find('.biankuang_2,.biankuangs_2').stop(true).animate({
            width: '0px'
        }, 100)
        $(obj).find('.biankuang_3,.biankuangs_3').stop(true).delay(100).animate({
            height: '0px'
        }, 100)
        $(obj).find('.biankuang_4,.biankuangs_4').stop(true).animate({
            width: '0px'
        }, 100)
    }
    //触发
    $('.list_box,.ser_box').hover(
        function() {
            var obj = $(this);
            //			$(obj).find('.text_gobuy').addClass('text_gobuy_show');
            //			$(obj).find('.search_y').animate({left:'150',opacity:1},300);
            biankuang(obj);
        },
        function() {
            var obj = $(this);
            //		$(obj).find('.text_gobuy').removeClass('text_gobuy_show');
            //		$(obj).find('.search_y').animate({left:'100',opacity:0},300);
            biankuang1(obj);
        }
    );

    //用心服务 切换图标
    // $(".swiper-slide:nth-child(1) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_01.png");
    // });
    // $(".swiper-slide:nth-child(1) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_01.png");
    // })

    // $(".swiper-slide:nth-child(2) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_02.png");
    // });
    // $(".swiper-slide:nth-child(2) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_02.png");
    // })

    // $(".swiper-slide:nth-child(3) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_03.png");
    // });
    // $(".swiper-slide:nth-child(3) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_03.png");
    // })

    // $(".swiper-slide:nth-child(4) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_04.png");
    // });
    // $(".swiper-slide:nth-child(4) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_04.png");
    // })

    // $(".swiper-slide:nth-child(5) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_05.png");
    // });
    // $(".swiper-slide:nth-child(5) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_05.png");
    // });

    // $(".swiper-slide:nth-child(6) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_06.png");
    // });
    // $(".swiper-slide:nth-child(6) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_06.png");
    // });
    // $(".swiper-slide:nth-child(7) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_01.png");
    // });
    // $(".swiper-slide:nth-child(7) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_01.png");
    // })

    // $(".swiper-slide:nth-child(8) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_02.png");
    // });
    // $(".swiper-slide:nth-child(8) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_02.png");
    // })

    // $(".swiper-slide:nth-child(9) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_03.png");
    // });
    // $(".swiper-slide:nth-child(9) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","/fw_03.png");
    // })

    // $(".swiper-slide:nth-child(10) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_04.png");
    // });
    // $(".swiper-slide:nth-child(10) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_04.png");
    // })

    // $(".swiper-slide:nth-child(11) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images/fw_lh_05.png");
    // });
    // $(".swiper-slide:nth-child(11) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images/fw_05.png");
    // });
    //用心服务 切换图标
    // $(".swiper-slide:nth-child(1) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_01.png");
    // });
    // $(".swiper-slide:nth-child(1) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_01.png");
    // })

    // $(".swiper-slide:nth-child(2) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_06.png");
    // });
    // $(".swiper-slide:nth-child(2) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_06.png");
    // })

    // $(".swiper-slide:nth-child(3) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_04.png");
    // });
    // $(".swiper-slide:nth-child(3) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_04.png");
    // })

    // $(".swiper-slide:nth-child(4) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_03.png");
    // });
    // $(".swiper-slide:nth-child(4) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_03.png");
    // })

    // $(".swiper-slide:nth-child(5) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_02.png");
    // });
    // $(".swiper-slide:nth-child(5) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_02.png");
    // });

    // $(".swiper-slide:nth-child(6) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_05.png");
    // });
    // $(".swiper-slide:nth-child(6) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_05.png");
    // });
    // $(".swiper-slide:nth-child(7) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_01.png");
    // });
    // $(".swiper-slide:nth-child(7) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_01.png");
    // })

    // $(".swiper-slide:nth-child(8) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_06.png");
    // });
    // $(".swiper-slide:nth-child(8) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_06.png");
    // })

    // $(".swiper-slide:nth-child(9) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_04.png");
    // });
    // $(".swiper-slide:nth-child(9) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_04.png");
    // })

    // $(".swiper-slide:nth-child(10) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_03.png");
    // });
    // $(".swiper-slide:nth-child(10) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_03.png");
    // })

    // $(".swiper-slide:nth-child(11) .ser_box").mousemove(function(){
    // 	$(this).find("img").attr("src","images//fw_lh_02.png");
    // });
    // $(".swiper-slide:nth-child(11) .ser_box").mouseout(function(){
    // 	$(this).find("img").attr("src","images//fw_02.png");
    // });
    $(".swiper-slide .ser_box").mousemove(function() {
        $(this).find("img").attr("src", $(this).find("img").attr('colorSrc'));
    }).mouseout(function() {
        $(this).find("img").attr("src", $(this).find("img").attr('oldSrc'));
    });

    //切换箭头
    $(".pos_list li:nth-child(1)").mouseenter(function() {
        $(this).find("img").attr("src", "images/jiantou01.png");
    });
    $(".pos_list li:nth-child(1)").mouseleave(function() {
        $(this).find("img").attr("src", "images/jiantou1.png");
    })

    $(".pos_list li:nth-child(2)").mouseenter(function() {
        $(this).find("img").attr("src", "images/jiantou02.png");
    });
    $(".pos_list li:nth-child(2)").mouseleave(function() {
        $(this).find("img").attr("src", "images/jiantou2.png");
    })

    $(".pos_list li:nth-child(3)").mouseenter(function() {
        $(this).find("img").attr("src", "images/jiantou03.png");
    });
    $(".pos_list li:nth-child(3)").mouseleave(function() {
        $(this).find("img").attr("src", "images/jiantou3.png");
    })
    $(".pos_list li:nth-child(4)").mouseenter(function() {
        $(this).find("img").attr("src", "images/jiantou04.png");
    });
    $(".pos_list li:nth-child(4)").mouseleave(function() {
        $(this).find("img").attr("src", "images/jiantou4.png");
    })
    $(".pos_list li:nth-child(5)").mouseenter(function() {
        $(this).find("img").attr("src", "images/jiantou05.png");
    });
    $(".pos_list li:nth-child(5)").mouseleave(function() {
        $(this).find("img").attr("src", "images/jiantou5.png");
    })
    $(".pos_list li:nth-child(6)").mouseenter(function() {
        $(this).find("img").attr("src", "images/jiantou06.png");
    });
    $(".pos_list li:nth-child(6)").mouseleave(function() {
        $(this).find("img").attr("src", "images/jiantou6.png");
    })

    //app案例展示
    /* $(".par_imgs li:nth-child(1) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_1.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_01.jpg");
     });
     $(".par_imgs li:nth-child(2) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_2.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_02.jpg");
     });
     $(".par_imgs li:nth-child(3) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_3.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_03.jpg");
     });
     $(".par_imgs li:nth-child(4) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_4.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_04.jpg");
     });
     $(".par_imgs li:nth-child(5) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_5.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_05.jpg");
     });
     $(".par_imgs li:nth-child(6) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_6.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_06.jpg");
     });
     $(".par_imgs li:nth-child(7) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_7.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_07.jpg");
     });
     $(".par_imgs li:nth-child(8) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_8.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_08.jpg");
     });
     $(".par_imgs li:nth-child(9) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_9.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_09.jpg");
     });
     $(".par_imgs li:nth-child(11) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_10.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_10.jpg");
     });
     $(".par_imgs li:nth-child(12) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_11.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_11.jpg");
     });
     $(".par_imgs li:nth-child(13) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_12.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_12.jpg");
     });
     $(".par_imgs li:nth-child(14) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_13.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_13.jpg");
     });
     $(".par_imgs li:nth-child(15) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_14.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_14.jpg");
     });
     $(".par_imgs li:nth-child(16) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_15.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_15.jpg");
     });
     $(".par_imgs li:nth-child(17) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_16.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_16.jpg");
     });
     $(".par_imgs li:nth-child(18) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_17.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_17.jpg");
     });
     $(".par_imgs li:nth-child(19) img").mouseenter(function(){
     	$(this).attr("src","images/pt_hl_18.jpg");
     }).mouseleave(function(){
     	$(this).attr("src","images/pt_18.jpg");
     });*/
    $(".par_imgs li img").mouseenter(function() {
        $(this).attr("src", $(this).attr('logo2'));
    }).mouseleave(function() {
        $(this).attr("src", $(this).attr('logo1'));
    });


    //凹陷旋转  旋转犇犇模块
    $(".rotate_box,.rotate_box img:nth-child(1),.sel_con_box_text,.sel_content").mouseenter(function() {
        $(".rotate_box img:nth-child(1)").removeClass("xzs");
        $(".rotate_box img:nth-child(1)").addClass("xz");
        $(".rotate_box img:nth-child(3)").animate({ marginLeft: '-262px' }, 500);
        $(".rotate_box img:nth-child(6)").animate({ marginLeft: '200px' }, 500);
        $(".rotate_box img:nth-child(4)").animate({ marginLeft: '-333px' }, 1000);
        $(".rotate_box img:nth-child(7)").animate({ marginLeft: '268px' }, 1000);
        $(".rotate_box img:nth-child(5)").animate({ marginLeft: '-252px' }, 1500);
        $(".rotate_box img:nth-child(8)").animate({ marginLeft: '188px' }, 1500);
    }).mouseleave(function() {
        $(".rotate_box img:nth-child(1)").addClass("xzs");
    })

    $(".rotate_box").mouseenter(function() {
        $(".rotate_box img:nth-child(1)").removeClass("xzs");
        $(".rotate_box img:nth-child(1)").addClass("img_xz");
    }).mouseleave(function() {
        $(".rotate_box img:nth-child(1)").removeClass("xz");
        $(".rotate_box img:nth-child(1)").addClass("xzs");
        $(".rotate_box img:nth-child(1)").removeClass("img_xz");

    })

    //合作伙伴
    $(".tab_content").hide();
    $("ul.tabs li:first").show();
    $(".tab_content:first").show();

    $("ul.tabs li").mouseenter(function() {
        $("ul.tabs li").addClass("hover_li");
        $(".tab_content").hide(0);
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn(0);
        return false;
    }).mouseleave(function() {
        $("ul.tabs li").removeClass("hover_li");
    })
    //底部切换
    $(".new_bot").hide();
    $("ul.new_tabs li:first").addClass("new_li").show(0);
    $("ul.new_tabs li:first a").addClass("new_a").show(0);

    $(".new_bot:first").show(0);

    $("ul.new_tabs li").hover(function() {
        $("ul.new_tabs li").removeClass("new_li");
        $("ul.new_tabs li a").removeClass("new_a");
        $(this).addClass("new_li");
        $(this).find("a").addClass("new_a");
        $(".new_bot").hide(0);
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn(0);
        return false;
    });

    $(".bot_right span").mouseenter(function() {
        $(this).addClass("new_span");
    }).mouseleave(function() {
        $(this).removeClass("new_span");
    })
    $(".info_right_botom_span span a").mouseenter(function() {
        $(this).addClass("h_color");
    }).mouseleave(function() {
        $(this).removeClass("h_color");
    })

    $(".news_info_left_bot span").mouseenter(function() {
        $(this).addClass("span_data");
    }).mouseleave(function() {
        $(this).removeClass("span_data");
    })
    $(".news_info_left_bot span i").mouseenter(function() {
        $(this).addClass("span_data");
    }).mouseleave(function() {
        $(this).removeClass("span_data");
    })


    $(".news_info_left a img,.info_right_top a img").mouseenter(function() {
        $(this).attr('src', 'images/jinru-(1).png');
    }).mouseleave(function() {
        $(this).attr('src', 'images/jinru.png')
    })

    $(".ft_nav li a").mouseenter(function() {
        $(this).addClass("ft_color");
    }).mouseleave(function() {
        $(this).removeClass("ft_color");
    })
    setTimeout(function() {
        $("#piao_div").fadeIn(1000);
    }, 10000);
})

/*function zixun() {
    var openUrl = "http://p.qiao.baidu.com/cps/chat?siteId=12885125&userId=25714300"; //弹出窗口的url
    var iWidth = 800; //弹出窗口的宽度;
    var iHeight = 600; //弹出窗口的高度;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
    window.open(openUrl, "", "height=" + iHeight + ", width=" + iWidth + ", top=" + iTop + ", left=" + iLeft);
}*/

function closeD() {
    $("#piao_div").fadeOut(1000);

    setTimeout(function() {
        $("#piao_div").fadeIn(1000);
    }, 60000);

}

function showD() {
    $("#piao_div").fadeIn(1000);
}