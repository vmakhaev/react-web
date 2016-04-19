/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * @providesModule ReactSegmentedControl
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactView = require('../View/View.web');

var _ReactView2 = _interopRequireDefault(_ReactView);

var _ReactText = require('../Text/Text.web');

var _ReactText2 = _interopRequireDefault(_ReactText);

var _ReactStyleSheet = require('../StyleSheet/StyleSheet.web');

var _ReactStyleSheet2 = _interopRequireDefault(_ReactStyleSheet);

var _NativeMethodsMixin = require('../Utilties/NativeMethodsMixin.web');

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SegmentedControl = function (_React$Component) {
  _inherits(SegmentedControl, _React$Component);

  function SegmentedControl() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SegmentedControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SegmentedControl)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      selectedIndex: _this.props.selectedIndex,
      momentary: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SegmentedControl, [{
    key: '_onChange',
    value: function _onChange(value, index, event) {
      var _this2 = this;

      if (this.state.selectedIndex == index) return;

      this.setState({
        selectedIndex: index
      });

      if (!event) {
        event = {
          nativeEvent: {}
        };
      }
      // shim the value
      event.nativeEvent.value = value;
      event.nativeEvent.selectedSegmentIndex = index;
      this.props.onChange && this.props.onChange(event);
      this.props.onValueChange && this.props.onValueChange(event.nativeEvent.value);

      if (this.props.momentary) {
        setTimeout(function () {
          return _this2.setState({
            selectedIndex: null
          });
        }, 300);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props;

      var items = props.values.map(function (value, index) {
        return _react2.default.createElement(
          _ReactView2.default,
          { key: index, style: [styles.segmentedControlItem, props.tintColor ? { borderColor: props.tintColor } : null, _this3.state.selectedIndex === index ? [styles.segmentedControlItemSelected, props.tintColor ? { backgroundColor: props.tintColor } : null] : null, index === 0 ? styles.firstChild : styles.otherChild, index === props.values.length - 1 ? styles.lastChild : null] },
          _react2.default.createElement(
            _ReactText2.default,
            { style: [styles.segmentedControlText, props.tintColor ? {
                color: props.tintColor
              } : null, _this3.state.selectedIndex === index ? styles.segmentedControlTextSelected : null],
              onPress: props.enabled ? _this3._onChange.bind(_this3, value, index) : null },
            ' ',
            value,
            ' '
          )
        );
      });

      return _react2.default.createElement(
        _ReactView2.default,
        _extends({}, this.props, { style: [styles.segmentedControl, props.enabled ? null : styles.disable, this.props.style] }),
        items
      );
    }
  }]);

  return SegmentedControl;
}(_react2.default.Component);

SegmentedControl.propTypes = {
  /**
   * The labels for the control's segment buttons, in order.
   */
  values: _react.PropTypes.arrayOf(_react.PropTypes.string),

  /**
   * The index in `props.values` of the segment to be pre-selected
   */
  selectedIndex: _react.PropTypes.number,

  /**
   * Callback that is called when the user taps a segment;
   * passes the segment's value as an argument
   */
  onValueChange: _react.PropTypes.func,

  /**
   * Callback that is called when the user taps a segment;
   * passes the event as an argument
   */
  onChange: _react.PropTypes.func,

  /**
   * If false the user won't be able to interact with the control.
   * Default value is true.
   */
  enabled: _react.PropTypes.bool,

  /**
   * Accent color of the control.
   */
  tintColor: _react.PropTypes.string,

  /**
   * If true, then selecting a segment won't persist visually.
   * The `onValueChange` callback will still work as expected.
   */
  momentary: _react.PropTypes.bool
};
SegmentedControl.defaultProps = {
  values: [],
  enabled: true
};
;

var defaultColor = '#007AFF';

var styles = _ReactStyleSheet2.default.create({
  segmentedControl: {
    height: 28,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  segmentedControlItem: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: defaultColor,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1
  },
  segmentedControlItemSelected: {
    backgroundColor: defaultColor
  },
  segmentedControlText: {
    color: defaultColor,
    fontSize: 12,
    lineHeight: 12,
    padding: '7 0',
    textAlign: 'center'
  },
  segmentedControlTextSelected: {
    color: 'white'
  },
  disable: {
    opacity: 0.5
  },
  firstChild: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderRightWidth: 0
  },
  otherChild: {
    borderRightWidth: 0
  },
  lastChild: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderRightWidth: 1
  }
});

(0, _reactMixin2.default)(SegmentedControl.prototype, _NativeMethodsMixin.Mixin);
(0, _autobindDecorator2.default)(SegmentedControl);

SegmentedControl.isReactNativeComponent = true;

exports.default = SegmentedControl;