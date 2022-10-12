"use strict";
window.onresize = function () { DrawView.onResize(); };
window.oncontextmenu = function () { return false; };
DrawView.jsCanvas.onmousedown = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); };
DrawView.jsCanvas.onmousemove = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); updateUIPos(); };
DrawView.jsCanvas.onmouseup = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, e.buttons == 1, e.buttons == 2, e); };
DrawView.jsCanvas.onmouseleave = function (e) { e.preventDefault; CustomMouseEvent.tick(e.clientX, e.clientY, false, false, e); };
window.onkeydown = function (e) { switchTool(e.key); };
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
    let topBarHtml = (document.getElementById("top-bar"));
    for (let item in topBar) {
        let dropdown = (document.createElement("drop"));
        let dropname = (document.createElement("button"));
        let dropcont = (document.createElement("drop-content"));
        dropname.innerHTML = item;
        for (let i = 0; i < topBar[item].length; i++) {
            let dropitemscont = document.createElement("item-section");
            for (let innerItem in topBar[item][i]) {
                let innerItemHTML = document.createElement("item");
                innerItemHTML.innerText = innerItem;
                innerItemHTML.onclick = topBar[item][i][innerItem];
                dropitemscont.appendChild(innerItemHTML);
            }
            dropcont.appendChild(dropitemscont);
        }
        dropdown.appendChild(dropname);
        dropdown.appendChild(dropcont);
        topBarHtml.appendChild(dropdown);
    }
};
function updateUIPos() {
    (document.getElementById("posX")).innerText = Util.screenToCordX(CustomMouseEvent.mouseX).toString();
    (document.getElementById("posY")).innerText = Util.screenToCordY(CustomMouseEvent.mouseY).toString();
}
let topBar = {
    "File": [
        {
            "New": function () { new WinBox({ index: 100, title: "Open a project", modal: true, x: "center", y: "center", }); },
            "Open": function () { new WinBox({ index: 100, title: "Open a project", modal: true, x: "center", y: "center", }); },
            "Save": Object,
        },
        {
            "Import": Object,
            "Export": Object,
        }
    ],
    "Edit": [
        {
            "Undo": Object,
            "Redo": Object,
        },
    ],
    "Layer": [
        {
            "Create layer": Object,
            "Remove layer": Object,
        },
        {
            "Clear": Object,
        }
    ],
    "Tools": [
        {
            "Tool": Object,
        },
    ],
    "Settings": [
        {
            "Theme": Object,
            "Zoom": Object,
            "Offset": Object,
            "Grid": Object,
            "Render": Object,
        },
    ],
    "About": [
        {
            "Imitari": Object,
        },
    ],
};
let tools = {
    "b": { obj: new DrawTool(), html: "", icon: "mdi-brush" },
    "l": { obj: new LineTool(), html: "", icon: "mdi-pencil-ruler" },
    "f": { obj: new FillTool(), html: "", icon: "mdi-format-color-fill" },
    "s": { obj: new ShapeTool(), html: "", icon: "mdi-shape" },
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
