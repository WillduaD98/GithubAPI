import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch(
      '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(userInfo)
      }
    )
    const userData = await response.json();
    
    if (!response.ok) {
      throw new Error(`Invalid Login Route Response, check network tab!`)
    }
    return userData;
  } catch (error) {
    console.log(`Error from login request: `, error);
    return Promise.reject(`Couild not Request login properly.`)
  }
}



export { login };
