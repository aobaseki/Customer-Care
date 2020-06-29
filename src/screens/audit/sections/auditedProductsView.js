import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {makeStyles} from "@material-ui/core";
import AddedProductSingle from "./viewAdded/AddedSingleView";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Drawer from "../../../components/Drawer/Drawer";
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";
import {confirmAlert} from "react-confirm-alert";
import SearchInput from "../../Components/Input/SearchInput";

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
    select: {
        width: '100%',
        display: 'flex',
        padding: '2px 0px',
        alignItems: 'center',
        borderRadius: '2px',
        height: '35px',
        border: '0.5px solid #333333',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        //marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

const AuditedProductsView = props => {
    const [type, setType] = useState('all');
    const [isDrawerShow , setIsDrawerShow] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [loading , setLoading] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [error , setError] = useState(false);
    const [searchValue , setSearchValue] = useState({
        search: ''
    });

    const handleTypeChange = event => {
        setType(event.target.value);
        props.changeAuditedProductsType(event.target.value)
    };

    const backHandler = (event) => {
        props.setView(0);
    };

    const balanceAll = async (event) => {
        setLoading(true);

        await confirmAlert({
            title: 'Confirm to balance all',
            message: 'Are you sure you want to balance all products.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const response = await props.balanceAllHandler();
                        if(response){
                            setSuccessDialog(true);

                            setTimeout(function(){
                                setSuccessDialog(false);
                                setLoading(false);
                                props.setView(0)
                            }, 2000);
                        }else{
                            setErrorMsg('OOPS. Something went wrong please try again');
                            setError(true);
                            setTimeout(function(){
                                setError(false);
                            }, 3000);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        setLoading(false);
                        return false;
                    }
                }
            ]
        })

       /* await props.balanceAllHandler();

        setSuccessDialog(true);

        setTimeout(function(){
            setSuccessDialog(false);
            setLoading(false);
            props.setView(0)
        }, 2000);*/
        /*if(status){

        }else{
            setErrorMsg('OOPS. Something went wrong please try again');
            setError(true);
            setTimeout(function(){
                setError(false);
            }, 3000);
        }*/
    };

    const editProductHandler = (pId , event) => {
        //props.productEdit(pId , 3);
    };

    const setInputValue = (name , value) => {
        const {...oldFormFields} = searchValue;

        oldFormFields[name] = value;

        setSearchValue(oldFormFields);

        props.searchAuditedHandler(value);
    };

    const classes = useStyles();

    return(
        <div>
            <SectionNavbars
                title="Audit"
                leftIcon={
                    <div onClick={backHandler.bind(this)} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

            <SimpleSnackbar
                openState={successDialog}
                message={`Audit successfully completed`}
            >
            </SimpleSnackbar>

            <SimpleSnackbar
                type="warning"
                openState={error}
                message={errorMsg}
            >
            </SimpleSnackbar>

            <div className="row p-0 pt-0 mx-0 mt-6 text-center shadow1">
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontSize: '18px' , margin: '0px 0px', paddingTop: '5px' , paddingBottom: '5px'}}
                    className={`text-center mx-auto w-100 text-dark font-weight-bold`}
                >
                    {`Items added : (${props.auditEntries.length})` }
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={6} style={{padding: '4px 8px'}}>
                        <SearchInput
                            inputName="search"
                            getValue={setInputValue.bind(this)}
                        />
                    </Grid>

                    <Grid item xs={6} style={{padding: '4px 8px'}}>
                        <Paper className={classes.select} >
                            <Select
                                value={type}
                                onChange={handleTypeChange}
                                style={{width: '100%' , backgroundColor: 'rgba(255, 255, 255, 0)' , border: 'none'}}
                            >
                                <MenuItem value="all">All products</MenuItem>
                                <MenuItem value="positive">Positive difference</MenuItem>
                                <MenuItem value="negative">Negative difference</MenuItem>
                                <MenuItem value="zero">Zero difference</MenuItem>
                            </Select>
                        </Paper>
                    </Grid>
                </Grid>
            </div>


            <div style={{width: '95%', padding: '0px 2%' , paddingTop: '5px', paddingBottom: '60px'}}>

                <Box style={{marginTop: '2px' , paddingBottom: '60px'}} p={1} className={`mt-3 mb-5`}>
                    {props.auditEntries.map((item) => <AddedProductSingle deleteAuditProductEntry={props.deleteProductHandler} editAuditProductEntry={props.productAdd} editStoreProduct={editProductHandler.bind(this)} key={item.id} product={item.product.fetch()} item={item}/>)}
                </Box>
            </div>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={6} >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                            onClick={backHandler.bind(this)}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px'}}
                            onClick={balanceAll.bind(this)}
                            disabled={loading}
                        >
                            Balance all
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default withRouter(AuditedProductsView);
