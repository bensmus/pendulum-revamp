let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

let canvasDim = 500;
document.getElementById("canvas").setAttribute("width", canvasDim.toString());
document.getElementById("canvas").setAttribute("height", canvasDim.toString());

// Pendulum composed of links.
// e.g: link = { ang: 3, vel: 2, r: 10 };

// drawLink({ang: Math.PI / 6, vel: NaN, r: 2}, {x:100, y:100})
function drawLink(link, linkOrigin) {
    // Scale the link radius. Link origin already in px.
    // Returns endpoint of link (to be used as next link origin).
    let scale = 100;
    let drawnR = link.r * scale;
    let linkEndpoint = {
        x: linkOrigin.x + drawnR * Math.cos(link.ang),
        y: linkOrigin.y - drawnR * Math.sin(link.ang),
    };

    ctx.beginPath();
    ctx.moveTo(linkOrigin.x, linkOrigin.y);
    ctx.lineTo(linkEndpoint.x, linkEndpoint.y);
    ctx.stroke();

    return linkEndpoint;
}

function doublePendulumUpdate(link1, link2, delta) {
    let angAccel2 = -Math.cos(link2.ang);
    let angAccel1_a = -Math.sin(link2.ang) * Math.cos(link1.ang - link2.ang); // endpoint mass acting
    let angAccel1_b = -Math.cos(link1.ang); // it also is affected by gravity (has mass)
    linkUpdate(link2, angAccel2, delta);
    linkUpdate(link1, angAccel1_a + angAccel1_b, delta);
}

function linkUpdate(link, angAccel, delta) {
    link.vel += angAccel * delta;
    link.ang += link.vel * delta;
}

function doublePendulumAnimate(linkOrigin, link1, link2) {
    let endPoints = [];
    let framesElapsed = 0;
    setInterval(function drawstep() {
        framesElapsed++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the past trail
        for (let i = 0; i < endPoints.length; i++) {
            const point = endPoints[i];
            ctx.fillStyle = `hsl(244, 50%, ${
                50 + ((framesElapsed - i) * 50) / 700
            }%)`;
            ctx.fillRect(point.x, point.y, 1, 1);
        }
        ctx.fillStyle = "black";

        // Draw the pendulum
        let linkPoint = linkOrigin;
        linkPoint = drawLink(link1, linkPoint);
        let endPoint = drawLink(link2, linkPoint);
        endPoints.push(endPoint);
        doublePendulumUpdate(link1, link2, 0.01);
    }, 10); // 10 ms -> approx 60 hz
}

link1 = { ang: 0, vel: 0, r: 1 };
link2 = { ang: 0, vel: 0, r: 1 };
linkOrigin = { x: 200, y: 200 };
doublePendulumAnimate(linkOrigin, link1, link2);
