class LineTool extends Tool {

    firstPoint: coordinate | undefined;
    secondPoint: coordinate | undefined;

    onMouse(event: CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            if (typeof this.firstPoint === "undefined") {
                //Sätter första point
                this.firstPoint = {
                    x: Util.screenToCordX(CustomMouseEvent.mouseX),
                    y: Util.screenToCordY(CustomMouseEvent.mouseY)
                }
            }
            else {
                //Sätter andra point
                this.secondPoint = {
                    x: Util.screenToCordX(CustomMouseEvent.mouseX),
                    y: Util.screenToCordY(CustomMouseEvent.mouseY)
                }

                this.setLine(this.firstPoint, this.secondPoint);

                //Resetar linjen
                this.firstPoint = undefined;
            }
        }
    }

    private setLine(cord1: coordinate, cord2: coordinate) {

        //Variabler för att räkna ut linjen
        let cordX, cordY, endPointX, endPointY;
        let deltaX = cord2["x"] - cord1["x"];
        let lengthX = Math.abs(deltaX);
        let deltaY = cord2["y"] - cord1["y"]
        let lengthY = Math.abs(deltaY);

        //Beräknar error margin
        let errorMarginX = 2 * lengthY - lengthX;
        let errorMarginY = 2 * lengthX - lengthY;

        //Om X axeln är störst
        if (lengthY <= lengthX) {

            //Ser till så att linjen alltid ritas från vänster till höger
            if (deltaX >= 0) {
                cordX = cord1["x"]; cordY = cord1["y"]; endPointX = cord2["x"];
            }
            else {
                cordX = cord2["x"]; cordY = cord2["y"]; endPointX = cord1["x"];
            }

            //Ritar ut första pixeln samt resten av linjen
            DrawView.getLayer(0).placePixel(cordX, cordY);
            for (let i = 0; cordX < endPointX; i++) {

                cordX += 1

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

        //Om Y axeln är störst
        else {

            //Ser till så att linjen alltid ritas från botten upp
            if (deltaY >= 0) {
                cordX = cord1["x"]; cordY = cord1["y"]; endPointY = cord2["y"];
            }
            else { // Line is drawn top to bottom
                cordX = cord2["x"]; cordY = cord2["y"]; endPointY = cord1["y"];
            }

            //Ritar ut första pixeln samt resten av linjen
            DrawView.getLayer(0).placePixel(cordX, cordY);
            for (let i = 0; cordY < endPointY; i++) {
                cordY += 1;
                // Deal with octants...
                if (errorMarginY <= 0) {
                    errorMarginY += (2 * lengthX);
                } else {
                    if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
                        cordX += 1;
                    } else {
                        cordX -= 1;
                    }
                    errorMarginY += (2 * (lengthX - lengthY));
                }

                DrawView.getLayer(0).placePixel(cordX, cordY);

            }
        }
    };
}

interface coordinate {
    [key: string]: number;
}