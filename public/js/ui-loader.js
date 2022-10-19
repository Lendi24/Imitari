"use strict";
class uiLoader {
    static loadAll() {
        uiLoader.loadTools();
        uiLoader.loadTopMenu();
    }
    static loadTools() {
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
    }
    static loadTopMenu() {
        let dropDownBox = (document.getElementById("top-bar"));
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
                    innerItemHTML.onmousedown = topBar[item][i][innerItem];
                    dropitemscont.appendChild(innerItemHTML);
                }
                dropcont.appendChild(dropitemscont);
            }
            dropdown.appendChild(dropname);
            dropdown.appendChild(dropcont);
            dropDownBox.appendChild(dropdown);
        }
    }
}
let topBar = {
    "File": [
        {
            "New": function () {
                let width = window.prompt("Width", "100");
                if (parseInt(width)) {
                    let height = window.prompt("Height", "80");
                    if (parseInt(height)) {
                        DrawView.newDrawView(parseInt(width), parseInt(height));
                    }
                }
            },
            "Open": function () { DrawView.load(); },
            "Save": function () { DrawView.save(); },
        },
        {
            "Import": Object,
            "Export": function () {
                let filename = window.prompt("Export as png:", "image");
                DrawView.jsCanvas.toBlob((blob) => {
                    let a = document.createElement("a"), url = URL.createObjectURL(blob);
                    a.href = url;
                    a.download = filename + ".png";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                });
            },
        }
    ],
    "Edit": [
        {
            "Undo": function () { DrawView.undo(); },
            "Redo": function () { DrawView.redo(); },
        },
        {
            "Clear": function () { DrawView.getLayer(0).clearCurrentLayer(); },
        }
    ],
    "About": [
        {
            "Imitari": function () {
                let path = window.location.pathname;
                new CustomWindow("About", path.substring(0, path.lastIndexOf('/')) + "/html/windows/top-bar/about/Imitari.html");
            },
        },
    ],
};
let tools = {
    "b": { obj: new DrawTool(), html: "", icon: "mdi-brush" },
    "l": { obj: new LineTool(), html: "", icon: "mdi-pencil-ruler" },
    "f": { obj: new FillTool(), html: "", icon: "mdi-format-color-fill" },
    "c": { obj: new CloneTool(), html: "", icon: "mdi-stamper" },
    "t": { obj: new TextTool(), html: "", icon: "mdi-format-color-text" },
    "s": { obj: new ShapeTool(), html: "", icon: "mdi-shape" },
    "m": { obj: new MoveTool(), html: "", icon: "mdi-cursor-move" },
    "p": { obj: new PipetteTool(), html: "", icon: "mdi-eyedropper" }
};
