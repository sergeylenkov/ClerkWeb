import React from 'react';
import { AccountsList } from './accounts/List.js';
import { TransactionsList } from './transactions/List.js';

export class Accounts extends React.Component {
    render() {
        return (
            <div className="accounts">
                <AccountsList/>
                <TransactionsList/>
            </div>
        )
    }
}