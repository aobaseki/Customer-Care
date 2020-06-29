import React, {Component} from 'react';
import {withRouter} from "react-router";

import MainPage from './sections/MainPage';
import CollectionHistory from './sections/CollectionHistory';

class Accounting extends Component {  

    state={
        activeStep: 0,
        todayCollection:{
            'date': 'Thursday 3rd March 2020',
            'name': 'Ama Serwaa',
            'amount': '300'
        }
    }

    /*
    * Fetch all products when component is mounted
    * */
    // async componentDidMount() {
    //     const { branchCustomers, currentCustomer } = this.props;

    //     await this.setState({
    //         branchCustomers: branchCustomers,
    //         currentCustomer: currentCustomer
    //     });
    // }

    // async componentDidUpdate(prevProps) {
    //     const {branchCustomers, currentCustomer} = this.props;

    //     if(branchCustomers.length !== prevProps.branchCustomers.length){
    //         await this.setState({
    //         branchCustomers: branchCustomers,
    //         currentCustomer: currentCustomer
    //     });
    //     }
    // }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainPage setView={this.setStepContentView.bind(this)} collection={this.state.todayCollection} />;
            case 1:
                return <CollectionHistory setView={this.setStepContentView.bind(this)} collection={this.state.todayCollection} />;
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

export default withRouter(Accounting);