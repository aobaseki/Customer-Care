import React, {Component} from 'react';
import MainView from './sections/MainView';
import {withRouter} from "react-router";
import {confirmAlert} from "react-confirm-alert";



class Accounting extends Component {  

    constructor (props) {
        super(props);
        this.state = {
            inputItems: [],
            currentInputItem: {
                amount: '',
                key: '',
                date: ''
            },
            outputItems: [],
            currentOutputItem: {
                amount: '',
                key: '',
                date: ''
            }
        }
        this.handleInput = this.handleInput.bind(this);
        this.addInput = this.addInput.bind(this);

        this.handleOutput = this.handleOutput.bind(this);
        this.addOutput = this.addOutput.bind(this);
    }

    addInput (e) {
        e.preventDefault();
        const newItem = this.state.currentInputItem;

        if(newItem.amount !==""){
            const myItems = [...this.state.inputItems, newItem];
            this.setState({
                inputItems: myItems,
                currentInputItem:{
                    amount:'',
                    key:'',
                    date: ''
                },
            })
        }
    }

    addOutput (e) {
        e.preventDefault();
        const newItem = this.state.currentOutputItem;

        if(newItem.amount !==""){
            const myItems = [...this.state.outputItems, newItem];
            this.setState({
                outputItems: myItems,
                currentOutputItem:{
                    amount:'',
                    key:'',
                    date: ''
                }, 
            })
        }
    }

    handleInput(e) {
        const currentDate= new Date();
        this.setState({
            currentInputItem: {
                amount: e.target.value,
                key: Date.now(),
                date: currentDate.toLocaleTimeString()
            }
        })
    }

    handleOutput(e) {
        const currentDate= new Date();
        this.setState({
            currentOutputItem: {
                amount: e.target.value,
                key: Date.now(),
                date: currentDate.toLocaleTimeString()
            }
        })
    }

    handleAnotherInput(e) {
        this.setState({
            currentInputItem: {
                amount: e.target.value
            }
        })
    }

    handleAnotherOutput(e) {
        this.setState({
            currentOutputItem: {
                amount: e.target.value
            }
        })
    }

    deleteInput = (pKey , event) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let old_list = [...this.state.inputItems];
                        const result = old_list.filter(item => item.key !== pKey);
                        this.setState({
                            inputItems: [...result],
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

    deleteOutput = (pKey , event) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let old_list = [...this.state.outputItems];
                        const result = old_list.filter(item => item.key !== pKey);
                        this.setState({
                            outputItems: [...result],
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

                <MainView 
                    listOfCashInItems={this.state.inputItems}
                    amountValCashIn={this.state.currentInputItem.amount} 
                    changesCashIn={this.handleInput.bind(this)} 
                    addCashIn={this.addInput.bind(this)} 
                    handleEditIn={this.handleAnotherInput.bind(this)} 
                    deleteCashIn={this.deleteInput.bind(this)}

                    amountValCashOut={this.state.currentOutputItem.amount}
                    listOfCashOutItems={this.state.outputItems}
                    addCashOut={this.addOutput.bind(this)}
                    handleEditOut={this.handleAnotherOutput.bind(this)}
                    changesCashOut={this.handleOutput.bind(this)}
                    deleteCashOut={this.deleteOutput.bind(this)}
                />

            </div>
        )
    }
}

export default withRouter(Accounting);