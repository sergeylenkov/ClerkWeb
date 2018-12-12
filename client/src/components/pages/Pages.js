import React from 'react';
import { Dashboard } from './Dashboard.js';

export class Pages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 0
        }
    }

    render() {
        if (this.state.activePage === 0) {
            return <div className="pages"><Dashboard/></div>
        }
        return <div className="pages"></div>
    }
}