/*

  Customised FlexSilder controls

*/

var flexSliderClass = document.getElementsByClassName('flexslider');

// Run this only if FlexSlider markup is present
if (flexSliderClass.length > 0) {
    $(window).on('load', function () {

        // Hold onto this in case client wants this functionality reinstated
        /*
        var index = 0, hash = window.location.hash;

        if (hash) {
        index = /\d+/.exec(hash)[0];
        index = (parseInt(index) || 1) - 1;
        }

        $('#slider').flexslider(index);
        */

        $('#carousel').flexslider({
            animation: 'slide',
            controlNav: false,
            smoothHeight: true,
            animationLoop: false,
            slideshow: false,
            itemWidth: 134,
            itemMargin: 13,
            asNavFor: '#slider',
            controlsContainer: $('.custom-controls-container'),
            customDirectionNav: $('.custom-navigation a'),
            useCSS: false
        });

        $('#slider').flexslider({
            animation: 'slide',
            animationLoop: false,
            slideshow: false,
            sync: '#carousel'
        });

    });

}
