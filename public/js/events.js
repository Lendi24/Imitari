"use strict";
window.onresize = function () { DrawView.onResize(); };
window.oncontextmenu = function () { return false; };
DrawView.lockedHTML.onclick = function () {
    DrawView.locked = !DrawView.locked;
    if (DrawView.locked) {
        DrawView.jsCanvas.classList.add("cursor-not-allowed");
        DrawView.lockedHTML.classList.add("mdi-lock");
        DrawView.lockedHTML.classList.remove("mdi-lock-open-variant");
    }
    else {
        DrawView.jsCanvas.classList.remove("cursor-not-allowed");
        DrawView.lockedHTML.classList.remove("mdi-lock");
        DrawView.lockedHTML.classList.add("mdi-lock-open-variant");
    }
};
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
    if (e.shiftKey) {
        if (e.deltaY < 0) {
            DrawView.zoom = Util.clamp(DrawView.zoom + DrawView.zoom * 0.1, 100, 0.01);
        }
        else {
            DrawView.zoom = Util.clamp(DrawView.zoom - DrawView.zoom * 0.1, 100, 0.01);
        }
        (document.getElementById("zoom")).innerText = (Math.floor(DrawView.zoom * 100)).toString();
        DrawView.jsCanvas.style.transform = `scale(${(DrawView.zoom)})`;
    }
    else {
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
    uiLoader.loadTools();
    uiLoader.loadTopMenu();
};
function updateUIPos() {
    (document.getElementById("posX")).innerText = Util.screenToCordX(CustomMouseEvent.mouseX).toString();
    (document.getElementById("posY")).innerText = Util.screenToCordY(CustomMouseEvent.mouseY).toString();
}
function switchTool(val) {
    try {
        let tool = tools[val];
        if (tool.obj && tool.html != DrawView.currentToolHTML) {
            tool.html.classList.add("bg-green-600");
            DrawView.currentToolHTML.classList.remove("bg-green-600");
            DrawView.currentToolHTML = tool.html;
            DrawView.currentTool = tool.obj;
            let toolSettingsHTML = document.getElementById("side-section-layer");
            toolSettingsHTML === null || toolSettingsHTML === void 0 ? void 0 : toolSettingsHTML.innerHTML = "";
            for (const property in DrawView.currentTool.conf) {
                let propertyHTML = document.createElement("input");
                propertyHTML.innerHTML = property;
                propertyHTML.value = DrawView.currentTool.conf[property].value;
                try {
                    propertyHTML.type = DrawView.currentTool.conf[property].type;
                }
                finally { }
                ;
                try {
                    propertyHTML.min = DrawView.currentTool.conf[property].min;
                }
                finally { }
                ;
                try {
                    propertyHTML.max = DrawView.currentTool.conf[property].max;
                }
                finally { }
                ;
                try {
                    propertyHTML.step = DrawView.currentTool.conf[property].step;
                }
                finally { }
                ;
                switch (propertyHTML.type) {
                    case "number":
                        propertyHTML.oninput = function () { DrawView.currentTool.conf[property].value = parseInt(propertyHTML.value); console.log(propertyHTML.value); };
                        break;
                    default:
                        propertyHTML.oninput = function () { DrawView.currentTool.conf[property].value = (propertyHTML.value); };
                        break;
                }
                console.log(`${property}`);
                console.log(`${typeof (DrawView.currentTool.conf[property])}`);
                toolSettingsHTML === null || toolSettingsHTML === void 0 ? void 0 : toolSettingsHTML.appendChild(propertyHTML);
            }
        }
    }
    catch (error) {
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
        if (!DrawView.locked) {
            DrawView.currentTool.onMouse(this);
        }
    }
}
CustomMouseEvent.mouseLeftDown = false;
CustomMouseEvent.mouseLeftChanged = false;
CustomMouseEvent.mouseRightDown = false;
CustomMouseEvent.mouseRightChanged = false;
