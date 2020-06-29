import React, {useState , Fragment} from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import paths from "../../../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

import LocalInfo from '../../../../../services/LocalInfo';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SectionNavbars from "../../../../../components/Sections/SectionNavbars";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import SearchInput from "../../../../Components/Input/SearchInput";
import SupplierItemList from "./SupplierItemList";
import Typography from "@material-ui/core/Typography/Typography";

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
    primaryColor: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: '#FFFFFF',
        backgroundColor: '#DAAB59',
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
        minWidth: '40px !important',
        width: '40px !important',
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

const MainSuppliersView = props => {
    const classes = useStyles();
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    console.log(props.branchSuppliers)

     const { history } = props;

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    /*const closeDialogHandler = (event) => {
        setMainDialog(false);
        setAddDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };*/

    const setInputValue = async (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchSupplierHandler(value);
    };

    return (
        <div style={{height: '100vh' , backgroundColor: 'rgba(229, 229, 229, 0.16)'}}>
            <Fragment>
                <CssBaseline />

                <SectionNavbars
                    title="Suppliers"
                    icons={
                        <div onClick={() => setIsShowDrawer(!isShowDrawer)}>
                            <MoreVertIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                    leftIcon={
                        <div onClick={() => history.push(paths.suppliers)}>
                            <ArrowBackIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                />

                <div style={{ position: "fixed", top:"50px", width:"100%" , zIndex: '1000' , paddingBottom: '10px'}}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                            <Grid item xs={11} style={{padding: '4px 8px'}} className={`mx-auto mt-7`}>
                                <SearchInput
                                    inputName="Search a supplier"
                                    styles={{
                                        border: '1px solid #e5e5e5',
                                        padding: '10px 0px'
                                    }}
                                    getValue={setInputValue.bind(this)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </div>

                <SimpleSnackbar
                    type="success"
                    openState={success}
                    message={successMsg}
                />

                <SimpleSnackbar
                    type="warning"
                    openState={error}
                    message={errorMsg}
                />

                <Grid
                    container
                    style={{
                        width: '95%',
                        display: 'flex',
                        margin: '10px auto',
                        marginTop: '120px',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Grid item xs={12} sm container style={{paddingBottom: "0px"}}>
                        <Grid item xs container direction="column" style={{textAlign: "left", marginTop: "10px" , paddingBottom: "0px"}}>
                            {
                                props.branchSuppliers.length === 0 ?
                                <div className={`w-100 rounded mx-1 my-4 p-2 bordered`}>
                                    <Grid container spacing={1} className={`py-1`}>
                                        <Grid
                                            item xs={12}
                                            className={`text-left pl-2`}
                                        >
                                            <Typography
                                                component="h6"
                                                variant="h6"
                                                style={{fontSize: '16px'}}
                                                className={`text-center text-dark`}
                                            >
                                                No supplier found
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                :
                                (props.branchSuppliers).map((supplier , index) =>
                                    <SupplierItemList key={index} item={supplier} setView={props.setView}/>
                                )
                            }

                        </Grid>
                    </Grid>
                </Grid>

                <div>
                    <Box
                        className="shadow1"
                        bgcolor="background.paper"
                        p={1}
                        style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
                    >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                            onClick={() => history.push(paths.suppliers)}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                            onClick={() => history.push(paths.add_supplier)}
                        >
                            Add new
                        </Button>
                    </Box>
                </div>
            </Fragment>
        </div>
    );
};

export default withRouter(MainSuppliersView);
