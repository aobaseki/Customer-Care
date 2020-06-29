import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import MainPage from './sections/reconciliation/MainPage';
import ReconciliationReport from './sections/reconciliation/ReconciliationReport';
import ReconciliationDetails from './sections/reconciliation/ReconciliationDetails';
import ReconciliationHistory from './sections/reconciliation/ReconciliationHistory';
import WeekView from './sections/reconciliation/WeekView';
import MonthView from './sections/reconciliation/MonthView';
import YearView from './sections/reconciliation/YearView';
import ReconcilationService from "../../services/ReconcilationService";

class Reconciliation extends Component{
    state={
        activeStep: 5,
        detailsList: [
            {
                'id': '1',
                'date': 'Monday, 23rd March 2020',
                'sales': '50',
                'credit': '60',
                'expenses': '70',
                'purchases': '40',
                'balance': '70',
                'collected': '40',
            },
            {
                'id': '2',
                'date': 'Tuesday, 24th March 2020',
                'sales': '50',
                'credit': '60',
                'expenses': '70',
                'purchases': '40',
                'balance': '30',
                'collected': '40',
            },
            {
                'id': '3',
                'date': 'Wednesday, 25th March 2020',
                'sales': '50',
                'credit': '60',
                'expenses': '70',
                'purchases': '40',
                'balance': '40',
                'collected': '40',
            }
        ],
        historyList: [
            {
                'id': '1',
                'dateRange': '23rd Mar 2020 - 27th Mar 2020',
                'time': '2:00 pm',
                'status': '60'
            },
            {
                'id': '2',
                'dateRange': '3rd Mar 2020 - 7th Mar 2020',
                'time': '10:00 am',
                'status': '60'
            },
            {
                'id': '3',
                'dateRange': '2nd Mar 2020 - 5th Mar 2020',
                'time': '7:00 pm',
                'status': '60'
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} reconciliations={this.state.detailsList} />
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} reconciliations={this.state.detailsList} />
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} reconciliations={this.state.detailsList} />
            case 5:
                return <MainPage generateReport={this.generateReport.bind(this)} setView={this.setStepContentView.bind(this)}  />;
            case 6:
                return <ReconciliationReport setView={this.setStepContentView.bind(this)} balance='600' cash='600' />
            case 0:
                return <ReconciliationDetails setView={this.setStepContentView.bind(this)} reconciliations={this.state.detailsList} />
            case 7:
                return <ReconciliationHistory setView={this.setStepContentView.bind(this)} histList={this.state.historyList} />
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    generateReport = async (duration, startDate, endDate) => {
        const response = await new ReconcilationService().getBranchReconcilationDetails(duration, startDate, endDate);

        console.log(response);
    };

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

export default withRouter(Reconciliation);
