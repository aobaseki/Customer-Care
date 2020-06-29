import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import EventIcon from '@material-ui/icons/Event';

import format from "date-fns/format";

const SingleWeekView = props => {
    const sale = props.sale;
    console.log(sale)

    return(
        <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
            <Grid item xs={2}>
                <Card
                    className="shadow1"
                    style={{
                        margin: '10px auto',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: '50px',
                        borderRadius: '50%',
                        height: '50px',
                        padding: '0px'
                    }}
                >
                    <EventIcon style={{position: 'center', marginTop: '12px'}} />
                </Card>
            </Grid>
            <Grid item xs={10} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                    <span className='text-dark font-weight-bold' >{format(new Date(sale.day) , "eeee, MMMM do, yyyy")}</span>
                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Sales made : GHC {sale.sellingPrice}</div>
                    <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Profit made : GHC {sale.profit}</div>
                </div>
            </Grid>
        </Grid>
    );
};

export default SingleWeekView;
