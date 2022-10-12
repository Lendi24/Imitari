"use strict";
class Pixel {
    constructor() {
        this.color = new Color(0, 0, 0, 1);
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
        try {
            this.drawing[x][y].color = new Color(DrawView.primaryColour.r, DrawView.primaryColour.g, DrawView.primaryColour.b, DrawView.primaryColour.a);
        }
        catch (error) { }
    }
    getPixel(x, y) {
        return this.drawing[x][y];
    }
    getCanvasWidth() {
        return this.drawing.length;
    }
    getCanvasHeight() {
        return this.drawing[0].length;
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
                ctx.fillStyle = drawing[x][y].color.getStrRGBA();
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
DrawView.zoom = 1;
DrawView.offsetLeft = 0;
DrawView.offsetTop = 0;
DrawView.primaryColour = new Color(0, 0, 0, 0);
DrawView.secondaryColour = new Color(0, 0, 0, 0);
DrawView.currentTool = new Tool();
DrawView.currentToolHTML = document.createElement("div");
DrawView.layers = new Array();
DrawView.init(100, 80);
