import React, {useState} from "react";
import OtpInput from 'react-otp-input';
import Component from "@reactions/component";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import confirmImg from '../../../assets/img/confirm.jfif';
import Button from "@material-ui/core/Button/Button";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    shadow1: {
        '-webkit-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        '-moz-box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
        'box-shadow': '3px 5px 5px 0px rgba(227,227,227,1)',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ConfirmSMS = props => {
    const classes = useStyles();
    const [errorDialog, setErrorDialog] = useState(false);

    //Logic for verifying SMS
    const verifySMS = async({otp}) => {
        if(otp.toString().length < 4){
            alert('Please check code');
            return;
        }

        let code = localStorage.getItem('userOTP');

        if(code === otp){
            props.setView(2);
        }else{
            setErrorDialog(true);
            return false
        }
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
    };

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <Component
                initialState={{
                    otp: '',
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />

                        <Container maxWidth="sm"
                        >
                            <Box component="div" m={2} style={{paddingTop: '60px'}}>
                                <img className="img-responsive" src={confirmImg} alt={'test'}/>
                            </Box>
                            <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                                <Alert onClose={handleCloseSnack} severity="error">
                                    Number you entered is incorrect. Please enter again!
                                </Alert>
                            </Snackbar>
                            <Typography variant="h6" component="h6">
                                Verify phone number
                            </Typography>

                            <Typography
                                variant="h6"
                                component="p"
                                style={{fontSize: '14px' , color: '#403c3c94', textAlign: 'center', width: '60%', margin: '0 auto' }}
                            >
                                Please enter the four digit pin sent to your phone
                            </Typography>
                            <div
                                style={{display: 'inline-flex'}}
                            >
                                <OtpInput
                                    onChange={otp => setState({otp})}
                                    numInputs={4}
                                    separator=""
                                    value={state.otp}
                                    inputStyle="inputStyle"
                                    focusStyle="activeInputStyle"
                                    isInputNum="true"
                                    shouldAutoFocus="true"
                                />
                            </div>

                            <br/>
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '8px 40px', fontSize: '14px', fontWeight: '700'}}
                                className={classes.button}
                                onClick={() => verifySMS(state)}
                            >
                                Finish
                            </Button>

                            <Grid
                                item xs={12}
                                style={{margin: '15% auto 5px'}}
                            >
                                <Typography
                                    component="span"

                                >
                                    Didn't receive code?
                                </Typography>

                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', textAlign: 'center', color: '#DAAB59', padding: '8px 15px', fontSize: '12px', marginLeft: '10px'}}
                                    className={classes.button + ' ' + classes.shadow1}
                                >
                                    Resend code
                                </Button>
                            </Grid>
                        </Container>
                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(ConfirmSMS);
