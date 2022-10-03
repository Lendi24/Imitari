"use strict";
class Pixel {
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
    }
    setRGBA(r, g, b, a) {
        this.r = Util.clamp(r, 255, 0);
        this.g = Util.clamp(g, 255, 0);
        this.b = Util.clamp(b, 255, 0);
        this.b = Util.clamp(a, 255, 0);
    }
}
class CanvasDraw {
    constructor(width, height) {
        this.targetFPS = 30;
        this.drawing = [];
        for (let x = 0; x < width; x++) {
            this.drawing[x] = [];
            for (let y = 0; y < height; y++) {
                this.drawing[x][y] = new Pixel();
            }
        }
        setInterval(this.drawToCanvas, 1000 / this.targetFPS);
    }
    drawToCanvas() {
        let canvas = document.getElementById("drawing-area");
        let ctx = canvas.getContext("2d");
        for (let x = 0; x < this.drawing.length; x++) {
            for (let y = 0; y < this.drawing[x].length; y++) {
            }
        }
    }
}
class Util {
}
Util.clamp = (num, max, min) => Math.min(Math.max(num, min), max);
