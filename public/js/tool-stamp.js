"use strict";
class StampTool extends Tool {
    constructor() {
        super(...arguments);
        this.stamps = [
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
        ];
    }
    onMouse(event) {
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {
            console.log(this.stamps);
            this.blit(this.stamps, DrawView.getLayer(0).drawing, 0, 0, 4, 5, Util.screenToCordX(CustomMouseEvent.mouseX), Util.screenToCordY(CustomMouseEvent.mouseY));
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
