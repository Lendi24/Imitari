"use strict";
class DrawTool extends ShapeTool {
    constructor() {
        super(...arguments);
        this.conf = {
            "Size": {
                value: 1,
                type: "number",
                step: 1,
                min: 1,
                max: 50,
                icon: "mdi-fountain-pen-tip",
            },
        };
        this.numberOfBrushSides = 1000;
    }
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            this.point1 = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            };
            if (this.point1["x"] && this.point1["y"]) {
                this.onBegin();
            }
            this.drawStroke(this.conf["Size"].value - 1, this.numberOfBrushSides, 0, this.point1, this.point1);
            this.point2 = undefined;
        }
        else if (CustomMouseEvent.mouseLeftDown) {
            this.point2 = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            };
            this.drawStroke(this.conf["Size"].value - 1, this.numberOfBrushSides, 0, this.point1, this.point2);
            this.point1 = this.point2;
        }
        else if (!CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            this.onEnd();
        }
    }
    drawStroke(size, sides, offset, cord1, cord2) {
        let lineCoords = this.setLine(cord1, cord2);
        lineCoords.forEach(cord => {
            for (let i = 0; i <= size; i++) {
                this.drawShape(sides, i, offset, cord);
            }
        });
    }
}
