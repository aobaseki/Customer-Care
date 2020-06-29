import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import SaleService from "../../../../../services/SaleService";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    primaryColor: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: '#FFFFFF',
        backgroundColor: '#DAAB59',
    }
}));

const SingleCustomerInvoiceView = (props) => {
    const classes = useStyles();

    const invoice = props.invoice;
    const [customer , setCustomer] = useState(false);
    const [total , setTotal] = useState(false);
    const [payment , setPayment] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!customer || !payment || !total) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const response = await invoice.customer.fetch();
        /*
        * @todo get entries via query on model
        * */
        const saleTotal = await SaleService.getSaleEntryAmountById(invoice.id);
        const paymentStatus = await SaleService.getSalePaymentStatus(invoice.id);
        setCustomer(response);
        setTotal(saleTotal);
        setPayment(paymentStatus);
    };

    return (
        <Grid container className={`bordered pt-2 pb-2 px-2`}>
            <Grid item xs={3} sm>
                <Avatar
                    alt={customer ? `${customer.firstName} ${customer.otherNames}` : 'Cash Customer'}
                    className={classes.primaryColor}
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        margin: '5px auto',
                        textAlign: 'center'
                    }}
                >
                    {'C'}
                </Avatar>
            </Grid>

            <Grid item xs={6} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold' style={{ fontSize: '16px'}}>{customer ? `${customer.firstName} ${customer.otherNames}` : 'Cash Customer'}</span>
                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total sales: GHC {total}</div>
                </div>
            </Grid>

            <Grid item xs={3} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    {
                        payment === 'Full payment' ?
                            <div className="font-weight-light mt-1" style={{ fontSize: '12px', color: 'green', float: 'right'}}> {payment}</div>
                        :
                            <div className="font-weight-light mt-1" style={{ fontSize: '12px', color: 'red' , float: 'right'}}> {payment} </div>
                    }
                </div>
            </Grid>
        </Grid>
    );
};

export default SingleCustomerInvoiceView;
