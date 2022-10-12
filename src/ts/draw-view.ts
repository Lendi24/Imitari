class Pixel {
    color: Color;

    constructor() {
        this.color = new Color(0, 0, 0, 1);
    }
}

class DrawViewLayer {
    private targetFPS: number;
    private drawing: Pixel[][];

    placePixel(x : number, y : number) {
        try {
            this.drawing[x][y].color = new Color (
                DrawView.primaryColour.r,
                DrawView.primaryColour.g,
                DrawView.primaryColour.b,
                DrawView.primaryColour.a,
            );
        } catch (error) {}
    }

    getPixel(x : number, y : number){
        return this.drawing[x][y];
    }

    getCanvasWidth(){
        return this.drawing.length;
    }

    getCanvasHeight(){
        return this.drawing[0].length;
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
                
                //ctx.fillStyle = "rgb(23, 25, 200)"
                ctx.fillStyle = drawing[x][y].color.getStrRGBA();
                //console.log(drawing[x][y].color.getStrRGBA());
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

    static zoom = 1;
    static offsetLeft = 0;
    static offsetTop = 0;

    static primaryColour = new Color(0, 0, 0, 0);
    static secondaryColour = new Color(0, 0, 0, 0);

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

DrawView.init(100,80);