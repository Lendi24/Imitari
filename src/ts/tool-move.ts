class MoveTool extends Tool{

    firstPoint: coordinate | undefined;
    secondPoint: coordinate | undefined;

    onMouse(event : CustomMouseEvent) {

        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            this.firstPoint = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            }

            this.secondPoint = undefined;
        }
        if (CustomMouseEvent.mouseLeftDown) {
            this.secondPoint = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            }

            this.shiftCanvas(this.firstPoint!, this.secondPoint!);

            this.firstPoint = this.secondPoint;
        }
        else if (!CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            //Funktionen har utförts
            this.onEnd();
        }
    }

    private shiftCanvas(pos1: coordinate, pos2: coordinate){
        let changeX = pos1["x"] - pos2["x"];
        let difX = Math.abs(pos1["x"] - pos2["x"]);
        let changeY = pos1["y"] - pos2["y"];
        let difY = Math.abs(pos1["y"] - pos2["y"]);
        
        let drawing = DrawView.getLayer(0).drawing;

        //Flyttas höger
        if (changeX < 0) {
            for (let i = 0; i < difX; i++) {
                drawing.unshift(drawing.pop());        
            }
        }
        //Flyttas vänster
        else{
            for (let i = 0; i < difX; i++) {
                drawing.push(drawing.shift());        
            }
        }
        //Flyttas neråt
        if (changeY < 0) {
            for (let i = 0; i < difY; i++) {
                for (let x = 0; x < drawing.length; x++) {
                    drawing[x].unshift(drawing[x].pop());
                }
            }
        }
        //Flyttas uppåt
        else{
            for (let i = 0; i < difY; i++) {
                for (let x = 0; x < drawing.length; x++) {
                    drawing[x].push(drawing[x].shift());
                }
            }
        }
    }
}