
class Util {
    public  static clamp = (num : number, max : number, min : number,) => Math.min(Math.max(num, min), max);
    public  static screenToCordX = (cord : number) => Util.clamp(Util.screenToCord(cord - DrawView.jsCanvas.getBoundingClientRect().x), DrawView.getLayer(0).drawing.length    -1, 0); 
    public  static screenToCordY = (cord : number) => Util.clamp(Util.screenToCord(cord - DrawView.jsCanvas.getBoundingClientRect().y), DrawView.getLayer(0).drawing[0].length -1, 0); 
    private static screenToCord  = (cord : number) => Math.floor(cord / (DrawView.pixelSize * DrawView.zoom)); 
}

DrawView.init(100,80);