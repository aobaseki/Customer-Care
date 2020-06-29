import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from "@material-ui/core/Box/Box";
import SuccessImage from '../../../../../assets/img/success.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button/Button";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,

    }
    
  }));

const Payment = props => {

    const classes = useStyles();

    const backHandler = (event) => {
        props.setView(0);
    };

    return(
        <div className={classes.root} >

            <ArrowBackIcon  style={{position: 'relative', float: 'left', fontSize: '2rem', marginLeft: '10px'}}
                onClick={backHandler.bind(this)}

            />

            <Box component="div" m={2} style={{margin: '16px 0px 0px 0px'}}>
                <img className="img100" src={SuccessImage} alt={'test'}/>
            </Box>

            <Paper elevation={3}>
                <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px', marginBottom: '10px', padding: '20px' }} >
                    Amount owed : GHC 50.00 
                </Typography>
            </Paper>

            <Typography className='font-weight-light mt-1' style={{ fontSize: '17px', marginBottom: '10px', color: '#DAAB59' }} >
                    Total due : GHC 500 
            </Typography>

            <TextField id="outlined-basic" label="Enter amount paid" variant="outlined"  style={{margin: '25px 0px 25px 0px'}} />

            <Button
                variant="contained"
                className='text-dark font-weight-bold'
                style={{
                    backgroundColor: '#DAAB59', 
                    color: '#333333', 
                    padding: '5px 40px', 
                    textTransform: 'none', 
                    fontSize: '20px', 
                    marginTop: '10px'
                }}       
            >
                    Finish
            </Button>

        </div>
    )

}

  export default withRouter(Payment);