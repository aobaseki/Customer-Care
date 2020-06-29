import React, {Component} from 'react';
import {withRouter} from "react-router";

import MainPage from './sections/MainPage';
import DayView from './sections/DayView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';
import YearView from './sections/YearView';
import ReturnsProducts from './sections/ReturnsProducts';
import ConfirmPage from './sections/ConfirmPage';


class StockReturns extends Component{

    constructor(props){
        super(props);
        this.state = {
            activeStep: 0,
            branchSuppliers: [],
            currentSupplier: {},
            currentProduct: {},
            saleEntries: [],
            invoice: [],
            pageName: false
        }
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

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} pageName={this.state.pageName} supplier={this.state.currentSupplier} returnProducts={this.returnProducts.bind(this)} />;
            case 1:
                return <MainPage setView={this.setStepContentView.bind(this)} searchSupplier={this.searchSupplierHandler.bind(this)} branchSuppliers={this.state.branchSuppliers} supplierAdd={this.showAddView.bind(this)} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} pageName={this.state.pageName}  />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} pageName={this.state.pageName}  />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} setStepContentView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 5:
                return <ReturnsProducts setView={this.setStepContentView.bind(this)} supplier={this.state.supplier} products={this.state.products} />;
            case 6:
                return <ConfirmPage setView={this.setStepContentView.bind(this)} products={this.state.singleProduct} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
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

export default withRouter(StockReturns);