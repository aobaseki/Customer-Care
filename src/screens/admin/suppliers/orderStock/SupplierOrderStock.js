import React, {Component} from 'react';
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { withRouter } from "react-router-dom";
import {Q} from "@nozbe/watermelondb";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../services/ModelAction";
import SupplierService from "../../../../services/SupplierService";
import SupplierStockView from "./sections/SupplierStockView";
import AddSupplierOrderItem from "./sections/AddSupplierOrderItem";
import BranchStockService from "../../../../services/BranchStockService";
import BranchProductStock from "../../../../models/branchesProductsStocks/BranchProductStock";
import AddedStockOrderView from "./sections/AddedStockOrderView";
import PaySupplierOrder from "./sections/PaySupplierOrder";

class SupplierOrderStock extends Component {
    state = {
        activeStep: 0,
        currentProduct: {},
        branchSupplierProducts: [],
        stockOrderId: '',
        stockOrderProducts: [],
        stockTotalProduct: 0,
        stockTotalAmount: 0,
    };

    async componentDidMount() {
        const { history, database , branchSupplierProducts , stockOrderId , stockOrderProducts } = this.props;
        const totalAmount = (stockOrderProducts).reduce((a, b) => parseFloat(a) + parseFloat(b.quantity * b.costPrice || 0), 0).toFixed(2);
        const totalQuantity = (stockOrderProducts).reduce((a, b) => parseFloat(a) + parseFloat(b.quantity || 0), 0);

        await this.setState({
            branchSupplierProducts: branchSupplierProducts,
            stockOrderId: stockOrderId,
            stockOrderProducts: stockOrderProducts,
            stockTotalAmount: totalAmount,
            stockTotalQuantity: totalQuantity,
        });
    }

    async componentDidUpdate(prevProps) {
        const { history, database , branchSupplierProducts , stockOrderId , stockOrderProducts } = this.props;

        const totalAmount = (stockOrderProducts).reduce((a, b) => parseFloat(a) + parseFloat(b.quantity * b.costPrice || 0), 0).toFixed(2);
        const totalQuantity = (stockOrderProducts).reduce((a, b) => parseFloat(a) + parseFloat(b.quantity || 0), 0);

        if(prevProps.branchSupplierProducts.length !== branchSupplierProducts.length || prevProps.stockOrderId !== stockOrderId || prevProps.stockOrderProducts.length !== stockOrderProducts.length){
            this.setState({
                branchSupplierProducts: branchSupplierProducts,
                stockOrderId: stockOrderId,
                stockOrderProducts: stockOrderProducts,
                stockTotalAmount: totalAmount,
                stockTotalQuantity: totalQuantity,
            });
        }
    }

    deleteProduct = async (pId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await new ModelAction('BranchProductStock').destroy(pId);
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

    async changeProductQuantityHandler(stockEntry , event){
        try {
            let status = await new BranchStockService().updateStockEntryDetails(stockEntry , event.target.value);

            if(status){
                return true;
            }
            alert('Invalid quantity');
            return false;
        }catch (e) {
            return false;
        }
    }

    //Steps to select category
    getSteps = () => {
        return ['All Suppliers View' , 'Single Supplier View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <SupplierStockView productsAdded={(this.state.stockOrderProducts).length} stockOrderId={this.state.stockOrderId} searchProduct={this.searchProductHandler.bind(this)} addProductStockView={this.showProductStockView.bind(this)} branchSupplierProducts={this.state.branchSupplierProducts} setView={this.setStepContentView.bind(this)} />;
            case 1:
                return <AddSupplierOrderItem productsAdded={(this.state.stockOrderProducts).length} stockOrderId={this.state.stockOrderId} product={this.state.currentProduct} updateProduct={this.updateNewProduct.bind(this)} setView={this.setStepContentView.bind(this)} />;
            case 2:
                return <AddedStockOrderView productsAdded={this.state.stockOrderProducts} deleteProduct={this.deleteProduct.bind(this)} stockTotalAmount={this.state.stockTotalAmount} stockTotalQuantity={this.state.stockTotalQuantity} changeQuantity={this.changeProductQuantityHandler.bind(this)} entries={this.state.stockOrderProducts} setView={this.setStepContentView.bind(this)} />;
            case 3:
                return <PaySupplierOrder makePayment={this.makePayment.bind(this)} productsAdded={this.state.stockOrderProducts} stockTotalAmount={this.state.stockTotalAmount} stockTotalQuantity={this.state.stockTotalQuantity} setView={this.setStepContentView.bind(this)} />;
            default:
                return 'Complete';
        }
    };

    async makePayment(formFields){

    }

    async searchProductHandler(searchValue){
        try{
            const products = await new SupplierService().searchBranchSupplierProduct(searchValue);

            this.setState({
                branchSupplierProducts: products,
            });
        }catch (e) {
            return false;
        }
    }

    /*
    * @todo change color of active tab
    * */
    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    async updateNewProduct(formFields){
        console.log(formFields)
        try {
            const status = await new BranchStockService().addSupplierStock(formFields);
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

    /*
    * View a products stock
    * */
    showProductStockView = (productId) => {
        const old_list = this.state.branchSupplierProducts;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.id === productId));

        this.setState({
            currentProduct: itemIndex,
            activeStep: 1
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

const EnhancedSupplierOrderStock = withDatabase(
    withObservables(['branchSuppliers' , 'branchSupplierProducts' , 'stockOrderId' , 'stockOrderProducts' , 'totalAmount' , 'totalQuantity'], ({ branchSuppliers , branchSupplierProducts, stockOrderId, stockOrderProducts, totalAmount , totalQuantity , database }) => ({
        branchSuppliers: SupplierService.getBranchSuppliers(),
        branchSupplierProducts: new SupplierService().getBranchSupplierProducts(),
        stockOrderId: SupplierService.stockOrderId(),
        stockOrderProducts: database.collections.get(BranchProductStock.table).query(Q.where('branchSupplierOrderId' , localStorage.getItem("stockOrderId"))).observe(),
    }))(withRouter(SupplierOrderStock))
);

export default EnhancedSupplierOrderStock;
