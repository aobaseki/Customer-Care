import React, {useRef, useState} from "react";
import OtpInput from 'react-otp-input';
import Component from "@reactions/component";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SectionNavbars from '../../components/Sections/SectionNavbars';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router-dom";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import './verify.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import confirmImg from '../../assets/img/confirm.jfif';
import Button from "@material-ui/core/Button/Button";
import paths from "../../utilities/paths";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SimpleSnackbar from "../../components/Snackbar/SimpleSnackbar";
import PrimaryLoader from "../../components/Loader/Loader";
import Api from "../../services/Api";
import phoneFormat from "../../services/phoneFormatter";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import LocalInfo from "../../services/LocalInfo";
import IconButton from "@material-ui/core/IconButton/IconButton";

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const VerifySMS = props => {
    const { history } = props;
    const [loading , setLoading] = useState(false);
    const [loadingSMS , setLoadingSMS] = useState(false);
    const [loadingContact , setLoadingContact] = useState(false);
    const classes = useStyles();
    const [successDialog, setSuccessDialog] = useState(false);
    const [errorDialog, setErrorDialog] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [open, setOpen] = React.useState(false);
    const [userContact , setUserContact] = useState('');
    const [error , setError] = useState('none');
    const [changeContact , setChangeContact] = useState(false);
    const PersonalInformationForm = useRef(null);

    //Logic for verifying SMS
    const verifySMS = async({otp}) => {
        if(otp.toString().length < 4){
            alert('Please check code');
            return;
        }

        setLoading(true);

        let code = parseFloat(localStorage.getItem('userOTP'));

        const params = {
            "phone" : localStorage.getItem('userContact'),
            "password" : localStorage.getItem('randomString'),
            "otp" : otp.toString(),
        };

        if(code === otp){
            try {
                let user = await new Api('others').update(
                    params,
                    {},
                    {},
                    `https://core-api-dev.mystoreaid.net/v1/client/users/verify`,
                );

                if(user){
                    localStorage.setItem('accessToken' , user.data.token);
                    localStorage.removeItem('randomString');
                    localStorage.removeItem('userOTP');
                    setSuccessMsg('You have successfully created an account.');
                    setSuccessDialog(true);
                    setTimeout(function(){
                        setSuccessDialog(false);
                        setLoading(false);
                        history.push(paths.get_started);
                    }, 2000);
                }
            }catch (error) {
                setErrorMsg('Please try again.');
                setErrorDialog(true);
                setLoading(false);

                console.log(error)
            }
        }else{
            setLoading(false);
            setErrorMsg('Number you entered is incorrect. Please enter again!');
            setErrorDialog(true);
            return false
        }
    };

    const resendSMS = async () => {
        setLoadingSMS(true);


        const userId = JSON.parse(localStorage.getItem('userDetails')).userId;

        try{
            const response = await new Api('others').create(
                {},
                {},
                {},
                `https://core-api-dev.mystoreaid.net/v1/client/users/${userId}/resendOTP`
            );

            setSuccessMsg('Your verification code has been sent.');
            setSuccessDialog(true);

            console.log(response);
            localStorage.setItem('userOTP' , response.data.otp);

            setTimeout(function(){
                setSuccessDialog(false);
            }, 2000);

        }catch (error){
            setErrorMsg('Could not send code. Please enter again!');
            setErrorDialog(true);
            return false;
        }

        setLoadingSMS(false);
        //console.log(req);
    };

    const setContactHandler = async () => {
        setLoadingContact(true);

        const userId = LocalInfo.userId;

        try{
            const response = await new Api('others').update(
                {},
                {},
                {},
                `https://core-api-dev.mystoreaid.net/v1/client/users/${userId}/updateUser?phone=${userContact}`
            );

            setSuccessMsg('Your verification code has been sent.');
            setSuccessDialog(true);

            console.log(response);
            localStorage.setItem('userOTP' , response.data.otp);
            localStorage.setItem('userContact' , userContact);

            setTimeout(function(){
                setSuccessDialog(false);
            }, 2000);

            handleClose();
        }catch (error){
            setErrorMsg('Could not send code. Please enter again!');
            setErrorDialog(true);
            return false;
        }

        setLoadingContact(false);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
    };

    const handleClickOpen = () => {
        setUserContact('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addDashes = async (event) => {
        event.persist();
        setChangeContact(false);
        setLoadingContact(true);
        const value = event.target.value;
        if(event.target.value.length <= 12){
            event.target.value = phoneFormat(event.target.value);

            setUserContact(event.target.value);

            setError('none');
            setErrorMsg('');

            if(value.length === 12){
                try {
                    let response = await new Api('others').index(
                        {},
                        {},
                        `https://core-api-dev.mystoreaid.net/v1/client/users/exists?phone=${value}`,
                        {},
                    );

                    if(response.data.valid === false){
                        setChangeContact(false);
                        setError('block');
                        setErrorMsg('Number exists in database. Use another number');
                    }else{
                        setChangeContact(true);
                        setLoadingContact(false);
                        setError('none');
                        setErrorMsg('');
                        return true;
                    }
                } catch (error) {
                    console.log('Could not check username. Please enter again!');
                }
            }

        }

        return false;
    };

    const handleFormValidation = async(result) => {
        setChangeContact(await PersonalInformationForm.current.isFormValid());
    };

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '95vh' }}>
            <SectionNavbars>
                <CloseIcon onClick={() => history.push(paths.login)} />
            </SectionNavbars>

            <SimpleSnackbar
                type="success"
                openState={successDialog}
                message={successMsg}
            />

            <Component
                initialState={{
                    otp: '',
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />

                        <Container maxWidth="sm">
                            <Dialog
                                style={{textAlign: 'center'}}
                                fullWidth={false}
                                maxWidth="xs"
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="max-width-dialog-title"
                            >
                                {/*<DialogTitle id="max-width-dialog-title">
                                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>*/}

                                <DialogContent className={`smallModal`}>


                                    <DialogContentText style={{fontSize: '18px' , color: '#333333'}}>
                                        Enter phone number
                                    </DialogContentText>

                                    <ValidatorForm
                                        ref={PersonalInformationForm}
                                        className={classes.root}
                                        instantValidate
                                    >
                                        <Grid item xs={12} >
                                            <ValidationTextField
                                                className={classes.margin}
                                                onChange={addDashes}
                                                name="phone"
                                                label="Phone number"
                                                required
                                                type="tel"
                                                validatorListener={handleFormValidation}
                                                pattern="^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$"
                                                variant="outlined"
                                                id="phone_input"
                                                validators={['required', 'minStringLength:12' , 'maxStringLength:12']}
                                                errorMessages={
                                                    [
                                                        'Contact is a required field',
                                                        'The minimum length for contact is 10' ,
                                                        'The maximum length for contact is 10'
                                                    ]
                                                }
                                                value={userContact}
                                            />
                                            <span style={{display: `${error}` , color: 'red' , fontSize: '10px' , textAlign: 'center'}}>{errorMsg}</span>
                                        </Grid>
                                    </ValidatorForm>

                                    <Button
                                        variant="contained"
                                        style={{'backgroundColor': '#DAAB59' , marginTop: '20px', color: '#333333', padding: '8px 40px', fontSize: '14px', fontWeight: '700'}}
                                        className={classes.button}
                                        onClick={setContactHandler}
                                        disabled={!changeContact}
                                        //loading={loadingContact}
                                    >
                                        {
                                            loadingContact ?
                                                <PrimaryLoader
                                                    style={{width: '30px' , height: '2.5rem'}}
                                                    color="#FFFFFF"
                                                    type="Oval"
                                                    className={`mt-1`}
                                                    width={25}
                                                    height={25}
                                                />
                                                :
                                                'Save'
                                        }
                                    </Button>
                                </DialogContent>
                            </Dialog>

                            <Snackbar open={errorDialog} autoHideDuration={6000} onClose={handleCloseSnack}>
                                <Alert onClose={handleCloseSnack} severity="error">
                                    {errorMsg}
                                </Alert>
                            </Snackbar>
                            <Box component="div" m={2} style={{paddingTop: '60px'}}>
                                <img className="img-responsive" src={confirmImg} alt={'test'}/>
                            </Box>
                            <Typography variant="h6" component="h6">
                                Verify phone number
                            </Typography>

                            <Typography
                                variant="h6"
                                component="p"
                                style={{fontSize: '16px' , color: '#403c3c94', textAlign: 'center', width: '60%', margin: '0 auto' }}
                            >
                                Please enter the four digit pin sent to {localStorage.getItem('userContact')}
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

                            <Typography
                                variant="h6"
                                component="p"
                                style={{fontSize: '14px' , color: '#403c3c94', textAlign: 'center', width: '60%', margin: '0 auto' }}
                            >
                                {successDialog}
                                </Typography>
                            <br/>
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '8px 40px', fontSize: '14px', fontWeight: '700'}}
                                className={classes.button}
                                onClick={() => verifySMS(state)}
                                disabled={loading}
                            >
                                {
                                    loading ?
                                        <PrimaryLoader
                                            style={{width: '30px' , height: '2.5rem'}}
                                            color="#FFFFFF"
                                            type="Oval"
                                            className={`mt-1`}
                                            width={25}
                                            height={25}
                                        />
                                        :
                                        'Finish'
                                }
                            </Button>
                            <Typography
                                variant="h6"
                                component="p"
                                className={`mt-3`}
                                style={{fontSize: '16px' , color: '#403c3c94', textAlign: 'center', width: '100%', margin: '0 auto' }}
                            >
                                Wrong number? <span onClick={handleClickOpen} style={{color: '#DAAB59', textDecoration: 'underline', textDecorationColor: '#DAAB59', fontStyle: 'italic'}}>Change phone number</span>
                            </Typography>
                            <Grid container spacing={1} alignItems="center" className={`my-1`}>
                                <Grid
                                    item xs={12}
                                    style={{margin: '7% auto 5px'}}
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
                                        onClick={() => resendSMS()}
                                        disabled={loadingSMS}
                                    >
                                        {
                                            loadingSMS ?
                                                <PrimaryLoader
                                                    style={{width: '30px' , height: '2.5rem'}}
                                                    color="#FFFFFF"
                                                    type="Oval"
                                                    className={`mt-1`}
                                                    width={25}
                                                    height={25}
                                                />
                                                :
                                                'Resend Code'
                                        }
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(VerifySMS);
