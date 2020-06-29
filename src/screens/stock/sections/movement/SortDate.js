import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import DayView from './sections/DayView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';
import YearView from './sections/YearView';
import DateToggle from "../../../../components/DateToggle/DateToggle";

class SortDate extends Component{
    constructor(props){
        super(props);
        this.state = {
            isDrawerShow: false,
            activeStep: 0,
            pageName: false
        };
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 2:
                return <WeekView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 3:
                return <MonthView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 4:
                return <YearView getChildrenView={this.getChildrenViewDetails.bind(this)} setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    getChildrenViewDetails = async (index , view) => {
        localStorage.setItem("activeHistoryIndex" , index);

        switch(view){
            case 0:
                this.setState({
                    activeStep: view
                });
                return true;
            case 2:
                this.setState({
                    activeStep: view
                });
                return true;
            case 3:
                this.setState({
                    activeStep: view
                });
                return true;
        }
    };

    render(){
        return(
            <div>
                <DateToggle
                    setView={this.setStepContentView.bind(this)}
                />
                {this.getStepContent(this.state.activeStep)}

            </div>
        )
    }
}

export default withRouter(SortDate);
