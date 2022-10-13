class Pixel {
    r : number;
    g : number;
    b : number;
    a : number;

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
        this.a = Util.clamp(a, 255, 0);
    }
}

class DrawViewLayer {
    private targetFPS: number;
    private drawing: Pixel[][];

    placePixel(x : number, y : number) {
        try {
            this.drawing[x][y].setRGBA(255,255,255,255);
        } catch (error) {  }
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
        setInterval(function () {obj.drawToCanvas()}, 1000/this.targetFPS); 
    }

    drawToCanvas() {
        let canvas = DrawView.jsCanvas;
        canvas.style.imageRendering = "pixelated";

        let ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;
        ctx['imageSmoothingEnabled'] = false;       /* standard */


        for (let x = 0; x < this.drawing.length; x++) {
            for (let y = 0; y < this.drawing[x].length; y++) {
                ctx.beginPath();

                ctx.moveTo(x*DrawView.pixelSize+DrawView.pixelGapSize,                      y*DrawView.pixelSize+DrawView.pixelGapSize);
                ctx.lineTo(x*DrawView.pixelSize+DrawView.pixelSize-DrawView.pixelGapSize,   y*DrawView.pixelSize+DrawView.pixelGapSize);
                ctx.lineTo(x*DrawView.pixelSize+DrawView.pixelSize-DrawView.pixelGapSize,   y*DrawView.pixelSize+DrawView.pixelSize-DrawView.pixelGapSize);
                ctx.lineTo(x*DrawView.pixelSize+DrawView.pixelGapSize,                      y*DrawView.pixelSize+DrawView.pixelSize-DrawView.pixelGapSize);
                ctx.lineTo(x*DrawView.pixelSize+DrawView.pixelGapSize,                      y*DrawView.pixelSize+DrawView.pixelGapSize);
                
                //ctx.fillStyle = "rgb("+drawing[x][y].getRGBA().r+", "+drawing[x][y].getRGBA().g+", "+drawing[x][y].getRGBA().b+")"
                ctx.fillStyle = this.drawing[x][y].getStrRGBA();
                ctx.fill();    
            }            
        }
    }
}

class DrawView {
    static jsCanvas =                            <HTMLCanvasElement>document.getElementById("drawing-area");
    static jsCanvasCtx =                         DrawView.jsCanvas.getContext("2d");

    static pixelSize =                           (localStorage.getItem("pixelSize")) ? parseInt(localStorage.getItem("pixelSize")!) : 5;
    static pixelGapSize =                        (localStorage.getItem("pixelGapSize")) ? parseInt(localStorage.getItem("pixelGapSize")!) : 1;

    static zoom =                                (localStorage.getItem("zoom")) ? parseInt(localStorage.getItem("zoom")!) : 1;
    static offsetLeft =                          (localStorage.getItem("offsetLeft")) ? parseInt(localStorage.getItem("offsetLeft")!) : 0;
    static offsetTop =                           (localStorage.getItem("offsetTop")) ? parseInt(localStorage.getItem("offsetTop")!) : 0;

    static primaryColour =                       (localStorage.getItem("primaryColor")) ? JSON.parse(localStorage.getItem("primaryColor")!) : new Pixel();
    static secondaryColour =                     (localStorage.getItem("secondaryColor")) ? JSON.parse(localStorage.getItem("secondaryColor")!) : new Pixel();

    static currentTool =                         new Tool();
    static currentToolHTML =                     document.createElement("div");

    static layers =                              (localStorage.getItem("layers")) ? JSON.parse(localStorage.getItem("layers")!) : new Array();
 
    static currHistoryIndex =                    (localStorage.getItem("currHistoryIndex")) ? parseInt(localStorage.getItem("currHistoryIndex")!) : 0;
    static history: Array<Array<Array<Pixel>>> = (localStorage.getItem("history")) ? JSON.parse(localStorage.getItem("history")!) : new Array();

    static changePixelSize() {
        
    }

    static init(x : number,y : number) {
        this.jsCanvas.style.imageRendering = "pixelated";
        this.currentTool = new DrawTool();
        this.newLayer(x, y);
        this.onResize();

        DrawView.history.push(JSON.parse(JSON.stringify(DrawView.getLayer(0).drawing)));
    }

    static save(){

        //För canvas
        localStorage.setItem("pixelSize", this.pixelSize.toString());
        localStorage.setItem("pixelGapSize", this.pixelGapSize.toString());
        localStorage.setItem("zoom", this.zoom.toString());
        localStorage.setItem("offsetLeft", this.offsetLeft.toString());
        localStorage.setItem("offsetTop", this.offsetTop.toString());

        //Tools & Layers
        localStorage.setItem("layers", JSON.stringify(this.layers));
            //Current tool (Save tool name)
        
        //History
        localStorage.setItem("history", JSON.stringify(this.history));
        localStorage.setItem("currHistoryIndex", this.currHistoryIndex.toString());

        //Färger
        localStorage.setItem("primaryColor", JSON.stringify(this.primaryColour));
        localStorage.setItem("secondaryColor", JSON.stringify(this.secondaryColour));
    }

    static undo(){

        //Undo-ar bara om det finns saker att undo-a
        if (DrawView.currHistoryIndex > 0) {

            let newDrawing = DrawView.history[--DrawView.currHistoryIndex];
            console.log("here");
            for (let x = 0; x < newDrawing.length; x++) {
                this.getLayer(0).drawing[x] = [];
                for (let y = 0; y < newDrawing[x].length; y++) {
                    this.getLayer(0).drawing[x][y] = new Pixel();
                    this.getLayer(0).drawing[x][y].setRGBA(
                        newDrawing[x][y].r,
                        newDrawing[x][y].g,
                        newDrawing[x][y].b,
                        newDrawing[x][y].a,
                    );
                }
            }
        }
    }

    static redo(){

        //Redo-ar bara om det finns saker att redo-a
        if (DrawView.currHistoryIndex < DrawView.history.length - 1) {

            let newDrawing = DrawView.history[++DrawView.currHistoryIndex];
            for (let x = 0; x < newDrawing.length; x++) {
                this.getLayer(0).drawing[x] = [];
                for (let y = 0; y < newDrawing[x].length; y++) {
                    this.getLayer(0).drawing[x][y] = new Pixel();
                    this.getLayer(0).drawing[x][y].setRGBA(
                        newDrawing[x][y].r,
                        newDrawing[x][y].g,
                        newDrawing[x][y].b,
                        newDrawing[x][y].a,
                    );
                }
            }
        }
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