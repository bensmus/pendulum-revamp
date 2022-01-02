// class NaryPendulum {
//     constructor(pointFixed, points) {
//         // Assume massless rods, mass only on end
//         // points includes mass point and pivot points
//     }
// }

physics = {
    gravityAccel = 1  // pixel per second / second
}

class Pendulum {
    constructor(pointFixed, point, physics) {
        this.pointFixed = pointFixed;
        this.point = point;
    }
    step() {
        let gravityVector = new Vector(0, -1).scale(physics.gravityAccel)
    }
    draw() {

    }
}
