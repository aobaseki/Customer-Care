import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";

import SingleMonthView from './singleView/SingleMonthView';
import CustomerMonth from './singleView/CustomerMonth';
import BoxDefault from '../../../../components/Box/BoxDefault';
import CardsSection from '../../../../components/Sections/CardsSection';
import InvoiceService from '../../../../services/InvoiceService';
import SystemDateHandler from "../../../../services/SystemDateHandler";
import Empty from '../../../../assets/img/empty.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../../utilities/paths";
import Box from "@material-ui/core/Box/Box";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginBottom: '4rem'
    }
}));

const values = new SystemDateHandler().getStoreMonths()

const MonthView = props => {
    const classes = useStyles();
    const { history } = props;
    const [selectedMonth, setSelectedMonth] = React.useState(values[(new Date().getMonth())].value);
    const pageName = props.pageName;
    const [name , setName] = useState('');
    const [customer , setCustomer] = useState('');

    const handleChange = event => {
      setSelectedMonth(event.target.value);
      getInvoiceDetails(event.target.value);
    };

    const [invoiceDetails , setInvoiceDetails] = useState(false);
    const [invoices , setInvoices] = useState([]);

    useEffect(() => {
      // You need to restrict it at some point
      // This is just dummy code and should be replaced by actual
        if (!invoiceDetails) {
            getInvoiceDetails(selectedMonth);
        }
    });

    const getInvoiceDetails = async (date) => {
        let response = [];

        if (pageName === true){
            const branchCustomer = props.customer[0];
            const newCustomer = await branchCustomer.customer.fetch();

            response = await new InvoiceService().getInvoiceDetailsbyCustomer('month' , date , newCustomer.id);

            setName(newCustomer.firstName);
            setCustomer(newCustomer);
        }else{
            response = await new InvoiceService().getInvoiceDetails('month' , date);
        }
        setInvoiceDetails(response);
        setInvoices(response.invoices);
    };

    const getChildrenDetails = (index) => {
        props.getChildrenView(index , 2)
    };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={6} >
                    <Typography
                        style={{fontSize: '14px', paddingTop: '20px'}}
                        className={`text-center text-dark`}
                    >
                        Sold items
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        value={selectedMonth}
                        style={{width: '150px',  margin: '10px 0px', fontSize: '7px'}}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {values.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>

            </Grid>

            <CardsSection quantity={invoiceDetails.quantity} costPrice={invoiceDetails.costPrice} sellingPrice={invoiceDetails.sellingPrice} profit={invoiceDetails.profit} profitName="Sales profit" />


                {invoices.length === 0
                    ?
                    <BoxDefault
                        bgcolor="background.paper"
                        p={1}
                        className={'boxDefault'}
                        style={{marginTop: '5px' }}
                    >
                        {/* <div className={`rounded mx-1 my-2 p-2 bordered`}>
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
                                        No sales made
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div> */}
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
                    </BoxDefault>
                    :
                    pageName === false ?

                    invoices.map((invoice , index) => 
                    <div key={index} onClick={getChildrenDetails.bind(this, invoice.index)}>
                        <SingleMonthView  key={index} invoice={invoice} />
                    </div>    
                    )
                    :
                    invoices.map((invoice , index) => 
                    <div key={index} onClick={getChildrenDetails.bind(this, invoice.index)}>
                        <CustomerMonth customer={customer} key={index} invoice={invoice} prodName={name} />
                    </div>    
                    )

                }

        </div>
    )
  }

  export default withRouter(MonthView);
