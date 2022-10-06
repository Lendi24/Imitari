"use strict";
window.oncontextmenu = function () { return false; };
window.onmousedown = function (e) { e.preventDefault; };
window.onmousemove = function (e) { e.preventDefault; };
window.onmouseup = function (e) { e.preventDefault; };
window.onwheel = function (e) { e.preventDefault; };
class CustomMouseEvent {
}
