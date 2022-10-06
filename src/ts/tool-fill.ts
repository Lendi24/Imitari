class FillTool extends Tool {
    onMouse(event : CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            let startPosX = Util.screenToCordX(CustomMouseEvent.mouseX);
            let startPosY = Util.screenToCordY(CustomMouseEvent.mouseY);
            let oldColour = DrawView.getLayer(0).getPixel(startPosX, startPosY).getStrRGBA();
            let stack = [ {"x" : startPosX, "y" : startPosY} ]
            let iterations = 0;
            let iterationsLimit = DrawView.getLayer(0).drawing.length * DrawView.getLayer(0).drawing[0].length;

            while (stack.length > 0 && iterations < iterationsLimit) {
                iterations++;

                DrawView.getLayer(0).placePixel(
                    (stack[0].x),
                    (stack[0].y),
                );    
                
                setTimeout(() => {
                    DrawView.getLayer(0).placePixel(
                        (0),
                        (0),
                    );    
    
                }, 500 * iterations+1);

                if (DrawView.getLayer(0).getPixel(stack[0].x+1,stack[0].y).getStrRGBA() == oldColour) {
                    stack.push( {"x" : stack[0].x+1, "y" : stack[0].y} );
                }        

                if (DrawView.getLayer(0).getPixel(stack[0].x-1,stack[0].y).getStrRGBA() == oldColour) {
                    stack.push( {"x" : stack[0].x-1, "y" : stack[0].y} );
                }        

                if (DrawView.getLayer(0).getPixel(stack[0].x,stack[0].y+1).getStrRGBA() == oldColour) {
                    stack.push( {"x" : stack[0].x, "y" : stack[0].y+1} );
                }        

                if (DrawView.getLayer(0).getPixel(stack[0].x,stack[0].y-1).getStrRGBA() == oldColour) {
                    stack.push( {"x" : stack[0].x, "y" : stack[0].y-1} );
                }    

                stack.shift();
            }
        }
    }
}