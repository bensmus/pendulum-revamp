link = { ang: 3, vel: 1, r: 1 };
linkOrigin = { x: 200, y: 200 };
setInterval(function drawstep() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLink(link, linkOrigin);
    singlePendulumUpdate(link, 0.01); // will decreasing step size reduce errors? yes.
}, 10); // 10 ms -> approx 60 hz
