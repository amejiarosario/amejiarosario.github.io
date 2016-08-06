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

var searchButton = document.getElementById('search-modal');
if (searchButton) {
  searchButton.addEventListener('click', openModal);
}

function openModal() {
  var overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.style.display = 'block';
  }
}

function closeModal() {
  var overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

var closeOverlay = document.getElementById('close-search-overlay');
if (closeOverlay) {
  closeOverlay.addEventListener('click', closeModal);
}

// Onload scripts
window.onload = function () {
  loadSearch();
}
