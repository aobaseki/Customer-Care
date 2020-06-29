import React, {useState, useEffect, useRef} from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link, withRouter} from "react-router-dom";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import '../forgotPassword.scss';

import confirmImg from '../../../assets/img/forgot.png';
import Button from "@material-ui/core/Button/Button";
import paths from "../../../utilities/paths";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Api from "../../../services/Api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";


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

const ResetPassword = props => {
    const resetForm = useRef(null);
    const { history } = props;
    const classes = useStyles();
    const [successDialog, setSuccessDialog] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorDialog, setErrorDialog] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [formFields , setFormFields] = useState({
        password: "",
        passwordRepeat: ""
    });
    const [btnState , setBtnState] = useState(false);
    const [showPassword , setShowPassword] = useState(false);

    useEffect(() => {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { ...formData } = formFields;
            if (value !== formData.password) {
                return false;
            }
            return true;
        });
    });

    const changeInput = (event) => {
        const { ...formData }  = formFields;
        formData[event.target.name] = event.target.value;
        setFormFields(formData);
    };

    const submit = async () => {
        const userData = {
            userId: localStorage.getItem('randomId'),
            otp: localStorage.getItem('userOTP'),
            password: formFields.password,
        };

        try{
            let response = await new Api('others').update(
                userData,
                {},
                {},
                `https://core-api-dev.mystoreaid.net/v1/client/users/reset_password`,
            );

            setSuccessMsg('Your password has been changed successfully. Please login to your account');
            setSuccessDialog(true);

            setTimeout(function(){
                setSuccessDialog(false);
            }, 2000);

            history.push(paths.login);
        } catch (error) {
            document.getElementById("loginForm").reset();
            setErrorMsg('Could not send code. Please enter again!');
            setErrorDialog(true);
        }
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorDialog(false);
        setSuccessDialog(false);
    };

    return (
        <div className={classes.root} style={{ backgroundColor: '#ffffff', height: '100vh' }}>
            <React.Fragment>
                <CssBaseline />

                <Container maxWidth="sm">
                    <Typography
                        variant="h6"
                        component="p"
                        className={`text-dark mt-3 font-weight-bold`}
                        style={{fontSize: '22px' , textAlign: 'center', width: '100%', margin: '0 auto' }}
                    >
                        Change password
                    </Typography>
                    <Box component="div" m={2} style={{paddingTop: '0px'}}>
                        <img className={`img-responsive w-100`} src={confirmImg} alt={'test'}/>
                    </Box>
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

                    <ValidatorForm
                        ref={resetForm}
                        id="resetForm"
                        onSubmit={() => submit()}
                        onError={errors => console.log(errors)}
                    >

                        <div className={`${classes.margin} mt-3`} style={{'paddingBottom': '10px'}}>
                            <Grid item xs={12} className={`mb-3`}>
                                <ValidationTextField
                                    className={classes.margin}
                                    label="Password"
                                    required
                                    variant="outlined"
                                    name="password"
                                    validatorListener={result => setBtnState(result)}
                                    onChange={changeInput}
                                    value={formFields.password}
                                    validators={['required', 'minStringLength:4']}
                                    errorMessages={['Password is a required field', 'The minimum length for password is 4']}
                                    helperText=""
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>

                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <ValidationTextField
                                    className={classes.margin}
                                    label="Confirm password"
                                    required
                                    variant="outlined"
                                    name="passwordRepeat"
                                    validatorListener={result => setBtnState(result)}
                                    id="passwordConfirm"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formFields.passwordRepeat}
                                    onChange={changeInput}
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['Passwords don\'t match', 'Password confirmation is a required field', 'password mismatch']}
                                    helperText=""
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
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
                            disabled={!btnState}
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
        </div>
    );
};

export default withRouter(ResetPassword);
