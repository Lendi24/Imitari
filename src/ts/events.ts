

window.onresize      = function() {DrawView.onResize();}

window.oncontextmenu = function() {return false;};

DrawView.lockedHTML.onclick = function() {

    DrawView.locked = !DrawView.locked;

    if (DrawView.locked) {
        DrawView.jsCanvas.classList.add("cursor-not-allowed");
        DrawView.lockedHTML.classList.add("mdi-lock");
        DrawView.lockedHTML.classList.remove("mdi-lock-open-variant");
    }
    else{
        DrawView.jsCanvas.classList.remove("cursor-not-allowed");
        DrawView.lockedHTML.classList.remove("mdi-lock");
        DrawView.lockedHTML.classList.add("mdi-lock-open-variant");
    }
}

DrawView.jsCanvas.onmousedown   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);};
DrawView.jsCanvas.onmousemove   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);updateUIPos();};
DrawView.jsCanvas.onmouseup     = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);};
DrawView.jsCanvas.onmouseleave  = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, false, false, e);};

window.onkeydown     = function(e:KeyboardEvent) {
    if (e.ctrlKey) {
        commands(e.key);
    } else {
        switchTool(e.key);
    }
}

window.onwheel = function(e:WheelEvent) {
    e.preventDefault; 

    if (e.shiftKey) {
        e.preventDefault();

        if (e.deltaY < 0) { 
            DrawView.zoom = Util.clamp(DrawView.zoom + DrawView.zoom * 0.1, 100, 0.01);
          
        } else {
            DrawView.zoom = Util.clamp(DrawView.zoom - DrawView.zoom * 0.1, 100, 0.01);
        }

        (<HTMLElement>(document.getElementById("zoom"))).innerText = (Math.floor(DrawView.zoom * 100)).toString();
        DrawView.jsCanvas.style.transform = `scale(${(DrawView.zoom)})`;
    } else {
        
        if (e.deltaY != 0 && e.deltaX == 0) {
            DrawView.offsetTop = Util.clamp(DrawView.offsetTop + e.deltaY * 0.01, 150, -150);
            DrawView.jsCanvas.parentElement!.style.marginTop = -DrawView.offsetTop+"%";/*`${(DrawView.offsetTop)}px;`;*/

        } else {
            DrawView.offsetLeft = Util.clamp(DrawView.offsetLeft + e.deltaX * 0.01, 150, -150);
            DrawView.jsCanvas.parentElement!.style.marginLeft = -DrawView.offsetLeft+"%";/*`${(DrawView.offsetTop)}px;`;*/
        }    

    }



    /*
    DrawView.zoom += e.deltaY / 1000;
    console.log(DrawView.zoom);
    DrawView.jsCanvas.style.scale = DrawView.zoom;*/
};


window.onload = function() {
    uiLoader.loadTools();
    uiLoader.loadTopMenu();

}

function updateUIPos() {    
    (<HTMLElement>(document.getElementById("posX"))).innerText = Util.screenToCordX(CustomMouseEvent.mouseX).toString();
    (<HTMLElement>(document.getElementById("posY"))).innerText = Util.screenToCordY(CustomMouseEvent.mouseY).toString();
}


function switchTool(val:string) {
    try {
        let tool = tools[val];

        if (tool.obj && tool.html != DrawView.currentToolHTML) {
            tool.html.classList.add("bg-green-600");
            DrawView.currentToolHTML.classList.remove("bg-green-600");
            DrawView.currentToolHTML = tool.html;
            DrawView.currentTool = tool.obj;
        } 
    } catch (error) {
        
    }        
}

function commands(val: string){
    switch (val) {
        case "z":
            DrawView.undo();
            break;
        case "y":
            DrawView.redo();
            break;
    }
}

class CustomMouseEvent {
    static mouseX : number;
    static mouseY : number;

    static mouseLeftDown     = false;
    static mouseLeftChanged  = false;

    static mouseRightDown    = false;
    static mouseRightChanged = false;
    
    static e : MouseEvent;

    public static tick(mouseX : number, mouseY : number, mouseLeftDown : boolean, mouseRightDown : boolean, e : MouseEvent) {
        this.mouseX = mouseX;
        this.mouseY = mouseY;

        this.mouseLeftChanged = !(mouseLeftDown == this.mouseLeftDown)
        this.mouseLeftDown = mouseLeftDown;

        this.mouseRightChanged = !(mouseRightDown == this.mouseRightDown)
        this.mouseRightDown = mouseRightDown;

        this.e = e;

        if (!DrawView.locked) {
            DrawView.currentTool.onMouse(this);      
        }
    }
}

 

