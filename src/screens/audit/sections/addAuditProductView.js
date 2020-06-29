import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import QuantityInput from "../../Components/Input/QuantityInput";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import ProductServiceHandler from '../../../services/ProductServiceHandler';
import BranchProductService from "../../../services/BranchProductService";
import Drawer from "../../../components/Drawer/Drawer";
import AuditService from "../../../services/AuditService";
import Grid from "@material-ui/core/Grid/Grid";
import AddedProductSingle from "./auditHistory/SingleProductView";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddAuditProductView = props => {
    const branchProduct = props.product[0];
    const [isDrawerShow , setIsDrawerShow] = useState(false);

    const [product , setProduct] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [quantityProduct , setQuantityProduct] = useState(0);
    const [sellingPrice , setSellingPrice] = useState(branchProduct.sellingPrice);
    const [costPrice , setCostPrice] = useState(0);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(false);
    const [productAuditDetials , setProductAuditDetials] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [productHistory , setProductHistory] = useState([]);
    const [formFields , setFormFields] = useState({
        quantity: 1,
        sellingPrice: branchProduct.sellingPrice,
        costPrice: 0,
        productId: branchProduct.productId,
        branchProductId: branchProduct.id,
        storeQuantity: 0,
        quantityCounted: 0,
    });


    useEffect(() => {
        if (!product) {
            getProduct();
        }
    }, []);

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        setProduct(newProduct);
        setQuantityProduct(await productHandler.getProductQuantity());
        setImage(new ProductServiceHandler(product).getProductImage());
        setName(newProduct.name);
        setSellingPrice(await productHandler.getSellingPrice());
        setCostPrice(await productHandler.getCostPrice());
        setProductHistory(await AuditService.getProductAuditHistory(branchProduct.id));
        setProductAuditDetials(await new AuditService().getAuditProductDetails(newProduct.id));
        setInputValue('costPrice' , await productHandler.getCostPrice());
        setInputValue('storeQuantity' , await productHandler.getProductQuantity());
    };

    const saveStock = async (event) => {
        setLoading(true);
        if((formFields.quantityCounted === "" || parseFloat(formFields.quantityCounted === 0))){
            setErrorMsg('Selling price can not be less than cost price');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);

            return false;
        }

        const {...newFormField} = formFields;
        newFormField['costPrice'] = parseFloat(costPrice);
        newFormField['sellingPrice'] = parseFloat(sellingPrice);

        props.addToAudit(newFormField);

        setSuccessDialog(true);

        setTimeout(function(){
            setSuccessDialog(false);
            setLoading(false);
            props.setView(0)
        }, 2000);
    };

    const backHandler = (event) => {
        confirmAlert({
            title: 'Confirm to cancel',
            message: 'You risk losing the details added for this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.setView(0);
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

    const setInputValue = (name , value) => {
        const {...oldFormFields} = formFields;

        oldFormFields[name] = value;

        setFormFields(oldFormFields);
    };

    const getCalculatorValue = (value) => {
        const {...oldFormFields} = formFields;

        oldFormFields['costPrice'] = parseFloat(value);

        setFormFields(oldFormFields);
        console.log(oldFormFields);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
    };

    /*const undoProduct = () => {
        props.undoAddProduct;
    };*/

    //const productHistory = productDetails.getProductHistory();

    return(
        <div style={{paddingTop: '60px'}}>
            <SectionNavbars
                title={`Audit`}
                leftIcon={
                    <div onClick={() => props.setView(0)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

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

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            >
            </SimpleSnackbar>

            <div className="row p-0 pt-0 mx-0 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '16px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    {name}
                </Typography>
            </div>
            <div>
                <img className={`img-fluid imageProduct mx-auto d-block pt-2`} src={image} alt={name}/>
            </div>

            <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    Cost price can not be more than selling more
                </Alert>
            </Snackbar>

            <div
                className={`row shadow1 pb-3`}
                style={{'borderTopLeftRadius': '15px', 'borderTopRightRadius': '15px', marginBottom: '60px'}}
            >
                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '500', fontSize: '20px' , margin: '0px 0px', padding: '14px'}}
                    className={`text-center mx-auto text-dark`}
                >
                    Total counted : {productAuditDetials ? productAuditDetials.quantityCounted : 0}
                </Typography>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '300', fontSize: '20px' , margin: '0px 0px', padding: '14px'}}
                        className={`text-center mx-auto text-dark italize`}
                    >
                        Quantity on app : {quantityProduct}
                    </Typography>

                    <QuantityInput startValue={productAuditDetials ? productAuditDetials.quantityCounted : 1} label={`Quantity counted`} inputName="quantityCounted" getValue={setInputValue.bind(this)}/>

                </div>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '500', fontSize: '18px' , margin: '0px 0px', padding: '0px 14px'}}
                        className={`text-center mx-auto text-dark mb-2`}
                    >
                        History
                    </Typography>

                    <div id="historyRow" className="w-100 mx-auto text-center">

                        {(productHistory.length !== 0 ? (
                            <div>
                                {(productHistory).map((item) =>
                                    <AddedProductSingle product={item.product.fetch()} actions={false} key={item.id} item={item}/>
                                )}
                            </div>
                        ):(
                            <div>
                                <span className="text-dark font-weight-bold font-italic text-center mx-auto">No previous history</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>


            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                            onClick={backHandler.bind(this)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                            onClick={saveStock.bind(this)}
                            disabled={loading}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
};

export default AddAuditProductView;
