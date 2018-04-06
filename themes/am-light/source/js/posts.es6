// Make an element scrollable from `sticky-element--start` to `sticky-element--end`
// it takes into account elements height and offset
(function stikyElement() {
  var elStart, elEnd, elStartTop, elementsHeight, elEndTop;
  var fixedClass = 'sticky-element--fixed';

  elStart = document.getElementsByClassName('sticky-element--start')[0];
  elEnd = document.getElementsByClassName('sticky-element--end')[0];

  if(!elStart && !elEndTop) {
    return;
  }

  initialize();

  function initialize(){
    elStart = document.getElementsByClassName('sticky-element--start')[0];
    elEnd = document.getElementsByClassName('sticky-element--end')[0];

    elStart.classList.remove(fixedClass);

    elStartTop = elStart.offsetTop;
    elementsHeight = Array.from(elStart.children).map(el => el.clientHeight).reduce((x,y) => x+y);
    elEndTop = elEnd.offsetTop - elementsHeight - 100;

    setStickyClass();
  }

  function setStickyClass() {
    var scrollTop = getScrollY();

    if(scrollTop > elStartTop && scrollTop < elEndTop){
      elStart.classList.add(fixedClass);
    } else {
      elStart.classList.remove(fixedClass);
    }
  }

  // executes only after 300 ms of inactivity
  function repaintStickyElement() {
    window.requestAnimationFrame(setStickyClass);
  };

  window.addEventListener('scroll', repaintStickyElement);
  window.addEventListener('resize', initialize);
})();

// back to top
(function backToTop() {
  var link = document.getElementById('back-to-top');

  if(!link) {
    return;
  }

  link.addEventListener('click', function (e) {
    e.preventDefault();
    // document.body.scrollTop = 0;
    // window.scrollTo(0, 0);
    scrollBy(0, 6000);
  })
})();

// Scrollspy
(function Scrollspy() {
  var links = document.querySelectorAll('.toc a');
  var timeout;


  if(!links) {
    return;
  }

  var toc = Array.from(links);
  // var ids = toc.map(el => el.href.split('#')[1]).reverse();
  var ids = toc.map(el => el.getAttribute('href').split('#')[1]).reverse();
  var offsets;
  var activeClass = 'active';

  initialize();

  function setActiveClass(){
    var scrollTop = getScrollY();

    var current = offsets.find(function (element, index) {
    return element <= scrollTop
    });

    var index = offsets.indexOf(current);
    // console.log(scrollTop, current, ids[index]);

    // remove active from all elements
    document.querySelectorAll('.toc a').forEach(el => {
      el.closest('.toc-item').classList.remove(activeClass);
      el.classList.remove(activeClass);
    });

    // add class to only the on matching
    document.querySelectorAll(`.toc a[href="#${ids[index]}"]`).forEach(el => {
      el.closest('.toc-item').classList.add(activeClass);
      el.classList.add(activeClass);
      // select the parte
      try {
        el.closest('.toc-child').closest('.toc-item').classList.add(activeClass);
        // el.closest('ol').closest('li').childNodes[0].classList.add(activeClass);
      } catch (e) {

      }
    });
  }

  function initialize() {
    offsets = ids.map(id => document.getElementById(id).offsetTop - 1);
    setActiveClass();
  }

  function executeSpyScroll() {
    if(timeout){
      clearTimeout(timeout);
    }

    setTimeout(function () {
      setActiveClass()
    }, 300);
  }

  window.addEventListener('scroll', executeSpyScroll);
  window.addEventListener('resize', initialize);
  // console.log(ids, offsets);

})();

/**
 * Get current scroll y position
 */
function getScrollY() {
  return document.body.scrollTop ||  // deprecated
    window.scrollY ||
    window.pageYOffset; // IE11
}

/**
 * Scrolls to `baseY` in `duration` ms
 * @param baseY
 * @param duration
 */
function scrollBy(baseY, duration) {

  var initialY = getScrollY();
  // var y = initialY + distance;
  // var baseY = (initialY + y) * 0.5;
  var difference = initialY - baseY;
  var startTime = performance.now();

  function step() {
      var normalizedTime = (performance.now() - startTime) / duration;
      if (normalizedTime > 1) normalizedTime = 1;
      const newY = baseY + difference * Math.cos(normalizedTime * Math.PI);
      window.scrollTo(0, newY);
      if (normalizedTime < 1 && newY > 0) window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}