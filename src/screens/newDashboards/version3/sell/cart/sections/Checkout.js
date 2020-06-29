import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbars from "../../../../../../components/Sections/SectionNavbars";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TabPanel from "../../../../../../components/Tabs/TabPanel";
import AppBar from '@material-ui/core/AppBar';
import Box from "@material-ui/core/Box/Box";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from "react-router-dom";

import ViewCash from './ViewCash';
import ViewMobileMoney  from './ViewMobileMoney';
import CartService from "../../../../../../services/CartService";
import SimpleSnackbar from "../../../../../../components/Snackbar/SimpleSnackbar";
import CustomerListDrawer from "../../../../../../components/Drawer/CustomerListDrawer/CustomerListDrawer";
import SaleService from "../../../../../../services/SaleService";

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
    tabs: {
        textTransform: 'none',
        fontWeight: 'bold',
        color: '#333333',
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

const CheckoutView = props => {
    const [cartData , setCartData] = React.useState(
        {
            amountPaid: '',
            changeDue: '',
            customer: props.currentCustomer,
            type: 0
        }
    );
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [btnValue , setBtnValue] = React.useState(false);
    const [customerName, setCustomerName] = React.useState('');
    const [customerId , setCustomerId] = React.useState('');
    const [isShowerCustomerDrawer , setIsShowerCustomerDrawer] = useState(false);

    const [formData , setFormData] = React.useState(
        {
            amountPaid: '',
            changeDue: '',
            customer: props.currentCustomer,
            type: 0
        }
    );
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

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const getCustomerDialog = async() => {
        setIsShowerCustomerDrawer(true);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);

        if(newValue === 1){
            const {...oldFormFields} = cartData;
            oldFormFields['type'] = 2;
            oldFormFields['customer'] = props.currentCustomer;
            setCartData(oldFormFields);
            setFormData(oldFormFields);

            otherPaymentFormFields(oldFormFields);
        }else {
            const {...oldFormFields} = cartData;
            oldFormFields['type'] = 0;
            oldFormFields['customer'] = props.currentCustomer;
            setCartData(oldFormFields);
            setFormData(oldFormFields);

            paymentDetails(cartData)
        }
    };

    const handleChangeIndex = index => {
        setValue(index);

        if(index === 1){
            const {...oldFormFields} = cartData;
            oldFormFields['type'] = 2;
            oldFormFields['customer'] = props.currentCustomer;
            setCartData(oldFormFields);
            setFormData(oldFormFields);

            otherPaymentFormFields(oldFormFields);
        }else {
            const {...oldFormFields} = cartData;
            oldFormFields['type'] = 0;
            oldFormFields['customer'] = props.currentCustomer;
            setCartData(oldFormFields);
            setFormData(oldFormFields);

            paymentDetails(cartData)
        }
    };

    const backHandler = (event) => {
        props.setView(0);
    };

    /*const openSuccessHandler = () => {
        props.setView(2);
    };*/

    const setCustomerHandler = (customer) => {
        props.setCustomerHandler(customer);
        setIsShowerCustomerDrawer(false);
        const {...oldFormFields} = cartData;
        oldFormFields['customer'] = customer;
        setCartData(oldFormFields);
        setFormData(oldFormFields);

        if(parseFloat(value) === 1){
            setCustomerId(customer);
            otherPaymentFormFields(oldFormFields);
        }
    };

    const paymentDetails = (formFields) => {
        if(value === 0 && parseFloat(formFields.amountPaid) >= parseFloat(props.cartTotalAmount)){
            setBtnValue(true);
        }else{
            setErrorMsg(`Amount paid must be greater than ${props.cartTotalAmount}`);
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 1000);
            setBtnValue(false);
        }

        const {...oldFormFields} = formFields;
        oldFormFields['customer'] = customerId;
        setCartData(formFields);
        setFormData(formFields);
    };

    const otherPaymentFormFields = (formFields) => {
        if(parseFloat(formFields.type) === 2 && (formFields.customer === 0)){
            setBtnValue(false);
            alert(`Please set a customer for credit sales`)
        }else if(parseFloat(formFields.type) !== 2 && (formFields.amountPaid === "" || parseFloat(formFields.amountPaid) < parseFloat(props.cartTotalAmount))){
            setErrorMsg(`Amount paid must be greater than ${props.cartTotalAmount}`);
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);

            //alert(`Amount paid must be greater than ${props.cartTotalAmount}`)

            setBtnValue(false);
        }else {
            setBtnValue(true);
        }

        const {...oldFormFields} = formFields;
        oldFormFields['customer'] = customerId;

        setCartData(formFields);
        setFormData(formFields);
    };

    const completeSellHandler = async() => {
        const {...oldFormFields} = cartData;
        oldFormFields['customer'] = props.currentCustomer;
        if(oldFormFields['amountPaid'] === ''){
            oldFormFields['amountPaid'] = 0;
        }
        try {
            console.log(cartData)
            await new SaleService().makeSell(cartData , cartData.type);
            props.setView(2);
        }catch (e) {

        }
    };

    const setSearchValue = (value) => {
        props.searchCustomerHandler(value);
    };

    return(
        <div className={classes.root}>
            <SectionNavbars
                title="Payment"
                leftIcon={
                    <div onClick={backHandler.bind(this)}>
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
            >
            </SimpleSnackbar>

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} >
                <Grid container spacing={1} className={`shadow1 mb-1 borderRadius10`} style={{display: 'table', height: '90px', margin: '0px 0px 8px 5px', width: '98%'}} >
                    <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '18px' }} >
                            Amount due
                        </Typography>
                            <Typography className='text-dark font-weight-bold' style={{ fontSize: '25px' }} >
                                {`GHC ${props.cartTotalAmount}`}
                        </Typography>
                </Grid>
            </Box>

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange.bind(this)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab className={classes.tabs} label="Cash" icon={<LocalAtmIcon style={{color: '#DAAB59'}} />} {...a11yProps(0)} />
                    <Tab className={classes.tabs} label="Other payment" icon={<PhoneAndroidIcon style={{color: '#DAAB59'}} />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex.bind(this)}
                style={{ marginBottom: '60px'}}
            >
                <TabPanel value={value} index={0} >
                    <ViewCash
                        currentCustomer={customerName}
                        openAddCustomerModal={getCustomerDialog.bind(this)}
                        cartAmount={props.cartTotalAmount}
                        customerId={props.currentCustomer}
                        getFormFields={paymentDetails.bind(this)}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}  >
                    <ViewMobileMoney
                        currentCustomer={customerName}
                        initialValue={parseFloat(formData.type) ? parseFloat(formData.type) : 2}
                        openAddCustomerModal={getCustomerDialog.bind(this)}
                        cartAmount={props.cartTotalAmount}
                        customerId={props.currentCustomer}
                        getFormFields={otherPaymentFormFields.bind(this)}
                    />
                </TabPanel>
            </SwipeableViews>

            <CustomerListDrawer
                handleClose={() => setIsShowerCustomerDrawer(false)}
                setCustomer={setCustomerHandler.bind(this)}
                customers={props.customers}
                isShow={isShowerCustomerDrawer}
                searchCustomerHandler={setSearchValue.bind(this)}
            />

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0px", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    onClick={() => props.setView(0)}
                    style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 40px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={completeSellHandler.bind(this)}
                    disabled={!btnValue}
                >
                    Finish
                </Button>
            </Box>

            {/*<Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    className='text-dark font-weight-bold'
                    style={{
                        backgroundColor: '#DAAB59',
                        color: '#333333',
                        padding: '5px 60px',
                        textTransform: 'none',
                        fontSize: '20px',
                    }}
                    onClick={completeSellHandler.bind(this)}
                >
                    Finish
                </Button>
            </Box>*/}

        </div>
    )
}

export default withRouter(CheckoutView);
