var swiper = swiper||{};

swiper.dataInit = function (id) {
    var swiper1 = new Swiper(id, {
        slidesPerView : 'auto'
    });
    swiper.Swiper = swiper1;
    $('#swiper').find(".swiper-wrapper").wrapAll("<div class='swiper-bg'></div>");
}




