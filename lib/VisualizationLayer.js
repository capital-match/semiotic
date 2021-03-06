"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _roughjs = _interopRequireDefault(require("roughjs"));

var _basicCanvasEffects = require("./canvas/basicCanvasEffects");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RoughCanvas = _roughjs.default.canvas;

var VisualizationLayer =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(VisualizationLayer, _React$PureComponent);

  function VisualizationLayer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, VisualizationLayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VisualizationLayer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "piecesGroup", {});

    _defineProperty(_assertThisInitialized(_this), "canvasDrawing", []);

    _defineProperty(_assertThisInitialized(_this), "state", {
      canvasDrawing: [],
      dataVersion: "",
      renderedElements: [],
      focusedPieceIndex: null,
      focusedVisualizationGroup: null
    });

    _defineProperty(_assertThisInitialized(_this), "updateVisualizationLayer", function (props) {
      var xScale = props.xScale,
          yScale = props.yScale,
          dataVersion = props.dataVersion,
          projectedCoordinateNames = props.projectedCoordinateNames,
          _props$renderPipeline = props.renderPipeline,
          renderPipeline = _props$renderPipeline === void 0 ? {} : _props$renderPipeline,
          _props$baseMarkProps = props.baseMarkProps,
          baseMarkProps = _props$baseMarkProps === void 0 ? {} : _props$baseMarkProps,
          _props$renderOrder = props.renderOrder,
          renderOrder = _props$renderOrder === void 0 ? [] : _props$renderOrder;
      _this.canvasDrawing = [];
      var canvasDrawing = _this.canvasDrawing;
      var renderedElements = [];
      var renderVizKeys = Object.keys(renderPipeline);
      var renderKeys = renderOrder.concat(renderVizKeys.filter(function (d) {
        return renderOrder.indexOf(d) === -1;
      }));
      renderKeys.forEach(function (k) {
        var pipe = renderPipeline[k];

        if (pipe && (pipe.data && _typeof(pipe.data) === "object" && !Array.isArray(pipe.data) || pipe.data && pipe.data.length > 0)) {
          var renderedPipe = pipe.behavior(_objectSpread({
            xScale: xScale,
            yScale: yScale,
            canvasDrawing: canvasDrawing,
            projectedCoordinateNames: projectedCoordinateNames,
            baseMarkProps: _extends(baseMarkProps, {
              "aria-label": pipe.ariaLabel && pipe.ariaLabel.items || "dataviz-element",
              role: "img",
              tabIndex: -1
            })
          }, pipe));

          if (renderedPipe && renderedPipe.length > 0) {
            renderedElements.push(React.createElement("g", {
              key: k,
              className: k,
              role: "group",
              tabIndex: 0,
              "aria-label": pipe.ariaLabel && "".concat(renderedPipe.length, " ").concat(pipe.ariaLabel.items, "s in a ").concat(pipe.ariaLabel.chart) || k,
              onKeyDown: function onKeyDown(e) {
                return _this.handleKeyDown(e, k);
              },
              onBlur: function onBlur() {
                _this.props.voronoiHover(undefined);
              },
              ref: function ref(thisNode) {
                return thisNode && (_this.piecesGroup[k] = thisNode.childNodes);
              }
            }, renderedPipe));
          }
        }
      });

      _this.setState({
        renderedElements: renderedElements,
        dataVersion: dataVersion
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e, vizgroup) {
      // If enter, focus on the first element
      var pushed = e.keyCode;
      if (pushed !== 37 && pushed !== 39 && pushed !== 13) return;
      var newPieceIndex = 0;
      var vizGroupSetting = {}; // If a user pressed enter, highlight the first one
      // Let a user move up and down in stacked bar by getting keys of bars?

      if (_this.state.focusedPieceIndex === null || pushed === 13) {
        vizGroupSetting.focusedVisualizationGroup = vizgroup;
      } else if (pushed === 37) {
        newPieceIndex = _this.state.focusedPieceIndex - 1;
      } else if (pushed === 39) {
        newPieceIndex = _this.state.focusedPieceIndex + 1;
      }

      newPieceIndex = newPieceIndex < 0 ? _this.piecesGroup[vizgroup].length + newPieceIndex : newPieceIndex % _this.piecesGroup[vizgroup].length;
      /*
      const piece = this.props.renderPipeline[vizgroup].accessibleTransform(
        this.props.renderPipeline[vizgroup].data[newPieceIndex]
      )
      */

      var piece = _this.props.renderPipeline[vizgroup].accessibleTransform(_this.props.renderPipeline[vizgroup].data, newPieceIndex, _this.piecesGroup[vizgroup][newPieceIndex]);

      _this.props.voronoiHover(piece);

      _this.setState(_objectSpread({
        focusedPieceIndex: newPieceIndex
      }, vizGroupSetting));
    });

    return _this;
  }

  _createClass(VisualizationLayer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(lp) {
      var _this2 = this;

      var np = this.props;
      var propKeys = Object.keys(np);
      var update = false;
      propKeys.forEach(function (key) {
        if (key !== "title" && lp[key] !== np[key]) {
          update = true;
        }
      });
      if (update === false || this.props.disableContext || !this.props.canvasContext || !this.canvasDrawing) return;
      var size = [this.props.size[0] + this.props.margin.left + this.props.margin.right, this.props.size[1] + this.props.margin.top + this.props.margin.bottom];
      var rc;
      var context = this.props.canvasContext.getContext("2d");
      context.setTransform(1, 0, 0, 1, this.props.margin.left, this.props.margin.top);
      context.clearRect(-this.props.margin.left, -this.props.margin.top, size[0], size[1]);
      this.canvasDrawing.forEach(function (piece) {
        var style = piece.styleFn ? piece.styleFn(_objectSpread({}, piece.d, piece.d.data), piece.i) || {} : {
          fill: "black",
          stroke: "black",
          opacity: 1,
          fillOpacity: 1,
          strokeOpacity: 1,
          strokeWidth: 1
        };
        var fill = style.fill ? style.fill : "black";
        var stroke = style.stroke ? style.stroke : "black";
        context.setTransform(1, 0, 0, 1, _this2.props.margin.left, _this2.props.margin.top);
        context.translate.apply(context, _toConsumableArray(_this2.props.position));
        context.translate(piece.tx, piece.ty);
        context.fillStyle = fill;
        context.strokeStyle = stroke;
        context.lineWidth = style.strokeWidth ? style.strokeWidth : 0;
        var rcSettings = {};
        var renderObject = piece.markProps.renderMode || piece.renderFn && piece.renderFn(_objectSpread({}, piece.d, piece.d.data), piece.i);
        var actualRenderMode = renderObject && renderObject.renderMode || renderObject;

        if (actualRenderMode) {
          rc = rc || RoughCanvas(_this2.props.canvasContext.getContext());
          var rcExtension = _typeof(renderObject) === "object" && renderObject || {};
          rcSettings = _objectSpread({
            fill: fill,
            stroke: stroke,
            strokeWidth: context.lineWidth
          }, rcExtension);
        }

        if (piece.markProps.markType === "circle" || piece.markProps.markType === "rect" && piece.markProps.rx > 0) {
          var vizX = 0,
              vizY = 0,
              r = style.r || piece.markProps.r;

          if (piece.markProps.width) {
            var halfWidth = piece.markProps.width / 2;
            vizX = piece.markProps.x + halfWidth;
            vizY = piece.markProps.y + halfWidth;
            r = halfWidth;
          }

          if (actualRenderMode === "sketchy") {
            if (context.globalAlpha !== 0) rc.circle(vizX, vizY, r, rcSettings);
          } else {
            context.beginPath();
            context.arc(vizX, vizY, r, 0, 2 * Math.PI);
            context.globalAlpha = style.fillOpacity || style.opacity || 1;
            if (style.fill && style.fill !== "none" && context.globalAlpha !== 0) context.fill();
            context.globalAlpha = style.strokeOpacity || style.opacity || 1;
            if (style.stroke && style.stroke !== "none" && context.globalAlpha !== 0) context.stroke();
          }
        } else if (piece.markProps.markType === "rect") {
          if (actualRenderMode === "sketchy") {
            context.globalAlpha = style.opacity || 1;
            if (context.globalAlpha !== 0) rc.rectangle(piece.markProps.x, piece.markProps.y, piece.markProps.width, piece.markProps.height, rcSettings);
          } else {
            context.globalAlpha = style.fillOpacity || style.opacity || 1;
            if (style.fill && style.fill !== "none" && context.globalAlpha !== 0) context.fillRect(piece.markProps.x, piece.markProps.y, piece.markProps.width, piece.markProps.height);
            context.globalAlpha = style.strokeOpacity || style.opacity || 1;
            if (style.stroke && style.stroke !== "none" && context.globalAlpha !== 0) context.strokeRect(piece.markProps.x, piece.markProps.y, piece.markProps.width, piece.markProps.height);
          }
        } else if (piece.markProps.markType === "path") {
          if (actualRenderMode === "sketchy") {
            context.globalAlpha = style.opacity || 1;
            rc.path(piece.markProps.d, rcSettings);
          } else {
            var p = new Path2D(piece.markProps.d);
            context.globalAlpha = style.strokeOpacity || style.opacity || 1;
            if (style.stroke && style.stroke !== "none" && context.globalAlpha !== 0) context.stroke(p);
            context.globalAlpha = style.fillOpacity || style.opacity || 1;
            if (style.fill && style.fill !== "none" && context.globalAlpha !== 0) context.fill(p);
          }
        } else {
          console.error("CURRENTLY UNSUPPORTED MARKTYPE FOR CANVAS RENDERING");
        }
      });
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.globalAlpha = 1;

      if (this.props.canvasPostProcess === "chuckClose") {
        (0, _basicCanvasEffects.chuckCloseCanvasTransform)(this.props.canvasContext, context, size);
      } else if (typeof this.props.canvasPostProcess === "function") {
        this.props.canvasPostProcess(this.props.canvasContext, context, size);
      }

      if (this.state.focusedVisualizationGroup !== null && this.piecesGroup[this.state.focusedVisualizationGroup] && this.state.focusedPieceIndex !== null) {
        var focusElParent = this.piecesGroup[this.state.focusedVisualizationGroup][this.state.focusedPieceIndex];
        var focusEl = focusElParent && _toConsumableArray(focusElParent.childNodes).find(function (child) {
          return child.getAttribute("aria-label");
        }) || focusElParent;
        focusEl && focusEl.focus && focusEl.focus();
      }
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.updateVisualizationLayer(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(np) {
      var lp = this.props;
      var propKeys = Object.keys(np);
      var update = false;
      propKeys.forEach(function (key) {
        if (key !== "title" && lp[key] !== np[key]) {
          update = true;
        }
      });

      if (update || np.dataVersion && np.dataVersion !== this.state.dataVersion) {
        this.updateVisualizationLayer(np);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var matte = props.matte,
          matteClip = props.matteClip,
          axes = props.axes,
          _props$frameKey = props.frameKey,
          frameKey = _props$frameKey === void 0 ? "" : _props$frameKey,
          margin = props.margin;
      var renderedElements = this.state.renderedElements;
      var renderedAxes = axes && React.createElement("g", {
        key: "visualization-axis-labels",
        className: "axis axis-labels"
      }, axes);
      var ariaLabel = "";
      var title = this.props.title && this.props.ariaTitle || this.props.title ? typeof this.props.title !== "string" && this.props.title.props && typeof this.props.title.props.children === "string" ? "titled ".concat(this.props.title.props.children) : "with a complex title" : "with no title";
      ariaLabel = "Visualization ".concat(title, ". Use arrow keys to navigate elements.");
      var renderedDataVisualization = (renderedAxes || renderedElements && renderedElements.length > 0) && React.createElement("g", {
        className: "data-visualization",
        key: "visualization-clip-path",
        "aria-label": ariaLabel,
        role: "group",
        clipPath: matteClip && matte ? "url(#matte-clip".concat(frameKey, ")") : undefined,
        transform: "translate(".concat(margin.left, ",").concat(margin.top, ")")
      }, renderedElements, matte, renderedAxes) || null;
      return renderedDataVisualization;
    }
  }]);

  return VisualizationLayer;
}(React.PureComponent);

_defineProperty(VisualizationLayer, "defaultProps", {
  position: [0, 0],
  margin: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

var _default = VisualizationLayer;
exports.default = _default;
module.exports = exports.default;