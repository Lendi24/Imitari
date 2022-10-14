class StampTool extends Tool {
    /*
    stamps = [
        [ new Pixel(0, 0, 0, 255),        new Pixel(255, 255, 255, 255), new Pixel(255, 255, 255, 255), new Pixel(0, 0, 0, 255),       ],
        [ new Pixel(255, 255, 255, 255),  new Pixel(0, 0, 0, 255),       new Pixel(0, 0, 0, 255),       new Pixel(255, 255, 255, 255), ],
        [ new Pixel(255, 255, 255, 255),  new Pixel(255, 255, 255, 255), new Pixel(255, 255, 255, 255), new Pixel(255, 255, 255, 255), ],
        [ new Pixel(255, 255, 255, 255),  new Pixel(0, 0, 0, 255),       new Pixel(0, 0, 0, 255),       new Pixel(255, 255, 255, 255), ],
        [ new Pixel(255, 255, 255, 255),  new Pixel(0, 0, 0, 255),       new Pixel(0, 0, 0, 255),       new Pixel(255, 255, 255, 255), ],
    ]*/

    stamps = [
        [
            new Pixel(0, 0, 0, 255),       
            new Pixel(255, 255, 255, 255), 
            new Pixel(255, 255, 255, 255), 
            new Pixel(255, 255, 255, 255), 
            new Pixel(255, 255, 255, 255), 
        ],

        [
            new Pixel(255, 255, 255, 255),
            new Pixel(0, 0, 0, 255),      
            new Pixel(255, 255, 255, 255),
            new Pixel(0, 0, 0, 255),      
            new Pixel(0, 0, 0, 255),      
        ],

        [
            new Pixel(255, 255, 255, 255), 
            new Pixel(0, 0, 0, 255),       
            new Pixel(255, 255, 255, 255), 
            new Pixel(0, 0, 0, 255),       
            new Pixel(0, 0, 0, 255),       
        ],

        [
            new Pixel(0, 0, 0, 255),       
            new Pixel(255, 255, 255, 255), 
            new Pixel(255, 255, 255, 255), 
            new Pixel(255, 255, 255, 255), 
            new Pixel(255, 255, 255, 255), 
        ],
    ]

    onMouse(event : CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) { 
            console.log(this.stamps)
            this.blit(this.stamps, DrawView.getLayer(0).drawing, 0, 0, 4, 5, Util.screenToCordX(CustomMouseEvent.mouseX), Util.screenToCordY(CustomMouseEvent.mouseY) )
        }
    }

    blit(srcRef : Array<Array<Pixel>>, dstRef : Array<Array<Pixel>>, sx : number, sy : number, sw : number, sh :number, dx : number, dy : number, ) {
        for (let x = sx; x < sw; x++) {
            for (let y = sy; y < sh; y++) {
                dstRef[x+dx][y+dy].r = srcRef[x][y].r;
                dstRef[x+dx][y+dy].g = srcRef[x][y].g;
                dstRef[x+dx][y+dy].b = srcRef[x][y].b;
                dstRef[x+dx][y+dy].a = srcRef[x][y].a;
            }            
        }
    }
}