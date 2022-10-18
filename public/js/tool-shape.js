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
            "Rotation": {
                value: 0,
                type: "range",
                step: 1,
                min: 0,
                max: 360,
                icon: "mdi-format-rotate-90",
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
            let offset = this.conf["Rotation"].value * (Math.PI / 180);
            this.drawShape(numberOfSides, radius, offset, this.center);
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
