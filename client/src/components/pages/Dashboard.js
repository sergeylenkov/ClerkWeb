import React from 'react';
import { DashboardBalance } from './dashboard/Balance';

export class Dashboard extends React.Component {
    render() {
        return <div className="dashboard"><DashboardBalance/></div>
    }
}