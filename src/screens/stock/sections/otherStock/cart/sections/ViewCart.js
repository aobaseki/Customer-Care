import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import SectionNavbars from "../../../../../../components/Sections/SectionNavbars";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Box from "@material-ui/core/Box/Box";
import AddedProductSingle from "./BoxView/BoxView";
import { withRouter } from "react-router-dom";
import paths from "../../../../../../utilities/paths";
import CartService from "../../../../../../services/CartService";
import SimpleSnackbar from "../../../../../../components/Snackbar/SimpleSnackbar";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../../../services/ModelAction";
import CustomerListDrawer from "../../../../../../components/Drawer/CustomerListDrawer/CustomerListDrawer";
import CustomerService from "../../../../../../services/CustomerService";

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

const CartView = props => {
    const [customerName, setCustomerName] = React.useState('');
    const [customerId , setCustomerId] = React.useState('');
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const counter = props.cartTotalProducts;
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [isShowerCustomerDrawer , setIsShowerCustomerDrawer] = useState(false);
    const [isSaveCart , setIsSaveCart] = useState(false);
    //console.log(props.currentCustomer)
    //console.log(customerName)

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (customerId !== props.currentCustomer) {
            setCustomerId(props.currentCustomer);
            getCustomerName();
        }
    });

    const getCustomerName = async () => {
        setCustomerName(await new CartService().getCartCustomer(props.currentCustomer));
    };

    const classes = useStyles();


    const openDialogHandler = async() => {
        if(props.currentCustomer === (await CustomerService.getCashCustomer())[0].id){
            setIsSaveCart(true);
            setIsShowerCustomerDrawer(true);
        }else{
            const response = await new CartService().suspendCart();

            if (response) {
                setSuccessMsg('Cart saved');
                setSuccess(true);
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
        setIsShowerCustomerDrawer(true);
    };

    const openCheckoutHandler = (event) => {
        props.setView(1);
    };

    const setCustomerHandler = (customer) => {
        props.setCustomerHandler(customer);
        setIsShowerCustomerDrawer(false);
        if(isSaveCart){
            openDialogHandler();
        }
    };

    const deleteProductHandler = (pId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await new ModelAction('CartEntry').destroy(pId);

                            setSuccessMsg('Cart entry deleted successfully');
                            setSuccess(true);
                            setTimeout(function(){
                                setSuccessMsg('');
                                setSuccess(false);
                            }, 2000);

                            return true;
                        } catch (e) {
                            setErrorMsg('OOPS. Something went wrong. Please try again');
                            setError(true);
                            setTimeout(function(){
                                setErrorMsg('');
                                setError(false);
                            }, 2000);
                            return false;
                        }
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

    const setSearchValue = (value) => {
        props.searchCustomerHandler(value);
    };

    return(
        <div className={classes.root}>
            <SectionNavbars
                title="Cart"
                leftIcon={
                    <div onClick={() => props.history.push(paths.other_stock)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <SimpleSnackbar
                type="success"
                openState={success}
                message={successMsg}
            />

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            />

            <CustomerListDrawer
                handleClose={() => setIsShowerCustomerDrawer(false)}
                setCustomer={setCustomerHandler.bind(this)}
                customers={props.customers}
                isShow={isShowerCustomerDrawer}
                searchCustomerHandler={setSearchValue.bind(this)}
            />

            <Grid container spacing={1} className={`px-4 mt-2`}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            QUANTITY
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            {`${props.cartTotalProducts} ${props.cartTotalProducts > 1 ? 'items' : 'item'}`}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            TOTAL
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            {`GHC ${props.cartTotalAmount}`}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>


            <Button
                variant="outlined"
                style={{fontSize: '16px'}}
                className={classes.button}
                onClick={getCustomerDialog.bind(this)}
            >
                {customerName === 'Cash Customer' ? <PersonAddIcon /> : ''}
                {customerName}
            </Button>

            <Box style={{marginTop: '5px' , margin: '2px 5px', paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.length === 0
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
                    props.products.map((item) => <AddedProductSingle changeQuantity={props.changeQuantity} changePrice={props.changePrice} deleteStoreProduct={deleteProductHandler.bind(this)} key={item.id} item={item}/>)
                }
            </Box>


            <Box
                className="shadow1"
                bgcolor="background.paper"
                style={{ height: '2.5rem', position: "fixed", bottom:"10px", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            onClick={() => props.history.push(paths.sell)}
                            style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 30px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                        >
                            Add product
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 55px', textTransform: 'none', fontSize:'17px'}}
                            onClick={openCheckoutHandler.bind(this)}
                            disabled={!counter}
                        >
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
}

export default withRouter(CartView);
