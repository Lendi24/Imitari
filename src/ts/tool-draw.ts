class DrawTool extends LineTool {

    onMouse(event : CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            this.firstPoint = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            }

            if (this.firstPoint["x"] && this.firstPoint["y"]) {
                this.onBegin();
            }

            DrawView.getLayer(0).placePixel(this.firstPoint["x"], this.firstPoint["y"]);
            this.secondPoint = undefined;
        }
        else if (CustomMouseEvent.mouseLeftDown) {

            this.secondPoint = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            }

            this.setLine(this.firstPoint!, this.secondPoint!);
            this.firstPoint = this.secondPoint;
        }
        else if (!CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            //Funktionen har utförts
            this.onEnd();
        }
    }
}