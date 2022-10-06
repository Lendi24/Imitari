class DrawTool extends Tool {
    onMouse(event : CustomMouseEvent) {
        if (event.mouseLeftDown) {
            x.placePixel(
                Util.screenToCord(event.mouseX),
                Util.screenToCord(event.mouseY),

            );
        }
    }
}