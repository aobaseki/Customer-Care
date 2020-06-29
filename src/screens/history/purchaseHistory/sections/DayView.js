import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleDayView from './singleViews/SingleDayView';
import ProductDay from './singleViews/ProductDay';
import CardsSection from '../../../../components/Sections/CardsSection';
import PurchaseService from "../../../../services/PurchaseService";
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import getUnixTime from "date-fns/getUnixTime";
import ModelAction from "../../../../services/ModelAction";
import {confirmAlert} from "react-confirm-alert";
import Empty from '../../../../assets/img/empty.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../../utilities/paths";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginBottom: '4rem'
    }
  }));

const DayView = props => {
    const classes = useStyles();
    const { history } = props;
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [purchaseDetails , setPurchaseDetails] = useState(false);
    const [purchases , setPurchases] = useState([]);
    const pageName = props.pageName;
    const [name , setName] = useState('');
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
            let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

            if(activeHistoryIndex){
                setSelectedDate(activeHistoryIndex);
                getPurchaseDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
            }else{
                getPurchaseDetails(selectedDate);
            }
        }
    });

    const getPurchaseDetails = async (date) => {
        const response = await new PurchaseService().getPurchaseDetails('day', date);
        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);
        }
        setPurchaseDetails(response);
        setPurchases(response.purchases);
    };

    const deleteProductHandler = (stockId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this entry.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await new ModelAction('BranchProductStock').softDelete(stockId);

                            setSuccessMsg('Stock deleted successfully');
                            setSuccess(true);
                            getPurchaseDetails(selectedDate);
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

    const updateStockQuantity = async(stockId, formFields) => {
        const data = {
            quantity: parseFloat(formFields.quantity)
        };

        try {
            await new ModelAction('BranchProductStock').update(stockId, data);

            setSuccessMsg('Quantity successfully changed');
            setSuccess(true);
            getPurchaseDetails(selectedDate);
            setTimeout(function(){
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);

            return true;
        }catch (e) {
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function(){
                setErrorMsg('');
                setError(false);
            }, 2000);
            return false;
        }
    };

    const updatePriceEntry = async(stockId, formFields) => {
        const data = {
            costPrice: parseFloat(formFields.costPrice)
        };

        try {
            await new ModelAction('BranchProductStock').update(stockId, data);

            setSuccessMsg('Cost price successfully changed');
            setSuccess(true);
            getPurchaseDetails(selectedDate);
            setTimeout(function(){
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);

            return true;
        }catch (e) {
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function(){
                setErrorMsg('');
                setError(false);
            }, 2000);
            return false;
        }
    };

    const updateEntryDate = async (stockId, date) => {
        const data = {
            stockDate: getUnixTime(date)
        };

        try {
            await new ModelAction('BranchProductStock').update(stockId, data);

            setSuccessMsg('Date successfully changed');
            setSuccess(true);
            getPurchaseDetails(selectedDate);
            setTimeout(function(){
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);

            return true;
        }catch (e) {
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function(){
                setErrorMsg('');
                setError(false);
            }, 2000);
            return false;
        }
    };

    return(
        <div className={classes.root}>
            {/* {console.log(purchaseDetails.purchases)} */}
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
                <Grid item xs={6} >
                    <Typography
                        style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}}
                        className={`text-center text-dark`}
                    >
                        Purchased items
                    </Typography>
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
                            style={{float: 'right', width: '140px',  border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6'}}
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
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Expected Profit" /> */}

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {purchases.length === 0
                    ?
                    // <div className={`rounded mx-1 my-2 p-2 bordered`}>
                    //     <Grid container spacing={1} className={`py-1`}>
                    //         <Grid
                    //             item xs={12}
                    //             className={`text-left pl-2`}
                    //         >
                    //             <Typography
                    //                 component="h6"
                    //                 variant="h6"
                    //                 style={{fontSize: '16px'}}
                    //                 className={`text-center text-dark`}
                    //             >
                    //                 No purchases made
                    //             </Typography>
                    //         </Grid>
                    //     </Grid>
                    // </div>
                    <div>
                        <Box component="div" m={2} style={{marginTop: '-1rem'}} >
                            <img className="img100" src={Empty} alt={'payment'}/>
                        </Box>

                        
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '17px', padding: '0px 0px 10px 0px' }} >
                            Seems you have not bought any product
                        </Typography>
                        

                        <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginBottom: '20px' }} >
                                Click on Add Stock to be able to view purchase history
                        </Typography>

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                            onClick={() => history.push(paths.stock)}
                        >
                            Add stock
                        </Button>
                    </div>
                    :
                    pageName === false ?

                    purchases.map((purchase) => <SingleDayView updateEntryDate={updateEntryDate.bind(this)} key={purchase.id} purchase={purchase} purchaseEntry={purchase} deleteStoreProduct={deleteProductHandler.bind(this)} updateStockQuantity={updateStockQuantity.bind(this)} updatePriceEntry={updatePriceEntry.bind(this)} />)
                    :
                    purchases.map((purchase) => <ProductDay key={purchase.id} updateEntryDate={updateEntryDate.bind(this)} purchase={purchase} purchaseEntry={purchase} prodName={name} deleteStoreProduct={deleteProductHandler.bind(this)} updateStockQuantity={updateStockQuantity.bind(this)} updatePriceEntry={updatePriceEntry.bind(this)} />)
                }
            </Box>

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.map((item) => <SingleDayView  key={item.pro_id} item={item}/>)}
            </Box> */}
        </div>
    )
};

export default withRouter(DayView);
