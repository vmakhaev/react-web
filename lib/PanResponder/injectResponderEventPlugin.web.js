/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactLibEventPluginRegistry = require('react/lib/EventPluginRegistry');

var _reactLibEventPluginRegistry2 = _interopRequireDefault(_reactLibEventPluginRegistry);

var _reactLibResponderEventPlugin = require('react/lib/ResponderEventPlugin');

var _reactLibResponderEventPlugin2 = _interopRequireDefault(_reactLibResponderEventPlugin);

var _reactLibEventConstants = require('react/lib/EventConstants');

var _reactLibEventConstants2 = _interopRequireDefault(_reactLibEventConstants);

var _reactLibResponderTouchHistoryStore = require('react/lib/ResponderTouchHistoryStore');

var _reactLibResponderTouchHistoryStore2 = _interopRequireDefault(_reactLibResponderTouchHistoryStore);

var topLevelTypes = _reactLibEventConstants2['default'].topLevelTypes;

var eventTypes = _reactLibResponderEventPlugin2['default'].eventTypes;
eventTypes.startShouldSetResponder.dependencies = [topLevelTypes.topTouchStart];

eventTypes.scrollShouldSetResponder.dependencies = [topLevelTypes.topScroll];

eventTypes.selectionChangeShouldSetResponder.dependencies = [topLevelTypes.topSelectionChange];

eventTypes.moveShouldSetResponder.dependencies = [topLevelTypes.topTouchMove];

['responderStart', 'responderMove', 'responderEnd', 'responderRelease', 'responderTerminationRequest', 'responderGrant', 'responderReject', 'responderTerminate'].forEach(function (type) {
  var dependencies;
  if ('ontouchstart' in window) {
    dependencies = [topLevelTypes.topTouchStart, topLevelTypes.topTouchCancel, topLevelTypes.topTouchEnd, topLevelTypes.topTouchMove];
  } else {
    // TODO: support move event
    dependencies = [topLevelTypes.topMouseDown, topLevelTypes.topMouseUp];
  }

  eventTypes[type].dependencies = dependencies;
});

function toArray(collection) {
  return collection && Array.prototype.slice.call(collection) || [];
}

function fixIdentifier(identifier) {
  // Safari identifier is a large number
  if (identifier > 20) {
    return identifier % 20;
  }

  return identifier;
}

var normalizeTouches = function normalizeTouches(touches, nativeEvent) {
  var timestamp = nativeEvent.timestamp || nativeEvent.timeStamp;

  return toArray(touches).map(function (touch) {
    // Cloned touch
    return {
      clientX: touch.clientX,
      clientY: touch.clientY,
      force: touch.force,
      pageX: touch.pageX,
      pageY: touch.pageY,
      radiusX: touch.radiusX,
      radiusY: touch.radiusY,
      rotationAngle: touch.rotationAngle,
      screenX: touch.screenX,
      screenY: touch.screenY,
      target: touch.target,
      timestamp: timestamp,
      identifier: fixIdentifier(touch.identifier)
    };
  });
};

var originRecordTouchTrack = _reactLibResponderTouchHistoryStore2['default'].recordTouchTrack;
_reactLibResponderTouchHistoryStore2['default'].recordTouchTrack = function (topLevelType, nativeEvent) {

  originRecordTouchTrack.call(_reactLibResponderTouchHistoryStore2['default'], topLevelType, {
    changedTouches: normalizeTouches(nativeEvent.changedTouches, nativeEvent),
    touches: normalizeTouches(nativeEvent.touches, nativeEvent)
  });
};

_reactLibEventPluginRegistry2['default'].injectEventPluginsByName({
  ResponderEventPlugin: _reactLibResponderEventPlugin2['default']
});