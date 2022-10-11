

window.onresize      = function() {DrawView.onResize();}

window.oncontextmenu = function() {return false;};

DrawView.jsCanvas.onmousedown   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);};
DrawView.jsCanvas.onmousemove   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);updateUIPos();};
DrawView.jsCanvas.onmouseup     = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);};
DrawView.jsCanvas.onmouseleave = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, false, false, e);};

window.onkeydown     = function(e:KeyboardEvent) {switchTool(e.key)}

window.onwheel = function(e:WheelEvent) {
    e.preventDefault; 
    //DrawView.zoom = Util.clamp(DrawView.zoom + DrawView.zoom * 0.1, 1000, 0.01);


    if (e.shiftKey) {
        e.preventDefault();

        if (e.deltaY < 0) { 
            DrawView.zoom = Util.clamp(DrawView.zoom + DrawView.zoom * 0.1, 100, 0.01);
          
        } else {
            DrawView.zoom = Util.clamp(DrawView.zoom - DrawView.zoom * 0.1, 100, 0.01);
        }

        document.getElementById("zoom")?.innerText = Math.floor(DrawView.zoom * 100);
        DrawView.jsCanvas.style.transform = `scale(${(DrawView.zoom)})`;
    } else {
        console.log(DrawView.offsetTop)
        
        if (e.deltaY != 0 && e.deltaX == 0) {
            DrawView.offsetTop = Util.clamp(DrawView.offsetTop + e.deltaY * 0.01, 150, -150);
            DrawView.jsCanvas.parentElement.style.marginTop = -DrawView.offsetTop+"%";/*`${(DrawView.offsetTop)}px;`;*/

        } else {
            DrawView.offsetLeft = Util.clamp(DrawView.offsetLeft + e.deltaX * 0.01, 150, -150);
            DrawView.jsCanvas.parentElement.style.marginLeft = -DrawView.offsetLeft+"%";/*`${(DrawView.offsetTop)}px;`;*/
        }    

    }



    /*
    DrawView.zoom += e.deltaY / 1000;
    console.log(DrawView.zoom);
    DrawView.jsCanvas.style.scale = DrawView.zoom;*/
};


window.onload = function() {
    let classes = ["text-white", "border-2", "invert", "rounded", "hover:bg-green-700", "hover:scale-110", "transform", "transition-all", "mdi"]
    let htmlTools = <HTMLElement>(document.getElementById("tool-section"));

    for (let tool in tools) {
        let newHTML = tools[tool].html = document.createElement("span");
        
        newHTML.onclick = function () {switchTool(tool);}
        classes.forEach(classStr => {
            newHTML.classList.add(classStr);
        });

        newHTML.classList.add(tools[tool].icon);

        htmlTools.appendChild(newHTML);
        tools[tool].html = newHTML;        
    }

    switchTool("b");

}

function updateUIPos() {    
    (<HTMLElement>(document.getElementById("posX"))).innerText = Util.screenToCordX(CustomMouseEvent.mouseX).toString();
    (<HTMLElement>(document.getElementById("posY"))).innerText = Util.screenToCordY(CustomMouseEvent.mouseY).toString();
}



let tools: {[key: string]: any} = { 
    "b" : {obj : new DrawTool(),  html : "", icon : "mdi-brush"},
    "l" : {obj : new LineTool(),  html : "", icon : "mdi-pencil-ruler"},
    "f" : {obj : new FillTool(),  html : "", icon : "mdi-format-color-fill"},
    "s" : {obj : new ShapeTool(), html : "", icon : "mdi-shape"},
};

function switchTool(val:string) {
    let tool = tools[val];
        
    if (tool.obj && tool.html != DrawView.currentToolHTML) {
        tool.html.classList.add("bg-green-600");
        DrawView.currentToolHTML.classList.remove("bg-green-600");
        DrawView.currentToolHTML = tool.html;
        DrawView.currentTool = tool.obj;
    } else { console.log("Not a tool"); }
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

 

