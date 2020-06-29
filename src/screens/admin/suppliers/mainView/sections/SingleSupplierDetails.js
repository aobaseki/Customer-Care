import React, { useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import Styles from '../../SupplierDetails.module.scss';
import Grid from '@material-ui/core/Grid';
import paths from "../../../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";
import ButtonBase from '@material-ui/core/ButtonBase';
import Woman from '../../../../../assets/img/woman.jpg';
import Typography from "@material-ui/core/Typography";
import LocalInfo from '../../../../../services/LocalInfo';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CallIcon from "@material-ui/icons/Call";
import EditIcon from "@material-ui/icons/Edit";
import ProductsIcon from "@material-ui/icons/Menu";
import DeleteIcon from "@material-ui/icons/Delete";
import SectionNavbars from "../../../../../components/Sections/SectionNavbars";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import SupplierOrderHistorySingle from "./SupplierOrderHistorySingle";
import SupplierService from "../../../../../services/SupplierService";

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

const SingleSupplierDetails = props => {
    const classes = useStyles();
    const [isShowDrawer , setIsShowDrawer] = useState(false);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [owedAmount , setOwedAmount] = useState('');
    const [supplier , setSupplier] = useState('');
    const [orders , setOrders] = useState([]);

    useEffect(() => {
        if(supplier === ''){
            getSupplier();
        }
    });

    const getSupplier = async () => {
        const branchSupplier = ((props.branchSuppliers).filter((item) => item.id === (localStorage.getItem("supplierId"))))[0];

        console.log(branchSupplier.deliveryDays)
        setSupplier(branchSupplier);
        setOrders(await branchSupplier.orders());
        const response = await SupplierService.getSuppliedAmountOwed(branchSupplier.orders() , branchSupplier.payments());
        setOwedAmount(response);
    };

    const deleteSupplier = async() => {
        await props.deleteSupplier(supplier.id);
    };

    const { history } = props;

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    return (
        <div style={{height: '100vh'}}>
            <React.Fragment>
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
                        <div onClick={() => props.setView(0)}>
                            <ArrowBackIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                />

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
                        margin: '10px auto',
                        marginTop: '70px',
                        alignItems: 'center',
                    }}
                >
                    <Grid container
                        style={{
                            borderBottom: "1px solid #d8d2d2",
                            padding: '5px 0px'
                        }}
                    >
                        <Grid item xs={3} sm>
                            <Avatar
                                alt="Ali Connors"
                                src={Woman}
                                className={classes.primaryColor}
                                style={{
                                    flex: 1,
                                    justifyContent: "space-between",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    margin: '5px auto'
                                }}
                            >
                            </Avatar>
                        </Grid>
                        <Grid item xs={9} sm container style={{paddingBottom: "7px" }} >
                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                <Grid item xs>
                                    <Typography style={{fontSize: "18px" , fontWeight: "500"}}>
                                        {supplier.name}
                                    </Typography>
                                    <Typography  style={{fontSize: "15px" , fontWeight: '400'}}>
                                        {supplier.contact}
                                    </Typography>
                                    <Typography style={{fontSize: "15px" , fontWeight: '300'}}>
                                        {supplier.deliveryDays ? SupplierService.getSupplierDays(supplier.deliveryDays) : 'No delivery day set'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container
                          style={{
                              borderBottom: "1px solid #d8d2d2",
                              padding: "10px 0px",
                          }}
                    >
                        <Grid item xs={3} sm>
                            <a href={`tel:${supplier.contact}`} style={{textDecoration: 'none'}}>
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
                            </a>
                        </Grid>
                        <Grid item xs={3} sm>
                            <div onClick={() => props.setView(2)}>
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
                            </div>
                        </Grid>
                        <Grid item xs={3} sm>
                            <ButtonBase className={Styles.roundDiv} onClick={() => history.push(paths.order_supplier_stock)}>
                                <Grid item xs={12} sm>
                                    <ProductsIcon/>
                                </Grid>
                            </ButtonBase>
                            <Grid item xs={12} sm >
                                <Typography
                                    className={Styles.btnLabel}
                                >
                                    Product list
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid item xs={3} sm>
                            <div onClick={deleteSupplier}>
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
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={1}
                    className={`shadow1 boxMain mx-auto rounded mt-3`}
                    style={{width: '95%', padding: '10px 2% 20px' , marginBottom: '60px' , marginTop: '10px'}}
                >
                    <Typography
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            borderBottom: "1px solid #d8d2d2",
                            paddingBottom: "7px"
                        }}
                        className={`w-100`}
                    >
                        Order History
                    </Typography>

                    {
                        orders.length === 0 ?
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
                                            No order history
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                            :
                            (orders.slice((orders.length - 3), orders.length)).map((order) =>
                                <div key={order.id} style={{width: '100%'}}>
                                    <SupplierOrderHistorySingle order={order} owedAmount={owedAmount}/>
                                </div>
                            )
                    }
                    {
                        orders.length !== 0 ?
                            <Link to={paths.order_history} style={{'marginTop': '10px' , textDecorationColor: '#DAAB59' , textAlign: 'center' , width: '100%'}}>
                                <span  style={{'marginTop': '20px', color: '#DAAB59', fontSize: '16px' , textAlign: 'center'}}><i>View more</i> </span> <br/>
                            </Link>
                            :
                        ''
                    }

                </Grid>
                {/*<div style={{padding: '10px', marginTop: "8px"}}>
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
                    </Paper>
                </div>*/}
{/*
                <div style={{ position: "fixed", top:"60px", width:"100%" }}>
*/}

                    {/*<Grid container spacing={2}>
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
                    </Grid>*/}

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
{/*
                </div>
*/}
            </React.Fragment>
        </div>
    );
};

export default withRouter(SingleSupplierDetails);
