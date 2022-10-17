"use strict";
class PipetteTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            let cordX = Util.screenToCordX(CustomMouseEvent.mouseX);
            let cordY = Util.screenToCordY(CustomMouseEvent.mouseY);
            let pixel = DrawView.getLayer(0).drawing[cordX][cordY];
            let rgba = pixel.getRGBA();
            ColorPicker.setColor(rgba["r"], rgba["g"], rgba["b"], rgba["a"]);
            ColorPicker.setColorPreview(rgba["r"], rgba["g"], rgba["b"], rgba["a"]);
            ColorPicker.getColor();
        }
        else {
        }
    }
}
