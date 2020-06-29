import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import format from "date-fns/format";
import BoxDefault from '../../../../../components/Box/BoxDefault';

import SingleCustomerInvoiceView from "../components/singleCustomerInvoiceView";


const CustomerWeek = props => {
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
                    <Grid item xs={7}>
                        <span className='text-dark text-left' style={{ fontSize: '15px'}} >{format(new Date(invoice.day) , "eeee, MMMM do, yyyy")}</span>
                    </Grid>
                    <Grid item xs={5} className={`text-right pr-2`}>
                        <span className='text-dark font-weight-light text-right' style={{ fontSize: '13px'}} >Total : GHC {parseFloat(invoice.total).toFixed(2)}</span>
                    </Grid>
                </Grid>

                {
                    invoices.map((item) =>
                        <SingleCustomerInvoiceView key={item.id} invoice={item}/>
                    )
                }

                {/*{prodName === `${customer.firstName}`
                ?
                <div>
                    <BoxDefault
                        bgcolor="background.paper"
                        p={1}
                        className={'boxDefault'}
                        style={{marginTop: '5px' }}
                    >
                        <Grid container className={`bordered`}>
                            <Grid item xs={12}>
                                <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >{format(new Date(invoice.createdAt) , "eeee, MMMM do, yyyy")} | {format(new Date(invoice.createdAt) , "h:mm a")}</span>
                            </Grid>
                        </Grid>

                        <Grid container className={`bordered`}>

                            <Grid item xs={1} />

                            <Grid item xs={7} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                    <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}} >{`${customer.firstName} ${customer.otherNames}`}</span>
                                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Total business: GHC {total}</div>
                                </div>
                            </Grid>

                            <Grid item xs={4} style={{display: 'table', height: '30px', margin: '8px 0px'}}>
                                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                    <div className="font-weight-light mt-1" style={{ fontSize: '10px', color: 'red'}}> {payment} </div>
                                </div>
                            </Grid>
                        </Grid>
                    </BoxDefault>
                </div>
                :
                ''
            }*/}
            </BoxDefault>
        </div>
    );
};

export default CustomerWeek;
