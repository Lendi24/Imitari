"use strict";
class LineTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            DrawView.getLayer(0).placePixel(Util.screenToCord(CustomMouseEvent.mouseX), Util.screenToCord(CustomMouseEvent.mouseY));
        }
    }
}
