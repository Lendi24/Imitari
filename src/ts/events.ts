window.oncontextmenu = function() {return false;};

window.onmousedown   = function(e:MouseEvent) {e.preventDefault;};
window.onmousemove   = function(e:MouseEvent) {e.preventDefault;};
window.onmouseup     = function(e:MouseEvent) {e.preventDefault;};
window.onwheel       = function(e:WheelEvent) {e.preventDefault;};

class CustomMouseEvent {
    static mouseX : number;
    static mouseY : number;

    static mouseLeftDown : boolean;
    static mouseLeftChanged : boolean;

    static mouseRightDown : boolean;
    static mouseRightChanged : boolean;
}