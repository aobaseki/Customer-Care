import React , {useState} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import ProductHistory from "./history/ProductHistory";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalculator} from "@fortawesome/free-solid-svg-icons";
import CostCalculator from "../../../../components/Calculator/CostCalculator";
import ProductServiceHandler from '../../../../services/ProductServiceHandler';
import LocalInfo from "../../../../services/LocalInfo";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CostInput from "../../../../components/Input/CostInput";
import PriceInput from "../../../../components/Input/PriceInput";
import QuantityInput from "../../../../components/Input/QuantityInput";
import Grid from "@material-ui/core/Grid/Grid";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddProductView = props => {
    const [loading , setLoading] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [calculatorDialog, setCalculatorDialog] = useState(false);
    const product = props.product[0];

    const [formFields , setFormFields] = useState({
        quantity: 0,
        sellingPrice: product.owned ? parseFloat(product.sellingPrice).toFixed(2) : '',
        costPrice: product.owned ? parseFloat(product.stock[product.stock.length - 1].costPrice).toFixed(2) : '',
        productId: props.product[0].id,
        branchId: LocalInfo.branchId,
    });

    /*
    * Get product details from handler
    * */
    const productDetails = new ProductServiceHandler(product);

    const saveStock = (event) => {
        console.log(formFields)
        setLoading(true);
        if((formFields.costPrice !== "" || parseFloat(formFields.costPrice !== 0)) && (formFields.sellingPrice !== "" || parseFloat(formFields.sellingPrice !== 0))){
            if(parseFloat(formFields.costPrice) >= parseFloat(formFields.sellingPrice)){
                setErrorDialog(true);
                setLoading(false);
                setTimeout(function(){
                    setErrorDialog(false);
                }, 3000);

                return false;
            }
        }

        props.addNewProduct(formFields);

        setSuccessDialog(true);

        setTimeout(function(){
            setSuccessDialog(false);
            setLoading(false);
            props.setView(0, event)
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
                        props.searchHandler('');
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

        if(name === 'costPrice'){
            console.log('This came in')
        }
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

    const openCalculator = (event) => {
        setCalculatorDialog(true);
    };

    const getCalculatorModalState = (value) => {
        setCalculatorDialog(value);
    };

    /*const undoProductAdd = () => {
        props.undoAddProduct(product.id);
    };*/

    const productHistory = productDetails.getProductHistory();

    return(
        <div style={{paddingTop: '60px'}}>
            <SectionNavbars title="Stock"
                leftIcon= {
                    <ArrowBackIcon
                        onClick={backHandler.bind(this)}
                        style={{fontSize: '2.5rem'}}
                    />
                }
            />
                {/*<MenuIcon
                    onClick={() => this.setState({isDrawerShow: true})}
                    style={{fontSize: '2.5rem'}}
                />*/}

            <SimpleSnackbar
                openState={successDialog}
                message={`New product added successfully`}
            >
                {/*<Button color="secondary" size="small"
                    onClick={undoProductAdd}
                >
                    UNDO
                </Button>*/}
            </SimpleSnackbar>

            <div className="row p-0 pt-0 mx-0 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', padding: '16px'}}
                    className={`text-center mx-auto text-dark font-weight-bold`}
                >
                    {product.name}
                </Typography>
            </div>
            <div>
                <img className={`img-fluid imageProduct mx-auto d-block pt-2`} src={productDetails.getProductImage()} alt={productDetails.getProductName()}/>
            </div>

            <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    Cost price can not be more than selling more
                </Alert>
            </Snackbar>

            <CostCalculator product={product} calculatedPrice={getCalculatorValue.bind(this)} closeModal={getCalculatorModalState.bind(this)} calculatorDialog={calculatorDialog}/>

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
                    Total stock : {productDetails.getProductQuantity()}
                </Typography>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <QuantityInput startValue={0} label={`Quantity counted`} inputName="quantity" getValue={setInputValue.bind(this)}/>

                    <CostInput label={`Cost price`} inputName="costPrice" initialValue={formFields.costPrice} getValue={setInputValue.bind(this)} >
                        <FontAwesomeIcon onClick={openCalculator.bind(this)} icon={faCalculator} fixedWidth />
                    </CostInput>

                    <PriceInput label={`Selling price`} inputName="sellingPrice" initialValue={formFields.sellingPrice} getValue={setInputValue.bind(this)}/>
                </div>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <Typography
                        component="h5"
                        variant="h5"
                        style={{fontWeight: '500', fontSize: '18px' , margin: '0px 0px', padding: '0px 14px'}}
                        className={`text-center mx-auto text-dark`}
                    >
                        History
                    </Typography>

                    <div id="historyRow" className="w-100 mx-auto text-center">

                        {(productHistory.length !== 0 ? (
                            <div>
                                {(productHistory).map((item) =>
                                    <ProductHistory deleteHistory={props.deleteHistory} key={item.id} item={item}/>
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

export default AddProductView;
