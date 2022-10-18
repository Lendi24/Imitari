"use strict";
class ShapeTool extends LineTool {
    constructor() {
        super(...arguments);
        this.conf = {
            "Corners": {
                value: 6,
                type: "number",
                step: 1,
                min: 1,
                max: 100,
                icon: "mdi-shape-polygon-plus",
            },
            "Radius": {
                value: 8,
                type: "number",
                step: 1,
                min: 1,
                max: 100,
                icon: "mdi-radius-outline",
            },
        };
    }
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            this.center = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            };
            if (this.center["x"] && this.center["y"]) {
                this.onBegin();
            }
            let radius = this.conf["Radius"].value;
            let numberOfSides = this.conf["Corners"].value;
            let angle = (2 * Math.PI) / numberOfSides;
            this.firstPoint = {
                x: this.center["x"] + Math.round(radius * Math.cos(angle)),
                y: this.center["y"] + Math.round(radius * Math.sin(angle))
            };
            for (let i = 0; i <= numberOfSides; i++) {
                this.secondPoint = {
                    x: this.center["x"] + Math.round(radius * Math.cos(angle * i)),
                    y: this.center["y"] + Math.round(radius * Math.sin(angle * i))
                };
                this.setLine(this.firstPoint, this.secondPoint);
                this.firstPoint = this.secondPoint;
            }
            this.drawShape(numberOfSides, radius, this.center);
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
