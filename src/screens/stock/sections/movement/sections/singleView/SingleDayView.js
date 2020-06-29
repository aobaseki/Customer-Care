import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
        fontSize: 9,
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
    const entry = props.item;
    const classes = useStyles();

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={9} style={{display: 'table', height: '30px', margin: '5px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{entry.name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px', color: '#8D6725'}}>Done on {format(fromUnixTime(entry.entryDate) , "do LLL, yyyy")}, @ {format(fromUnixTime(entry.entryDate) , "h:mm a")}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '30px', marginTop: '5px'}} >
                    <span className='text-dark font-weight-bold' >{format(fromUnixTime(entry.entryDate) , "h:mm a")}</span>
                </Grid>

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
                            {entry.purchased}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Sold
                        </Typography>
                        <Typography className={classes.text} >
                            {entry.sold}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Closing balance
                        </Typography>
                        <Typography className={classes.text} >
                            {entry.openingBalance + entry.purchased - entry.sold}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default SingleDayView;
