import React, {useEffect, useState} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box/Box";
import QuantityInput from "../../../Components/Input/QuantityInput";
import PrimarySelect from "../../../../components/Select/PrimarySelect";
import ProductServiceHandler from "../../../../services/ProductServiceHandler";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import Grid from "@material-ui/core/Grid/Grid";
import BranchStockService from "../../../../services/BranchStockService";
import {confirmAlert} from "react-confirm-alert";
import LocalInfo from "../../../../services/LocalInfo";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import BranchProductService from "../../../../services/BranchProductService";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MoveStock = props => {
    const branchProduct = props.product[0];
    const [product , setProduct] = useState('');
    const [lastHistory , setLastHistory] = useState('');
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [productQuantity , setProductQuantity] = useState(0);
    const [companyStocks , setCompanyStocks] = useState([]);
    const [branches , setBranches] = useState([]);
    const [activeBranch , setActiveBranch] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const [moveTo, setMoveTo] = useState('');
    const [moveFrom, setMoveFrom] = useState('');

    const [formFields , setFormFields] = useState({
        quantity: 1,
        sellingPrice: branchProduct.sellingPrice,
        costPrice: "",
        paymentSource: 'stock',
        productId: branchProduct.productId,
        branchProductId: null,
        rememberChoice: false,
        branchId: null,
        moveFrom: null,
        moveTo: null,
    });


    useEffect(() => {
        if (!product || branches.length === 0) {
            getProduct();
        }
    }, []);

    const getProduct = async () => {
        const newProduct = await branchProduct.product.fetch();
        const fetchLastHistory = await new BranchStockService().getLastProductStock(branchProduct.productId);
        setProduct(newProduct);
        setLastHistory(fetchLastHistory);
        setName(newProduct.name);
        setImage(new ProductServiceHandler(product).getProductImage());
        setProductQuantity(await new BranchStockService().getProductStockQuantity(branchProduct.productId));
        let newBranches = await new BranchStockService().getBranchStockQuantities(branchProduct.productId);
        newBranches = newBranches.map(m1 => {
            return {
                value: m1.id,
                name: m1.name,
            }
        });
        const nr = newBranches.filter(item => item.id === LocalInfo.branchId);
        const pr = nr.map(m1 => {
            return {
                value: m1.id,
                name: m1.name,
            }
        });
        setActiveBranch(pr[0]);

        setInputValue('costPrice' , await new BranchProductService(branchProduct).getCostPrice());
        setBranches(newBranches);

        setCompanyStocks(await new BranchStockService().getBranchStockQuantities(branchProduct.productId));
    };

    const [loading , setLoading] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);

    const setInputValue = (name , value) => {
        const {...oldFormFields} = formFields;
        console.log(name , value)
        if(name === 'moveTo'){
            const nr = companyStocks.filter(item => (item.id === value && item.productId === product.id));
            setMoveTo(nr[0]);
            console.log(nr[0])
            oldFormFields['branchId'] = value;
            oldFormFields['branchProductId'] = nr[0].branchProductId;
        }else if(name === 'moveFrom'){
            const nr = companyStocks.filter(item => item.id === value);
            setMoveFrom(nr[0]);
        }
        oldFormFields[name] = value;

        setFormFields(oldFormFields);
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

    const moveStock = () => {
        console.log(formFields)
        setLoading(true);
        if((formFields.quantity === "" || formFields.quantity === null || parseFloat(formFields.quantity === 0)) || (formFields.moveFrom === "" || formFields.moveFrom === null) || (formFields.moveTo === "" || (formFields.moveTo === null))) {
            setErrorDialog(true);
            setErrorMsg('Please fill all stock details');
            setLoading(false);
            setTimeout(function(){
                setErrorDialog(false);
            }, 3000);

            return false;
        }

        if((formFields.moveTo === formFields.moveFrom)){
            setErrorDialog(true);
            setErrorMsg('You can not move products to the same branch');
            setLoading(false);
            setTimeout(function(){
                setErrorDialog(false);
            }, 3000);

            return false;
        }

        const moveFromQuantity = companyStocks.filter(item => item.id === formFields.moveFrom);
        if(moveFromQuantity[0].quantity <= formFields.quantity){
            setErrorDialog(true);
            setErrorMsg('Branch quantity must be greater than your quantity');
            setLoading(false);
            setTimeout(function(){
                setErrorDialog(false);
            }, 3000);

            return false;
        }

        console.log(formFields)

        if(props.moveStock(formFields)){
            setSuccessDialog(true);

            setTimeout(function(){
                setSuccessDialog(false);
                setLoading(false);
                props.setView(0)
            }, 2000);
        }else{
            setErrorDialog(true);
            setErrorMsg('OOPS Something went wrong');
            setLoading(false);
            setTimeout(function(){
                setErrorDialog(false);
            }, 2000);

            return false;
        }
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
    };

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

            <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>

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
                <img className={`img-fluid imageProduct mx-auto d-block pt-2`} src={image} alt={name}/>
            </div>

            <div
                className={`row shadow1 pb-3`}
                style={{'borderTopLeftRadius': '15px', 'borderTopRightRadius': '15px', marginBottom: '60px'}}
            >
                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '500', fontSize: '16px' , margin: '0px 0px', padding: '14px'}}
                    className={`text-center mx-auto text-dark`}
                >
                    {moveTo ? `${moveTo.name} : ${moveTo.quantity}` : 'No branch set'} | {moveFrom ? `${moveFrom.name} : ${moveFrom.quantity}` : 'No branch set'}
                </Typography>

                <div className={`rounded bordered mb-3 mx-3 px-3 py-3`}>
                    <Grid container spacing={1} className={`my-1`}>
                        <Grid
                            item xs={12}
                        >
                            <QuantityInput style={{width: '100%'}} label={`Quantity to add`} inputName="quantity" getValue={setInputValue.bind(this)}/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={`my-2`}>
                        <Grid
                            item xs={12}
                        >
                            <div className={`my-2 mx-auto`}>
                                {branches.length > 0 ?
                                    <PrimarySelect label="Move from" data={branches} initialValue={branches[1]} getValue={setInputValue.bind(this)} name="moveFrom"/>
                                    :
                                    ''
                                }
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} className={`my-1`}>
                        <Grid
                            item xs={12}
                        >
                            <div className={`my-2 mx-auto`}>
                                {branches.length > 0 ?
                                    <PrimarySelect label="Move to" data={branches} initialValue={activeBranch} getValue={setInputValue.bind(this)} name="moveTo"/>
                                    :
                                    ''
                                }
                            </div>
                        </Grid>
                    </Grid>
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
                            onClick={moveStock.bind(this)}
                            disabled={loading}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
};

export default MoveStock;
