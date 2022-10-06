"use strict";
class DrawTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown) {
            DrawView.getLayer(0).placePixel(Util.screenToCord(CustomMouseEvent.mouseX), Util.screenToCord(CustomMouseEvent.mouseY));
        }
    }
}
