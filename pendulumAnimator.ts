import { Pendulum } from "./pendulum";

let pendulum = new Pendulum({ angle: 0, angularVelocity: 0, angularAcceleration: 0 }, 1, { gravityAccel: 1 });

setInterval(function drawstep() {
    pendulum.draw();
    pendulum.step(0.01);
}, 10); // approx 60 hz
