/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * @providesModule ReactTouchableOpacity
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ReactAnimated = require('../Animated/Animated.web');

var _ReactAnimated2 = _interopRequireDefault(_ReactAnimated);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _ReactTouchable = require('Touchable');

var _ReactTouchableWithoutFeedback = require('TouchableWithoutFeedback.web');

var _ReactTouchableWithoutFeedback2 = _interopRequireDefault(_ReactTouchableWithoutFeedback);

var _NativeMethodsMixin = require('../Utilties/NativeMethodsMixin.web');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var ensurePositiveDelayProps = require('ensurePositiveDelayProps');
var flattenStyle = require('../StyleSheet/flattenStyle.web');

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 * This is done without actually changing the view hierarchy, and in general is
 * easy to add to an app without weird side-effects.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableOpacity onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('image!myButton')}
 *       />
 *     </TouchableOpacity>
 *   );
 * },
 * ```
 */

var TouchableOpacity = function (_React$Component) {
  _inherits(TouchableOpacity, _React$Component);

  function TouchableOpacity() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TouchableOpacity);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TouchableOpacity)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = _extends({}, _this.touchableGetInitialState(), {
      anim: new _ReactAnimated2.default.Value(1)
    }), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TouchableOpacity, [{
    key: 'componentWillReceiveProps',


    // componentDidMount: function() {
    //   // ensurePositiveDelayProps(this.props);
    // },

    value: function componentWillReceiveProps(nextProps) {
      // ensurePositiveDelayProps(nextProps);
    }
  }, {
    key: 'setOpacityTo',
    value: function setOpacityTo(value) {
      _ReactAnimated2.default.timing(this.state.anim, { toValue: value, duration: 150 }).start();
    }

    /**
     * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
     * defined on your component.
     */

  }, {
    key: 'touchableHandleActivePressIn',
    value: function touchableHandleActivePressIn(e) {
      this.clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
      this._opacityActive();
      this.props.onPressIn && this.props.onPressIn(e);
    }
  }, {
    key: 'touchableHandleActivePressOut',
    value: function touchableHandleActivePressOut(e) {
      if (!this._hideTimeout) {
        this._opacityInactive();
      }
      this.props.onPressOut && this.props.onPressOut(e);
    }
  }, {
    key: 'touchableHandlePress',
    value: function touchableHandlePress(e) {
      this.clearTimeout(this._hideTimeout);
      this._opacityActive();
      this._hideTimeout = this.setTimeout(this._opacityInactive, this.props.delayPressOut || 100);
      this.props.onPress && this.props.onPress(e);
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
      return this.props.delayPressOut;
    }
  }, {
    key: '_opacityActive',
    value: function _opacityActive() {
      this.setOpacityTo(this.props.activeOpacity);
    }
  }, {
    key: '_opacityInactive',
    value: function _opacityInactive() {
      this.clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
      var childStyle = flattenStyle(this.props.style) || {};
      this.setOpacityTo(childStyle.opacity === undefined ? 1 : childStyle.opacity);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _ReactAnimated2.default.View,
        {
          accessible: true,
          accessibilityComponentType: this.props.accessibilityComponentType,
          accessibilityTraits: this.props.accessibilityTraits,
          style: [this.props.style, { opacity: this.state.anim }],
          testID: this.props.testID,
          onLayout: this.props.onLayout,
          onStartShouldSetResponder: this.touchableHandleStartShouldSetResponder,
          onResponderTerminationRequest: this.touchableHandleResponderTerminationRequest,
          onResponderGrant: this.touchableHandleResponderGrant,
          onResponderMove: this.touchableHandleResponderMove,
          onResponderRelease: this.touchableHandleResponderRelease,
          onResponderTerminate: this.touchableHandleResponderTerminate },
        this.props.children
      );
    }
  }]);

  return TouchableOpacity;
}(_react2.default.Component);

TouchableOpacity.propTypes = _extends({}, _ReactTouchableWithoutFeedback2.default.propTypes, {
  /**
   * Determines what the opacity of the wrapped view should be when touch is
   * active.
   */
  activeOpacity: _react2.default.PropTypes.number
});
TouchableOpacity.defaultProps = {
  activeOpacity: 0.2
};
;

/**
 * When the scroll view is disabled, this defines how far your touch may move
 * off of the button, before deactivating the button. Once deactivated, try
 * moving it back and you'll see that the button is once again reactivated!
 * Move it back and forth several times while the scroll view is disabled.
 */
var PRESS_RECT_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

(0, _reactMixin2.default)(TouchableOpacity.prototype, _reactTimerMixin2.default);
(0, _reactMixin2.default)(TouchableOpacity.prototype, _ReactTouchable.Mixin);
(0, _reactMixin2.default)(TouchableOpacity.prototype, _NativeMethodsMixin.Mixin);
(0, _autobindDecorator2.default)(TouchableOpacity);

module.exports = TouchableOpacity;