// class NaryPendulum {
//     constructor(pointFixed, points) {
//         // Assume massless rods, mass only on end
//         // points includes mass point and pivot points
//     }
// }

import { Vector } from "./vector";

interface Physics {
    gravityAccel: number; // pixel per second / second
};

interface State {
    angle: number;
    angularVelocity: number;
    angularAcceleration: number;
}

class Pendulum {
    radiusVector: Vector;
    physics: Physics;
    state: State;
    constructor(radiusVector: Vector, physics: Physics) {
        // Make the points Vectors
        this.radiusVector = radiusVector;
        this.physics = physics;
        this.state = { angle: radiusVector.angle(), angularVelocity: 0, angularAcceleration: 0 };
    }
    step(timeDelta: number) {
        const gravityVector = new Vector(0, -1).scale(this.physics.gravityAccel);
        const resultantAngle = this.radiusVector.scale(-1).angle() + Math.PI / 2;
        const resultantVector = gravityVector.component(resultantAngle);
    }
    draw() { }
}
