// class NaryPendulum {
//     constructor(pointFixed, points) {
//         // Assume massless rods, mass only on end
//         // points includes mass point and pivot points
//     }
// }

import { Vector } from "./vector";

interface Physics {
    gravityAccel: 1; // pixel per second / second
};

class Pendulum {
    pointFixed: Vector;
    point: Vector;
    physics: Physics;
    constructor(pointFixed: Vector, point: Vector, physics: Physics) {
        // Make the points Vectors
        this.pointFixed = pointFixed;
        this.point = point;
        this.physics = physics;
    }
    step() {
        let gravityVector = new Vector(0, -1).scale(this.physics.gravityAccel);
        let tensionVector = this.point.sub(this.pointFixed);
    }
    draw() { }
}
