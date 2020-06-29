import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import paths from "../../../../../utilities/paths";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import EditIcon from "@material-ui/icons/Edit";
import MainDialog from "../../../../../components/Dialog/MainDialog";
import {makeStyles} from "@material-ui/core";
import SupplierService from "../../../../../services/SupplierService";
import entities from "../../../../../config/supplierEntities";

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

const SupplierItemList = (props) => {
    const supplier = props.item;
    const classes = useStyles();
    const { history } = props;
    const [mainDialog, setMainDialog] = React.useState(false);
    const [addDialog, setAddDialog] = React.useState(false);
    const [owedAmount , setOwedAmount] = React.useState('');

    useEffect(() => {
        if(owedAmount === ''){
            getSuppliersOwed();
        }
    });

    const getSuppliersOwed = async () => {
        const response = await SupplierService.getSuppliedAmountOwed(supplier.orders() , supplier.payments());
        setOwedAmount(response);
    };

    const closeDialogHandler = (event) => {
        setMainDialog(false);
        setAddDialog(false);
    };

    // const openDialogHandler = () => {
    //     setMainDialog(true);
    // };

    const openSupplierDetails = (supplier) => {
        /*{/!*onClick={openDialogHandler}*!/}*/
        localStorage.setItem("supplierId" , supplier.id);
        localStorage.setItem("supplierName" , supplier.name);
        props.setView(1);
    }

    const image = `https://elparah.store/admin/upload/ Sangria Don Simon Red Wine 1L Tetrapak.jpg`;

    return (
        <React.Fragment>
            <Grid container style={{paddingTop: "10px"}} onClick={openSupplierDetails.bind(this , supplier)}>
                <Grid item xs={3} sm>
                    <Avatar
                        alt={supplier.name}
                        //src={Woman}
                        className={classes.primaryColor}
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            margin: '5px auto',
                            textAlign: 'center'
                        }}
                    >
                        {(supplier.name).charAt(0).toUpperCase()}
                    </Avatar>
                </Grid>
                <Grid item xs={6} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" }} >
                    <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                        <Grid item xs>
                            <Typography style={{fontSize: "18px" , fontWeight: "500"}}>
                                { supplier.name }
                            </Typography>
                            <Typography  style={{fontSize: "15px" , fontWeight: '400'}}>
                                { (entities.entities).filter((item) => item.entity === supplier.entityType)[0].name }
                            </Typography>
                            <Typography style={{fontSize: "15px" , fontWeight: '300'}}>
                                { supplier.contact }
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px", color: '#ff5722' }} >
                    <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                        {
                            owedAmount ?
                                <Grid xs className={`shadow1 my-3 p-1`} style={{borderRadius: '5px'}}>
                                    <Typography
                                        style={{fontSize: "13px" , fontWeight: "600" , textAlign: 'center'}}
                                        className={`capitalization font-weight-light`}
                                    >
                                        You owe
                                    </Typography>
                                    <Typography
                                        style={{fontWeight: '600', fontSize: '16px' , textAlign: 'center'}}
                                    >
                                        GHC {owedAmount}
                                    </Typography>
                                </Grid>
                                : ''
                        }

                    </Grid>
                </Grid>
                {/*<Grid item
                                  xs={4} sm
                                  style={{
                                      borderBottom: "1px solid #d8d2d2",
                                  }}
                            >
                                <Grid item xs container direction="column" spacing={2}
                                      style={{
                                          width: '100%',
                                          backgroundColor: '#ffffff',
                                          borderRadius: '5px',
                                          color: '#ff5722',
                                          border: 'none',
                                          padding: '5px 5px',
                                          fontWeight: '500',
                                          marginTop: '4px',
                                          display: 'flex',
                                          flexDirection: 'row',
                                      }}
                                      className={`capitalization shadow1 font-weight-light`}
                                      onClick={openDialogHandler.bind(this)}
                                >
                                    <Typography
                                        component="p"
                                        variant="h6"
                                        style={{fontWeight: '300', fontSize: '12px'}}
                                    >
                                        You owe
                                    </Typography>
                                    <br/>
                                    <Typography
                                        component="p"
                                        variant="h6"
                                        style={{fontWeight: '600', fontSize: '13px'}}
                                    >
                                        GHC 500
                                    </Typography>
                                </Grid>
                            </Grid>*/}
            </Grid>

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} style={{padding: "7px"}}>
                <div style={{width: "290px"}}>
                    <Paper className={classes.paper}>
                        <Grid container style={{paddingTop: "7px"}}>

                            <Grid item xs={7} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" , paddingLeft: "5px" }} onClick={() => history.push(paths.supplier_detail)}>
                                <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                    <Grid item xs>
                                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                                            Niko's Enterprise
                                        </Typography>
                                        <Typography  style={{fontSize: "0.9rem"}}>
                                            Thur, 27th Dec 2019
                                        </Typography>
                                        <Typography style={{fontSize: "0.8rem"}}>
                                            7:00pm
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={5} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                                <div>
                                    <Typography style={{fontSize: "0.8rem" , color: '#ff5722'}}>
                                        Ghc 500 owned
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        style={{
                                            width: '80%',
                                            'backgroundColor': '#ffff',
                                            borderRadius: '5px',
                                            color: '#DAAB59',
                                            border: '1px solid #DAAB59',
                                            padding: '5px 5px',
                                            fontSize: '11px',
                                            fontWeight: '500',
                                            marginTop: '8px',
                                        }}
                                        className={`capitalization`}
                                        onClick={() => history.push(paths.pay_supplier)}
                                    >
                                        Enter payment
                                    </Button>

                                </div>
                            </Grid>

                        </Grid>
                    </Paper>

                    <Grid container style={{paddingTop: "7px"}}>
                        <Grid item xs={3} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={image} style={{width: "60px" , height: "60px" , borderRadius: "50%"}}></img>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={7} sm container style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px" }} onClick={() => history.push(paths.supplier_detail)}>
                            <Grid item xs container direction="column" spacing={2} style={{textAlign: "left"}}>
                                <Grid item xs>
                                    <Typography style={{fontSize: "0.9rem"}}>
                                        Don Simon
                                    </Typography>
                                    <Typography  style={{fontSize: "0.8rem"}}>
                                        Quantity : 50
                                    </Typography>
                                    <Typography style={{fontSize: "0.7rem"}}>
                                        Cost : Ghc 90
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} sm style={{borderBottom: "1px solid #d8d2d2"}}>
                            <div>
                                <Typography style={{fontSize: "0.8rem" , color: '#ff5722'}}>
                                    Edit
                                </Typography>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: '40px',
                                        backgroundColor: '#ffff',
                                        borderRadius: '5px',
                                        color: '#daab59',
                                        border: '1px solid #daab59',
                                        padding: '5px 5px',
                                        fontSize: '11px',
                                        fontWeight: '500',
                                        marginTop: '8px',
                                    }}
                                    className={classes.button}
                                >
                                    <EditIcon/>
                                </Button>

                            </div>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} sm style={{marginTop: '5px'}}>
                        <div>
                            <Button
                                variant="contained"
                                style={{
                                    width: '80%',
                                    'backgroundColor': '#ffff',
                                    borderRadius: '5px',
                                    border: 'none',
                                    padding: '5px 5px',
                                    fontSize: '11px',
                                    fontWeight: '500',
                                    marginTop: '8px',
                                }}
                                className={`capitalization`}
                            >
                                Total Cost : Ghc 500
                            </Button>

                        </div>
                    </Grid>
                    <Grid container style={{paddingTop: "15px" , paddingBottom : "20px"}}>
                        <Grid item xs={6} sm container style={{padding: "0px 38px" , textDecoration: "underline"}}>

                            <Typography style={{fontSize: "0.8rem" , color: '#daab59' , textAlign : "center"}}>
                                Order again
                            </Typography>

                        </Grid>
                        <Grid item xs={6} sm container style={{padding: "0px 50px" , textDecoration: "underline"}}>

                            <Typography style={{fontSize: "0.8rem" , color: '#daab59' , textAlign : "center"}}
                                        onClick={closeDialogHandler.bind(this)}
                            >
                                Close
                            </Typography>

                        </Grid>
                    </Grid>
                </div>
            </MainDialog>
        </React.Fragment>
    )
}

export default SupplierItemList;
