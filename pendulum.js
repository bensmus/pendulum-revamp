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

function updateDoublePendulum(link1, link2, delta) {
    let angAccel2 = -Math.cos(link2.ang);
    let angAccel1_a = -Math.sin(link2.ang) * Math.cos(link1.ang - link2.ang); // endpoint mass acting
    let angAccel1_b = -Math.cos(link1.ang); // it also is affected by gravity (has mass)
    updateLink(link2, angAccel2, delta);
    updateLink(link1, angAccel1_a + angAccel1_b, delta);
}

function updateLink(link, angAccel, delta) {
    link.vel += angAccel * delta;
    link.ang += link.vel * delta;
}

function drawDoublePendulum(linkOrigin, link1, link2) {
    let endPoint1 = drawLink(link1, linkOrigin);
    let endPoint2 = drawLink(link2, endPoint1);
    ctx.beginPath();
    ctx.arc(endPoint1.x, endPoint1.y, 5, 0, Math.PI * 2, 1);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(endPoint2.x, endPoint2.y);
    ctx.arc(endPoint2.x, endPoint2.y, 5, 0, Math.PI * 2, 1);
    ctx.fill();
    return [endPoint1, endPoint2];
}

let intervalID;
function animateDoublePendulum(linkOrigin, link1, link2) {
    let traces = [];
    let framesElapsed = 0;
    intervalID = setInterval(function drawstep() {
        framesElapsed++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the past trail
        for (let i = 0; i < traces.length; i++) {
            const point = traces[i];
            ctx.fillStyle = `hsl(244, 50%, ${
                50 + ((framesElapsed - i) * 50) / 700
            }%)`;
            ctx.fillRect(point.x, point.y, 1, 1);
        }
        ctx.fillStyle = "black";

        let trace = drawDoublePendulum(linkOrigin, link1, link2)[1]; // taking second endpoint
        traces.push(trace);
        updateDoublePendulum(link1, link2, 0.01);
    }, 10); // 10 ms -> approx 60 hz
}

let link1 = { ang: 0, vel: 0, r: 1 };
let link2 = { ang: 0, vel: 0, r: 1 };
let linkOrigin = { x: 200, y: 200 };
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
let snapshot = {
    link1: copy(link1),
    link2: copy(link2),
    linkOrigin: linkOrigin,
};

let endPoints = drawDoublePendulum(linkOrigin, link1, link2);

editButton = document.getElementById("editButton"); // Bring up A and B and input boxes
playButton = document.getElementById("playButton");
pauseButton = document.getElementById("pauseButton");
resetButton = document.getElementById("resetButton"); // Reset pendulum to initial state

playButton.onclick = function () {
    animateDoublePendulum(linkOrigin, link1, link2);
};

let editDiv = document.getElementById("editDiv");

editButton.onclick = function () {
    ctx.font = "20px serif";
    ctx.fillText("A", endPoints[0].x - 7, endPoints[0].y - 7);
    ctx.fillText("B", endPoints[1].x - 7, endPoints[1].y - 7);
    editDiv.style.display = "flex";
    // TODO: turn value inputs into sliders because there are strict
    // and unintuitive bounds on lengths and angles
    // also for the angles, you can use a dial widget!
};

pauseButton.onclick = function () {
    clearInterval(intervalID);
};

resetButton.onclick = function () {
    // TODO: make it reset
};

// ! Extremely bad
let buttons = document.getElementsByTagName("button");
for (const button of buttons) {
    if (button != editButton) {
        button.addEventListener("click", function () {
            editDiv.style.display = "none";
        });
    }
}
