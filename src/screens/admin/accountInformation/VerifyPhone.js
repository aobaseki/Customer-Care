import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import Grid from '@material-ui/core/Grid';
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles, withStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    }
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

const VerifyPhone = props => {

    const { history } = props;

    const classes = useStyles();

    const handleFormValidation = (result) => {
        props.isValid(result);
    };

    const formRef = React.createRef('form');

    return (
        <div style={{height: '100vh'}}>
            <Component
                initialState={{
                    isDrawerShow: false,
                }}
            >
                {({ state, setState }) => (
                    <React.Fragment>
                        <CssBaseline />

                        <SectionNavbars
                            title="Account information"
                            leftIcon={
                                <div onClick={() => history.goBack()} >
                                    <ArrowBackIcon
                                        style={{fontSize: '2rem'}}
                                    />
                                </div>
                            }
                        />

                        <div style={{ position: "fixed", top:"60px", width:"100%" }}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1.4rem" , fontWeight: "500"}}>
                                                    Verify phone number
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Paper>

                        </div>
                        <div><br /><br /><br /><br /><br />
                            <Paper style={{padding: "0px 30px 0px 30px"}}>
                                <ValidatorForm
                                    ref={formRef}
                                    onError={handleFormValidation}
                                    className={classes.root}
                                    instantValidate
                                >
                                    <Grid item xs={12} style={{marginBottom: "350px" , paddingTop: '30px' , textAlign: "center"}}>
                                        <Typography style={{fontSize: "1.0rem" , fontWeight: "400" , paddingBottom: "5px"}}>
                                            Enter new phone number
                                        </Typography>
                                        <ValidationTextField
                                            label=""
                                            required
                                            variant="outlined"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            validators={['required', 'minStringLength:10']}
                                            errorMessages={['Phone number is a required field', 'Phone number should be up to 10']}
                                            helperText=""
                                            validatorListener={handleFormValidation}
                                            style={{width: "100%"}}
                                        />
                                    </Grid>.



                                </ValidatorForm>
                            </Paper>
                        </div>
                        <div>
                            <Box
                                boxShadow={1}
                                bgcolor="background.paper"
                                p={1}
                                style={{position: "fixed", bottom:"0", width:"100%" }}
                            >
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px'}}
                                    className={classes.button}
                                    onClick={() => history.push(paths.account_info)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                    className={classes.button}
                                    onClick={() => history.push(paths.verify_sms)}
                                >
                                    Next
                                </Button>
                            </Box>
                        </div>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(VerifyPhone);
