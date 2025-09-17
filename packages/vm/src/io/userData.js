class UserData {
    constructor() {
        this._username = "";
    }

    /**
     * Fetch the username from the remote API and store it locally
     */
    async fetchUsername() {
        const response = await fetch('https://ampmod-api.onrender.com/session', { credentials: 'include' });
        const data = await response.json();
        this._username = data.username;
    }

    /**
     * Handler for updating the username
     * @param {object} data Data posted to this ioDevice.
     * @property {!string} username The new username.
     */
    postData(data) {
        this._username = data.username;
    }

    /**
     * Getter for username. Initially empty string, until set via postData or fetchUsername.
     * @returns {!string} The current username
     */
    getUsername() {
        return this._username;
    }
}

module.exports = UserData;
