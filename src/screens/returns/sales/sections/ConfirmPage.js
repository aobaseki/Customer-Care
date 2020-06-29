import React, {useEffect , useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import SingleConfirm from "./singlePages/SingleConfirm";
import { withRouter } from "react-router-dom";
// import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import ModelAction from "../../../../services/ModelAction";
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import {confirmAlert} from "react-confirm-alert";

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

    const classes = useStyles();
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [check , setCheck] = useState(false);
    const [qty , setQty] = useState('');
    const [tAmt , setTAmt] = useState('');
    const storedProducts = JSON.parse(localStorage.getItem("data"));
    const storedCustomer = JSON.parse(localStorage.getItem("customerDetails"));

    const setView = (step) => {
        props.setView(step);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!check) {
            getInvoiceDetails();
        }
    });

    const getInvoiceDetails = async () => {
        setCheck(true);
        let quant = 0;
        let total = 0;
        for (let i=0; i<storedProducts.length; i++) { 
            quant += parseFloat(storedProducts[i].quantity);
            total += parseFloat(storedProducts[i].sellingPrice);
        }
        setQty(quant);
        setTAmt(total);
    }

    const returnProd =  async() => {
        
        /*
        *@todo create table for stock returns
        */

        try {
            for (let i=0; i<storedProducts.length; i++) {
                console.log(storedProducts[i]);

                await new ModelAction('SaleReturnHistories').post(storedProducts[i]);

                storedProducts[i].quantity = storedProducts[i].initialQuantity - storedProducts[i].quantity;
    
                if (storedProducts[i].quantity === 0) {
    
                    await new ModelAction('Sales').softDelete(storedProducts[i].saleId);
                    
                    setSuccessMsg('Item deleted successfully');
                    setSuccess(true);
                    setTimeout(function () {
                        setSuccessMsg('');
                        props.setView(1);
                        setSuccess(false);
                    }, 2000);
                }
    
                else {
                  
                    await new ModelAction('SaleEntry').update(storedProducts[i].id, storedProducts[i]);
                  
                    setSuccessMsg('Item returned successfully');
                    setSuccess(true);
                    setTimeout(function () {
                        setSuccessMsg('');
                        props.setView(0);
                        setSuccess(false);
                    }, 2000);
                    
                }
    
            }
            return true;
        }
        catch (e) {
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function () {
                setErrorMsg('');
                setError(false);
            }, 2000);
            return false;
        }

    }

    const deleteProductHandler = (event) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this entry.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {

                            for (let i=0; i<storedProducts.length; i++) {
                                if (storedProducts[i].id === event) {
                                    storedProducts.splice(storedProducts.indexOf(i), 1);
                                    localStorage.setItem("data", JSON.stringify(storedProducts));  
                                }
                            }

                            setSuccessMsg('Entry deleted successfully');
                            setSuccess(true);
                            await getInvoiceDetails();
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

    return(
        <div className={classes.root}>
            <SectionNavbars
                title="Sales returns"
                leftIcon={
                    <div onClick={() => setView(5)}>
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

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            QUANTITY
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            {qty}
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            TOTAL
                        </Typography>
                        <Typography variant="h6" component="h2" >
                            GHC {tAmt}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            

            {/* <Button
                variant="outlined"
                style={{fontSize: '16px'}}
                className={classes.button}
            >
                {storedCustomer.name}
            </Button> */}

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {storedProducts.length === 0
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
                                    No return items
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    storedProducts.map((item) => <SingleConfirm deleteReturnEntry={deleteProductHandler.bind(this)} key={item.id} item={item}/>)
                }
            </Box>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                    onClick={returnProd.bind(this)}
                >
                    Confirm
                </Button>
            </Box>
           
        </div>
    )
}

export default withRouter(CartView);