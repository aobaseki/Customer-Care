import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import SectionNavbars from "../../../../components/Sections/SectionNavbars";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import CallIcon from "@material-ui/icons/Call";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PaidIcon from "@material-ui/icons/Brightness1";
import Button from "@material-ui/core/Button/Button";
import RoundedIcon from '../../../../components/ClickableIcons/RoundedIcon';
import paths from "../../../../utilities/paths";
import Box from "@material-ui/core/Box/Box";
import SingleInvoiceHistory from './singleViews/SingleInvoiceHistory';
import Card from "@material-ui/core/Card/Card";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InvoiceService from "../../../../services/InvoiceService";
import UpdateCustomerModal from "../../../../components/Modal/Customer/UpdateCustomerModal";
import CreditCustomerModal from "../../../../components/Modal/Customer/CreditCustomerModal";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
    }
}));

const CustomerDetails = props => {

    const classes = useStyles();
    const { history } = props;
    const branchCustomer= props.customer[0];
    const [name , setName] = useState('');
    const [number , setNumber] = useState('');
    const [location , setLocation] = useState('');
    const [customer , setCustomer] = useState('');
    const [mainDialog, setMainDialog] = React.useState(false);
    const [invoiceDetails , setInvoiceDetails] = useState(false);
    const [invoices , setInvoices] = useState([]);
    const [updateDialog, setUpdateDialog] = React.useState(false);

    useEffect(() => {
        if (!customer) {
            getCustomer();
        }
    });

    const getCustomer = async () => {
        const newCustomer = await branchCustomer.customer.fetch();
        setCustomer(newCustomer);
        setName(newCustomer.firstName + ' ' + newCustomer.otherNames);
        setNumber(newCustomer.phone);
        setLocation(newCustomer.location);
        console.log(newCustomer);

        const response = await new InvoiceService().getDetailsbyCustomer(newCustomer.id);
        setInvoiceDetails(response);
        setInvoices(response.invoices);
        console.log(response)
    }

    const backHandler = (event) => {
        props.setView(0);
    };

    const deleteHistoryHandler = (cId , event) => {
        props.deleteStoreCustomer(cId , event);
    };

    const setUpdateCustomerHandler = async() => {
        setUpdateDialog(false);
    };

    const openUpdateDialog = (event) => {
        setUpdateDialog(true);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };
    
    return (
        <div>
            <SectionNavbars
                title="Customers"
                leftIcon={
                    <div onClick={backHandler.bind(this)}>
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Paper className={classes.root} >
                <Grid container style={{paddingTop: "7px"}}>
                    <Grid item xs={3}>
                        <Card
                            className="shadow1"
                            style={{
                                margin: '10px auto',  
                                backgroundPosition: 'center', 
                                backgroundSize: 'cover', 
                                width: '50px', 
                                borderRadius: '50%', 
                                height: '50px', 
                                padding: '0px'
                            }}
                        >
                            <AccountCircleIcon style={{position: 'center', marginTop: '8px', fontSize: '2rem'}} />
                        </Card>
                    </Grid>
                    <Grid item xs={5} style={{paddingBottom: "7px", textAlign: "left", paddingTop: "10px" }} direction="column" >  
                        <Typography style={{fontSize: "1rem" , fontWeight: "600"}}>
                            {name}
                        </Typography>
                        <Typography  style={{fontSize: "0.9rem"}}>
                            {number}
                        </Typography>
                    </Grid>

                    <Grid item xs={1} style={{ paddingTop: "10px" }} >
                        <a href={`tel:${number}`} style={{textDecoration: 'none'}}>
                            <RoundedIcon name='Contact'>
                                <CallIcon style={{fontSize: '15px'}}/>
                            </RoundedIcon>
                        </a>
                    </Grid>

                    <Grid item xs={1} style={{ paddingTop: "10px" }} >
                        <RoundedIcon name='Edit' btnStyle={{marginRight: '-12px'}} onClick={openUpdateDialog.bind(this)} >
                            <EditIcon style={{fontSize: '15px'}}/>
                        </RoundedIcon>
                    </Grid>

                    <Grid item xs={1} style={{ paddingTop: "10px" }} >
                        <RoundedIcon name='Delete' btnStyle={{marginRight: '-27px'}} onClick={deleteHistoryHandler.bind(this , branchCustomer.id)} >
                            <DeleteIcon style={{fontSize: '15px'}}/>
                        </RoundedIcon>
                    </Grid>
                </Grid>
            </Paper>

            <UpdateCustomerModal
                openCustomerAddState={updateDialog}
                setCustomer={setUpdateCustomerHandler.bind(this)}
                handleClose={() => setUpdateDialog(false)}
                name={name}
                number={number}
                location={location}
                id={customer.id}
            />

            <CreditCustomerModal
                openCustomerAddState={mainDialog}
                handleClose={() => setMainDialog(false)}
                debt={invoiceDetails.credit}
            />

            <Grid container spacing={2} style={{marginBottom: '10px'}} >

                <Grid container style={{paddingTop: "15px"}}>
                    <Grid item xs={6} sm container style={{borderBottom: "1px solid #d8d2d2" , padding: "5px 13px"}}>

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#ffff' , padding: '5px 5px', height: '55px'}}
                            disabled
                        >
                            <Grid container>
                                <Grid item xs={12} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "0.7rem" , fontWeight: "600"}}>
                                        View orders
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "0.8rem"}}>
                                        <PaidIcon style={{color: 'red' , fontSize: '8px'}}/> Order pending
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm container style={{borderBottom: "1px solid #d8d2d2" , padding: "5px 13px" }}>

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#ffff' , padding: '5px 5px', height: '55px'}}
                            onClick={invoiceDetails.credit < 0
                                ?
                                openDialogHandler.bind(this)
                                :
                                ''
                            }
                        >
                            <Grid container>
                                <Grid item xs={12} spacing={2} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "0.7rem" , fontWeight: "600"}}>
                                        View credit
                                        </Typography>
                                </Grid>
                                <Grid item xs={12} spacing={2} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "0.8rem"}}>
                                        <PaidIcon style={{color: 'red' , fontSize: '8px'}}/> GHC {invoiceDetails.credit} owing
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>


                </Grid>

                <Grid container>
                    <Grid item xs={12} sm container style={{paddingBottom: "7px" , padding: "15px 1px 1px 1px"  , marginLeft: '25%'}}>

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#ffff' , padding: '5px 15px', height: '55px' , width: '70%', textTransform: 'none'}}

                        >
                            <Grid container>
                                <Grid item xs={12} spacing={2} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "13px"}}>
                                        Total amount bought
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} spacing={2} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "17px", fontWeight: "600"}}>
                                        GHC {invoiceDetails.sellingPrice}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>

                </Grid>
            </Grid>

            <Paper style={{padding: "2px 10px"}}>
                <Grid container style={{paddingTop: "7px"}}>
                    <Grid item xs={12} direction="column" style={{borderBottom: "1px solid #d8d2d2" , paddingBottom: "7px", textAlign: "center" }}>
                        <Typography  style={{fontSize: "1.2rem" , fontWeight: "600"}}>
                            Invoice History
                        </Typography>
                    </Grid>
                </Grid>

                {invoices.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}  style={{borderBottom: "1px solid #d8d2d2" }}>
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
                                    No history available
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :
                    <div>
                        
                        {invoices.slice(0, 2).map((invoice) => <SingleInvoiceHistory  key={invoice.id} invoice={invoice} />)}

                        <Grid container style={{padding: "7px 0px"}}>
                            <Grid item xs={12} style={{textAlign: "center"}}>
                                    <Typography  style={{fontSize: "1rem" , textDecoration: "underline" , color: "#DAAB59"}}
                                        onClick={() => history.push(paths.invoice_history)}
                                    >
                                        View more
                                    </Typography>
                            </Grid>
                        </Grid>
                    </div>
                } 

            </Paper>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
            >

                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none'}}
                    onClick={() => history.push(paths.sell)}
                >
                    New Order
                </Button>
            </Box>

        </div>
    )

}

export default withRouter(CustomerDetails);