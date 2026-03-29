// Sidebar: desktop — expand/collapse width; mobile — slide-in panel + backdrop + FAB outside panel

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const mobileToggle = document.getElementById('mobile-menu-toggle');
const backdrop = document.getElementById('nav-backdrop');
const mqMobile = window.matchMedia('(max-width: 768px)');

function isMobileNav() {
    return mqMobile.matches;
}

function closeMobileNav() {
    if (!navbar) return;
    navbar.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    if (backdrop) backdrop.hidden = true;
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
}

function openMobileNav() {
    if (!navbar) return;
    navbar.classList.add('nav-open');
    document.body.classList.add('nav-open');
    if (backdrop) backdrop.hidden = false;
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
}

function toggleMobileNav() {
    if (!navbar) return;
    if (navbar.classList.contains('nav-open')) closeMobileNav();
    else openMobileNav();
}

if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
        if (isMobileNav()) toggleMobileNav();
        else navbar.classList.toggle('expander');
    });
}

if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMobileNav();
    });
}

if (backdrop) {
    backdrop.addEventListener('click', closeMobileNav);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
});

mqMobile.addEventListener('change', () => {
    if (!isMobileNav()) closeMobileNav();
});

if (navbar) {
    navbar.querySelectorAll('a[href]').forEach((a) => {
        a.addEventListener('click', () => {
            if (isMobileNav()) closeMobileNav();
        });
    });
}

// Changing Active Link

const linkColor = document.querySelectorAll('.nav-link');
function colorLink() {
    linkColor.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
}

linkColor.forEach(l => l.addEventListener('click', colorLink));

// Activating Submenus

const linkCollapse = document.getElementsByClassName('collapse-link');
var i;

for (i = 0; i < linkCollapse.length; i++) {
    linkCollapse[i].addEventListener('click', function() {
        const collapseMenu = this.nextElementSibling;
        if (!collapseMenu) return;
        collapseMenu.classList.toggle('showCollapse');

        const rotate = collapseMenu.previousElementSibling;
        if (rotate) rotate.classList.toggle('rotate');
    });
}
