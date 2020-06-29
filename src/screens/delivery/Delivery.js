import React, {Component} from 'react';
import {withRouter} from "react-router";

import MainPage from './sections/MainPage';

class Delivery extends Component {  

    state={
        activeStep: 0,
        storeList:[
            {
            'id': '1',
            'name': 'Jojo Mart',
            'branches': [
                {
                    'name': 'Lapaz branch'
                },
                {
                    'name': 'East legon branch'
                }
            ]
            }
        ],
        altStoreList: [
            {
                'id': '1',
                'name': 'Marries Store'
            }
        ]
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainPage setView={this.setStepContentView.bind(this)} />;
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
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

export default withRouter(Delivery);