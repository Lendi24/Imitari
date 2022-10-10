"use strict";
window.onresize = function () { DrawView.onResize(); };
window.oncontextmenu = function () { return false; };
window.onmousedown = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); };
window.onmousemove = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); };
window.onmouseup = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); };
window.onwheel = function (e) { e.preventDefault; };
window.onkeydown = function (e) {
    switch (e.key) {
        case "b":
            DrawView.currentTool = new DrawTool();
            break;
        case "l":
            DrawView.currentTool = new LineTool();
            break;
        case "f":
            DrawView.currentTool = new FillTool();
            break;
        case "s":
            DrawView.currentTool = new ShapeTool();
            break;
        default:
            break;
    }
};
class CustomMouseEvent {
    static tick(mouseX, mouseY, mouseLeftDown, mouseRightDown, e) {
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.mouseLeftChanged = !(mouseLeftDown == this.mouseLeftDown);
        this.mouseLeftDown = mouseLeftDown;
        this.mouseRightChanged = !(mouseRightDown == this.mouseRightDown);
        this.mouseRightDown = mouseRightDown;
        this.e = e;
        DrawView.currentTool.onMouse(this);
    }
}
