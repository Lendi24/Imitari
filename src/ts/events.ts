window.oncontextmenu = function() {return false;};

window.onmousedown   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e)};
window.onmousemove   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e)};
window.onmouseup     = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e)};
window.onwheel       = function(e:WheelEvent) {e.preventDefault;};

class CustomMouseEvent {
    static mouseX : number;
    static mouseY : number;

    static mouseLeftDown : boolean;
    static mouseLeftChanged : boolean;

    static mouseRightDown : boolean;
    static mouseRightChanged : boolean;
    
    static e : MouseEvent;

    public static tick(mouseX : number, mouseY : number, mouseLeftDown : boolean, mouseRightDown : boolean, e : MouseEvent) {
        this.mouseX = mouseX;
        this.mouseY = mouseY;

        this.mouseLeftChanged = !(mouseLeftDown == this.mouseLeftDown)
        this.mouseLeftDown = mouseLeftDown;

        this.mouseRightChanged = !(mouseRightDown == this.mouseRightDown)
        this.mouseRightDown = mouseRightDown;

        this.e = e;

        DrawView.getLayer(0).currentTool.onMouse(this);
    }
}

 

