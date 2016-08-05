// GA: Global functions
"use strict";

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

var trackOutboundLink = function trackOutboundLink(url) {
  ga("send", "event", "outbound", "click", "url", url, {
    transport: "beacon",
    hitCallback: function hitCallback() {
      document.location = url;
    }
  });
};

var searchButton = document.getElementById("search-modal");
if (searchButton) {
  searchButton.addEventListener("click", openModal);
}

function openModal() {
  var overlay = document.getElementById("search-overlay");
  if (overlay) {
    overlay.style.display = "block";
  }
}

function closeModal() {
  var overlay = document.getElementById("search-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

var closeOverlay = document.getElementById("close-search-overlay");
if (closeOverlay) {
  closeOverlay.addEventListener("click", closeModal);
}