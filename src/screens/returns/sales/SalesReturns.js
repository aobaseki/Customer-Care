import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchService from "../../../services/BranchService";
import LocalInfo from "../../../services/LocalInfo";

import MainPage from './sections/MainPage';
import DayView from './sections/DayView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';
import YearView from './sections/YearView';
import ReturnsProducts from './sections/ReturnsProducts';
import ConfirmPage from './sections/ConfirmPage';
import CustomerService from '../../../services/CustomerService';


class SalesReturns extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeStep: 1,
            branchCustomers: [],
            currentCustomer: {},
            saleEntries: [],
            invoice: [],
            pageName: true
        }
    }

    /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {
        const { branchCustomers } = this.props;

        await this.setState({
            branchCustomers: branchCustomers,
        });
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} pageName={this.state.pageName} customer={this.state.currentCustomer} returnProducts={this.returnProducts.bind(this)} />;
            case 1:
                return <MainPage setView={this.setStepContentView.bind(this)} searchCustomer={this.searchCustomerHandler.bind(this)} branchCustomers={this.state.branchCustomers} customerAdd={this.showAddView.bind(this)} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)}  />;
            case 5:
                return <ReturnsProducts setView={this.setStepContentView.bind(this)} customer={this.state.currentCustomer} products={this.state.saleEntries} />;
            case 6:
                return <ConfirmPage setView={this.setStepContentView.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async searchCustomerHandler(searchValue){
        try{
            const customers = await new CustomerService().searchBranchCustomer(searchValue);
            this.setState({
                branchCustomers: customers,
            });
        }catch (e) {
            return false;
        }
    };

    showAddView = async (customerId , step) => {
        const old_list = this.state.branchCustomers;

        if(customerId !== 0){
            //Find index of specific object using findIndex method.
            const itemIndex = old_list.filter((item => item.customerId === customerId));

            console.log(itemIndex)
            this.setState({
                currentCustomer: itemIndex,
                activeStep: step
            });
        }else{
            this.setState({
                currentCustomer: [],
                activeStep: step
            });
        }
    };

    returnProducts = async (step, saleEntries) => {
        console.log(saleEntries);
        this.setState({
            saleEntries: saleEntries,
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

const EnhancedSalesReturns= withDatabase(
    withObservables(['branchCustomers'], ({ branchCustomers ,  database }) => ({
        branchCustomers: new BranchService(LocalInfo.branchId).getCustomers(),
    }))(withRouter(SalesReturns))
);

export default withRouter(EnhancedSalesReturns);
