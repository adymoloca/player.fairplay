import decode from 'jwt-decode';

export const decodeAccessToken = (token) => {

    const decoded = token ? decode(token) : null;

    const id = decoded?.authToken?.id;
    const role = decoded?.authToken?.role;
    const email = decoded?.authToken?.email;
    const iat = decoded?.iat;
    const exp = decoded?.exp;

    return { id: id, role: role, email: email, iat: iat, exp: exp };
};
