import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router-dom";

const SingleCollectionView = props => {

    const collection = props.collection;

    return (
        <div>
                
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={12} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <div className='text-dark font-weight-bold'  style={{ paddingBottom: '5px', marginLeft: '10px'}}>{collection.date}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px', marginLeft: '10px'}}>Collected: GHC {collection.amount}</div>
                    </div>
                </Grid>
            </Grid>
                
        </div>
    )
}

export default withRouter(SingleCollectionView);