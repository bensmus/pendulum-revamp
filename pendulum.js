// class NaryPendulum {
//     constructor(pointFixed, points) {
//         // Assume massless rods, mass only on end
//         // points includes mass point and pivot points
//     }
// }

class Pendulum {
    constructor(state, length, physics) {
        // Make the points Vectors
        this.state = state; // object with angle, angularVelcity, angularAcceleration
        this.length = length;
        this.physics = physics;
    }
    getRadiusVector() {
        return new Vector(1, 0).rotate(this.state.angle).scale(this.length);
    }
    step(timeDelta) {
        const radiusVector = this.getRadiusVector();
        const gravityVector = new Vector(0, -1).scale(
            this.physics.gravityAccel
        );
        const resultantVector = gravityVector.component(radiusVector.angle());
        // angularAcceleration can be positive or negative! (negative means counterclockwise)
        const angularAcceleration =
            (-Math.sign(radiusVector.x) * resultantVector.norm()) /
            radiusVector.norm() + this.physics.airResistance * this.state.angularVelocity ** 2 * (-Math.sign(this.state.angularVelocity));
        // update state
        this.state.angle += this.state.angularVelocity * timeDelta; 
        this.state.angularVelocity +=
            this.state.angularAcceleration * timeDelta;
        this.state.angularAcceleration = angularAcceleration;
    }
    draw() {
        this.getRadiusVector().draw();
    }
}

/* CONSOLE DEBUG

const pendulum = new Pendulum(
    { angle: 0, angularVelocity: 0, angularAcceleration: 0 },
    1,
    { gravityAccel: 1 }
);

const radiusVector = pendulum.getRadiusVector();
radiusVector.draw()

const gravityVector = new Vector(0, -1).scale(
            pendulum.physics.gravityAccel
        );
gravityVector.draw()

const resultantVector = gravityVector.component(radiusVector.angle());
resultantVector.draw()

ctx.clearRect(0, 0, canvas.width, canvas.height);

*/
