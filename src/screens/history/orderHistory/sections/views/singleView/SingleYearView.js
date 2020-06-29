import React, {useEffect , useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import BoxDefault from '../../../../../../components/Box/BoxDefault';

import SupplierService from "../../../../../../services/SupplierService";
import format from "date-fns/format";

const SingleYearView = props => {
    /*
    * @todo format receipt number as required...
    * */
   const order = props.order;
   const [supplier , setSupplier] = useState(false);
   const [total , setTotal] = useState(false);
   const [owedAmount , setOwedAmount] = useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!supplier || !owedAmount || !total) {
            getSupplier();
        }
    });

    const getSupplier = async () => {
        const response = await order.supplier.fetch();
        /*
        * @todo get entries via query on model
        * */
       setSupplier(response);
       setTotal(order.costPrice);
       const amountOwed = await SupplierService.getSuppliedAmountOwed(supplier.orders() , supplier.payments());
       setOwedAmount(amountOwed);
    };

    return(
        <div>
            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
                style={{marginTop: '5px' }}
            >
                <Grid container className={`bordered`}>
                    <Grid item xs={12}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >{format(new Date(order.createdAt) , "eeee, MMMM do, yyyy")} | {format(new Date(order.createdAt) , "h:mm a")}</span>
                    </Grid>
                </Grid>

                <Grid container className={`bordered`}>

                    <Grid item xs={1} />

                    <Grid item xs={7} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >{`${supplier.name}`}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total business: GHC {total}</div>
                        </div>
                    </Grid>

                    <Grid item xs={4} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <div className="font-weight-light mt-1" style={{ fontSize: '10px', color: 'red'}}> {owedAmount} </div>
                        </div>
                    </Grid>
                </Grid>
            </BoxDefault>
        </div>
    );
};

export default SingleYearView;