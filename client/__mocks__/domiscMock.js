/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
'use strict';

exports.mockHTMLElementProperties = function(props = {}) {
  Object.defineProperties(window.HTMLElement.prototype, {
    clientWidth: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).width) || props.clientWidth || 0;
      },
    },
    clientHeight: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).height) || props.clientHeight || 0;
      },
    },
    offsetLeft: {
      get: function() {
        return parseFloat(window.getComputedStyle(this).left) || props.offsetLeft || 0;
      },
    },
  });
};

exports.mockGetBoundingClientRect = function(props = {}) {
  window.HTMLElement.prototype.getBoundingClientRect = function() {
    return {
      x: parseFloat(window.getComputedStyle(this).marginLeft) || props.x || 0,
      y: parseFloat(window.getComputedStyle(this).marginTop) || props.y || 0,
      width: parseFloat(window.getComputedStyle(this).width) || props.width || 0,
      height: parseFloat(window.getComputedStyle(this).height) || props.height || 0,
      top: parseFloat(window.getComputedStyle(this).top) || props.top || 0,
      right: parseFloat(window.getComputedStyle(this).right) || props.right || 0,
      bottom: parseFloat(window.getComputedStyle(this).bottom) || props.bottom || 0,
      left: parseFloat(window.getComputedStyle(this).left) || props.left || 0,
      toJSON: '[MockBoundingClientRect]',
    };
  };
};

exports.mockWindowMethods = function() {
  window.scrollTo = () => {};
};
