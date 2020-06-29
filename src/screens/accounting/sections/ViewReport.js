import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';

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
        marginBottom: '20px',
    }
}));

const ViewReport = props => {
    const classes = useStyles();
    const itemsIn = props.CashInItems;
    const itemsOut = props.CashOutItems;
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = date => {
        setSelectedDate(date);
      };

    return(
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="outlined"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker"
                    className='text-dark font-weight-bold'
                   
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            
            <Paper variant="outlined" className={classes.paper2}>
                <div>
                    <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', marginBottom: '10px'}} >
                        Cash in by Ama Serwaa
                    </Typography>

                    {itemsIn.map((item) =>   
                        <Grid container spacing={1} style={{marginBottom: '10px'}}>
                            <Grid item xs={6}>
                                <Typography  style={{ fontSize: '16px', float:'left' }} >
                                    {item.amount} cedis :
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography  style={{ fontSize: '16px', float:'left' }} >
                                    {item.date} 
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography  style={{ fontSize: '16px' }} >
                                    <EditIcon  style={{float: 'left'}} />
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </Paper>

            <Paper variant="outlined" className={classes.paper2}>
                <div>
                    <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', marginBottom: '10px' }} >
                        Cash out by Ama Serwaa
                    </Typography>

                    {itemsOut.map((item) =>   
                        <Grid container spacing={1} style={{marginBottom: '10px'}} >
                            <Grid item xs={6}>
                                <Typography  style={{ fontSize: '16px', float:'left' }} >
                                    {item.amount} cedis :
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography  style={{ fontSize: '16px', float:'left' }} >
                                    {item.date} 
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography  style={{ fontSize: '16px' }} >
                                    <EditIcon  style={{float: 'left'}} />
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </div>
            </Paper>

        </div>
    )
}

export default ViewReport