// amp: Stand-in noop for Face Sensing.
// We can't just copy and TurboWarpify Face Sensing from Scratch's AGPL
// code due to legal issues. And since others contributed, we cannot just
// switch to AGPL without asking every contributor to.
// Opcodes and menus were collected by experimenting in Scratch Lab and analysing
// project.json files.
const formatMessage = require("format-message");
const BlockType = require("../../extension-support/block-type");
const ArgumentType = require("../../extension-support/argument-type");

// eslint-disable-next-line max-len
const iconURI = `data:image/svg+xml;base64,${btoa('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="39.47213" height="38.04231" viewBox="0,0,39.47213,38.04231"><g transform="translate(-220.17979,-161.0432)"><g stroke-miterlimit="10"><g fill="none" stroke="#2b702c" stroke-width="2" stroke-linecap="round"><path d="M258.65193,162.08276h-7.65362"/><path d="M258.65193,162.08276v7.65362"/></g><g fill="none" stroke="#2b702c" stroke-width="2" stroke-linecap="round"><path d="M250.99831,197.91724h7.65362"/><path d="M258.65193,197.91724v-7.65362"/></g><g fill="none" stroke="#2b702c" stroke-width="2" stroke-linecap="round"><path d="M228.83341,162.0432h-7.65362"/><path d="M221.17979,162.0432v7.65362"/></g><g fill="none" stroke="#2b702c" stroke-width="2" stroke-linecap="round"><path d="M221.17979,198.08552h7.65362"/><path d="M221.17979,198.08552v-7.65362"/></g><path d="M227.58048,180c0,-6.85911 5.56041,-12.41952 12.41952,-12.41952c6.85911,0 12.41952,5.56041 12.41952,12.41952c0,6.85911 -5.56041,12.41952 -12.41952,12.41952c-6.85911,0 -12.41952,-5.56041 -12.41952,-12.41952z" fill="#ffad00" stroke="#000000" stroke-width="2" stroke-linecap="butt"/><path d="M232.88239,176.42625c0,-1.38071 1.11929,-2.5 2.5,-2.5c1.38071,0 2.5,1.11929 2.5,2.5c0,1.38071 -1.11929,2.5 -2.5,2.5c-1.38071,0 -2.5,-1.11929 -2.5,-2.5z" fill="#000000" stroke="none" stroke-width="0.5" stroke-linecap="butt"/><path d="M241.52522,176.42625c0,-1.38071 1.11929,-2.5 2.5,-2.5c1.38071,0 2.5,1.11929 2.5,2.5c0,1.38071 -1.11929,2.5 -2.5,2.5c-1.38071,0 -2.5,-1.11929 -2.5,-2.5z" fill="#000000" stroke="none" stroke-width="0.5" stroke-linecap="butt"/><path d="M233.60867,184.27016c0,0 2.16104,2.10493 6.63985,1.96098c4.5194,-0.14526 5.99755,-1.96098 5.99755,-1.96098" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"/></g></g></svg>')}`;

/**
 * Class for fake Face Sensing
 * @constructor
 */
class FaceSensing {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        // Reminder for users.
        alert(
            "The Face Sensing extension is not supported. Blocks from it will still show but will be ignored." +
                " We hope to add the extension soon, but we cannot simply copy from Scratch due to licencing issues." +
                "\n\nSee https://codeberg.org/ampmod/ampmod/issues/6 for more information.",
        );
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: "faceSensing",
            name: "Face Sensing",
            menuIconURI: iconURI,
            blockIconURI: iconURI,
            blocks: [
                {
                    blockType: BlockType.LABEL,
                    text: "Unsupported: no face sensing blocks",
                },
                {
                    opcode: "whenFaceDetected",
                    text: "when a face is detected",
                    blockType: BlockType.HAT,
                    hideFromPalette: true,
                },
                {
                    opcode: "whenTilted",
                    text: "when face tilts [DIRECTION]",
                    blockType: BlockType.HAT,
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: "tiltMenu",
                            defaultValue: "left",
                        },
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: "whenSpriteTouchesPart",
                    text: "when this sprite touches a [PART]",
                    blockType: BlockType.HAT,
                    arguments: {
                        PART: {
                            type: ArgumentType.NUMBER,
                            menu: "partMenu",
                            defaultValue: 2,
                        },
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: "goToPart",
                    text: "go to [PART]",
                    blockType: BlockType.COMMAND,
                    arguments: {
                        PART: {
                            type: ArgumentType.NUMBER,
                            menu: "partMenu",
                            defaultValue: 2,
                        },
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: "pointInFaceTiltDirection",
                    text: "point in direction of face tilt",
                    blockType: BlockType.COMMAND,
                    hideFromPalette: true,
                },
                {
                    opcode: "setSizeToFaceSize",
                    text: "set size to face size",
                    blockType: BlockType.COMMAND,
                    hideFromPalette: true,
                },
                {
                    opcode: "faceIsDetected",
                    text: "a face is detected?",
                    blockType: BlockType.BOOLEAN,
                    hideFromPalette: true,
                },
                {
                    opcode: "faceTilt",
                    text: "face tilt",
                    blockType: BlockType.REPORTER,
                    hideFromPalette: true,
                },
                {
                    opcode: "faceSize",
                    text: "face size",
                    blockType: BlockType.REPORTER,
                    hideFromPalette: true,
                },
            ],
            menus: {
                tiltMenu: {
                    items: [
                        {
                            text: "left",
                            value: "left",
                        },
                        {
                            text: "right",
                            value: "right",
                        },
                    ],
                    acceptReporters: false,
                },
                partMenu: {
                    items: [
                        {
                            text: "left eye",
                            value: 0,
                        },
                        {
                            text: "right eye",
                            value: 1,
                        },
                        {
                            text: "nose",
                            value: 2,
                        },
                        {
                            text: "mouth",
                            value: 3,
                        },
                        {
                            text: "left ear",
                            value: 4,
                        },
                        {
                            text: "right ear",
                            value: 5,
                        },
                        {
                            text: "between eyes",
                            value: 6,
                        },
                        {
                            text: "top of head",
                            value: 7,
                        },
                    ],
                    acceptReporters: false,
                },
            },
        };
    }

    // No-op functions for each block
    whenFaceDetected() {
        // No-op
    }

    whenTilted() {
        // No-op
    }

    whenSpriteTouchesPart() {
        // No-op
    }

    goToPart() {
        // No-op
    }

    pointInFaceTiltDirection() {
        // No-op
    }

    setSizeToFaceSize() {
        // No-op
    }

    faceIsDetected() {
        return false;
    }

    faceTilt() {
        return 0;
    }

    faceSize() {
        return 100;
    }
}

module.exports = FaceSensing;
