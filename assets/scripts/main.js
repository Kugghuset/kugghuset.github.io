(function () {
  'use strict'
  
  /**
   * Sets the transformProp to whatever the current webbrowser should work with.
   * 
   * Credit to user hitesh kumar on StackOverflow
   * http://stackoverflow.com/a/31539834/3593017
   */
  var transformProp = (function () {
    var testEl = document.createElement('div');
    if (testEl.style.transform == null) {
      var vendors = ['Webkit', 'Moz', 'ms'];
      for (var i = 0; i < vendors.length; i++) {
        var vendor = vendors[i];
        if (testEl.style[vendor + 'Transform'] !== undefined) {
          testEl = null;
          return vendor + 'Transform';
        }
      }
    }
    testEl = null;
    return 'transform';
  })();
  
  var hamburger = document.getElementById('hamburger');
  var pushmenu = document.getElementById('pushmenu');

  function hamburgerClickHandler(e) {
    if (/ open|open /g.test(pushmenu.className)) {
      pushmenu.className = pushmenu.className.replace(/open/, '');
      document.body.style[transformProp] = 'translateX(0)';
      // if (transformProp === 'msTransform')
    } else {
      pushmenu.className += ' open';
      document.body.style[transformProp] = 'translateX(-250px)';
      // if (transformProp === 'msTransform')
    }
  }
  
  // Both may exist, and this attaches only one of them.
  if ('addEventListener' in hamburger) {
    hamburger.addEventListener('click', hamburgerClickHandler);
  } else if ('attachEvent' in hamburger) {
    hamburger.attachEvent('onclick', hamburgerClickHandler, false);
  }
})();