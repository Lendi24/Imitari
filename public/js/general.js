"use strict";
class Util {
}
Util.clamp = (num, max, min) => Math.min(Math.max(num, min), max);
Util.screenToCordX = (cord) => Util.clamp(Util.screenToCord(cord - DrawView.jsCanvas.getBoundingClientRect().x), DrawView.getLayer(0).drawing.length - 1, 0);
Util.screenToCordY = (cord) => Util.clamp(Util.screenToCord(cord - DrawView.jsCanvas.getBoundingClientRect().y), DrawView.getLayer(0).drawing[0].length - 1, 0);
Util.screenToCord = (cord) => Math.floor(cord / DrawView.pixelSize);
DrawView.init(100, 80);
