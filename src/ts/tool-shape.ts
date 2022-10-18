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
            this.numberOfSides = 6;
            let angle = (2 * Math.PI) / this.numberOfSides;

            //Sätter den första koordinaten
            this.firstPoint = {
                x: this.center["x"] + Math.round(this.radius * Math.cos(angle)),
                y: this.center["y"] + Math.round(this.radius * Math.sin(angle))
            }

            //Loopar igenom och skriver ut linjer för så många sidor som specificerats
            for (let i = 0; i <= this.numberOfSides; i++) {

                //Sätter den andra koordinaten
                this.secondPoint = {
                    x: this.center["x"] + Math.round(this.radius * Math.cos(angle * i)),
                    y: this.center["y"] + Math.round(this.radius * Math.sin(angle * i))
                }

                /*Skriver ut linjen mellan den första och andra koordinaten och
                sätter den första koordinaten till den föredetta andra*/
                this.setLine(this.firstPoint, this.secondPoint);
                this.firstPoint = this.secondPoint;
            }

            //Funktionen har utförts
            this.onEnd();
        }

    }
}