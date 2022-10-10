"use strict";
class Pixel {
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 255;
    }
    getRGBA() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a,
        };
    }
    getStrRGBA() {
        return ("rgba(" +
            this.r + "," +
            this.g + "," +
            this.b + "," +
            this.a + ")");
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
        this.currentTool = new LineTool();
        this.targetFPS = 30;
        this.drawing = [];
        this.pixelSize = 5;
        for (let x = 0; x < width; x++) {
            this.drawing[x] = [];
            for (let y = 0; y < height; y++) {
                this.drawing[x][y] = new Pixel();
            }
        }
        let obj = this;
        setInterval(function () { obj.drawToCanvas(obj.drawing); }, 1000 / this.targetFPS);
    }
    placePixel(x, y) {
        this.drawing[x][y].setRGBA(255, 255, 255, 255);
    }
    drawToCanvas(drawing) {
        let pixelGapSize = 1;
        let canvas = document.getElementById("drawing-area");
        canvas.style.imageRendering = "pixelated";
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx['imageSmoothingEnabled'] = false;
        if (canvas.parentElement != null) {
            this.pixelSize = (Math.min(canvas.parentElement.clientWidth / drawing.length, canvas.parentElement.clientHeight / drawing[0].length));
            canvas.width = this.pixelSize * drawing.length;
            canvas.height = this.pixelSize * drawing[0].length;
        }
        for (let x = 0; x < drawing.length; x++) {
            for (let y = 0; y < drawing[x].length; y++) {
                ctx.beginPath();
                ctx.moveTo(x * this.pixelSize + pixelGapSize, y * this.pixelSize + pixelGapSize);
                ctx.lineTo(x * this.pixelSize + this.pixelSize - pixelGapSize, y * this.pixelSize + pixelGapSize);
                ctx.lineTo(x * this.pixelSize + this.pixelSize - pixelGapSize, y * this.pixelSize + this.pixelSize - pixelGapSize);
                ctx.lineTo(x * this.pixelSize + pixelGapSize, y * this.pixelSize + this.pixelSize - pixelGapSize);
                ctx.lineTo(x * this.pixelSize + pixelGapSize, y * this.pixelSize + pixelGapSize);
                ctx.fillStyle = drawing[x][y].getStrRGBA();
                ctx.fill();
            }
        }
    }
}
class Util {
}
Util.clamp = (num, max, min) => Math.min(Math.max(num, min), max);
Util.screenToCord = (cord) => Math.floor(cord / x.pixelSize);
let x = new CanvasDraw(20, 20);
