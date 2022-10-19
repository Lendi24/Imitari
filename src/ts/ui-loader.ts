class uiLoader {
    static loadAll() {
        uiLoader.loadTools();
        uiLoader.loadTopMenu();
    }

    static loadTools() {
        //Update UI: Tools
        let classes = ["text-white", "border-2", "invert", "rounded", "hover:bg-green-700", "hover:scale-110", "transform", "transition-all", "mdi"]
        let htmlTools = <HTMLElement>(document.getElementById("tool-section"));
    
        for (let tool in tools) {
            let newHTML = tools[tool].html = document.createElement("span");
            newHTML.setAttribute("title", tools[tool].tooltip);
            
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
    
    static loadTopMenu() {
        
        //Update UI: Top-bar
        let dropDownBox = <HTMLElement>(document.getElementById("top-bar"));
        for (let item in topBar) {
            let dropdown = <HTMLElement>(document.createElement("drop"));
            let dropname = <HTMLElement>(document.createElement("button"));
            let dropcont = <HTMLElement>(document.createElement("drop-content"));

            dropname.innerHTML = item;


            for (let i = 0; i < topBar[item].length; i++) {
                let dropitemscont = document.createElement("item-section");

                for (let innerItem in topBar[item][i]) {
                    let innerItemHTML = document.createElement("item");
                    innerItemHTML.innerText = innerItem;
                    innerItemHTML.onmousedown = topBar[item][i][innerItem];
                    dropitemscont.appendChild(innerItemHTML);
                    //const element = array[index];
                }

                dropcont.appendChild(dropitemscont);
            }

            dropdown.appendChild(dropname);
            dropdown.appendChild(dropcont);

            dropDownBox.appendChild(dropdown);
        }
    }
}

let topBar: {[key : string]: any} = {
    "File"      : [
        {
            "New"           : function () {
                let width = window.prompt("Width", "100");
                if (parseInt(width!)) {
                    let height = window.prompt("Height", "80");
                    if (parseInt(height!)) {
                        DrawView.newDrawView(parseInt(width!), parseInt(height!));
                    }
                }
            },
            "Open"          : function () { DrawView.load(); },  
            "Save"          : function () { DrawView.save(); },                              //3
        },

        {
            "Import"        : Object,                               //4
            "Export"        : function () {
                
                let filename = window.prompt("Export as png:", "image");
                //Credit to "mrJoe" from stack overflow
                DrawView.jsCanvas.toBlob((blob: any) => {

                    //Create download link
                    let a = document.createElement("a"),
                    url = URL.createObjectURL(blob);
                    a.href = url;
                    a.download = filename + ".png";

                    //Downloads image
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                });
            },
        }
    ],
    

    "Edit"      : [
        {
            "Undo"           : function () { DrawView.undo(); },
            "Redo"           : function () { DrawView.redo(); },
        },

        {
            "Clear"         : function () { DrawView.getLayer(0).clearCurrentLayer(); },
        }

    ],
/*
    "Layer"      : [
        {
            "Create layer"  : Object,
            "Remove layer"  : Object,
        },

        {
            "Clear"         : function () { DrawView.getLayer(0).clearCurrentLayer(); },
        }
],*/
/*
    "Tools"      : [
        {
            "Tool"          : Object,
        },
],*/
/*
    "Settings"      : [
        {
            "Theme"         : Object,
            "Zoom"          : Object,
            "Offset"        : Object,
            "Grid"          : Object,
            "Render"        : Object,
        },
],*/

    "About"      : [
        {
            "Imitari"       : function() {
                let path = window.location.pathname
                new CustomWindow("About", path.substring(0, path.lastIndexOf('/')) + "/html/windows/top-bar/about/Imitari.html"); 
            },
        },
],
}

let tools: {[key: string]: any} = { 
    "b" : {obj : new DrawTool(),    html : "", icon : "mdi-brush",              tooltip : "Brush (B)"},
    "l" : {obj : new LineTool(),    html : "", icon : "mdi-pencil-ruler",       tooltip : "Line (L)"},
    "f" : {obj : new FillTool(),    html : "", icon : "mdi-format-color-fill",  tooltip : "Fill (F)"},
    "c" : {obj : new CloneTool(),   html : "", icon : "mdi-stamper",            tooltip : "Clone (C)"},
    "t" : {obj : new TextTool(),    html : "", icon : "mdi-format-color-text",  tooltip : "Text (T)"}, 
    "s" : {obj : new ShapeTool(),   html : "", icon : "mdi-shape",              tooltip : "Shape (S)"},
    "m" : {obj : new MoveTool(),    html : "", icon : "mdi-cursor-move",        tooltip : "Move (M)"},
    "p" : {obj : new PipetteTool(), html : "", icon : "mdi-eyedropper",         tooltip : "Pipette (P)"}
};
