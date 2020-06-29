import React, {Component} from 'react';
import ModelAction from "../../../../services/ModelAction";
import {confirmAlert} from "react-confirm-alert";
import {withRouter} from "react-router";

import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import YearView from './views/YearView';
import Payment from './views/Payment';
import DaySupplierView from './views/DaySupplierView';
import DateToggle from "../../../../components/DateToggle/DateToggle";

class OrderSortDate extends Component{

    state={
        activeStep: 0,
        pageName: false,
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <DayView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} deleteProduct={this.deleteProduct.bind(this)}  updateStockEntry={this.updateStockEntry.bind(this)} />;
            case 2:
                return <WeekView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 3:
                return <MonthView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 4:
                return <YearView setView={this.setStepContentView.bind(this)} pageName={this.state.pageName} />;
            case 5:
                return <Payment setView={this.setStepContentView.bind(this)}  />;
            case 1:
                return <DaySupplierView setView={this.setStepContentView.bind(this)} supplierDetails={this.state.suppliers} />;
    
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async componentDidUpdate(prevProps) {
        const {...props} = this.props;

        if(prevProps.activeStep !== props.activeStep){
            console.log('me')
        }
    }

    deleteProduct = async (pId) => {
        confirmAlert({
           title: 'Confirm to delete',
           message: 'Are you sure you want to delete this entry.',
           buttons: [
               {
                   label: 'Yes',
                   onClick: () => {
                       new ModelAction('BranchProductStock').destroy(pId);
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

    async updateStockEntry(pId, formFields){
        console.log(formFields)
        console.log(pId)
        if (formFields.costPrice) {
            const data = {
                costPrice: parseFloat(formFields.costPrice)
            };
            try {
                const status = new ModelAction('BranchProductStock').update(pId, data);
                console.log(status)
                if(status){
                    return true;
                }
                alert('Something went wrong');
                return false;
            }catch (e) {
                return false;
            }
        }
        else {
        
            try {
                const status = new ModelAction('BranchProductStock').update(pId, formFields);
                console.log(status)
                if(status){
                    return true;
                }
                alert('Something went wrong');
                return false;
            }catch (e) {
                return false;
            }
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

export default withRouter(OrderSortDate);