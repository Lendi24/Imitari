"use strict";
DrawView.init(20, 10);
class Util {
}
Util.clamp = (num, max, min) => Math.min(Math.max(num, min), max);
Util.screenToCordX = (cord) => { var _a; return Util.screenToCord(cord - (window.screen.width - ((_a = document.getElementById("drawing-area")) === null || _a === void 0 ? void 0 : _a.clientWidth)) / 2); };
Util.screenToCordY = (cord) => { var _a; return Util.screenToCord(cord - (window.screen.height - ((_a = document.getElementById("drawing-area")) === null || _a === void 0 ? void 0 : _a.clientHeight)) / 2); };
Util.screenToCord = (cord) => Math.floor(cord / DrawView.getLayer(0).pixelSize);
