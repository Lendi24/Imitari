class DrawTool extends ShapeTool {

    conf = {
        "Size" : {
            value : 1, 
            type : "number", 
            step : 1, 
            min : 1, 
            max : 50, 
            icon : "mdi-format-letter-spacing-variant", 

        },
    }

    point1: coordinate | undefined
    point2: coordinate | undefined;
    //size = 5;
    numberOfBrushSides = 1000;
    angle = 45;

    onMouse(event: CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            this.point1 = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            }

            if (this.point1["x"] && this.point1["y"]) {
                this.onBegin();
            }

            this.drawStroke(this.conf["Size"].value-1, this.numberOfBrushSides, this.angle, this.point1, this.point1);
            this.point2 = undefined;
        }
        else if (CustomMouseEvent.mouseLeftDown) {

            this.point2 = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            }

            this.drawStroke(this.conf["Size"].value-1, this.numberOfBrushSides, this.angle, this.point1!, this.point2);
            this.point1 = this.point2;

        }
        else if (!CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            //Funktionen har utförts
            this.onEnd();
        }
    }

    drawStroke(size: number, sides: number, offset: number, cord1: coordinate, cord2: coordinate) {
        let lineCoords = this.setLine(cord1, cord2);
        lineCoords.forEach(cord => {
            for (let i = 0; i <= size; i++) {
                this.drawShape(sides, i, offset, cord);
            }
        });
    }
}