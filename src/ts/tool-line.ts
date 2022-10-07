class LineTool extends Tool {

    firstPoint: coordinate | undefined;
    secondPoint: coordinate | undefined;

    onMouse(event: CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            if (typeof this.firstPoint === "undefined") {
                //Sätter första point
                this.firstPoint = {
                    x: Util.screenToCord(CustomMouseEvent.mouseX),
                    y: Util.screenToCord(CustomMouseEvent.mouseY)
                }
            }
            else {
                //Sätter andra point
                this.secondPoint = {
                    x: Util.screenToCord(CustomMouseEvent.mouseX),
                    y: Util.screenToCord(CustomMouseEvent.mouseY)
                }

                this.setLine(this.firstPoint, this.secondPoint);

                //Resetar linjen
                this.firstPoint = undefined;
                this.secondPoint = undefined;
            }
        }
    }

    private setLine(cord1: coordinate, cord2: coordinate) {
        // Iterators, counters required by algorithm
        let cordX, cordY, endPointX, endPointY;
        // Calculate line deltas
        let deltaX = cord2["x"] - cord1["x"];
        let lengthX = Math.abs(deltaX);
        let deltaY = cord2["y"] - cord1["y"]
        let lengthY = Math.abs(deltaY);

        // Calculate error intervals for both axis
        let px = 2 * lengthY - lengthX;
        let py = 2 * lengthX - lengthY;

        // The line is X-axis dominant
        if (lengthY <= lengthX) {
            // Line is drawn left to right
            if (deltaX >= 0) {
                cordX = cord1["x"]; cordY = cord1["y"]; endPointX = cord2["x"];
            }
            else { // Line is drawn right to left (swap ends)
                cordX = cord2["x"]; cordY = cord2["y"]; endPointX = cord1["x"];
            }
            x.placePixel(cordX, cordY); // Draw first pixel
            // Rasterize the line
            for (let i = 0; cordX < endPointX; i++) {
                cordX += 1
                // Deal with octants...
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
                // Draw pixel from line span at
                // currently rasterized position
                x.placePixel(cordX, cordY);
            }
        } else { // The line is Y-axis dominant
            // Line is drawn bottom to top
            if (deltaY >= 0) {
                cordX = cord1["x"]; cordY = cord1["y"]; endPointY = cord2["y"];
            }
            else { // Line is drawn top to bottom
                cordX = cord2["x"]; cordY = cord2["y"]; endPointY = cord1["y"];
            }
            x.placePixel(cordX, cordY); // Draw first pixel
            // Rasterize the line
            for (let i = 0; cordY < endPointY; i++) {
                cordY += 1;
                // Deal with octants...
                if (py <= 0) {
                    py += (2 * lengthX);
                } else {
                    if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
                        cordX += 1;
                    } else {
                        cordX -= 1;
                    }
                    py += (2 * (lengthX - lengthY));
                }
                // Draw pixel from line span at
                // currently rasterized position
                x.placePixel(cordX, cordY);
            }
        }
    };
}

interface coordinate {
    [key: string]: number;
}