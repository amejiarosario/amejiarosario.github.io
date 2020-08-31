"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// wait for everything to be loaded
document.addEventListener("DOMContentLoaded", function () {
  try {
    var ScrollSpy = /*#__PURE__*/function () {
      function ScrollSpy() {
        var activeClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'active';
        var tocLevelPrefixClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.toc-level-';
        var maxLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;

        _classCallCheck(this, ScrollSpy);

        this.tocTree = [];
        this.currentActives = [];
        this.tocLevelPrefixClass = tocLevelPrefixClass;
        this.activeClass = activeClass;
        this.maxLevel = maxLevel;
      }

      _createClass(ScrollSpy, [{
        key: "getTocItems",
        value: function getTocItems() {
          // revese needed for easy find last on #setActiveClasses
          var traverseTree = function traverseTree(el) {
            var _el$children$;

            return Array.from((el === null || el === void 0 ? void 0 : (_el$children$ = el.children[1]) === null || _el$children$ === void 0 ? void 0 : _el$children$.children) || []).map(function (child) {
              return {
                item: child,
                children: traverseTree(child)
              };
            }).reverse();
          }; // .toc-child > .toc-item


          this.tocTree = Array.from(document.querySelectorAll('.toc > .toc-item')).map(function (item) {
            return {
              item: item,
              children: traverseTree(item)
            };
          }).reverse();
        }
      }, {
        key: "calculateDocItemsOffsets",
        value: function calculateDocItemsOffsets() {
          var traverseTree = function traverseTree(root) {
            root.forEach(function (_ref) {
              var item = _ref.item,
                  children = _ref.children;
              var id = item.querySelector('.toc-link').href.split('#')[1];
              var el = document.getElementById(decodeURIComponent(id)); // in case of emoji was used

              var offset = el.offsetTop - 1;
              item.setAttribute('data-offset', offset);
              traverseTree(children);
            });
          };

          traverseTree(this.tocTree);
        }
      }, {
        key: "setActiveClasses",
        value: function setActiveClasses() {
          var _this = this;

          this.removeCurrentClasses();
          var current = getScrollY();

          var traverseTree = function traverseTree(root) {
            var index = root.findIndex(function (d) {
              return current >= Number(d.item.getAttribute('data-offset'));
            }); // console.log({index, root})

            if (index >= 0) {
              var _root$index = root[index],
                  item = _root$index.item,
                  children = _root$index.children;
              var link = item.querySelector('.toc-link');
              item.classList.add(_this.activeClass); // li

              link.classList.add(_this.activeClass); // a

              _this.currentActives.push(item, link);

              traverseTree(children);
            }
          };

          traverseTree(this.tocTree);
        }
      }, {
        key: "removeCurrentClasses",
        value: function removeCurrentClasses() {
          var _this2 = this;

          this.currentActives.forEach(function (el) {
            return el.classList.remove(_this2.activeClass);
          });
          this.currentActives = [];
        }
      }]);

      return ScrollSpy;
    }();

    var scrollSpy = new ScrollSpy();
    scrollSpy.getTocItems();
    scrollSpy.calculateDocItemsOffsets();
    window.addEventListener("scroll", function () {
      return scrollSpy.setActiveClasses();
    });
    window.addEventListener("resize", function () {
      return scrollSpy.calculateDocItemsOffsets();
    });
  } catch (error) {
    console.info(error);
  }
});