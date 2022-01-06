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

function singlePendulumUpdate(link, delta) {
    let angAccel = -Math.cos(link.ang);
    link.vel += angAccel * delta;
    link.ang += link.vel * delta;
}

function doublePendulumUpdate(link1, link2, delta) {
    // Double pendulum with mass at the end.
}
