import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { connect } from "react-redux";

import check from "./check.svg";
import dropdownCaret from "./dropdown-caret.svg";
import { MenuItem, Submenu } from "../menu/menu.jsx";
import {
    GUI_LIGHT,
    GUI_DARK,
    GUI_AMOLED,
    Theme,
} from "../../lib/themes/index.js";
import { closeSettingsMenu } from "../../reducers/menus.js";
import { setTheme } from "../../reducers/theme.js";
import { persistTheme } from "../../lib/themes/themePersistance.js";
import lightModeIcon from "./tw-sun.svg";
import darkModeIcon from "./tw-moon.svg";
import styles from "./settings-menu.css";

const options = defineMessages({
    [GUI_LIGHT]: {
        defaultMessage: "Light",
        description: "Light theme option",
        id: "amp.gui.light",
    },
    [GUI_DARK]: {
        defaultMessage: "Dark",
        description: "Dark theme option",
        id: "amp.gui.dark",
    },
    [GUI_AMOLED]: {
        defaultMessage: "AMOLED (Beta)",
        description: "AMOLED theme option with true black",
        id: "amp.gui.amoled",
    },
});

const icons = {
    [GUI_LIGHT]: lightModeIcon,
    [GUI_DARK]: darkModeIcon,
    [GUI_AMOLED]: darkModeIcon,
};

const GuiIcon = ({ id }) => <img src={icons[id]} draggable={false} alt="" />;

GuiIcon.propTypes = {
    id: PropTypes.string,
};

const GuiThemeItem = ({ id, isSelected, onClick }) => (
    <MenuItem onClick={onClick}>
        <div className={styles.option}>
            <img
                className={classNames(styles.check, {
                    [styles.selected]: isSelected,
                })}
                width={15}
                height={12}
                src={check}
                draggable={false}
            />
            <GuiIcon id={id} />
            <FormattedMessage {...options[id]} />
        </div>
    </MenuItem>
);

GuiThemeItem.propTypes = {
    id: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
};

const GuiThemeMenu = ({ isOpen, isRtl, onChangeTheme, onOpen, theme }) => (
    <MenuItem expanded={isOpen}>
        <div className={styles.option}>
            <GuiIcon id={theme.gui} />
            <span className={styles.submenuLabel}>
                <FormattedMessage
                    defaultMessage="Theme"
                    description="Label for menu to choose GUI theme (light, dark, AMOLED)"
                    id="tw.menuBar.guiTheme"
                />
            </span>
            <img
                className={styles.expandCaret}
                src={dropdownCaret}
                draggable={false}
            />
        </div>
        <Submenu place={isRtl ? "left" : "right"}>
            {[GUI_LIGHT, GUI_DARK, GUI_AMOLED].map(id => (
                <GuiThemeItem
                    key={id}
                    id={id}
                    isSelected={theme.gui === id}
                    onClick={() => onChangeTheme(theme.set("gui", id))}
                />
            ))}
        </Submenu>
    </MenuItem>
);

GuiThemeMenu.propTypes = {
    theme: PropTypes.instanceOf(Theme),
    isRtl: PropTypes.bool,
    onChangeTheme: PropTypes.func,
};

const mapStateToProps = state => ({
    theme: state.scratchGui.theme.theme,
    isRtl: state.locales.isRtl,
});

const mapDispatchToProps = dispatch => ({
    onChangeTheme: theme => {
        dispatch(setTheme(theme));
        dispatch(closeSettingsMenu());
        persistTheme(theme);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(GuiThemeMenu);
