import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 8,
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

const CardsSection = props => {

    const classes = useStyles();

    return (

        <div>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Opening balance
                        </Typography>
                        <Typography className={classes.text} >
                            {props.openingBalance}
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Purchased
                        </Typography>
                        <Typography className={classes.text} >
                            {props.purchase}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Sold
                        </Typography>
                        <Typography className={classes.text} >
                            {props.sales}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Closing balance
                        </Typography>
                        <Typography className={classes.text} >
                            {props.closingBalance}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} component="p" >
                            Difference
                        </Typography>
                        <Typography className={classes.text} >
                            {props.difference}
                        </Typography>
                    </Paper>
                </Grid>
                
            </Grid>
        </div>
    )

}

export default CardsSection;
