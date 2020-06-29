import React, {Component} from 'react';
import SellView from "./sections/SellView";
import AddProductCart from "./sections/AddProductCart";
import LocalInfo from "../../../../../services/LocalInfo";
import SavedCart from "../../sell/cart/sections/savedCart/savedCart";
import BranchService from "../../../../../services/BranchService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { withRouter } from "react-router-dom";
import CartService from "../../../../../services/CartService";
import {Q} from "@nozbe/watermelondb";
import database from "../../../../../models/database";
import BranchCustomer from "../../../../../models/branchesCustomer/BranchCustomer";
import Carts from "../../../../../models/carts/Carts";
import SaleService from "../../../../../services/SaleService";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../../services/ModelAction";
import paths from "../../../../../utilities/paths";

class Sell extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDrawerShow: false,
            salesMade: 175,
            profitMade: 50,
            activeStep: 0,
            spCount: 0,
            productList: [],
            savedCart: [],
            branchProducts: [],
            customers: [],
            currentCustomer: 0,
            salesTodayDetails: {},
            history: {},
            cartTotalProduct: 0,
        }
    }

    async componentDidMount() {
        const {branchProducts , cartQuantity , branchCustomers , savedCarts} = this.props;

        const salesTodayDetails = await new SaleService().getTodaySalesDetails();

        await this.setState({
            branchProducts: branchProducts,
            spCount: cartQuantity,
            customers: branchCustomers,
            currentCustomer: await CartService.getCartCustomerId(),
            savedCart: savedCarts,
            salesTodayDetails: salesTodayDetails,
            cartTotalProduct: await CartService.getCartProductQuantity(),
        });
    }

    async componentDidUpdate(prevProps) {
        const {cartQuantity , branchCustomers , savedCarts } = this.props;

        const salesTodayDetails = await new SaleService().getTodaySalesDetails();

        if(this.state.savedCart.length !== savedCarts.length || this.state.currentCustomer !== await CartService.getCartCustomerId() || cartQuantity !== prevProps.cartQuantity || branchCustomers.length !== prevProps.branchCustomers.length || this.state.cartTotalProduct !== await CartService.getCartProductQuantity()){
            this.setState({
                spCount: cartQuantity,
                customers: branchCustomers,
                currentCustomer: await CartService.getCartCustomerId(),
                savedCart: savedCarts,
                salesTodayDetails: salesTodayDetails,
                cartTotalProduct: await CartService.getCartProductQuantity(),
            });
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['Main View' , 'Product Details View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <SellView addToCart={this.addProductToCartHandler.bind(this)} undoProductAdd={this.undoProductAddHandler.bind(this)} salesTodayDetails={this.state.salesTodayDetails} branchProducts={this.state.branchProducts} searchHandler={this.searchHandler.bind(this)} productAdd={this.showAddView.bind(this)} spCount={this.state.spCount} savedCartCount={this.state.savedCart.length} salesMade={this.state.salesMade} profitMade={this.state.profitMade} searchBarcode={this.searchBarcode.bind(this)} setView={this.setStepContentView.bind(this)} />;
            case 1:
                return <AddProductCart undoProductAdd={this.undoProductAddHandler.bind(this)} currentCustomer={this.state.currentCustomer} setCustomerHandler={this.setSavedCartCustomerHandler.bind(this)} customers={this.state.customers} addToCart={this.addProductToCartHandler.bind(this)} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} spCount={this.state.spCount} salesMade={this.state.salesMade} profitMade={this.state.profitMade}/>;
            case 2:
                return <SavedCart continueSavedCartHandler={this.continueSavedCartHandler.bind(this)} searchSavedCart={this.searchSavedCartHandler.bind(this)} setView={this.setStepContentView.bind(this)} carts={this.state.savedCart} />;
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
    *Add product to cart
    * */
    addProductToCartHandler = (formFields) => {
        return new CartService().addProductToCart(formFields);
    };

    setSavedCartCustomerHandler = async(customer) => {
        await database.adapter.setLocal("activeCustomer" , customer);
    };

    deleteProduct = async (pId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        new ModelAction('CartEntry').destroy(pId);
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

    undoProductAddHandler = async(customer) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to undo this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const cartEntryId = await CartService.getLastCartEntry();

                        new ModelAction('CartEntry').destroy(cartEntryId.id);

                        this.setState({
                            activeStep: 0
                        })
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

    /*
    * Search products handler...
    * */
    searchSavedCartHandler = (search) => {
        /*
        * @todo
        * Work on fetching data from source
        * */
        let savedCart = JSON.parse(localStorage.getItem('savedCart')) || [];

        const searchResults = savedCart.filter(function(cart) {
            return ((cart.customerName).toLowerCase().indexOf(search.toLowerCase()) !== -1 || cart.cartTotal === search)
        });

        this.setState({
            savedCart: searchResults
        });
    };

    /*
    * Search products handler...
    * */
    searchHandler = async (searchValue) => {
        /*
        * @todo make sure it works...
        * */
        try {
            const products = await new BranchService().searchBranchProduct(searchValue);

            this.setState({
                branchProducts: products,
            });
        }catch (e) {
            return false
        }
    };

    /*Add product to cart*/
    showAddView = async (productId , step) => {
        const old_list = this.state.branchProducts;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.productId === productId));

        //console.log(itemIndex)
        this.setState({
            currentProduct: itemIndex,
            activeStep: step
        });
    };

    continueSavedCartHandler = async (cartId) => {
        const history = this.props.history;

        await this.setState({
            spCount: 0,
        });

        if(await CartService.activateCart(cartId)){
            history.push(paths.cart);
        }else{
            alert('Please try again.');
            return false
        }
    };

    //Search product barcode
    searchBarcode = async (barcode) => {
        const products = await new BranchService().searchBarcodeProduct(barcode);

        await this.setState({
            currentProduct: products[0],
        });

        return products[0];
    };

    render(){
        return (
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

const EnhancedSell = withDatabase(
    withObservables(['branchProducts' , 'branchCustomers' , 'savedCarts'], ({ branchProducts , database , branchCustomers , savedCarts }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
        cartQuantity: database.collections.get('cart_entries').query(Q.where('cartId' , localStorage.getItem('cartId'))).observeCount(),
        branchCustomers: database.collections.get(BranchCustomer.table).query().observe(),
        savedCarts: database.collections.get(Carts.table).query(
            Q.where('status' , 'suspend'),
            Q.where('branchId' , LocalInfo.branchId)
        ).observe(),
        //cartQ: database.collections.get(CartEntry.table).query(Q.where('id', new CartService().cartId())).observe(),
        //cartQ: database.collections.get(CartEntry.table).find(new CartService().cartId()),
    }))(withRouter(Sell))
);

export default EnhancedSell;
