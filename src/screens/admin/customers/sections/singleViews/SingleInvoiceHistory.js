import React, {useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import PaidIcon from "@material-ui/icons/Brightness1";
import AccessTime from "@material-ui/icons/AccessTime";

import format from "date-fns/format";
import SaleService from "../../../../../services/SaleService";

const SingleInvoiceHistory = props => {

    const invoice = props.invoice;
    const [total , setTotal] = useState(false);
    const [payment , setPayment] = useState(false);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!payment || !total) {
            getTotal();
        }
    });

    const getTotal = async () => {
        const saleTotal = await SaleService.getSaleEntryAmountById(invoice.id);
        const paymentStatus = await SaleService.getSalePaymentStatus(invoice.id);
        setTotal(saleTotal);
        setPayment(paymentStatus);
    };

    return ( 
        <div>
            <Grid container style={{paddingTop: "7px", borderBottom: "1px solid #d8d2d2"}}>

                <Grid item xs={3} sm style={{paddingTop: "9px"}}>
                    <AccessTime style={{fontSize: "2.5rem" , color: "#5a5959ba"}}/>
                </Grid>

                <Grid item xs={9} sm container style={{paddingBottom: "7px" }}>
                    <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                        <Grid item xs>
                            <Typography style={{fontSize: "1rem"}}>
                                {format(new Date(invoice.createdAt) , "MMMM do, yyyy")}, {format(new Date(invoice.createdAt) , "h:mm a")}
                            </Typography>
                            <Typography  style={{fontSize: "0.9rem"}}>
                                GHC {total}
                            </Typography>

                            <Typography style={{fontSize: "0.8rem"}}>
                                {payment === 'Full payment'
                                    ?
                                    <div>
                                        <PaidIcon style={{fontSize: "0.8rem" , color : "#4caf50"}}/>&nbsp;
                                        {payment}
                                    </div>
                                    :
                                    <div>
                                        <PaidIcon style={{fontSize: "0.8rem" , color : "#da5959"}}/>&nbsp;
                                        {payment}
                                    </div>
                                }
                                
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}

export default SingleInvoiceHistory;