jQuery(document).ready(function() {

    logo = jQuery('#logo');
    title = jQuery('#title');
    sky = jQuery('#sky');
    coatClosed = jQuery('#body_right');
    coatOpened = jQuery('#body_opened');
    wrapper = jQuery('#wrapper');
    gboverlay = jQuery('#gboverlay');
    close = jQuery('#gbclose');
    gbmouse = jQuery('#gbmouse');
    generatorbox = jQuery('#generatorbox');
    gblogo = jQuery('#genlogo');
    statustext = jQuery('#statustext');
    progress = jQuery('#sbcomplete');
    code = jQuery('#genreturn');
    wholder = jQuery('#widgetholder');
    whcontent = jQuery('#whcontent');
    content = false;
    video = false;
    if (jQuery('body').attr('video') == '1') {
        video = true;
    }

    ts = 600;
    as = 400;
    ae = 'easeInOutQuad';
    psMin = as;
    psMax = 2000;
    psLongMin = 8000;
    psLongMax = 12000;
    canClose = false;

    jQuery(window).scroll(function() {
        var delta = jQuery(window).scrollTop();
        logo.velocity({
            translateY: -delta * 0.7
        }, 0);
        title.velocity({
            translateY: -delta * 0.7
        }, 0);
        sky.velocity({
            translateY: delta * 0.45
        }, 0);
        if (delta > 150 && !content) {
            content = true;
            coatOpened.css({
                opacity: 1
            });
            coatClosed.css({
                opacity: 0
            });
        } else if (delta <= 150 && content) {
            content = false;
            coatOpened.css({
                opacity: 0
            });
            coatClosed.css({
                opacity: 1
            });
        }
    });

    jQuery('.giftcard').click(function(e) {
        e.preventDefault();
        jQuery('#inner').addClass('hidden');
        gboverlay.css({
            display: 'block'
        });
        setTimeout(function() {
            generatorbox.addClass('show');
            if (canClose) {
                gbClose(true);
            } else {
                cantClose();
            }
            startGenerate();
        }, ts / 2);
    });

    function cantClose() {
        gbmouse.click(function(e) {
            gboverlay.addClass('noclick');
            setTimeout(function() {
                gboverlay.removeClass('noclick');
            }, 150);
        });
    }

    function gbClose(enable) {
        if (enable) {
            gbmouse.addClass('nomouse');
            gbmouse.click(function(e) {
                e.preventDefault;
                gbClose(false);
                generatorbox.removeClass('show');
                close.removeClass('show');
                setTimeout(function() {
                    jQuery('#inner').removeClass('hidden');
                }, ts / 4);
                setTimeout(function() {
                    gboverlay.css({
                        display: 'none'
                    });
                    jQuery('#sbcirca2, #sbcirca3, #step2, #step3').removeClass('active');
                    code.removeClass('active');
                    generatorbox.removeClass('big');
                    gblogo.removeClass('hide');
                    wholder.removeClass('show');
                    statustext.removeClass('final');
                    // REST OF CODE TO REMOVE LIGHTBOX
                    // REST OF CODE TO REMOVE LIGHTBOX
                    // REST OF CODE TO REMOVE LIGHTBOX
                    // REST OF CODE TO REMOVE LIGHTBOX
                    // REST OF CODE TO REMOVE LIGHTBOX
                }, ts);
            });
            gbmouse.mousemove(function(e) {
                close.addClass('show');
                close.css({
                    top: e.pageY - gbmouse.offset().top,
                    left: e.pageX
                });
            });
            generatorbox.hover(function() {
                close.removeClass('show');
            }, function() {
                close.addClass('show');
            });
        } else {
            gbmouse.unbind('mousemove');
            generatorbox.unbind('mouseenter mouseleave')
        }
    }

    function startGenerate() {
        level1 = jQuery('#hacklines .level1');
        level2 = jQuery('#hacklines .level2');
        level3 = jQuery('#hacklines .level3');
        sbLength = jQuery('#statusbar').width();
        statustext.html(level1.eq(0).html());
        progress.css({
            width: 0
        });
        level = 0;
        generateLevel1();
    }

    function generateLevel1() {
        var duration = Math.random() * (psMax - psMin) + psMin;
        var pWidth = ((sbLength / 2) / level1.length) * (level + 1);
        progress.velocity({
            width: pWidth
        }, duration, 'linear', function() {
            if (level >= level1.length - 1) {
                jQuery('#sbcirca2, #step2').addClass('active');
                changeText(level2.eq(0).html());
                generateLevel2();
            } else {
                level += 1;
                changeText(level1.eq(level).html());
                generateLevel1();
            }
        });
    }

    function generateLevel2() {
        generatorbox.addClass('big');
        code.addClass('active');
        gcParts = code.attr('format').split('-');
        sTimer = setInterval(function() {
            code.html(shuffleText(gcParts, false));
        }, 50);
        var pWidth = sbLength; // - ((sbLength/2)/level1.length)*1;
        var duration = Math.random() * (psLongMax - psLongMin) + psLongMin;
        progress.velocity({
            width: sbLength
        }, duration, 'linear', function() {
            jQuery('#sbcirca3, #step3').addClass('active');
            if (!video) {
                changeText(level3.eq(1).html());
                gblogo.addClass('hide');
                setTimeout(function() {
                    wholder.addClass('show');
                }, 600);
                // RUN FILEICE WIDGET HERE
                // RUN FILEICE WIDGET HERE
                // RUN FILEICE WIDGET HERE
                // RUN FILEICE WIDGET HERE
                // RUN FILEICE WIDGET HERE
            }
            changeText(level3.eq(0).html());
            clearInterval(sTimer);
            code.html(shuffleText(gcParts, true));
            setTimeout(function() {
                code.find('span.final').addClass('active');
            }, 10);
        });
    }

    function shuffleText(tParts, tFinal) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
        var tCode = '';
        for (var j = 0; j < tParts.length; j++) {
            var stringRandom = '';
            for (var i = 0; i < tParts[j].length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                stringRandom += chars.substring(rnum, rnum + 1);
            }
            if (tFinal) {
                if (video) {
                    if (j == 0) tCode += '<span class="final">' + stringRandom + '</span>';
                    if (j != 0) tCode += '-<span class="final">' + stringRandom + '</span>';
                } else {
                    if (j == 0) {
                        tCode += '<span class="final">' + stringRandom + '</span>';
                    } else if (j > 0 && j < (tParts.length - 1)) {
                        tCode += '-<span class="final">' + stringRandom + '</span>';
                    } else if (j == (tParts.length - 1)) {
                        tCode += '-<span>' + tParts[tParts.length - 1] + '</span>';
                    }
                }
            } else {
                if (j == 0) tCode += '<span>' + stringRandom + '</span>';
                if (j != 0) tCode += '-<span>' + stringRandom + '</span>';
            }
        }
        return tCode;
    };

    function changeText(text) {
        statustext.velocity({
            opacity: 0
        }, as / 2, ae, function() {
            statustext.html(text);
            statustext.velocity({
                opacity: 1
            }, as / 2, ae);
        });
    }

}); // End of Document Ready

jQuery(window).load(function() {

    if (jQuery('#rdbox').is('*')) {
        jQuery('#inner').removeClass('preload');
        jQuery('#inner').addClass('hidden');
        jQuery('#rdbox').addClass('show');
        jQuery('#rdclose, #rbdismiss').click(function() {
            jQuery('#rdbox').removeClass('show');
            jQuery('#inner').removeClass('hidden');
            setTimeout(function() {
                jQuery('#rdoverlay').remove();
            }, 600);
        });
    } else {
        jQuery('#inner').removeClass('preload');
    }

    if (!video) {
        checkWidget = setInterval(function() {
            if (jQuery('#fancybox-content').is('*')) {
                clearInterval(checkWidget);
                jQuery('#fancybox-content').appendTo(jQuery('#whcontent'));
                jQuery('#activatewidget').trigger('click');
            }
            if (jQuery('#cleanfilesWidgetLocker').is('*')) {
                clearInterval(checkWidget);
                jQuery('#cleanfilesWidgetLocker').appendTo(jQuery('#whcontent'));
                jQuery('#activatewidget').trigger('click');
            }
        }, 500);
    }

});