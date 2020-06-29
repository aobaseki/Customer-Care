import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import ClockIcon from "@material-ui/icons/AccessTime";
import PaidIcon from "@material-ui/icons/Brightness1";
import paths from "../../../../../utilities/paths";
import Typography from "@material-ui/core/Typography";
import SupplierService from "../../../../../services/SupplierService";
import format from "date-fns/format";

const SupplierOrderHistorySingle = (props) => {
    const { history } = props;
    const [stockSum , setStockSum] = useState('');
    const [owedAmount , setOwedAmount] = useState('');
    const order = props.order;

    useEffect(() => {
        if(stockSum === ''){
            getStockDetails();
        }
    });

    const getStockDetails = async () => {
        //const response = await SupplierService.getSuppliedAmountOwed(branchSupplier.orders() , branchSupplier.payments());
        const stockTotal = await SupplierService.getOrderEntityTotal(await order.stocks());
        const paymentsTotal = await SupplierService.getOrderEntityPaymentsTotal(order);
        console.log(paymentsTotal);
        setOwedAmount(stockTotal - paymentsTotal);
        setStockSum(stockTotal);
    };

    return (
        <Grid container style={{width: '100%', padding: "10px 0px", borderBottom: "1px solid #d8d2d2"}}>
            <Grid item xs={3} sm style={{paddingTop: "9px"}}>
                <ClockIcon style={{fontSize: "3.5rem" , color: "#5a5959ba"}}/>
            </Grid>
            <Grid item xs={9} sm container style={{paddingBottom: "7px" }} onClick={() => history.push(paths.supplier_detail)}>
                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                    <Grid item xs>
                        <Typography style={{fontSize: "1.2rem" , fontWeight: '500'}}>
                            {format(new Date(order.createdAt) , "do MMM, yyyy")} ,{format(new Date(order.createdAt) , "h:mm aaaa")}
                        </Typography>
                        <Typography  style={{fontSize: "1.1rem" , fontWeight: '400'}}>
                            GHC { parseFloat(stockSum).toFixed(2) }
                        </Typography>

                        <Typography style={{fontSize: "1rem" , fontWeight: '300'}}>
                            {
                                owedAmount <= 0 ?
                                    <div>
                                        <PaidIcon style={{fontSize: "1.2rem" , color : "#4caf50" , paddingTop: '5px'}}/>&nbsp;
                                        Paid
                                    </div>
                                :
                                    <div>
                                        <PaidIcon style={{fontSize: "1.2rem" , color : "red" , paddingTop: '5px'}}/>&nbsp;
                                        Owes {owedAmount}
                                    </div>
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SupplierOrderHistorySingle;
