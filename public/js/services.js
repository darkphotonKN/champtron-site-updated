// services navigation menu scroll

function servNavScroll() {
    var breakPoint = 626;
    var servNav = document.getElementById('services-nav');
    var servNavList = document.querySelector('#services-nav ul.nav');
    var servNavAnchor = document.querySelector('#services-nav ul.nav li a');
    window.addEventListener('scroll', function(e) {
        var scrollPosition = window.window.pageYOffset;
        if (scrollPosition > breakPoint) {
            servNav.classList.add('scroll-bar');
            servNavList.classList.add('scroll');
            document.querySelector('ul.nav li').innerHTML =
                '<a id="arrow" href="#top" style="color:#00fff6"><i class="fas fa-arrow-up" /></a>';
        }
        if (scrollPosition < breakPoint) {
            servNav.classList.remove('scroll-bar');
            servNavList.classList.remove('scroll');

            document.querySelector('ul.nav li').innerHTML = 'MENU |';
        }
        // console.log(scrollPosition);
    });

    // add / remove classes on arrow
    servNavAnchor.addEventListener('mouseenter', function() {
        console.log('test');
        servNavAnchor.classList.add('mouse-over');
    });
    // servNavAnchor.addEventListener('mouseleave', function() {
    //     sverNavAnchor.classList.remove('mouse-over');
    // });
}

servNavScroll();
