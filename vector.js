let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

let canvasDim = 500;
document.getElementById("canvas").setAttribute("width", canvasDim.toString());
document.getElementById("canvas").setAttribute("height", canvasDim.toString());

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    norm() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    scale(s) {
        return new Vector(this.x * s, this.y * s);
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return this.add(v.scale(-1));
    }
    component(relAngle) {
        let componentAngle = this.angle() + relAngle;
        let componentNorm = Math.abs(this.norm() * Math.cos(relAngle));
        return new Vector(
            componentNorm * Math.cos(componentAngle),
            componentNorm * Math.sin(componentAngle)
        );
    }
    draw() {
        // canvas is 500x500
        let disp = canvasDim / 2;
        let dispVect = new Vector(disp, disp);
        let scale = 100;

        // taking into account canvas coordinate systems
        let drawnVector = new Vector(this.x, -this.y)
            .scale(scale)
            .add(dispVect);

        ctx.beginPath();
        ctx.moveTo(disp, disp);
        ctx.lineTo(drawnVector.x, drawnVector.y);
        ctx.stroke();
    }
    rotate(relAngle) {
        let rotatedAngle = this.angle() + relAngle;
        return new Vector(
            this.norm() * Math.cos(rotatedAngle),
            this.norm() * Math.sin(rotatedAngle)
        );
    }
}
