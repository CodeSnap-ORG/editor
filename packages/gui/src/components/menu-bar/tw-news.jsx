import React from "react";
import { APP_NAME } from "../../lib/brand";
import { isScratchDesktop } from "../../lib/isScratchDesktop";
import CloseButton from "../close-button/close-button.jsx";
import styles from "./tw-news.css";

const LOCAL_STORAGE_KEY = `${process.env.ampmod_is_canary ? "canary" : "amp"}:closedNews`;
const NEWS_ID = "0.3";

const getIsClosedInLocalStorage = () => {
    try {
        return localStorage.getItem(LOCAL_STORAGE_KEY) === NEWS_ID;
    } catch (e) {
        return false;
    }
};

const markAsClosedInLocalStorage = () => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, NEWS_ID);
    } catch (e) {
        // ignore
    }
};

class TWNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closed: getIsClosedInLocalStorage(),
        };
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        markAsClosedInLocalStorage();
        this.setState({
            closed: true,
        });
        window.dispatchEvent(new Event("resize"));
    }
    render() {
        if (this.state.closed || isScratchDesktop()) {
            return null;
        }
        return (
            <div className={styles.news}>
                <div className={styles.text}>
                    {/* eslint-disable-next-line max-len */}
                    {`Run projects 2 times faster with the ${APP_NAME} 0.3 compiler! `}
                    <a
                        href="https://ampmod.flarum.cloud/t/bugs-and-glitches"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {"Report bugs here."}
                    </a>
                </div>
                <CloseButton
                    className={styles.close}
                    onClick={this.handleClose}
                />
            </div>
        );
    }
}

export default TWNews;
