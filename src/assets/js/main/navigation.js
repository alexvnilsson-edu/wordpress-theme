import { gsap, TweenMax } from "gsap/gsap-core";
import { CSSPlugin } from "gsap/CSSPlugin";

const opts = {
  viewPort: {
    mobileWidth: 992,
  },
  class: {
    collapsed: "collapsed",
    expanded: "expanded",
  },
  attribute: {
    isPendingCollapse: "data-is-pending-collapse",
    expanded: "data-expanded",
  },
  icons: {
    menu: "menu",
    close: "close",
    expandMore: "expand_more",
    expandLess: "expand_less",
  },
};

export class NavigationMobile {
  /**
   *
   * @param {Navigation} parent
   */
  constructor(parent) {
    this.parent = parent;
    this.primaryMenu = document.querySelector("nav.navbar.primary");
    this.primaryMenuExpander = this.primaryMenu.querySelector("a.menu-expander");

    this.primaryMenuExpander.addEventListener("click", event => this.onExpanderClick(event));

    document
      .querySelectorAll("div.nav-wrapper.mobile ul.nav li.item ul.nav-descendants")
      .forEach(e => {
        const pageItem = e.closest("li.parent");

        pageItem.addEventListener("click", event => this.onItemClick(pageItem, event));
      });
  }

  /**
   *
   * @param {Element} parent
   * @param {object} icons
   * @param {string} icons.expand
   * @param {string} icons.collapse
   * @param {string} selector
   */
  setExpanderIcon(
    parent,
    icons = { expand: opts.icons.menu, collapse: opts.icons.close },
    selector = "i.icon"
  ) {
    const icon = parent.querySelector(selector);
    icon.innerHTML = parent.hasAttribute(opts.attribute.expanded)
      ? icons.collapse
      : icons.expand;
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
    this.primaryMenu.setAttribute(opts.attribute.expanded, "true");

    this.setExpanderIcon(this.primaryMenu);
  }

  setMenuCollapsed() {
    this.primaryMenu.classList.remove("expanded");
    this.primaryMenu.removeAttribute(opts.attribute.expanded);

    this.setExpanderIcon(this.primaryMenu);

    if (this.parent.state.expandedItem) {
      this.setItemCollapsed(this.parent.state.expandedItem);
    }
  }

  /**
   *
   * @param {Element} pageItem
   */
  setItemExpanded(pageItem) {
    pageItem.setAttribute(opts.attribute.expanded, "true");
    pageItem.classList.add("expanded");

    this.setExpanderIcon(
      pageItem,
      { expand: opts.icons.expandMore, collapse: opts.icons.expandLess },
      "a.link i.icon"
    );

    this.parent.state.expandedItem = pageItem;
  }

  /**
   *
   * @param {Element} pageItem
   */
  setItemCollapsed(pageItem) {
    pageItem.removeAttribute(opts.attribute.expanded, "false");
    pageItem.classList.remove("expanded");

    this.setExpanderIcon(
      pageItem,
      { expand: opts.icons.expandMore, collapse: opts.icons.expandLess },
      "a.link i.icon"
    );

    this.parent.state.expandedItem = undefined;
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
      if (!pageItem.hasAttribute(opts.attribute.expanded)) {
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

  onExpanderClick(event) {
    if (!this.primaryMenu.hasAttribute(opts.attribute.expanded)) {
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
      isMobile: false,
      expandedItem: undefined,
    };
    this.menu = document.querySelector("nav.navbar.primary .nav-wrapper");
    this.mobile = new NavigationMobile(this);
    gsap.registerPlugin(CSSPlugin);

    this._bindGlobalEvents();
    this._bindItemEvents();

    this.setMenuForViewport();
  }

  _bindGlobalEvents() {
    window.onresize = event => this.onWindowResize(event);
    document.addEventListener("keyup", event => this.onDocumentKeyUp(event));
  }

  _bindItemEvents() {
    document
      .querySelectorAll("div.nav-wrapper:not(.mobile) ul.nav li.item ul.nav-descendants")
      .forEach(e => {
        const pageItem = e.closest("li.parent");
        this._bindItemClickEvents(pageItem);

        pageItem.addEventListener(
          "mouseover",
          event => !this.state.isMobile && this.onItemMouseOver(pageItem, event)
        );
        pageItem.addEventListener(
          "mouseleave",
          event => !this.state.isMobile && this.onItemMouseLeave(pageItem, event)
        );
        pageItem.addEventListener(
          "focusin",
          event => !this.state.isMobile && this.onItemFocusIn(pageItem, event)
        );
        pageItem.addEventListener(
          "focusout",
          event => !this.state.isMobile && this.onItemFocusOut(pageItem, event)
        );
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
      event =>
        !this.state.isMobile
          ? this.onItemLinkClick(pageItemLink, pageItem, event)
          : this.mobile.onItemClick(pageItem, event),
      { capture: true, passive: false }
    );
  }

  /**
   * Set menu-type depending on viewport.
   */
  setMenuForViewport() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    if (vw < opts.viewPort.mobileWidth) {
      this.state.isMobile = true;
      if (!this.menu.classList.contains("mobile")) {
        this.menu.classList.add("mobile");
      }
    } else {
      this.state.isMobile = false;
      if (this.menu.classList.contains("mobile")) {
        this.menu.classList.remove("mobile");
      }
    }
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
   * @param {UIEvent} event
   */
  onWindowResize(event) {
    this.setMenuForViewport();
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
