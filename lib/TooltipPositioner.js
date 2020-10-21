"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TooltipPositioner =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TooltipPositioner, _React$Component);

  function TooltipPositioner() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TooltipPositioner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TooltipPositioner)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      offset: null,
      tooltipContainerInitialDimensions: null,
      tooltipContentArgsCurrent: null // simple heuristics to check if the tooltip container exceeds the viewport
      // if so, capture the suggested offset

    });

    _defineProperty(_assertThisInitialized(_this), "checkPosition", function () {
      var offset = {
        x: 0,
        y: 0
      };

      var tooltipContainerInitialDimensions = _this.containerRef.current.getBoundingClientRect();

      var right = tooltipContainerInitialDimensions.right,
          left = tooltipContainerInitialDimensions.left,
          top = tooltipContainerInitialDimensions.top,
          bottom = tooltipContainerInitialDimensions.bottom;
      var containerWidth = right - left;
      var containerHeight = bottom - top;

      if (right > window.innerWidth) {
        offset.x = -containerWidth;
      } else if (left < 0) {
        offset.x = containerWidth;
      }

      if (bottom > window.innerHeight) {
        offset.y = -containerHeight;
      } else if (top < 0) {
        offset.y = containerHeight;
      }

      _this.setState({
        offset: offset,
        tooltipContainerInitialDimensions: tooltipContainerInitialDimensions,
        tooltipContentArgsCurrent: _this.props.tooltipContentArgs
      });
    });

    return _this;
  }

  _createClass(TooltipPositioner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.containerRef.current && !this.state.offset) {
        this.checkPosition();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(pp) {
      // if new args, reset offset state
      if (pp.tooltipContentArgs !== this.props.tooltipContentArgs) {
        this.setState({
          offset: null,
          tooltipContainerInitialDimensions: null
        });
      } else if (this.containerRef.current && !this.state.offset) {
        this.checkPosition();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tooltipContent = _this$props.tooltipContent,
          tooltipContentArgs = _this$props.tooltipContentArgs;
      var _this$state = this.state,
          offset = _this$state.offset,
          tooltipContainerInitialDimensions = _this$state.tooltipContainerInitialDimensions,
          tooltipContentArgsCurrent = _this$state.tooltipContentArgsCurrent;
      var containerStyle = offset && tooltipContentArgsCurrent === tooltipContentArgs ? {
        transform: "translate(".concat(offset.x, "px,").concat(offset.y, "px)")
      } : {
        opacity: 0
      };
      var tooltipContainerAttributes = {
        offset: offset || {
          x: 0,
          y: 0
        },
        tooltipContainerInitialDimensions: tooltipContainerInitialDimensions
      };
      return React.createElement("div", {
        ref: this.containerRef,
        style: containerStyle
      }, tooltipContent(_objectSpread({}, tooltipContentArgs, {
        tooltipContainerAttributes: tooltipContainerAttributes
      })));
    }
  }]);

  return TooltipPositioner;
}(React.Component);

var _default = TooltipPositioner;
exports.default = _default;
module.exports = exports.default;