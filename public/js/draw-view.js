"use strict";
class Pixel {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
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
                this.drawing[x][y] = new Pixel(0, 0, 0, 255);
            }
        }
        let obj = this;
        DrawView.interval = setInterval(function () { obj.drawToCanvas(); }, 1000 / this.targetFPS);
    }
    placePixel(x, y) {
        try {
            if (!DrawView.affectedPixels.includes(this.drawing[x][y])) {
                if (ColorPicker.a == 0) {
                    this.drawing[x][y].setRGBA(ColorPicker.r, ColorPicker.g, ColorPicker.b, ColorPicker.a);
                }
                else if (ColorPicker.a < 1) {
                    let oldColor = JSON.parse(JSON.stringify(this.drawing[x][y].getRGBA()));
                    let mixedColor = ColorPicker.mixTwoRgba(oldColor, ColorPicker.getRGBA());
                    this.drawing[x][y].setRGBA(mixedColor["r"], mixedColor["g"], mixedColor["b"], mixedColor["a"]);
                }
                else {
                    this.drawing[x][y].setRGBA(ColorPicker.r, ColorPicker.g, ColorPicker.b, ColorPicker.a);
                }
                DrawView.affectedPixels.push(this.drawing[x][y]);
            }
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
        ctx.clearRect(0, 0, this.drawing.length * DrawView.pixelSize, this.drawing[0].length * DrawView.pixelSize);
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
    clearCurrentLayer() {
        for (let x = 0; x < this.drawing.length; x++) {
            for (let y = 0; y < this.drawing[x].length; y++) {
                this.drawing[x][y].setRGBA(0, 0, 0, 255);
            }
        }
        DrawView.history[++DrawView.currHistoryIndex] = JSON.parse(JSON.stringify(DrawView.getLayer(0).drawing));
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
    static newDrawView(x, y) {
        clearInterval(DrawView.interval);
        DrawView.layers = new Array();
        DrawView.history = new Array();
        DrawView.init(x, y);
    }
    static loadDrawView(layers, history, historyIndex) {
        let width = layers[0].drawing.length;
        let height = layers[0].drawing[0].length;
        this.newDrawView(width, height);
        for (let i = 0; i < layers.length; i++) {
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    DrawView.layers[i].drawing[x][y].r = layers[i].drawing[x][y].r;
                    DrawView.layers[i].drawing[x][y].g = layers[i].drawing[x][y].g;
                    DrawView.layers[i].drawing[x][y].b = layers[i].drawing[x][y].b;
                    DrawView.layers[i].drawing[x][y].a = layers[i].drawing[x][y].a;
                }
            }
        }
        DrawView.history = history;
        DrawView.currHistoryIndex = historyIndex;
        console.log("layers[0]");
    }
    static undo() {
        if (DrawView.currHistoryIndex > 0) {
            let newDrawing = DrawView.history[--DrawView.currHistoryIndex];
            for (let x = 0; x < newDrawing.length; x++) {
                this.getLayer(0).drawing[x] = [];
                for (let y = 0; y < newDrawing[x].length; y++) {
                    this.getLayer(0).drawing[x][y] = new Pixel(0, 0, 0, 255);
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
                    this.getLayer(0).drawing[x][y] = new Pixel(0, 0, 0, 255);
                    this.getLayer(0).drawing[x][y].setRGBA(newDrawing[x][y].r, newDrawing[x][y].g, newDrawing[x][y].b, newDrawing[x][y].a);
                }
            }
        }
    }
    static save() {
        let saveData = {
            layerData: DrawView.layers,
            history: DrawView.history,
            historyIndex: DrawView.currHistoryIndex,
        };
        let jsonSaveData = JSON.stringify(saveData);
        let a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonSaveData));
        a.download = prompt("Please enter a valid name", "imi") + '.tari';
        a.click();
    }
    static load() {
        let a = document.createElement('input');
        a.type = "file";
        a.accept = ".tari";
        a.click();
        a.addEventListener("change", function (e) {
            if (e.target.files[0].name.split('.').pop().toLowerCase() == "tari") {
                let reader = new FileReader();
                let file = e.target.files[0];
                reader.onload = function (e) {
                    let contents = e.target.result;
                    let saveData = (JSON.parse(contents));
                    DrawView.loadDrawView(saveData.layerData, saveData.history, saveData.historyIndex);
                };
                reader.readAsText(file);
            }
            else {
                alert("🖕 Not a .tari file >:(");
            }
        }, false);
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
DrawView.primaryColour = new Pixel(0, 0, 0, 255);
DrawView.secondaryColour = new Pixel(0, 0, 0, 255);
DrawView.currentTool = new Tool();
DrawView.currentToolHTML = document.createElement("div");
DrawView.layers = new Array();
DrawView.affectedPixels = new Array();
DrawView.currHistoryIndex = 0;
DrawView.history = new Array();
DrawView.lockedHTML = document.getElementById("lock");
DrawView.locked = false;
DrawView.interval = 0;
DrawView.init(100, 80);
