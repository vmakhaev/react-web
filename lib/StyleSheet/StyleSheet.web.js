/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * @providesModule ReactStyleSheet
 */
'use strict';

var _extendProperties = require('./extendProperties.web');

var _extendProperties2 = _interopRequireDefault(_extendProperties);

var _reference = require('./reference');

var _reference2 = _interopRequireDefault(_reference);

var _setDefaultStyle = require('./setDefaultStyle.web');

var _setDefaultStyle2 = _interopRequireDefault(_setDefaultStyle);

var _extendCreateElement2 = require('./extendCreateElement');

var _extendCreateElement3 = _interopRequireDefault(_extendCreateElement2);

var _flattenStyle = require('./flattenStyle.web');

var _flattenStyle2 = _interopRequireDefault(_flattenStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make React support array of style object like React Native


var inited = false;

var ROOT_CLASS_NAME = 'react-root';
var VIEW_CLASS_NAME = 'react-view';

var StyleSheet = {
  create: function create(styles) {
    return styles;
  },
  extendCreateElement: function extendCreateElement(React, nativeComponents) {
    (0, _extendCreateElement3.default)(React, function (style) {
      if (!inited) {
        inited = true;
        (0, _setDefaultStyle2.default)({
          reference: _reference2.default.getWidth(),
          rootClassName: ROOT_CLASS_NAME,
          viewClassName: VIEW_CLASS_NAME
        });
      }

      return (0, _flattenStyle2.default)(style, _extendProperties2.default);
    }, nativeComponents);
  },
  setReferenceWidth: _reference2.default.setWidth,
  rootClassName: ROOT_CLASS_NAME,
  viewClassName: VIEW_CLASS_NAME
};

module.exports = StyleSheet;