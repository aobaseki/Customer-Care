import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,

    },
    title: {
        fontSize: 7,
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
    }
  }));

const SingleDayView = props => {
    const entry = props.monthItems;
    const classes = useStyles();

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={12} style={{display: 'table', height: '30px', margin: '5px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' style={{ fontSize: '15px'}} >{entry.week}</span>
                    </div>
                </Grid>

                {/*<Grid item xs={3} style={{height: '30px', marginTop: '5px'}} >
                    <span className='text-dark font-weight-bold' >{product.time}</span>
                </Grid>*/}


                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Opening balance
                        </Typography>
                        <Typography className={classes.text} >
                            {entry.openingBalance}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Purchased
                        </Typography>
                        <Typography className={classes.text} >
                            {entry.totalPurchased}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Sold
                        </Typography>
                        <Typography className={classes.text} >
                            {entry.totalSold}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Closing balance
                        </Typography>
                        <Typography className={classes.text} >
                            {entry.closingBalance}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Difference
                        </Typography>
                        <Typography className={classes.text} >
                            {entry.difference}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default SingleDayView;
