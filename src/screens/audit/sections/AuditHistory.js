import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SectionNavbar from '../../../components/Sections/SectionNavbars';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';

import SingleAuditView from './auditHistory/SingleAuditView';
import AuditService from '../../../services/AuditService';
import {confirmAlert} from "react-confirm-alert";
import ModelAction from "../../../services/ModelAction";
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '50px',
    }
}));

const AuditHistory = props => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [auditList , setAuditList] = useState([]);
    const [purchaseDetails , setPurchaseDetails] = useState(false);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');

    const handleDateChange = date => {
        setSelectedDate(date);
        getAuditDetails(date);
    };

    useEffect(() => {
        if (!purchaseDetails) {
            getAuditDetails(selectedDate);
        }
    });

    const getAuditDetails = async (date) => {
        const response = await AuditService.getAuditHistory(date);
        setAuditList(response);
        setPurchaseDetails(true);
        console.log(response)
        console.log(response)
    };

    const setView = (view) => {
        props.setView(view);
    };

    const auditProducts = (id) => {
        console.log(id);
        props.auditProducts(id, 4);
    };

    const deleteAuditProduct = async (pId) => {
        await confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await new ModelAction('Audits').softDelete(pId);

                            setSuccessMsg('Audit entry deleted successfully');
                            setSuccess(true);
                            getAuditDetails(selectedDate);
                            setTimeout(function(){
                                setSuccessMsg('');
                                setSuccess(false);
                            }, 2000);

                            return true;
                        } catch (e) {
                            setErrorMsg('OOPS. Something went wrong. Please try again');
                            setError(true);
                            setTimeout(function(){
                                setErrorMsg('');
                                setError(false);
                            }, 2000);
                            return false;
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return false;
                    }
                }
            ]
        })
    };


    return(
        <div>
            <SectionNavbar
                title="Audit History"
                leftIcon={
                    <div onClick={setView.bind(this , 0)}>
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

            <Grid container spacing={1} className={classes.root} justify="space-around" >

                {/* <Date style={{width: '150px', border: '1px solid #DAAB59'}}/> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="outlined"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker"
                        className='text-dark font-weight-bold'
                        style={{float: 'right', width: '150px',  border: '1px solid #010202', backgroundColor: '#FFFFFF'}}
                        size='small'
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

            </Grid>

            <Box style={{ paddingBottom: '60px'}} p={1} className={`mt-3 mb-5 mx-2`}>
                {/* {props.auditDates.map((item) => <SingleAuditView  key={item.date_id} dateAudited={item}  setView={props.setView}/>)} */}

                {auditList.length === 0
                    ?
                    <div className={`rounded mx-1 my-2 p-2 bordered`}>
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
                                    No audits
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    :

                    auditList.map((audit) => <SingleAuditView  key={audit.id} audit={audit} setView={props.setView} auditProducts={auditProducts.bind(this, audit.id)} deleteAuditEntry={deleteAuditProduct.bind(this)} />)
                }

            </Box>

            {/*<Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#333333', padding: '5px 50px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                            onClick={setView.bind(this , 0)}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 20px', textTransform: 'none', fontSize:'17px'}}
                        >
                            Balance all
                        </Button>
                    </Grid>
                </Grid>
            </Box>*/}

        </div>

    )
}

export default withRouter(AuditHistory);
