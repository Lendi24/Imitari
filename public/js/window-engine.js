"use strict";
let winIndex = 100;
class CustomWindow {
    constructor(title, contentURL) {
        this.index = 100;
        this.minWidth = 0;
        this.minHeight = 0;
        this.buttons = {
            "Done": function () {
                (this.parentElement.parentElement.parentElement).remove();
            }
        };
        this.classes = ["window", "window-model"];
        this.parent = document.body;
        let window = document.createElement("custom-window");
        this.classes.forEach(clss => {
            window.classList.add(clss);
        });
        let windowHead = document.createElement("div");
        windowHead.classList.add("head");
        window.onmousedown = function (e) {
            window.style.zIndex = (++winIndex).toString();
        };
        windowHead.onmousedown = function (e) {
            e.preventDefault();
            let offsetX = windowHead.getBoundingClientRect().left - e.clientX;
            let offsetY = windowHead.getBoundingClientRect().top - e.clientY;
            document.onmousemove = function (e) {
                window.style.left = (e.clientX + (offsetX)) + "px";
                window.style.top = (e.clientY + (offsetY)) + "px";
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
            };
        };
        let windowContent = document.createElement("div");
        windowContent.classList.add("content");
        let xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if (xhttp.status === 200) {
                windowContent.innerHTML = (this.responseText);
            }
            else {
                console.log("(🔴) Could not find requested page \"" + contentURL + "\"" + " on the server or in cache");
            }
        };
        xhttp.open('GET', contentURL, true);
        xhttp.send();
        let windowFoot = document.createElement("div");
        windowFoot.classList.add("foot");
        let buttonCont = document.createElement("window-buttons");
        for (let buttonIndex in this.buttons) {
            let button = document.createElement("button");
            button.innerText = buttonIndex;
            button.onclick = this.buttons[buttonIndex];
            buttonCont.appendChild(button);
        }
        windowFoot.appendChild(buttonCont);
        window.style.minWidth = this.minWidth + "vw";
        window.style.minHeight = this.minHeight + "vh";
        window.style.zIndex = this.index.toString();
        window.appendChild(windowHead);
        window.appendChild(windowContent);
        window.appendChild(windowFoot);
        return (this.parent.appendChild(window));
    }
}
