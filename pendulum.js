let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.lineWidth = 1;

let canvasDim = 500;
document.getElementById("canvas").setAttribute("width", canvasDim.toString());
document.getElementById("canvas").setAttribute("height", canvasDim.toString());

///////// FROM STACKOVERFLOW ////////
let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);

function drawPixel(x, y, r, g, b, a) {
    let index = (x + y * canvas.width) * 4;
    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}
/////////////////////////////////////

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

function singlePendulumUpdate(link, delta) {
    let angAccel = -Math.cos(link.ang);
    linkUpdate(link, angAccel, delta);
}

function doublePendulumUpdate(link1, link2, delta) {
    // Double pendulum with mass at the end.
    // The larger numbered link is closer to the mass.
    let angAccel2 = -Math.cos(link2.ang);
    let accel1 = link2.r * angAccel2 * Math.cos(link1.ang - link2.ang);
    let angAccel1 = accel1 / link1.r;
    linkUpdate(link2, angAccel2, delta);
    linkUpdate(link1, angAccel1, delta);
}

function linkUpdate(link, angAccel, delta) {
    link.vel += angAccel * delta;
    link.ang += link.vel * delta;
}

function doublePendulumAnimate(linkOrigin, link1, link2) {
    let endPoints = [];
    setInterval(function drawstep() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the past trail
        endPoints.forEach((point) => {
            drawPixel(point.x, point.y, 0, 0, 0, 1);
        });
        updateCanvas();

        // Draw the pendulum
        let linkPoint = linkOrigin;
        linkPoint = drawLink(link1, linkPoint);
        let endPoint = drawLink(link2, linkPoint);
        endPoints.push(endPoint);
        doublePendulumUpdate(link1, link2, 0.01); // will decreasing step size reduce errors? yes.
    }, 10); // 10 ms -> approx 60 hz
}

link1 = { ang: 0, vel: 0, r: 1 };
link2 = { ang: 0, vel: 1, r: 1 };
linkOrigin = { x: 200, y: 200 };
doublePendulumAnimate(linkOrigin, link1, link2);
