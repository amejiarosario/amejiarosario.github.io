"use strict";

// Make an element scrollable from `sticky-element--start` to `sticky-element--end`
// it takes into account elements height and offset
(function stikyElement() {
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
    var scrollTop = getScrollY();

    if (scrollTop > elStartTop && scrollTop < elEndTop) {
      elStart.classList.add(fixedClass);
    } else {
      elStart.classList.remove(fixedClass);
    }
  } // executes only after 300 ms of inactivity


  function repaintStickyElement() {
    window.requestAnimationFrame(setStickyClass);
  }

  window.addEventListener("scroll", repaintStickyElement);
  window.addEventListener("resize", initialize);
})(); // back to top


(function backToTop() {
  var link = document.getElementById("back-to-top");

  if (!link) {
    return;
  }

  link.addEventListener("click", function (e) {
    e.preventDefault(); // document.body.scrollTop = 0;
    // window.scrollTo(0, 0);

    scrollBy(0, 6000);
  });
})(); // // Scrollspy
// (function Scrollspy() {
//   var links = document.querySelectorAll('.toc a');
//   var timeout;
//   if(!links) {
//     return;
//   }
//   var toc = Array.from(links);
//   // var ids = toc.map(el => el.href.split('#')[1]).reverse();
//   var ids = toc.map(el => el.getAttribute('href').split('#')[1]).reverse();
//   var offsets;
//   var activeClass = 'active';
//   initialize();
//   function setActiveClass(){
//     var scrollTop = getScrollY();
//     var current = offsets.find(function (element) {
//       return element <= scrollTop
//     });
//     // console.log({scrollTop, current, offsets})
//     var index = offsets.indexOf(current);
//     // console.log(scrollTop, current, ids[index]);
//     // remove active from all elements
//     document.querySelectorAll('.toc a').forEach(el => {
//       el.closest('.toc-item').classList.remove(activeClass);
//       el.classList.remove(activeClass);
//     });
//     // add class to only the on matching
//     document.querySelectorAll(`.toc a[href="#${ids[index]}"]`).forEach(el => {
//       el.closest('.toc-item').classList.add(activeClass);
//       el.classList.add(activeClass);
//       // select the parte
//       try {
//         el.closest('.toc-child').closest('.toc-item').classList.add(activeClass);
//         // el.closest('ol').closest('li').childNodes[0].classList.add(activeClass);
//       } catch (e) {
//         console.warn(e, el)
//       }
//     });
//   }
//   function initialize() {
//     offsets = ids.map(id => document.getElementById(id).offsetTop - 1);
//     setActiveClass();
//   }
//   function executeSpyScroll() {
//     if(timeout){
//       clearTimeout(timeout);
//     }
//     setTimeout(function () {
//       setActiveClass()
//     }, 300);
//   }
//   window.addEventListener('scroll', executeSpyScroll);
//   window.addEventListener('resize', initialize);
//   // console.log(ids, offsets);
// })();
// (function newScrollSpy() {
//   var ScrollSpy = /** @class */ (function () {
//     function ScrollSpy(activeClass, tocLevelPrefixClass, maxLevel) {
//       this.tocItemsByLevels = [];
//       this.docItems = [];
//       this.currentActives = [];
//       this.tocLevelPrefixClass = tocLevelPrefixClass;
//       this.activeClass = activeClass;
//       this.maxLevel = maxLevel;
//     }
//     ScrollSpy.prototype.getTocItems = function () {
//       this.tocItemsByLevels = [];
//       for (var level = 1; level <= this.maxLevel; level++) {
//         this.tocItemsByLevels[level] = Array.from(
//           document.querySelectorAll(".toc-level-" + level)
//         ).reverse();
//       }
//     };
//     ScrollSpy.prototype.calculateDocItemsOffsets = function () {
//       for (var level = 1; level <= this.maxLevel; level++) {
//         this.tocItemsByLevels[level].forEach(function (el) {
//           var id = el.href.split("#")[1];
//           var doc = document.getElementById(id);
//           var offset = doc.offsetTop - 1;
//           // modify in-place
//           // el.docOffsetTop = offset;
//           el.setAttribute("data-doc-offset", offset);
//         });
//       }
//     };
//     ScrollSpy.prototype.removeActives = function () {
//       var _this = this;
//       this.currentActives.forEach(function (el) {
//         return el.classList.remove(_this.activeClass);
//       });
//       this.currentActives = [];
//     };
//     ScrollSpy.prototype.setActiveClasses = function () {
//       this.removeActives();
//       var current = getScrollY();
//       for (var level = 1; level <= this.maxLevel; level++) {
//         var doc = this.tocItemsByLevels[level].find(function (el) {
//           var offset = el.getAttribute("data-doc-offset");
//           return offset >= current;
//         });
//         doc.classList.add(this.activeClass);
//         this.currentActives.push(doc);
//       }
//     };
//     return ScrollSpy;
//   })();
//   // wait for everything to be loaded
//   document.addEventListener("DOMContentLoaded", (event) => {
//     const scrollSpy = new ScrollSpy();
//     scrollSpy.getTocItems();
//     window.addEventListener("scroll", scrollSpy.setActiveClasses);
//     window.addEventListener("resize", scrollSpy.calculateDocItemsOffsets);
//   });
// })();

/**
 * Get current scroll y position
 */


function getScrollY() {
  return document.body.scrollTop || // deprecated
  window.scrollY || window.pageYOffset; // IE11
}
/**
 * Scrolls to `baseY` in `duration` ms
 * @param baseY
 * @param duration
 */


function scrollBy(baseY, duration) {
  var initialY = getScrollY(); // var y = initialY + distance;
  // var baseY = (initialY + y) * 0.5;

  var difference = initialY - baseY;
  var startTime = performance.now();

  function step() {
    var normalizedTime = (performance.now() - startTime) / duration;
    if (normalizedTime > 1) normalizedTime = 1;
    var newY = baseY + difference * Math.cos(normalizedTime * Math.PI);
    window.scrollTo(0, newY);
    if (normalizedTime < 1 && newY > 0) window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
} // copy to clipboard


(function copyToClipboardMain() {
  // $$('.highlight').prepend((b = document.createElement('button'), b.classList.add('copy-btn'), b))
  var blocks = document.getElementsByClassName("highlight");

  var copyToClipboard = function copyToClipboard(e) {
    var parent = e.target.parentElement;
    var text = parent.querySelector(".code").innerText; // https://github.com/theme-next/hexo-theme-next/pull/234/files

    var ta = document.createElement("textarea");
    document.body.appendChild(ta);
    ta.style.position = "fixed";
    ta.style.top = 0;
    ta.style.left = 0;
    ta.value = text;
    ta.select();
    ta.focus();
    document.execCommand("copy");
    document.body.removeChild(ta);
    e.target.classList.add("checkMark");
  };

  Array.from(blocks).forEach(function (block) {
    var button = document.createElement("button");
    button.classList.add("copy-btn");
    block.prepend(button);
    button.addEventListener("click", copyToClipboard);
  });
})();