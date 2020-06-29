import React, {Component} from 'react';
import {withRouter} from "react-router";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchService from "../../../../../../services/BranchService";
import LocalInfo from "../../../../../../services/LocalInfo";
import DateToggle from "../../../../../../components/DateToggle/DateToggle";

import DayView from './sections/DayView';
import WeekView from './sections/WeekView';
import MonthView from './sections/MonthView';
import YearView from './sections/YearView';
import SProductView from './sections/SProductView';


class SortProduct extends Component{

    state={
        isDrawerShow: false,
        activeStep: 1,
        branchProducts: [],
        currentProduct: {},
        pageName: true
    }

    /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {
        const { branchProducts } = this.props;

        await this.setState({
            branchProducts: branchProducts,
        });
    }

    getStepContent = step => {
        switch (step) {
            case 1:
                return <SProductView setView={this.setStepContentView.bind(this)} searchProduct={this.searchProductHandler.bind(this)} branchProducts={this.state.branchProducts} productAdd={this.showAddView.bind(this)} />;
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} pageName={this.state.pageName} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} pageName={this.state.pageName} />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)}product={this.state.currentProduct} pageName={this.state.pageName} />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} pageName={this.state.pageName} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async searchProductHandler(searchValue){
        try{
            const products = await new BranchService().searchBranchProduct(searchValue);
            this.setState({
                branchProducts: products,
            });
        }catch (e) {
            return false;
        }
    }

    showAddView = async (productId , step) => {
        const old_list = this.state.branchProducts;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.productId === productId));

        console.log(itemIndex)
        this.setState({
            currentProduct: itemIndex,
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

const EnhancedDirectiveViewStock = withDatabase(
    withObservables(['branchProducts'], ({ branchProducts ,  database }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
    }))(withRouter(SortProduct))
);

export default withRouter(EnhancedDirectiveViewStock);

