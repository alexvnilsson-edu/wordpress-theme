import { gsap, TweenMax } from "gsap/gsap-core";
import { CSSPlugin } from "gsap/CSSPlugin";

const opts = {
  class: {
    collapsed: "collapsed",
    expanded: "expanded",
  },
  attribute: {
    isPendingCollapse: "data-is-pending-collapse",
  },
};

export class Navigation {
  constructor() {
    this.animations = {};
    gsap.registerPlugin(CSSPlugin);
  }
  init() {
    document.querySelectorAll("ul.nav-descendants").forEach(e => {
      const pageItem = e.closest("li.parent");

      this._bindClick(pageItem);

      pageItem.addEventListener("mouseover", event => this.onMouseOver(pageItem, event));
      pageItem.addEventListener("mouseleave", event => this.onMouseLeave(pageItem, event));
    });
  }

  /**
   * Bind events for elements.
   *
   * @param {Element} pageItem Menu item instance.
   */
  _bindClick(pageItem) {
    const pageItemLink = pageItem.querySelector("a.link");

    // pageItem.addEventListener("click", event => this.onClick(pageItem, event));
    pageItemLink.addEventListener(
      "click",
      event => this.onItemLinkClick(pageItemLink, pageItem, event),
      { capture: true, passive: false }
    );
  }

  /**
   *
   * @param {Element} pageItem
   */
  setDescendantExpandedAppearance(pageItem) {
    const descendantMenu = pageItem.querySelector("ul.nav-descendants");

    const viewPortRect = pageItem.localToGlobal(),
      clientHeight = pageItem.clientHeight,
      descendantTop = viewPortRect.top + clientHeight;

    descendantMenu.style.top = `${descendantTop}px`;

    gsap.fromTo(descendantMenu, { opacity: 0 }, { opacity: 1, duration: 0.05 });
  }

  /**
   *
   * @param {Element} pageItem
   */
  setDescendantCollapsedAppearance(pageItem) {
    const descendantMenu = pageItem.querySelector("ul.nav-descendants");
  }

  /**
   * Expand page item sub-menu.
   *
   * @param {Element} pageItem
   */
  setExpanded(pageItem) {
    if (!pageItem.classList.contains(opts.class.expanded)) {
      this.setDescendantExpandedAppearance(pageItem);
      pageItem.classList.add(opts.class.expanded);
      this.cancelPendingCollapse(pageItem);
    }
  }

  /**
   * Collapse page item sub-menu.
   *
   * @param {Element} pageItem
   */
  setCollapsed(pageItem) {
    if (pageItem.classList.contains(opts.class.expanded)) {
      this.setDescendantCollapsedAppearance(pageItem);
      pageItem.classList.remove(opts.class.expanded);
      pageItem.removeAttribute(opts.attribute.isPendingCollapse);
    }
  }

  /**
   *
   * @param {Element} pageItem
   * @param {Number} timeoutId
   */
  setPendingCollapse(pageItem, timeoutId) {
    if (!pageItem.hasAttribute(opts.attribute.isPendingCollapse)) {
      pageItem.setAttribute(opts.attribute.isPendingCollapse, timeoutId);
    }
  }

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
  }

  /**
   *
   * @param {Element} pageItem
   */
  canCollapse(pageItem) {
    return pageItem.hasAttribute(opts.attribute.isPendingCollapse);
  }

  /**
   *
   * @param {Element} pageItem Element of menu link.
   * @param {MouseEvent} event Event.
   */
  onClick(pageItem, event) {}

  /**
   * Menu link item clicked.
   *
   * @param {Element} pageItemLink Link-instance of menu item.
   * @param {Element} pageItem Element of menu link.
   * @param {MouseEvent} event Event.
   */
  onItemLinkClick(pageItemLink, pageItem, event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   *
   * @param {Element} pageItem
   * @param {MouseEvent} event
   */
  onMouseOver(pageItem, event) {
    if (this.canCollapse(pageItem)) {
      this.cancelPendingCollapse(pageItem);
    }

    this.setExpanded(pageItem);
  }

  /**
   *
   * @param {Element} pageItem
   * @param {MouseEvent} event
   */
  onMouseLeave(pageItem, event) {
    if (!pageItem.hasAttribute(opts.attribute.isPendingCollapse)) {
      this.setPendingCollapse(
        pageItem,
        setTimeout(() => this.onMouseLeaveDelayed(pageItem), 250)
      );
    }
  }

  /**
   *
   * @param {Element} pageItem
   */
  onMouseLeaveDelayed(pageItem) {
    if (this.canCollapse(pageItem)) {
      this.setCollapsed(pageItem);
    }
  }
}
