class UserData { 
  constructor() { this._username = ''; } 
  async fetchUsername() { this._username = (await (await fetch('https://ampmod-api.onrender.com/session', { credentials: 'include' })).json()).username; } 
} 
module.exports = UserData;
