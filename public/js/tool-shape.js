"use strict";
class ShapeTool extends LineTool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            this.center = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            };
            if (this.center["x"] && this.center["y"]) {
                this.onBegin();
            }
            this.radius = 10;
            this.numberOfSides = 4;
            this.offset = 45 * (Math.PI / 180);
            this.drawShape(this.numberOfSides, this.radius, this.offset, this.center);
            this.onEnd();
        }
    }
    drawShape(sides, radius, offset, center) {
        let angle = (2 * Math.PI) / sides;
        this.firstPoint = {
            x: center["x"] + Math.round(radius * Math.cos(angle + offset)),
            y: center["y"] + Math.round(radius * Math.sin(angle + offset))
        };
        for (let i = 0; i <= sides; i++) {
            this.secondPoint = {
                x: center["x"] + Math.round(radius * Math.cos(angle * i + offset)),
                y: center["y"] + Math.round(radius * Math.sin(angle * i + offset))
            };
            this.setLine(this.firstPoint, this.secondPoint);
            this.firstPoint = this.secondPoint;
        }
    }
}
