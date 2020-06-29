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

import SingleDayInvoice from './singleView/SingleDayInvoice';
import CustomerDay from './singleView/CustomerDay';
import InvoiceService from "../../../../services/InvoiceService";
import CardsSection from '../../../../components/Sections/CardsSection';
import SearchInput from "../../../Components/Input/SearchInput";
import Empty from '../../../../assets/img/empty.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../../utilities/paths";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginBottom: '4rem'
    },
    search: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '25px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const DayView = props => {
    const classes = useStyles();
    const { history } = props;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const pageName = props.pageName;
    const [name , setName] = useState('');
    const [invoiceDetails , setInvoiceDetails] = useState(false);
    const [invoices , setInvoices] = useState([]);
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const handleDateChange = date => {
        setSelectedDate(date);
        getInvoiceDetails(date);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
            if (!invoiceDetails) {
                let activeHistoryIndex = localStorage.getItem("activeHistoryIndex") || '';

                if(activeHistoryIndex){
                    setSelectedDate(activeHistoryIndex);
                    getInvoiceDetails(activeHistoryIndex);
                    localStorage.removeItem("activeHistoryIndex")
                }else{
                    getInvoiceDetails(selectedDate);
                }
            }
    });

    const getInvoiceDetails = async (date) => {
        let response = [];

        if (pageName === true){
            const branchCustomer = props.customer[0];
            const newCustomer = await branchCustomer.customer.fetch();

            response = await new InvoiceService().getInvoiceDetailsbyCustomer('day' , date , newCustomer.id);

            setName(newCustomer.firstName);
        }else{
            response = await new InvoiceService().getInvoiceDetails('day' , date);
        }
        setInvoiceDetails(response);
        setInvoices(response.invoices);
    };

    const deleteProductHandler = (event) => {
        props.deleteProduct(event);
    };

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;
        let invoice = [];

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        invoice = await new InvoiceService().searchInvoice(value);
        setInvoices(invoice);

    };

    return(
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={6} style={{padding: '2px 1px', marginTop: '12px'}}>
                    <SearchInput
                        inputName="search"
                        getValue={setInputValue.bind(this)}
                        styles={{width: '100%'}}
                    />
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
                            style={{float: 'right', width: '150px',  border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6'}}
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

            <CardsSection quantity={invoiceDetails.quantity} costPrice={invoiceDetails.costPrice} sellingPrice={invoiceDetails.sellingPrice} profit={invoiceDetails.profit} profitName="Sales profit" />

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {invoices.length === 0
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
                                Click sell to be able to view invoice history
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

                    invoices.map((invoice) => <SingleDayInvoice  key={invoice.id} invoice={invoice} deleteProduct={deleteProductHandler.bind(this)} updateSaleEntry={props.updateSaleEntry} />)
                    :
                    invoices.map((invoice) => <CustomerDay  key={invoice.id} invoice={invoice} prodName={name} deleteProduct={deleteProductHandler.bind(this)} updateSaleEntry={props.updateSaleEntry} />)
                }
            </Box>
        </div>
    )
  };

  export default withRouter(DayView);
