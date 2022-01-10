let tooltip = document.getElementById("tooltip");

editButton.onmouseover = function () {
    tooltip.innerText =
        "edit pendulum starting state";
};
playButton.onmouseover = function () {
    tooltip.innerText =
        "play the simulation based on current state";
};
pauseButton.onmouseover = function () {
    tooltip.innerText =
        "pause the pendulum simulation";
};
resetButton.onmouseover = function () {
    tooltip.innerText =
        "reset the pendulum to its starting state";
};

editButton.onmouseleave = function () {
    tooltip.innerText = "\n";
};
playButton.onmouseleave = function () {
    tooltip.innerText = "\n";
};
pauseButton.onmouseleave = function () {
    tooltip.innerText = "\n";
};
resetButton.onmouseleave = function () {
    tooltip.innerText = "\n";
};
