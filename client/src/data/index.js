import { dashboard } from './dashboard';
import { exchange } from './exchange';
import { transactions } from './transactions';
import { reports } from './reports';

export const AccountTypes = {
  Receipts: 0,
  Deposits: 1,
  Expenses: 2,
  Debts: 3,
  Virtual: 4
}

export const BudgetTypes = {
  Week: 0,
  Month: 1,
  Year: 2,
  Custom: 3
}

const url = 'http://localhost:5000';

export const data = {
  dashboard: new dashboard(url),
  exchange: new exchange(url),
  transactions: new transactions(url),
  reports: new reports(url),
}