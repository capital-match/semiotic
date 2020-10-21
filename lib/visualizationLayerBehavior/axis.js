"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTickValues = generateTickValues;
exports.axisPieces = axisPieces;
exports.axisLines = exports.baselineGenerator = exports.axisLabels = void 0;

var React = _interopRequireWildcard(require("react"));

var _semioticMark = require("semiotic-mark");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var horizontalTornTickGenerator = function horizontalTornTickGenerator(width, ticks, y, orient) {
  var step = width / ticks;
  var currentStep = 0;
  var tickPath = "M0,".concat(y);
  var mod = orient === "right" ? -1 : 1;

  while (currentStep <= width) {
    tickPath += "L".concat(currentStep, ",").concat(y);

    if (currentStep < width) {
      tickPath += "L".concat(currentStep + step / 2, ",").concat(y + 10 * mod);
    }

    currentStep += step;
  }

  return tickPath;
};

var verticalTornTickGenerator = function verticalTornTickGenerator(height, ticks, x, orient) {
  var step = height / ticks;
  var currentStep = 0;
  var tickPath = "M".concat(x, ",0");
  var mod = orient === "bottom" ? -1 : 1;

  while (currentStep <= height) {
    tickPath += "L".concat(x, ",").concat(currentStep);

    if (currentStep < height) {
      tickPath += "L".concat(x + 10 * mod, ",").concat(currentStep + step / 2);
    }

    currentStep += step;
  }

  return tickPath;
};

var generateTornBaseline = function generateTornBaseline(orient, baselineSettings) {
  var tornD = "";
  var x1 = baselineSettings.x1,
      x2 = baselineSettings.x2,
      y1 = baselineSettings.y1,
      y2 = baselineSettings.y2;

  if (orient === "left" || orient === "right") {
    var calcWidth = Math.abs(x2 - x1);

    var _ticks = Math.ceil(calcWidth / 40);

    tornD = horizontalTornTickGenerator(calcWidth, _ticks, orient === "right" ? 0 : y1, orient);
  } else {
    var calcHeight = Math.abs(y2 - y1);

    var _ticks2 = Math.ceil(calcHeight / 40);

    tornD = verticalTornTickGenerator(calcHeight, _ticks2, x1, orient);
  }

  return tornD;
};

var defaultTickLineGenerator = function defaultTickLineGenerator(_ref) {
  var xy = _ref.xy,
      orient = _ref.orient,
      i = _ref.i,
      baseMarkProps = _ref.baseMarkProps,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      jaggedBase = _ref.jaggedBase;
  var genD = "M".concat(xy.x1, ",").concat(xy.y1, "L").concat(xy.x2, ",").concat(xy.y2);

  if (jaggedBase && i === 0) {
    genD = generateTornBaseline(orient, xy);
  }

  return React.createElement(_semioticMark.Mark, _extends({
    key: i,
    markType: "path",
    renderMode: xy.renderMode,
    fill: "none",
    stroke: "black",
    strokeWidth: "1px",
    simpleInterpolate: true,
    d: genD,
    className: "tick-line tick ".concat(orient, " ").concat(className)
  }, baseMarkProps));
};

var outboundTickLineGenerator = function outboundTickLineGenerator(_ref2) {
  var xy = _ref2.xy,
      orient = _ref2.orient,
      i = _ref2.i,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? "" : _ref2$className;
  var tickLength = 8;
  var genD = "M-4,".concat(xy.y1, "L").concat(xy.x1, ",").concat(xy.y2);

  if (orient === "left") {
    genD = "M".concat(xy.x1 - tickLength, ",").concat(xy.y1, "L").concat(xy.x1, ",").concat(xy.y2);
  } else if (orient === "right") {
    genD = "M".concat(xy.x2, ",").concat(xy.y1, "L").concat(xy.x2 + tickLength, ",").concat(xy.y2);
  } else if (orient === "top") {
    genD = "M".concat(xy.x1, ",").concat(xy.y1 - tickLength, "L").concat(xy.x1, ",").concat(xy.y1);
  } else if (orient === "bottom") {
    genD = "M".concat(xy.x1, ",").concat(xy.y2, "L").concat(xy.x1, ",").concat(xy.y2 + tickLength);
  }

  return React.createElement(_semioticMark.Mark, {
    key: i,
    markType: "path",
    renderMode: xy.renderMode,
    fill: "none",
    stroke: "black",
    strokeWidth: "1px",
    simpleInterpolate: true,
    d: genD,
    className: "outbound-tick-line tick ".concat(orient, " ").concat(className)
  });
};

function generateTickValues(tickValues, ticks, scale) {
  var axisSize = Math.abs(scale.range()[1] - scale.range()[0]);

  if (!tickValues) {
    if (!ticks) {
      ticks = Math.max(1, Math.floor(axisSize / 40));
    }

    tickValues = scale.ticks && scale.ticks(ticks) || scale.domain();
  }

  return tickValues;
}

function axisPieces(_ref3) {
  var _ref3$renderMode = _ref3.renderMode,
      renderMode = _ref3$renderMode === void 0 ? function () {
    return undefined;
  } : _ref3$renderMode,
      _ref3$padding = _ref3.padding,
      padding = _ref3$padding === void 0 ? 5 : _ref3$padding,
      scale = _ref3.scale,
      ticks = _ref3.ticks,
      _ref3$tickValues = _ref3.tickValues,
      tickValues = _ref3$tickValues === void 0 ? generateTickValues(undefined, ticks, scale) : _ref3$tickValues,
      _ref3$orient = _ref3.orient,
      orient = _ref3$orient === void 0 ? "left" : _ref3$orient,
      size = _ref3.size,
      _ref3$footer = _ref3.footer,
      footer = _ref3$footer === void 0 ? false : _ref3$footer,
      _ref3$tickSize = _ref3.tickSize,
      tickSize = _ref3$tickSize === void 0 ? footer ? -10 : ["top", "bottom"].find(function (d) {
    return d === orient;
  }) ? size[1] : size[0] : _ref3$tickSize,
      jaggedBase = _ref3.jaggedBase;
  //returns x1 (start of line), x2 (end of line) associated with the value of the tick
  var axisDomain = [],
      position1,
      position2,
      domain1,
      domain2,
      tposition1,
      tposition2,
      textPositionMod = 0,
      textPositionMod2 = 0,
      defaultAnchor = "middle";

  switch (orient) {
    case "top":
      position1 = "x1";
      position2 = "x2";
      domain1 = "y1";
      domain2 = "y2";
      axisDomain = [0, tickSize];
      tposition1 = "tx";
      tposition2 = "ty";
      textPositionMod -= 20 - padding;
      break;

    case "bottom":
      position1 = "x1";
      position2 = "x2";
      domain1 = "y2";
      domain2 = "y1";
      axisDomain = [size[1], size[1] - tickSize];
      tposition1 = "tx";
      tposition2 = "ty";
      textPositionMod += 20 + padding;
      break;

    case "right":
      position1 = "y2";
      position2 = "y1";
      domain1 = "x2";
      domain2 = "x1";
      axisDomain = [size[0], size[0] - tickSize];
      tposition1 = "ty";
      tposition2 = "tx";
      textPositionMod += 5 + padding;
      textPositionMod2 += 5;
      defaultAnchor = "start";
      break;
    //left

    default:
      position1 = "y1";
      position2 = "y2";
      domain1 = "x1";
      domain2 = "x2";
      axisDomain = [0, tickSize];
      tposition1 = "ty";
      tposition2 = "tx";
      textPositionMod -= 5 + padding;
      textPositionMod2 += 5;
      defaultAnchor = "end";
      break;
  }

  var generatedTicks = tickValues instanceof Function ? tickValues({
    orient: orient
  }) : tickValues;

  if (jaggedBase && generatedTicks.find(function (t) {
    return t === scale.domain()[0];
  }) === undefined) {
    generatedTicks = [scale.domain()[0]].concat(_toConsumableArray(generatedTicks));
  }

  return generatedTicks.map(function (tick, i) {
    var _ref4;

    var tickPosition = scale(tick);
    return _ref4 = {}, _defineProperty(_ref4, position1, tickPosition), _defineProperty(_ref4, position2, tickPosition), _defineProperty(_ref4, domain1, axisDomain[0]), _defineProperty(_ref4, domain2, axisDomain[1]), _defineProperty(_ref4, tposition1, tickPosition + textPositionMod2), _defineProperty(_ref4, tposition2, axisDomain[0] + textPositionMod), _defineProperty(_ref4, "defaultAnchor", defaultAnchor), _defineProperty(_ref4, "renderMode", renderMode(tick, i)), _defineProperty(_ref4, "value", tick), _ref4;
  });
}

var axisLabels = function axisLabels(_ref5) {
  var axisParts = _ref5.axisParts,
      tickFormat = _ref5.tickFormat,
      _ref5$rotate = _ref5.rotate,
      rotate = _ref5$rotate === void 0 ? 0 : _ref5$rotate,
      _ref5$center = _ref5.center,
      center = _ref5$center === void 0 ? false : _ref5$center,
      orient = _ref5.orient;
  return axisParts.map(function (axisPart, i) {
    var renderedValue = tickFormat(axisPart.value, i);

    if (_typeof(renderedValue) !== "object" || renderedValue instanceof Date) {
      renderedValue = React.createElement("text", {
        textAnchor: axisPart.defaultAnchor,
        className: "axis-label"
      }, renderedValue.toString ? renderedValue.toString() : renderedValue);
    }

    var textX = axisPart.tx;
    var textY = axisPart.ty;

    if (center) {
      switch (orient) {
        case "right":
          textX -= (axisPart.x2 - axisPart.x1) / 2;
          break;

        case "left":
          textX += (axisPart.x2 - axisPart.x1) / 2;
          break;

        case "top":
          textY += (axisPart.y2 - axisPart.y1) / 2;
          break;

        case "bottom":
          textY -= (axisPart.y2 - axisPart.y1) / 2;
          break;
      }
    }

    return React.createElement("g", {
      key: i,
      pointerEvents: "none",
      transform: "translate(".concat(textX, ",").concat(textY, ") rotate(").concat(rotate, ")"),
      className: "axis-label"
    }, renderedValue);
  });
};

exports.axisLabels = axisLabels;

var baselineGenerator = function baselineGenerator(orient, size, className) {
  var offsets = {
    left: {
      x: 0,
      y: 0,
      width: 0,
      height: size[1]
    },
    right: {
      x: size[0],
      y: 0,
      width: 0,
      height: size[1]
    },
    top: {
      x: 0,
      y: 0,
      width: size[0],
      height: 0
    },
    bottom: {
      x: 0,
      y: size[1],
      width: size[0],
      height: 0
    }
  };
  var orientOffset = offsets[orient];
  return React.createElement("line", {
    key: "baseline",
    className: "axis-baseline ".concat(className),
    stroke: "black",
    strokeLinecap: "square",
    x1: orientOffset.x,
    x2: orientOffset.x + orientOffset.width,
    y1: orientOffset.y,
    y2: orientOffset.y + orientOffset.height
  });
};

exports.baselineGenerator = baselineGenerator;

var axisLines = function axisLines(_ref6) {
  var axisParts = _ref6.axisParts,
      orient = _ref6.orient,
      _ref6$tickLineGenerat = _ref6.tickLineGenerator,
      tickLineGenerator = _ref6$tickLineGenerat === void 0 ? defaultTickLineGenerator : _ref6$tickLineGenerat,
      baseMarkProps = _ref6.baseMarkProps,
      className = _ref6.className,
      jaggedBase = _ref6.jaggedBase,
      scale = _ref6.scale,
      _ref6$showOutboundTic = _ref6.showOutboundTickLines,
      showOutboundTickLines = _ref6$showOutboundTic === void 0 ? false : _ref6$showOutboundTic;
  var axisLines = axisParts.map(function (axisPart, i) {
    return tickLineGenerator({
      xy: axisPart,
      orient: orient,
      i: i,
      baseMarkProps: baseMarkProps,
      className: className,
      jaggedBase: jaggedBase,
      scale: scale
    });
  });
  var outboundAxisLines = showOutboundTickLines ? axisParts.map(function (axisPart, i) {
    return outboundTickLineGenerator({
      xy: axisPart,
      orient: orient,
      i: i,
      className: className
    });
  }) : [];
  return [].concat(_toConsumableArray(axisLines), [outboundAxisLines]);
};

exports.axisLines = axisLines;