import React from "react";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import Grid from '@material-ui/core/Grid';
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import BoxDefault from "../../../components/Box/BoxDefault";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from "@material-ui/core/Typography/Typography";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import "./AddWarehouse.scss";
import LocalInfo from '../../../services/LocalInfo';
import Box from "@material-ui/core/Box/Box";
import warehouseImg from "../../../assets/img/warehouse.png";
import Button from "@material-ui/core/Button/Button";


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

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const AddWarehouse = props => {
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


                        <SectionNavbars
                            title="Add warehouse"
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
                                                <Typography style={{fontSize: "1.4rem" , fontWeight: "600"}}>
                                                    Add warehouse
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Paper>

                        </div>

                        <div className="getStarted">
                            <div style={{minHeight: "100px"}}>
                                _
                            </div>
                            <Box component="div">
                                <img className="img100" src={warehouseImg} alt={'Add warehouse'}/>
                            </Box>
                            <div className={`importWarehouseBox`}>
                            <BoxDefault
                                styles={{
                                    color: '#333333',
                                    bottom: '0',
                                    minHeight: '200px',
                                    position: 'fixed',
                                    padding: '0px',
                                    margin: '0px',
                                    left: 0,
                                    right: 0,
                                    width: '100%',
                                }}
                            >


                                <p style={{fontSize: '18px', fontWeight: '400', width: '75%', margin: '10px auto' , marginTop: "70px"}}>
                                    Use all products from my store and only add their quantity
                                </p>

                                <Button
                                    variant="contained"
                                    style={{
                                        width: '80%',
                                        'backgroundColor': '#DAAB59',
                                        borderRadius: '7px',
                                        color: '#333333',
                                        padding: '10px 12px',
                                        margin: '5px auto',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        marginBottom: "100px"
                                    }}
                                    className={`capitalization`}

                                >
                                    Import products from my store
                                </Button>
                            </BoxDefault>
                            </div>
                        </div>

                    </React.Fragment>
                )}
            </Component>
        </div>
    );
};

export default withRouter(AddWarehouse);
