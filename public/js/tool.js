"use strict";
class Tool {
    constructor() { }
    onMouse(event) { }
    onBegin() { }
    onEnd() {
        DrawView.history[++DrawView.currHistoryIndex] = JSON.parse(JSON.stringify(DrawView.getLayer(0).drawing));
        if (DrawView.currHistoryIndex + 1 < DrawView.history.length) {
            let historyLength = DrawView.history.length;
            for (let i = DrawView.currHistoryIndex + 1; i < historyLength; i++) {
                DrawView.history.pop();
            }
        }
        DrawView.save();
    }
}
