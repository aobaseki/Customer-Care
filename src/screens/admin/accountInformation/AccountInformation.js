import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import Grid from '@material-ui/core/Grid';
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles, withStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from '@material-ui/core/TextField';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Styles from "../Admin.module.scss";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {green} from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from "@material-ui/core/SvgIcon/SvgIcon";
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from "@material-ui/core/Avatar";
import LocalInfo from "../../../services/LocalInfo";


const GreenCheckbox = withStyles({
    root: {
        color: '#333',
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
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
    shadow2: {
        'box-shadow': '0 0 1rem 2px #dcc7a4',
    },
    margin1: {
        margin: '20px auto',
    },
    padding1: {
        'padding-bottom': '20px',
    },
    boxRadius: {
        'border-radius': '10px !important',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper2: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const AccountInformation = props => {

    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history } = props;

    const classes = useStyles();
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };


    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

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

                        <div>
                            <Paper style={{padding: "0px 30px 0px 30px"}}>
                                <br /><br /><br /><br />
                                <Grid container spacing={2}>
                                    <Grid item xs={3} sm>
                                        <Avatar
                                            alt={LocalInfo.userFullName}
                                            className={classes.primaryColor}
                                            style={{
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "50%",
                                                margin: '5px auto',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {(LocalInfo.userFullName).charAt(0).toUpperCase()}
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={9} sm container>
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <TextField id="standard-basic" label=""  style={{borderBottom: "1px solid #c3c3c3" , marginBottom: "10px" , padding: "2px 5px"}}/>
                                            <TextField id="standard-basic" label=""  style={{borderBottom: "1px solid #c3c3c3" , padding: "2px 5px"}}/>
                                        </form>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} style={{marginTop: "15px"}}>
                                    <FormControlLabel
                                        control={
                                            <GreenCheckbox
                                                style={{paddingLeft: '0px'}}
                                                value="checkedB"
                                                color="success"
                                                name="checkedB"
                                            />
                                        }
                                        label="Use phone number to login"
                                    />
                                </Grid>

                                <Grid container style={{paddingTop: "25px" , fontSize:"18px"}}>
                                    <Grid item xs={6} sm style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontSize:"18px" , fontWeight: "400"}}>
                                                    Change number
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "right" , paddingBottom: "2px"}}>
                                            <Grid item xs>
                                                {/* {LocalInfo.branch.phone} */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                <Grid item xs={1} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                    <div className={Styles.centered}>
                                        <ArrowForwardIosIcon  style={{fontSize: '0.9rem'}} onClick={() => history.push(paths.verify_phone)}/>

                                    </div>
                                </Grid>

                                </Grid>

                                <Grid container style={{paddingTop: "25px" , fontSize:"18px"}}>
                                    <Grid item xs={7} sm style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontWeight: "400" , fontSize:"18px"}}>
                                                    Change username
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "right" , paddingBottom: "2px"}}>
                                            <Grid item xs>
                                                {/*<TextField id="standard-basic" label="" value="0547845784" />*/}
                                                
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                        <div className={Styles.centered}>

                                        </div>
                                    </Grid>

                                </Grid>


                                <Grid container style={{paddingTop: "25px" , fontSize:"18px"}}>
                                    <Grid item xs={7} sm style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontWeight: "400" , fontSize:"18px"}}>
                                                    Change password
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5} sm container style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "right" , paddingBottom: "2px"}}>
                                            <Grid item xs={12}>
                                                <FormControl className={clsx(classes.margin, classes.textField)}>
                                                    <InputLabel htmlFor="standard-adornment-password"></InputLabel>
                                                    <Input
                                                        style={{width: "135px"}}
                                                        id="standard-adornment-password"
                                                        type={values.showPassword ? 'text' : 'password'}
                                                        // value={values.password ? 'text' : 'yourpasswordgoeshere'}
                                                        onChange={handleChange('password')}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>


                                <Grid container style={{paddingTop: "25px" , fontSize:"18px" , marginBottom: "125px"}}>
                                    <Grid item xs={12} sm style={{borderBottom: "1px solid #d8d2d2" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "center" , paddingLeft: "2px"}}>
                                            <Grid item xs>
                                                <Typography className="menu-item" style={{fontWeight: "400" , fontSize:"18px"}}>
                                                    Log out
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>   .



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
                                    onClick={() => history.goBack()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                    className={classes.button}
                                >
                                    Save
                                </Button>
                            </Box>
                        </div>


                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(AccountInformation);
