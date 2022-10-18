class ShapeTool extends LineTool {

    conf = {
        "Corners" : {
            value : 6, 
            type : "number", 
            step : 1, 
            min : 1, 
            max : 100, 
            icon : "mdi-shape-polygon-plus", 
        },

        "Radius" : {
            value : 8, 
            type : "number", 
            step : 1, 
            min : 1, 
            max : 100, 
            icon : "mdi-radius-outline", 
        },

        "Rotation": {
            value: 0,
            type: "range",
            step: 1,
            min: 0,
            max: 360,
            icon: "mdi-format-rotate-90",
        },
    }
    
    center: coordinate | undefined;

    onMouse(event: CustomMouseEvent) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            //Sätter mitten av polygonen / cirkeln till där man klickade
            this.center = {
                x: Util.screenToCordX(CustomMouseEvent.mouseX),
                y: Util.screenToCordY(CustomMouseEvent.mouseY)
            }

            if (this.center["x"] && this.center["y"]) {
                this.onBegin();
            }

            let radius = this.conf["Radius"].value;
            let numberOfSides = this.conf["Corners"].value;
            let offset = this.conf["Rotation"].value * (Math.PI / 180);

            //Ritar ut formen
            this.drawShape(numberOfSides, radius, offset, this.center);
            
            //Funktionen har utförts
            this.onEnd();
        }

    }

    drawShape(sides: number, radius: number, offset: number, center: coordinate) {

        let angle = (2 * Math.PI) / sides;

        //Sätter den första koordinaten
        this.firstPoint = {
            x: center["x"] + Math.round(radius * Math.cos(angle + offset)),
            y: center["y"] + Math.round(radius * Math.sin(angle + offset))
        }

        //Loopar igenom och skriver ut linjer för så många sidor som specificerats
        for (let i = 0; i <= sides!; i++) {

            //Sätter den andra koordinaten
            this.secondPoint = {
                x: center["x"] + Math.round(radius * Math.cos(angle * i + offset)),
                y: center["y"] + Math.round(radius * Math.sin(angle * i + offset))
            }

            /*Skriver ut linjen mellan den första och andra koordinaten och
            sätter den första koordinaten till den föredetta andra*/
            this.setLine(this.firstPoint!, this.secondPoint);
            this.firstPoint = this.secondPoint;
        }
    }
}