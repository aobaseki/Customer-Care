import React, {useEffect, useState} from "react";
import {withRouter } from "react-router-dom";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import DateToggle from '../../../../components/DateToggle/DateToggle';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CardsSection from '../../../../components/Sections/CardsSection';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import SingleProduct from './singlePages/SingleProduct';
import PurchaseService from "../../../../services/PurchaseService";
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import ModelAction from "../../../../services/ModelAction";

const DayView = props => {

    const { history } = props;
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [purchaseDetails , setPurchaseDetails] = useState(false);
    const [purchases , setPurchases] = useState([]);
    // const pageName = props.pageName;
    // const [name , setName] = useState('');
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');

    const handleDateChange = date => {
        setSelectedDate(date);
        getPurchaseDetails(date);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
            if (!purchaseDetails) {
                getPurchaseDetails(selectedDate);
            }
        });
    
    const getPurchaseDetails = async (date) => {
        const response = await new PurchaseService().getPurchaseDetails('day', date);
        // if (pageName === true){
        //     const branchProduct = props.product[0];
        //     const newProduct = await branchProduct.product.fetch();
        //     setName(newProduct.name);
        // }
        setPurchaseDetails(response);
        setPurchases(response.purchases);
        console.log(response)
    };

    const setView = (step) => {
        props.setView(step);
    };

    const updateStockEntry =  async(pId, formFields) => {
        if (formFields.quantity === 0) {

            console.log('happy')
        }
        else {
            console.log('sad')
        }
    };

    const returnAll =  async(allProducts) => {

        /*
        *@todo create table for stock returns
        */
        try {
            for (let i=0; i<allProducts.length; i++) {
                await new ModelAction('StockReturnHistories').post(allProducts[i]);

                await new ModelAction('BranchProductStock').softDelete(allProducts[i].id);
            }
                setSuccessMsg('Items deleted successfully');
                setSuccess(true);
                setTimeout(function () {
                    setSuccessMsg('');
                    setSuccess(false);
                    props.setView(0);
                }, 2000);

                return true;
        } catch (e) {
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function () {
                setErrorMsg('');
                setError(false);
            }, 2000);
            return false;
        }

    };

    return (
        <div>

            <SectionNavbars
                title="Return Purchases"
                leftIcon={
                    <div onClick={() => history.goBack()} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
                icons={                  
                    <Button
                        variant="contained"
                        style={{'backgroundColor': 'white' , color: '#DAAB59', padding: '5px 15px', textTransform: 'none', fontSize:'15px'}}
                        onClick={returnAll.bind(this, purchases)} 
                    >
                        Return all
                    </Button>                  
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

            <Grid container spacing={2} style={{marginTop: '60px'}} className={`pt-2`}>
                <Grid item xs={12} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                    <Typography  style={{ fontSize: '15px', marginBottom: '10px'}} >
                        Select the date the returned item was supplied
                    </Typography>
                </Grid>
            </Grid>

            <DateToggle setView={props.setStepContentView} />

            <Grid container spacing={1} style={{marginTop: '5px', borderTop: "1px solid #d8d2d2"}}>
                <Grid item xs={6} >
                    
                </Grid>

                <Grid item xs={6} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker"
                            className='text-dark font-weight-bold'
                            style={{float: 'right', width: '150px',  border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', marginRight: '5px', lineHeight: '1.6'}}
                            size='small'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>

            <CardsSection quantity={purchaseDetails.quantity} costPrice={purchaseDetails.costPrice} sellingPrice={purchaseDetails.sellingPrice} profit={purchaseDetails.profit} profitName="Expected profit" />
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Profit" /> */}

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {purchases.length === 0
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
                                    No purchases made
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    purchases.map((item) => <SingleProduct key={item.id} purchase={item} updateStockEntry={updateStockEntry.bind(this)} />)  
                }
            </Box>

            {/* <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                    onClick={() => setView(1)}
                >
                    Back  
                </Button>
            </Box> */}
            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '10px 50px', textTransform: 'none', fontSize: '17px'}}
                    onClick={() => setView(6)}
                >
                    Finish
                </Button>
            </Box>

        </div>
    )
}

export default withRouter(DayView);