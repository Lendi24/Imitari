"use strict";
class FillTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            let startPosX = Util.screenToCordX(CustomMouseEvent.mouseX);
            let startPosY = Util.screenToCordY(CustomMouseEvent.mouseY);
            let oldColour = DrawView.getLayer(0).getPixel(startPosX, startPosY).getStrRGBA();
            let stack = [{ "x": startPosX, "y": startPosY }];
            let checked = [];
            let iterations = 0;
            let iterationsLimit = DrawView.getLayer(0).drawing.length * DrawView.getLayer(0).drawing[0].length;
            while (stack.length > 0 && iterations < iterationsLimit) {
                iterations++;
                DrawView.getLayer(0).placePixel((stack[0].x), (stack[0].y));
                checkPixel({ "x": stack[0].x + 1, "y": stack[0].y }, stack);
                checkPixel({ "x": stack[0].x - 1, "y": stack[0].y }, stack);
                checkPixel({ "x": stack[0].x, "y": stack[0].y + 1 }, stack);
                checkPixel({ "x": stack[0].x, "y": stack[0].y - 1 }, stack);
                stack.shift();
            }
            function checkPixel(pos, stack) {
                if (pos.x >= 0 && pos.x < DrawView.getLayer(0).drawing.length && pos.y >= 0 && pos.y < DrawView.getLayer(0).drawing[0].length) {
                    if (stack.indexOf(pos) == -1) {
                        try {
                            if (DrawView.getLayer(0).getPixel(pos.x, pos.y).getStrRGBA() == oldColour) {
                                stack.push(pos);
                            }
                        }
                        catch (e) {
                            console.log("Error: fill tool");
                        }
                    }
                }
            }
        }
    }
}
