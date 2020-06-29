import React, {Component} from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {withRouter} from "react-router";
import './sections/ChangePrice.scss';
import MainView from "./sections/MainView";
import AddProductView from "./sections/AddProductView";
import AddedProductView from "./sections/AddedProductView";
import {confirmAlert} from "react-confirm-alert";
import EditProductView from "./sections/EditProductView";
import CompleteView from "./sections/CompleteView";
import './GenerateBarcode.scss';

class GenerateBarcode extends Component{
    state = {
        isDrawerShow: false,
        value: 0,
        storeProducts: 1,
        activeStep: 0,
        currentProduct: 0,
        productList: [
            {
                "pro_id": "1126",
                "pro_name": "Sangria Don Simon Red Wine 1L Tetrapak",
                "image": " Sangria Don Simon Red Wine 1L Tetrapak.jpg",
                "p_cat_id": "1",
                "cat_name": "Alcoholic Wine",
                "Cost_Price": "12",
                "Selling_Price": "13",
                "status": true,
            },
        ],
        addedProducts: [
            {
                "store_id": "1",
                "store_name": "kwesi store",
                "pro_id": "199",
                "pro_name": " CB Guvee Red Wine 750ml",
                "Weight_Type": "Litre",
                "product_weight": "750000000",
                "Bar_Code": "8851028002277",
                "p_cat_id": "1",
                "p_store_id": null,
                "p_manufact_id": "140",
                "image": "no_image.png",
                "Cost_Price": "12",
                "Selling_Price": "13",
                "pro_quantity": "427",
                "pro_detail_id": "106721",
                "store_owner": "Kwasi Danso",
                "Address_of_Store": "Oyibi, Near Bush Canteen",
                "Physical_location": "Dzorwulu",
                "Community_Area": "Oyibi",
                "store_image": null,
                "Phone_number": "0259657885",
                "whatsapp": "0259657885"
            },
        ]
    };

    //Steps to select category
    getSteps = () => {
        return ['Main View' , 'Product Details View'];
    };

    getStepContent = step => {
        const shop_products = (this.state.productList).filter((item) => item['status'] === true);

        switch (step) {
            case 0:
                return <MainView setView={this.setStepContentView.bind(this)} viewAddedProducts={this.viewAddedProducts(this)} products={this.state.productList} productAdd={this.showAddView.bind(this)} removeProduct={this.removeProduct.bind(this)} spCount={shop_products.length} />;
            case 1:
                return <AddProductView addNewProduct={this.addNewProduct.bind(this)} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct}/>;
            case 2:
                return <AddedProductView deleteProduct={this.deleteProduct.bind(this)} products={this.state.addedProducts} setView={this.setStepContentView.bind(this)} pro_quantity={this.state.storeProducts} productEdit={this.showEditView.bind(this)}/>;
            case 3:
                return <EditProductView products={this.state.addedProducts} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} />;
            case 4:
                return <CompleteView/>;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    viewAddedProducts = () => {
        return 0;
    };

    removeProduct = (proId) => {
        confirmAlert({
            title: 'Confirm to remove',
            message: 'Are you sure you want to remove this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let old_list = this.state.productList;

                        const productIndex = old_list.findIndex((item => item.pro_id === proId));
                        const item = {...old_list[productIndex]};

                        item.status = false;

                        old_list[productIndex] = item;

                        this.setState({
                            productList: [...old_list],
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


    showAddView = (proId , step) => {
        console.log(`${proId} from addProduct`);
        const old_list = this.state.productList;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.pro_id === proId));
        //Assign current object to new variable

        this.setState({
            currentProduct: itemIndex,
            activeStep: step
        });
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

    addNewProduct = async(formFields) => {
        console.log(formFields)
        let old_list = this.state.productList;

        const productIndex = old_list.findIndex((item => item.pro_id === (formFields.pro_id)));
        const item = {...old_list[productIndex]};

        item.status = true;

        old_list[productIndex] = item;

        this.setState({
            productList: [...old_list],
        });
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
                <SectionNavbars title="Change prices" >
                    <MenuIcon
                        onClick={() => this.setState({isDrawerShow: true})}
                        style={{fontSize: '2.5rem'}}
                    />
                </SectionNavbars>

                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

export default withRouter(GenerateBarcode);