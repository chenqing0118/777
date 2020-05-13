(function ($) {
    "use strict";

    // Prealoder
    function prealoader () {
        if ($('#loader').length) {
            $('#loader').fadeOut(); // will first fade out the loading animation
            $('#loader-wrapper').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
            $('body').delay(350).css({'overflow':'visible'});
        };
    }

    /*----------------------------
    jQuery Mean Menu
    ------------------------------ */
    $("#mobile-menu").meanmenu({
        meanMenuContainer: ".mobile-menu",
        meanScreenWidth: "992"});
    $(".info-bar").on("click", function() {
        $(".extra-info").addClass("info-open");});
    $(".close-icon").on("click", function() {
        $(".extra-info").removeClass("info-open");
    });
    /*----------------------------
          Menu active JS
        ----------------------------*/
    $('.main-menu ul li a').on ('click', function () {
        $('.main-menu ul li a').removeClass("current");
        $(this).addClass("current");
    });

    /*----------------------------
       jQuery Stickymenu
       ------------------------------ */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 0) {
            $('.main-navigation').addClass("sticky");
            $('.main-logo').addClass("d-none");
            $('.logo-sticky').addClass("d-block");
        }
        else {
            $('.main-navigation').removeClass("sticky");
            $('.main-logo').removeClass("d-none");
            $('.logo-sticky').removeClass("d-block");
        }
    });


//Testimonial
    $(".testimonial-slider").owlCarousel({
        loop:true,
        margin:0,
        items: 1,
        autoplay:true,
        dots: true,
        smartSpeed:1500,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });


//Main slider
    $(".slider-on").owlCarousel({
        loop:true,
        margin:0,
        items: 1,
        autoplay:true,
        dots: true,
        smartSpeed:1000,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

// scrollToTop
    $.scrollUp({
        scrollName: 'scrollUp', // Element ID
        topDistance: '300', // Distance from top before showing element (px)
        topSpeed: 300, // Speed back to top (ms)
        animation: 'fade', // Fade, slide, none
        animationInSpeed: 200, // Animation in speed (ms)
        animationOutSpeed: 200, // Animation out speed (ms)
        scrollText: '<i class="fa fa-arrow-up" aria-hidden="true"></i>', // Text for element
        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });

// Counter Up

    $('.counter').rCounter({
        delay: 100,
        time: 1000
    });

// Blog Slider

    $(".blog-slider").owlCarousel({
        loop:true,
        margin:0,
        items: 3,
        autoplay:false,
        dots: true,
        smartSpeed:1000,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });


// Window load function
    jQuery(window).on('load', function () {
        (function ($) {
            prealoader ()
        })(jQuery);
    });
})(jQuery);
