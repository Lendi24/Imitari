"use strict";
let winIndex = 100;
let winOff = 100;
class CustomWindow {
    constructor(title, contentURL) {
        this.minWidth = 0;
        this.minHeight = 0;
        this.buttons = {
            "Done": function () {
                (this.parentElement.parentElement.parentElement).remove();
            }
        };
        this.classes = ["window", "window-model"];
        this.parent = document.body;
        let customWindow = document.createElement("custom-window");
        this.classes.forEach(clss => {
            customWindow.classList.add(clss);
        });
        customWindow.onmousedown = function (e) {
            customWindow.style.zIndex = (++winIndex).toString();
        };
        let windowHead = document.createElement("div");
        windowHead.classList.add("head");
        windowHead.onmousedown = function (e) {
            e.preventDefault();
            let offsetX = windowHead.getBoundingClientRect().left - e.clientX;
            let offsetY = windowHead.getBoundingClientRect().top - e.clientY;
            document.onmousemove = function (e) {
                customWindow.style.left = Util.clamp((e.clientX + (offsetX)), window.innerWidth - customWindow.getBoundingClientRect().width, 0) + "px";
                customWindow.style.top = Util.clamp((e.clientY + (offsetY)), window.innerHeight - customWindow.getBoundingClientRect().height, 0) + "px";
                if (customWindow.getBoundingClientRect().right < window.innerWidth) {
                }
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
                customWindow.style.left = ((window.innerWidth - customWindow.clientWidth) / 2) + "px";
                customWindow.style.top = ((window.innerHeight - customWindow.clientHeight) / 2) + "px";
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
        customWindow.style.minWidth = this.minWidth + "vw";
        customWindow.style.minHeight = this.minHeight + "vh";
        customWindow.style.zIndex = winIndex.toString();
        customWindow.appendChild(windowHead);
        customWindow.appendChild(windowContent);
        customWindow.appendChild(windowFoot);
        customWindow = this.parent.appendChild(customWindow);
    }
}
