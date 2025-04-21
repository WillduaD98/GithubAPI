import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if(!token) {return null};

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error(`Error happended getting profile: ${error}`)
      return null;
    }

  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string ) {
    // TODO: return a value that indicates if the token is expired
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);


    if (!decoded.exp) {
      return true;
    }

    const expirationTime = decoded.exp;

    return Date.now() > expirationTime * 1000;
  
  } catch (error) {
    console.error(`Error expiring token: ${error}`)
    }
  }

  getToken(): string {
    // TODO: return the token
     const loggedUser = localStorage.getItem('id_token') || '';  
     return loggedUser;
    }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    
    // TODO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
