"use strict";
class DrawTool extends Tool {
    onMouse(event) {
        if (event.mouseLeftDown) {
            x.placePixel(Util.screenToCord(event.mouseX), Util.screenToCord(event.mouseY));
        }
    }
}
