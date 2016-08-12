// GA: Global functions
function createFunctionWithTimeout(callback, opt_timeout) {
  var called = false;

  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }
  setTimeout(fn, opt_timeout || 1000);
  return fn;
}

var track = function(url, category, internal) {
  category = category || 'outbound';
  ga('send', 'event', category, 'click', url, {
    'transport': 'beacon',
    'hitCallback': function() {
      if(!internal){
        window.open(url, '_blank'); // new tab
        //  document.location = url; // same page
      }
    }
  });
}


// Overlay search button

// var searchButton = document.getElementById('search-modal');
// if (searchButton) {
//   searchButton.addEventListener('click', openModal);
// }
//
// function openModal() {
//   var overlay = document.getElementById('search-overlay');
//   if (overlay) {
//     overlay.style.display = 'block';
//   }
// }
//
// function closeModal() {
//   var overlay = document.getElementById('search-overlay');
//   if (overlay) {
//     overlay.style.display = 'none';
//   }
// }
//
// var closeOverlay = document.getElementById('close-search-overlay');
// if (closeOverlay) {
//   closeOverlay.addEventListener('click', closeModal);
// }

function loadOverlay() {
  var body = document.body,
    overlay = document.querySelector('.overlay'),
    overlayBtts = document.querySelectorAll('a[class$="overlay"]');

  [].forEach.call(overlayBtts, function(btt) {

    btt.addEventListener('click', function() {

      /* Detect the button class name */
      var overlayOpen = this.className === 'open-overlay';

      /* Toggle the aria-hidden state on the overlay and the
       no-scroll class on the body */
      overlay.setAttribute('aria-hidden', !overlayOpen);
      body.classList.toggle('noscroll', overlayOpen);

      /* On some mobile browser when the overlay was previously
       opened and scrolled, if you open it again it doesn't
       reset its scrollTop property */
      overlay.scrollTop = 0;

    }, false);

  });
}

// Onload scripts
window.onload = function () {
  loadSearch();
  loadOverlay();
}
