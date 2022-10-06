DrawView.init(20,10);

class Util {
    static clamp = (num : number, max : number, min : number,) => Math.min(Math.max(num, min), max);
    static screenToCord = (cord : number) => Math.floor(cord / DrawView.getLayer(0).pixelSize); 
}

