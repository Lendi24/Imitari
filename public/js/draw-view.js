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
        this.a = Util.clamp(a, 255, 0);
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
        setInterval(function () { obj.drawToCanvas(); }, 1000 / this.targetFPS);
    }
    placePixel(x, y) {
        try {
            this.drawing[x][y].setRGBA(255, 255, 255, 255);
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
    drawToCanvas() {
        let canvas = DrawView.jsCanvas;
        canvas.style.imageRendering = "pixelated";
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx['imageSmoothingEnabled'] = false;
        for (let x = 0; x < this.drawing.length; x++) {
            for (let y = 0; y < this.drawing[x].length; y++) {
                ctx.beginPath();
                ctx.moveTo(x * DrawView.pixelSize + DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelGapSize);
                ctx.lineTo(x * DrawView.pixelSize + DrawView.pixelSize - DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelGapSize);
                ctx.lineTo(x * DrawView.pixelSize + DrawView.pixelSize - DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelSize - DrawView.pixelGapSize);
                ctx.lineTo(x * DrawView.pixelSize + DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelSize - DrawView.pixelGapSize);
                ctx.lineTo(x * DrawView.pixelSize + DrawView.pixelGapSize, y * DrawView.pixelSize + DrawView.pixelGapSize);
                ctx.fillStyle = this.drawing[x][y].getStrRGBA();
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
        DrawView.history.push(JSON.parse(JSON.stringify(DrawView.getLayer(0).drawing)));
    }
    static save() {
        localStorage.setItem("pixelSize", this.pixelSize.toString());
        localStorage.setItem("pixelGapSize", this.pixelGapSize.toString());
        localStorage.setItem("zoom", this.zoom.toString());
        localStorage.setItem("offsetLeft", this.offsetLeft.toString());
        localStorage.setItem("offsetTop", this.offsetTop.toString());
        localStorage.setItem("layers", JSON.stringify(this.layers));
        localStorage.setItem("history", JSON.stringify(this.history));
        localStorage.setItem("currHistoryIndex", this.currHistoryIndex.toString());
        localStorage.setItem("primaryColor", JSON.stringify(this.primaryColour));
        localStorage.setItem("secondaryColor", JSON.stringify(this.secondaryColour));
    }
    static undo() {
        if (DrawView.currHistoryIndex > 0) {
            let newDrawing = DrawView.history[--DrawView.currHistoryIndex];
            for (let x = 0; x < newDrawing.length; x++) {
                this.getLayer(0).drawing[x] = [];
                for (let y = 0; y < newDrawing[x].length; y++) {
                    this.getLayer(0).drawing[x][y] = new Pixel();
                    this.getLayer(0).drawing[x][y].setRGBA(newDrawing[x][y].r, newDrawing[x][y].g, newDrawing[x][y].b, newDrawing[x][y].a);
                }
            }
        }
    }
    static redo() {
        if (DrawView.currHistoryIndex < DrawView.history.length - 1) {
            let newDrawing = DrawView.history[++DrawView.currHistoryIndex];
            for (let x = 0; x < newDrawing.length; x++) {
                this.getLayer(0).drawing[x] = [];
                for (let y = 0; y < newDrawing[x].length; y++) {
                    this.getLayer(0).drawing[x][y] = new Pixel();
                    this.getLayer(0).drawing[x][y].setRGBA(newDrawing[x][y].r, newDrawing[x][y].g, newDrawing[x][y].b, newDrawing[x][y].a);
                }
            }
        }
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
DrawView.pixelSize = (localStorage.getItem("pixelSize")) ? parseInt(localStorage.getItem("pixelSize")) : 5;
DrawView.pixelGapSize = (localStorage.getItem("pixelGapSize")) ? parseInt(localStorage.getItem("pixelGapSize")) : 1;
DrawView.zoom = (localStorage.getItem("zoom")) ? parseInt(localStorage.getItem("zoom")) : 1;
DrawView.offsetLeft = (localStorage.getItem("offsetLeft")) ? parseInt(localStorage.getItem("offsetLeft")) : 0;
DrawView.offsetTop = (localStorage.getItem("offsetTop")) ? parseInt(localStorage.getItem("offsetTop")) : 0;
DrawView.primaryColour = (localStorage.getItem("primaryColor")) ? JSON.parse(localStorage.getItem("primaryColor")) : new Pixel();
DrawView.secondaryColour = (localStorage.getItem("secondaryColor")) ? JSON.parse(localStorage.getItem("secondaryColor")) : new Pixel();
DrawView.currentTool = new Tool();
DrawView.currentToolHTML = document.createElement("div");
DrawView.layers = (localStorage.getItem("layers")) ? JSON.parse(localStorage.getItem("layers")) : new Array();
DrawView.currHistoryIndex = (localStorage.getItem("currHistoryIndex")) ? parseInt(localStorage.getItem("currHistoryIndex")) : 0;
DrawView.history = (localStorage.getItem("history")) ? JSON.parse(localStorage.getItem("history")) : new Array();
