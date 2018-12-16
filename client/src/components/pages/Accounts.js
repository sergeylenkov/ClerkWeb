import React from 'react';
import { AccountsList } from './accounts/List.js';

export class Accounts extends React.Component {
    render() {
        return <div className="accounts"><div className="accounts-list-panel"><AccountsList/></div></div>
    }
}