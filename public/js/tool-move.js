"use strict";
class MoveTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            this.firstPoint = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            };
            this.secondPoint = undefined;
        }
        if (CustomMouseEvent.mouseLeftDown) {
            this.secondPoint = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            };
            this.shiftCanvas(this.firstPoint, this.secondPoint);
            this.firstPoint = this.secondPoint;
        }
        else if (!CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            this.onEnd();
        }
    }
    shiftCanvas(pos1, pos2) {
        let changeX = pos1["x"] - pos2["x"];
        let difX = Math.abs(pos1["x"] - pos2["x"]);
        let changeY = pos1["y"] - pos2["y"];
        let difY = Math.abs(pos1["y"] - pos2["y"]);
        let drawing = DrawView.getLayer(0).drawing;
        if (changeX < 0) {
            for (let i = 0; i < difX; i++) {
                drawing.unshift(drawing.pop());
            }
        }
        else {
            for (let i = 0; i < difX; i++) {
                drawing.push(drawing.shift());
            }
        }
        if (changeY < 0) {
            for (let i = 0; i < difY; i++) {
                for (let x = 0; x < drawing.length; x++) {
                    drawing[x].unshift(drawing[x].pop());
                }
            }
        }
        else {
            for (let i = 0; i < difY; i++) {
                for (let x = 0; x < drawing.length; x++) {
                    drawing[x].push(drawing[x].shift());
                }
            }
        }
    }
}
