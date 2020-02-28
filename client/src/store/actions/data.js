import { ACCOUNTS_UPDATED, INITIALIZED } from '../constants/data';

export function accountsUpdated(accounts) {
  return { type: ACCOUNTS_UPDATED, accounts }
}

export function setInitialized(isInitialized) {
  return { type: INITIALIZED, isInitialized }
}
