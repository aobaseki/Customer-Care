import React, {useEffect , useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import MainDialog from '../../../../../components/Dialog/ProductDialog';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import SingleDayProduct from './SingleDayProduct';
import format from "date-fns/format";
import SaleService from "../../../../../services/SaleService";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    primaryColor: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: '#FFFFFF',
        backgroundColor: '#DAAB59',
    }
}));
const SingleDayInvoice = props => {
    const classes = useStyles();

    /*
    * @todo format receipt number as required...
    * */
    const invoice = props.invoice;
    const prodName = props.prodName;
    const [customer , setCustomer] = useState(false);
    const [saleEntries , setSaleEntries] = useState([]);
    const [total , setTotal] = useState(false);
    const [payment , setPayment] = useState(false);
    const [mainDialog, setMainDialog] = useState(false);

    const preventDefault = event => event.preventDefault();

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

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
        const entries = await invoice.salesEntries(); //await new SaleService().getSaleProductsById(invoice.id);
        const saleTotal = await SaleService.getSaleEntryAmountById(invoice.id);
        const paymentStatus = await SaleService.getSalePaymentStatus(invoice.id);
        setCustomer(response);
        setTotal(saleTotal);
        setPayment(paymentStatus);
        setSaleEntries(entries);
    };

    return(
        <div>
            {prodName === `${customer.firstName}`
                ?
                <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>

                    <Grid item xs={3} sm>
                        <Avatar
                            alt={customer ? `${customer.firstName} ${customer.otherNames}` : 'Cash Customer'}
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
                            {customer ? (customer.firstName).charAt(0).toUpperCase() : 'C'}
                        </Avatar>
                    </Grid>
                    <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}} onClick={openDialogHandler.bind(this)} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' style={{ fontSize: '16px'}}>{customer ? `${customer.firstName} ${customer.otherNames}` : 'Cash Customer'}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>INV. {invoice.receiptNumber.slice(0,8)}</div>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>Sales: GHC {total}</div>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{height: '60px', margin: '10px 0px 0px 0px' , float: 'right'}} onClick={openDialogHandler.bind(this)} >
                        <div style={{textAlign: 'right', display: 'table-cell', verticalAlign: 'middle'}}>
                            <div className="font-weight-bold mt-1" style={{ fontSize: '14px', float: 'right'}}>  {format(new Date(invoice.createdAt) , "h:mm a")}</div>
                            <div className="font-weight-light mt-1" style={{ fontSize: '14px', color: 'green', float: 'right'}}> {payment}</div>
                        </div>
                    </Grid>

                </Grid>
                :
                ''
            }


            <MainDialog
                handleDialogClose={closeDialogHandler.bind(this)}
                states={mainDialog}
                title={

                    <Grid container spacing={1} >

                        <Grid item xs={7} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <div className='text-dark font-weight-bold' style={{ fontSize: '16px', marginLeft: '10px'}} >{customer ? `${customer.firstName} ${customer.otherNames}` : 'Cash Customer'}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>INV. {invoice.receiptNumber.slice(0,8)}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}> {format(new Date(invoice.createdAt) , "h:mm a")}</div>
                            </div>
                        </Grid>

                        <Grid item xs={5} style={{height: '60px', margin: '15px 0px'}}>
                            <div style={{textAlign: 'right', display: 'table-cell', verticalAlign: 'right'}}>
                                <div className="text-dark font-weight-bold" style={{ fontSize: '13px', color: 'red'}}>GHC {total}</div>
                                {payment !== 'Full payment'
                                    ?
                                    <div>
                                        <Button
                                            variant="outlined"
                                            style={{
                                                border: '1px solid #DAAB59',
                                                color: '#DAAB59',
                                                padding: '5px 5px',
                                                textTransform: 'none',
                                                fontSize: '10px'
                                            }}
                                            // onClick={openPayment.bind(this)}
                                        >
                                            Enter payment
                                        </Button>
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                        </Grid>
                    </Grid>
                }
                action={

                    <Grid container spacing={1} className={`shadow1 mb-3`}>

                        <Grid item xs={12} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'center', display: 'table-cell', verticalAlign: 'middle'}}>
                                <div className="text-dark font-weight-bold" style={{ fontSize: '15px'}}>Total cost </div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '20px'}}>GHC {parseFloat(total).toFixed(2)}</div>
                            </div>
                        </Grid>

                        <Grid>
                            <Typography >
                                <Link href="#" onClick={preventDefault}  style={{ color: '#DAAB59', marginRight: '30px'}}>
                                    Sell again
                                </Link>

                                <Link href="#" onClick={preventDefault}  style={{ color: '#DAAB59', marginRight: '30px'}}>
                                    Change date
                                </Link>

                                <Link href="#/invoice-history" onClick={closeDialogHandler.bind(this)}  style={{textAlign: 'right', color: '#DAAB59'}} >
                                    Close
                                </Link>
                            </Typography>
                        </Grid>

                    </Grid>

                }

            >
                <Box style={{marginTop: '5px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                    {saleEntries.map((item) => <SingleDayProduct  key={item.id} saleEntry={item}  />)}
                </Box>

            </MainDialog>

        </div>

    );
};

export default SingleDayInvoice;
