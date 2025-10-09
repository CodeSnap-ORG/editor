import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import ReactModal from "react-modal";
import Box from "../box/box.jsx";
import styles from "./welcome.css";
import { APP_NAME, APP_SLOGAN } from "@ampmod/branding";

const Welcome = ({ intl, isRtl, onContinue }) => (
    <ReactModal
        isOpen
        className={styles.welcomeContent}
        overlayClassName={styles.welcomeOverlay}
        onRequestClose={onContinue}
        ariaHideApp={false}
    >
        <div dir={isRtl ? "rtl" : "ltr"}>
            <Box className={styles.illustration} />
            <Box className={styles.body}>
                <h2>
                    <FormattedMessage
                        id="amp.welcome.title"
                        defaultMessage="Welcome to {APP_NAME}!"
                        description="Welcome modal title"
                        values={{ APP_NAME }}
                    />
                </h2>
                <p>
                    <FormattedMessage
                        id="amp.welcome.intro"
                        defaultMessage="{APP_NAME} is a new block-based programming language to bring more complex and powerful features to intermediate programmers."
                        description="Welcome modal introduction"
                        values={{ APP_NAME }}
                    />
                </p>
                {process.env.ampmod_is_canary && (
                    <p>
                        <FormattedMessage
                            id="amp.welcome.canary"
                            defaultMessage="You are using a canary build of {APP_NAME}. This build may be unstable and contain bugs. Please report any issues you encounter."
                            description="Welcome modal canary build message"
                            values={{ APP_NAME }}
                        />
                    </p>
                )}
                <p>
                    <FormattedMessage
                        id="amp.welcome.help"
                        defaultMessage="Need help getting started? Check out the {wikiLink} or join the conversation on the {forumsLink}."
                        description="Welcome modal help links. {wikiLink} and {forumsLink} are links to the AmpMod wiki and forums, respectively."
                        values={{
                            wikiLink: (
                                <a
                                    href="https://ampmod.miraheze.org"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    AmpMod Wiki
                                </a>
                            ),
                            forumsLink: (
                                <a
                                    href="https://ampmod.flarum.cloud"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    AmpMod Forums
                                </a>
                            ),
                        }}
                    />
                </p>
                {/* <p>
                    <small>
                        <FormattedMessage
                            id="amp.welcome.closing"
                            defaultMessage="This message can be shown again in the Settings menu."
                            description="Text closing the welcome message"
                        />
                    </small>
                </p> */}
                <Box className={styles.buttonRow}>
                    <button className={styles.continue} onClick={onContinue}>
                        <FormattedMessage
                            id="amp.welcome.ok"
                            defaultMessage="OK"
                            description="Text for the button which continues from the welcome dialog"
                        />
                    </button>
                </Box>
            </Box>
        </div>
    </ReactModal>
);

Welcome.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onContinue: PropTypes.func.isRequired,
};

export default injectIntl(Welcome);
