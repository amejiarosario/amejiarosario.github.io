console.log('hello')

class ScrollSpy {
  tocItemsByLevels = [];
  tocTree = [];
  docItems = [];
  currentActives = [];

  constructor(activeClass = 'active', tocLevelPrefixClass = '.toc-level-', maxLevel = 6) {
    this.tocLevelPrefixClass = tocLevelPrefixClass;
    this.activeClass = activeClass;
    this.maxLevel = maxLevel;
  }

  getTocItems() {
    this.tocItemsByLevels = [];
    for (let level = 1; level <= this.maxLevel; level++) {
      this.tocItemsByLevels[level] = Array.from(document.querySelectorAll(`.toc-level-${level} > a`)).reverse();
    }

    // revese needed for easy find last on #setActiveClasses
    const traverseTree = el => Array.from((el?.children[1]?.children || [])).map(child => ({item: child, children: traverseTree(child) })).reverse(); // .toc-child > .toc-item
    this.tocTree = Array.from(document.querySelectorAll('.toc > .toc-item')).map(item => ({item, children: traverseTree(item) })).reverse();
  }

  calculateDocItemsOffsets() {
    for (let level = 1; level <= this.maxLevel; level++) {
      this.tocItemsByLevels[level].forEach((el) => {
        // console.log({level, el});
        const id = el.href.split('#')[1];
        const doc = document.getElementById(decodeURIComponent(id)); // in case of emoji was used
        // console.log({id, doc})
        const offset = doc.offsetTop - 1;
        // modify in-place
        // el.docOffsetTop = offset;
        el.setAttribute('data-doc-offset', offset);
      });
    }

    const traverseTree = (root) => {
      root.forEach(({item, children}) => {
        const id = item.querySelector('.toc-link').href.split('#')[1];
        const el = document.getElementById(decodeURIComponent(id)); // in case of emoji was used
        const offset = el.offsetTop - 1;
        item.setAttribute('data-offset', offset);

        traverseTree(children);
      });
    }
    traverseTree(this.tocTree);
  }

  setActiveClasses() {
    this.removeCurrentClasses();
    const current = getScrollY();

    // for (let level = 1; level <= this.maxLevel; level++) {
    //   const doc = this.tocItemsByLevels[level].find((el) => {
    //     const offset = Number(el.getAttribute('data-doc-offset'));
    //     // console.log({level, el, offset, current});
    //     return current >= offset;
    //   });
    //   if (doc) {
    //     const parent = doc.closest('.toc-level-2');
    //     doc.classList.add(this.activeClass);
    //     parent.classList.add(this.activeClass);
    //     this.currentActives.push(doc, parent);
    //   }
    // }

    const traverseTree = (root) => {
      const index = root.findIndex(d => current >= Number(d.item.getAttribute('data-offset')));
      console.log({index, root})
      if (index >= 0) {
        const {item, children} = root[index];
        const link = item.querySelector('.toc-link');
        item.classList.add(this.activeClass); // li
        link.classList.add(this.activeClass); // a
        this.currentActives.push(item, link);
        traverseTree(children);
      }
    }
    traverseTree(this.tocTree);
  }

  removeCurrentClasses() {
    this.currentActives.forEach(el => el.classList.remove(this.activeClass));
    this.currentActives = [];
  }
}

const scrollSpy = new ScrollSpy();

// wait for everything to be loaded
document.addEventListener("DOMContentLoaded", (event) => {
  scrollSpy.getTocItems();
  scrollSpy.calculateDocItemsOffsets();

  window.addEventListener("scroll", () => scrollSpy.setActiveClasses());
  window.addEventListener("resize", () => scrollSpy.calculateDocItemsOffsets());
});
