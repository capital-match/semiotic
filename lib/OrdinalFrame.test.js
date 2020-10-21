"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _OrdinalFrame = _interopRequireDefault(require("./OrdinalFrame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var someBarData = [{
  column: "a",
  cats: 15,
  dogs: 20
}, {
  column: "a",
  cats: 20,
  dogs: 30
}, {
  column: "b",
  cats: 30,
  dogs: 10
}, {
  column: "c",
  cats: 100,
  dogs: 50
}];
var stackedBarData = [{
  column: "a",
  species: "cat",
  value: 30
}, {
  column: "a",
  species: "cat",
  value: 50
}, {
  column: "b",
  species: "cat",
  value: 10
}, {
  column: "c",
  species: "cat",
  value: 50
}, {
  column: "a",
  species: "dog",
  value: 15
}, {
  column: "a",
  species: "dog",
  value: 20
}, {
  column: "b",
  species: "dog",
  value: 30
}, {
  column: "c",
  species: "dog",
  value: 100
}];
var htmlAnnotation = {
  column: "b",
  value: 30,
  type: "frame-hover"
};
var svgAnnotation = {
  column: "b",
  value: 30,
  type: "or"
};
var stackedGeneratedHTMLAnnotation = {
  column: "b",
  value: 30,
  type: "frame-hover",
  rName: "dog"
};
var stackedHTMLAnnotation = {
  column: "c",
  type: "frame-hover",
  species: "dog"
};
describe("OrdinalFrame", function () {
  it("renders", function () {
    (0, _enzyme.mount)(_react.default.createElement(_OrdinalFrame.default, {
      data: someBarData,
      oAccessor: "column",
      rAccessor: "cats",
      disableContext: true
    }));
  });
  it("renders a <Frame>", function () {
    var wrapper = (0, _enzyme.shallow)(_react.default.createElement(_OrdinalFrame.default, {
      data: someBarData,
      oAccessor: "column",
      rAccessor: "cats",
      disableContext: true
    }));
    expect(wrapper.find("Frame").length).toEqual(1);
  });
  var projections = ["vertical", "horizontal", "radial"];
  var xValues = [250, 88.23529411764706, 250];
  var yValues = [411.7647058823529, 250, 265];
  var yMods = [10, 0, 0];
  var xMods = [0, 10, 0];
  var mountedStacked = (0, _enzyme.mount)(_react.default.createElement(_OrdinalFrame.default, {
    size: [500, 500],
    data: stackedBarData,
    oAccessor: "column",
    rAccessor: "value",
    pieceIDAccessor: "species",
    disableContext: true,
    projection: "horizontal",
    annotations: [stackedHTMLAnnotation]
  }));
  var stackedAnnotationPosition = mountedStacked.find("div.annotation.annotation-or-label").getDOMNode().style;
  it("properly positions a piece ID accessor annotation", function () {
    expect(stackedAnnotationPosition.left).toEqual("250px");
    expect(parseInt(stackedAnnotationPosition.top)).toEqual(416);
  });
  var mountedStackedGenerated = (0, _enzyme.mount)(_react.default.createElement(_OrdinalFrame.default, {
    size: [500, 500],
    data: someBarData,
    oAccessor: "column",
    rAccessor: ["cats", "dogs"],
    disableContext: true,
    projection: "horizontal",
    annotations: [stackedGeneratedHTMLAnnotation],
    type: "bar"
  }));
  var stackedGeneratedAnnotationPosition = mountedStackedGenerated.find("div.annotation.annotation-or-label").getDOMNode().style;
  it("properly positions a piece ID accessor annotation", function () {
    expect(stackedGeneratedAnnotationPosition.top).toEqual("250px");
    expect(parseInt(stackedGeneratedAnnotationPosition.left)).toEqual(100);
  });
  var mountedPixelColumnWidth = (0, _enzyme.mount)(_react.default.createElement(_OrdinalFrame.default, {
    size: [500, 0],
    pixelColumnWidth: 30,
    data: someBarData,
    oAccessor: "column",
    rAccessor: "cats",
    disableContext: true,
    projection: "horizontal",
    oPadding: 5,
    type: "bar"
  }));
  var svgHeight = mountedPixelColumnWidth.find("svg.visualization-layer").props().height;
  it("renders a zero height frame with mountedPixelColumnWidth", function () {
    expect(svgHeight).toEqual(90);
  });
  var mountedPixelColumnWidthWithMargin = (0, _enzyme.mount)(_react.default.createElement(_OrdinalFrame.default, {
    size: [500, 0],
    pixelColumnWidth: 30,
    oPadding: 5,
    data: someBarData,
    oAccessor: "column",
    rAccessor: "cats",
    disableContext: true,
    projection: "horizontal",
    margin: 30,
    type: "bar"
  }));
  var firstColumnBar = mountedPixelColumnWidth.find("rect").first().props();
  var secondColumnBar = mountedPixelColumnWidthWithMargin.find("rect").first().props();
  it("renders an svg annotation", function () {
    expect(firstColumnBar.height).toEqual(25);
  });
  it("renders an svg annotation", function () {
    expect(secondColumnBar.height).toEqual(firstColumnBar.height);
  });
  projections.forEach(function (projection, index) {
    var mountedFrameWithAnnotation = (0, _enzyme.mount)(_react.default.createElement(_OrdinalFrame.default, {
      data: someBarData,
      oAccessor: "column",
      rAccessor: "cats",
      disableContext: true,
      annotations: [htmlAnnotation, svgAnnotation],
      projection: projection
    }));
    var svgAnnotationOR = mountedFrameWithAnnotation.find("g.annotation-or-label > text");
    it("renders an svg annotation", function () {
      expect(svgAnnotationOR.length).toEqual(1);
    });
    it("renders an html annotation", function () {
      expect(mountedFrameWithAnnotation.find("div.annotation.annotation-or-label").length).toEqual(1);
    });
    var htmlAnnotationStyle = mountedFrameWithAnnotation.find("div.annotation.annotation-or-label").getDOMNode().style;
    var x = xValues[index];
    var y = yValues[index];
    it("".concat(projection, " html and svg annotations have the same x & y positions for each"), function () {
      expect(svgAnnotationOR.props().x).toEqual(x + xMods[index]);
      expect(svgAnnotationOR.props().y).toEqual(y + yMods[index]);
      expect(htmlAnnotationStyle.left).toEqual("".concat(x, "px"));
      expect(htmlAnnotationStyle.top).toEqual("".concat(y, "px"));
    });
  });
});