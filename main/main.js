/*
	2016-2022 richianv
*/

(function($) {

    skel.breakpoints({
        wide: '(max-width: 1920px)',
        normal: '(max-width: 1680px)',
        narrow: '(max-width: 1280px)',
        narrower: '(max-width: 1000px)',
        mobile: '(max-width: 736px)',
        mobilenarrow: '(max-width: 480px)',
    });

    $(function() {

        var $window = $(window),
            $body = $('body'),
            $header = $('header'),
            $all = $body.add($header);

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 0);
        });

        // Touch mode.
        skel.on('change', function() {

            if (skel.vars.mobile || skel.breakpoint('mobile').active)
                $body.addClass('is-touch');
            else
                $body.removeClass('is-touch');

        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on mobile.
        skel.on('+mobile -mobile', function() {
            $.prioritize(
                '.important\\28 mobile\\29',
                skel.breakpoint('mobile').active
            );
        });

        // CSS polyfills (IE<9).
        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        // Gallery.
        $window.on('load', function() {
            $('.gallery').poptrox({
                baseZIndex: 10001,
                useBodyOverflow: false,
                usePopupEasyClose: false,
                overlayColor: '#1f2328',
                overlayOpacity: 0.65,
                usePopupDefaultStyling: false,
                usePopupCaption: true,
                popupLoaderText: '',
                windowMargin: (skel.breakpoint('mobile').active ? 5 : 50),
                usePopupNav: true
            });
        });

        // Section transitions.
        if (!skel.vars.mobile && skel.canUse('transition')) {

            var on = function() {

                // Generic sections.
                $('.main.style1')
                    .scrollex({
                        mode: 'middle',
                        delay: 100,
                        initialize: function() {
                            $(this).addClass('inactive');
                        },
                        terminate: function() {
                            $(this).removeClass('inactive');
                        },
                        enter: function() {
                            $(this).removeClass('inactive');
                        },
                        leave: function() {
                            $(this).addClass('inactive');
                        }
                    });

                $('.main.style2')
                    .scrollex({
                        mode: 'middle',
                        delay: 100,
                        initialize: function() {
                            $(this).addClass('inactive');
                        },
                        terminate: function() {
                            $(this).removeClass('inactive');
                        },
                        enter: function() {
                            $(this).removeClass('inactive');
                        },
                        leave: function() {
                            $(this).addClass('inactive');
                        }
                    });

                // Work.
                $('#work')
                    .scrollex({
                        top: '40vh',
                        bottom: '30vh',
                        delay: 50,
                        initialize: function() {

                            var t = $(this);

                            t.find('.row.images')
                                .addClass('inactive');

                        },
                        terminate: function() {

                            var t = $(this);

                            t.find('.row.images')
                                .removeClass('inactive');

                        },
                        enter: function() {

                            var t = $(this),
                                rows = t.find('.row.images'),
                                length = rows.length,
                                n = 0;

                            rows.each(function() {
                                var row = $(this);
                                window.setTimeout(function() {
                                    row.removeClass('inactive');
                                }, 100 * (length - n++));
                            });

                        },
                        leave: function(t) {

                            var t = $(this),
                                rows = t.find('.row.images'),
                                length = rows.length,
                                n = 0;

                            rows.each(function() {
                                var row = $(this);
                                window.setTimeout(function() {
                                    row.addClass('inactive');
                                }, 100 * (length - n++));
                            });

                        }
                    });

                // Contact.
                $('#contact')
                    .scrollex({
                        top: '50%',
                        delay: 50,
                        initialize: function() {
                            $(this).addClass('inactive');
                        },
                        terminate: function() {
                            $(this).removeClass('inactive');
                        },
                        enter: function() {
                            $(this).removeClass('inactive');
                        },
                        leave: function() {
                            $(this).addClass('inactive');
                        }
                    });

            };

            var off = function() {

                // Generic sections.
                $('.main.style1')
                    .unscrollex();

                $('.main.style2')
                    .unscrollex();

                // Work.
                $('#work')
                    .unscrollex();

                // Contact.
                $('#contact')
                    .unscrollex();

            };

            skel.on('change', function() {

                if (skel.breakpoint('mobile').active)
                    (off)();
                else
                    (on)();

            });

        }


/* hover*/
$(".hover").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);
        // Events.
        var resizeTimeout, resizeScrollTimeout;

        $window
            .resize(function() {

                // Disable animations/transitions.
                $body.addClass('is-resizing');

                window.clearTimeout(resizeTimeout);

                resizeTimeout = window.setTimeout(function() {

                    // Update scrolly links.
                    $('a[href^=#]').scrolly({
                        speed: 1500,
                        offset: $header.outerHeight() - 1
                    });

                    // Re-enable animations/transitions.
                    window.setTimeout(function() {
                        $body.removeClass('is-resizing');
                        $window.trigger('scroll');
                    }, 0);

                }, 100);

            })
            .load(function() {
                $window.trigger('resize');
            });

    });

})(jQuery);


  /**
   * type effect
   */
var span = document.querySelector("h4 span");
var textArr = span.getAttribute("data-text").split(", "); 
var maxTextIndex = textArr.length; 

var sPerChar = 0.15; 
var sBetweenWord = 1.5;
var textIndex = 0; 

typing(textIndex, textArr[textIndex]); 

function typing(textIndex, text) {
    var charIndex = 0; 
    var maxCharIndex = text.length - 1; 
    
    var typeInterval = setInterval(function () {
        span.innerHTML += text[charIndex]; 
        if (charIndex == maxCharIndex) {
            clearInterval(typeInterval);
            setTimeout(function() { deleting(textIndex, text) }, sBetweenWord * 1000); 
            
        } else {
            charIndex += 1; 
        }
    }, sPerChar * 1000); 
}

function deleting(textIndex, text) {
    var minCharIndex = 0; 
    var charIndex = text.length - 1; 

    var typeInterval = setInterval(function () {
        span.innerHTML = text.substr(0, charIndex); 
        if (charIndex == minCharIndex) {
            clearInterval(typeInterval);
            textIndex + 1 == maxTextIndex ? textIndex = 0 : textIndex += 1; 
            setTimeout(function() { typing(textIndex, textArr[textIndex]) }, sBetweenWord * 1000); 
        } else {
            charIndex -= 1; 
        }
    }, sPerChar * 1000); 
}


const btn = document.getElementById('switch-theme');
localStorage.setItem('theme','light');
btn.addEventListener('click',(e)=>{
     let theme = localStorage.getItem('theme');
     console.log(theme);
     if(theme == 'light' || theme ==''){
          document.documentElement.setAttribute('data-theme','dark');
          localStorage.setItem('theme','dark');
     }
     else {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('theme','light');
     }
})