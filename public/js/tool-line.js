"use strict";
class LineTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            x.placePixel(Util.screenToCord(CustomMouseEvent.mouseX), Util.screenToCord(CustomMouseEvent.mouseY));
        }
    }
}
