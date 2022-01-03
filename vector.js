var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 1;
var canvasDim = 500;
document.getElementById("canvas").setAttribute("width", canvasDim.toString());
document.getElementById("canvas").setAttribute("height", canvasDim.toString());
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.norm = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    Vector.prototype.scale = function (s) {
        return new Vector(this.x * s, this.y * s);
    };
    Vector.prototype.add = function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    };
    Vector.prototype.sub = function (v) {
        return this.add(v.scale(-1));
    };
    Vector.prototype.component = function (relAngle) {
        var componentAngle = this.angle() + relAngle;
        var componentNorm = Math.abs(this.norm() * Math.cos(relAngle));
        return new Vector(componentNorm * Math.cos(componentAngle), componentNorm * Math.sin(componentAngle));
    };
    Vector.prototype.draw = function () {
        // canvas is 500x500
        var disp = canvasDim / 2;
        var dispVect = new Vector(disp, disp);
        var scale = 100;
        // taking into account canvas coordinate systems
        var drawnVector = new Vector(this.x, -this.y)
            .scale(scale)
            .add(dispVect);
        ctx.beginPath();
        ctx.moveTo(disp, disp);
        ctx.lineTo(drawnVector.x, drawnVector.y);
        ctx.stroke();
    };
    Vector.prototype.rotate = function (relAngle) {
        var rotatedAngle = this.angle() + relAngle;
        return new Vector(this.norm() * Math.cos(rotatedAngle), this.norm() * Math.sin(rotatedAngle));
    };
    return Vector;
}());
export { Vector };
