$(function () {
//(1)nav 바 상단 고정시키기

    //스크롤 양과 화면상단에서의 거리 구하기
    //scrollTop, offset.top
    var $window = $(window);                           
    var $nav = $("#w100");              
    var navTop = $nav.offset().top;                                 //참조하는 요소 미리 가져오기
    // console.log("navTop = " +  $navTop);

    $window.on("scroll", function() {

        if($(this).scrollTop() >= navTop){                          //스크롤양이 화면상단의 거리보다 많으면    
            $nav.addClass("fix")                                     //fix class 추가하기
        }

        else {
            $nav.removeClass("fix");                                //아니면 fix class 제거하기
        }
        // var scrollTop = $window.scrollTop();

        // if (!$nav.is(".fix") && scrollTop > navTop)

        // $nav.addClass("fix");

        // else if ($nav.is(".fix") && scrollTop < navTop)

        // $nav.removeClass("fix");

    });


//(2) nav 누르면 그 화면으로 이동하기
    var $menu = $("#nav > ul > li");
    var $container = $(".wrap_container");                          //참조하는 요소 미리 가져오기

    $menu.on("click", function(e) {
        e.preventDefault();                                        //a 요소 기본속성 제거

        var menuIdx = $(this).index();                              //인덱스 변수 대입
        // console.log ("menuIdx =" + menuIdx);
        var section = $container.eq(menuIdx);                       //container의 특정번째 변수에 대입 
        // console.log ("section =" + section);
        var sectionDistance = section.offset().top;                 //화면상단 거리 변수대입
        // console.log("sectionDistance =" + sectionDistance);

        $("html, body").animate({scrollTop:sectionDistance});
    });


//(3) nav scroll하면 nav블럭 바뀌기

   $(window).on("scroll", function () {                               //window에 스크롤이 생기면
       $container.each(function () {                               
           if($(this).offset().top <= $(window).scrollTop()){         //만약 container의 화면상담에서의 거리보다 스크롤양이 많으면 
               var Idx = $container.index(this);
                        
               $menu.removeClass("show").eq(Idx).addClass("show");    //menu모두에 show class를 제거하고
            //    $menu.eq(Idx).addClass("show");                     //현재보고 있는 페이지에만 show class를 추가한다
           }
       });
   });


// (4) nav 로고 누르면 nav바 맨 위로 이동

   $("#logo").on("click", function(e) {
        e.preventDefault();

        // var Distance = $(".wrap_container").eq(0).offset().top;
 
        var Distance = $(".wrap_container").eq(0).offset().top;

        $("html, body").animate({scrollTop : Distance}, 600);
   });


// //(4)section1 skills 숫자 증가하기

    var interval = 20;
    var numAnimation = $(".skills_num");
    var stop = true;
    // console.log(numAnimation);

    function changeNum(idx) {
        var num = 0;
        var targetNum = numAnimation[idx].getAttribute("data-count");
        
        var timer = setInterval(function () {
            ++num;
            numAnimation[idx].innerHTML=num;

            if(num == targetNum) {
                clearInterval(timer);
            }
        }, interval);
    }
    window.addEventListener("scroll", function () {
        // if($(window).scrollTop() >= $("#sec1_container").offset().top) {
        //     for(var i = 0; i < numAnimation.length; i++) {
        //         changeNum(i);
        //     }
        // }
        
        if($(window).scrollTop() >= $("#sec1_container").offset().top) {
            if(stop) {
                for(var i = 0; i < numAnimation.length; i++) {
                    changeNum(i);
                }
                stop = false;
            }
        }
        else {
            stop = true;
        };

    });


//(5)section2 publising 홈페이지
    var $sec2_button = $("#section2_btn > ul > li > a");
    var $publising = $(".publising_page");                          //참조하는 요소 미리 검색하기
    
    $sec2_button.on("click", function (e) {
        e.preventDefault();                                         //a요소 기본이벤트 제거
        
        $sec2_button.removeClass("on");                             //모든 a요소 class 제거
        $(this).addClass("on");                                     //현재 클릭한 요소만 class 추가
        // $(this).find("a").addClass("on");
        // $(this).siblings().find("a").removeClass("on");

        $publising.hide();                                          //모든 퍼블리싱 숨기기

        var $targetIdx = $(this).parent().index();                  //인덱스요소 확인하기
        // console.log("Number: targetIdx = " + $targetIdx);        //console에서 확인해보기
        $publising.eq($targetIdx).show();                           //publising순번에 해당하는 요소 보여주기
        
    });
    

//(6)section3 banner_Overlay
    var $overlay = $("#banner_overlay");
    var $imageOverlay = $overlay.children("img");                  //참조하는 요소 미리 탐색하기
    var $banner = $("#banner > li > a");

    $banner.on("click", function(e) {         
        e.preventDefault();                                         //a요소 기본이벤트 제거

        var $bannerIdx = $banner;
        // console.log("$bannerIdx.index() = " + $bannerIdx.index(this));

        if ($bannerIdx.index(this) == 1) {
            $imageOverlay.attr("src", $(this).attr("href"));
            $imageOverlay.css({top: 100, transform: "translateX(-50%)" });
        } else {
            $imageOverlay.attr("src", $(this).attr("href"));
            $imageOverlay.removeAttr("style");
        }
        $overlay.fadeIn(function() {                                //콜백함수 사용, overlay 나타나면 imageOverlay도 같이 나타나기
            $imageOverlay.fadeIn();
        });
        
        $("body").css({"overflow-y": "hidden"});
    });

    $("#close").on("click", function () {                   
        $imageOverlay.fadeOut(function () {                         //imageOverlay 사라지면 overlay 같이 사라지기
            $overlay.fadeOut(function () {
                $("body").css({"overflow-y": "auto"});
            });
        });

    });
                

//(7)section4 about me
    var $sec4_con = $(".sec4_contents");
    var $sec4_wrap = $(".sec4_wrap");
    var $closed = $(".sec4_close");                                 

    $sec4_con.on("click", function () {
        $sec4_con.removeClass("ons");
        $(this).addClass("ons");

        $sec4_wrap.hide();

        var sec4Idx = $(this).index();
        $sec4_wrap.eq(sec4Idx).show();
    });

    $closed.on("click", function () {
        $sec4_wrap.fadeOut(function() {
            $(this).fadeOut(100);
        });
    });

});