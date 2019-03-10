/* masonry init */

$(function () {


    // var justifiedGaleryOptions = {
    //     rowHeight: 300,
    //         lastRow: 'nojustify',
    //     margins: 3
    // };
    //
    // $('#mygallery').justifiedGallery(justifiedGaleryOptions);

    // // run on window.load so we can capture any incoming hashes
    // $(window).load(function(){
    //   // run masonry on start-up to capture all the boxes we'll need
    //   $wall.masonry(masonryOptions);
    //   if ( window.location.hash ) {
    //     // get rid of the '#' from the hash
    //     var possibleFilterClass = window.location.hash.replace('#', '');
    //     // set masonry options animate to false
    //     masonryOptions.animate = false;
    //     // hide boxes that don't match the filter class
    //     $wall.children().not('.'+possibleFilterClass)
    //       .toggleClass('invis').hide();
    //     // run masonry again, this time with the necessary stuff hidden
    //     $wall.masonry(masonryOptions);
    //   }
    // });

    $(window).load(function () {
        if (window.location.hash) {
            var possibleFilterClass = window.location.hash.replace('#', '');
            $(".welcome").hide();
            window.PR.renderPageByTag(possibleFilterClass);
        } else {
            $(".welcome").show();
        }
    });


    $('a.tag').click(function () {
        var
            color = $(this).attr('rel').split(' ')[0],
            filterClass = '.' + color;

        $("body").removeClass();

        $(".welcome").hide();
        window.PR.renderPageByTag(color);

        if(window.PR.portfolio.structure.Projects[color] !== undefined){
            var page = window.PR.portfolio.structure.Projects[color];
            if(page.bodyClass !== undefined){
                $("body").addClass(page.bodyClass);
            }
        }

        // set hash in URL
        window.location.hash = color;
        return false;
    });

    /* @ndre */
    $('a.tag').click(function () {
        $('a.tag').removeClass("selected");
        $(this).addClass("selected");
    });
});


/* fancybox init */

//     $(function(){

//             /*  Categories */

//             $("a[rel=editorial]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true, padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',   width : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true, ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false, titleShow: true, titlePosition: 'outside', transitionIn: 'fade', transitionOut: 'fade', speedIn: 300, speedOut: 300, changeSpeed: 150, changeFade: 150, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + "<br />" + '<span id="fancybox-auto-category">' + (currentIndex + 1) + ' of ' + currentArray.length + ' "Editorial" ' + '</span>' + '</span>'; }
//             });

//             $("a[rel=posters]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true, padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',   width : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true, ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false, titleShow: true, titlePosition: 'outside', transitionIn: 'fade', transitionOut: 'fade', speedIn: 300, speedOut: 300, changeSpeed: 150, changeFade: 150, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + "<br />" + '<span id="fancybox-auto-category">' + (currentIndex + 1) + ' of ' + currentArray.length + ' "Posters" ' + '</span>' + '</span>'; }
//             });

//             $("a[rel=otherthings]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true, padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',   width : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true, ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false, titleShow: true, titlePosition: 'outside', transitionIn: 'fade', transitionOut: 'fade', speedIn: 300, speedOut: 300, changeSpeed: 150, changeFade: 150, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + "<br />" + '<span id="fancybox-auto-category">' + (currentIndex + 1) + ' of ' + currentArray.length + ' "Other things" ' + '</span>' + '</span>'; }
//             });

//             $("a[rel=books]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true, padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',   width : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true, ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false, titleShow: true, titlePosition: 'outside', transitionIn: 'fade', transitionOut: 'fade', speedIn: 300, speedOut: 300, changeSpeed: 150, changeFade: 150, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + "<br />" + '<span id="fancybox-auto-category">' + (currentIndex + 1) + ' of ' + currentArray.length + ' "Books" ' + '</span>' + '</span>'; }
//             });

//             $("a[rel=comics]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true, padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',   width : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true, ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false, titleShow: true, titlePosition: 'outside', transitionIn: 'fade', transitionOut: 'fade', speedIn: 300, speedOut: 300, changeSpeed: 150, changeFade: 150, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + "<br />" + '<span id="fancybox-auto-category">' + (currentIndex + 1) + ' of ' + currentArray.length + ' "Comics" ' + '</span>' + '</span>'; }
//             });

//             $("a[rel=animation]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true, padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',   width : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true, ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false, titleShow: true, titlePosition: 'outside', transitionIn: 'fade', transitionOut: 'fade', speedIn: 300, speedOut: 300, changeSpeed: 150, changeFade: 150, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + "<br />" + '<span id="fancybox-auto-category">' + (currentIndex + 1) + ' of ' + currentArray.length + ' "Animation" ' + '</span>' + '</span>'; }
//             });

//             $("a[rel=things]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true, padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',   width : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true, ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false, titleShow: true, titlePosition: 'outside', transitionIn: 'fade', transitionOut: 'fade', speedIn: 300, speedOut: 300, changeSpeed: 150, changeFade: 150, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + "<br />" + '<span id="fancybox-auto-category">' + (currentIndex + 1) + ' of ' + currentArray.length + ' "Things" ' + '</span>' + '</span>'; }
//             });

//             $("a[rel=info]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true, padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',   width : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true, ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false, titleShow: true, titlePosition: 'outside', transitionIn: 'fade', transitionOut: 'fade', speedIn: 300, speedOut: 300, changeSpeed: 150, changeFade: 150, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (title.length ? '' + title : '') + "<br />" + '<span id="fancybox-auto-category">' + (currentIndex + 1) + ' of ' + currentArray.length + ' "Info" ' + '</span>' + '</span>'; }
//             });


//             /*  iframes */
//             $("#iframe").fancybox({
//                 'type' : 'iframe',
//                 'width' : '95%',
//                 'height' : '80%',
//                 'autoScale' : true,
//                 'transitionIn' : 'none',
//                 'transitionOut' : 'none',
//                 overlayOpacity: 0.01,
//                 overlayColor: '#F2EFEB',
//                 overlayShow: true,
//                 hideOnOverlayClick: true,
//                 titleShow: true, titlePosition: 'over', // 'outside', 'inside' or 'over'
//                 transitionIn: 'linear', transitionOut: 'linear',    // 'elastic', 'fade' or 'none'
//                 speedIn:    350, speedOut: 200, changeSpeed: 100, changeFade:   200, easingIn: 'easeInQuad', easingOut: 'linear', showCloseButton: false
//                 });

//             /* Create gallery from jQuery object collection */
//             $("a.fancybox").attr('rel', 'gallery').fancybox(); // http://fancybox.net/blog

//             $("a[rel=example]").fancybox({
//             overlayOpacity: 0.01, overlayColor: '#F2EFEB', overlayShow: true,
//             padding: 0, margin: 10, opacity: false, modal: false, cyclic: false, scrolling: 'auto',
//             width   : 1024, height: 768, autoScale: true, autoDimensions: true, centerOnScroll: true,
//             ajax:{}, swf:{ wmode: 'transparent' }, hideOnOverlayClick: true, hideOnContentClick: false,
//             titleShow: true, titlePosition: 'outside', // 'outside', 'inside' or 'over'
//             transitionIn: 'fade', transitionOut: 'fade',    // 'elastic', 'fade' or 'none'
//             speedIn: 300, speedOut: 300, changeSpeed: 100, changeFade:  100, easingIn: 'linear', easingOut: 'linear', showCloseButton: false,
//             'titleFormat': function(title, currentArray, currentIndex, currentOpts) { return '<span id="fancybox-title-over">' + (currentIndex + 1) + ' of ' + currentArray.length + ' Example ' + "<br />" + (title.length ? '' + title : '') + '</span>'; }
//             });


//             $("a#video").fancybox({
//                'autoScale': true,
//                'hideOnContentClick': false,
//                'zoomSpeedIn':  100,
//                'zoomSpeedOut': 50,
//                'frameWidth': 640,
//                'frameHeight': 480,
//                'overlayShow': true,
//                'overlayOpacity': 0.75,
//                // 'callbackOnClose': function() { $("#fancy_content").empty();}
//             });


// });


/* document ready */

// $(document).ready(function() {
//     QueryLoader.selectorPreload = "body"; QueryLoader.init();
//     // only #id not class

//     $(QueryLoader.loadAmt).css({
//         position: "relative",
//         top: "20px",
//         left: "25px"
//     });

// });
