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

export class NavigationMobile {
  constructor() {
    this.primaryMenu = document.querySelector("nav.navbar.primary");
    this.primaryMenuExpander = this.primaryMenu.querySelector("a.menu-expander");

    this.primaryMenuExpander.addEventListener("click", event => this.onClick(event));

    document
      .querySelectorAll("div.nav-wrapper.mobile ul.nav li.item ul.nav-descendants")
      .forEach(e => {
        const pageItem = e.closest("li.parent");

        pageItem.addEventListener("click", event => this.onItemClick(pageItem, event));
      });
  }

  setMenuExpanded() {
    const wpAdminBar = document.querySelector("#wpadminbar");
    let primaryMenuClientTop = this.primaryMenu.clientTop;

    if (wpAdminBar) {
      primaryMenuClientTop += wpAdminBar.clientHeight;
    }

    this.primaryMenu.querySelector(
      "div.nav-wrapper.mobile"
    ).style.top = `${primaryMenuClientTop}px`;

    this.primaryMenu.classList.add("expanded");
    this.primaryMenu.setAttribute("data-expanded", "true");
  }

  setMenuCollapsed() {
    this.primaryMenu.classList.remove("expanded");
    this.primaryMenu.removeAttribute("data-expanded");
  }

  /**
   *
   * @param {Element} pageItem
   */
  setItemExpanded(pageItem) {
    pageItem.setAttribute("data-expanded", "true");
    pageItem.classList.add("expanded");
  }

  /**
   *
   * @param {Element} pageItem
   */
  setItemCollapsed(pageItem) {
    pageItem.removeAttribute("data-expanded", "false");
    pageItem.classList.remove("expanded");
  }

  /**
   *
   * @param {Element} pageItem
   * @param {MouseEvent} event
   */
  onItemClick(pageItem, event) {
    const target = event.target;
    const descendantMenu = target.closest("ul.nav-descendants");

    if (!descendantMenu) {
      // Om jag inte kan hitta någon ul.nav-descendants ovanför elementet, anta högsta nivån.
      if (!pageItem.hasAttribute("data-expanded")) {
        this.setItemExpanded(pageItem);
      } else {
        this.setItemCollapsed(pageItem);
      }

      event.preventDefault();
      event.stopPropagation();
    } else {
      // Om jag hittar ul.nav-descendants ovanför elementet, anta underliggande nivå.
    }
  }

  onClick(event) {
    if (!this.primaryMenu.hasAttribute("data-expanded")) {
      this.setMenuExpanded();
    } else {
      this.setMenuCollapsed();
    }

    event.preventDefault();
    event.stopPropagation();
  }
}

export class Navigation {
  constructor() {
    this.animations = {};
    this.state = {
      expandedItem: undefined,
    };
    this.mobile = new NavigationMobile();
    gsap.registerPlugin(CSSPlugin);

    this._bindGlobalEvents();
    this._bindItemEvents();
  }

  _bindGlobalEvents() {
    document.addEventListener("keyup", event => this.onDocumentKeyUp(event));
  }

  _bindItemEvents() {
    document
      .querySelectorAll("div.nav-wrapper:not(.mobile) ul.nav li.item ul.nav-descendants")
      .forEach(e => {
        const pageItem = e.closest("li.parent");
        this._bindItemClickEvents(pageItem);

        pageItem.addEventListener("mouseover", event => this.onItemMouseOver(pageItem, event));
        pageItem.addEventListener("mouseleave", event =>
          this.onItemMouseLeave(pageItem, event)
        );
        pageItem.addEventListener("focusin", event => this.onItemFocusIn(pageItem, event));
        pageItem.addEventListener("focusout", event => this.onItemFocusOut(pageItem, event));
      });

    document.addEventListener("keypress", event => {
      console.log(event);
    });
  }

  /**
   * Bind events for elements.
   *
   * @param {Element} pageItem Menu item instance.
   */
  _bindItemClickEvents(pageItem) {
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
      this.state.expandedItem = pageItem;
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
      this.state.expandedItem = undefined;
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
   * @param {KeyboardEvent} event
   */
  onDocumentKeyUp(event) {
    if (event && event.key === "Escape") {
      if (this.state.expandedItem !== undefined) {
        this.setCollapsed(this.state.expandedItem);
      }
    }
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
  onItemMouseOver(pageItem, event) {
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
  onItemMouseLeave(pageItem, event) {
    if (!pageItem.hasAttribute(opts.attribute.isPendingCollapse)) {
      this.setPendingCollapse(
        pageItem,
        setTimeout(() => this.onItemMouseLeaveDelayed(pageItem), 250)
      );
    }
  }

  /**
   *
   * @param {Element} pageItem
   */
  onItemMouseLeaveDelayed(pageItem) {
    if (this.canCollapse(pageItem)) {
      this.setCollapsed(pageItem);
    }
  }

  /**
   *
   * @param {Element} pageItem
   * @param {FocusEvent} event
   */
  onItemFocusIn(pageItem, event) {
    if (this.canCollapse(pageItem)) {
      this.cancelPendingCollapse(pageItem);
    }

    this.setExpanded(pageItem);
  }

  /**
   *
   * @param {Element} pageItem
   * @param {FocusEvent} event
   */
  onItemFocusOut(pageItem, event) {
    if (!pageItem.hasAttribute(opts.attribute.isPendingCollapse)) {
      this.setPendingCollapse(
        pageItem,
        setTimeout(() => this.onItemMouseLeaveDelayed(pageItem), 250)
      );
    }
  }
}
