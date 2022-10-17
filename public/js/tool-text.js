"use strict";
class TextTool extends StampTool {
    constructor() {
        super(...arguments);
        this.space = 1;
        this.letters = {
            " ": [
                [
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "A": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "B": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "C": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "D": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "E": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "F": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "G": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "H": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "I": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "J": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "K": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "L": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "M": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "N": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "O": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "P": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "Q": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "R": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "S": [
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "T": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "U": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "V": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "W": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "X": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
            "Y": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                ],
            ],
            "Z": [
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
                [
                    new Pixel(255, 255, 255, 255),
                    new Pixel(255, 255, 255, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(0, 0, 0, 255),
                    new Pixel(255, 255, 255, 255),
                ],
            ],
        };
    }
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            let inputText = prompt("Enter the text you wish to print on screen", "the quick brown fox jumps over the lazy dog");
            if (inputText != null) {
                let textCursorPos = 0;
                for (let i = 0; i < inputText.length; i++) {
                    try {
                        let letter = this.letters[inputText[i].toUpperCase()];
                        this.blit(letter, DrawView.getLayer(0).drawing, 0, 0, letter.length, letter[0].length, Util.screenToCordX(CustomMouseEvent.mouseX) + textCursorPos, Util.screenToCordY(CustomMouseEvent.mouseY));
                        textCursorPos += (letter.length + this.space);
                    }
                    catch (error) {
                        console.log('[TextTool] Could not print "' + inputText[i] + '"');
                    }
                }
            }
            this.onEnd();
        }
    }
    blit(srcRef, dstRef, sx, sy, sw, sh, dx, dy) {
        for (let x = sx; x < sw; x++) {
            for (let y = sy; y < sh; y++) {
                dstRef[x + dx][y + dy].r = srcRef[x][y].r;
                dstRef[x + dx][y + dy].g = srcRef[x][y].g;
                dstRef[x + dx][y + dy].b = srcRef[x][y].b;
                dstRef[x + dx][y + dy].a = srcRef[x][y].a;
            }
        }
    }
}
