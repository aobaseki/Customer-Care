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
import SingleDay from './singlePages/SingleDay';
import InvoiceService from "../../../../services/InvoiceService";

const DayView = props => {

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    //const returns = props.returns;
    const pageName = props.pageName;
    const [name , setName] = useState('');
    const [invoiceDetails , setInvoiceDetails] = useState(false);
    const [invoices , setInvoices] = useState([]);


    const handleDateChange = date => {
        setSelectedDate(date);
        getInvoiceDetails(date);
    };

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!name) {
            getInvoiceDetails(selectedDate);
        }
    });

    const getInvoiceDetails = async (date) => {
        console.log(date);
        let response = [];

        if (pageName === true){
            if(props.customer.length === 0){
                response = await new InvoiceService().getInvoiceDetailsbyCustomer('day' , date , "0");
                setName("Cash Customer");
            }else{
                const branchCustomer = props.customer[0];
                const newCustomer = await branchCustomer.customer.fetch();
                console.log(newCustomer);

                response = await new InvoiceService().getInvoiceDetailsbyCustomer('day' , date , newCustomer.id);

                setName(`${newCustomer.firstName} ${newCustomer.otherNames}`);
            }

            console.log(response)
        }else{
            response = await new InvoiceService().getInvoiceDetails('day' , date);
        }
        setInvoiceDetails(response);
        setInvoices(response.invoices);
        console.log(response)
    };

    const setView = (step) => {
        props.setView(step);
    };

    return (
        <div>

            <SectionNavbars
                title="Sales returns"
                leftIcon={
                    <div onClick={() => setView(1)} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Grid container spacing={2} style={{marginTop: '60px'}} className={`pt-2`}>
                <Grid item xs={12} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                    <Typography  style={{ fontSize: '15px', marginBottom: '10px'}} >
                        Select the date the returned item was purchased
                    </Typography>
                </Grid>
            </Grid>

            <DateToggle setView={props.setStepContentView} />

            <Grid container spacing={1} style={{marginTop: '5px', borderTop: "1px solid #d8d2d2"}}>
                <Grid item xs={6} >
                    <Typography
                        style={{fontSize: '14px', paddingTop: '20px'}}
                        className={`text-center text-dark`}
                    >
                        {name}
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

            <CardsSection quantity={invoiceDetails.quantity} costPrice={invoiceDetails.costPrice} sellingPrice={invoiceDetails.sellingPrice} profit={invoiceDetails.profit} profitName="Sales profit" />
            {/* <CardsSection quantity='4' costPrice='20' sellingPrice='50' profit='30' profitName="Profit" /> */}

            <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {invoices.length === 0
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
                                    No sales made
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :

                    invoices.map((item) => <SingleDay key={item.id} invoice={item} prodName={name} setView={props.setView} returnProducts={props.returnProducts} />)

                }
            </Box>

            <Box
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
            </Box>

        </div>
    )
}

export default withRouter(DayView);
