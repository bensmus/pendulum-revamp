// class NaryPendulum {
//     constructor(pointFixed, points) {
//         // Assume massless rods, mass only on end
//         // points includes mass point and pivot points
//     }
// }
import { Vector } from "./vector";
;
var Pendulum = /** @class */ (function () {
    function Pendulum(state, length, physics) {
        // Make the points Vectors
        this.state = state;
        this.length = length;
        this.physics = physics;
    }
    Pendulum.prototype.getRadiusVector = function () {
        return new Vector(0, 1).rotate(this.state.angle).scale(this.length);
    };
    Pendulum.prototype.step = function (timeDelta) {
        var radiusVector = this.getRadiusVector();
        var gravityVector = new Vector(0, -1).scale(this.physics.gravityAccel);
        var resultantVector = gravityVector.component(radiusVector.angle());
        var angularAcceleration = resultantVector.norm() / radiusVector.norm();
        // update state
        this.state.angle += this.state.angularVelocity * timeDelta;
        this.state.angularVelocity += this.state.angularAcceleration * timeDelta;
        this.state.angularAcceleration = angularAcceleration;
    };
    Pendulum.prototype.draw = function () {
        this.getRadiusVector().draw();
    };
    return Pendulum;
}());
export { Pendulum };
