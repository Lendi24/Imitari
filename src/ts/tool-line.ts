class LineTool extends Tool {

    firstPoint: coordinate | undefined;
    secondPoint: coordinate | undefined;

    onMouse(event : CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            
            if (typeof this.firstPoint === "undefined") {
                //Sätter första point
                this.firstPoint = {
                    x: Util.screenToCord(CustomMouseEvent.mouseX),
                    y: Util.screenToCord(CustomMouseEvent.mouseY)
                }
            }
            else{
                //Sätter andra point
                this.secondPoint = {
                    x: Util.screenToCord(CustomMouseEvent.mouseX),
                    y: Util.screenToCord(CustomMouseEvent.mouseY)
                }

                this.setLine(this.firstPoint, this.secondPoint);

                //Resetar linjen
                this.firstPoint = undefined;
                this.secondPoint = undefined;
            }
        }
    }

    private setLine(cord1: coordinate, cord2: coordinate){
        let lengthX = Math.abs(cord2["x"] - cord1["x"]);
        let lengthY = Math.abs(cord2["y"] - cord1["y"]);
        let directionY = false;              /*Default*/

        if (lengthY >= lengthX) {
            //Inverterar alla värden så att linjen skrivs ut i rätt riktning
            [cord1["x"], cord1["y"], cord2["x"], cord2["y"], lengthX, lengthY] = [cord1["y"], cord1["x"], cord2["y"], cord2["x"], lengthY, lengthX];
            directionY = true;
        }

        let pk = 2 * (lengthY - lengthX);
        for (let i = 0; i <= lengthX; i++) {
            
            /*Inkrementerar / dekrementerar beroende på om den första koordinaten är
            större eller mindre än den andra (bestämmer vilken riktning linjen går)*/
            if (cord1["x"] < cord2["x"]) {
                cord1["x"]++;
            }
            else{
                cord1["x"]--
            }

            if (pk < 0) {
                if (directionY) {
                    pk = pk + 2 * lengthY;
                }
                else{
                    pk = pk + 2 * lengthX;
                }
            }
            else{
                if (cord1["y"] < cord2["y"]) {
                    cord1["y"]++;
                }
                else{
                    cord1["y"]--;
                    pk = pk + (2 * lengthY) - (2 * lengthX);
                }
            }

            x.placePixel(cord1["x"], cord1["y"])
        }
    }
}

interface coordinate{
    [key: string]: number;
}