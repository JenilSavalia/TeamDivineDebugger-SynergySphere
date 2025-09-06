export const getUserFromToken = () => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    try {
        return JSON.parse(userJson);
    } catch (err) {
        console.error('Failed to parse user from localStorage:', err);
        return null;
    }
};
