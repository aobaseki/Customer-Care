import React , {useState} from "react";
import Component from "@reactions/component";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link, withRouter} from "react-router-dom";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import '../forgotPassword.scss';
import PhoneIcon from '@material-ui/icons/Phone';

import confirmImg from '../../../assets/img/forgot.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../utilities/paths";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import Api from "../../../services/Api";
import phoneFormat from "../../../services/phoneFormatter";
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid:not:focus + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:invalid:focus + fieldset': {
            borderColor: '#DAAB59',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            borderColor: '#DAAB59',
            padding: '4px !important', // override inline-style
        },
    },
})(TextValidator);

const ForgotPassword = props => {
    // const { history } = props;
    const [successDialog, setSuccessDialog] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const classes = useStyles();

    //Logic for sending SMS
    const submit = async ({ phone , btnState }) => {
        if (phone.length < 12 ) {
            alert("Phone number is incorrect");
            return;
        }

        const contact = phoneFormat(phone);
        localStorage.setItem('userContact' , contact);

        //history.push(paths.reset_password)

        try{
            let response = await new Api('others').index(
                {},
                {},
                `https://core-api-dev.mystoreaid.net/v1/client/users/verify_password_reset?phone=${contact}`,
                {}
            );

            setSuccessMsg('Your verification code has been sent.');
            setSuccessDialog(true);

            console.log(response);
            localStorage.setItem('userOTP' , response.data.otp);
            localStorage.setItem('randomId' , response.data.userId);
            setTimeout(function(){
                props.setView(1);
                setSuccessDialog(false);
            }, 2000);


        } catch (error) {
            setErrorMsg('Could not send code. Please enter again!');
            setErrorDialog(true);
        }

    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
    };

    /*
    * Add dashes to contact
    * */
    const addDashes = value => {
        if(value.length <= 12){
            const phone = phoneFormat(value);
            //handleChange(event);
            return phone;
        }

        return false;
    };


    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <Component
                initialState={{
                    phone: '',
                    btnState: false,
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />
                        <SimpleSnackbar
                            type="success"
                            openState={successDialog}
                            message={successMsg}
                        />

                        <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                            <Alert onClose={handleCloseSnack} severity="error">
                                {errorMsg}
                            </Alert>
                        </Snackbar>


                        <Container maxWidth="sm">
                            <Typography
                                variant="h6"
                                component="p"
                                className={`text-dark mt-3 font-weight-bold`}
                                style={{fontSize: '22px' , textAlign: 'center', width: '100%', margin: '0 auto' }}
                            >
                                Forgot password
                            </Typography>
                            <Box component="div" m={2} style={{paddingTop: '0px'}}>
                                <img className={`img-responsive w-100`} src={confirmImg} alt={'test'}/>
                            </Box>

                            <Typography
                                variant="h6"
                                component="p"
                                className={`text-dark`}
                                style={{fontSize: '18px' , textAlign: 'center', width: '80%', margin: '0 auto' }}
                            >
                                Enter phone number you used to create your account
                            </Typography>

                            <ValidatorForm
                                ref="form"
                                onSubmit={() => submit(state)}
                                onError={errors => console.log(errors)}
                            >

                                <div className={`${classes.margin} mt-3`} style={{'paddingBottom': '10px'}}>
                                    <Grid item xs={12}>
                                        <ValidationTextField
                                            className={classes.margin}
                                            validatorListener={result => setState({btnState: result})}
                                            name="phone"
                                            //onChange={addDashes}
                                            onChange={event => setState({ phone: addDashes(event.target.value) })}
                                            value={state.phone}
                                            label="Phone number"
                                            required
                                            type="tel"
                                            variant="outlined"
                                            id="contact"
                                            pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$"
                                            validators={['required', 'minStringLength:12' , 'maxStringLength:12']}
                                            errorMessages={
                                                [
                                                    'Contact is a required field',
                                                    'Only enter numeric inputs accepted',
                                                    'The minimum length for contact is 10' ,
                                                    'The maximum length for contact is 10'
                                                ]
                                            }
                                            InputProps={{
                                                startAdornment:
                                                    <InputAdornment position="start">
                                                        <PhoneIcon />
                                                    </InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                </div>

                                <br/>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '10px 40px', fontSize: '14px', fontWeight: '700'}}
                                    className={`${classes.button} mb-3`}
                                    type="submit"
                                    disabled={!state.btnState}
                                >
                                    Submit
                                </Button>
                            </ValidatorForm>

                            <Link to={paths.login}>
                                <div
                                    className={`text-dark mt-3`}
                                    style={{'marginTop': '20px', fontSize: '22px'}}>Back to login screen</div> <br/>
                            </Link>

                        </Container>
                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(ForgotPassword);
