/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * @providesModule ReactTouchableWithoutFeedback
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../PanResponder/PanResponder.web');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactTouchable = require('Touchable');

var _ReactTouchable2 = _interopRequireDefault(_ReactTouchable);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * When the scroll view is disabled, this defines how far your touch may move
 * off of the button, before deactivating the button. Once deactivated, try
 * moving it back and you'll see that the button is once again reactivated!
 * Move it back and forth several times while the scroll view is disabled.
 */
var PRESS_RECT_OFFSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 30
};

/**
 * Do not use unless you have a very good reason. All the elements that
 * respond to press should have a visual feedback when touched. This is
 * one of the primary reason a "web" app doesn't feel "native".
 */

var TouchableWithoutFeedback = function (_React$Component) {
  _inherits(TouchableWithoutFeedback, _React$Component);

  function TouchableWithoutFeedback() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TouchableWithoutFeedback);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TouchableWithoutFeedback)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = _this.touchableGetInitialState(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TouchableWithoutFeedback, [{
    key: 'componentWillReceiveProps',


    // componentDidMount: function() {
    // ensurePositiveDelayProps(this.props);
    // },

    value: function componentWillReceiveProps(nextProps) {}
    // ensurePositiveDelayProps(nextProps);


    /**
     * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
     * defined on your component.
     */

  }, {
    key: 'touchableHandlePress',
    value: function touchableHandlePress(e) {
      this.props.onPress && this.props.onPress(e);
    }
  }, {
    key: 'touchableHandleActivePressIn',
    value: function touchableHandleActivePressIn(e) {
      this.props.onPressIn && this.props.onPressIn(e);
    }
  }, {
    key: 'touchableHandleActivePressOut',
    value: function touchableHandleActivePressOut(e) {
      this.props.onPressOut && this.props.onPressOut(e);
    }
  }, {
    key: 'touchableHandleLongPress',
    value: function touchableHandleLongPress(e) {
      this.props.onLongPress && this.props.onLongPress(e);
    }
  }, {
    key: 'touchableGetPressRectOffset',
    value: function touchableGetPressRectOffset() {
      return PRESS_RECT_OFFSET; // Always make sure to predeclare a constant!
    }
  }, {
    key: 'touchableGetHighlightDelayMS',
    value: function touchableGetHighlightDelayMS() {
      return this.props.delayPressIn || 0;
    }
  }, {
    key: 'touchableGetLongPressDelayMS',
    value: function touchableGetLongPressDelayMS() {
      return this.props.delayLongPress === 0 ? 0 : this.props.delayLongPress || 500;
    }
  }, {
    key: 'touchableGetPressOutDelayMS',
    value: function touchableGetPressOutDelayMS() {
      return this.props.delayPressOut || 0;
    }
  }, {
    key: 'render',
    value: function render() {
      // Note(avik): remove dynamic typecast once Flow has been upgraded
      return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
        onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
        onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
        onResponderGrant: this.touchableHandleResponderGrant,
        onResponderMove: this.touchableHandleResponderMove,
        onResponderRelease: this.touchableHandleResponderRelease,
        onResponderTerminate: this.touchableHandleResponderTerminate
      });
    }
  }]);

  return TouchableWithoutFeedback;
}(_react2.default.Component);

TouchableWithoutFeedback.propTypes = {
  /**
   * Called when the touch is released, but not if cancelled (e.g. by a scroll
   * that steals the responder lock).
   */
  onPress: _react2.default.PropTypes.func,
  onPressIn: _react2.default.PropTypes.func,
  onPressOut: _react2.default.PropTypes.func,

  onLongPress: _react2.default.PropTypes.func,

  /**
   * Delay in ms, from the start of the touch, before onPressIn is called.
   */
  delayPressIn: _react2.default.PropTypes.number,
  /**
   * Delay in ms, from the release of the touch, before onPressOut is called.
   */
  delayPressOut: _react2.default.PropTypes.number,
  /**
   * Delay in ms, from onPressIn, before onLongPress is called.
   */
  delayLongPress: _react2.default.PropTypes.number
};
;

(0, _reactMixin2.default)(TouchableWithoutFeedback.prototype, _ReactTouchable2.default.Mixin);
(0, _autobindDecorator2.default)(TouchableWithoutFeedback);

module.exports = TouchableWithoutFeedback;