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
                    innerItemHTML.onmousedown = topBar[item][i][innerItem];
                    dropitemscont.appendChild(innerItemHTML);
                }
                dropcont.appendChild(dropitemscont);
            }
            dropdown.appendChild(dropname);
            dropdown.appendChild(dropcont);
            topBarHtml.appendChild(dropdown);
        }
    }
}
let topBar = {
    "File": [
        {
            "New": function () { console.log("New"); },
            "Open": function () { console.log("New"); },
            "Save": Object,
        },
        {
            "Import": Object,
            "Export": Object,
        }
    ],
    "Edit": [
        {
            "Undo": function () { DrawView.undo(); },
            "Redo": function () { DrawView.redo(); },
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
            "Imitari": function () { new CustomWindow("re", "http://127.0.0.1:5500/public/html/windows/top-bar/about/Imitari.html"); },
        },
    ],
};
let tools = {
    "b": { obj: new DrawTool(), html: "", icon: "mdi-brush" },
    "l": { obj: new LineTool(), html: "", icon: "mdi-pencil-ruler" },
    "f": { obj: new FillTool(), html: "", icon: "mdi-format-color-fill" },
    "q": { obj: new StampTool(), html: "", icon: "mdi-stamper" },
    "s": { obj: new ShapeTool(), html: "", icon: "mdi-shape" },
    "m": { obj: new MoveTool(), html: "", icon: "mdi-cursor-move" },
};
