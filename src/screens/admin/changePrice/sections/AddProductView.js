import React , {useState, useEffect} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import {makeStyles} from "@material-ui/core";
import { confirmAlert } from 'react-confirm-alert';
import InputBase from "@material-ui/core/InputBase/InputBase";
import Paper from "@material-ui/core/Paper/Paper";
import 'react-confirm-alert/src/react-confirm-alert.css';
import SuccessDialog from "../../../../components/Dialog/SuccessDialog";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import BranchProductService from "../../../../services/BranchProductService";
// import BranchStockService from "../../../../services/BranchStockService";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
import LocalInfo from "../../../../services/LocalInfo";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: 'center',
    },
    iconButton: {
        padding: 10,
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddProductView = props => {
    // const [history , setHistory] = useState([{"st_id":"20766","st_date":"2020-02-18","st_quantity":"3","st_product":"32","st_store_id":"1","timestamps":"2020-02-18 11:27:05"},{"st_id":"17451","st_date":"2020-01-09","st_quantity":"1","st_product":"32","st_store_id":"1","timestamps":"2020-01-09 13:40:05"}]);
    const classes = useStyles();
    const [successDialog, setSuccessDialog] = React.useState(false);
    const branchProduct = props.product[0];
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [product , setProduct] = useState('');
    // const [lastHistory , setLastHistory] = useState('');
    const [costPrice , setCostPrice] = useState(0);
    const [sellingPrice , setSellingPrice] = useState(branchProduct.sellingPrice);
    const [errorDialog, setErrorDialog] = useState(false);
    const [formFields , setFormFields] = useState({
        sellingPrice: branchProduct.sellingPrice,
        costPrice: "",
        productId: branchProduct.productId,
        branchProductId: branchProduct.id,
        branchId: LocalInfo.branchId,
    });

    const [changePriceFields , setChangePriceFields] = useState({
        costPrice: "",
        sellingPrice: "",
    });   

    useEffect(() => {
        if (!product) {
            getProduct();
        }
    });

    const productHandler = new BranchProductService(branchProduct);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        //const fetchLastHistory = await new BranchStockService().getLastProductStock(branchProduct.productId);
        setProduct(newProduct);
        //setLastHistory(fetchLastHistory);
        setName(newProduct.name);
        setImage(new ProductServiceHandler(product).getProductImage());
        setCostPrice(await productHandler.getCostPrice());
        setSellingPrice(await productHandler.getSellingPrice());
    };

    const backHandler = (event) => {
        confirmAlert({
            title: 'Confirm to cancel',
            message: 'You risk losing the details entered for this product.',
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

    const changePriceFieldsHandler = (event) => {
        const {...oldFormFields} = changePriceFields;

        oldFormFields[event.target.name] = event.target.value;

        setChangePriceFields(oldFormFields);
    };

    const saveChangePrice = () => {
        const {...oldFormFields} = formFields;

        oldFormFields['costPrice'] = changePriceFields['costPrice'];
        oldFormFields['sellingPrice'] = changePriceFields['sellingPrice'];

        setFormFields(oldFormFields);

        setChangePriceFields({
            costPrice: "",
            sellingPrice: ""
        });

        if((formFields.costPrice !== "" || parseFloat(formFields.costPrice !== 0)) && (formFields.sellingPrice !== "" || parseFloat(formFields.sellingPrice !== 0))){
            if(parseFloat(formFields.costPrice) >= parseFloat(formFields.sellingPrice)){
                setErrorDialog(true);
                setTimeout(function(){
                    setErrorDialog(false);
                }, 3000);
                return false;
            }

        }

        props.updateProduct(formFields);

        setSuccessDialog(true);

        setTimeout(function(){
            setSuccessDialog(false);
            props.setView(0)
        }, 2000);
    };

    // const setInputValue = (name , value) => {
    //     console.log(name , value)
    //     const {...oldFormFields} = formFields;

    //     oldFormFields[name] = value;
    //     console.log(oldFormFields)

    //     setFormFields(oldFormFields);
    // };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
    };


    return(
        <div style={{paddingTop: '60px'}}>
            <SuccessDialog states={successDialog}/>

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
                <img className={`img-fluid imageProduct mx-auto d-block pt-2`} src={image} alt={name} />
            </div>

            <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    Cost price can not be more than selling more
                </Alert>
            </Snackbar>
            <br />
            <div
                className={`row shadow1 pb-3`}
                style={{'borderTopLeftRadius': '15px', 'borderTopRightRadius': '15px', marginBottom: '60px' , paddingLeft: '50px'}}
            >

                <div className={`rounded mb-3 mx-3 px-3 py-3`}>
                    <Typography
                        component="p"
                        style={{fontSize: '15px' , margin: '0px 0px', paddingBottom: '7px'}}
                        className={`text-left text-dark`}
                    >
                        Current cost price : GHC {costPrice}
                    </Typography>
                    <label className={`text-dark py-2 text-left`} style={{fontSize: '18px'}}> New cost price</label>

                    <Paper className={classes.root} >
                        <InputBase
                            className={`${classes.input} search-box text-center`}
                            type="tel"
                            initialValue=""
                            value={changePriceFields.costPrice}
                            name="costPrice"
                            onChange={(event) => changePriceFieldsHandler(event)}
                        />

                    </Paper>
                    <Typography
                        component="p"
                        style={{fontSize: '15px' , margin: '0px 0px' , paddingBottom: '7px' , paddingTop: '20px'}}
                        className={`text-left text-dark`}
                    >
                        Current selling price : GHC {sellingPrice}
                    </Typography>

                    <label className={`text-dark py-2 text-left`} style={{fontSize: '18px'}}> New selling price</label>

                    <Paper className={classes.root} >
                        <InputBase
                            className={`${classes.input} search-box text-center`}
                            type="tel"
                            initialValue=""
                            value={changePriceFields.sellingPrice}
                            name="sellingPrice"
                            onChange={(event) => changePriceFieldsHandler(event)}
                        />

                    </Paper>              
                </div>


            </div>


            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                    onClick={backHandler.bind(this)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                    onClick={saveChangePrice.bind(this)}
                >
                    Save
                </Button>
            </Box>
        </div>
    )
};

export default AddProductView;