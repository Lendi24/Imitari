"use strict";
class CustomWindow {
    addContent(window) { return window; }
    ;
    constructor(title, index, parent, onDone) {
        let window = document.createElement("custom-window");
        parent.appendChild(this.addContent(window));
    }
}
class CustomGridWindow extends CustomWindow {
    addContent(window) {
        console.log("re");
    }
}
