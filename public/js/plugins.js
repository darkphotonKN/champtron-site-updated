/*!
 * DebouncedResize Function
 */
(function(e) {
    var t = e.event,
        n,
        r;
    n = t.special.debouncedresize = {
        setup: function() {
            e(this).on('resize', n.handler);
        },
        teardown: function() {
            e(this).off('resize', n.handler);
        },
        handler: function(e, i) {
            var s = this,
                o = arguments,
                u = function() {
                    e.type = 'debouncedresize';
                    t.dispatch.apply(s, o);
                };
            if (r) {
                clearTimeout(r);
            }
            i ? u() : (r = setTimeout(u, n.threshold));
        },
        threshold: 150
    };
})(jQuery);

/*
 *	DaisyNav - jQuery plugin 
 *	Handle responsive navigation in good way
 *	Version 1.0.0
 *
 *	http://circlewaves.com/products/freebies/daisynav-responsive-dropdown-navigation/
 *
 *	http://circlewaves.com
 *
 *	Copyright 2013 CircleWaves (support@circlewaves.com)
 *	Under the MIT License
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
(function($, window, document, undefined) {
    $.extend({
        daisyNav: function() {
            $('ul.menu-list li.has-submenu>a').append(
                '<span class="menu-expand"></span>'
            );

            $('.menu-toggle-button').click(function() {
                //if exist data-menu-id - bind for id, else - bind for class
                if ($(this).data('menu-id')) {
                    var data_menu_id = $(this)
                        .data('menu-id')
                        .split(' '); //for multiple menu - split id by space ' '
                    var data_menu_id_count = data_menu_id.length; //IDs count
                    for (var i = 0; i < data_menu_id_count; i++) {
                        //toogle class for each binded menu id
                        var menu_id = data_menu_id[i];
                        if (menu_id) {
                            $('#' + menu_id).toggleClass('show-for-devices');
                        }
                    }
                } else {
                    $('ul.menu-list a').toggleClass('show-for-devices');
                }
                $(this).toggleClass('active');
            });

            $('.menu-list .menu-expand').click(function(e) {
                e.preventDefault();
                $(this)
                    .parent()
                    .next('ul')
                    .toggleClass('show-for-devices');
            });
        }
    });
})(jQuery, window, document);

// System Navigation Cache selectors
var lastId,
    topMenu = $('.menu-list, .slider-caption'),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find('a'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function() {
        var item = $($(this).attr('href'));
        if (item.length) {
            return item;
        }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e) {
    var href = $(this).attr('href'),
        offsetTop = href === '#' ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body')
        .stop()
        .animate(
            {
                scrollTop: offsetTop
            },
            900
        );
    e.preventDefault();
});

// smooth scroll for services page
var lastId2,
    topMenu2 = $('#services-nav'),
    topMenuHeight2 = topMenu2.outerHeight() - 31,
    // All list items
    menuItems2 = topMenu2.find('a'),
    // Anchors corresponding to menu items
    scrollItems2 = menuItems2.map(function() {
        var item2 = $($(this).attr('href'));
        if (item2.length) {
            return item2;
        }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems2.click(function(e) {
    var href2 = $(this).attr('href'),
        offsetTop2 =
            href2 === '#' ? 0 : $(href2).offset().top - topMenuHeight2 + 1;
    $('html, body')
        .stop()
        .animate(
            {
                scrollTop: offsetTop2
            },
            900
        );
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop) return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : '';

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent()
            .removeClass('active')
            .end()
            .filter('[href=#' + id + ']')
            .parent()
            .addClass('active');
    }
});

/*! device.js 0.1.58 */
(function() {
    var a, b, c, d, e, f, g, h, i, j;
    (a = window.device),
        (window.device = {}),
        (c = window.document.documentElement),
        (j = window.navigator.userAgent.toLowerCase()),
        (device.ios = function() {
            return device.iphone() || device.ipod() || device.ipad();
        }),
        (device.iphone = function() {
            return d('iphone');
        }),
        (device.ipod = function() {
            return d('ipod');
        }),
        (device.ipad = function() {
            return d('ipad');
        }),
        (device.android = function() {
            return d('android');
        }),
        (device.androidPhone = function() {
            return device.android() && d('mobile');
        }),
        (device.androidTablet = function() {
            return device.android() && !d('mobile');
        }),
        (device.blackberry = function() {
            return d('blackberry') || d('bb10') || d('rim');
        }),
        (device.blackberryPhone = function() {
            return device.blackberry() && !d('tablet');
        }),
        (device.blackberryTablet = function() {
            return device.blackberry() && d('tablet');
        }),
        (device.windows = function() {
            return d('windows');
        }),
        (device.windowsPhone = function() {
            return device.windows() && d('phone');
        }),
        (device.windowsTablet = function() {
            return device.windows() && d('touch');
        }),
        (device.fxos = function() {
            return d('(mobile; rv:') || d('(tablet; rv:');
        }),
        (device.fxosPhone = function() {
            return device.fxos() && d('mobile');
        }),
        (device.fxosTablet = function() {
            return device.fxos() && d('tablet');
        }),
        (device.mobile = function() {
            return (
                device.androidPhone() ||
                device.iphone() ||
                device.ipod() ||
                device.windowsPhone() ||
                device.blackberryPhone() ||
                device.fxosPhone()
            );
        }),
        (device.tablet = function() {
            return (
                device.ipad() ||
                device.androidTablet() ||
                device.blackberryTablet() ||
                device.windowsTablet() ||
                device.fxosTablet()
            );
        }),
        (device.portrait = function() {
            return 90 !== Math.abs(window.orientation);
        }),
        (device.landscape = function() {
            return 90 === Math.abs(window.orientation);
        }),
        (device.noConflict = function() {
            return (window.device = a), this;
        }),
        (d = function(a) {
            return -1 !== j.indexOf(a);
        }),
        (f = function(a) {
            var b;
            return (b = new RegExp(a, 'i')), c.className.match(b);
        }),
        (b = function(a) {
            return f(a) ? void 0 : (c.className += ' ' + a);
        }),
        (h = function(a) {
            return f(a) ? (c.className = c.className.replace(a, '')) : void 0;
        }),
        device.ios()
            ? device.ipad()
                ? b('ios ipad tablet')
                : device.iphone()
                    ? b('ios iphone mobile')
                    : device.ipod() && b('ios ipod mobile')
            : device.android()
                ? device.androidTablet()
                    ? b('android tablet')
                    : b('android mobile')
                : device.blackberry()
                    ? device.blackberryTablet()
                        ? b('blackberry tablet')
                        : b('blackberry mobile')
                    : device.windows()
                        ? device.windowsTablet()
                            ? b('windows tablet')
                            : device.windowsPhone()
                                ? b('windows mobile')
                                : b('desktop')
                        : device.fxos()
                            ? device.fxosTablet()
                                ? b('fxos tablet')
                                : b('fxos mobile')
                            : b('desktop'),
        (e = function() {
            return device.landscape()
                ? (h('portrait'), b('landscape'))
                : (h('landscape'), b('portrait'));
        }),
        (i = 'onorientationchange' in window),
        (g = i ? 'orientationchange' : 'resize'),
        window.addEventListener
            ? window.addEventListener(g, e, !1)
            : window.attachEvent
                ? window.attachEvent(g, e)
                : (window[g] = e),
        e();
}.call(this));

/*
 *  jQuery OwlCarousel v1.3.2
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */

if (typeof Object.create !== 'function') {
    Object.create = function(e) {
        function t() {}
        t.prototype = e;
        return new t();
    };
}
(function(e, t, n) {
    var r = {
        init: function(t, n) {
            var r = this;
            r.$elem = e(n);
            r.options = e.extend(
                {},
                e.fn.owlCarousel.options,
                r.$elem.data(),
                t
            );
            r.userOptions = t;
            r.loadContent();
        },
        loadContent: function() {
            function r(e) {
                var n,
                    r = '';
                if (typeof t.options.jsonSuccess === 'function') {
                    t.options.jsonSuccess.apply(this, [e]);
                } else {
                    for (n in e.owl) {
                        if (e.owl.hasOwnProperty(n)) {
                            r += e.owl[n].item;
                        }
                    }
                    t.$elem.html(r);
                }
                t.logIn();
            }
            var t = this,
                n;
            if (typeof t.options.beforeInit === 'function') {
                t.options.beforeInit.apply(this, [t.$elem]);
            }
            if (typeof t.options.jsonPath === 'string') {
                n = t.options.jsonPath;
                e.getJSON(n, r);
            } else {
                t.logIn();
            }
        },
        logIn: function() {
            var e = this;
            e.$elem.data({
                'owl-originalStyles': e.$elem.attr('style'),
                'owl-originalClasses': e.$elem.attr('class')
            });
            e.$elem.css({ opacity: 0 });
            e.orignalItems = e.options.items;
            e.checkBrowser();
            e.wrapperWidth = 0;
            e.checkVisible = null;
            e.setVars();
        },
        setVars: function() {
            var e = this;
            if (e.$elem.children().length === 0) {
                return false;
            }
            e.baseClass();
            e.eventTypes();
            e.$userItems = e.$elem.children();
            e.itemsAmount = e.$userItems.length;
            e.wrapItems();
            e.$owlItems = e.$elem.find('.owl-item');
            e.$owlWrapper = e.$elem.find('.owl-wrapper');
            e.playDirection = 'next';
            e.prevItem = 0;
            e.prevArr = [0];
            e.currentItem = 0;
            e.customEvents();
            e.onStartup();
        },
        onStartup: function() {
            var e = this;
            e.updateItems();
            e.calculateAll();
            e.buildControls();
            e.updateControls();
            e.response();
            e.moveEvents();
            e.stopOnHover();
            e.owlStatus();
            if (e.options.transitionStyle !== false) {
                e.transitionTypes(e.options.transitionStyle);
            }
            if (e.options.autoPlay === true) {
                e.options.autoPlay = 5e3;
            }
            e.play();
            e.$elem.find('.owl-wrapper').css('display', 'block');
            if (!e.$elem.is(':visible')) {
                e.watchVisibility();
            } else {
                e.$elem.css('opacity', 1);
            }
            e.onstartup = false;
            e.eachMoveUpdate();
            if (typeof e.options.afterInit === 'function') {
                e.options.afterInit.apply(this, [e.$elem]);
            }
        },
        eachMoveUpdate: function() {
            var e = this;
            if (e.options.lazyLoad === true) {
                e.lazyLoad();
            }
            if (e.options.autoHeight === true) {
                e.autoHeight();
            }
            e.onVisibleItems();
            if (typeof e.options.afterAction === 'function') {
                e.options.afterAction.apply(this, [e.$elem]);
            }
        },
        updateVars: function() {
            var e = this;
            if (typeof e.options.beforeUpdate === 'function') {
                e.options.beforeUpdate.apply(this, [e.$elem]);
            }
            e.watchVisibility();
            e.updateItems();
            e.calculateAll();
            e.updatePosition();
            e.updateControls();
            e.eachMoveUpdate();
            if (typeof e.options.afterUpdate === 'function') {
                e.options.afterUpdate.apply(this, [e.$elem]);
            }
        },
        reload: function() {
            var e = this;
            t.setTimeout(function() {
                e.updateVars();
            }, 0);
        },
        watchVisibility: function() {
            var e = this;
            if (e.$elem.is(':visible') === false) {
                e.$elem.css({ opacity: 0 });
                t.clearInterval(e.autoPlayInterval);
                t.clearInterval(e.checkVisible);
            } else {
                return false;
            }
            e.checkVisible = t.setInterval(function() {
                if (e.$elem.is(':visible')) {
                    e.reload();
                    e.$elem.animate({ opacity: 1 }, 200);
                    t.clearInterval(e.checkVisible);
                }
            }, 500);
        },
        wrapItems: function() {
            var e = this;
            e.$userItems
                .wrapAll('<div class="owl-wrapper">')
                .wrap('<div class="owl-item"></div>');
            e.$elem
                .find('.owl-wrapper')
                .wrap('<div class="owl-wrapper-outer">');
            e.wrapperOuter = e.$elem.find('.owl-wrapper-outer');
            e.$elem.css('display', 'block');
        },
        baseClass: function() {
            var e = this,
                t = e.$elem.hasClass(e.options.baseClass),
                n = e.$elem.hasClass(e.options.theme);
            if (!t) {
                e.$elem.addClass(e.options.baseClass);
            }
            if (!n) {
                e.$elem.addClass(e.options.theme);
            }
        },
        updateItems: function() {
            var t = this,
                n,
                r;
            if (t.options.responsive === false) {
                return false;
            }
            if (t.options.singleItem === true) {
                t.options.items = t.orignalItems = 1;
                t.options.itemsCustom = false;
                t.options.itemsDesktop = false;
                t.options.itemsDesktopSmall = false;
                t.options.itemsTablet = false;
                t.options.itemsTabletSmall = false;
                t.options.itemsMobile = false;
                return false;
            }
            n = e(t.options.responsiveBaseWidth).width();
            if (n > (t.options.itemsDesktop[0] || t.orignalItems)) {
                t.options.items = t.orignalItems;
            }
            if (t.options.itemsCustom !== false) {
                t.options.itemsCustom.sort(function(e, t) {
                    return e[0] - t[0];
                });
                for (r = 0; r < t.options.itemsCustom.length; r += 1) {
                    if (t.options.itemsCustom[r][0] <= n) {
                        t.options.items = t.options.itemsCustom[r][1];
                    }
                }
            } else {
                if (
                    n <= t.options.itemsDesktop[0] &&
                    t.options.itemsDesktop !== false
                ) {
                    t.options.items = t.options.itemsDesktop[1];
                }
                if (
                    n <= t.options.itemsDesktopSmall[0] &&
                    t.options.itemsDesktopSmall !== false
                ) {
                    t.options.items = t.options.itemsDesktopSmall[1];
                }
                if (
                    n <= t.options.itemsTablet[0] &&
                    t.options.itemsTablet !== false
                ) {
                    t.options.items = t.options.itemsTablet[1];
                }
                if (
                    n <= t.options.itemsTabletSmall[0] &&
                    t.options.itemsTabletSmall !== false
                ) {
                    t.options.items = t.options.itemsTabletSmall[1];
                }
                if (
                    n <= t.options.itemsMobile[0] &&
                    t.options.itemsMobile !== false
                ) {
                    t.options.items = t.options.itemsMobile[1];
                }
            }
            if (
                t.options.items > t.itemsAmount &&
                t.options.itemsScaleUp === true
            ) {
                t.options.items = t.itemsAmount;
            }
        },
        response: function() {
            var n = this,
                r,
                i;
            if (n.options.responsive !== true) {
                return false;
            }
            i = e(t).width();
            n.resizer = function() {
                if (e(t).width() !== i) {
                    if (n.options.autoPlay !== false) {
                        t.clearInterval(n.autoPlayInterval);
                    }
                    t.clearTimeout(r);
                    r = t.setTimeout(function() {
                        i = e(t).width();
                        n.updateVars();
                    }, n.options.responsiveRefreshRate);
                }
            };
            e(t).resize(n.resizer);
        },
        updatePosition: function() {
            var e = this;
            e.jumpTo(e.currentItem);
            if (e.options.autoPlay !== false) {
                e.checkAp();
            }
        },
        appendItemsSizes: function() {
            var t = this,
                n = 0,
                r = t.itemsAmount - t.options.items;
            t.$owlItems.each(function(i) {
                var s = e(this);
                s.css({ width: t.itemWidth }).data('owl-item', Number(i));
                if (i % t.options.items === 0 || i === r) {
                    if (!(i > r)) {
                        n += 1;
                    }
                }
                s.data('owl-roundPages', n);
            });
        },
        appendWrapperSizes: function() {
            var e = this,
                t = e.$owlItems.length * e.itemWidth;
            e.$owlWrapper.css({ width: t * 2, left: 0 });
            e.appendItemsSizes();
        },
        calculateAll: function() {
            var e = this;
            e.calculateWidth();
            e.appendWrapperSizes();
            e.loops();
            e.max();
        },
        calculateWidth: function() {
            var e = this;
            e.itemWidth = Math.round(e.$elem.width() / e.options.items);
        },
        max: function() {
            var e = this,
                t =
                    (e.itemsAmount * e.itemWidth -
                        e.options.items * e.itemWidth) *
                    -1;
            if (e.options.items > e.itemsAmount) {
                e.maximumItem = 0;
                t = 0;
                e.maximumPixels = 0;
            } else {
                e.maximumItem = e.itemsAmount - e.options.items;
                e.maximumPixels = t;
            }
            return t;
        },
        min: function() {
            return 0;
        },
        loops: function() {
            var t = this,
                n = 0,
                r = 0,
                i,
                s,
                o;
            t.positionsInArray = [0];
            t.pagesInArray = [];
            for (i = 0; i < t.itemsAmount; i += 1) {
                r += t.itemWidth;
                t.positionsInArray.push(-r);
                if (t.options.scrollPerPage === true) {
                    s = e(t.$owlItems[i]);
                    o = s.data('owl-roundPages');
                    if (o !== n) {
                        t.pagesInArray[n] = t.positionsInArray[i];
                        n = o;
                    }
                }
            }
        },
        buildControls: function() {
            var t = this;
            if (
                t.options.navigation === true ||
                t.options.pagination === true
            ) {
                t.owlControls = e('<div class="owl-controls"/>')
                    .toggleClass('clickable', !t.browser.isTouch)
                    .appendTo(t.$elem);
            }
            if (t.options.pagination === true) {
                t.buildPagination();
            }
            if (t.options.navigation === true) {
                t.buildButtons();
            }
        },
        buildButtons: function() {
            var t = this,
                n = e('<div class="owl-buttons"/>');
            t.owlControls.append(n);
            t.buttonPrev = e('<div/>', {
                class: 'owl-prev',
                html: t.options.navigationText[0] || ''
            });
            t.buttonNext = e('<div/>', {
                class: 'owl-next',
                html: t.options.navigationText[1] || ''
            });
            n.append(t.buttonPrev).append(t.buttonNext);
            n.on(
                'touchstart.owlControls mousedown.owlControls',
                'div[class^="owl"]',
                function(e) {
                    e.preventDefault();
                }
            );
            n.on(
                'touchend.owlControls mouseup.owlControls',
                'div[class^="owl"]',
                function(n) {
                    n.preventDefault();
                    if (e(this).hasClass('owl-next')) {
                        t.next();
                    } else {
                        t.prev();
                    }
                }
            );
        },
        buildPagination: function() {
            var t = this;
            t.paginationWrapper = e('<div class="owl-pagination"/>');
            t.owlControls.append(t.paginationWrapper);
            t.paginationWrapper.on(
                'touchend.owlControls mouseup.owlControls',
                '.owl-page',
                function(n) {
                    n.preventDefault();
                    if (Number(e(this).data('owl-page')) !== t.currentItem) {
                        t.goTo(Number(e(this).data('owl-page')), true);
                    }
                }
            );
        },
        updatePagination: function() {
            var t = this,
                n,
                r,
                i,
                s,
                o,
                u;
            if (t.options.pagination === false) {
                return false;
            }
            t.paginationWrapper.html('');
            n = 0;
            r = t.itemsAmount - (t.itemsAmount % t.options.items);
            for (s = 0; s < t.itemsAmount; s += 1) {
                if (s % t.options.items === 0) {
                    n += 1;
                    if (r === s) {
                        i = t.itemsAmount - t.options.items;
                    }
                    o = e('<div/>', { class: 'owl-page' });
                    u = e('<span></span>', {
                        text: t.options.paginationNumbers === true ? n : '',
                        class:
                            t.options.paginationNumbers === true
                                ? 'owl-numbers'
                                : ''
                    });
                    o.append(u);
                    o.data('owl-page', r === s ? i : s);
                    o.data('owl-roundPages', n);
                    t.paginationWrapper.append(o);
                }
            }
            t.checkPagination();
        },
        checkPagination: function() {
            var t = this;
            if (t.options.pagination === false) {
                return false;
            }
            t.paginationWrapper.find('.owl-page').each(function() {
                if (
                    e(this).data('owl-roundPages') ===
                    e(t.$owlItems[t.currentItem]).data('owl-roundPages')
                ) {
                    t.paginationWrapper.find('.owl-page').removeClass('active');
                    e(this).addClass('active');
                }
            });
        },
        checkNavigation: function() {
            var e = this;
            if (e.options.navigation === false) {
                return false;
            }
            if (e.options.rewindNav === false) {
                if (e.currentItem === 0 && e.maximumItem === 0) {
                    e.buttonPrev.addClass('disabled');
                    e.buttonNext.addClass('disabled');
                } else if (e.currentItem === 0 && e.maximumItem !== 0) {
                    e.buttonPrev.addClass('disabled');
                    e.buttonNext.removeClass('disabled');
                } else if (e.currentItem === e.maximumItem) {
                    e.buttonPrev.removeClass('disabled');
                    e.buttonNext.addClass('disabled');
                } else if (
                    e.currentItem !== 0 &&
                    e.currentItem !== e.maximumItem
                ) {
                    e.buttonPrev.removeClass('disabled');
                    e.buttonNext.removeClass('disabled');
                }
            }
        },
        updateControls: function() {
            var e = this;
            e.updatePagination();
            e.checkNavigation();
            if (e.owlControls) {
                if (e.options.items >= e.itemsAmount) {
                    e.owlControls.hide();
                } else {
                    e.owlControls.show();
                }
            }
        },
        destroyControls: function() {
            var e = this;
            if (e.owlControls) {
                e.owlControls.remove();
            }
        },
        next: function(e) {
            var t = this;
            if (t.isTransition) {
                return false;
            }
            t.currentItem +=
                t.options.scrollPerPage === true ? t.options.items : 1;
            if (
                t.currentItem >
                t.maximumItem +
                    (t.options.scrollPerPage === true ? t.options.items - 1 : 0)
            ) {
                if (t.options.rewindNav === true) {
                    t.currentItem = 0;
                    e = 'rewind';
                } else {
                    t.currentItem = t.maximumItem;
                    return false;
                }
            }
            t.goTo(t.currentItem, e);
        },
        prev: function(e) {
            var t = this;
            if (t.isTransition) {
                return false;
            }
            if (
                t.options.scrollPerPage === true &&
                t.currentItem > 0 &&
                t.currentItem < t.options.items
            ) {
                t.currentItem = 0;
            } else {
                t.currentItem -=
                    t.options.scrollPerPage === true ? t.options.items : 1;
            }
            if (t.currentItem < 0) {
                if (t.options.rewindNav === true) {
                    t.currentItem = t.maximumItem;
                    e = 'rewind';
                } else {
                    t.currentItem = 0;
                    return false;
                }
            }
            t.goTo(t.currentItem, e);
        },
        goTo: function(e, n, r) {
            var i = this,
                s;
            if (i.isTransition) {
                return false;
            }
            if (typeof i.options.beforeMove === 'function') {
                i.options.beforeMove.apply(this, [i.$elem]);
            }
            if (e >= i.maximumItem) {
                e = i.maximumItem;
            } else if (e <= 0) {
                e = 0;
            }
            i.currentItem = i.owl.currentItem = e;
            if (
                i.options.transitionStyle !== false &&
                r !== 'drag' &&
                i.options.items === 1 &&
                i.browser.support3d === true
            ) {
                i.swapSpeed(0);
                if (i.browser.support3d === true) {
                    i.transition3d(i.positionsInArray[e]);
                } else {
                    i.css2slide(i.positionsInArray[e], 1);
                }
                i.afterGo();
                i.singleItemTransition();
                return false;
            }
            s = i.positionsInArray[e];
            if (i.browser.support3d === true) {
                i.isCss3Finish = false;
                if (n === true) {
                    i.swapSpeed('paginationSpeed');
                    t.setTimeout(function() {
                        i.isCss3Finish = true;
                    }, i.options.paginationSpeed);
                } else if (n === 'rewind') {
                    i.swapSpeed(i.options.rewindSpeed);
                    t.setTimeout(function() {
                        i.isCss3Finish = true;
                    }, i.options.rewindSpeed);
                } else {
                    i.swapSpeed('slideSpeed');
                    t.setTimeout(function() {
                        i.isCss3Finish = true;
                    }, i.options.slideSpeed);
                }
                i.transition3d(s);
            } else {
                if (n === true) {
                    i.css2slide(s, i.options.paginationSpeed);
                } else if (n === 'rewind') {
                    i.css2slide(s, i.options.rewindSpeed);
                } else {
                    i.css2slide(s, i.options.slideSpeed);
                }
            }
            i.afterGo();
        },
        jumpTo: function(e) {
            var t = this;
            if (typeof t.options.beforeMove === 'function') {
                t.options.beforeMove.apply(this, [t.$elem]);
            }
            if (e >= t.maximumItem || e === -1) {
                e = t.maximumItem;
            } else if (e <= 0) {
                e = 0;
            }
            t.swapSpeed(0);
            if (t.browser.support3d === true) {
                t.transition3d(t.positionsInArray[e]);
            } else {
                t.css2slide(t.positionsInArray[e], 1);
            }
            t.currentItem = t.owl.currentItem = e;
            t.afterGo();
        },
        afterGo: function() {
            var e = this;
            e.prevArr.push(e.currentItem);
            e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2];
            e.prevArr.shift(0);
            if (e.prevItem !== e.currentItem) {
                e.checkPagination();
                e.checkNavigation();
                e.eachMoveUpdate();
                if (e.options.autoPlay !== false) {
                    e.checkAp();
                }
            }
            if (
                typeof e.options.afterMove === 'function' &&
                e.prevItem !== e.currentItem
            ) {
                e.options.afterMove.apply(this, [e.$elem]);
            }
        },
        stop: function() {
            var e = this;
            e.apStatus = 'stop';
            t.clearInterval(e.autoPlayInterval);
        },
        checkAp: function() {
            var e = this;
            if (e.apStatus !== 'stop') {
                e.play();
            }
        },
        play: function() {
            var e = this;
            e.apStatus = 'play';
            if (e.options.autoPlay === false) {
                return false;
            }
            t.clearInterval(e.autoPlayInterval);
            e.autoPlayInterval = t.setInterval(function() {
                e.next(true);
            }, e.options.autoPlay);
        },
        swapSpeed: function(e) {
            var t = this;
            if (e === 'slideSpeed') {
                t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed));
            } else if (e === 'paginationSpeed') {
                t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed));
            } else if (typeof e !== 'string') {
                t.$owlWrapper.css(t.addCssSpeed(e));
            }
        },
        addCssSpeed: function(e) {
            return {
                '-webkit-transition': 'all ' + e + 'ms ease',
                '-moz-transition': 'all ' + e + 'ms ease',
                '-o-transition': 'all ' + e + 'ms ease',
                transition: 'all ' + e + 'ms ease'
            };
        },
        removeTransition: function() {
            return {
                '-webkit-transition': '',
                '-moz-transition': '',
                '-o-transition': '',
                transition: ''
            };
        },
        doTranslate: function(e) {
            return {
                '-webkit-transform': 'translate3d(' + e + 'px, 0px, 0px)',
                '-moz-transform': 'translate3d(' + e + 'px, 0px, 0px)',
                '-o-transform': 'translate3d(' + e + 'px, 0px, 0px)',
                '-ms-transform': 'translate3d(' + e + 'px, 0px, 0px)',
                transform: 'translate3d(' + e + 'px, 0px,0px)'
            };
        },
        transition3d: function(e) {
            var t = this;
            t.$owlWrapper.css(t.doTranslate(e));
        },
        css2move: function(e) {
            var t = this;
            t.$owlWrapper.css({ left: e });
        },
        css2slide: function(e, t) {
            var n = this;
            n.isCssFinish = false;
            n.$owlWrapper.stop(true, true).animate(
                { left: e },
                {
                    duration: t || n.options.slideSpeed,
                    complete: function() {
                        n.isCssFinish = true;
                    }
                }
            );
        },
        checkBrowser: function() {
            var e = this,
                r = 'translate3d(0px, 0px, 0px)',
                i = n.createElement('div'),
                s,
                o,
                u,
                a;
            i.style.cssText =
                '  -moz-transform:' +
                r +
                '; -ms-transform:' +
                r +
                '; -o-transform:' +
                r +
                '; -webkit-transform:' +
                r +
                '; transform:' +
                r;
            s = /translate3d\(0px, 0px, 0px\)/g;
            o = i.style.cssText.match(s);
            u = o !== null && o.length >= 1 && o.length <= 2;
            a = 'ontouchstart' in t || t.navigator.msMaxTouchPoints;
            e.browser = { support3d: u, isTouch: a };
        },
        moveEvents: function() {
            var e = this;
            if (
                e.options.mouseDrag !== false ||
                e.options.touchDrag !== false
            ) {
                e.gestures();
                e.disabledEvents();
            }
        },
        eventTypes: function() {
            var e = this,
                t = ['s', 'e', 'x'];
            e.ev_types = {};
            if (e.options.mouseDrag === true && e.options.touchDrag === true) {
                t = [
                    'touchstart.owl mousedown.owl',
                    'touchmove.owl mousemove.owl',
                    'touchend.owl touchcancel.owl mouseup.owl'
                ];
            } else if (
                e.options.mouseDrag === false &&
                e.options.touchDrag === true
            ) {
                t = [
                    'touchstart.owl',
                    'touchmove.owl',
                    'touchend.owl touchcancel.owl'
                ];
            } else if (
                e.options.mouseDrag === true &&
                e.options.touchDrag === false
            ) {
                t = ['mousedown.owl', 'mousemove.owl', 'mouseup.owl'];
            }
            e.ev_types.start = t[0];
            e.ev_types.move = t[1];
            e.ev_types.end = t[2];
        },
        disabledEvents: function() {
            var t = this;
            t.$elem.on('dragstart.owl', function(e) {
                e.preventDefault();
            });
            t.$elem.on('mousedown.disableTextSelect', function(t) {
                return e(t.target).is('input, textarea, select, option');
            });
        },
        gestures: function() {
            function s(e) {
                if (e.touches !== undefined) {
                    return { x: e.touches[0].pageX, y: e.touches[0].pageY };
                }
                if (e.touches === undefined) {
                    if (e.pageX !== undefined) {
                        return { x: e.pageX, y: e.pageY };
                    }
                    if (e.pageX === undefined) {
                        return { x: e.clientX, y: e.clientY };
                    }
                }
            }
            function o(t) {
                if (t === 'on') {
                    e(n).on(r.ev_types.move, a);
                    e(n).on(r.ev_types.end, f);
                } else if (t === 'off') {
                    e(n).off(r.ev_types.move);
                    e(n).off(r.ev_types.end);
                }
            }
            function u(n) {
                var u = n.originalEvent || n || t.event,
                    a;
                if (u.which === 3) {
                    return false;
                }
                if (r.itemsAmount <= r.options.items) {
                    return;
                }
                if (
                    r.isCssFinish === false &&
                    !r.options.dragBeforeAnimFinish
                ) {
                    return false;
                }
                if (
                    r.isCss3Finish === false &&
                    !r.options.dragBeforeAnimFinish
                ) {
                    return false;
                }
                if (r.options.autoPlay !== false) {
                    t.clearInterval(r.autoPlayInterval);
                }
                if (
                    r.browser.isTouch !== true &&
                    !r.$owlWrapper.hasClass('grabbing')
                ) {
                    r.$owlWrapper.addClass('grabbing');
                }
                r.newPosX = 0;
                r.newRelativeX = 0;
                e(this).css(r.removeTransition());
                a = e(this).position();
                i.relativePos = a.left;
                i.offsetX = s(u).x - a.left;
                i.offsetY = s(u).y - a.top;
                o('on');
                i.sliding = false;
                i.targetElement = u.target || u.srcElement;
            }
            function a(o) {
                var u = o.originalEvent || o || t.event,
                    a,
                    f;
                r.newPosX = s(u).x - i.offsetX;
                r.newPosY = s(u).y - i.offsetY;
                r.newRelativeX = r.newPosX - i.relativePos;
                if (
                    typeof r.options.startDragging === 'function' &&
                    i.dragging !== true &&
                    r.newRelativeX !== 0
                ) {
                    i.dragging = true;
                    r.options.startDragging.apply(r, [r.$elem]);
                }
                if (
                    (r.newRelativeX > 8 || r.newRelativeX < -8) &&
                    r.browser.isTouch === true
                ) {
                    if (u.preventDefault !== undefined) {
                        u.preventDefault();
                    } else {
                        u.returnValue = false;
                    }
                    i.sliding = true;
                }
                if (
                    (r.newPosY > 10 || r.newPosY < -10) &&
                    i.sliding === false
                ) {
                    e(n).off('touchmove.owl');
                }
                a = function() {
                    return r.newRelativeX / 5;
                };
                f = function() {
                    return r.maximumPixels + r.newRelativeX / 5;
                };
                r.newPosX = Math.max(Math.min(r.newPosX, a()), f());
                if (r.browser.support3d === true) {
                    r.transition3d(r.newPosX);
                } else {
                    r.css2move(r.newPosX);
                }
            }
            function f(n) {
                var s = n.originalEvent || n || t.event,
                    u,
                    a,
                    f;
                s.target = s.target || s.srcElement;
                i.dragging = false;
                if (r.browser.isTouch !== true) {
                    r.$owlWrapper.removeClass('grabbing');
                }
                if (r.newRelativeX < 0) {
                    r.dragDirection = r.owl.dragDirection = 'left';
                } else {
                    r.dragDirection = r.owl.dragDirection = 'right';
                }
                if (r.newRelativeX !== 0) {
                    u = r.getNewPosition();
                    r.goTo(u, false, 'drag');
                    if (
                        i.targetElement === s.target &&
                        r.browser.isTouch !== true
                    ) {
                        e(s.target).on('click.disable', function(t) {
                            t.stopImmediatePropagation();
                            t.stopPropagation();
                            t.preventDefault();
                            e(t.target).off('click.disable');
                        });
                        a = e._data(s.target, 'events').click;
                        f = a.pop();
                        a.splice(0, 0, f);
                    }
                }
                o('off');
            }
            var r = this,
                i = {
                    offsetX: 0,
                    offsetY: 0,
                    baseElWidth: 0,
                    relativePos: 0,
                    position: null,
                    minSwipe: null,
                    maxSwipe: null,
                    sliding: null,
                    dargging: null,
                    targetElement: null
                };
            r.isCssFinish = true;
            r.$elem.on(r.ev_types.start, '.owl-wrapper', u);
        },
        getNewPosition: function() {
            var e = this,
                t = e.closestItem();
            if (t > e.maximumItem) {
                e.currentItem = e.maximumItem;
                t = e.maximumItem;
            } else if (e.newPosX >= 0) {
                t = 0;
                e.currentItem = 0;
            }
            return t;
        },
        closestItem: function() {
            var t = this,
                n =
                    t.options.scrollPerPage === true
                        ? t.pagesInArray
                        : t.positionsInArray,
                r = t.newPosX,
                i = null;
            e.each(n, function(s, o) {
                if (
                    r - t.itemWidth / 20 > n[s + 1] &&
                    r - t.itemWidth / 20 < o &&
                    t.moveDirection() === 'left'
                ) {
                    i = o;
                    if (t.options.scrollPerPage === true) {
                        t.currentItem = e.inArray(i, t.positionsInArray);
                    } else {
                        t.currentItem = s;
                    }
                } else if (
                    r + t.itemWidth / 20 < o &&
                    r + t.itemWidth / 20 > (n[s + 1] || n[s] - t.itemWidth) &&
                    t.moveDirection() === 'right'
                ) {
                    if (t.options.scrollPerPage === true) {
                        i = n[s + 1] || n[n.length - 1];
                        t.currentItem = e.inArray(i, t.positionsInArray);
                    } else {
                        i = n[s + 1];
                        t.currentItem = s + 1;
                    }
                }
            });
            return t.currentItem;
        },
        moveDirection: function() {
            var e = this,
                t;
            if (e.newRelativeX < 0) {
                t = 'right';
                e.playDirection = 'next';
            } else {
                t = 'left';
                e.playDirection = 'prev';
            }
            return t;
        },
        customEvents: function() {
            var e = this;
            e.$elem.on('owl.next', function() {
                e.next();
            });
            e.$elem.on('owl.prev', function() {
                e.prev();
            });
            e.$elem.on('owl.play', function(t, n) {
                e.options.autoPlay = n;
                e.play();
                e.hoverStatus = 'play';
            });
            e.$elem.on('owl.stop', function() {
                e.stop();
                e.hoverStatus = 'stop';
            });
            e.$elem.on('owl.goTo', function(t, n) {
                e.goTo(n);
            });
            e.$elem.on('owl.jumpTo', function(t, n) {
                e.jumpTo(n);
            });
        },
        stopOnHover: function() {
            var e = this;
            if (
                e.options.stopOnHover === true &&
                e.browser.isTouch !== true &&
                e.options.autoPlay !== false
            ) {
                e.$elem.on('mouseover', function() {
                    e.stop();
                });
                e.$elem.on('mouseout', function() {
                    if (e.hoverStatus !== 'stop') {
                        e.play();
                    }
                });
            }
        },
        lazyLoad: function() {
            var t = this,
                n,
                r,
                i,
                s,
                o;
            if (t.options.lazyLoad === false) {
                return false;
            }
            for (n = 0; n < t.itemsAmount; n += 1) {
                r = e(t.$owlItems[n]);
                if (r.data('owl-loaded') === 'loaded') {
                    continue;
                }
                i = r.data('owl-item');
                s = r.find('.lazyOwl');
                if (typeof s.data('src') !== 'string') {
                    r.data('owl-loaded', 'loaded');
                    continue;
                }
                if (r.data('owl-loaded') === undefined) {
                    s.hide();
                    r.addClass('loading').data('owl-loaded', 'checked');
                }
                if (t.options.lazyFollow === true) {
                    o = i >= t.currentItem;
                } else {
                    o = true;
                }
                if (o && i < t.currentItem + t.options.items && s.length) {
                    s.each(function() {
                        t.lazyPreload(r, e(this));
                    });
                }
            }
        },
        lazyPreload: function(e, n) {
            function o() {
                e.data('owl-loaded', 'loaded').removeClass('loading');
                n.removeAttr('data-src');
                if (r.options.lazyEffect === 'fade') {
                    n.fadeIn(400);
                } else {
                    n.show();
                }
                if (typeof r.options.afterLazyLoad === 'function') {
                    r.options.afterLazyLoad.apply(this, [r.$elem]);
                }
            }
            function u() {
                i += 1;
                if (r.completeImg(n.get(0)) || s === true) {
                    o();
                } else if (i <= 100) {
                    t.setTimeout(u, 100);
                } else {
                    o();
                }
            }
            var r = this,
                i = 0,
                s;
            if (n.prop('tagName') === 'DIV') {
                n.css('background-image', 'url(' + n.data('src') + ')');
                s = true;
            } else {
                n[0].src = n.data('src');
            }
            u();
        },
        autoHeight: function() {
            function s() {
                var r = e(n.$owlItems[n.currentItem]).height();
                n.wrapperOuter.css('height', r + 'px');
                if (!n.wrapperOuter.hasClass('autoHeight')) {
                    t.setTimeout(function() {
                        n.wrapperOuter.addClass('autoHeight');
                    }, 0);
                }
            }
            function o() {
                i += 1;
                if (n.completeImg(r.get(0))) {
                    s();
                } else if (i <= 100) {
                    t.setTimeout(o, 100);
                } else {
                    n.wrapperOuter.css('height', '');
                }
            }
            var n = this,
                r = e(n.$owlItems[n.currentItem]).find('img'),
                i;
            if (r.get(0) !== undefined) {
                i = 0;
                o();
            } else {
                s();
            }
        },
        completeImg: function(e) {
            var t;
            if (!e.complete) {
                return false;
            }
            t = typeof e.naturalWidth;
            if (t !== 'undefined' && e.naturalWidth === 0) {
                return false;
            }
            return true;
        },
        onVisibleItems: function() {
            var t = this,
                n;
            if (t.options.addClassActive === true) {
                t.$owlItems.removeClass('active');
            }
            t.visibleItems = [];
            for (
                n = t.currentItem;
                n < t.currentItem + t.options.items;
                n += 1
            ) {
                t.visibleItems.push(n);
                if (t.options.addClassActive === true) {
                    e(t.$owlItems[n]).addClass('active');
                }
            }
            t.owl.visibleItems = t.visibleItems;
        },
        transitionTypes: function(e) {
            var t = this;
            t.outClass = 'owl-' + e + '-out';
            t.inClass = 'owl-' + e + '-in';
        },
        singleItemTransition: function() {
            function a(e) {
                return { position: 'relative', left: e + 'px' };
            }
            var e = this,
                t = e.outClass,
                n = e.inClass,
                r = e.$owlItems.eq(e.currentItem),
                i = e.$owlItems.eq(e.prevItem),
                s =
                    Math.abs(e.positionsInArray[e.currentItem]) +
                    e.positionsInArray[e.prevItem],
                o =
                    Math.abs(e.positionsInArray[e.currentItem]) +
                    e.itemWidth / 2,
                u =
                    'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';
            e.isTransition = true;
            e.$owlWrapper.addClass('owl-origin').css({
                '-webkit-transform-origin': o + 'px',
                '-moz-perspective-origin': o + 'px',
                'perspective-origin': o + 'px'
            });
            i.css(a(s, 10))
                .addClass(t)
                .on(u, function() {
                    e.endPrev = true;
                    i.off(u);
                    e.clearTransStyle(i, t);
                });
            r.addClass(n).on(u, function() {
                e.endCurrent = true;
                r.off(u);
                e.clearTransStyle(r, n);
            });
        },
        clearTransStyle: function(e, t) {
            var n = this;
            e.css({ position: '', left: '' }).removeClass(t);
            if (n.endPrev && n.endCurrent) {
                n.$owlWrapper.removeClass('owl-origin');
                n.endPrev = false;
                n.endCurrent = false;
                n.isTransition = false;
            }
        },
        owlStatus: function() {
            var e = this;
            e.owl = {
                userOptions: e.userOptions,
                baseElement: e.$elem,
                userItems: e.$userItems,
                owlItems: e.$owlItems,
                currentItem: e.currentItem,
                prevItem: e.prevItem,
                visibleItems: e.visibleItems,
                isTouch: e.browser.isTouch,
                browser: e.browser,
                dragDirection: e.dragDirection
            };
        },
        clearEvents: function() {
            var r = this;
            r.$elem.off('.owl owl mousedown.disableTextSelect');
            e(n).off('.owl owl');
            e(t).off('resize', r.resizer);
        },
        unWrap: function() {
            var e = this;
            if (e.$elem.children().length !== 0) {
                e.$owlWrapper.unwrap();
                e.$userItems.unwrap().unwrap();
                if (e.owlControls) {
                    e.owlControls.remove();
                }
            }
            e.clearEvents();
            e.$elem.attr({
                style: e.$elem.data('owl-originalStyles') || '',
                class: e.$elem.data('owl-originalClasses')
            });
        },
        destroy: function() {
            var e = this;
            e.stop();
            t.clearInterval(e.checkVisible);
            e.unWrap();
            e.$elem.removeData();
        },
        reinit: function(t) {
            var n = this,
                r = e.extend({}, n.userOptions, t);
            n.unWrap();
            n.init(r, n.$elem);
        },
        addItem: function(e, t) {
            var n = this,
                r;
            if (!e) {
                return false;
            }
            if (n.$elem.children().length === 0) {
                n.$elem.append(e);
                n.setVars();
                return false;
            }
            n.unWrap();
            if (t === undefined || t === -1) {
                r = -1;
            } else {
                r = t;
            }
            if (r >= n.$userItems.length || r === -1) {
                n.$userItems.eq(-1).after(e);
            } else {
                n.$userItems.eq(r).before(e);
            }
            n.setVars();
        },
        removeItem: function(e) {
            var t = this,
                n;
            if (t.$elem.children().length === 0) {
                return false;
            }
            if (e === undefined || e === -1) {
                n = -1;
            } else {
                n = e;
            }
            t.unWrap();
            t.$userItems.eq(n).remove();
            t.setVars();
        }
    };
    e.fn.owlCarousel = function(t) {
        return this.each(function() {
            if (e(this).data('owl-init') === true) {
                return false;
            }
            e(this).data('owl-init', true);
            var n = Object.create(r);
            n.init(t, this);
            e.data(this, 'owlCarousel', n);
        });
    };
    e.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        itemsScaleUp: false,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: false,
        stopOnHover: false,
        navigation: false,
        navigationText: ['prev', 'next'],
        rewindNav: true,
        scrollPerPage: false,
        pagination: true,
        paginationNumbers: false,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: t,
        baseClass: 'owl-carousel',
        theme: 'owl-theme',
        lazyLoad: false,
        lazyFollow: true,
        lazyEffect: 'fade',
        autoHeight: false,
        jsonPath: false,
        jsonSuccess: false,
        dragBeforeAnimFinish: true,
        mouseDrag: true,
        touchDrag: true,
        addClassActive: false,
        transitionStyle: false,
        beforeUpdate: false,
        afterUpdate: false,
        beforeInit: false,
        afterInit: false,
        beforeMove: false,
        afterMove: false,
        afterAction: false,
        startDragging: false,
        afterLazyLoad: false
    };
})(jQuery, window, document);

/* STELLAR PARALLAX PLUGIN */

/*! Stellar.js v0.6.2 | Copyright 2014, Mark Dalgleish | http://markdalgleish.com/projects/stellar.js | http://markdalgleish.mit-license.org */
!(function(a, b, c, d) {
    function e(b, c) {
        (this.element = b),
            (this.options = a.extend({}, g, c)),
            (this._defaults = g),
            (this._name = f),
            this.init();
    }
    var f = 'stellar',
        g = {
            scrollProperty: 'scroll',
            positionProperty: 'position',
            horizontalScrolling: !0,
            verticalScrolling: !0,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: !1,
            parallaxBackgrounds: !0,
            parallaxElements: !0,
            hideDistantElements: !0,
            hideElement: function(a) {
                a.hide();
            },
            showElement: function(a) {
                a.show();
            }
        },
        h = {
            scroll: {
                getLeft: function(a) {
                    return a.scrollLeft();
                },
                setLeft: function(a, b) {
                    a.scrollLeft(b);
                },
                getTop: function(a) {
                    return a.scrollTop();
                },
                setTop: function(a, b) {
                    a.scrollTop(b);
                }
            },
            position: {
                getLeft: function(a) {
                    return -1 * parseInt(a.css('left'), 10);
                },
                getTop: function(a) {
                    return -1 * parseInt(a.css('top'), 10);
                }
            },
            margin: {
                getLeft: function(a) {
                    return -1 * parseInt(a.css('margin-left'), 10);
                },
                getTop: function(a) {
                    return -1 * parseInt(a.css('margin-top'), 10);
                }
            },
            transform: {
                getLeft: function(a) {
                    var b = getComputedStyle(a[0])[k];
                    return 'none' !== b
                        ? -1 * parseInt(b.match(/(-?[0-9]+)/g)[4], 10)
                        : 0;
                },
                getTop: function(a) {
                    var b = getComputedStyle(a[0])[k];
                    return 'none' !== b
                        ? -1 * parseInt(b.match(/(-?[0-9]+)/g)[5], 10)
                        : 0;
                }
            }
        },
        i = {
            position: {
                setLeft: function(a, b) {
                    a.css('left', b);
                },
                setTop: function(a, b) {
                    a.css('top', b);
                }
            },
            transform: {
                setPosition: function(a, b, c, d, e) {
                    a[0].style[k] =
                        'translate3d(' + (b - c) + 'px, ' + (d - e) + 'px, 0)';
                }
            }
        },
        j = (function() {
            var b,
                c = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                d = a('script')[0].style,
                e = '';
            for (b in d)
                if (c.test(b)) {
                    e = b.match(c)[0];
                    break;
                }
            return (
                'WebkitOpacity' in d && (e = 'Webkit'),
                'KhtmlOpacity' in d && (e = 'Khtml'),
                function(a) {
                    return (
                        e +
                        (e.length > 0
                            ? a.charAt(0).toUpperCase() + a.slice(1)
                            : a)
                    );
                }
            );
        })(),
        k = j('transform'),
        l =
            a('<div />', { style: 'background:#fff' }).css(
                'background-position-x'
            ) !== d,
        m = l
            ? function(a, b, c) {
                  a.css({
                      'background-position-x': b,
                      'background-position-y': c
                  });
              }
            : function(a, b, c) {
                  a.css('background-position', b + ' ' + c);
              },
        n = l
            ? function(a) {
                  return [
                      a.css('background-position-x'),
                      a.css('background-position-y')
                  ];
              }
            : function(a) {
                  return a.css('background-position').split(' ');
              },
        o =
            b.requestAnimationFrame ||
            b.webkitRequestAnimationFrame ||
            b.mozRequestAnimationFrame ||
            b.oRequestAnimationFrame ||
            b.msRequestAnimationFrame ||
            function(a) {
                setTimeout(a, 1e3 / 60);
            };
    (e.prototype = {
        init: function() {
            (this.options.name = f + '_' + Math.floor(1e9 * Math.random())),
                this._defineElements(),
                this._defineGetters(),
                this._defineSetters(),
                this._handleWindowLoadAndResize(),
                this._detectViewport(),
                this.refresh({ firstLoad: !0 }),
                'scroll' === this.options.scrollProperty
                    ? this._handleScrollEvent()
                    : this._startAnimationLoop();
        },
        _defineElements: function() {
            this.element === c.body && (this.element = b),
                (this.$scrollElement = a(this.element)),
                (this.$element =
                    this.element === b ? a('body') : this.$scrollElement),
                (this.$viewportElement =
                    this.options.viewportElement !== d
                        ? a(this.options.viewportElement)
                        : this.$scrollElement[0] === b ||
                          'scroll' === this.options.scrollProperty
                            ? this.$scrollElement
                            : this.$scrollElement.parent());
        },
        _defineGetters: function() {
            var a = this,
                b = h[a.options.scrollProperty];
            (this._getScrollLeft = function() {
                return b.getLeft(a.$scrollElement);
            }),
                (this._getScrollTop = function() {
                    return b.getTop(a.$scrollElement);
                });
        },
        _defineSetters: function() {
            var b = this,
                c = h[b.options.scrollProperty],
                d = i[b.options.positionProperty],
                e = c.setLeft,
                f = c.setTop;
            (this._setScrollLeft =
                'function' == typeof e
                    ? function(a) {
                          e(b.$scrollElement, a);
                      }
                    : a.noop),
                (this._setScrollTop =
                    'function' == typeof f
                        ? function(a) {
                              f(b.$scrollElement, a);
                          }
                        : a.noop),
                (this._setPosition =
                    d.setPosition ||
                    function(a, c, e, f, g) {
                        b.options.horizontalScrolling && d.setLeft(a, c, e),
                            b.options.verticalScrolling && d.setTop(a, f, g);
                    });
        },
        _handleWindowLoadAndResize: function() {
            var c = this,
                d = a(b);
            c.options.responsive &&
                d.bind('load.' + this.name, function() {
                    c.refresh();
                }),
                d.bind('resize.' + this.name, function() {
                    c._detectViewport(), c.options.responsive && c.refresh();
                });
        },
        refresh: function(c) {
            var d = this,
                e = d._getScrollLeft(),
                f = d._getScrollTop();
            (c && c.firstLoad) || this._reset(),
                this._setScrollLeft(0),
                this._setScrollTop(0),
                this._setOffsets(),
                this._findParticles(),
                this._findBackgrounds(),
                c &&
                    c.firstLoad &&
                    /WebKit/.test(navigator.userAgent) &&
                    a(b).load(function() {
                        var a = d._getScrollLeft(),
                            b = d._getScrollTop();
                        d._setScrollLeft(a + 1),
                            d._setScrollTop(b + 1),
                            d._setScrollLeft(a),
                            d._setScrollTop(b);
                    }),
                this._setScrollLeft(e),
                this._setScrollTop(f);
        },
        _detectViewport: function() {
            var a = this.$viewportElement.offset(),
                b = null !== a && a !== d;
            (this.viewportWidth = this.$viewportElement.width()),
                (this.viewportHeight = this.$viewportElement.height()),
                (this.viewportOffsetTop = b ? a.top : 0),
                (this.viewportOffsetLeft = b ? a.left : 0);
        },
        _findParticles: function() {
            {
                var b = this;
                this._getScrollLeft(), this._getScrollTop();
            }
            if (this.particles !== d)
                for (var c = this.particles.length - 1; c >= 0; c--)
                    this.particles[c].$element.data(
                        'stellar-elementIsActive',
                        d
                    );
            (this.particles = []),
                this.options.parallaxElements &&
                    this.$element.find('[data-stellar-ratio]').each(function() {
                        var c,
                            e,
                            f,
                            g,
                            h,
                            i,
                            j,
                            k,
                            l,
                            m = a(this),
                            n = 0,
                            o = 0,
                            p = 0,
                            q = 0;
                        if (m.data('stellar-elementIsActive')) {
                            if (m.data('stellar-elementIsActive') !== this)
                                return;
                        } else m.data('stellar-elementIsActive', this);
                        b.options.showElement(m),
                            m.data('stellar-startingLeft')
                                ? (m.css(
                                      'left',
                                      m.data('stellar-startingLeft')
                                  ),
                                  m.css('top', m.data('stellar-startingTop')))
                                : (m.data(
                                      'stellar-startingLeft',
                                      m.css('left')
                                  ),
                                  m.data('stellar-startingTop', m.css('top'))),
                            (f = m.position().left),
                            (g = m.position().top),
                            (h =
                                'auto' === m.css('margin-left')
                                    ? 0
                                    : parseInt(m.css('margin-left'), 10)),
                            (i =
                                'auto' === m.css('margin-top')
                                    ? 0
                                    : parseInt(m.css('margin-top'), 10)),
                            (k = m.offset().left - h),
                            (l = m.offset().top - i),
                            m.parents().each(function() {
                                var b = a(this);
                                return b.data('stellar-offset-parent') === !0
                                    ? ((n = p), (o = q), (j = b), !1)
                                    : ((p += b.position().left),
                                      void (q += b.position().top));
                            }),
                            (c =
                                m.data('stellar-horizontal-offset') !== d
                                    ? m.data('stellar-horizontal-offset')
                                    : j !== d &&
                                      j.data('stellar-horizontal-offset') !== d
                                        ? j.data('stellar-horizontal-offset')
                                        : b.horizontalOffset),
                            (e =
                                m.data('stellar-vertical-offset') !== d
                                    ? m.data('stellar-vertical-offset')
                                    : j !== d &&
                                      j.data('stellar-vertical-offset') !== d
                                        ? j.data('stellar-vertical-offset')
                                        : b.verticalOffset),
                            b.particles.push({
                                $element: m,
                                $offsetParent: j,
                                isFixed: 'fixed' === m.css('position'),
                                horizontalOffset: c,
                                verticalOffset: e,
                                startingPositionLeft: f,
                                startingPositionTop: g,
                                startingOffsetLeft: k,
                                startingOffsetTop: l,
                                parentOffsetLeft: n,
                                parentOffsetTop: o,
                                stellarRatio:
                                    m.data('stellar-ratio') !== d
                                        ? m.data('stellar-ratio')
                                        : 1,
                                width: m.outerWidth(!0),
                                height: m.outerHeight(!0),
                                isHidden: !1
                            });
                    });
        },
        _findBackgrounds: function() {
            var b,
                c = this,
                e = this._getScrollLeft(),
                f = this._getScrollTop();
            (this.backgrounds = []),
                this.options.parallaxBackgrounds &&
                    ((b = this.$element.find(
                        '[data-stellar-background-ratio]'
                    )),
                    this.$element.data('stellar-background-ratio') &&
                        (b = b.add(this.$element)),
                    b.each(function() {
                        var b,
                            g,
                            h,
                            i,
                            j,
                            k,
                            l,
                            o = a(this),
                            p = n(o),
                            q = 0,
                            r = 0,
                            s = 0,
                            t = 0;
                        if (o.data('stellar-backgroundIsActive')) {
                            if (o.data('stellar-backgroundIsActive') !== this)
                                return;
                        } else o.data('stellar-backgroundIsActive', this);
                        o.data('stellar-backgroundStartingLeft')
                            ? m(
                                  o,
                                  o.data('stellar-backgroundStartingLeft'),
                                  o.data('stellar-backgroundStartingTop')
                              )
                            : (o.data('stellar-backgroundStartingLeft', p[0]),
                              o.data('stellar-backgroundStartingTop', p[1])),
                            (h =
                                'auto' === o.css('margin-left')
                                    ? 0
                                    : parseInt(o.css('margin-left'), 10)),
                            (i =
                                'auto' === o.css('margin-top')
                                    ? 0
                                    : parseInt(o.css('margin-top'), 10)),
                            (j = o.offset().left - h - e),
                            (k = o.offset().top - i - f),
                            o.parents().each(function() {
                                var b = a(this);
                                return b.data('stellar-offset-parent') === !0
                                    ? ((q = s), (r = t), (l = b), !1)
                                    : ((s += b.position().left),
                                      void (t += b.position().top));
                            }),
                            (b =
                                o.data('stellar-horizontal-offset') !== d
                                    ? o.data('stellar-horizontal-offset')
                                    : l !== d &&
                                      l.data('stellar-horizontal-offset') !== d
                                        ? l.data('stellar-horizontal-offset')
                                        : c.horizontalOffset),
                            (g =
                                o.data('stellar-vertical-offset') !== d
                                    ? o.data('stellar-vertical-offset')
                                    : l !== d &&
                                      l.data('stellar-vertical-offset') !== d
                                        ? l.data('stellar-vertical-offset')
                                        : c.verticalOffset),
                            c.backgrounds.push({
                                $element: o,
                                $offsetParent: l,
                                isFixed:
                                    'fixed' === o.css('background-attachment'),
                                horizontalOffset: b,
                                verticalOffset: g,
                                startingValueLeft: p[0],
                                startingValueTop: p[1],
                                startingBackgroundPositionLeft: isNaN(
                                    parseInt(p[0], 10)
                                )
                                    ? 0
                                    : parseInt(p[0], 10),
                                startingBackgroundPositionTop: isNaN(
                                    parseInt(p[1], 10)
                                )
                                    ? 0
                                    : parseInt(p[1], 10),
                                startingPositionLeft: o.position().left,
                                startingPositionTop: o.position().top,
                                startingOffsetLeft: j,
                                startingOffsetTop: k,
                                parentOffsetLeft: q,
                                parentOffsetTop: r,
                                stellarRatio:
                                    o.data('stellar-background-ratio') === d
                                        ? 1
                                        : o.data('stellar-background-ratio')
                            });
                    }));
        },
        _reset: function() {
            var a, b, c, d, e;
            for (e = this.particles.length - 1; e >= 0; e--)
                (a = this.particles[e]),
                    (b = a.$element.data('stellar-startingLeft')),
                    (c = a.$element.data('stellar-startingTop')),
                    this._setPosition(a.$element, b, b, c, c),
                    this.options.showElement(a.$element),
                    a.$element
                        .data('stellar-startingLeft', null)
                        .data('stellar-elementIsActive', null)
                        .data('stellar-backgroundIsActive', null);
            for (e = this.backgrounds.length - 1; e >= 0; e--)
                (d = this.backgrounds[e]),
                    d.$element
                        .data('stellar-backgroundStartingLeft', null)
                        .data('stellar-backgroundStartingTop', null),
                    m(d.$element, d.startingValueLeft, d.startingValueTop);
        },
        destroy: function() {
            this._reset(),
                this.$scrollElement
                    .unbind('resize.' + this.name)
                    .unbind('scroll.' + this.name),
                (this._animationLoop = a.noop),
                a(b)
                    .unbind('load.' + this.name)
                    .unbind('resize.' + this.name);
        },
        _setOffsets: function() {
            var c = this,
                d = a(b);
            d
                .unbind('resize.horizontal-' + this.name)
                .unbind('resize.vertical-' + this.name),
                'function' == typeof this.options.horizontalOffset
                    ? ((this.horizontalOffset = this.options.horizontalOffset()),
                      d.bind('resize.horizontal-' + this.name, function() {
                          c.horizontalOffset = c.options.horizontalOffset();
                      }))
                    : (this.horizontalOffset = this.options.horizontalOffset),
                'function' == typeof this.options.verticalOffset
                    ? ((this.verticalOffset = this.options.verticalOffset()),
                      d.bind('resize.vertical-' + this.name, function() {
                          c.verticalOffset = c.options.verticalOffset();
                      }))
                    : (this.verticalOffset = this.options.verticalOffset);
        },
        _repositionElements: function() {
            var a,
                b,
                c,
                d,
                e,
                f,
                g,
                h,
                i,
                j,
                k = this._getScrollLeft(),
                l = this._getScrollTop(),
                n = !0,
                o = !0;
            if (
                this.currentScrollLeft !== k ||
                this.currentScrollTop !== l ||
                this.currentWidth !== this.viewportWidth ||
                this.currentHeight !== this.viewportHeight
            ) {
                for (
                    this.currentScrollLeft = k,
                        this.currentScrollTop = l,
                        this.currentWidth = this.viewportWidth,
                        this.currentHeight = this.viewportHeight,
                        j = this.particles.length - 1;
                    j >= 0;
                    j--
                )
                    (a = this.particles[j]),
                        (b = a.isFixed ? 1 : 0),
                        this.options.horizontalScrolling
                            ? ((f =
                                  (k +
                                      a.horizontalOffset +
                                      this.viewportOffsetLeft +
                                      a.startingPositionLeft -
                                      a.startingOffsetLeft +
                                      a.parentOffsetLeft) *
                                      -(a.stellarRatio + b - 1) +
                                  a.startingPositionLeft),
                              (h =
                                  f -
                                  a.startingPositionLeft +
                                  a.startingOffsetLeft))
                            : ((f = a.startingPositionLeft),
                              (h = a.startingOffsetLeft)),
                        this.options.verticalScrolling
                            ? ((g =
                                  (l +
                                      a.verticalOffset +
                                      this.viewportOffsetTop +
                                      a.startingPositionTop -
                                      a.startingOffsetTop +
                                      a.parentOffsetTop) *
                                      -(a.stellarRatio + b - 1) +
                                  a.startingPositionTop),
                              (i =
                                  g -
                                  a.startingPositionTop +
                                  a.startingOffsetTop))
                            : ((g = a.startingPositionTop),
                              (i = a.startingOffsetTop)),
                        this.options.hideDistantElements &&
                            ((o =
                                !this.options.horizontalScrolling ||
                                (h + a.width > (a.isFixed ? 0 : k) &&
                                    h <
                                        (a.isFixed ? 0 : k) +
                                            this.viewportWidth +
                                            this.viewportOffsetLeft)),
                            (n =
                                !this.options.verticalScrolling ||
                                (i + a.height > (a.isFixed ? 0 : l) &&
                                    i <
                                        (a.isFixed ? 0 : l) +
                                            this.viewportHeight +
                                            this.viewportOffsetTop))),
                        o && n
                            ? (a.isHidden &&
                                  (this.options.showElement(a.$element),
                                  (a.isHidden = !1)),
                              this._setPosition(
                                  a.$element,
                                  f,
                                  a.startingPositionLeft,
                                  g,
                                  a.startingPositionTop
                              ))
                            : a.isHidden ||
                              (this.options.hideElement(a.$element),
                              (a.isHidden = !0));
                for (j = this.backgrounds.length - 1; j >= 0; j--)
                    (c = this.backgrounds[j]),
                        (b = c.isFixed ? 0 : 1),
                        (d = this.options.horizontalScrolling
                            ? (k +
                                  c.horizontalOffset -
                                  this.viewportOffsetLeft -
                                  c.startingOffsetLeft +
                                  c.parentOffsetLeft -
                                  c.startingBackgroundPositionLeft) *
                                  (b - c.stellarRatio) +
                              'px'
                            : c.startingValueLeft),
                        (e = this.options.verticalScrolling
                            ? (l +
                                  c.verticalOffset -
                                  this.viewportOffsetTop -
                                  c.startingOffsetTop +
                                  c.parentOffsetTop -
                                  c.startingBackgroundPositionTop) *
                                  (b - c.stellarRatio) +
                              'px'
                            : c.startingValueTop),
                        m(c.$element, d, e);
            }
        },
        _handleScrollEvent: function() {
            var a = this,
                b = !1,
                c = function() {
                    a._repositionElements(), (b = !1);
                },
                d = function() {
                    b || (o(c), (b = !0));
                };
            this.$scrollElement.bind('scroll.' + this.name, d), d();
        },
        _startAnimationLoop: function() {
            var a = this;
            (this._animationLoop = function() {
                o(a._animationLoop), a._repositionElements();
            }),
                this._animationLoop();
        }
    }),
        (a.fn[f] = function(b) {
            var c = arguments;
            return b === d || 'object' == typeof b
                ? this.each(function() {
                      a.data(this, 'plugin_' + f) ||
                          a.data(this, 'plugin_' + f, new e(this, b));
                  })
                : 'string' == typeof b && '_' !== b[0] && 'init' !== b
                    ? this.each(function() {
                          var d = a.data(this, 'plugin_' + f);
                          d instanceof e &&
                              'function' == typeof d[b] &&
                              d[b].apply(d, Array.prototype.slice.call(c, 1)),
                              'destroy' === b &&
                                  a.data(this, 'plugin_' + f, null);
                      })
                    : void 0;
        }),
        (a[f] = function() {
            var c = a(b);
            return c.stellar.apply(c, Array.prototype.slice.call(arguments, 0));
        }),
        (a[f].scrollProperty = h),
        (a[f].positionProperty = i),
        (b.Stellar = e);
})(jQuery, this, document);

/*
 * jQuery.appear
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
*/
(function($) {
    $.fn.appear = function(f, o) {
        var s = $.extend({ one: true }, o);
        return this.each(function() {
            var t = $(this);
            t.appeared = false;
            if (!f) {
                t.trigger('appear', s.data);
                return;
            }
            var w = $(window);
            var c = function() {
                if (!t.is(':visible')) {
                    t.appeared = false;
                    return;
                }
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;
                if (
                    y + t.height() >= b &&
                    y <= b + w.height() &&
                    x + t.width() >= a &&
                    x <= a + w.width()
                ) {
                    if (!t.appeared) t.trigger('appear', s.data);
                } else {
                    t.appeared = false;
                }
            };
            var m = function() {
                t.appeared = true;
                if (s.one) {
                    w.unbind('scroll', c);
                    var i = $.inArray(c, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }
                f.apply(this, arguments);
            };
            if (s.one) t.one('appear', s.data, m);
            else t.bind('appear', s.data, m);
            w.scroll(c);
            $.fn.appear.checks.push(c);
            c();
        });
    };
    $.extend($.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var l = $.fn.appear.checks.length;
            if (l > 0) while (l--) $.fn.appear.checks[l]();
        },
        run: function() {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }
    });
    $.each(
        [
            'append',
            'prepend',
            'after',
            'before',
            'attr',
            'removeAttr',
            'addClass',
            'removeClass',
            'toggleClass',
            'remove',
            'css',
            'show',
            'hide'
        ],
        function(i, n) {
            var u = $.fn[n];
            if (u) {
                $.fn[n] = function() {
                    var r = u.apply(this, arguments);
                    $.fn.appear.run();
                    return r;
                };
            }
        }
    );
})(jQuery);
