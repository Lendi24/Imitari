"use strict";
window.onresize = function () { DrawView.onResize(); };
window.oncontextmenu = function () { return false; };
DrawView.jsCanvas.onmousedown = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); };
DrawView.jsCanvas.onmousemove = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); updateUIPos(); };
DrawView.jsCanvas.onmouseup = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); };
DrawView.jsCanvas.onmouseleave = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, false, false, e); };
window.onkeydown = function (e) {
    if (e.ctrlKey) {
        commands(e.key);
    }
    else {
        switchTool(e.key);
    }
};
window.onwheel = function (e) {
    var _a;
    e.preventDefault;
    if (e.shiftKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
            DrawView.zoom = Util.clamp(DrawView.zoom + DrawView.zoom * 0.1, 100, 0.01);
        }
        else {
            DrawView.zoom = Util.clamp(DrawView.zoom - DrawView.zoom * 0.1, 100, 0.01);
        }
        (_a = document.getElementById("zoom")) === null || _a === void 0 ? void 0 : _a.innerText = Math.floor(DrawView.zoom * 100);
        DrawView.jsCanvas.style.transform = `scale(${(DrawView.zoom)})`;
    }
    else {
        console.log(DrawView.offsetTop);
        if (e.deltaY != 0 && e.deltaX == 0) {
            DrawView.offsetTop = Util.clamp(DrawView.offsetTop + e.deltaY * 0.01, 150, -150);
            DrawView.jsCanvas.parentElement.style.marginTop = -DrawView.offsetTop + "%";
        }
        else {
            DrawView.offsetLeft = Util.clamp(DrawView.offsetLeft + e.deltaX * 0.01, 150, -150);
            DrawView.jsCanvas.parentElement.style.marginLeft = -DrawView.offsetLeft + "%";
        }
    }
};
window.onload = function () {
    let classes = ["text-white", "border-2", "invert", "rounded", "hover:bg-green-700", "hover:scale-110", "transform", "transition-all", "mdi"];
    let htmlTools = (document.getElementById("tool-section"));
    for (let tool in tools) {
        let newHTML = tools[tool].html = document.createElement("span");
        newHTML.onclick = function () { switchTool(tool); };
        classes.forEach(classStr => {
            newHTML.classList.add(classStr);
        });
        newHTML.classList.add(tools[tool].icon);
        htmlTools.appendChild(newHTML);
        tools[tool].html = newHTML;
    }
    switchTool("b");
};
function updateUIPos() {
    (document.getElementById("posX")).innerText = Util.screenToCordX(CustomMouseEvent.mouseX).toString();
    (document.getElementById("posY")).innerText = Util.screenToCordY(CustomMouseEvent.mouseY).toString();
}
let tools = {
    "b": { obj: new DrawTool(), html: "", icon: "mdi-brush" },
    "l": { obj: new LineTool(), html: "", icon: "mdi-pencil-ruler" },
    "f": { obj: new FillTool(), html: "", icon: "mdi-format-color-fill" },
    "s": { obj: new ShapeTool(), html: "", icon: "mdi-shape" },
    "m": { obj: new MoveTool(), html: "", icon: "mdi-cursor-move" },
};
function switchTool(val) {
    let tool = tools[val];
    if (tool.obj && tool.html != DrawView.currentToolHTML) {
        tool.html.classList.add("bg-green-600");
        DrawView.currentToolHTML.classList.remove("bg-green-600");
        DrawView.currentToolHTML = tool.html;
        DrawView.currentTool = tool.obj;
    }
    else {
        console.log("Not a tool");
    }
}
function commands(val) {
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
CustomMouseEvent.mouseLeftDown = false;
CustomMouseEvent.mouseLeftChanged = false;
CustomMouseEvent.mouseRightDown = false;
CustomMouseEvent.mouseRightChanged = false;
