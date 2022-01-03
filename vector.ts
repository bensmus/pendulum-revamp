const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx!.lineWidth = 1;

const canvasDim = 500;
document.getElementById("canvas")!.setAttribute("width", canvasDim.toString());
document.getElementById("canvas")!.setAttribute("height", canvasDim.toString());

export class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    norm() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    scale(s: number) {
        return new Vector(this.x * s, this.y * s);
    }
    add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    sub(v: Vector) {
        return this.add(v.scale(-1));
    }
    component(relAngle: number) {
        const componentAngle = this.angle() + relAngle;
        const componentNorm = Math.abs(this.norm() * Math.cos(relAngle));
        return new Vector(
            componentNorm * Math.cos(componentAngle),
            componentNorm * Math.sin(componentAngle)
        );
    }
    draw() {
        // canvas is 500x500
        const disp = canvasDim / 2;
        const dispVect = new Vector(disp, disp);
        const scale = 100;

        // taking into account canvas coordinate systems
        const drawnVector = new Vector(this.x, -this.y)
            .scale(scale)
            .add(dispVect);

        ctx!.beginPath();
        ctx!.moveTo(disp, disp);
        ctx!.lineTo(drawnVector.x, drawnVector.y);
        ctx!.stroke();
    }
    rotate(relAngle: number) {
        const rotatedAngle = this.angle() + relAngle;
        return new Vector(
            this.norm() * Math.cos(rotatedAngle),
            this.norm() * Math.sin(rotatedAngle)
        );
    }
}
