import { LOGIN, LOGOUT } from '../constants/user';

const initialState = {
    isLogged: true,
    username: '',
}

export default function user(state = initialState, action) {
    if (action.type === LOGIN) {
        return {
            ...state,
            isLogged: true,
            username: action.username
        }
    }

    if (action.type === LOGOUT) {
        return {
            ...state,
            isLogged: false,
            username: ''
        }
    }

    return state;
}