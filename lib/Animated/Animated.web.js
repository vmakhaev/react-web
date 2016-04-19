/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @providesModule ReactAnimated
 * 
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AnimatedImplementation = require('./AnimatedImplementation');

var _AnimatedImplementation2 = _interopRequireDefault(_AnimatedImplementation);

var _ReactImage = require('../Image/Image.web');

var _ReactImage2 = _interopRequireDefault(_ReactImage);

var _ReactText = require('../Text/Text.web');

var _ReactText2 = _interopRequireDefault(_ReactText);

var _ReactView = require('../View/View.web');

var _ReactView2 = _interopRequireDefault(_ReactView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({}, _AnimatedImplementation2.default, {
  View: _AnimatedImplementation2.default.createAnimatedComponent(_ReactView2.default),
  Text: _AnimatedImplementation2.default.createAnimatedComponent(_ReactText2.default),
  Image: _AnimatedImplementation2.default.createAnimatedComponent(_ReactImage2.default)
});