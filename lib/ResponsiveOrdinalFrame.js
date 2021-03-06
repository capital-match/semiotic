"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _OrdinalFrame = _interopRequireDefault(require("./OrdinalFrame"));

var _ResponsiveFrame = _interopRequireDefault(require("./ResponsiveFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _ResponsiveFrame.default)(_OrdinalFrame.default);

exports.default = _default;
module.exports = exports.default;