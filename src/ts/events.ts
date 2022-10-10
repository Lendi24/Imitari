window.onresize      = function() {DrawView.onResize();}

window.oncontextmenu = function() {return false;};

window.onmousedown   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e)};
window.onmousemove   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e)};
window.onmouseup     = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e)};
window.onwheel       = function(e:WheelEvent) {e.preventDefault;};

window.onkeydown     = function(e:KeyboardEvent) {
    switch (e.key) {
        case "b": //brush
            DrawView.currentTool = new DrawTool();
            break;
    
        case "l": //line
            DrawView.currentTool = new LineTool();
            break;


        case "f": //fill
            DrawView.currentTool = new FillTool();
            break;
        
        case "s": //shape
            DrawView.currentTool = new ShapeTool();
            break;

        default:
            break;
    }
}

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

        DrawView.currentTool.onMouse(this);
    }
}

 

