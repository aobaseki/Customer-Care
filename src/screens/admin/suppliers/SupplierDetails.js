import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import Styles from './SupplierDetails.module.scss';
import Grid from '@material-ui/core/Grid';
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Woman from '../../../assets/img/woman.jpg';
import Typography from "@material-ui/core/Typography/Typography";

import LocalInfo from '../../../services/LocalInfo';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";
import CallIcon from "@material-ui/icons/Call";
import EditIcon from "@material-ui/icons/Edit";
import ProductsIcon from "@material-ui/icons/Menu";
import DeleteIcon from "@material-ui/icons/Delete";
import ClockIcon from "@material-ui/icons/AccessTime";
import PaidIcon from "@material-ui/icons/Brightness1";
import Drawer from "../../../components/Drawer/Drawer";
import SectionNavbars from "../../../components/Sections/SectionNavbars";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
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
        'border-radius': '10px',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const SupplierDetails = props => {
    const classes = useStyles();

    /*
    * @todo replace user name with localInfo details.
    * */
    const username = JSON.parse(localStorage.getItem('userDetails')).firstName;
    console.log(username);

    const { history } = props;

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

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


                        <SectionNavbars title={`Suppliers`}>
                            <ArrowBackIcon
                                onClick={() => history.push(paths.view_suppliers)}
                            />
                        </SectionNavbars>

                        <Drawer isShow={state.isDrawerShow} />

                        <div style={{ position: "fixed", top:"60px", width:"100%" }}>
                            <Paper className={classes.paper}>
                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={3} sm>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} alt="complex" src={Woman} style={{width: "60px" , height: "60px" , borderRadius: "50%"}}></img>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={7} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" }} onClick={() => history.push(paths.supplier_detail)}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                                    Esi Mensah
                                                </Typography>
                                                <Typography  style={{fontSize: "0.9rem"}}>
                                                    Niko's Enterprise
                                                </Typography>

                                                <Typography style={{fontSize: "0.8rem"}}>
                                                    <CalendarIcon style={{fontSize: "0.8rem"}}/>&nbsp;
                                                    Mon , Wed , Fri
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>

                                    </Grid>

                                </Grid>

                            </Paper>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm container style={{paddingBottom: "0px"}}>
                                    <Grid item xs container direction="column" style={{textAlign: "left", marginLeft: "5%" , marginTop: "10px" , paddingBottom: "0px"}}>

                                    </Grid>

                                </Grid>
                                <Grid container style={{paddingTop: "7px"}}>
                                    <Grid item xs={3} sm>
                                        <ButtonBase className={Styles.roundDiv}>
                                            <Grid item xs={12} sm>
                                                <CallIcon/>
                                            </Grid>
                                        </ButtonBase>
                                        <Grid item xs={12} sm>
                                            <Typography className={Styles.btnLabel}>
                                                Contact
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={3} sm>
                                        <ButtonBase className={Styles.roundDiv}>
                                            <Grid item xs={12} sm>
                                                <EditIcon/>
                                            </Grid>
                                        </ButtonBase>
                                        <Grid item xs={12} sm>
                                            <Typography className={Styles.btnLabel}>
                                                Edit Info
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={3} sm>
                                        <ButtonBase className={Styles.roundDiv} onClick={() => history.push(paths.add_supplier_stock)}>
                                            <Grid item xs={12} sm>
                                                <ProductsIcon/>
                                            </Grid>
                                        </ButtonBase>
                                        <Grid item xs={12} sm >
                                            <Typography className={Styles.btnLabel}>
                                                Product list
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={3} sm>
                                        <ButtonBase className={Styles.roundDiv}>
                                            <Grid item xs={12} sm>
                                                <DeleteIcon/>
                                            </Grid>
                                        </ButtonBase>
                                        <Grid item xs={12} sm>
                                            <Typography className={Styles.btnLabel}>
                                                Delete
                                            </Typography>
                                        </Grid>

                                    </Grid>


                                </Grid>


                            </Grid>
                            <div style={{padding: '10px', marginTop: "8px"}}>
                            <Paper className={classes.paper} style={{padding: "2px 10px"}}>
                                <Grid container style={{paddingTop: "7px"}}>

                                    <Grid item xs={12} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" }}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "center"}}>
                                            <Grid item xs>
                                                <Typography  style={{fontSize: "1.2rem" , fontWeight: "600"}}>
                                                    Order History
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid container style={{paddingTop: "7px", borderBottom: "1px solid #d8d2d2"}}>
                                    <Grid item xs={3} sm style={{paddingTop: "9px"}}>
                                        <ClockIcon style={{fontSize: "2.5rem" , color: "#5a5959ba"}}/>
                                    </Grid>
                                    <Grid item xs={9} sm container style={{paddingBottom: "7px" }} onClick={() => history.push(paths.supplier_detail)}>
                                        <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                            <Grid item xs>
                                                <Typography style={{fontSize: "1rem"}}>
                                                    27th Jan, 2018, 5:00pm
                                                </Typography>
                                                <Typography  style={{fontSize: "0.9rem"}}>
                                                    GHC 500
                                                </Typography>

                                                <Typography style={{fontSize: "0.8rem"}}>
                                                    <PaidIcon style={{fontSize: "0.8rem" , color : "#4caf50"}}/>&nbsp;
                                                    Paid
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            </Paper>
                            </div>
                            <Box
                                className="shadow1"
                                bgcolor="background.paper"
                                p={1}
                                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
                            >
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                                    onClick={() => history.push(paths.view_suppliers)}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                                    onClick={() => history.push(paths.add_supplier_stock)}
                                >
                                    Add stock
                                </Button>
                            </Box>
                        </div>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(SupplierDetails);
