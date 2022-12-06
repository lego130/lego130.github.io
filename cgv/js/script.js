$(function () {

    // 메뉴 드롭다운
    var $mainmenus = $("#main_menu > li > a");
    var $dropmenu = $("#drop_menu");
    $mainmenus.on("click", function (e) {
        e.preventDefault();
        $dropmenu.slideDown();
    });

    $("#nav").on("mouseleave", function () {
        $dropmenu.slideUp();
    });

    
    // 메인 슬라이드
    var $slide=$("#cgv_slide");
    var interval = 5000;
    var timerID = window.setInterval(movie_banner, interval);

    $("#slide_wrap").hover (
        function () {
            window.clearInterval(timerID);
        },
        function () {
            timerID = window.setInterval(movie_banner, interval);
        }
    );

    function movie_banner () {
        $slide.animate({ "margin-left": "-100%"}, function () {
            $slide.removeAttr("style").children(":first").appendTo($slide);
        });
    }

    $("#pre").on("click", function () {
        $slide.css("margin-left", "-100%").children(":last").prependTo($slide);
        $slide.animate({"margin-left": 0});
    });

    $("#next").on("click", function () {
        movie_banner();
    });


    // 박스오피스, 상영예정작
    var $button = $("#title_chart > ul > li");
    var $front = $("#contents_chart");
    var $back = $("#contents_chart2");
    var $chart1 = $("#chart1");
    var $chart2 = $("#chart2");

    $button.eq(0).on("click", function () {
        $front.show();
        $back.hide();
        $(this).addClass("on").siblings().removeClass("on");
    });

    $button.eq(1).on("click", function () {
        $front.hide();
        $back.show();
        $(this).addClass("on").siblings().removeClass("on");
    });

    $("#pre2").on("click", function () {
        chartB();
    });

    $("#sub_pre2").on("click", function () {
        chart_B();
    });

    $("#next2").on("click", function () {
        chartF();
    });

    $("#sub_next2").on("click", function () {
        chart_F();
    });

    function chartF() {
        $chart1.animate({"margin-left": "-20%"}, function () {
            $chart1.removeAttr("style").children(":first").appendTo(this);
        });
    }

    function chartB() {
        $chart1.css("margin-left", "-20%").children(":last").prependTo($chart1);
        $chart1.animate({"margin-left": 0});
    }

    function chart_F() {
        $chart2.animate({"margin-left": "-20%"}, function () {
            $chart2.removeAttr("style").children(":first").appendTo(this);
        });
    }

    function chart_B() {
        $chart2.css("margin-left", "-20%").children(":last").prependTo($chart2);
        $chart2.animate({"margin-left": 0});
    }


    // special 상영관
    var $special = $("#special_contents > ul > li");
    var $whole = $(".s_whole");

    $special.hover(
        function () {
            $(this).addClass("big").siblings().addClass("small");
            $whole.addClass("show").siblings().addClass("hide");
        },
        function () {
            $(this).removeClass("big").siblings().removeClass("small");
            $whole.removeClass("show").siblings().removeClass("hide");
        }
    );

    // 공지사항, 특별혜택

    var $window = $(window);
    var $notice = $("#notice_container");
    var $wraps = $(".wraps");

    $window.on("scroll", function () {
        $scrollDown = $window.scrollTop()+$window.height();
        $scrollUp = $notice.offset().top+$notice.outerHeight();

        if ($scrollDown > $scrollUp) {
            $wraps.css({
                opacity: "1", transform: "translateX(0)"
            });
        }
        else if ($scrollDown < $scrollUp) {
            $wraps.removeAttr("style");
        }
    });
});