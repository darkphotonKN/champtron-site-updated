// SELECTORS
const serviceBtn = document.querySelector('.service-btn .button');
const serviceMore = document.querySelector('.services-container');

// GLOBAL VARS
var expanded = false;

// slick carousel
function clientsCarousel() {
    $('.clients-block').slick({
        arrows: true, // menu and tabbing
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 650,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    dots: true,
                    mobileFirst: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}

// service toggle TEMP DISABLED
// function serviceToggle() {
// 	serviceBtn.addEventListener('click', () => {
// 		if(!expanded) {
// 			serviceMore.classList.remove('close');
// 			serviceMore.classList.add('active');
// 			expanded = true;
// 			serviceBtn.innerHTML = "Less"; // arrow <i class=\"fas fa-arrow-up\"></i>
// 		}
// 		else {
// 			serviceMore.classList.add('close');
// 			setTimeout(() => serviceMore.classList.remove('active'), 100);
// 			expanded = false;
// 			serviceBtn.innerHTML = "More";
// 		}
// 	});
// }

// activating Contacts nav highlighting when entering section
function scrollMenu() {
    const clientNav = document.getElementById('client-nav-item');
    const contactNav = document.getElementById('contact-nav-item');

    // instantiate the width of height variable on window load
    var widthOfView = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    );
    var mobileWidth = 760;
    // console.log(widthOfView);

    // width variable changes on window resize, alter window width variable whenever screen is resized
    window.addEventListener(
        'resize',
        () =>
            (widthOfView = Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ))
    );

    // add / remove highlighting depend on scroll
    window.addEventListener('scroll', (e) => {
        if (widthOfView > mobileWidth) {
            var scrollPosition = window.window.pageYOffset;
            // console.log(scrollPosition); // testsing
            if (scrollPosition > 3900) {
                // console.log('Added');
                contactNav.classList.add('active');
                clientNav.classList.remove('active');
            }
            if (scrollPosition < 3600) {
                // console.log('Removed');
                contactNav.classList.remove('active');
                clientNav.classList.add('active');
            }
            if (scrollPosition < 3080) {
                clientNav.classList.remove('active');
            }
        }
    });
}

// init
$(document).ready(() => {
    $('#home-nav-item').addClass('active');
    setTimeout(() => $('.logo-title').addClass('loaded'), 300);
    //serviceToggle();
    scrollMenu();
    clientsCarousel();

    // FlowTypeJS for Client Section
    $('.clients-block').flowtype({
        minFont: 17,
        maxFont: 24
    });
});

/* MAIN LANDING PAGE BACKGROUND */

var canvas = document.createElement('canvas');
document
    .querySelector('.slider-cont.parallax-background.bg1 .overlay')
    .appendChild(canvas);
(canvas.width = window.innerWidth), (canvas.height = window.innerHeight);
canvas.style.background = 'rgba(0, 0, 0, 1)';

var ctx = canvas.getContext('2d');

const colors = ['#fff100', '#3c6382', '#2E49E0', '#00fff6'];

var Star = function(x, y, circle_rad, size, color) {
    this.radians = Math.random() * (Math.PI * 2);

    this.x = x + Math.cos(this.radians) * circle_rad;
    this.y = y + Math.sin(this.radians) * circle_rad;

    this.circle_rad = circle_rad;
    this.color = color;
    this.size = size;

    this.last = { x: x, y: y };
    (this.alpha = 0), (this.temp = 0);
    this.update = () => {
        const lastPos = { x: this.x, y: this.y };

        if (this.temp > 1) {
            this.alpha -= 0.008;
        } else {
            this.temp += 0.008;
            this.alpha += 0.008;
        }

        if (this.alpha <= 0) this.alpha = 0;

        this.radians += Math.random() * 0.04;
        this.x = this.last.x + Math.cos(this.radians) * this.circle_rad;
        this.y = this.last.y + Math.sin(this.radians) * this.circle_rad;

        this.draw(lastPos);
    };

    this.draw = (lastPos) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(this.x, this.y);
        ctx.globalAlpha = this.alpha;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    };
};

function Group(x, y, num) {
    this.stars = [];
    var moreRand = minMax(100, canvas.width);
    for (var i = 0; i < num; i++) {
        this.stars.push(
            new Star(
                x,
                y,
                Math.random() * moreRand,
                Math.random() * 5,
                getRandomColor()
            )
        );
    }
    this.update = function() {
        this.stars.forEach((star) => {
            star.update();
        });
    };
}

// color random
function getRandomColor() {
    var x = parseInt(Math.random() * colors.length);
    return colors[x];
}

function minMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var g = [];
var added = [];
function init() {
    let i = 0;
    g.push(new Group(canvas.width / 2, canvas.height / 2, 100));
    var ee = setInterval(function() {
        var posX = Math.random() * canvas.width;
        var posY = Math.random() * canvas.height;
        g.push(new Group(posX, posY, 100));
        if (g.length > 4) {
            g.splice(0, 1);
        }
    }, 1500);
}

function animate() {
    requestAnimationFrame(animate);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(0, 0, 0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    g.forEach(function(s) {
        s.update();
    });
    added.forEach(function(s) {
        s.update();
    });
}

init();
animate();

addEventListener('mousedown', function(e) {
    var posX = Math.random() * canvas.width;
    var posY = Math.random() * canvas.height;
    added.push(new Group(e.clientX, e.clientY, 100));
});
addEventListener('resize', function() {
    g.forEach(function(s) {
        s.stars = [];
    });
    g = [];
    added = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
