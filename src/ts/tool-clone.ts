class CloneTool extends Tool {
    conf = {
        "Size" : {
            value : 5, 
            type : "number", 
            step : 1, 
            min : 1, 
            max : 50, 
            icon : "mdi-fountain-pen-tip", 
        },
    }

    sourcePos = {x: undefined, y: undefined};
    targetPos = {x: undefined, y: undefined};

    onMouse(event : CustomMouseEvent) {

        if (CustomMouseEvent.mouseRightDown && CustomMouseEvent.mouseRightChanged) { 
            this.sourcePos.x = Util.screenToCordX(CustomMouseEvent.mouseX);
            this.sourcePos.y = Util.screenToCordY(CustomMouseEvent.mouseY);
        } else {
            if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) { 
                this.targetPos.x = Util.screenToCordX(CustomMouseEvent.mouseX);
                this.targetPos.y = Util.screenToCordY(CustomMouseEvent.mouseY);
            }
            if (CustomMouseEvent.mouseLeftDown) {     
                this.blit(
                    DrawView.getLayer(0).drawing, 
                    DrawView.getLayer(0).drawing, 
                    this.sourcePos.x - this.conf["Size"].value + (Util.screenToCordX(CustomMouseEvent.mouseX) - this.targetPos.x), 
                    this.sourcePos.y - this.conf["Size"].value + (Util.screenToCordY(CustomMouseEvent.mouseY) - this.targetPos.y), 
                    this.conf["Size"].value*2 +1, this.conf["Size"].value*2 +1, 
                    
                    Util.screenToCordX(CustomMouseEvent.mouseX) - this.conf["Size"].value, 
                    Util.screenToCordY(CustomMouseEvent.mouseY) - this.conf["Size"].value,
                );

            } else if (!CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
                this.onEnd()
            }
        }

        if (!this.sourcePos.x && !this.sourcePos.y) {
    
        } else {
        }
    }

    blit(srcRef : Array<Array<Pixel>>, dstRef : Array<Array<Pixel>>, sx : number, sy : number, sw : number, sh :number, dx : number, dy : number, ) {
        for (let x = sx; x < sw+sx; x++) {
            for (let y = sy; y < sh+sy; y++) {
                try {
                    dstRef[x+dx-sx][y+dy-sy].r = srcRef[x][y].r;
                    dstRef[x+dx-sx][y+dy-sy].g = srcRef[x][y].g;
                    dstRef[x+dx-sx][y+dy-sy].b = srcRef[x][y].b;
                    dstRef[x+dx-sx][y+dy-sy].a = srcRef[x][y].a;
    
                } finally {
                    console.log("[ERROR] Trying to draw canvas")
                }
            }            
        }
    }
}