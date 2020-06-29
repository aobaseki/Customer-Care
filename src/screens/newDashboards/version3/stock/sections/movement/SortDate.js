import React, {Component} from 'react';
import {withRouter} from "react-router";

import DayView from './sections/DayView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';
import YearView from './sections/YearView';
import DateToggle from "../../../../../../components/DateToggle/DateToggle";

class SortDate extends Component{

    state={
        isDrawerShow: false,
        activeStep: 0,
        pageName: false,
        productList: [
            {
                "pro_id": "1",
                "name": "Bella Vinas Red Wine",
                "date": "6th Mar, 2020",
                "time": "5:00 pm"
            },
            {
                "pro_id": "2",
                "name": "Nido Milk Sachet",
                "date": "7th Mar, 2020",
                "time": "1:00 pm"
            },
            {
                "pro_id": "3",
                "name": "Milo Sachet 50g",
                "date": "8th Mar, 2020",
                "time": "2:00 pm"
            },
            {
                "pro_id": "4",
                "name": "Ideal Milk 50g",
                "date": "9th Mar, 2020",
                "time": "3:00 pm"
            },
            {
                "pro_id": "5",
                "name": "Beta Malt 500ml PB",
                "date": "10th Mar, 2020",
                "time": "4:00 pm"
            }
        ],
        weekList: [ 
            {
                'day_id': '1',
                'day': 'Monday, 9th Mar, 2020',
                "date": "8th Mar, 2020",
                "time": "9:00 am"
            },
            {
                'day_id': '2',
                'day': 'Tuesday, 10th Mar, 2020',
                "date": "8th Mar, 2020",
                "time": "9:00 am"
            },
            {
                'day_id': '3',
                'day': 'Wednesday, 11th Mar, 2020',
                "date": "8th Mar, 2020",
                "time": "9:00 am"
            },
            {
                'day_id': '4',
                'day': 'Thursday, 12th Mar, 2020',
                "date": "8th Mar, 2020",
                "time": "9:00 am"
            },
            
        ],
        monthList: [ 
            {
                'week_id': '1',
                'week': 'Week 5: 17/02/2020 - 21/02/2020',
                "date": "8th Mar, 2020",
                "time": "9:00 am"
            },
            {
                'week_id': '2',
                'week': 'Week 6: 24/02/2020 - 28/02/2020',
                "date": "18th Mar, 2020",
                "time": "10:00 pm"
            },
            {
                'week_id': '3',
                'week': 'Week 7: 01/03/2020 - 05/03/2020',
                "date": "28th Mar, 2020",
                "time": "11:00 am"
            },
            {
                'week_id': '4',
                'week': 'Week 8: 08/03/2020 - 12/03/2020',
                "date": "15th Mar, 2020",
                "time": "2:00 pm"
            },
        ],
        yearList: [ 
            {
                'month_id': '1',
                'month': 'January 2020',
                "date": "15th Mar, 2020",
                "time": "2:00 pm"
            },
            {
                'month_id': '2',
                'month': 'February 2020',
                "date": "15th Mar, 2020",
                "time": "2:00 pm"
            },
            {
                'month_id': '3',
                'month': 'March 2020',
                "date": "15th Mar, 2020",
                "time": "2:00 pm"
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} products={this.state.productList} pageName={this.state.pageName} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} weekItem={this.state.weekList} pageName={this.state.pageName} />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} monthItem={this.state.monthList} pageName={this.state.pageName} />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} yearItem={this.state.yearList} pageName={this.state.pageName} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
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