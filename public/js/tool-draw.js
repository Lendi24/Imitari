"use strict";
class DrawTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown) {
            DrawView.getLayer(0).placePixel(Util.screenToCordX(CustomMouseEvent.mouseX), Util.screenToCordY(CustomMouseEvent.mouseY));
        }
    }
}
