"use strict";
class Tool {
    constructor() { }
    toolLogic(event) {
        this.onMouse(event);
    }
    onMouse(event) { }
    onBegin() {
        DrawView.currHistoryIndex++;
        DrawView.history[DrawView.currHistoryIndex] = JSON.parse(JSON.stringify(DrawView.getLayer(0).drawing));
        if (DrawView.currHistoryIndex + 1 != DrawView.history.length) {
            for (let i = DrawView.currHistoryIndex; i < DrawView.history.length; i++) {
                DrawView.history[i].pop;
            }
        }
    }
    onEnd() { }
}
