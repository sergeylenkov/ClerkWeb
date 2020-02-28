import { dashboard } from './dashboard';
import { exchange } from './exchange';
import { transactions } from './transactions';
import { reports } from './reports';
import { accounts } from './accounts';

const url = 'http://localhost:5000';

export const data = {
  dashboard: new dashboard(url),
  exchange: new exchange(url),
  transactions: new transactions(url),
  reports: new reports(url),
  accounts: new accounts(url),
}