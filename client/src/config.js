
/**USE THIS AS THE API ENDPOINT TO ALL API SERVER CALLS*/
export const API_URL = 'https://virtualserver.herokuapp.com';

/**USE THIS TO VERIFY EMAILS WITH PLUS(+) SIGNS */
export const emailRegx = /^([_a-z0-9]+[\._a-z0-9]*)(\+[a-z0-9]+)?@(([a-z0-9-]+\.)*[a-z]{2,10})$/g;

/**USE THIS TO VERIFY NORMAL EMAILS */
export const validateEmail = /^([a-z0-9-_.]+\@[a-z0-9-.]+\.[a-z]{2,4})$/g;

/**CHECK IF ANY USER IS LOGGED IN INTO THE PLATFORM*/
export const isLoggedIn = (key) => sessionStorage.getItem(key) ? true : false