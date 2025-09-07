import ReactDOM from "react-dom";
import { setAppElement } from "react-modal";
import * as bowser from "bowser";

const appTarget = document.getElementById("app");

// Remove everything from the target to fix macOS Safari "Save Page As",
while (appTarget.firstChild) {
    appTarget.removeChild(appTarget.firstChild);
}

if (new URLSearchParams(window.location.search).has("crash-accidentally")) {
    throw new TypeError(
        "Simulated a TypeError to test the pre-React error screen. " +
            `If someone sent you a link to this, just open <%= htmlWebpackPlugin.options.APP_NAME %> in ` +
            "a new tab and carry on with your day. This is not a bug.",
    );
}

if (bowser.parse(navigator.userAgent).platform.type == "mobile") {
    alert(
        "You are using a phone. The UI on small screens can be very clunky " +
            "to use and is not recommended.\n\nPlease use a desktop, laptop, or " +
            "tablet for the best experience. You may also continue using this " +
            "device, but it may not be optimal.",
    );
}
setAppElement(appTarget);

const render = (children) => {
    ReactDOM.render(children, appTarget);

    if (window.SplashEnd) {
        window.SplashEnd();
    }
};

export default render;
