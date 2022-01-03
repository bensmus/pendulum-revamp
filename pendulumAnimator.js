let pendulum = new Pendulum(
    { angle: 0, angularVelocity: 0, angularAcceleration: 0 },
    1,
    { gravityAccel: 1 }
);

setInterval(function drawstep() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pendulum.draw();
    pendulum.step(0.01);
}, 1); // 10 ms -> approx 60 hz
