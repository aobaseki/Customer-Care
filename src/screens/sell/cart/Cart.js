import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import CartView from "./sections/ViewCart";
import {confirmAlert} from "react-confirm-alert";
import Checkout from "./sections/Checkout";
import CompleteCart from "./sections/CompleteCart";
import CartService from "../../../services/CartService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { Q } from '@nozbe/watermelondb'
import ModelAction from "../../../services/ModelAction";
import BranchCustomer from "../../../models/branchesCustomer/BranchCustomer";
import LocalInfo from "../../../services/LocalInfo";
import CustomerService from "../../../services/CustomerService";

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            isDrawerShow: false,
            cartId: new CartService().cartId(),
            activeStep: 0,
            productList: [],
            cartTotalProduct: 0,
            cartTotalAmount: 0,
            cartEntries: this.props.cartEntries,
            customers: [],
            currentCustomer: 0,
        }
    }

    async componentDidMount() {
        const {cartEntries , branchCustomers} = this.props;

        this.state.cartId = await new CartService().cartId();
        console.log(branchCustomers);

        await this.setState({
            productList: cartEntries,
            cartTotalProduct: await CartService.getCartProductQuantity(),
            cartTotalAmount: await CartService.getCartEntryAmount(),
            customers: branchCustomers,
            currentCustomer: await CartService.getCartCustomerId(),
        });
    }

    async componentDidUpdate(prevProps) {
        const {branchCustomers} = this.props;

        if(this.state.currentCustomer !== await CartService.getCartCustomerId() || this.props.cartEntries !== prevProps.cartEntries || branchCustomers.length !== prevProps.branchCustomers.length || this.state.cartTotalProduct !== await CartService.getCartProductQuantity()){
            await this.setState({
                productList: this.props.cartEntries,
                cartTotalProduct: await CartService.getCartProductQuantity(),
                cartTotalAmount: await CartService.getCartEntryAmount(),
                customers: branchCustomers,
                currentCustomer: await CartService.getCartCustomerId(),
            });
        }
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return <CartView searchCustomerHandler={this.searchCustomerHandler.bind(this)} setCustomerHandler={this.setCustomerHandler.bind(this)} currentCustomer={this.state.currentCustomer} customers={this.state.customers} cartTotalAmount={this.state.cartTotalAmount} cartTotalProducts={this.state.cartTotalProduct} changePrice={this.changeProductPriceHandler.bind(this)} changeQuantity={this.changeProductQuantityHandler.bind(this)} entries={this.state.cartEntries} setView={this.setStepContentView.bind(this)} products={this.state.productList} deleteProduct={this.deleteProduct.bind(this)} />;
            case 1:
                return <Checkout searchCustomerHandler={this.searchCustomerHandler.bind(this)} setCustomerHandler={this.setCustomerHandler.bind(this)} currentCustomer={this.state.currentCustomer} customers={this.state.customers} cartTotalAmount={this.state.cartTotalAmount} setView={this.setStepContentView.bind(this)} />;
            case 2:
                return <CompleteCart setView={this.setStepContentView.bind(this)} products={this.state.productList} cartTotalProducts={this.state.cartTotalProduct} customers={this.state.customers} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    deleteProduct = async (pId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        new ModelAction('CartEntry').softDelete(pId);
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

    async searchCustomerHandler(value) {
        try {
            const results = await new CustomerService().searchBranchCustomer(value);

            this.setState({
                customers: results
            })
        }catch (e) {
            console.log(e)
        }
    }

    async changeProductQuantityHandler(cartEntry , value){
        try {
            let status = new CartService().updateCartEntryDetails(cartEntry , value);
            status = await status;

            if(status){
                this.setState({
                    productList: await new CartService().getCartProducts(),
                    cartTotalProduct: await CartService.getCartProductQuantity(),
                    cartTotalAmount: await CartService.getCartEntryAmount(),
                });
                return true;
            }
            return false;
        }catch (e) {
            return false;
        }
    }

    async changeProductPriceHandler(cartEntry , value){
        try {
            let status = new CartService().updateCartEntryPrice(cartEntry , value);
            status = await status;

            if(status){
                this.setState({
                    productList: await new CartService().getCartProducts(),
                    cartTotalProduct: await CartService.getCartProductQuantity(),
                    cartTotalAmount: await CartService.getCartEntryAmount(),
                });
                return true;
            }
            return false;
        }catch (e) {
            return false;
        }
    }

    async setCustomerHandler(customer){
        await new CartService().setCustomer(customer);

        this.setState({
            customers: this.props.branchCustomers,
            currentCustomer: customer
        })
    }

    render(){
        return(
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        )
    }
}

const EnhancedCart = withDatabase(
    withObservables(['cart_entries' , 'branchCustomers'], ({ database , cartEntries, branchCustomers }) => ({
        cartQuantity: CartService.cartQuantity(),
        currentCustomer: database.adapter.getLocal("activeCustomer") === null || 0 ? 0 : database.adapter.getLocal("activeCustomer"),
        cart: database.collections.get('carts').query(Q.where('id' , localStorage.getItem('cartId'))).observe(),
        branchCustomers: database.collections.get(BranchCustomer.table).query(Q.where('branchId' , LocalInfo.branchId)).observe(),
        cartEntries: database.collections.get('cart_entries').query(Q.where('cartId' , localStorage.getItem('cartId'))).observe(),
    }))(withRouter(Cart))
);

export default EnhancedCart;
