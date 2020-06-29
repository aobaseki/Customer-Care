import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box/Box";
import { withRouter } from "react-router-dom";

import SingleSuppDetails from './singleView/SingleSuppDetails';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,

    },
    title: {
        fontSize: 9,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center', 
    }
  }));

  const DayView = props => {
    
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
      };

    return(
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Typography style={{fontSize: '14px', paddingTop: '20px', marginRight: '50px'}} >
                    Purchased items
                </Typography>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="outlined"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker"
                        className='text-dark font-weight-bold'
                        style={{float: 'right', width: '170px'}}
                        size='small'
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>

            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Quantity
                        </Typography>
                        <Typography className={classes.text} >
                            5 items
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Cost price
                        </Typography>
                        <Typography className={classes.text} >
                            GHC 500
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Selling price
                        </Typography>
                        <Typography className={classes.text} >
                            GHC 600
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Amount owed
                        </Typography>
                        <Typography className={classes.text} >
                            GHC 100
                        </Typography>
                    </Paper>
                </Grid>
                
            </Grid>

            <Box style={{ paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                {props.supplierDetails.map((item) => <SingleSuppDetails  key={item.supp_id} suppDetails={item}  setView={props.setView}/>)}
            </Box>

        </div>
    )

  }

  export default withRouter(DayView);