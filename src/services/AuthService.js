import API from "../utlis/Api";
import Cookies from 'universal-cookie';

const AuthService = {
    login,
    logout,
    isLoggedIn,
    //currentUser: currentUserSubject.asObservable(),
    //get currentUserValue () { return currentUserSubject.value }
};

function isLoggedIn()
{
    //console.log(cookies.get('user').token)
    const cookies = new Cookies();
    return cookies.get('user') !== undefined; 
}

/*set(name, value, [options])
Set a cookie value

name (string): cookie name
value (string|object): save the value and stringify the object if needed
options (object): Support all the cookie options from RFC 6265
path (string): cookie path, use / as the path if you want your cookie to be accessible on all pages
expires (Date): absolute expiration date for the cookie
maxAge (number): relative max age of the cookie from when the client receives it in seconds
domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
secure (boolean): Is only accessible through HTTPS?
httpOnly (boolean): Is only the server can access the cookie?
sameSite (boolean|none|lax|strict): Strict or Lax enforcement*/

function login(event) {
    const data = new FormData(event);
    var object = {};
    data.forEach((value, key) => object[key] = value);
    var json = JSON.stringify(object);
    API.post('/auth/login', data)
    .then(response =>  {
        //Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
        const cookies = new Cookies();
        //cookies.set('user', response.data, { path: '/', secure: true, httpOnly: true });
        cookies.set('user', response.data, { path: '/', });
        window.location = "/dashboard"
    })
    .catch(error => {
        //this.setState({ errorMessage: error.message });
        console.log(error);
        console.error('There was an error!', error);  
    });
}



      
function login2(username, password) {
    /*const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });*/
}

/*remove(name, [options])
Remove a cookie

name (string): cookie name
options (object): Support all the cookie options from RFC 6265
path (string): cookie path, use / as the path if you want your cookie to be accessible on all pages
expires (Date): absolute expiration date for the cookie
maxAge (number): relative max age of the cookie from when the client receives it in seconds
domain (string): domain for the cookie (sub.domain.com or .allsubdomains.com)
secure (boolean): Is only accessible through HTTPS?
httpOnly (boolean): Is only the server can access the cookie?
sameSite (boolean|none|lax|strict): Strict or Lax enforcement*/

function logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
    //currentUserSubject.next(null);
    const cookies = new Cookies();
    cookies.remove('user');
}

export default AuthService;