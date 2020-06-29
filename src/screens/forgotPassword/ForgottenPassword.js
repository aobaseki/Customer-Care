import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import ForgotPassword from "./sections/ForgotPassword";
import './forgotPassword.scss';
import ResetPassword from "./sections/ResetPassword";
import ConfirmSMS from "./sections/ConfirmSMS";


class ForgottenPassword extends Component{
    state={
        isDrawerShow: false,
        activeStep: 0,
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <ForgotPassword setView={this.setStepContentView.bind(this)}/>;
            case 1:
                return <ConfirmSMS setView={this.setStepContentView.bind(this)} />
            case 2:
                return <ResetPassword setView={this.setStepContentView.bind(this)} />;
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

export default withRouter(ForgottenPassword);
