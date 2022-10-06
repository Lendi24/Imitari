DrawView.init(20,10);

class Util {
    public  static clamp = (num : number, max : number, min : number,) => Math.min(Math.max(num, min), max);
    public  static screenToCordX = (cord : number) => Util.screenToCord(cord - (window.screen.width - document.getElementById("drawing-area")?.clientWidth)/2); 
    public  static screenToCordY = (cord : number) => Util.screenToCord(cord - (window.screen.height- document.getElementById("drawing-area")?.clientHeight)/2); 
    private static screenToCord  = (cord : number) => Math.floor(cord / DrawView.getLayer(0).pixelSize); 
}

