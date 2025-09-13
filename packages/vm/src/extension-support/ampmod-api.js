const VERSION = "0.3.0";

export class AmpMod {
    constructor() {
        this.version = VERSION;
    }

    ampmodWebLoggedIn() {
        return false;
    }
}

export default new AmpMod();
