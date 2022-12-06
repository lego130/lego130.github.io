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

    // 주요정보,리뷰
    var $show = $("#info > ul > li");
    var $front_Con = $("#contents");
    var $back_Con = $("#contents2");

    $show.eq(0).on("click", function () {
        $front_Con.show();
        $back_Con.hide();
        $(this).addClass("click").siblings().removeClass("click");
    });

    $show.eq(1).on("click", function () {
        $front_Con.hide();
        $back_Con.show();
        $(this).addClass("click").siblings().removeClass("click");
    });
 
});