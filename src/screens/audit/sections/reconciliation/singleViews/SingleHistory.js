import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from "@material-ui/core/Button/Button";
import BoxDefault from '../../../../../components/Box/BoxDefault';

const SingleReconciliationHistory = props => {
    const history = props.historyItem;

    const changeView = (event) => {
        props.setView(1);
     };

    return (
        <div>
            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
            >
                <Grid container spacing={1} >
                    <Grid item xs={2} style={{ marginTop: '20px'}} >
                        <AccessTimeIcon style={{fontSize: '2rem'}} />
                    </Grid>

                    <Grid item xs={7} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <span className='text-dark font-weight-bold' style={{ fontSize: '13px'}}>{history.dateRange}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}> {history.time}</div>
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}> {history.status}</div>
                        </div>
                    </Grid>

                    <Grid item xs={3} style={{ margin: '20px 0px 0px 0px'}}>  
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 10px', textTransform: 'none', fontSize:'13px'}}
                            onClick={changeView.bind(this)}
                        >
                            View  
                        </Button>
                    </Grid>
                </Grid>
            </BoxDefault>
        </div>
    )
}

export default SingleReconciliationHistory;