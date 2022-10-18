class ShapeTool extends LineTool {

    numberOfSides: number | undefined;
    center: coordinate | undefined;
    radius: number | undefined;

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

            //Variabler
            this.radius = 10; /* I bitmap pixlar */
            this.numberOfSides = 4;

            //Ritar ut formen
            this.drawShape(this.numberOfSides, this.radius, this.center);
            
            //Funktionen har utförts
            this.onEnd();
        }

    }

    drawShape(sides: number, radius: number, center: coordinate) {

        let angle = (2 * Math.PI) / sides;

        //Sätter den första koordinaten
        this.firstPoint = {
            x: center["x"] + Math.round(radius * Math.cos(angle)),
            y: center["y"] + Math.round(radius * Math.sin(angle))
        }

        //Loopar igenom och skriver ut linjer för så många sidor som specificerats
        for (let i = 0; i <= sides!; i++) {

            //Sätter den andra koordinaten
            this.secondPoint = {
                x: center["x"] + Math.round(radius * Math.cos(angle * i)),
                y: center["y"] + Math.round(radius * Math.sin(angle * i))
            }

            /*Skriver ut linjen mellan den första och andra koordinaten och
            sätter den första koordinaten till den föredetta andra*/
            this.setLine(this.firstPoint!, this.secondPoint);
            this.firstPoint = this.secondPoint;
        }
    }
}