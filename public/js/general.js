"use strict";
DrawView.init(20, 10);
class Util {
}
Util.clamp = (num, max, min) => Math.min(Math.max(num, min), max);
Util.screenToCord = (cord) => Math.floor(cord / DrawView.getLayer(0).pixelSize);
