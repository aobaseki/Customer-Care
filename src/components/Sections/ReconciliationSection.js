import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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

const ReconciliationSection = props => {

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1} >
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            The total sales
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC {props.sales}
                        </Typography>
                    </Paper>
                </Grid>
                
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Total credit
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC {props.credit}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography component="p" style={{ margin: '10px 0px 0px 0px', fontSize: '13px' }} >
                            Difference
                        </Typography>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px' }} >
                            GHC {props.sales - props.credit}
                        </Typography>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    )

}

export default ReconciliationSection;