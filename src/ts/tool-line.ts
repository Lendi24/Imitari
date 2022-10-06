class LineTool extends Tool {
    onMouse(event : CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            x.placePixel(
                Util.screenToCord(CustomMouseEvent.mouseX),
                Util.screenToCord(CustomMouseEvent.mouseY),

            );
        }
    }
}