"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateOrdinalFrame = exports.calculateMappedMiddles = void 0;

var React = _interopRequireWildcard(require("react"));

var _d3Collection = require("d3-collection");

var _d3Array = require("d3-array");

var _d3Shape = require("d3-shape");

var _frameFunctions = require("../svg/frameFunctions");

var _pieceDrawing = require("../svg/pieceDrawing");

var _summaryLayouts = require("../svg/summaryLayouts");

var _pieceLayouts = require("../svg/pieceLayouts");

var _dataFunctions = require("../data/dataFunctions");

var _functions = require("../generic_utilities/functions");

var _d3Scale = require("d3-scale");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var layoutHash = {
  clusterbar: _pieceLayouts.clusterBarLayout,
  bar: _pieceLayouts.barLayout,
  point: _pieceLayouts.pointLayout,
  swarm: _pieceLayouts.swarmLayout,
  timeline: _pieceLayouts.timelineLayout
};

var midMod = function midMod(d) {
  return d.middle ? d.middle : 0;
};

var zeroFunction = (0, _functions.genericFunction)(0);
var twoPI = Math.PI * 2;
var naturalLanguageTypes = {
  bar: {
    items: "bar",
    chart: "bar chart"
  },
  clusterbar: {
    items: "bar",
    chart: "grouped bar chart"
  },
  swarm: {
    items: "point",
    chart: "swarm plot"
  },
  point: {
    items: "point",
    chart: "point plot"
  },
  timeline: {
    items: "bar",
    chart: "timeline"
  }
};

var calculateMappedMiddles = function calculateMappedMiddles(oScale, middleMax, padding) {
  var oScaleDomainValues = oScale.domain();
  var mappedMiddles = {};
  oScaleDomainValues.forEach(function (p, q) {
    var base = oScale(p) - padding;
    var next = oScaleDomainValues[q + 1] ? oScale(oScaleDomainValues[q + 1]) : middleMax;
    var diff = (next - base) / 2;
    mappedMiddles[p] = base + diff;
  });
  return mappedMiddles;
};

exports.calculateMappedMiddles = calculateMappedMiddles;

var calculateOrdinalFrame = function calculateOrdinalFrame(currentProps, currentState) {
  var oLabels;
  var projectedColumns = {};
  var _currentProps$oPaddin = currentProps.oPadding,
      padding = _currentProps$oPaddin === void 0 ? 0 : _currentProps$oPaddin,
      baseSummaryType = currentProps.summaryType,
      baseType = currentProps.type,
      baseConnectorType = currentProps.connectorType,
      baseOAccessor = currentProps.oAccessor,
      baseRAccessor = currentProps.rAccessor,
      baseConnectorStyle = currentProps.connectorStyle,
      baseStyle = currentProps.style,
      baseRExtent = currentProps.rExtent,
      oSort = currentProps.oSort,
      basePieceClass = currentProps.pieceClass,
      baseSummaryStyle = currentProps.summaryStyle,
      baseSummaryClass = currentProps.summaryClass,
      dynamicColumnWidth = currentProps.dynamicColumnWidth,
      projection = currentProps.projection,
      customHoverBehavior = currentProps.customHoverBehavior,
      customClickBehavior = currentProps.customClickBehavior,
      customDoubleClickBehavior = currentProps.customDoubleClickBehavior,
      size = currentProps.size,
      pixelColumnWidth = currentProps.pixelColumnWidth,
      baseTitle = currentProps.title,
      oLabel = currentProps.oLabel,
      hoverAnnotation = currentProps.hoverAnnotation,
      pieceHoverAnnotation = currentProps.pieceHoverAnnotation,
      summaryHoverAnnotation = currentProps.summaryHoverAnnotation,
      backgroundGraphics = currentProps.backgroundGraphics,
      foregroundGraphics = currentProps.foregroundGraphics,
      oScaleType = currentProps.oScaleType,
      rScaleType = currentProps.rScaleType,
      legend = currentProps.legend,
      baseRenderKey = currentProps.renderKey,
      data = currentProps.data,
      baseMargin = currentProps.margin,
      baseOExtent = currentProps.oExtent,
      baseAxes = currentProps.axes,
      basePieceIDAccessor = currentProps.pieceIDAccessor,
      multiAxis = currentProps.multiAxis,
      _currentProps$baseMar = currentProps.baseMarkProps,
      baseMarkProps = _currentProps$baseMar === void 0 ? {} : _currentProps$baseMar,
      annotations = currentProps.annotations,
      sketchyRenderingEngine = currentProps.sketchyRenderingEngine;
  var summaryType = (0, _frameFunctions.objectifyType)(baseSummaryType);
  var pieceType = (0, _frameFunctions.objectifyType)(baseType);
  var connectorType = (0, _frameFunctions.objectifyType)(baseConnectorType);
  var oAccessor = (0, _dataFunctions.stringToArrayFn)(baseOAccessor, function (d) {
    return d.renderKey;
  });
  var rAccessor = (0, _dataFunctions.stringToArrayFn)(baseRAccessor, function (d) {
    return d.value || 1;
  });
  var renderKey = (0, _dataFunctions.stringToFn)(baseRenderKey, function (d, i) {
    return i;
  });

  var eventListenersGenerator = function eventListenersGenerator() {
    return {};
  };

  var connectorStyle = (0, _dataFunctions.stringToFn)(baseConnectorStyle, function () {
    return {};
  }, true);
  var summaryStyle = (0, _dataFunctions.stringToFn)(baseSummaryStyle, function () {
    return {};
  }, true);
  var pieceStyle = (0, _dataFunctions.stringToFn)(baseStyle, function () {
    return {};
  }, true);
  var pieceClass = (0, _dataFunctions.stringToFn)(basePieceClass, function () {
    return "";
  }, true);
  var summaryClass = (0, _dataFunctions.stringToFn)(baseSummaryClass, function () {
    return "";
  }, true);
  var title = _typeof(baseTitle) === "object" && !React.isValidElement(baseTitle) && baseTitle !== null ? baseTitle : {
    title: baseTitle,
    orient: "top"
  };
  var pieceIDAccessor = (0, _dataFunctions.stringToFn)(basePieceIDAccessor, function () {
    return "";
  });
  var originalRAccessor = Array.isArray(baseRAccessor) ? baseRAccessor : [baseRAccessor];
  var originalOAccessor = Array.isArray(baseOAccessor) ? baseOAccessor : [baseOAccessor];

  var _keyAndObjectifyBarDa = (0, _frameFunctions.keyAndObjectifyBarData)({
    data: data,
    renderKey: renderKey,
    oAccessor: oAccessor,
    rAccessor: rAccessor,
    originalRAccessor: originalRAccessor,
    originalOAccessor: originalOAccessor,
    multiAxis: multiAxis
  }),
      allData = _keyAndObjectifyBarDa.allData,
      multiExtents = _keyAndObjectifyBarDa.multiExtents;

  var arrayWrappedAxis;

  if (Array.isArray(baseAxes)) {
    arrayWrappedAxis = baseAxes.map(function (axisFnOrObject) {
      return typeof axisFnOrObject === "function" ? axisFnOrObject({
        size: currentProps.size
      }) : axisFnOrObject;
    });
  } else if (baseAxes) {
    arrayWrappedAxis = [baseAxes].map(function (axisFnOrObject) {
      return typeof axisFnOrObject === "function" ? axisFnOrObject({
        size: currentProps.size
      }) : axisFnOrObject;
    });
  }

  if (multiExtents && baseAxes) {
    arrayWrappedAxis.forEach(function (d, i) {
      d.extentOverride = multiExtents[i];
    });
  }

  var margin = (0, _frameFunctions.calculateMargin)({
    margin: baseMargin,
    axes: arrayWrappedAxis,
    title: title,
    oLabel: oLabel,
    projection: projection,
    size: size
  });

  var _adjustedPositionSize = (0, _frameFunctions.adjustedPositionSize)({
    size: size,
    margin: margin,
    projection: projection
  }),
      adjustedPosition = _adjustedPositionSize.adjustedPosition,
      adjustedSize = _adjustedPositionSize.adjustedSize;

  var oExtentSettings = baseOExtent === undefined || Array.isArray(baseOExtent) ? {
    extent: baseOExtent
  } : baseOExtent;
  var calculatedOExtent = allData.reduce(function (p, c) {
    var baseOValue = c.column;
    var oValue = baseOValue !== undefined ? String(baseOValue) : baseOValue;

    if (p.indexOf(oValue) === -1) {
      p.push(oValue);
    }

    return p;
  }, []);
  var oExtent = oExtentSettings.extent || calculatedOExtent;

  if (pieceType.type === "barpercent") {
    var oExtentSums = oExtent.map(function (d) {
      return allData.filter(function (p) {
        return String(p.column) === d;
      }).reduce(function (p, c) {
        return p + c.value;
      }, 0);
    }).reduce(function (p, c, i) {
      p[oExtent[i]] = c;
      return p;
    }, {});
    allData.forEach(function (d) {
      d.value = oExtentSums[d.column] && d.value / oExtentSums[d.column] || 0;
    });
    pieceType.type = "bar";
  }

  if (pixelColumnWidth) {
    if (projection === "radial") {
      console.error("pixelColumnWidth is not honored in radial mode");
    } else if (projection === "vertical") {
      adjustedSize[0] = oExtent.length * pixelColumnWidth;
    } else {
      adjustedSize[1] = oExtent.length * pixelColumnWidth;
    }
  }

  var oDomain = projection === "vertical" && [0, adjustedSize[0]] || [0, adjustedSize[1]];
  var cwHash = oExtent.reduce(function (p, c) {
    p[c] = 1 / oExtent.length * oDomain[1];
    p.total += p[c];
    return p;
  }, {
    total: 0
  });
  var castOScaleType = oScaleType;
  var oScale = dynamicColumnWidth ? (0, _d3Scale.scaleOrdinal)() : castOScaleType();
  oScale.domain(oExtent);
  var maxColumnValues;

  if (dynamicColumnWidth) {
    var columnValueCreator;

    if (typeof dynamicColumnWidth === "string") {
      columnValueCreator = function columnValueCreator(d) {
        return (0, _d3Array.sum)(d.map(function (p) {
          return p.data[dynamicColumnWidth];
        }));
      };
    } else {
      columnValueCreator = function columnValueCreator(d) {
        return dynamicColumnWidth(d.map(function (p) {
          return p.data;
        }));
      };
    }

    var thresholdDomain = [0];
    maxColumnValues = 0;
    var columnValues = [];
    oExtent.forEach(function (d) {
      var oValues = allData.filter(function (p) {
        return p.column === d;
      });
      var columnValue = columnValueCreator(oValues);
      columnValues.push(columnValue);
      maxColumnValues += columnValue;
    });
    cwHash.total = 0;
    oExtent.forEach(function (d, i) {
      var oValue = columnValues[i];
      var stepValue = oValue / maxColumnValues * (oDomain[1] - oDomain[0]);
      cwHash[d] = stepValue;
      cwHash.total += stepValue;

      if (i !== oExtent.length - 1) {
        thresholdDomain.push(stepValue + thresholdDomain[i]);
      }
    });
    oScale.range(thresholdDomain);
  } else {
    oScale.range(oDomain);
  }

  var rExtentSettings = baseRExtent === undefined || Array.isArray(baseRExtent) ? {
    extent: baseRExtent,
    onChange: undefined,
    includeAnnotations: false
  } : baseRExtent;
  var rExtent = rExtentSettings.extent;
  var subZeroRExtent = [0, 0];

  if (pieceType.type === "bar" && summaryType.type && summaryType.type !== "none") {
    pieceType.type = "none";
  }

  var annotationsForExtent = [];

  if (rExtentSettings.includeAnnotations && annotations) {
    rAccessor.forEach(function (actualRAccessor) {
      annotations.forEach(function (annotation, annotationIndex) {
        var r = actualRAccessor(annotation, annotationIndex);

        if (isFinite(r)) {
          annotationsForExtent.push(r);
        }
      });
    });
  }

  if (pieceType.type === "timeline") {
    var rData = allData.map(function (d) {
      return d.value;
    });
    var leftExtent = (0, _d3Array.extent)(rData.map(function (d) {
      return d[0];
    }));
    var rightExtent = (0, _d3Array.extent)(rData.map(function (d) {
      return d[1];
    }));
    rExtent = (0, _d3Array.extent)([].concat(_toConsumableArray(leftExtent), _toConsumableArray(rightExtent), annotationsForExtent));
  } else if (pieceType.type !== "bar") {
    rExtent = (0, _d3Array.extent)([].concat(_toConsumableArray(allData.map(function (d) {
      return d.value;
    })), annotationsForExtent));
  } else {
    var positiveData = allData.filter(function (d) {
      return d.value >= 0;
    });
    var negativeData = allData.filter(function (d) {
      return d.value < 0;
    });
    var nestedPositiveData = (0, _d3Collection.nest)().key(function (d) {
      return d.column;
    }).rollup(function (leaves) {
      return (0, _d3Array.sum)(leaves.map(function (d) {
        return d.value;
      }));
    }).entries(positiveData);
    var nestedNegativeData = (0, _d3Collection.nest)().key(function (d) {
      return d.column;
    }).rollup(function (leaves) {
      return (0, _d3Array.sum)(leaves.map(function (d) {
        return d.value;
      }));
    }).entries(negativeData);
    var positiveAnnotations = annotationsForExtent.filter(function (d) {
      return d > 0;
    });
    rExtent = [0, nestedPositiveData.length === 0 && positiveAnnotations.length === 0 ? 0 : Math.max((0, _d3Array.max)([].concat(_toConsumableArray(nestedPositiveData.map(function (d) {
      return d.value;
    })), _toConsumableArray(positiveAnnotations))), 0)];
    var negativeAnnotations = annotationsForExtent.filter(function (d) {
      return d < 0;
    });
    subZeroRExtent = [0, nestedNegativeData.length === 0 ? 0 : Math.min((0, _d3Array.min)([].concat(_toConsumableArray(nestedNegativeData.map(function (d) {
      return d.value;
    })), _toConsumableArray(negativeAnnotations))), 0)];
    rExtent = [subZeroRExtent[1], rExtent[1]];
  }

  if ((pieceType.type === "clusterbar" || multiAxis) && rExtent[0] > 0) {
    rExtent[0] = 0;
  }

  var calculatedRExtent = rExtent;

  if (rExtentSettings.extent && rExtentSettings.extent[0] !== undefined && rExtentSettings.extent[1] !== undefined) {
    rExtent = rExtentSettings.extent;
  } else {
    if (rExtentSettings.extent && rExtentSettings.extent[1] !== undefined && rExtentSettings.extent[0] === undefined) {
      rExtent[1] = rExtentSettings.extent[1];
    }

    if (rExtentSettings.extent && rExtentSettings.extent[0] !== undefined && rExtentSettings.extent[1] === undefined) {
      rExtent[0] = rExtentSettings.extent[0];
    }
  }

  if (currentProps.invertR || rExtentSettings.extent && rExtentSettings.extent[0] > rExtentSettings.extent[1]) {
    rExtent = [rExtent[1], rExtent[0]];
  }

  var nestedPieces = {};
  (0, _d3Collection.nest)().key(function (d) {
    return d.column;
  }).entries(allData).forEach(function (d) {
    nestedPieces[d.key] = d.values;
  });

  if (oSort !== undefined) {
    oExtent = oExtent.sort(function (a, b) {
      return oSort(a, b, nestedPieces[a].map(function (d) {
        return d.data;
      }), nestedPieces[b].map(function (d) {
        return d.data;
      }));
    });
    oScale.domain(oExtent);
  }

  var rDomain = projection === "vertical" && [0, adjustedSize[1]] || [0, adjustedSize[0]];
  var castRScaleType = rScaleType;
  var instantiatedRScaleType = rScaleType.domain ? rScaleType : castRScaleType();
  var rScale = instantiatedRScaleType.copy().domain(rExtent).range(rDomain);
  var rScaleReverse = instantiatedRScaleType.copy().domain(rDomain).range(rDomain.reverse());
  var rScaleVertical = instantiatedRScaleType.copy().domain(rExtent).range(rDomain);
  var columnWidth = cwHash ? 0 : oScale.bandwidth();
  var pieceData = [];
  var mappedMiddleSize = adjustedSize[1];

  if (projection === "vertical") {
    mappedMiddleSize = adjustedSize[0];
  }

  var mappedMiddles = calculateMappedMiddles(oScale, mappedMiddleSize, padding);
  pieceData = oExtent.map(function (d) {
    return nestedPieces[d] ? nestedPieces[d] : [];
  });
  var zeroValue = projection === "vertical" ? rScaleReverse(rScale(0)) : rScale(0);
  oExtent.forEach(function (o, i) {
    projectedColumns[o] = {
      name: o,
      padding: padding,
      pieceData: pieceData[i],
      pieces: pieceData[i]
    };
    projectedColumns[o].x = oScale(o) + padding / 2;
    projectedColumns[o].y = 0;
    projectedColumns[o].middle = mappedMiddles[o] + padding / 2;
    var negativeOffset = zeroValue;
    var positiveOffset = zeroValue;
    var negativeBaseValue = 0;
    var positiveBaseValue = 0;
    projectedColumns[o].pieceData.forEach(function (piece) {
      var valPosition;

      if (pieceType.type === "timeline") {
        piece.scaledValue = rScale(piece.value[0]);
        piece.scaledEndValue = rScale(piece.value[1]);
        piece.scaledVerticalValue = rScaleVertical(piece.value[0]);
      } else if (pieceType.type !== "bar" && pieceType.type !== "clusterbar") {
        piece.scaledValue = rScale(piece.value);
        piece.scaledVerticalValue = rScaleVertical(piece.value);
      } else if (pieceType.type === "clusterbar") {
        valPosition = projection === "vertical" ? rScaleReverse(rScale(piece.value)) : rScale(piece.value);
        piece.scaledValue = Math.abs(zeroValue - valPosition);
      }

      piece.x = projectedColumns[o].x;

      if (piece.value >= 0) {
        if (pieceType.type === "bar") {
          piece.scaledValue = projection === "vertical" ? positiveOffset - rScaleReverse(rScale(positiveBaseValue + piece.value)) : rScale(positiveBaseValue + piece.value) - positiveOffset;
          positiveBaseValue += piece.value;
        }

        piece.base = zeroValue;
        piece.bottom = pieceType.type === "bar" ? positiveOffset : 0;
        piece.middle = piece.scaledValue / 2 + positiveOffset;
        positiveOffset = projection === "vertical" ? positiveOffset - piece.scaledValue : positiveOffset + piece.scaledValue;
        piece.negative = false;
      } else {
        if (pieceType.type === "bar") {
          piece.scaledValue = projection === "vertical" ? Math.abs(rScale(piece.value) - rScale(0)) : Math.abs(rScale(piece.value) - zeroValue);
          negativeBaseValue += piece.value;
        }

        piece.base = zeroValue;
        piece.bottom = pieceType.type === "bar" ? negativeOffset : 0;
        piece.middle = negativeOffset - piece.scaledValue / 2;
        negativeOffset = projection === "vertical" ? negativeOffset + piece.scaledValue : negativeOffset - piece.scaledValue;
        piece.negative = true;
      }
    });

    if (cwHash) {
      projectedColumns[o].width = cwHash[o] - padding;

      if (currentProps.ordinalAlign === "center") {
        if (i === 0) {
          projectedColumns[o].x = projectedColumns[o].x - projectedColumns[o].width / 2;
          projectedColumns[o].middle = projectedColumns[o].middle - projectedColumns[o].width / 2;
        } else {
          projectedColumns[o].x = projectedColumns[oExtent[i - 1]].x + projectedColumns[oExtent[i - 1]].width;
          projectedColumns[o].middle = projectedColumns[o].x + projectedColumns[o].width / 2;
        }
      }

      projectedColumns[o].pct = cwHash[o] / cwHash.total;
      projectedColumns[o].pct_start = (projectedColumns[o].x - oDomain[0]) / cwHash.total;
      projectedColumns[o].pct_padding = padding / cwHash.total;
      projectedColumns[o].pct_middle = (projectedColumns[o].middle - oDomain[0]) / cwHash.total;
    } else {
      projectedColumns[o].width = columnWidth - padding;

      if (currentProps.ordinalAlign === "center") {
        projectedColumns[o].x = projectedColumns[o].x - projectedColumns[o].width / 2;
        projectedColumns[o].middle = projectedColumns[o].middle - projectedColumns[o].width / 2;
      }

      projectedColumns[o].pct = columnWidth / adjustedSize[1];
      projectedColumns[o].pct_start = (projectedColumns[o].x - oDomain[0]) / adjustedSize[1];
      projectedColumns[o].pct_padding = padding / adjustedSize[1];
      projectedColumns[o].pct_middle = (projectedColumns[o].middle - oDomain[0]) / adjustedSize[1];
    }
  });
  var labelArray = [];
  var pieArcs = [];
  var labelSettings = _typeof(oLabel) === "object" ? _extends({
    label: true,
    padding: 5
  }, oLabel) : {
    orient: "default",
    label: oLabel,
    padding: 5
  };

  if (oLabel || hoverAnnotation) {
    var offsetPct = pieceType.offsetAngle && pieceType.offsetAngle / 360 || 0;
    var rangePct = pieceType.angleRange && pieceType.angleRange.map(function (d) {
      return d / 360;
    }) || [0, 1];
    var rangeMod = rangePct[1] - rangePct[0];
    var adjustedPct = rangeMod < 1 ? (0, _d3Scale.scaleLinear)().domain([0, 1]).range(rangePct) : function (d) {
      return d;
    };
    oExtent.forEach(function (d) {
      var arcGenerator = (0, _d3Shape.arc)().innerRadius(0).outerRadius(rScale.range()[1] / 2);
      var angle = projectedColumns[d].pct * rangeMod;
      var startAngle = adjustedPct(projectedColumns[d].pct_start + offsetPct);
      var endAngle = startAngle + angle;
      var midAngle = startAngle + angle / 2;
      var markD = arcGenerator({
        startAngle: startAngle * twoPI,
        endAngle: endAngle * twoPI
      });
      var translate = [adjustedSize[0] / 2, adjustedSize[1] / 2];
      var centroid = arcGenerator.centroid({
        startAngle: startAngle * twoPI,
        endAngle: endAngle * twoPI
      });
      var addedPadding = centroid[1] > 0 && (!labelSettings.orient || labelSettings.orient === "default" || labelSettings.orient === "edge") ? 8 : 0;
      var outerPoint = (0, _pieceDrawing.pointOnArcAtAngle)([0, 0], midAngle, rScale.range()[1] / 2 + labelSettings.padding + addedPadding);
      pieArcs.push({
        startAngle: startAngle,
        endAngle: endAngle,
        midAngle: midAngle,
        markD: markD,
        translate: translate,
        centroid: centroid,
        outerPoint: outerPoint
      });
    });
  }

  if (currentProps.oLabel) {
    var labelingFn;

    if (labelSettings.label === true) {
      var labelStyle = {
        textAnchor: "middle"
      };

      if (projection === "horizontal" && labelSettings.orient === "right") {
        labelStyle.textAnchor = "start";
      } else if (projection === "horizontal") {
        labelStyle.textAnchor = "end";
      }

      labelingFn = function labelingFn(d, p, i) {
        var additionalStyle = {};
        var transformRotate;

        if (projection === "radial" && labelSettings.orient === "stem") {
          transformRotate = "rotate(".concat(pieArcs[i].outerPoint[0] < 0 ? pieArcs[i].midAngle * 360 + 90 : pieArcs[i].midAngle * 360 - 90, ")");
        } else if (projection === "radial" && labelSettings.orient !== "center") {
          transformRotate = "rotate(".concat(pieArcs[i].outerPoint[1] < 0 ? pieArcs[i].midAngle * 360 : pieArcs[i].midAngle * 360 + 180, ")");
        }

        if (projection === "radial" && labelSettings.orient === "stem" && (pieArcs[i].outerPoint[0] > 0 && labelSettings.padding < 0 || pieArcs[i].outerPoint[0] < 0 && labelSettings.padding >= 0)) {
          additionalStyle.textAnchor = "end";
        } else if (projection === "radial" && labelSettings.orient === "stem") {
          additionalStyle.textAnchor = "start";
        }

        return React.createElement("text", _extends({}, labelStyle, additionalStyle, {
          transform: transformRotate
        }), d);
      };
    } else if (typeof labelSettings.label === "function") {
      labelingFn = labelSettings.label;
    }

    oExtent.forEach(function (d, i) {
      var xPosition = projectedColumns[d].middle;
      var yPosition = 0;

      if (projection === "horizontal") {
        yPosition = projectedColumns[d].middle;

        if (labelSettings.orient === "right") {
          xPosition = adjustedSize[0] + 3;
        } else {
          xPosition = -3;
        }
      } else if (projection === "radial") {
        if (labelSettings.orient === "center") {
          xPosition = pieArcs[i].centroid[0] + pieArcs[i].translate[0];
          yPosition = pieArcs[i].centroid[1] + pieArcs[i].translate[1];
        } else {
          xPosition = pieArcs[i].outerPoint[0] + pieArcs[i].translate[0];
          yPosition = pieArcs[i].outerPoint[1] + pieArcs[i].translate[1];
        }
      }

      var label = labelingFn(d, projectedColumns[d].pieceData.map(function (d) {
        return d.data;
      }), i //          ,{ arc: pieArcs[i], data: projectedColumns[d] }
      );
      labelArray.push(React.createElement("g", {
        key: "olabel-".concat(i),
        transform: "translate(".concat(xPosition, ",").concat(yPosition, ")")
      }, label));
    });

    if (projection === "vertical") {
      var labelY;

      if (labelSettings.orient === "top") {
        labelY = -15;
      } else {
        labelY = 15 + rScale.range()[1];
      }

      oLabels = React.createElement("g", {
        key: "ordinalframe-labels-container",
        className: "ordinal-labels",
        transform: "translate(".concat(margin.left, ",").concat(labelY + margin.top, ")")
      }, labelArray);
    } else if (projection === "horizontal") {
      oLabels = React.createElement("g", {
        key: "ordinalframe-labels-container",
        className: "ordinal-labels",
        transform: "translate(".concat(margin.left, ",").concat(margin.top, ")")
      }, labelArray);
    } else if (projection === "radial") {
      oLabels = React.createElement("g", {
        key: "ordinalframe-labels-container",
        className: "ordinal-labels",
        transform: "translate(".concat(margin.left, ",").concat(margin.top, ")")
      }, labelArray);
    }
  }

  var columnOverlays;

  if (currentProps.hoverAnnotation) {
    columnOverlays = oExtent.map(function (d, i) {
      var barColumnWidth = projectedColumns[d].width;
      var xPosition = projectedColumns[d].x;
      var yPosition = 0;
      var height = rScale.range()[1];
      var width = barColumnWidth + padding;

      if (projection === "horizontal") {
        yPosition = projectedColumns[d].x;
        xPosition = 0;
        width = rScale.range()[1];
        height = barColumnWidth;
      }

      if (projection === "radial") {
        var _pieArcs$i = pieArcs[i],
            markD = _pieArcs$i.markD,
            centroid = _pieArcs$i.centroid,
            translate = _pieArcs$i.translate,
            midAngle = _pieArcs$i.midAngle;
        var radialMousePackage = {
          type: "column-hover",
          column: projectedColumns[d],
          pieces: projectedColumns[d].pieceData,
          summary: projectedColumns[d].pieceData,
          arcAngles: {
            centroid: centroid,
            translate: translate,
            midAngle: midAngle,
            length: rScale.range()[1] / 2
          }
        };
        return {
          markType: "path",
          key: "hover".concat(d),
          d: markD,
          transform: "translate(".concat(translate.join(","), ")"),
          style: {
            opacity: 0,
            fill: "pink"
          },
          overlayData: radialMousePackage,
          onDoubleClick: customDoubleClickBehavior && function () {
            customDoubleClickBehavior(radialMousePackage);
          },
          onClick: customClickBehavior && function () {
            customClickBehavior(radialMousePackage);
          },
          onMouseEnter: customHoverBehavior && function () {
            customHoverBehavior(radialMousePackage);
          },
          onMouseLeave: customHoverBehavior && function () {
            customHoverBehavior();
          }
        };
      }

      var baseMousePackage = {
        type: "column-hover",
        column: projectedColumns[d],
        pieces: projectedColumns[d].pieceData,
        summary: projectedColumns[d].pieceData
      };
      return {
        markType: "rect",
        key: "hover-".concat(d),
        x: xPosition,
        y: yPosition,
        height: height,
        width: width,
        style: {
          opacity: 0,
          stroke: "black",
          fill: "pink"
        },
        onDoubleClick: customDoubleClickBehavior && function () {
          customDoubleClickBehavior(baseMousePackage);
        },
        onClick: customClickBehavior && function () {
          customClickBehavior(baseMousePackage);
        },
        onMouseEnter: customHoverBehavior && function () {
          customHoverBehavior(baseMousePackage);
        },
        onMouseLeave: function onMouseLeave() {
          return {};
        },
        overlayData: baseMousePackage
      };
    });
  }

  var renderMode = currentProps.renderMode,
      canvasSummaries = currentProps.canvasSummaries,
      summaryRenderMode = currentProps.summaryRenderMode,
      connectorClass = currentProps.connectorClass,
      connectorRenderMode = currentProps.connectorRenderMode,
      canvasConnectors = currentProps.canvasConnectors,
      canvasPieces = currentProps.canvasPieces;
  var pieceDataXY;
  var pieceRenderMode = (0, _dataFunctions.stringToFn)(renderMode, undefined, true);
  var pieceCanvasRender = (0, _dataFunctions.stringToFn)(canvasPieces, undefined, true);
  var summaryCanvasRender = (0, _dataFunctions.stringToFn)(canvasSummaries, undefined, true);
  var connectorCanvasRender = (0, _dataFunctions.stringToFn)(canvasConnectors, undefined, true);
  var pieceTypeForXY = pieceType.type && pieceType.type !== "none" ? pieceType.type : "point";
  var pieceTypeLayout = typeof pieceTypeForXY === "function" ? pieceTypeForXY : layoutHash[pieceTypeForXY];
  var calculatedPieceData = pieceTypeLayout({
    type: pieceType,
    data: projectedColumns,
    renderMode: pieceRenderMode,
    eventListenersGenerator: eventListenersGenerator,
    styleFn: pieceStyle,
    projection: projection,
    classFn: pieceClass,
    adjustedSize: adjustedSize,
    chartSize: size,
    margin: margin,
    rScale: rScale,
    baseMarkProps: _objectSpread({}, baseMarkProps, {
      sketchyGenerator: sketchyRenderingEngine && sketchyRenderingEngine.generator
    })
  });
  var keyedData = calculatedPieceData.reduce(function (p, c) {
    if (c.o) {
      if (!p[c.o]) {
        p[c.o] = [];
      }

      p[c.o].push(c);
    }

    return p;
  }, {});
  Object.keys(projectedColumns).forEach(function (d) {
    projectedColumns[d].xyData = keyedData[d] || [];
  });
  var calculatedSummaries = {};

  if (summaryType.type && summaryType.type !== "none") {
    calculatedSummaries = (0, _summaryLayouts.drawSummaries)({
      data: projectedColumns,
      type: summaryType,
      renderMode: (0, _dataFunctions.stringToFn)(summaryRenderMode, undefined, true),
      styleFn: (0, _dataFunctions.stringToFn)(summaryStyle, function () {
        return {};
      }, true),
      classFn: (0, _dataFunctions.stringToFn)(summaryClass, function () {
        return "";
      }, true),
      //        canvasRender: stringToFn<boolean>(canvasSummaries, undefined, true),
      projection: projection,
      eventListenersGenerator: eventListenersGenerator,
      adjustedSize: adjustedSize,
      baseMarkProps: _objectSpread({}, baseMarkProps, {
        sketchyGenerator: sketchyRenderingEngine && sketchyRenderingEngine.generator
      }),
      //        chartSize: size,
      margin: margin
    });
    calculatedSummaries.originalData = projectedColumns;
  }

  var yMod = projection === "horizontal" ? midMod : zeroFunction;
  var xMod = projection === "vertical" ? midMod : zeroFunction;
  var basePieceData = calculatedPieceData.map(function (d) {
    if (d.piece && d.xy) {
      return _objectSpread({}, d.piece, {
        type: "frame-hover",
        x: d.xy.x + xMod(d.xy),
        y: d.xy.y + yMod(d.xy)
      });
    }

    return null;
  }).filter(function (d) {
    return d;
  });

  if (pieceHoverAnnotation && ["bar", "clusterbar", "timeline"].indexOf(pieceType.type) === -1 || summaryHoverAnnotation) {
    if (summaryHoverAnnotation && calculatedSummaries.xyPoints) {
      pieceDataXY = calculatedSummaries.xyPoints.map(function (d) {
        return _extends({}, d, {
          type: "frame-hover",
          isSummaryData: true,
          x: d.x,
          y: d.y
        });
      });
    } else if (pieceHoverAnnotation && calculatedPieceData) {
      pieceDataXY = basePieceData;
    }
  }

  var _orFrameAxisGenerator = (0, _frameFunctions.orFrameAxisGenerator)({
    axis: arrayWrappedAxis,
    data: allData,
    projection: projection,
    adjustedSize: adjustedSize,
    size: size,
    rScale: rScale,
    rScaleType: instantiatedRScaleType.copy(),
    pieceType: pieceType,
    rExtent: rExtent,
    maxColumnValues: maxColumnValues,
    xyData: basePieceData,
    margin: margin
  }),
      axis = _orFrameAxisGenerator.axis,
      axesTickLines = _orFrameAxisGenerator.axesTickLines;

  if (pieceHoverAnnotation && ["bar", "clusterbar", "timeline"].indexOf(pieceType.type) !== -1) {
    var _yMod = projection === "horizontal" ? midMod : zeroFunction;

    var _xMod = projection === "vertical" ? midMod : zeroFunction;

    columnOverlays = calculatedPieceData.map(function (d, i) {
      var mousePackage = _objectSpread({}, d.piece, {
        x: d.xy.x + _xMod(d.xy),
        y: d.xy.y + _yMod(d.xy)
      });

      if (React.isValidElement(d.renderElement)) {
        return {
          renderElement: d.renderElement,
          overlayData: mousePackage
        };
      }

      return _objectSpread({}, d.renderElement, {
        key: "hover-".concat(i),
        type: "frame-hover",
        style: {
          opacity: 0,
          stroke: "black",
          fill: "pink"
        },
        overlayData: mousePackage,
        onClick: customClickBehavior && function () {
          customClickBehavior(mousePackage.data);
        },
        onDoubleClick: customDoubleClickBehavior && function () {
          customDoubleClickBehavior(mousePackage.data);
        },
        onMouseEnter: customHoverBehavior && function () {
          customHoverBehavior(mousePackage.data);
        },
        onMouseLeave: customHoverBehavior && function () {
          customHoverBehavior();
        }
      });
    });
  }

  var typeAriaLabel = pieceType.type !== undefined && typeof pieceType.type !== "function" && naturalLanguageTypes[pieceType.type] || {
    items: "piece",
    chart: "ordinal chart"
  };
  var orFrameRender = {
    connectors: {
      accessibleTransform: function accessibleTransform(data, i) {
        return data[i];
      },
      projection: projection,
      data: keyedData,
      styleFn: (0, _dataFunctions.stringToFn)(connectorStyle, function () {
        return {};
      }, true),
      classFn: (0, _dataFunctions.stringToFn)(connectorClass, function () {
        return "";
      }, true),
      renderMode: (0, _dataFunctions.stringToFn)(connectorRenderMode, undefined, true),
      canvasRender: connectorCanvasRender,
      behavior: _frameFunctions.orFrameConnectionRenderer,
      type: connectorType,
      eventListenersGenerator: eventListenersGenerator,
      pieceType: pieceType
    },
    summaries: {
      accessibleTransform: function accessibleTransform(data, i) {
        var columnName = oExtent[i];
        var summaryPackage = {
          type: "column-hover",
          column: projectedColumns[columnName],
          pieces: projectedColumns[columnName].pieceData,
          summary: projectedColumns[columnName].pieceData,
          oAccessor: oAccessor
        };
        return summaryPackage;
      },
      data: calculatedSummaries.marks,
      behavior: _summaryLayouts.renderLaidOutSummaries,
      canvasRender: summaryCanvasRender,
      styleFn: (0, _dataFunctions.stringToFn)(summaryStyle, function () {
        return {};
      }, true),
      classFn: (0, _dataFunctions.stringToFn)(summaryClass, function () {
        return "";
      }, true)
    },
    pieces: {
      accessibleTransform: function accessibleTransform(data, i) {
        return _objectSpread({}, data[i].piece ? _objectSpread({}, data[i].piece, data[i].xy) : data[i], {
          type: "frame-hover"
        });
      },
      shouldRender: pieceType.type && pieceType.type !== "none",
      data: calculatedPieceData,
      behavior: _pieceDrawing.renderLaidOutPieces,
      canvasRender: pieceCanvasRender,
      styleFn: (0, _dataFunctions.stringToFn)(pieceStyle, function () {
        return {};
      }, true),
      classFn: (0, _dataFunctions.stringToFn)(pieceClass, function () {
        return "";
      }, true),
      axis: arrayWrappedAxis,
      ariaLabel: typeAriaLabel
    }
  };

  if (rExtentSettings.onChange && (currentState.calculatedRExtent || []).join(",") !== (calculatedRExtent || []).join(",")) {
    rExtentSettings.onChange(calculatedRExtent);
  }

  if (oExtentSettings.onChange && (currentState.calculatedOExtent || []).join(",") !== (calculatedOExtent || []).join(",")) {
    oExtentSettings.onChange(calculatedOExtent);
  }

  return {
    pieceDataXY: pieceDataXY,
    adjustedPosition: adjustedPosition,
    adjustedSize: adjustedSize,
    backgroundGraphics: backgroundGraphics,
    foregroundGraphics: foregroundGraphics,
    axisData: arrayWrappedAxis,
    axes: axis,
    axesTickLines: axesTickLines,
    oLabels: oLabels,
    title: title,
    columnOverlays: columnOverlays,
    renderNumber: currentState.renderNumber + 1,
    oAccessor: oAccessor,
    rAccessor: rAccessor,
    oScaleType: oScaleType,
    rScaleType: instantiatedRScaleType,
    oExtent: oExtent,
    rExtent: rExtent,
    oScale: oScale,
    rScale: rScale,
    calculatedOExtent: calculatedOExtent,
    calculatedRExtent: calculatedRExtent,
    projectedColumns: projectedColumns,
    margin: margin,
    legendSettings: legend,
    orFrameRender: orFrameRender,
    summaryType: summaryType,
    type: pieceType,
    pieceIDAccessor: pieceIDAccessor
  };
};

exports.calculateOrdinalFrame = calculateOrdinalFrame;