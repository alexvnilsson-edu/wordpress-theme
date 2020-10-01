const opts = {
  class: {
    collapsed: "collapsed",
    expanded: "expanded",
  },
  attribute: {
    isPendingCollapse: "data-is-pending-collapse",
  },
};

const nav = {
  animations: {},
  init() {
    console.log("[Navigation] Init.");

    document.querySelectorAll("ul.children").forEach(e => {
      const pageItem = e.closest("li.page_item_has_children");

      pageItem.addEventListener("mouseover", () => this.onMouseOver(pageItem));
      pageItem.addEventListener("mouseleave", () => this.onMouseLeave(pageItem));
    });
  },

  /**
   * Expand page item sub-menu.
   *
   * @param {Element} pageItem
   */
  setExpanded(pageItem) {
    anime.remove(pageItem);

    if (!pageItem.classList.contains(opts.class.expanded)) {
      // const animationId = new Date().getTime();

      pageItem.classList.add(opts.class.expanded);
      this.cancelPendingCollapse(pageItem);

      this.animations[pageItem] = anime({
        targets: pageItem.querySelector("ul.children"),
        opacity: "0",
        keyframes: [
          { opacity: 0, scaleX: 0, scaleY: 0, translateX: "100%", translateY: "-100%" },
          {
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            translateX: "0%",
            translateY: "0%",
          },
        ],
        duration: 300,
        easing: "easeInOutQuad",
        complete: animation => {
          animation.pause();
        },
      });
    }
  },

  /**
   * Collapse page item sub-menu.
   *
   * @param {Element} pageItem
   */
  setCollapsed(pageItem) {
    anime.remove(pageItem);

    if (pageItem.classList.contains(opts.class.expanded)) {
      pageItem.classList.remove(opts.class.expanded);
      pageItem.removeAttribute(opts.attribute.isPendingCollapse);

      anime({
        targets: pageItem.querySelector("ul.children"),
        opacity: "1",
        keyframes: [{ opacity: 1 }, { opacity: 0 }],
        duration: 500,
        easing: "easeInOutQuad",
        complete: animation => {
          animation.pause();
        },
      });
    }
  },

  /**
   *
   * @param {Element} pageItem
   * @param {Number} timeoutId
   */
  setPendingCollapse(pageItem, timeoutId) {
    if (!pageItem.hasAttribute(opts.attribute.isPendingCollapse)) {
      pageItem.setAttribute(opts.attribute.isPendingCollapse, timeoutId);
    }
  },

  /**
   *
   * @param {Element} pageItem
   */
  cancelPendingCollapse(pageItem) {
    if (pageItem.hasAttribute(opts.attribute.isPendingCollapse)) {
      const timeoutId = pageItem.getAttribute(opts.attribute.isPendingCollapse);
      clearTimeout(timeoutId);

      pageItem.removeAttribute(opts.attribute.isPendingCollapse);
    }
  },

  /**
   *
   * @param {Element} pageItem
   */
  canCollapse(pageItem) {
    return pageItem.hasAttribute(opts.attribute.isPendingCollapse);
  },

  /**
   *
   * @param {Element} pageItem
   */
  onMouseOver(pageItem) {
    this.setExpanded(pageItem);
  },

  /**
   *
   * @param {Element} pageItem
   */
  onMouseLeave(pageItem) {
    if (!pageItem.hasAttribute(opts.attribute.isPendingCollapse)) {
      this.setPendingCollapse(
        pageItem,
        setTimeout(() => this.onMouseLeaveDelayed(pageItem), 250)
      );
    }
  },

  /**
   *
   * @param {Element} pageItem
   */
  onMouseLeaveDelayed(pageItem) {
    if (this.canCollapse(pageItem)) {
      this.setCollapsed(pageItem);
    }
  },
};

documentReady(() => nav.init());

// documentReady(() => {
// 	document.querySelectorAll("ul.children").forEach((e) => {
// 		const parentItem = e.closest("li.page_item.page_item_has_children");

// 		parentItem.classList.add(["collapsed"]);
// 		parentItem.addEventListener("mouseover", () => )
// 	});
// });