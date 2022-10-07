"use strict";
class FillTool extends Tool {
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            let startPosX = Util.screenToCordX(CustomMouseEvent.mouseX);
            let startPosY = Util.screenToCordY(CustomMouseEvent.mouseY);
            let oldColour = DrawView.getLayer(0).getPixel(startPosX, startPosY).getStrRGBA();
            let stack = [{ "x": startPosX, "y": startPosY }];
            let checked = new Array();
            let iterations = 0;
            let iterationsLimit = DrawView.getLayer(0).drawing.length * DrawView.getLayer(0).drawing[0].length;
            while (stack.length > 0 && iterations < iterationsLimit) {
                iterations++;
                checkPixel({ "x": stack[0].x + 1, "y": stack[0].y }, stack);
                checkPixel({ "x": stack[0].x - 1, "y": stack[0].y }, stack);
                checkPixel({ "x": stack[0].x, "y": stack[0].y + 1 }, stack);
                checkPixel({ "x": stack[0].x, "y": stack[0].y - 1 }, stack);
                checked.push(stack[0]);
                stack.shift();
            }
            function checkPixel(pos, stack) {
                if (pos.x >= 0 && pos.x < DrawView.getLayer(0).drawing.length && pos.y >= 0 && pos.y < DrawView.getLayer(0).drawing[0].length) {
                    for (let i = 0; i < checked.length; i++) {
                        if (checked[i].x == pos.x && checked[i].y == pos.y) {
                            return;
                        }
                    }
                    if (stack.indexOf(pos) == -1) {
                        try {
                            if (DrawView.getLayer(0).getPixel(pos.x, pos.y).getStrRGBA() == oldColour) {
                                stack.push(pos);
                                DrawView.getLayer(0).placePixel((pos.x), (pos.y));
                            }
                            else {
                                console.log("feclr");
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
