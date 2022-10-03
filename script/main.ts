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

    constructor(width : number, height : number) {
        this.targetFPS = 30;

        this.drawing = [];

        for (let x = 0; x < width; x++) {
            this.drawing[x] = [];
            for (let y = 0; y < height; y++) {
                this.drawing[x][y] = new Pixel();
            }
        }

        setInterval(this.drawToCanvas, 1000/this.targetFPS); 
    }

    private drawToCanvas() {
        let canvas = <HTMLCanvasElement>document.getElementById("drawing-area");
        let ctx = canvas.getContext("2d");

        for (let x = 0; x < this.drawing.length; x++) {
            for (let y = 0; y < this.drawing[x].length; y++) {
            }            
        }
    }
}

class Util {
    static clamp = (num : number, max : number, min : number,) => Math.min(Math.max(num, min), max);
}