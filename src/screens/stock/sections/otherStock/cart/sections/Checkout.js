import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbars from "../../../../../../components/Sections/SectionNavbars";
import Box from "@material-ui/core/Box/Box";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import paths from "../../../../../../utilities/paths";

import CartService from "../../../../../../services/CartService";
import SimpleSnackbar from "../../../../../../components/Snackbar/SimpleSnackbar";
import CustomerListDrawer from "../../../../../../components/Drawer/CustomerListDrawer/CustomerListDrawer";
import SaleService from "../../../../../../services/SaleService";
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
    },
    radioRoot: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        }
    },
    checkedIcon: {
        backgroundColor: green[400],
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: green[400],
        },
    },
}));

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.radioRoot}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const CheckoutView = props => {
    const { history } = props;
    const [value, setValue] = React.useState('gift');
    const [paymentValue, setPaymentValue] = React.useState(6);
    const [cartData , setCartData] = React.useState(
        {
            amountPaid: props.cartTotalAmount,
            changeDue: 0,
            customer: props.currentCustomer,
            salesType: value,
            type: paymentValue
        }
    );
    const classes = useStyles();
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [customerName, setCustomerName] = React.useState('');
    const [customerId , setCustomerId] = React.useState('');
    const [isShowerCustomerDrawer , setIsShowerCustomerDrawer] = useState(false);

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
        const {...oldFormFields} = cartData;
        oldFormFields['changeDue'] = 0;
        oldFormFields['amountPaid'] = parseFloat(props.cartTotalAmount).toFixed(2)
        setCartData(oldFormFields);
    };

    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.name);
        setPaymentValue(parseFloat(event.target.value));
        const {...oldFormFields} = cartData;
        oldFormFields['salesType'] = event.target.name;
        oldFormFields['type'] = event.target.value;
        setCartData(oldFormFields)
        console.log(oldFormFields)

    };

    const getCustomerDialog = async() => {
        setIsShowerCustomerDrawer(true);
    };

    const backHandler = (event) => {
        props.setView(0);
    };


    const setCustomerHandler = (customer) => {
        props.setCustomerHandler(customer);
        setIsShowerCustomerDrawer(false);
        const {...oldFormFields} = cartData;
        oldFormFields['customer'] = customer;
        setCartData(oldFormFields);

        if(parseFloat(value) === 'gift'){
            setCustomerId(customer);
        }
    };

    const completeSellHandler = async() => {

        console.log(cartData)
        const {...oldFormFields} = cartData;
        oldFormFields['customer'] = props.currentCustomer;

        if(oldFormFields['amountPaid'] === ''){
            oldFormFields['amountPaid'] = 0.00;
        }
        if(oldFormFields['changeDue'] === ''){
            oldFormFields['changeDue'] = 0.00;
        }
        console.log(oldFormFields.type , oldFormFields.customer)

        const cashCustomerId = (await CustomerService.getCashCustomer())[0].id;
        if( oldFormFields.customer === cashCustomerId){
            alert(`Please set a customer for this transaction`)
        }else {
            try {
                console.log(cartData.type)
                await new SaleService().makeSell(cartData , parseFloat(cartData.type));
                setSuccessMsg('Recorded successfully');
                setSuccess(true);
                setTimeout(function () {
                    setSuccessMsg('');
                    setSuccess(false);
                    history.push(paths.other_stock)
                }, 2000);
            }catch (e) {
                setErrorMsg('OOPS. Something went wrong. Please try again');
                setError(true);
                setTimeout(function () {
                    setErrorMsg('');
                    setError(false);
                }, 2000);
                }
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
                type="success"
                openState={success}
                message={successMsg}
            />

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} >
                <Grid container spacing={1} className={`shadow1 mb-1 borderRadius10`} style={{display: 'table', height: '90px', margin: '0px 0px 8px 5px', width: '98%'}} >
                    <Typography component="p" style={{ margin: '20px 0px 0px 0px', fontSize: '18px' }} >
                            Cost of items
                    </Typography>
                    <Typography className='text-dark font-weight-bold' style={{ fontSize: '25px' }} >
                            {`GHC ${props.cartTotalAmount}`}
                    </Typography>
                </Grid>
            </Box>

            {/* <ViewCash
                currentCustomer={customerName}
                openAddCustomerModal={getCustomerDialog.bind(this)}
                cartAmount={props.cartTotalAmount}
                customerId={props.currentCustomer}
            /> */}

            <Paper elevation={3}>

                <Typography className='text-dark font-weight-bold' style={{ marginTop: '20px', fontSize: '18px' }} >
                    What will the stock be used as?
                </Typography>

                <Grid container  style={{textAlign: 'left', marginLeft: '5px'}}  >

                    <FormControl component="fieldset">
                    <RadioGroup aria-label="payment" name="payment" value={value} onChange={handleRadioChange.bind(this)}>
                    
                        
                            <Grid item xs={12} >
                                <FormControlLabel value={6} name={'gift'} control={<StyledRadio />} label="Gift" style={{display: 'block', marginBottom: '10px', marginLeft: '20px'}}/>
                            </Grid>
                                
                            <Grid item xs={12} >
                                <FormControlLabel value={7} name={'family'} control={<StyledRadio />} label="Family" style={{display: 'block', marginBottom: '10px', marginLeft: '20px'}}/>
                            </Grid>

                            <Grid item xs={12} >
                                <FormControlLabel value={8} name={'damaged'} control={<StyledRadio />} label="Damaged" style={{display: 'block', marginBottom: '10px', marginLeft: '20px'}}/>
                            </Grid>

                            <Grid item xs={12} >
                                <FormControlLabel value={9} name={'expired'} control={<StyledRadio />} label="Expired" style={{display: 'block', marginBottom: '10px', marginLeft: '20px'}}/>
                            </Grid>
                    
                    </RadioGroup>
                    </FormControl>
                </Grid>

                <Button
                    variant="outlined"
                    style={{fontSize: '16px', marginBottom: '4rem'}}
                    className={classes.button}
                    onClick={getCustomerDialog.bind(this)}
                >
                    {customerName === 'Cash Customer' ? <PersonAddIcon /> : ''}
                    {customerName}
                </Button>


            </Paper>


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
                <Grid container >
                    
                    <Grid item xs={12} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 60px', textTransform: 'none', fontSize:'17px'}}
                            onClick={completeSellHandler.bind(this)}
                        >
                            Finish
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
}

export default withRouter(CheckoutView);
