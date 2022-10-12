class ColorPicker{
    static sliders: NodeListOf<HTMLInputElement>;
    static color : Color;


    constructor(){
        ColorPicker.sliders = document.querySelectorAll(".colorSlider") as NodeListOf<HTMLInputElement>;

        ColorPicker.setColor();
        ColorPicker.sliders.forEach(slider => {
            slider.onchange = function() {ColorPicker.setColor();}
        })
    }

    static setColor(){
        let r: number, g: number, b: number, a: number
        ColorPicker.sliders.forEach(slider => {
            switch (slider.name) {
                case "r":
                    r = parseInt(slider.value);
                    break;
                case "g":
                    g = parseInt(slider.value);
                    break;
                case "b":
                    b = parseInt(slider.value);
                    break;
                case "a":
                    a = parseInt(slider.value);
                    break;
            }
        });

        ColorPicker.color.setRGBA(r!, g!, b!, a!);

        DrawView.primaryColour.setRGBA(r!, g!, b!, a!);
        console.log(DrawView.primaryColour)

        //Uppdaterar färgen i preview boxen
        let colorBox = document.getElementById("currColor");
        colorBox!.style.backgroundColor = ColorPicker.color.getStrRGBA();
    }
}

class Color{

    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r:number, g:number, b:number, a:number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        this.setRGBA(r,g,b,a);
    }

    setRGBA(r : number, g : number, b : number, a : number) {
        this.r = Util.clamp(r, 255, 0),
        this.g = Util.clamp(g, 255, 0),
        this.b = Util.clamp(b, 255, 0),
        this.a = Util.clamp(a, 1, 0)
    }

    getStrRGBA() {
        return (
            "rgba("+
            this.r +","+
            this.g +","+
            this.b +","+
            this.a +")"
        );
    }

    getRGBA() {
        return {
            r : this.r,
            g : this.g,
            b : this.b,
            a : this.a,
        };
    }


}