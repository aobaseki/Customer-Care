import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import './sections/AddProducts.scss';
import MainView from "./sections/MainView";
import AddProductView from "./sections/AddProductView";
import AddedProductView from "./sections/AddedProductView";
import {confirmAlert} from "react-confirm-alert";
import EditProductView from "./sections/EditProductView";
import CompleteView from "./sections/CompleteView";
import './addProduct.scss';
import Api from "../../../services/Api";
import { v1 as uuidv1 } from 'uuid';
import getTime from 'date-fns/getTime';
import SyncService from "../../../services/SyncService";
import LocalInfo from "../../../services/LocalInfo";
import database from "../../../models/database";
import ProductRequest from "../../admin/productRequest/ProductRequest";

class AddProducts extends Component{
    constructor(props){
        super(props);
        this.state = {
            isDrawerShow: false,
            value: 0,
            storeProducts: 1,
            loading: false,
            activeStep: 0,
            currentProduct: 0,
            productList: [],
            addedProducts: [],
            searchValue: '',
        }
    }

    async componentDidMount() {
        const branchId = localStorage.getItem('activeBranch');
        const accessToken = localStorage.getItem('accessToken');
        try {
            let products = await new Api('others').index(
                {},
                {'Authorization': `Bearer ${accessToken}`},
                `https://core-api-dev.mystoreaid.net/v1/client/branches/${branchId}/products`,
            );

            localStorage.setItem('storeProductsLookup' , JSON.stringify(products.data.products));

            this.setState({
                'productList' : products.data.products,
            });
        }catch (error) {
            console.log(error)
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['Main View' , 'Product Details View'];
    };

    getStepContent = step => {
        const shop_products = (this.state.productList).filter((item) => item['status'] === true);

        switch (step) {
            case 0:
                return <MainView searchValue={this.state.searchValue} searchHandler={this.searchHandler.bind(this)} optionFilter={this.optionProductHandler.bind(this)} finishAddProducts={this.completeAddProducts.bind(this)} loading={this.state.loading} searchBarcode={this.searchBarcode.bind(this)} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} viewAddedProducts={this.viewAddedProducts(this)} products={this.state.productList} productAdd={this.showAddView.bind(this)} removeProduct={this.removeProduct.bind(this)} spCount={shop_products.length} />;
            case 1:
                return <AddProductView searchHandler={this.searchHandler.bind(this)} deleteHistory={this.deleteHistory.bind(this)} undoAddProduct={this.undoAddProducts.bind(this)} addNewProduct={this.addNewProduct.bind(this)} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct}/>;
            case 2:
                return <AddedProductView deleteProduct={this.deleteProduct.bind(this)} products={this.state.addedProducts} setView={this.setStepContentView.bind(this)} pro_quantity={this.state.storeProducts} productEdit={this.showEditView.bind(this)}/>;
            case 3:
                return <EditProductView products={this.state.addedProducts} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} />;
            case 4:
                return <CompleteView/>;
            case 5:
                return <ProductRequest/>;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    /*
    * Search products handler...
    * */
    searchHandler = (search) => {
        /*
        * @todo
        * Work on fetching data from source
        * */
        let storeProducts = JSON.parse(localStorage.getItem('storeProductsLookup'));

        const searchResults = storeProducts.filter(function(item) {
            return (item.name).toLowerCase().indexOf(search.toLowerCase()) !== -1
        });

        this.setState({
            searchValue: search,
            productList: searchResults
        });
    };

    completeAddProducts = async() => {
        //console.log(database)
        //console.log(this.props.history)

        const branchId = localStorage.getItem('activeBranch');
        const accessToken = localStorage.getItem('accessToken');

        this.setState({
            loading: true
        });

        const branchProductsAdded = JSON.parse(localStorage.getItem('branchProductsAdded')) || [];
        const branchProductsRemoved = localStorage.getItem('branchProductsRemoved') || [];
        const branchDeletedHistory = localStorage.getItem('branchDeletedHistory') || [];

        if (Array.isArray(branchProductsAdded) && branchProductsAdded.length) {
            const addedProducts = await new Api('others').create(
                branchProductsAdded,
                {'Authorization': `Bearer ${accessToken}`},
                {},
                `https://core-api-dev.mystoreaid.net/v1/client/branches/${branchId}/products`,
            );

            localStorage.removeItem('branchProductsAdded');
        }
        /*
        * @todo why did you use the single operator...
        * */
        if (typeof branchProductsRemoved != "undefined" && branchProductsRemoved != null && branchProductsRemoved.length != null
            && branchProductsRemoved.length > 0) {
            let removedProducts = await new Api('others').destroy(
                {'Authorization': `Bearer ${accessToken}`},
                {},
                `https://core-api-dev.mystoreaid.net/v1/client/branches/${branchId}/products?product_ids=${branchProductsRemoved}`,
            );

            localStorage.removeItem('branchProductsRemoved');
        }

        if (typeof branchDeletedHistory != "undefined" && branchDeletedHistory != null && branchDeletedHistory.length != null
            && branchDeletedHistory.length > 0) {
            let removedProducts = await new Api('others').destroy(
                {'Authorization': `Bearer ${accessToken}`},
                {},
                `https://core-api-dev.mystoreaid.net/v1/client/branches/${branchId}/histories?history_ids=${branchDeletedHistory}`,
            );

            localStorage.removeItem('branchDeletedHistory');
        }
        await SyncService.sync(LocalInfo.companyId, LocalInfo.branchId, LocalInfo.userId, database);

        const returnPage = localStorage.getItem('redirectPath') || '';
        localStorage.removeItem('redirectPath');

        if(returnPage){
            this.props.history.push(returnPage);
        }

        this.setState({
            loading: false,
            activeStep: 4,
        });
    };

    viewAddedProducts = () => {
        return 0;
    };

    deleteHistory = (historyId) => {
        //console.log(historyId);
        const productId = this.state.currentProduct[0].id;
        let branchDeletedHistory = JSON.parse(localStorage.getItem('branchDeletedHistory')) || [];
        let branchProductsAdded = JSON.parse(localStorage.getItem('branchProductsAdded')) || [];
        let currentProductList = JSON.parse(localStorage.getItem('storeProductsLookup'));

        const productIndex = currentProductList.findIndex((item) => item.id === productId);
        const productHistoryIndex = ((currentProductList[productIndex]).history).findIndex((history) => history.id === historyId);

        const historySingle = currentProductList[productIndex].history[productHistoryIndex];

        let productStock = '';
        if(historySingle.tempId){
            productStock = (currentProductList[productIndex].stock).filter((stock) => stock.tempId !== historySingle.id);
            branchProductsAdded = branchProductsAdded.filter((stock) => stock.tempId !== historySingle.id);
        }else{
            branchDeletedHistory.push(historyId);
            productStock = (currentProductList[productIndex].stock).filter((stock) => stock.tempId !== historySingle.branchProductStockId);
        }

        const productHistory = ((currentProductList[productIndex]).history).filter((history) => history.id !== historyId);
        const currentProduct = currentProductList.filter((product) => product.id === productId);

        currentProductList[productIndex].history = productHistory;
        currentProductList[productIndex].stock = productStock;

        localStorage.setItem('branchDeletedHistory' , JSON.stringify(branchDeletedHistory));
        localStorage.setItem('storeProductsLookup' , JSON.stringify(currentProductList));
        localStorage.setItem('branchProductsAdded' , JSON.stringify(branchProductsAdded));

        this.setState({
            productList: currentProductList,
            currentProduct: currentProduct,
        });
    };

    undoAddProducts = (productId) => {
        let branchProductsAdded = JSON.parse(localStorage.getItem('branchProductsAdded')) || [];
        branchProductsAdded = branchProductsAdded.filter((item => item.productId !== this.state.currentProduct[0].id));

        localStorage.setItem('branchProductsAdded' , JSON.stringify(branchProductsAdded));

        //let branchProductsRemoved = JSON.parse(localStorage.getItem('branchProductsRemoved')) || [];

        let old_list = this.state.productList;

        const productIndex = old_list.findIndex((item => item.id === (productId)));
        const item = {...old_list[productIndex]};

        if(item.stock.length === 1){
            item.owned = false;
            item.stock = [];
            item.history = [];
        }else if (item.stock.length > 1){
            item.stock.pop();
            item.history.pop();
        }

        old_list[productIndex] = item;

        localStorage.setItem('storeProductsLookup' , JSON.stringify(old_list));

        this.setState({
            productList: old_list
        });
    };

    removeProduct = (productId) => {
        confirmAlert({
            title: 'Confirm to remove',
            message: 'Are you sure you want to remove this product. It may be having stock',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        //console.log(formFields);
                        let branchProductsAdded = JSON.parse(localStorage.getItem('branchProductsAdded')) || [];
                        branchProductsAdded = branchProductsAdded.filter((item => item.productId !== productId));

                        localStorage.setItem('branchProductsAdded' , JSON.stringify(branchProductsAdded));

                        let branchProductsRemoved = JSON.parse(localStorage.getItem('branchProductsRemoved')) || [];

                        let old_list = this.state.productList;

                        const productIndex = old_list.findIndex((item => item.id === (productId)));
                        const item = {...old_list[productIndex]};

                        if(item.owned){
                            item.owned = false;
                        }

                        branchProductsRemoved.push(productId);
                        item.stock = [];
                        item.history = [];

                        old_list[productIndex] = item;

                        localStorage.setItem('branchProductsRemoved' , JSON.stringify(branchProductsRemoved));

                        localStorage.setItem('storeProductsLookup' , JSON.stringify(old_list));

                        this.setState({
                            productList: old_list
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
        });
    };

    showAddView = (productId , step) => {
        const old_list = this.state.productList;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === productId));

        //console.log(itemIndex)
        this.setState({
            currentProduct: itemIndex,
            activeStep: step
        });
    };

    searchBarcode = async (barcode) => {
        //console.log(`${proId} from addProduct`);

        const old_list = JSON.parse(localStorage.getItem('storeProductsLookup'));

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((product => product.barCode === barcode));

        await this.setState({
            currentProduct: itemIndex
        });

        return itemIndex;
    };


    showEditView = (proId , step) => {
        const old_list = this.state.addedProducts;

        //Find index of specific object using findIndex method.
        const product = old_list.filter((item => item.pro_id === proId));
        //Assign current object to new variable

        this.setState({
            currentProduct: product,
            activeStep: step
        });
    };

    //OptionSelectProducts
    /*
    * Bring products per option selected...
    * */

    optionProductHandler = async (value) => {
        console.log(value);
        let storeProducts = [];

        switch (value) {
            case 'all':
                storeProducts = JSON.parse(localStorage.getItem('storeProductsLookup'));

                break;
            case 'stocked':
                storeProducts = JSON.parse(localStorage.getItem('storeProductsLookup')).filter((product) => (product.stock !== null && product.owned === true));

                break;
            case 'incomplete':
                storeProducts = JSON.parse(localStorage.getItem('storeProductsLookup')).filter((product) => (product.owned === true && (product.sellingprice === 0 || (product.stock[(product.stock.length - 1).costPrice]) === null)));

                break;
            default:
                alert('Value does not exist');
                break;
        }

        this.setState({
            productList: storeProducts
        });
    };

    addNewProduct = async(formFields) => {
        //console.log(formFields);
        const search = this.state.searchValue;
        let branchProductsAdded = JSON.parse(localStorage.getItem('branchProductsAdded')) || [];

        let old_list = JSON.parse(localStorage.getItem('storeProductsLookup'));

        const productIndex = old_list.findIndex((item => item.id === (formFields.productId)));
        const item = {...old_list[productIndex]};

        if(!item.owned){
            item.owned = true;
        }

        if((formFields.sellingPrice === "" || formFields.sellingPrice === null || formFields.sellingPrice === 0) && (formFields.costPrice === "" || formFields.costPrice === null || formFields.costPrice === 0) && (formFields.quantity === "" || formFields.quantity === null || formFields.quantity === 0)){
            old_list[productIndex] = item;
            const tempId = uuidv1();

            formFields = {
                branchId: formFields.branchId,
                productId: formFields.productId,
                costPrice: null,
                sellingPrice: null,
                quantity: formFields.quantity === null ? null : parseFloat(formFields.quantity),
                tempId: tempId,
            };

            branchProductsAdded.push(formFields);

            localStorage.setItem('branchProductsAdded' , JSON.stringify(branchProductsAdded));

            localStorage.setItem('storeProductsLookup' , JSON.stringify(old_list));

            const searchResults = old_list.filter(function(item) {
                return (item.name).toLowerCase().indexOf(search.toLowerCase()) !== -1
            });

            this.setState({
                searchValue: this.state.searchValue,
                productList: searchResults
            });

            return true
        }

        if(formFields.sellingPrice !== "" || formFields.sellingPrice !== null){
            item.sellingPrice = formFields.sellingPrice === null ? null : parseFloat(formFields.sellingPrice);
        }

        const tempId = uuidv1();
        const historyItem = {
            quantity: formFields.quantity,
            branch_stock_id: formFields.branchId,
            id: tempId,
            tempId: tempId,
            created_at: getTime(new Date()),
        };

        formFields = {
            branchId: formFields.branchId,
            productId: formFields.productId,
            costPrice: formFields.costPrice === null ? null : parseFloat(formFields.costPrice),
            sellingPrice: formFields.sellingPrice === null ? null : parseFloat(formFields.sellingPrice),
            quantity: formFields.quantity === null ? null : parseFloat(formFields.quantity),
            tempId: tempId,
        };
        console.log(formFields)

        branchProductsAdded.push(formFields);
        item.stock = item.stock || [];
        (item.stock).push(
            formFields
        );

        (item.history).push(historyItem);

        //quantity //branch_stock_id //id
        old_list[productIndex] = item;

        localStorage.setItem('branchProductsAdded' , JSON.stringify(branchProductsAdded));

        localStorage.setItem('storeProductsLookup' , JSON.stringify(old_list));

        const searchResults = old_list.filter(function(item) {
            return (item.name).toLowerCase().indexOf(search.toLowerCase()) !== -1
        });

        this.setState({
            searchValue: this.state.searchValue,
            productList: searchResults
        });
    };

    deleteProduct = (pId , event) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let old_list = [...this.state.addedProducts];

                        const result = old_list.filter(item => item.id !== pId);

                        this.setState({
                            addedProducts: [...result],
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

    useStyles = () => makeStyles(theme => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
        },
    }));

    render(){
        return(
            <div className={`addProducts`}>

                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

export default withRouter(AddProducts);
