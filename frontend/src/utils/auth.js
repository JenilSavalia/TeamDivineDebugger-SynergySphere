import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const getToken = () => Cookies.get('jwt'); // Replace 'jwt' with your cookie key

export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode(token); // expects { role, ... } in payload
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};
