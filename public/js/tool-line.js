"use strict";
class LineTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            if (typeof this.firstPoint === "undefined") {
                this.firstPoint = {
                    x: Util.screenToCord(CustomMouseEvent.mouseX),
                    y: Util.screenToCord(CustomMouseEvent.mouseY)
                };
            }
            else {
                this.secondPoint = {
                    x: Util.screenToCord(CustomMouseEvent.mouseX),
                    y: Util.screenToCord(CustomMouseEvent.mouseY)
                };
                this.setLine(this.firstPoint, this.secondPoint);
                this.firstPoint = undefined;
                this.secondPoint = undefined;
            }
        }
    }
    setLine(cord1, cord2) {
        let cordX, cordY, endPointX, endPointY;
        let deltaX = cord2["x"] - cord1["x"];
        let lengthX = Math.abs(deltaX);
        let deltaY = cord2["y"] - cord1["y"];
        let lengthY = Math.abs(deltaY);
        let px = 2 * lengthY - lengthX;
        let py = 2 * lengthX - lengthY;
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
            x.placePixel(cordX, cordY);
            for (let i = 0; cordX < endPointX; i++) {
                cordX += 1;
                if (px < 0) {
                    px += (2 * lengthY);
                }
                else {
                    if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
                        cordY += 1;
                    }
                    else {
                        cordY -= 1;
                    }
                    px += (2 * (lengthY - lengthX));
                }
                x.placePixel(cordX, cordY);
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
            x.placePixel(cordX, cordY);
            for (let i = 0; cordY < endPointY; i++) {
                cordY += 1;
                if (py <= 0) {
                    py += (2 * lengthX);
                }
                else {
                    if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
                        cordX += 1;
                    }
                    else {
                        cordX -= 1;
                    }
                    py += (2 * (lengthX - lengthY));
                }
                x.placePixel(cordX, cordY);
            }
        }
    }
    ;
}
