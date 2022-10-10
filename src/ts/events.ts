

window.onresize      = function() {DrawView.onResize();}

window.oncontextmenu = function() {return false;};

DrawView.jsCanvas.onmousedown   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);};
DrawView.jsCanvas.onmousemove   = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);updateUIPos();};
DrawView.jsCanvas.onmouseup     = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e);};
DrawView.jsCanvas.onwheel       = function(e:WheelEvent) {e.preventDefault; DrawView.zoom += e.deltaY; console.log(DrawView.zoom)};

DrawView.jsCanvas.onmouseleave = function(e:MouseEvent) {e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, false, false, e);};

window.onkeydown     = function(e:KeyboardEvent) {switchTool(e.key)}

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
    "b" : {obj : new DrawTool(), html : "", icon : "mdi-brush"},
    "l" : {obj : new LineTool(), html : "", icon : "mdi-pencil-ruler"},
    "f" : {obj : new FillTool(), html : "", icon : "mdi-format-color-fill"},
}

function switchTool(val:string) {
    let tool = tools[val];
        
    if (tool.obj && tool.html != DrawView.currentToolHTML) {
        tool.html.classList.add("bg-green-600");
        DrawView.currentToolHTML.classList.remove("bg-green-600");
        DrawView.currentToolHTML = tool.html;
        DrawView.currentTool = tool.obj;
    } else { console.log("Not a tool"); }
    /*
    switch (val) {
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
    }*/
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

 

