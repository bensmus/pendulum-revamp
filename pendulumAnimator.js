let pendulum = new Pendulum(
    { angle: 0, angularVelocity: 0, angularAcceleration: 0 },
    1,
    { gravityAccel: 1, airResistance: 0 }
);

let violatingFlag = false;
let negativeAngles = [];

setInterval(function drawstep() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pendulum.draw();
    pendulum.step(0.01); // will decreasing step size reduce errors? yes.

    //// Error metric /////
    if (pendulum.state.angle + Math.PI < 0) {
        violatingFlag = true;
    }
    if (violatingFlag && pendulum.state.angle + Math.PI >= 0) {
        console.log(Math.min(...negativeAngles));
        violatingFlag = false;
        negativeAngles = [];
    }
    if (violatingFlag) {
        negativeAngles.push(pendulum.state.angle + Math.PI);
    }
    //////////////////////
    // error is 0.05028986679342662 for 0.01 step
    // error is 0.269739574312311 for 0.05 step
}, 10); // 10 ms -> approx 60 hz
