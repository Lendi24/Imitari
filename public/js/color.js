"use strict";
class ColorPicker {
    constructor() {
        ColorPicker.rgbaInputs.forEach(input => {
            input.oninput = function () { ColorPicker.getColor(); ColorPicker.setColorPreview(ColorPicker.r, ColorPicker.g, ColorPicker.b, ColorPicker.a); };
        });
        ColorPicker.getColor();
        ColorPicker.setColorPreview(ColorPicker.r, ColorPicker.g, ColorPicker.b, ColorPicker.a);
    }
    static setColor(r, g, b, a) {
        ColorPicker.rgbaInputs.forEach(input => {
            switch (input.name) {
                case "red":
                    input.value = r.toString();
                    break;
                case "green":
                    input.value = g.toString();
                    break;
                case "blue":
                    input.value = b.toString();
                    break;
                case "alpha":
                    input.value = (a * 255).toString();
                    break;
            }
        });
    }
    static getColor() {
        ColorPicker.rgbaInputs.forEach(input => {
            if (input.value == "") {
                input.value = "0";
            }
            switch (input.name) {
                case "red":
                    ColorPicker.r = Util.clamp(parseInt(input.value), 255, 0);
                    break;
                case "green":
                    ColorPicker.g = Util.clamp(parseInt(input.value), 255, 0);
                    break;
                case "blue":
                    ColorPicker.b = Util.clamp(parseInt(input.value), 255, 0);
                    break;
                case "alpha":
                    ColorPicker.a = Util.clamp(parseInt(input.value), 255, 0) / 255;
                    break;
            }
        });
    }
    static setColorPreview(r, g, b, a) {
        ColorPicker.rgbaPreview.style.backgroundColor = "rgba(" + r.toString() + "," + g.toString() + "," + b.toString() + "," + a.toString() + ")";
    }
}
ColorPicker.r = 0;
ColorPicker.g = 0;
ColorPicker.b = 0;
ColorPicker.a = 0;
ColorPicker.rgbaInputs = document.querySelectorAll(".color-input");
ColorPicker.rgbaPreview = document.getElementById("color-display");
let test = new ColorPicker();
