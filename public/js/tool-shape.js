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
            this.numberOfSides = 6;
            let angle = (2 * Math.PI) / this.numberOfSides;
            this.firstPoint = {
                x: this.center["x"] + Math.round(this.radius * Math.cos(angle)),
                y: this.center["y"] + Math.round(this.radius * Math.sin(angle))
            };
            for (let i = 0; i <= this.numberOfSides; i++) {
                this.secondPoint = {
                    x: this.center["x"] + Math.round(this.radius * Math.cos(angle * i)),
                    y: this.center["y"] + Math.round(this.radius * Math.sin(angle * i))
                };
                this.setLine(this.firstPoint, this.secondPoint);
                this.firstPoint = this.secondPoint;
            }
            this.drawShape(this.numberOfSides, this.radius, this.center);
            this.onEnd();
        }
    }
    drawShape(sides, radius, center) {
        let angle = (2 * Math.PI) / sides;
        this.firstPoint = {
            x: center["x"] + Math.round(radius * Math.cos(angle)),
            y: center["y"] + Math.round(radius * Math.sin(angle))
        };
        for (let i = 0; i <= sides; i++) {
            this.secondPoint = {
                x: center["x"] + Math.round(radius * Math.cos(angle * i)),
                y: center["y"] + Math.round(radius * Math.sin(angle * i))
            };
            this.setLine(this.firstPoint, this.secondPoint);
            this.firstPoint = this.secondPoint;
        }
    }
}
