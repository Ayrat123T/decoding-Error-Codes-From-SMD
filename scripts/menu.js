//Enabling Sidebar Toggling with Padding body

const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.getElementById(toggleId);
    const navbar = document.getElementById(navbarId);
    const bodypadding = document.getElementById(bodyId);

    if(toggle && navbar) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('expander');

            bodypadding.classList.toggle('body-pd');
        })
    }
}

showMenu('nav-toggle','navbar', 'body-pd');

// Changing Active Link

const linkColor = document.querySelectorAll('.nav-link');
function colorLink() {
    linkColor.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
}

linkColor.forEach(l => l.addEventListener('click', colorLink));

//Activating Submenus

const linkCollapse = document.getElementsByClassName('collapse-link');
var i

for(i = 0; i <linkCollapse.length; i++) {
    linkCollapse[i].addEventListener('click', function() {
        const collapseMenu = this.nextElementSibling;
        collapseMenu.classList.toggle('showCollapse');

        const rotate = collapseMenu.previousElementSibling;
        rotate.classList.toggle('rotate');
    })
}





// When the user scrolls the page, execute myFunction
/*window.onscroll = function() {myFunction()};

// Get the navbar
var bottomNavbar = document.getElementById("bottomNavbar");

// Get the offset position of the navbar
var sticky = bottomNavbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    bottomNavbar.classList.add("sticky")
  } else {
    bottomNavbar.classList.remove("sticky");
  }
}*/