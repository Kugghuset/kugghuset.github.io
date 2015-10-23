(function () {
  'use strict'

  var hamburger = document.getElementById('hamburger');
  var pushmenu = document.getElementById('pushmenu');

  function hamburgerClickHandler(e) {
    if (/ open|open /g.test(pushmenu.className)) {
      pushmenu.className = pushmenu.className.replace(/open/, '');
      document.body.style.transform = 'translateX(0)';
    } else {
      pushmenu.className += ' open';
      console.log(document.body.style.transform);
      document.body.style.transform = 'translateX(-250px)';
    }
  }

  // Add event listeners to hamburger menu.
  if ('addEventListener' in hamburger) { hamburger.addEventListener('click', hamburgerClickHandler); }
  if ('attachEvent' in hamburger) { hamburger.attachEvent('onclick', hamburgerClickHandler, false); }

})();