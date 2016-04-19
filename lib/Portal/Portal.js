/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @providesModule ReactPortal
 * 
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReactPlatform = require('../Platform/Platform.web');

var _ReactPlatform2 = _interopRequireDefault(_ReactPlatform);

var _ReactStyleSheet = require('../StyleSheet/StyleSheet.web');

var _ReactStyleSheet2 = _interopRequireDefault(_ReactStyleSheet);

var _ReactView = require('../View/View.web');

var _ReactView2 = _interopRequireDefault(_ReactView);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _portalRef;

// Unique identifiers for modals.
var lastUsedTag = 0;

/*
 * Note: Only intended for Android at the moment.  Just use Modal in your iOS
 * code.
 *
 * A container that renders all the modals on top of everything else in the application.
 *
 * Portal makes it possible for application code to pass modal views all the way up to
 * the root element created in `renderApplication`.
 *
 * Never use `<Portal>` in your code. There is only one Portal instance rendered
 * by the top-level `renderApplication`.
 */

var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Portal)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { modals: {} }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Portal, [{
    key: '_showModal',
    value: function _showModal(tag, component) {
      // We are about to open first modal, so Portal will appear.
      // Let's disable accessibility for background view on Android.
      if (this._getOpenModals().length === 0 && this.props.onModalVisibilityChanged) {
        this.props.onModalVisibilityChanged(true);
      }
      // This way state is chained through multiple calls to
      // _showModal, _closeModal correctly.
      this.setState(function (state) {
        var modals = state.modals;
        modals[tag] = component;
        return { modals: modals };
      });
    }
  }, {
    key: '_closeModal',
    value: function _closeModal(tag) {
      if (!this.state.modals.hasOwnProperty(tag)) {
        return;
      }
      // We are about to close last modal, so Portal will disappear.
      // Let's enable accessibility for application view on Android.
      if (this._getOpenModals().length === 1 && this.props.onModalVisibilityChanged) {
        this.props.onModalVisibilityChanged(false);
      }
      // This way state is chained through multiple calls to
      // _showModal, _closeModal correctly.
      this.setState(function (state) {
        var modals = state.modals;
        delete modals[tag];
        return { modals: modals };
      });
    }
  }, {
    key: '_getOpenModals',
    value: function _getOpenModals() {
      return Object.keys(this.state.modals);
    }
  }, {
    key: 'render',
    value: function render() {
      _portalRef = this;
      if (!this.state.modals) {
        return null;
      }
      var modals = [];
      for (var tag in this.state.modals) {
        modals.push(this.state.modals[tag]);
      }
      if (modals.length === 0) {
        return null;
      }
      return _react2.default.createElement(
        _ReactView2.default,
        {
          style: styles.modalsContainer },
        modals
      );
    }
  }]);

  return Portal;
}(_react2.default.Component);

Portal.statics = {
  /**
   * Use this to create a new unique tag for your component that renders
   * modals. A good place to allocate a tag is in `componentWillMount`
   * of your component.
   * See `showModal` and `closeModal`.
   */

  allocateTag: function allocateTag() {
    return '__modal_' + ++lastUsedTag;
  },


  /**
   * Render a new modal.
   * @param tag A unique tag identifying the React component to render.
   * This tag can be later used in `closeModal`.
   * @param component A React component to be rendered.
   */
  showModal: function showModal(tag, component) {
    if (!_portalRef) {
      console.error('Calling showModal but no Portal has been rendered.');
      return;
    }
    _portalRef._showModal(tag, component);
  },


  /**
   * Remove a modal from the collection of modals to be rendered.
   * @param tag A unique tag identifying the React component to remove.
   * Must exactly match the tag previously passed to `showModal`.
   */
  closeModal: function closeModal(tag) {
    if (!_portalRef) {
      console.error('Calling closeModal but no Portal has been rendered.');
      return;
    }
    _portalRef._closeModal(tag);
  },


  /**
   * Get an array of all the open modals, as identified by their tag string.
   */
  getOpenModals: function getOpenModals() {
    if (!_portalRef) {
      console.error('Calling getOpenModals but no Portal has been rendered.');
      return [];
    }
    return _portalRef._getOpenModals();
  }
};
;

var styles = _ReactStyleSheet2.default.create({
  modalsContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

Portal.isReactNativeComponent = true;

(0, _autobindDecorator2.default)(Portal);

exports.default = Portal;