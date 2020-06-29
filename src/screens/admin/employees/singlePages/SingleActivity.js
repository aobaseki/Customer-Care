import React from "react";
import {makeStyles} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UndoIcon from '@material-ui/icons/Undo';
import Button from "@material-ui/core/Button/Button";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '90%',
        marginTop: '10px',
        marginLeft: '13px',
    }
}));

const SingleViewCustomer = props => {

    const employee = props.activity;
    const classes = useStyles();

    return(

        <div>
                
            <Paper variant="outlined" className={classes.paper} >

                <Grid container spacing={1} >

                    <Grid item xs={1}>
                        <AccessTimeIcon style={{marginTop: '30px', color: '#DAAB59'}} />
                    </Grid>

                    <Grid item xs={8} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                        <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <div className='text-dark font-weight-bold'>Item sold: {employee.product}</div>
                            <span className="font-weight-light mt-1" style={{ fontSize: '15px'}} >{employee.name}</span>
                            <div className="font-weight-light mt-1" style={{ fontSize: '15px'}}> {employee.date} @ {employee.time}</div>
                        </div>
                    </Grid>

                    <Grid item xs={3} style={{ paddingTop: "25px", fontSize: '12px' }}  >
                        <Button
                            variant="outlined"
                            style={{color: '#333333', textTransform: 'none', fontSize: '10px', padding: '0px 0px'}}
                        >
                            <UndoIcon style={{fontSize: '20px'}} />
                                <br/>
                            undo
                        </Button>
                    </Grid>

                </Grid>

            </Paper>
                  
        </div>
        
    )

}
export default withRouter(SingleViewCustomer);