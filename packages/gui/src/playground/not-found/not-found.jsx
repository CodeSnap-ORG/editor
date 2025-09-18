import "../import-first";
import React from "react";
import render from "../app-target";
import styles from "../info.css";
import * as bowser from "bowser";

import { APP_NAME } from "../../lib/brand";
import { applyGuiColors } from "../../lib/themes/guiHelpers";
import { detectTheme } from "../../lib/themes/themePersistance";

import Header from "../../components/amp-header/header.jsx";
import Footer from "../../components/amp-footer/footer.jsx";

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = "en";

const Home = () => (
    <>
        <Header />
        <header className={styles.headerContainer}>
            <h1 className={styles.headerText}>404 Not Found</h1>
            <p className={styles.headerText}>
                Sorry, this page doesn't appear to exist.
            </p>
        </header>
        <main className={styles.main}>
            <section>
                <p>
                    Are you looking for the{" "}
                    <a href="editor">{APP_NAME} editor</a> or{" "}
                    <a href="player">player</a>?
                </p>
                <p>
                    If you have any questions or concerns, you can post on the{" "}
                    <a href="https://ampmod.flarum.cloud">forums</a>.
                </p>
                <p>Happy AmpModding!</p>
            </section>
            <Footer />
        </main>
    </>
);

render(<Home />);
