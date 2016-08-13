// Make an element scrollable from `sticky-element--start` to `sticky-element--end`
// it takes into account elements height and offset
"use strict";

(function stikyElement() {
  "use strict";

  var elStart, elEnd, elStartTop, elementsHeight, elEndTop;
  var fixedClass = "sticky-element--fixed";

  elStart = document.getElementsByClassName("sticky-element--start")[0];
  elEnd = document.getElementsByClassName("sticky-element--end")[0];

  if (!elStart && !elEndTop) {
    return;
  }

  initialize();

  function initialize() {
    elStart = document.getElementsByClassName("sticky-element--start")[0];
    elEnd = document.getElementsByClassName("sticky-element--end")[0];

    elStart.classList.remove(fixedClass);

    elStartTop = elStart.offsetTop;
    elementsHeight = Array.from(elStart.children).map(function (el) {
      return el.clientHeight;
    }).reduce(function (x, y) {
      return x + y;
    });
    elEndTop = elEnd.offsetTop - elementsHeight - 100;

    setStickyClass();
  }

  function setStickyClass() {
    var scrollTop = document.body.scrollTop;

    if (scrollTop > elStartTop && scrollTop < elEndTop) {
      elStart.classList.add(fixedClass);
    } else {
      elStart.classList.remove(fixedClass);
    }
  }

  // executes only after 300 ms of inactivity
  function repaintStickyElement() {
    window.requestAnimationFrame(setStickyClass);
  };

  window.addEventListener("scroll", repaintStickyElement);
  window.addEventListener("resize", initialize);
})();

// back to top
(function backToTop() {
  var link = document.getElementById("back-to-top");

  if (!link) {
    return;
  }

  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.scrollTop = 0;
  });
})();

// Scrollspy
(function Scrollspy() {
  var links = document.querySelectorAll(".toc a");
  var timeout;

  if (!links) {
    return;
  }

  var toc = Array.from(links);
  var ids = toc.map(function (el) {
    return el.href.split("#")[1];
  }).reverse();
  var offsets;
  var activeClass = "active";

  initialize();

  function setActiveClass() {
    var scrollTop = document.body.scrollTop;

    var current = offsets.find(function (element, index) {
      return element <= scrollTop;
    });

    var index = offsets.indexOf(current);
    // console.log(scrollTop, current, ids[index]);

    // remove active from all elements
    document.querySelectorAll(".toc a").forEach(function (el) {
      el.closest(".toc-item").classList.remove(activeClass);
      el.classList.remove(activeClass);
    });

    // add class to only the on matching
    document.querySelectorAll(".toc a[href=\"#" + ids[index] + "\"]").forEach(function (el) {
      el.closest(".toc-item").classList.add(activeClass);
      el.classList.add(activeClass);
      // select the parte
      try {
        el.closest(".toc-child").closest(".toc-item").classList.add(activeClass);
        // el.closest('ol').closest('li').childNodes[0].classList.add(activeClass);
      } catch (e) {}
    });
  }

  function initialize() {
    offsets = ids.map(function (id) {
      return document.getElementById(id).offsetTop - 1;
    });
    setActiveClass();
  }

  function executeSpyScroll() {
    if (timeout) {
      clearTimeout(timeout);
    }

    setTimeout(function () {
      setActiveClass();
    }, 300);
  }

  window.addEventListener("scroll", executeSpyScroll);
  window.addEventListener("resize", initialize);
  // console.log(ids, offsets);
})();