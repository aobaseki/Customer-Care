import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SectionNavbars from "../../../../../components/Sections/SectionNavbars";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Box from "@material-ui/core/Box/Box";
import AddedProductSingle from "./BoxView/BoxView";
import { withRouter } from "react-router-dom";
import paths from "../../../../../utilities/paths";
import CustomersModal from "../../../../../components/Modal/Customer/CustomersModal";
import AddCustomerModal from "../../../../../components/Modal/Customer/AddCustomerModal";
import CustomerService from "../../../../../services/CustomerService";
import CartService from "../../../../../services/CartService";
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: '70px',
    },
    title: {
        fontSize: 11,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',


    },
    button: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '5px 50px',
        marginRight: '10px',
        marginTop: '10px',
        textTransform: 'none',
    }
}));

const AddedStockOrderView = props => {
    const [mainDialog, setMainDialog] = React.useState(false);
    const [addDialog, setAddDialog] = React.useState(false);
    const [checkUser , setCheckUser] = React.useState(false);
    const [user , setUser] = React.useState(false);
    const [customerName, setCustomerName] = React.useState('');
    const [customerId , setCustomerId] = React.useState('');
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const counter = props.productsAdded.length;

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        /*if (customerId !== props.currentCustomer) {
            setCustomerId(props.currentCustomer);
            getCustomerName();
        }*/
    });

    /*const getCustomerName = async () => {
        setCustomerName(await new CartService().getCartCustomer(props.currentCustomer));
    };*/

    const handleChange = event => {
        setUser(event.target.value);
    };

    const classes = useStyles();

    const closeDialogHandler = (event) => {
        setMainDialog(false);
        setAddDialog(false);
    };

    const openDialogHandler = async() => {
        if(props.currentCustomer === 0){
            setMainDialog(true);
        }else{
            const response = await new CartService().suspendCart();

            if (response) {
                setErrorMsg('Cart saved');
                setError(true);
                setTimeout(function(){
                    props.history.push(paths.sell);
                    setError(false);
                }, 2000);
            }else{
                setErrorMsg('Cart was not saved. Please try again');
                setError(true);
                setTimeout(function(){
                    props.setView(0);
                    setError(false);
                }, 3000);
            }
        }
    };

    const getCustomerDialog = async() => {
        setMainDialog(true);
    };

    const openAddDialog = (event) => {
        setAddDialog(true);
    };

    const deleteProductHandler = (event) => {
        props.deleteProduct(event);
    };

    const openCheckoutHandler = (event) => {
        props.setView(3);
    };

    const setCustomerHandler = (customer) => {
        console.log(customer)
        props.setCustomerHandler(customer);
        //console.log(props.currentCustomer)
    };

    const setAddCustomerHandler = async() => {
        const lastCustomer = await new CustomerService().getLastCustomer();
        props.setCustomerHandler(lastCustomer.id);
        setAddDialog(false);
        setMainDialog(false);
    };

    return(
        <div className={classes.root}>
            <SectionNavbars
                title="View stock"

                leftIcon={
                    <div onClick={() => props.setView(0)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            />

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            QUANTITY
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            {`${props.stockTotalQuantity} ${props.stockTotalQuantity > 1 ? 'items' : 'item'}`}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            TOTAL
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            {`GHC ${props.stockTotalAmount}`}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>


            {/*<Button
                variant="outlined"
                style={{fontSize: '16px'}}
                className={classes.button}
                onClick={getCustomerDialog.bind(this)}
            >
                {props.currentCustomer === 0 ? <PersonAddIcon /> : ''}
                {customerName}
            </Button>*/}

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.productsAdded.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
                        <Grid container spacing={1} className={`py-1`}>
                            <Grid
                                item xs={12}
                                className={`text-left pl-2`}
                            >
                                <Typography
                                    component="h6"
                                    variant="h6"
                                    style={{fontSize: '16px'}}
                                    className={`text-center text-dark`}
                                >
                                    No item in cart
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    props.productsAdded.map((item) => <AddedProductSingle changeQuantity={props.changeQuantity} deleteStoreProduct={deleteProductHandler.bind(this)} key={item.id} item={item}/>)
                }
            </Box>

            {/*<CustomersModal
                customers={props.customers}
                openState={mainDialog}
                setCustomer={setCustomerHandler.bind(this)}
                handleClose={() => setMainDialog(false)}
                openAddCustomerModal={openAddDialog.bind(this)}
            />

            <AddCustomerModal
                openCustomerAddState={addDialog}
                setCustomer={setAddCustomerHandler.bind(this)}
                handleClose={() => setAddDialog(false)}
            />*/}

            {/*<Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%", display: 'flex', alignContent: 'center' }}
            >
                <div
                    onClick={() => props.history.push(paths.sell)}
                >
                    <PrimaryButton>
                        Add product
                    </PrimaryButton>
                </div>

                <div
                    onClick={openCheckoutHandler.bind(this)}
                >
                    <SecondaryButton>
                        Checkout
                    </SecondaryButton>
                </div>
            </Box>*/}

            <Box
                className="shadow1"
                bgcolor="background.paper"
                style={{ height: '2.5rem', position: "fixed", bottom:"10px", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={openCheckoutHandler.bind(this)}
                    disabled={!counter}
                >
                    Next
                </Button>
            </Box>

        </div>
    )
}

export default withRouter(AddedStockOrderView);
