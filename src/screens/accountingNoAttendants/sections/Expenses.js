import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button/Button";
import EditIcon from '@material-ui/icons/Edit';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
        fontSize: 11,
           },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '80%',
        marginLeft: '25px',
    },
    paper2: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '95%',
        marginTop: '20px',
    },
    paper3: {
        
        textAlign: 'left',
        width: '98%',
        marginTop: '20px',
        marginBottom: '40px',
    },
    dateInput: {
        borderBottomStyle: 'solid'
    }
}));

const Expenses = props => {

    const classes = useStyles();
    const expenses = props.expense;

    return (
        <div>
            {expenses.length === 0
                ?
                <div>
                    <Typography className='text-dark font-weight-bold py-2' style={{ fontSize: '16px', marginBottom: '10px', marginTop: '10px', fontWeight: '600' }} >
                        Expenses for today
                    </Typography>

                    <Paper variant="outlined" className={classes.paper}>
                        <label className={`  text-center`} style={{fontSize: '15px'}}> Amount of cash paid</label>

                        <TextField 
                            id="outlined-basic" 
                            name="amount"
                            variant="outlined" 
                            size="small" 
                            // onChange={handChange.bind(this)}
                            type='number'
                            style={{margin: '25px 0px 30px 0px'}} 
                        />

                        <Button
                            type="submit"
                            variant="outlined"
                            style={{
                                border: '1px solid', 
                                color: '#DAAB59', 
                                padding: '4px 50px', 
                                marginBottom: '15px', 
                                textTransform: 'none', 
                                fontSize:'15px'}}
                        >
                                Save
                        </Button>
                    </Paper>

                    <Paper variant="outlined" className={classes.paper2} >
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '16px', margin: '20px, 0px' }} >
                            Saved expenses today
                        </Typography>

                        <Typography style={{ fontSize: '18px', padding: '50px', marginBottom: '30px', fontStyle: 'italic'}} >
                            No saved expenses today
                        </Typography>
                        
                    </Paper>
                </div>
                :
                <div>
                    <Paper variant="outlined" className={classes.paper2} style={{marginBottom: '100px'}}>
                        <Typography className='text-dark font-weight-bold py-2' style={{ fontSize: '16px' }} >
                            Approved expenses today
                        </Typography>

                        <Paper variant="outlined" style={{marginBottom: '30px', textAlign: 'center', width: '90%',marginLeft: '15px',}}>
                            <Grid container spacing={1} >
                                <Grid item xs={10} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                            <div className='text-dark font-weight-bold'  style={{ paddingBottom: '5px', marginLeft: '10px'}}>{expenses.date}</div>
                                        <div className="font-weight-light mt-1" style={{ fontSize: '13px', paddingBottom: '5px', marginLeft: '10px'}}>{expenses.name}</div>
                                        <div className="font-weight-light mt-1" style={{ fontSize: '13px', marginLeft: '10px'}}>Paid: GHC {expenses.amount}</div>
                                    </div>
                                </Grid>

                                <Grid item xs={2} style={{ paddingTop: "20px", fontSize: '10px' }} >
                                    <EditIcon style={{fontSize: '30px', color: '#DAAB59'}} />
                                        <br/>
                                    Edit
                                </Grid>
                            </Grid>
                        </Paper>
                    </Paper>
                </div>
            }
            

            

        </div>
    )

}

export default Expenses;