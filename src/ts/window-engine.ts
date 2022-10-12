class CustomWindow {
    addContent(window : HTMLElement){return window};

    constructor(title : string, index : number, parent : HTMLElement, onDone : Function) {
        let window = document.createElement("custom-window");

        parent.appendChild(this.addContent(window));
    }
}

class CustomGridWindow extends CustomWindow {
    addContent(window : HTMLElement) {
        console.log("re");
    }
}