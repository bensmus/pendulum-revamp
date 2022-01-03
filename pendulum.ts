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

export class Pendulum {
    state: State;
    length: number;
    physics: Physics;
    constructor(state: State, length: number, physics: Physics) {
        // Make the points Vectors
        this.state = state;
        this.length = length;
        this.physics = physics;
    }
    getRadiusVector() {
        return new Vector(0, 1).rotate(this.state.angle).scale(this.length);
    }
    step(timeDelta: number) {
        const radiusVector = this.getRadiusVector();
        const gravityVector = new Vector(0, -1).scale(this.physics.gravityAccel);
        const resultantVector = gravityVector.component(radiusVector.angle());
        const angularAcceleration = resultantVector.norm() / radiusVector.norm();

        // update state
        this.state.angle += this.state.angularVelocity * timeDelta;
        this.state.angularVelocity += this.state.angularAcceleration * timeDelta;
        this.state.angularAcceleration = angularAcceleration;
    }
    draw() {
        this.getRadiusVector().draw();
    }
}
