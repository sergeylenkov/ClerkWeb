import { ACCOUNTS_UPDATED, INITIALIZED } from 'store/constants/data';

const initialState = {
  isInitialized: false,
  accounts: [],
}

export default function data(state = initialState, action) {
  if (action.type === ACCOUNTS_UPDATED) {
    return {
      ...state,
      accounts: action.accounts,
    }
  }

  if (action.type === INITIALIZED) {
    return {
      ...state,
      isInitialized: action.isInitialized,
    }
  }

  return state;
}