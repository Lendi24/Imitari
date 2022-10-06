
class Pixel {
    private r : number;
    private g : number;
    private b : number;
    private a : number;

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
        }
    }

    setRGBA(r : number, g : number, b : number, a : number) {
        this.r = Util.clamp(r, 255, 0);
        this.g = Util.clamp(g, 255, 0);
        this.b = Util.clamp(b, 255, 0);
        this.b = Util.clamp(a, 255, 0);
    }


}

class CanvasDraw {
    private targetFPS: number;

    drawing: Pixel[][];

    constructor(width : number, height : number) {
        this.targetFPS = 30;

        this.drawing = [];
        

        for (let x = 0; x < width; x++) {
            this.drawing[x] = [];
            for (let y = 0; y < height; y++) {
                this.drawing[x][y] = new Pixel();
            }
        }

        let obj = this;
        setInterval(function () {obj.drawToCanvas(obj.drawing)}, 1000/this.targetFPS); 
    }

    drawToCanvas(drawing : Pixel[][]) {
        let pixelSize = 5;
        let pixelGapSize = 1;

        let canvas = <HTMLCanvasElement>document.getElementById("drawing-area");
        canvas.style.imageRendering = "pixelated";

        let ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;
        ctx['imageSmoothingEnabled'] = false;       /* standard */

        if (canvas.parentElement != null) {
            pixelSize = (Math.min(canvas.parentElement.clientWidth / drawing.length, canvas.parentElement.clientHeight / drawing[0].length));

            canvas.width  = pixelSize * drawing.length;
            canvas.height = pixelSize * drawing[0].length;
            
            console.log(pixelSize)
        }

        for (let x = 0; x < drawing.length; x++) {
            for (let y = 0; y < drawing[x].length; y++) {
                ctx.beginPath();

                ctx.moveTo(x*pixelSize+pixelGapSize,            y*pixelSize+pixelGapSize);
                ctx.lineTo(x*pixelSize+pixelSize-pixelGapSize,  y*pixelSize+pixelGapSize);
                ctx.lineTo(x*pixelSize+pixelSize-pixelGapSize,  y*pixelSize+pixelSize-pixelGapSize);
                ctx.lineTo(x*pixelSize+pixelGapSize,            y*pixelSize+pixelSize-pixelGapSize);
                ctx.lineTo(x*pixelSize+pixelGapSize,            y*pixelSize+pixelGapSize);
                
                ctx.fillStyle = "rgb("+drawing[x][y].getRGBA().r+", "+drawing[x][y].getRGBA().g+", "+drawing[x][y].getRGBA().b+")"
                ctx.fill();    
            }            
        }
    }
}

class Util {
    static clamp = (num : number, max : number, min : number,) => Math.min(Math.max(num, min), max);
}

let x = new CanvasDraw(20,10)

function setLine(x1: number, y1: number, x2: number, y2: number){
    console.log(x1 + ", " + y1 + " : " + x2 + ", " + y2);

    let slopeFactor = (x1 - x2)

    for (let i = 0; i < x.drawing.length; i++) {
        for (let k = 0; k < x.drawing[i].length; k++) {
            
        }
    }
    // x.drawing[7][6].setRGBA(22, 78, 100, 100);
    // x.drawToCanvas(x.drawing);
}

let secondClick = false;
let x1: number, x2: number, y1: number, y2: number;
document.getElementById("drawing-area")!.addEventListener("click", function(event){
    if (secondClick) {
        x2 = event.clientX
        y2 = event.clientY;
        secondClick = false;
        setLine(x1, y1, x2, y2);
    }
    else{
        x1 = event.clientX;
        y1 = event.clientY;
        secondClick = true;
    }
})
