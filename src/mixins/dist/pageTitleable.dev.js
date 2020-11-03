"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getTitle = function getTitle(vm) {
  var title = vm.$options.title;

  if (title) {
    return typeof title === 'function' ? title.call(vm) : title;
  }
};

var _default = {
  created: function created() {
    var title = getTitle(this);

    if (title) {
      document.title = title;
    }
  }
};
exports["default"] = _default;