"use strict";
class LineTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            if (typeof this.firstPoint === "undefined") {
                this.firstPoint = {
                    x: Util.screenToCordX(CustomMouseEvent.mouseX),
                    y: Util.screenToCordY(CustomMouseEvent.mouseY)
                };
            }
            else {
                this.secondPoint = {
                    x: Util.screenToCordX(CustomMouseEvent.mouseX),
                    y: Util.screenToCordY(CustomMouseEvent.mouseY)
                };
                if (this.secondPoint["x"] && this.secondPoint["y"]) {
                    this.onBegin();
                }
                this.setLine(this.firstPoint, this.secondPoint);
                this.firstPoint = undefined;
            }
        }
    }
    setLine(cord1, cord2) {
        let cordX, cordY, endPointX, endPointY;
        let deltaX = cord2["x"] - cord1["x"];
        let lengthX = Math.abs(deltaX);
        let deltaY = cord2["y"] - cord1["y"];
        let lengthY = Math.abs(deltaY);
        let errorMarginX = 2 * lengthY - lengthX;
        let errorMarginY = 2 * lengthX - lengthY;
        if (lengthY <= lengthX) {
            if (deltaX >= 0) {
                cordX = cord1["x"];
                cordY = cord1["y"];
                endPointX = cord2["x"];
            }
            else {
                cordX = cord2["x"];
                cordY = cord2["y"];
                endPointX = cord1["x"];
            }
            DrawView.getLayer(0).placePixel(cordX, cordY);
            for (let i = 0; cordX < endPointX; i++) {
                cordX += 1;
                if (errorMarginX < 0) {
                    errorMarginX += (2 * lengthY);
                }
                else {
                    if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
                        cordY += 1;
                    }
                    else {
                        cordY -= 1;
                    }
                    errorMarginX += (2 * (lengthY - lengthX));
                }
                DrawView.getLayer(0).placePixel(cordX, cordY);
            }
        }
        else {
            if (deltaY >= 0) {
                cordX = cord1["x"];
                cordY = cord1["y"];
                endPointY = cord2["y"];
            }
            else {
                cordX = cord2["x"];
                cordY = cord2["y"];
                endPointY = cord1["y"];
            }
            DrawView.getLayer(0).placePixel(cordX, cordY);
            for (let i = 0; cordY < endPointY; i++) {
                cordY += 1;
                if (errorMarginY <= 0) {
                    errorMarginY += (2 * lengthX);
                }
                else {
                    if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
                        cordX += 1;
                    }
                    else {
                        cordX -= 1;
                    }
                    errorMarginY += (2 * (lengthX - lengthY));
                }
                DrawView.getLayer(0).placePixel(cordX, cordY);
            }
        }
    }
    ;
}
