"use strict";

const e = React.createElement;

class PendulumControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendulumState: {
                link1: { ang: 0, vel: 0, r: 1 },
                link2: { ang: 0, vel: 0, r: 1 },
            },
            userState: "paused",
        };
    }

    render() {
        // component, props, ...children
        return e(
            React.fragment,
            null,
            e(
                "button",
                { onClick: () => this.setState({ userState: "paused" }) },
                "pause"
            ),
            e(
                "button",
                { onClick: () => this.setState({ userState: "play" }) },
                "play"
            )
        );
    }
}

const domContainer = document.querySelector("#container");
ReactDOM.render(e(PendulumControl), domContainer);
