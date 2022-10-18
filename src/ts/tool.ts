class Tool {
    conf = {
    }
    
    constructor() {}
    onMouse(event : CustomMouseEvent) {}
    onBegin() {}
    onEnd() {
        
        //Updates affected pixels and history
        DrawView.affectedPixels = new Array();
        DrawView.history[++DrawView.currHistoryIndex] = JSON.parse(JSON.stringify(DrawView.getLayer(0).drawing));

        if (DrawView.currHistoryIndex + 1 < DrawView.history.length) {
            let historyLength = DrawView.history.length;
            for (let i = DrawView.currHistoryIndex + 1; i < historyLength; i++) {
                DrawView.history.pop();
            }   
        }
    }
}