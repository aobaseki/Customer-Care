import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import {confirmAlert} from "react-confirm-alert";
import withObservables from "@nozbe/with-observables";

import ModelAction from "../../services/ModelAction";
import Payment from './sections/Payment';
import MainPage from './sections/MainPage';
import CustomerService from '../../services/CustomerService';
import { Q } from '@nozbe/watermelondb'
import LocalInfo from "../../services/LocalInfo";
import BranchCustomer from "../../models/branchesCustomer/BranchCustomer";
import Sales from "../../models/sales/Sales";

class CreditSales extends Component{
    state={
        activeStep: 0,
        pageName: false,
        branchCustomers: [],
        currentSale: {},
        allSales: [],
    }

    /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {
        const { branchCustomers, currentSale, sales } = this.props;

        await this.setState({
            branchCustomers: branchCustomers,
            currentSale: currentSale,
            allSales: sales,
        });
    }

    async componentDidUpdate(prevProps) {
        const {branchCustomers, currentSale, sales} = this.props;

        if(branchCustomers.length !== prevProps.branchCustomers.length){
            await this.setState({
            branchCustomers: branchCustomers,
            currentSale: currentSale,
            allSales: sales,
        });
        }
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainPage setView={this.setStepContentView.bind(this)} searchCustomer={this.searchCustomerHandler.bind(this)} sales={this.state.allSales} customerAdd={this.showAddView.bind(this)} />;
            case 1:
                return <Payment setView={this.setStepContentView.bind(this)} sale={this.state.currentSale} />;
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

    showAddView = async (id , step) => {
        const old_list = this.state.allSales;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === id));

        console.log(itemIndex)
        this.setState({
            currentSale: itemIndex,
            activeStep: step
        });
    };

    deleteCustomer = async (cId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this customer?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        new ModelAction('BranchCustomer').destroy(cId);
                        this.setState({
                            activeStep: 0
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        })
    };

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

const EnhancedCreditSales = withDatabase(
    withObservables(['branchCustomers'], ({ branchCustomers ,  database }) => ({
        branchCustomers: database.collections.get(BranchCustomer.table).query(Q.where('branchId' , LocalInfo.branchId)).observe(),
        sales: database.collections.get(Sales.table).query().observe(),
    }))(withRouter(CreditSales))
);

export default withRouter(EnhancedCreditSales);