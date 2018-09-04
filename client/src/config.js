
/**USE THIS AS THE API ENDPOINT TO ALL API SERVER CALLS*/
export const API_URL = 'https://virtualserver.herokuapp.com';

/**CHECK IF ANY USER IS LOGGED IN INTO THE PLATFORM*/
export const isLoggedIn = (key) => JSON.parse(localStorage.getItem(key)) ? true : false