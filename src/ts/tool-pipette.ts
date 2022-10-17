class PipetteTool extends Tool{
    
    onMouse(event: CustomMouseEvent){

        //Color is picked
        if (CustomMouseEvent.mouseLeftDown && CustomMouseEvent.mouseLeftChanged) {

            //Gets coordinates of clicked area
            let cordX = Util.screenToCordX(CustomMouseEvent.mouseX);
            let cordY = Util.screenToCordY(CustomMouseEvent.mouseY);

            //Gets pixel and its rgba
            let pixel = DrawView.getLayer(0).drawing[cordX][cordY];
            let rgba = pixel.getRGBA();

            //Updates Display for the current color
            ColorPicker.setColor(rgba["r"], rgba["g"], rgba["b"], rgba["a"])
            ColorPicker.setColorPreview(rgba["r"], rgba["g"], rgba["b"], rgba["a"])
            ColorPicker.getColor();
        }
        else{

        }
    }
}