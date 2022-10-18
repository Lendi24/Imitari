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
    static getRGBA() {
        return {
            r: ColorPicker.r,
            g: ColorPicker.g,
            b: ColorPicker.b,
            a: ColorPicker.a,
        };
    }
    static mixTwoRgba(color1, color2) {
        let newColor = {
            r: Math.round(color1["r"] + (color2["r"] - color1["r"]) * ColorPicker.a),
            g: Math.round(color1["g"] + (color2["g"] - color1["g"]) * ColorPicker.a),
            b: Math.round(color1["b"] + (color2["b"] - color1["b"]) * ColorPicker.a),
            a: color1["a"] + color2["a"]
        };
        return newColor;
    }
}
ColorPicker.r = 0;
ColorPicker.g = 0;
ColorPicker.b = 0;
ColorPicker.a = 0;
ColorPicker.rgbaInputs = document.querySelectorAll(".color-input");
ColorPicker.rgbaPreview = document.getElementById("color-display");
let test = new ColorPicker();
