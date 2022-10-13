class CustomWindow {
    index = 100;

    minWidth = 0;
    minHeight = 0;

    buttons = {
        "Done" : function(){console.log("Done!")}
    };
    
    classes = ["window", "window-model"];
    parent = document.body;
    //parent = document.getElementById("window-container");

    constructor(title : string, contentURL : string) {
        let window = document.createElement("custom-window");

        this.classes.forEach(clss => {
            window.classList.add(clss);
        });

        // HEAD //
        let windowHead = document.createElement("div");
        windowHead.classList.add("head");


        // CONTENT //
        let windowContent = document.createElement("div");
        windowContent.classList.add("content");

        
        let xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if (xhttp.status === 200) {
                windowContent.innerHTML = (this.responseText);
            }
            else {
                console.log("(🔴) Could not find requested page \""+contentURL+"\"" + " on the server or in cache"); 
            }
        };
        //http://127.0.0.1:5500/public/html/windows/top-bar/about/Imitari.html
        xhttp.open('GET', contentURL, true);
        xhttp.send();    

        // FOOT //
        let windowFoot = document.createElement("div");
        windowFoot.classList.add("foot");

        let buttonCont = document.createElement("window-buttons");
        for (let buttonIndex in this.buttons) {
            let button = document.createElement("button");
            button.innerText = buttonIndex;
            button.onclick   = this.buttons[buttonIndex];
            buttonCont.appendChild(button);
        }
        windowFoot.appendChild(buttonCont);



        window.style.minWidth = this.minWidth+"vw";
        window.style.minHeight = this.minHeight+"vh";
        window.style.zIndex = this.index.toString();

        window.appendChild(windowHead);
        window.appendChild(windowContent);
        window.appendChild(windowFoot);

        return (this.parent.appendChild(window));
        //parent.appendChild(this.addContent(window));
    }
}
