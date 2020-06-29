import React, {useEffect, useState} from 'react';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import Typography from "@material-ui/core/Typography";
import ProductServiceHandler from "../../../services/ProductServiceHandler";
import format from 'date-fns/format'
import LocationProductSingle from "./LocationProductSingle";
import Box from "@material-ui/core/Box/Box";
import BottomMenu from "./BottomMenu";
import Grid from "@material-ui/core/Grid/Grid";
import BranchProductService from "../../../services/BranchProductService";
import BranchStockService from "../../../services/BranchStockService";
import BarcodeImage from "../../../assets/img/barcode.png";
import {Link} from "react-router-dom";
import DeleteProductModal from '../../../components/Modal/option/DeleteProductModal';
import SelectDeleteModal from '../../../components/Modal/option/SelectDeleteModal';
import { withRouter } from "react-router-dom";


const StockProductSingle = props => {
    let branchProduct = props.product[0];
    const [product , setProduct] = useState('');
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [selectBranch, setSelectBranch] = React.useState(false);
    const [lastHistory , setLastHistory] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [productQuantity , setProductQuantity] = useState(0);
    const [companyStocks , setCompanyStocks] = useState([]);
    const [costPrice , setCostPrice] = useState(0);
    const [sellingPrice , setSellingPrice] = useState(branchProduct.sellingPrice);

    const openDeleteDialog = (event) => {
        setDeleteDialog(true);
    };

    const openSelectBranch = (event) => {
        setSelectBranch(true);
    };

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    });

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        const fetchLastHistory = await new BranchStockService().getLastProductStock(branchProduct.productId);
        setProduct(newProduct);
        setLastHistory(fetchLastHistory);
        setName(newProduct.name);
        setImage(new ProductServiceHandler(product).getProductImage());
        setProductQuantity(await productHandler.getProductQuantity());
        setCompanyStocks(await new BranchStockService().getBranchStockQuantities(branchProduct.productId));
        setCostPrice(await productHandler.getCostPrice());
    };

    /*let lastStock = productHandler.getProductHistory();
    lastStock = lastStock[(lastStock.length - 1)];*/

    const [successDialog, setSuccessDialog] = useState(false);

    const backHandler = () => {
        props.setView(0);
    };

    const barcodeHandler = () => {
        props.setView(7);
    }

    const setSP = (sp) => {
        setSellingPrice(parseFloat(sp));
    }

    return (
        <div className={`mt-6`}>
            <SectionNavbars title="Stock"
                leftIcon= {
                    <ArrowBackIcon
                        onClick={backHandler.bind(this)}
                        style={{fontSize: '2.5rem'}}
                    />
                }
            />

            <SimpleSnackbar
                openState={successDialog}
                message={`New product added successfully`}
            >
                {/*<Button color="secondary" size="small"
                        onClick={props.undoAddProduct}
                >
                    UNDO
                </Button>*/}
            </SimpleSnackbar>

            <div className="row p-0 pt-0 mx-0 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '8px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    {name}
                </Typography>
            </div>
            <div>
                <Grid container spacing={1} >
                    <Grid item xs={8}></Grid>
                    <Grid item xs={4}>
                        <img onClick={barcodeHandler.bind(this)} style={{textAlign: 'right', marginRight: '5px', marginTop: '10px', position: 'absolute'}} src={BarcodeImage} alt={'assign barcode'}/>
                    </Grid>
                    <Grid item xs={12}>
                        <img className={`img-fluid imageProduct mx-auto d-block pt-2`} src={image} alt={name}/>
                    </Grid>
                    
                    
                </Grid>
            </div>

            <div
                className={`row shadow1 pb-3 pt-1`}
                style={{'borderTopLeftRadius': '15px', paddingTop: '5px', 'borderTopRightRadius': '15px', marginBottom: '4rem', bottom: 0, right: 0, left: 0, minHeight: '200px'}}
            >
                {props.companyBranches > 1 ?
                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '300', fontSize: '14px', margin: '0px 0px', padding: '14px'}}
                        className={`text-center mx-auto text-dark italize`}
                    >
                        {lastHistory ? `Last stock added: ${lastHistory.quantity} added on ${format(new Date(lastHistory.createdAt), "dd MMM, yyyy")}` : `No stock added for this product`}
                    </Typography>
                    :''
                }

                {props.companyBranches > 1 ?
                    <div className={`rounded bordered mb-3 mx-3 px-3 py-3`} style={{display: 'flex'}}>
                        <div className={`stockQuantityCount w-50 p-1`}>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '14px', lineHeight: '1.5'}}
                                className={`mx-2`}
                            >
                                Total Quantity
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '16px', lineHeight: '1.5'}}
                            >
                                {productQuantity}
                            </Typography>
                        </div>

                        <div className={`w-50 p-1`}>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '14px', lineHeight: '1.5'}}
                                className={`mx-2`}
                            >
                                Sales value
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '16px', lineHeight: '1.5'}}
                            >
                                GHC {parseFloat(productQuantity * sellingPrice).toFixed(2)}
                            </Typography>
                        </div>
                    </div>
                    :
                    <div className={`rounded bordered mb-3 mx-3 px-3 py-3`} style={{display: 'flex', marginTop: '20px'}}>
                        <div className={`w-50 p-1`}>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '16px', lineHeight: '1.5'}}
                                className={`mx-2`}
                            >
                                Unit selling price
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '18px', lineHeight: '1.5'}}
                            >
                                GHC {(sellingPrice).toFixed(2)}
                            </Typography>

                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '16px', lineHeight: '1.5'}}
                                className={`mx-2 mt-3`}
                            >
                                Total Quantity
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '18px', lineHeight: '1.5'}}
                            >
                                {productQuantity}
                            </Typography>
                        </div>

                        <div className={`w-50 p-1`}>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '16px', lineHeight: '1.5'}}
                                className={`mx-2`}
                            >
                                Unit cost price
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '18px', lineHeight: '1.5'}}
                            >
                                GHC {parseFloat(costPrice).toFixed(2)}
                            </Typography>
                            <Typography
                                component="h6"
                                variant="h6"
                                style={{fontWeight: '300', fontSize: '16px', lineHeight: '1.5'}}
                                className={`mx-2 mt-3`}
                            >
                                Sales value
                            </Typography>
                            <Typography
                                component="h5"
                                variant="h5"
                                style={{fontWeight: '700', fontSize: '18px', lineHeight: '1.5'}}
                            >
                                GHC {parseFloat(productQuantity * branchProduct.sellingPrice).toFixed(2)}
                            </Typography>
                        </div>
                    </div>
                    }

                {props.companyBranches.length > 1 ?
                    <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{fontWeight: '600', fontSize: '15px' , margin: '0px 0px', padding: '3px'}}
                            className={`text-center mx-auto text-dark w-100`}
                        >
                            Quantities Per Location(s)
                        </Typography>

                        {companyStocks.map((location) =>
                            <LocationProductSingle key={location.id} location={location}/>
                        )}
                    </div>
                : ''
                }


                <Link onClick={openDeleteDialog.bind(this)}  style={{textAlign: 'center', color: '#DAAB59'}} >
                    Remove product from store
                </Link>

                <DeleteProductModal
                    openState={deleteDialog}
                    handleClose={() => setDeleteDialog(false)}
                    onClick= {openSelectBranch.bind(this)}
                />

                <SelectDeleteModal
                    openState={selectBranch}
                    handleClose={() => setSelectBranch(false)}
                />
            </div>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={12} >
                        <BottomMenu setSP={setSP.bind(this)} costPrice={costPrice} branchProduct={branchProduct} setView={props.setView}/>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
};

export default StockProductSingle;
