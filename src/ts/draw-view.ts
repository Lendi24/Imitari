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

class DrawViewLayer {
    private targetFPS: number;
    private drawing: Pixel[][];

    placePixel(x : number, y : number) {
        this.drawing[x][y].setRGBA(255,255,255,255);
    }

    getPixel(x : number, y : number){
        return this.drawing[x][y];
    }

    constructor(width : number, height : number) {
        //this.currentTool = new DrawTool();
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

        let canvas = DrawView.jsCanvas;
        canvas.style.imageRendering = "pixelated";

        let ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;
        ctx['imageSmoothingEnabled'] = false;       /* standard */


        for (let x = 0; x < drawing.length; x++) {
            for (let y = 0; y < drawing[x].length; y++) {
                ctx.beginPath();

                ctx.moveTo(x*DrawView.pixelSize+DrawView.pixelGapSize,                      y*DrawView.pixelSize+DrawView.pixelGapSize);
                ctx.lineTo(x*DrawView.pixelSize+DrawView.pixelSize-DrawView.pixelGapSize,   y*DrawView.pixelSize+DrawView.pixelGapSize);
                ctx.lineTo(x*DrawView.pixelSize+DrawView.pixelSize-DrawView.pixelGapSize,   y*DrawView.pixelSize+DrawView.pixelSize-DrawView.pixelGapSize);
                ctx.lineTo(x*DrawView.pixelSize+DrawView.pixelGapSize,                      y*DrawView.pixelSize+DrawView.pixelSize-DrawView.pixelGapSize);
                ctx.lineTo(x*DrawView.pixelSize+DrawView.pixelGapSize,                      y*DrawView.pixelSize+DrawView.pixelGapSize);
                
                //ctx.fillStyle = "rgb("+drawing[x][y].getRGBA().r+", "+drawing[x][y].getRGBA().g+", "+drawing[x][y].getRGBA().b+")"
                ctx.fillStyle = drawing[x][y].getStrRGBA();
                ctx.fill();    
            }            
        }
    }
}

class DrawView {
    static jsCanvas = <HTMLCanvasElement>document.getElementById("drawing-area");
    static jsCanvasCtx = DrawView.jsCanvas.getContext("2d");

    static pixelSize = 5;
    static pixelGapSize = 1;

    static currentTool = new Tool();
    static currentToolHTML = document.createElement("div");

    static layers = new Array();

    static changePixelSize() {
        
    }

    static init(x : number,y : number) {
        this.jsCanvas.style.imageRendering = "pixelated";
        this.currentTool = new DrawTool();
        this.newLayer(x, y);
        this.onResize();
    }

    static onResize(){
        if (DrawView.jsCanvas.parentElement != null) {
            DrawView.pixelSize = (Math.min(DrawView.jsCanvas.parentElement.clientWidth / DrawView.getLayer(0).drawing.length, DrawView.jsCanvas.parentElement.clientHeight / DrawView.getLayer(0).drawing[0].length));
            DrawView.jsCanvas.width  = DrawView.pixelSize * DrawView.getLayer(0).drawing.length;
            DrawView.jsCanvas.height = DrawView.pixelSize * DrawView.getLayer(0).drawing[0].length;

            DrawView.pixelGapSize = Math.floor(DrawView.pixelSize*0.05);
        }
    }

    static newLayer(x : number,y : number) {
        this.layers[this.layers.length] = new DrawViewLayer(x,y);
    }

    static getLayer(i : number) {
        return this.layers[i];
    }
}