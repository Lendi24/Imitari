
class Pixel {
    private r : number;
    private g : number;
    private b : number;
    private a : number;

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
        }
    }

    getStrRGBA() {
        return (
            "rgba("+
            this.r+","+
            this.g+","+
            this.b+","+
            this.a+")"
        );
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
    private drawing: Pixel[][];
    public pixelSize : number;
    public currentTool : Tool;

    placePixel(x : number, y : number) {
        this.drawing[x][y].setRGBA(255,255,255,255);
    }

    constructor(width : number, height : number) {
        this.currentTool = new DrawTool();
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
        setInterval(function () {obj.drawToCanvas(obj.drawing)}, 1000/this.targetFPS); 
    }

    drawToCanvas(drawing : Pixel[][]) {
        let pixelGapSize = 1;

        let canvas = <HTMLCanvasElement>document.getElementById("drawing-area");
        canvas.style.imageRendering = "pixelated";

        let ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;
        ctx['imageSmoothingEnabled'] = false;       /* standard */

        if (canvas.parentElement != null) {
            this.pixelSize = (Math.min(canvas.parentElement.clientWidth / drawing.length, canvas.parentElement.clientHeight / drawing[0].length));

            canvas.width  = this.pixelSize * drawing.length;
            canvas.height = this.pixelSize * drawing[0].length;
            
            //console.log(pixelSize)
        }

        for (let x = 0; x < drawing.length; x++) {
            for (let y = 0; y < drawing[x].length; y++) {
                ctx.beginPath();

                ctx.moveTo(x*this.pixelSize+pixelGapSize,                   y*this.pixelSize+pixelGapSize);
                ctx.lineTo(x*this.pixelSize+this.pixelSize-pixelGapSize,    y*this.pixelSize+pixelGapSize);
                ctx.lineTo(x*this.pixelSize+this.pixelSize-pixelGapSize,    y*this.pixelSize+this.pixelSize-pixelGapSize);
                ctx.lineTo(x*this.pixelSize+pixelGapSize,                   y*this.pixelSize+this.pixelSize-pixelGapSize);
                ctx.lineTo(x*this.pixelSize+pixelGapSize,                   y*this.pixelSize+pixelGapSize);
                
                //ctx.fillStyle = "rgb("+drawing[x][y].getRGBA().r+", "+drawing[x][y].getRGBA().g+", "+drawing[x][y].getRGBA().b+")"
                ctx.fillStyle = drawing[x][y].getStrRGBA();
                ctx.fill();    
            }            
        }
    }
}

class Util {
    static clamp = (num : number, max : number, min : number,) => Math.min(Math.max(num, min), max);
    static screenToCord = (cord : number) => Math.floor(cord / x.pixelSize); 
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
