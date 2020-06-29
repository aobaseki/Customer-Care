import React from 'react';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import { withRouter } from "react-router-dom";

const SingleCollectionView = props => {

    const collection = props.collection;

    return (
        <div>
                
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <div className='text-dark font-weight-bold'  style={{ paddingBottom: '5px', marginLeft: '10px'}}>{collection.date}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px', marginLeft: '10px'}}>Collected: GHC {collection.amount}</div>
                    </div>
                </Grid>

                {collection.approval === 'yes'
                    ?
                    <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '10px' }} >
                        <CheckCircleIcon style={{fontSize: '20px', color: '#76eb0aef'}} />
                            <br/>
                        Approved
                    </Grid>
                    :
                    collection.approval === 'no'
                    ?
                    <Grid item xs={3} style={{ paddingTop: "20px", fontSize: '10px' }} >
                        <CancelIcon style={{fontSize: '20px', color: '#f31f1fb5'}} />
                            <br/>
                        Not approved
                    </Grid>
                    :
                    <Grid item xs={3} style={{ paddingTop: "20px", fontSize: '10px' }} >
                        <HourglassFullIcon style={{fontSize: '20px'}} />
                            <br/>
                        Pending
                    </Grid>
                }
            </Grid>
                
        </div>
    )
}

export default withRouter(SingleCollectionView);