import React, {Component} from 'react';
import {withRouter} from "react-router";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";

import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import YearView from './views/YearView';
import SortSupplierView from './views/SortSupplierView';
import Payment from './views/Payment';
import DaySupplierView from './views/DaySupplierView';
import SupplierService from '../../../../services/SupplierService';


class SortSupplier extends Component{

    state={
        isDrawerShow: false,
        activeStep: 1,
        branchSuppliers: [],
        currentSupplier: {},
        pageName: true
    }

        /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {
        const { branchSuppliers } = this.props;

        await this.setState({
            branchSuppliers: branchSuppliers,
        });
    }

    async componentDidUpdate(prevProps) {
        const { branchSuppliers } = this.props;

        if(prevProps.branchSuppliers.length !== branchSuppliers.length){
            this.setState({
                branchSuppliers: branchSuppliers,
            });
        }
    }

    getStepContent = step => {
        switch (step) {
            case 1:
                return <SortSupplierView setView={this.setStepContentView.bind(this)} searchSupplierHandler={this.searchSupplierHandler.bind(this)} branchSuppliers={this.state.branchSuppliers} supplierAdd={this.showAddView.bind(this)} />;
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} supplier={this.state.currentSupplier} pageName={this.state.pageName} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} supplier={this.state.currentSupplier} pageName={this.state.pageName} />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} supplier={this.state.currentSupplier} pageName={this.state.pageName} />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} supplier={this.state.currentSupplier} pageName={this.state.pageName} />;
            case 5:
                return <Payment setView={this.setStepContentView.bind(this)}  />;
            case 6:
                return <DaySupplierView setView={this.setStepContentView.bind(this)} supplierDetails={this.state.suppliers} pageName="Nico's enterprise" profitName="Amount owed" />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async searchSupplierHandler(searchValue){
        try{
            const suppliers = await new SupplierService().searchSupplier(searchValue);
            this.setState({
                branchSuppliers: suppliers,
            });
        }catch (e) {
            return false;
        }
    };

    showAddView = async (supplierId , step) => {
        const old_list = this.state.branchSuppliers;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === supplierId));

        console.log(itemIndex)
        this.setState({
            currentSupplier: itemIndex,
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

const EnhancedViewSuppliersNew = withDatabase(
    withObservables(['branchSuppliers'], ({ branchSuppliers , database }) => ({
        branchSuppliers: SupplierService.getBranchSuppliers(),
    }))(withRouter(SortSupplier))
);

export default EnhancedViewSuppliersNew;

