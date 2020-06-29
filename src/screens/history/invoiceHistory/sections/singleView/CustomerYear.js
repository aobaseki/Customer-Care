import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import BoxDefault from '../../../../../components/Box/BoxDefault';

import SingleCustomerInvoiceView from "../components/singleCustomerInvoiceView";


const CustomerYear = props => {
    const invoice = props.invoice;
    const invoices = invoice.invoices;

    return(
        <div>
            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault mb-5'}
                style={{marginTop: '5px' }}
            >
                <Grid container className={`bordered pt-2 pb-2`}>
                    <Grid item xs={6}>
                        <div className='text-dark text-left font-weight-bold pl-2' style={{ fontSize: '16px'}} >{invoice.month}</div>
                    </Grid>
                    <Grid item xs={6} className={`text-right pr-2`}>
                        <div className='text-dark font-weight-light text-right' style={{ fontSize: '13px'}} >Total : GHC {parseFloat(invoice.total).toFixed(2)}</div>
                    </Grid>
                </Grid>

                {
                    invoices.length === 0 ?
                        <Grid container className={`bordered pt-2 pb-2 text-center`}>
                            <div className="font-weight-bold mt-1 text-center mx-auto" style={{ fontSize: '13px' , color: '#DA5959'}}>No sales made</div>
                        </Grid>
                        :
                        invoices.map((item) =>
                            <SingleCustomerInvoiceView key={item.id} invoice={item}/>
                        )
                }

            </BoxDefault>
        </div>
    );
};

export default CustomerYear;
