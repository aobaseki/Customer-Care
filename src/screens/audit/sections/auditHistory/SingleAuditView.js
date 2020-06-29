import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import DeleteIcon from '@material-ui/icons/Delete';

const SingleAuditView = props => {
    const audit = props.audit;

    const deleteHistoryHandler = (pId) => {
        console.log(pId)
        props.deleteAuditEntry(pId);
    };

    return(
        <div>
            <Grid container spacing={1} className={`shadow2 mb-3 borderRadius10 px-2`}>
                <Grid item xs={2} style={{ margin: '25px 0px 0px 0px'}} >
                    <AccessTimeIcon />
                </Grid>

                <Grid item xs={5} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{format(fromUnixTime(audit.auditDate) , "do MMMM, yyyy")} </span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>{format(fromUnixTime(audit.auditDate) , "h:mm a")}</div>

                        { audit.status  === 'balanced' ?
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px', color: 'green'}}>Balanced</div>
                         :
                            <div className="font-weight-light mt-1" style={{ fontSize: '13px', color: 'red'}}>Unbalanced</div>
                        }
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '13px 0px'}}>
                    <div style={{ width:'100%'}}>
                        <div className={`textItem shadow1 text-center`} style={{display: 'inline-block'}}>
                            <div onClick={props.auditProducts} >View</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2} style={{height: '60px', margin: '13px 0px'}}>
                    <div style={{ width:'100%'}}>
                        <div className={`specialDelete shadow1 text-center`} style={{display: 'inline-block' , marginRight:'5px'}}>
                            <DeleteIcon
                                onClick={deleteHistoryHandler.bind(this , audit.id)}
                                style={{fontSize: '1.5rem', color: '#DAAB59', marginTop: '5px'}}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>

        </div>

    );
};

export default SingleAuditView;
