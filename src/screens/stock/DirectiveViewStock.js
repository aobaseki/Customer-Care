import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import StockMainPage from "./sections/stockMainPage";
import './stock.scss';
import LocalInfo from '../../services/LocalInfo';
import StockProductSingle from "./sections/stockProductSingle";
import StockSummaryPage from "./sections/itemsLeft/stockSummaryPage";
import ItemsOutOfStock from "./sections/outOfStock/itemsOutOfStock";
import ItemsLowStock from "./sections/lowStock/itemsLowStock";
import AddNewStockPage from "./sections/addNewStockPage";
import AllStock from './sections/allStock/AllStock';
import MoveStock from "./sections/moveStock/moveStock";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import BranchService from "../../services/BranchService";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import BranchStockService from "../../services/BranchStockService";
import BranchProductStock from "../../models/branchesProductsStocks/BranchProductStock";
import AssignBarcode from './sections/AssignBarcode';
import BranchProduct from "../../models/branchesProducts/BranchProduct";
import ModelAction from "../../services/ModelAction";

class DirectiveViewStock extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeStep: 0,
            stockList: [],
            branchProducts: [],
            companyBranches: [],
            currentProduct: {},
            storeDetails: {
                itemsInStore: '2000',
                totalCostPrice: '50,000',
                totalSellingPrice: '60,000',
                totalExpectedProfit: '10,000',
            },
            itemsLeft: 0,
            lowestStockItems: [],
            outOfStockItems: [],
        }
    }

    /*
    * Fetch all products when component is mounted
    * */
    async componentDidMount() {
        const { branchProducts } = this.props;

        await this.setState({
            branchProducts: branchProducts,
            companyBranches: LocalInfo.branches,
            itemsLeft: await new BranchStockService().getCompanyItemsLeft(),
            lowestStockItems: await new BranchStockService().getLowStockItems(),
            outOfStockItems: await new BranchStockService().getItemsOutOfStock(),
            storeDetails: {
                itemsInStore: await new BranchStockService().getCompanyItemsLeft(),
                totalCostPrice: await new BranchStockService().getTotalCostPrice(),
                totalSellingPrice: await new BranchStockService().getTotalSellingPrice(),
                totalExpectedProfit: await new BranchStockService().getTotalExpectedProfit(),
            },
        });
    }

    async componentDidUpdate(prevProps) {
        const { branchProducts , branchProductStock } = this.props;

        if(prevProps.branchProductStock.length !== branchProductStock.length){
            this.setState({
                branchProducts: branchProducts,
                companyBranches: LocalInfo.branches,
                itemsLeft: await new BranchStockService().getCompanyItemsLeft(),
                lowestStockItems: await new BranchStockService().getLowStockItems(),
                outOfStockItems: await new BranchStockService().getItemsOutOfStock(),
            });
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['Add Categories' , 'View Added Categories'];
    };

    /*
    * Get content of a particular view
    * */
    getStepContent = step => {
        switch (step) {
            case 0:
                return <StockMainPage searchProduct={this.searchProductHandler.bind(this)} searchBarcode={this.searchBarcodeHandler.bind(this)} outOfStockItems={this.state.outOfStockItems} lowestStockItems={this.state.lowestStockItems}  itemsLeft={this.state.itemsLeft} branchProducts={this.state.branchProducts} stock={this.state.stockList} setView={this.setStepContentView.bind(this)} addProductStockView={this.showProductStockView.bind(this)}/> ;
            case 1:
                return <StockProductSingle companyBranches={this.state.companyBranches} product={this.state.currentProduct} setView={this.setStepContentView.bind(this)}/>;
            case 2:
                return <StockSummaryPage itemsLeft={this.state.itemsLeft} storeDetails={this.state.storeDetails} setView={this.setStepContentView.bind(this)}/>;
            case 3:
                return <ItemsOutOfStock addNewProductStockView={this.showProductStockView.bind(this)} stock={this.state.outOfStockItems} storeDetails={this.state.storeDetails} setView={this.setStepContentView.bind(this)}/>;
            case 4:
                return <ItemsLowStock addNewProductStockView={this.showProductStockView.bind(this)} stock={this.state.lowestStockItems} storeDetails={this.state.storeDetails} setView={this.setStepContentView.bind(this)}/>;
            case 5:
                return <AddNewStockPage product={this.state.currentProduct} updateProduct={this.updateNewProduct.bind(this)} setView={this.setStepContentView.bind(this)}/>;
            case 6:
                return <MoveStock product={this.state.currentProduct} setView={this.setStepContentView.bind(this)} moveStock={this.moveStock.bind(this)} />;
            case 7:
                return <AssignBarcode setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} addProductBarcode={this.addProductBarcode.bind(this)} />
            case 8:
                return <AllStock setView={this.setStepContentView.bind(this)} searchProduct={this.searchProductHandler.bind(this)} branchProducts={this.state.branchProducts}/>
            default:
                return 'Complete';
        }
    };

    /*
    * Go to next view
    * */
    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    };

    /*
    * return to previous view
    * */
    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };

    /*
    * Set a particular view
    * */
    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    /*
    * View a products stock
    * */
    showProductStockView = (productId) => {
        const old_list = this.state.branchProducts;

        const newStep = this.state.companyBranches.length > 1 ? 1 : 5;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === productId));

        this.setState({
            currentProduct: itemIndex,
            activeStep: 1
        });
    };

    /*
    *  Add product barcode
    **/

   addProductBarcode = async(pId, productBarcode) => {
        try {
            await new ModelAction('Product').update(pId, {
                barCode: productBarcode
            });

            return true;
        }catch (e) {
            return false;
        }
   }



    /*
    * Add new stock
    * */

    addNewProductStockView = (productId) => {
        console.log(`${productId} from addStock`);
        const old_list = this.state.branchProducts;

        //Find index of specific object using findIndex method.
        const product = old_list.filter((product => product.id === productId));

        //console.log(itemIndex)
        this.setState({
            currentProduct: product[0],
            activeStep: 5
        });
    };

    async updateNewProduct(formFields){
        console.log(formFields)
        try {
            const status = await new BranchStockService().addStock(formFields);
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

    async moveStock(formFields){
        try {
            const status = await new BranchStockService().moveStock(formFields);
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

    searchBarcodeHandler = async (barcode) => {
        try{
            const products = await new BranchService().searchBarcodeProduct(barcode);

            return products;
        }catch (e) {
            return false;
        }
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

    render(){
        return (
            <div>{this.getStepContent(this.state.activeStep)}</div>
        )
    }
}

const EnhancedDirectiveViewStock = withDatabase(
    withObservables(['branchProducts' , 'branchProductStock'], ({ branchProducts , branchProductStock, database }) => ({
        branchProducts: database.collections.get(BranchProduct.table).query(Q.where('branchId' , LocalInfo.branchId)).observe(),//new BranchService(LocalInfo.branchId).getProducts(),
        branchProductStock: database.collections.get(BranchProductStock.table).query(Q.where('branchId' , LocalInfo.branchId)).observe(),
    }))(withRouter(DirectiveViewStock))
);

export default withRouter(EnhancedDirectiveViewStock);

