import React, {Component} from 'react';
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { withRouter } from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../services/ModelAction";
import MainSuppliersView from "./sections/MainSuppliersView";
import SupplierService from "../../../../services/SupplierService";
import SingleSupplierDetails from "./sections/SingleSupplierDetails";
import EditSupplierDetails from "./sections/EditSupplierDetails";

class ViewSuppliersNew extends Component {
    state = {
        activeStep: 0,
        branchSuppliers: [],
    };

    async componentDidMount() {
        const { history, database , branchSuppliers} = this.props;

        await this.setState({
            branchSuppliers: branchSuppliers,
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , branchSuppliers } = this.props;

        if(prevProps.branchSuppliers.length !== branchSuppliers.length){
            this.setState({
                branchSuppliers: branchSuppliers,
            });
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['All Suppliers View' , 'Single Supplier View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <MainSuppliersView searchSupplierHandler={this.searchSupplierHandler.bind(this)} branchSuppliers={this.state.branchSuppliers} setView={this.setStepContentView.bind(this)}  />;
            case 1:
                return <SingleSupplierDetails branchSuppliers={this.state.branchSuppliers} setView={this.setStepContentView.bind(this)} deleteSupplier={this.deleteSupplier.bind(this)} />;
            case 2:
                return <EditSupplierDetails branchSuppliers={this.state.branchSuppliers} setView={this.setStepContentView.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    /*
    * @todo change color of active tab
    * */
    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    /*
    * Search products handler...
    * */
    searchSupplierHandler = async (searchValue) => {
        /*
        * @todo make sure it works...
        * */
        try {
            const branchSuppliers = await new SupplierService().searchSupplier(searchValue);
console.log(branchSuppliers)
            this.setState({
                branchSuppliers: branchSuppliers,
            });

console.log(this.state.branchSuppliers)
        }catch (e) {
            return false
        }
    };

    deleteSupplier = (id) => {
        confirmAlert({
            title: 'Confirm to remove supplier',
            message: 'Are you sure you want to remove this supplier. It may be having orders you need information on.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await new ModelAction('BranchSuppliers').destroy(id);

                            this.setStepContentView(0);
                        } catch (e) {
                            console.log(e)
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        });
    };

    render(){
        return (
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

const EnhancedViewSuppliersNew = withDatabase(
    withObservables(['branchSuppliers'], ({ branchSuppliers , database }) => ({
        branchSuppliers: SupplierService.getBranchSuppliers(),
    }))(withRouter(ViewSuppliersNew))
);

export default EnhancedViewSuppliersNew;
