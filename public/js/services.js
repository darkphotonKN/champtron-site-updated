// services navigation menu scroll

function servNavScroll() {
    var breakPoint = 626;
    var servNav = document.getElementById('services-nav');
    var servNavList = document.querySelector('#services-nav ul.nav');
    window.addEventListener('scroll', function(e) {
        var scrollPosition = window.window.pageYOffset;
        if (scrollPosition > breakPoint) {
            servNav.classList.add('scroll-bar');
            servNavList.classList.add('scroll');
            document.querySelector('ul.nav li').innerHTML =
                '<a href="#top"><i class="fas fa-arrow-up" /></a>';
        }
        if (scrollPosition < breakPoint) {
            servNav.classList.remove('scroll-bar');
            servNavList.classList.remove('scroll');

            document.querySelector('ul.nav li').innerHTML =
                '<a href="#top">MENU</a>';
        }
        console.log(scrollPosition);
    });
}

servNavScroll();
