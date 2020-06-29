import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import { useDatabase } from "@nozbe/watermelondb/hooks";

import paths from "../../../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles} from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalInfo from '../../../../../services/LocalInfo';
import Box from "@material-ui/core/Box/Box";
import warehouseImg from "../../../../../assets/img/warehouse.png";
import Button from "@material-ui/core/Button/Button";
import BoxDefault from "../../../../../components/Box/BoxDefault";
import PriceInput from "../../../../../components/Input/PriceInput";
import SectionNavbars from "../../../../../components/Sections/SectionNavbars";
import Modal from "../../../../../components/Modal/Modal";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import InputBase from "@material-ui/core/InputBase/InputBase";
import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import SupplierService from "../../../../../services/SupplierService";
import PrimaryLoader from "../../../../../components/Loader/Loader";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    inputRoot: {
        width: '90%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '5px',
        height: '50px',
        border: '1px solid #333333',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        textAlign: 'center',
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
        'border-radius': '10px !important',
    },

    'input:focus': {
        backgroundColor: '#daab59',
    }
}));

const PaySupplierOrder = props => {
    const classes = useStyles();
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');
    const [loading , setLoading] = useState(false);

    const [formFields , setFormFields] = useState({
        amountPaid: 0,
        salesperson: 0,
    });

    const { history } = props;

    if (LocalInfo.storeId && LocalInfo.userId) {
        history.push(paths.home);
    }

    const setInputValue = (event) => {
        const {...oldFormFields} = formFields;

        oldFormFields[event.target.name] = (event.target.value);

        setFormFields(oldFormFields);
    };

    const makePayment = async () => {
        console.log(formFields)
        setLoading(true);
        const response = await new SupplierService().makePaymentInstallments(formFields);

        if(response){
            setSuccessMsg('Stock added successfully');
            setSuccess(true);
            setTimeout(function(){
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);
            history.push(paths.view_suppliers)
        }else{
            setErrorMsg('OOPS. Something went wrong. Please try again');
            setError(true);
            setTimeout(function(){
                setErrorMsg('');
                setError(false);
            }, 2000);
        }
        setLoading(false);
    };

    return (
        <div style={{height: '100vh'}}>
           <React.Fragment>
                <CssBaseline />

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

               <SectionNavbars
                   title="Payment"

                   leftIcon={
                       <div onClick={() => props.setView(2)}>
                           <ArrowBackIcon
                               style={{fontSize: '2rem'}}
                           />
                       </div>
                   }
               />

                <div className="getStarted">
                    <div style={{minHeight: "100px"}}>
                        _
                    </div>
                    <Box component="div">
                        <img className="img100" src={warehouseImg} alt={'Add warehouse'}/>
                    </Box>
                    <div>
                        <Typography
                            component="h5"
                            variant="h5"
                            style={{
                                width: '95%',
                                backgroundColor: '#ffffff',
                                border: '1px solid #333333',
                                padding: '20px 12px',
                                margin: '15px auto',
                                fontSize: '18px',
                                fontWeight: '600',
                                marginBottom: "10px"
                            }}
                            className={`text-center mx-auto text-dark shadow1`}
                        >
                            Total cost price : GHC {props.stockTotalAmount}
                        </Typography>

                        <p style={{fontSize: '26px', fontWeight: '500', color: '#333333',width: '85%', margin: '10px auto' , marginTop: '30px'}}>
                            Enter amount paid
                        </p>

                        <Grid container spacing={1} className={`mb-2`}>
                            <Grid item xs={6} className={`mx-auto`}>
                                <Paper className={classes.inputRoot} >
                                    <InputBase
                                        className={`${classes.input} search-box text-center`}
                                        type="tel"
                                        value={formFields.amountPaid}
                                        name="amountPaid"
                                        onChange={(event) => setInputValue(event)}
                                    />

                                </Paper>
                            </Grid>
                        </Grid>
{/*
                        <PriceInput inputName="totalCost" initialValue={formFields.totalCost} getValue={setInputValue.bind(this)} />
*/}

                        {/*<Button
                            style={{
                                width: '100%',
                                backgroundColor: '#ffffff',
                                border: '1px solid #black',
                                padding: '10px 12px',
                                margin: '5px auto',
                                fontSize: '18px',
                                fontWeight: '500',
                                marginBottom: "10px"
                            }}
                        >
                            Total cost price : GHC {props.stockTotalAmount}
                        </Button>*/}

                        <BoxDefault
                            styles={{
                                color: '#333333',
                                bottom: '0',
                                minHeight: '4.5rem',
                                position: 'fixed',
                                padding: '0px',
                                margin: '0px',
                                left: 0,
                                right: 0,
                                width: '100%',
                            }}
                        >
                            <Button
                                variant="contained"
                                style={{
                                    width: '60%',
                                    backgroundColor: '#DAAB59',
                                    borderRadius: '7px',
                                    color: '#333333',
                                    padding: '10px 12px',
                                    margin: '10px auto',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                }}
                                onClick={makePayment}
                            >
                                {
                                    loading ?
                                        <PrimaryLoader
                                            style={{width: '30px' , height: '30px'}}
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
                        </BoxDefault>
                    </div>
                </div>
            </React.Fragment>
        </div>
    );
};

export default withRouter(PaySupplierOrder);
