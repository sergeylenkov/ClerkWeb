import { LOGIN, LOGOUT } from '../constants/user';

export function login(username, password) {
    return { type: LOGIN, username, password }
}

export function logout() {
    return { type: LOGOUT }
}