class WinBox {
    // configuration:
    static index: number;
    static id: string;
    static root: HTMLElement;
    static class: Array<string>;

    // appearance:
    static title: string;
    static background: string;
    static border: number;
    static header: number;
    static icon: boolean;

    // initial state:
    static modal: boolean;
    static max: boolean;
    static min: boolean;
    static hidden: boolean;

    // dimension:
    static width: number;
    static height: number;
    static minheight: number;
    static minwidth: number;
    static maxheight: number;
    static maxwidth: number;
    static autosize: true;

    // position:
    static x: string;
    static y: string;

    // viewport boundaries:
    static top: number;
    static right: number;
    static bottom: number;
    static left: number;

    // contents (choose from):
    static url: boolean;
    static mount: boolean;
    static html: string;

    constructor(name : string) {

    }
}