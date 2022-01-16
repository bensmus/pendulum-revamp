let tooltip = document.getElementById("tooltip");

editButton.onmouseover = function () {
    tooltip.innerText =
        "edit pendulum state";
};
playButton.onmouseover = function () {
    tooltip.innerText =
        "play the pendulum simulation";
};
pauseButton.onmouseover = function () {
    tooltip.innerText =
        "pause the pendulum simulation";
};
resetButton.onmouseover = function () {
    tooltip.innerText =
        "reset the pendulum to last edited state";
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
