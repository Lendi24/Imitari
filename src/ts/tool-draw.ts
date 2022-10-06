class DrawTool extends Tool {
    onMouse(event : CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown) {
            DrawView.getLayer(0).placePixel(
                Util.screenToCordX(CustomMouseEvent.mouseX),
                Util.screenToCordY(CustomMouseEvent.mouseY),
            );
        }
    }
}