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

import SingleDayView from './productViews/SingleDayView';
import ProductDay from './productViews/ProductDay';
import CardsSection from '../../../../components/Sections/CardsSection';
import SaleService from "../../../../services/SaleService";
import SimpleSnackbar from "../../../../components/Snackbar/SimpleSnackbar";
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../../services/ModelAction";
import getUnixTime from "date-fns/getUnixTime";
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
    const [saleDetails , setSaleDetails] = useState(false);
    const [sales , setSales] = useState([]);
    const pageName = props.pageName;
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');

    const [name , setName] = useState('');

    const handleDateChange = date => {
        setSelectedDate(date);
        getSaleDetails(date);
    };

    useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
        if (!saleDetails) {
            let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

            if(activeHistoryIndex){
                setSelectedDate(activeHistoryIndex)
                getSaleDetails(activeHistoryIndex);
                localStorage.removeItem("activeHistoryIndex")
            }else{
                getSaleDetails(selectedDate);
            }
        }
    });

    const getSaleDetails = async (date) => {
        let response = [];

        if (pageName === true){
            const branchProduct = props.product[0];
            const newProduct = await branchProduct.product.fetch();
            setName(newProduct.name);

            response = await new SaleService().getProductSalesDetails('day', date , branchProduct.id);
        }else{
            response = await new SaleService().getSalesDetails('day', date);
        }

        setSaleDetails(response);
        setSales(response.sales);
    };

    const deleteProductHandler = (event) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this entry.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {

                            await new ModelAction('SaleEntry').softDelete(event);

                            setSuccessMsg('Sale deleted successfully');
                            setSuccess(true);
                            await getSaleDetails(selectedDate);
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

    const updateSaleEntry =  async(pId, formFields) => {
        if (formFields.sellingPrice) {
            const data = {
                sellingPrice: parseFloat(formFields.sellingPrice)
            };

            try {
                await new ModelAction('SaleEntry').update(pId, data);

                setSuccessMsg('Price successfully changed');
                setSuccess(true);
                getSaleDetails(selectedDate);
                setTimeout(function () {
                    setSuccessMsg('');
                    setSuccess(false);
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
        }
        else {
            try {
                await new ModelAction('SaleEntry').update(pId, formFields);

                setSuccessMsg('Quantity successfully changed');
                setSuccess(true);
                getSaleDetails(selectedDate);
                setTimeout(function () {
                    setSuccessMsg('');
                    setSuccess(false);
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
        }
    };

    const updateEntryDate = async (entryId, date) => {
        const data = {
            entryDate: getUnixTime(date)
        };

        try {
            await new ModelAction('SaleEntry').update(entryId, data);

            setSuccessMsg('Date successfully changed');
            setSuccess(true);
            getSaleDetails(selectedDate);
            setTimeout(function () {
                setSuccessMsg('');
                setSuccess(false);
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

    return(
        <div className={classes.root}>
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
                        style={{fontSize: '14px', paddingTop: '20px'}}
                        className={`text-center text-dark`}
                    >
                        Sold items
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

            <CardsSection quantity={saleDetails.quantity} costPrice={saleDetails.costPrice} sellingPrice={saleDetails.sellingPrice} profit={saleDetails.profit} profitName="Sales profit" />
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Profit" /> */}

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {sales.length === 0
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
                    //                 No sales made
                    //             </Typography>
                    //         </Grid>
                    //     </Grid>
                    // </div>
                    <div>
                        <Box component="div" m={2} style={{marginTop: '-1rem'}} >
                            <img className="img100" src={Empty} alt={'payment'}/>
                        </Box>


                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '17px', padding: '0px 0px 10px 0px' }} >
                            Seems you have not sold any product
                        </Typography>


                        <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginBottom: '20px' }} >
                                Click sell to be able to view sales history
                        </Typography>

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                            onClick={() => history.push(paths.sell)}
                        >
                            Record sales
                        </Button>
                    </div>
                    :

                    pageName === false ?

                    sales.map((sale) => <SingleDayView key={sale.id} sale={sale} saleEntry={sale} deleteStoreProduct={deleteProductHandler.bind(this)} updateSaleEntry={updateSaleEntry.bind(this)} updatePriceEntry={updateSaleEntry.bind(this)} updateDateEntry={updateEntryDate.bind(this)} />)
                    :
                    sales.map((sale) => <ProductDay key={sale.id} sale={sale} saleEntry={sale} prodName={name} deleteStoreProduct={deleteProductHandler.bind(this)} updateSaleEntry={updateSaleEntry.bind(this)} updatePriceEntry={updateSaleEntry.bind(this)} updateDateEntry={updateEntryDate.bind(this)} />)

                }
            </Box>

            {/* <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.products.map((item) => <SingleDayView  key={item.pro_id} item={item}/>)}
            </Box> */}
        </div>
    )
}

export default withRouter(DayView);
