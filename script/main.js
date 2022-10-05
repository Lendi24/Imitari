"use strict";
class Pixel {
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 0;
    }
    getRGBA() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a,
        };
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
        let obj = this;
        setInterval(function () { obj.drawToCanvas(obj.drawing); }, 1000 / this.targetFPS);
    }
    drawToCanvas(drawing) {
        let pixelSize = 5;
        let pixelGapSize = 1;
        let canvas = document.getElementById("drawing-area");
        canvas.style.imageRendering = "pixelated";
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx['imageSmoothingEnabled'] = false; /* standard */
        if (canvas.parentElement != null) {
            /*
            if (drawing[0].length > drawing.length) {
                canvas.width = canvas.parentElement.clientWidth;

            } else {
                canvas.height = canvas.parentElement.clientHeight;

            }*/
            //canvas.width = canvas.parentElement.clientWidth;
            //canvas.height = canvas.parentElement.clientHeight;    
            pixelSize = (Math.min(canvas.parentElement.clientWidth / drawing.length, canvas.parentElement.clientHeight / drawing[0].length));
            canvas.width = pixelSize * drawing.length;
            canvas.height = pixelSize * drawing[0].length;
            console.log(pixelSize);
        }
        //let pixelSize = Util.pixelSize * Util.zoomFactor;
        //Util.zoomFactor*=1.01;
        for (let x = 0; x < drawing.length; x++) {
            for (let y = 0; y < drawing[x].length; y++) {
                ctx.imageSmoothingEnabled = false;
                ctx.beginPath();
                ctx.moveTo(x * pixelSize + pixelGapSize, y * pixelSize + pixelGapSize);
                ctx.lineTo(x * pixelSize + pixelSize - pixelGapSize, y * pixelSize + pixelGapSize);
                ctx.lineTo(x * pixelSize + pixelSize - pixelGapSize, y * pixelSize + pixelSize - pixelGapSize);
                ctx.lineTo(x * pixelSize + pixelGapSize, y * pixelSize + pixelSize - pixelGapSize);
                ctx.lineTo(x * pixelSize + pixelGapSize, y * pixelSize + pixelGapSize);
                ctx.fillStyle = "rgb(" + drawing[x][y].getRGBA().r + ", " + drawing[x][y].getRGBA().g + ", " + drawing[x][y].getRGBA().b + ")";
                ctx.fill();
            }
        }
    }
}
class Util {
}
Util.clamp = (num, max, min) => Math.min(Math.max(num, min), max);
let x = new CanvasDraw(20, 10);
