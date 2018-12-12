import React from 'react';
import { DashboardBudget } from './dashboard/Budget.js';

export class Dashboard extends React.Component {
    render() {
        return <div className="dashboard"><DashboardBudget/></div>
    }
}