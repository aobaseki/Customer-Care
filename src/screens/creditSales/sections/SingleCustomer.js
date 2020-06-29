import React , { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import SaleService from "../../../services/SaleService";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";

const useStyles = makeStyles(theme => ({
    primaryColor: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: '#FFFFFF',
        backgroundColor: '#DAAB59',
    }
}));

const CustomerCard = (props) => {
    const classes = useStyles();
    const [sale , setSale] = useState('');
    const [customerName , setCustomerName] = useState('');
    const [invoiceDetails , setInvoiceDetails] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!sale) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const sale = await props.sale;
        setSale(sale);
        const saleCustomer = await sale.customer.fetch();
        console.log(saleCustomer);
        setCustomerName(saleCustomer.firstName + ' ' + saleCustomer.otherNames);
        const response = await new SaleService().getAllCreditSales(sale.id);
        setInvoiceDetails(response);
        console.log(sale);
    };

    const viewPaymentDetails = (id) => {
        props.viewPaymentDetails(id, 1);
    };

    return (
        invoiceDetails.credit > 0 
            ?
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>

                <Grid item xs={3} sm>
                    <Avatar
                        alt={customerName ? `${customerName}` : 'Cash Customer'}
                        //src={Woman}
                        className={classes.primaryColor}
                        style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            margin: '10px auto',
                            textAlign: 'center'
                        }}
                    >
                        {customerName ? (customerName).charAt(0).toUpperCase() : 'C'}
                    </Avatar>
                </Grid>

                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '16px'}}>{customerName ? `${customerName}` : 'Cash Customer'}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>GHC {invoiceDetails.credit} </div>
                        {/* <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Due: 6/12/2020</div> */}
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>
                            Sale date:  { format(new Date(sale.createdAt) , "do MMMM, yyyy | h:mm a") } 
                        </div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{ margin: '20px 0px 0px 0px'}}>  
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 10px', textTransform: 'none', fontSize:'13px'}}
                        onClick={viewPaymentDetails.bind(this, sale.id)}
                    >
                        Pay  
                    </Button>
                </Grid>
            
            </Grid>
            :

            ''     
    );
};

export default CustomerCard;
