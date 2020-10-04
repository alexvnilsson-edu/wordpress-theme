/**
 * localToGlobal
 *
 * @returns {number} rectangle
 */
Element.prototype.localToGlobal = function () {
  const _el = this;

  var target = _el,
    target_width = target.offsetWidth,
    target_height = target.offsetHeight,
    target_left = target.offsetLeft,
    target_top = target.offsetTop,
    gleft = 0,
    gtop = 0,
    rect = {};

  var moonwalk = function (_parent) {
    if (!!_parent) {
      gleft += _parent.offsetLeft;
      gtop += _parent.offsetTop;
      moonwalk(_parent.offsetParent);
    } else {
      return (rect = {
        top: target.offsetTop + gtop,
        left: target.offsetLeft + gleft,
        bottom: target.offsetTop + gtop + target_height,
        right: target.offsetLeft + gleft + target_width,
      });
    }
  };
  moonwalk(target.offsetParent);
  return rect;
};

/**
 * Fired when DOM is ready.
 *
 * @param {*} fn
 */
const documentReady = function (fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

module.exports = {
  documentReady,
};
