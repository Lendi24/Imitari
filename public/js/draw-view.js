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
class DrawViewLayer {
    constructor(width, height) {
        this.targetFPS = 30;
        this.drawing = [];
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
    getPixel(x, y) {
        return this.drawing[x][y];
    }
    drawToCanvas(drawing) {
        let canvas = DrawView.jsCanvas;
        canvas.style.imageRendering = "pixelated";
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx['imageSmoothingEnabled'] = false;
        for (let x = 0; x < drawing.length; x++) {
            for (let y = 0; y < drawing[x].length; y++) {
                ctx.beginPath();
                ctx.moveTo(x * DrawView.pixelSize + DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelGapSize);
                ctx.lineTo(x * DrawView.pixelSize + DrawView.pixelSize - DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelGapSize);
                ctx.lineTo(x * DrawView.pixelSize + DrawView.pixelSize - DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelSize - DrawView.pixelGapSize);
                ctx.lineTo(x * DrawView.pixelSize + DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelSize - DrawView.pixelGapSize);
                ctx.lineTo(x * DrawView.pixelSize + DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelGapSize);
                ctx.fillStyle = drawing[x][y].getStrRGBA();
                ctx.fill();
            }
        }
    }
}
class DrawView {
    static changePixelSize() {
    }
    static init(x, y) {
        this.jsCanvas.style.imageRendering = "pixelated";
        this.currentTool = new DrawTool();
        this.newLayer(x, y);
        this.onResize();
    }
    static onResize() {
        if (DrawView.jsCanvas.parentElement != null) {
            DrawView.pixelSize = (Math.min(DrawView.jsCanvas.parentElement.clientWidth / DrawView.getLayer(0).drawing.length, DrawView.jsCanvas.parentElement.clientHeight / DrawView.getLayer(0).drawing[0].length));
            DrawView.jsCanvas.width = DrawView.pixelSize * DrawView.getLayer(0).drawing.length;
            DrawView.jsCanvas.height = DrawView.pixelSize * DrawView.getLayer(0).drawing[0].length;
            DrawView.pixelGapSize = Math.floor(DrawView.pixelSize * 0.05);
        }
    }
    static newLayer(x, y) {
        this.layers[this.layers.length] = new DrawViewLayer(x, y);
    }
    static getLayer(i) {
        return this.layers[i];
    }
}
DrawView.jsCanvas = document.getElementById("drawing-area");
DrawView.jsCanvasCtx = DrawView.jsCanvas.getContext("2d");
DrawView.pixelSize = 5;
DrawView.pixelGapSize = 1;
DrawView.currentTool = new Tool();
DrawView.layers = new Array();
