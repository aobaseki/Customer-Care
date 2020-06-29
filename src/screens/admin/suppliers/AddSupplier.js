import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import paths from "../../../utilities/paths";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {makeStyles, withStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import PersonIcon from '@material-ui/icons/Person';
import CallIcon from '@material-ui/icons/Call';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import ShopIcon from '@material-ui/icons/Storefront';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from "@material-ui/core/InputLabel";
import entities from "../../../config/supplierEntities";
import SupplierService from "../../../services/SupplierService";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PrimaryLoader from "../../../components/Loader/Loader";
import SimpleSnackbar from "../../../components/Snackbar/SimpleSnackbar";

const PrimaryCheckbox = withStyles({
    root: {
        color: '#333',
        '&$checked': {
            color: '#DAAB59',
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    primaryColor: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: '#FFFFFF',
        backgroundColor: '#DAAB59',
    },
    dropList: {
        margin: '0 auto',
        width: '90%',
        maxHeight: '300px',
        overflowY: 'scroll',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #cacaca96',
        borderRadius: '5px',
    },
    select: {
        '&:before': {
            borderColor: '#DAAB59',
        },
        '&:hover:not(.Mui-disabled):before': {
            borderColor: '#DAAB59',
        },
    },
    formControl: {
        margin: theme.spacing(3),
    },
    formControl1: {
        margin: theme.spacing(1),
        minWidth: '90%',
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

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid:not:focus + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:invalid:focus + fieldset': {
            borderColor: '#DAAB59',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            borderColor: '#DAAB59',
            padding: '4px !important', // override inline-style
        },
    },
})(TextValidator);

const ValidationSelectField = withStyles({
    root: {
        '& select:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& select:invalid:not:focus + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& select:invalid:focus + fieldset': {
            borderColor: '#DAAB59',
            borderWidth: 2,
        },
        '& select:valid:focus + fieldset': {
            borderLeftWidth: 6,
            borderColor: '#DAAB59',
            padding: '4px !important', // override inline-style
        },
    },
})(Select);

const AddSupplier = props => {
    const entityTypes = entities.entities;

    const { history } = props;
    const [daysShow , setDaysShow] = useState(false);
    const [loading , setLoading] = useState(false);
    const [btnState , setBtnState] = useState(true);
    const [showSuppliers , setShowSuppliers] = useState(false);
    const [suppliersSearch , setSupplierSearch] = useState([]);
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [successMsg , setSuccessMsg] = useState('');

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect(() => {
        if(suppliersSearch.length === 0 ){
            getSuppliers();
        }
    }, []);

    const getSuppliers = async () => {
        //console.log(await SupplierService.getSuppliers(entityTypes[0].entity))
        //setSupplierSearch(await SupplierService.supplierAggregator());
        setSupplierSearch(await SupplierService.getSuppliers(entityTypes[0].entity));
    };

    const [deliveryDays, setDeliveryDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
        Everyday: false,
    });

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [formFields , setFormFields] = useState({
        entityType: entityTypes[0].entity,
        entityId: '',
        entityName: entityTypes[0].name,
        name: '',
        contact: '',
        salespersonName: '',
        salespersonContact: '',
        deliveryDays: deliveryDays,
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormValidation = (result) => {
        props.isValid(result);
    };

    const handleDeliveryDaysChange = (event) => {
        let days = {};
        if(event.target.name === 'Everyday' && event.target.checked){
            days = {
                Monday: true,
                Tuesday: true,
                Wednesday: true,
                Thursday: true,
                Friday: true,
                Saturday: true,
                Sunday: true,
                Everyday: true,
            };

            setDeliveryDays(days);
        }else{
            days = { ...deliveryDays, [event.target.name]: event.target.checked };
            setDeliveryDays(days);
        }

        const { ...formData }  = formFields;
        formData['deliveryDays'] = days;
        setFormFields(formData);
    };

    const handleChangeHandler = (event) => {
        setShowSuppliers(false);
        const { ...formData }  = formFields;
        formData[event.target.name] = event.target.value;
        setFormFields(formData);

        if(event.target.name === 'contact'){
            if((formFields.name).length > 2 && (event.target.value).length > 9){
                setBtnState(false);
            }else{
                setBtnState(true);
            }
        }
    };

    const handleClientTypeChange = async (event) => {
        //console.log(await SupplierService.getSuppliers('Customer'))
        handleChangeHandler(event);
        setSupplierSearch(await SupplierService.getSuppliers(event.target.value));
    };

    const handleNameTypeChange = async (event) => {
        event.persist();
        //handleChangeHandler(event);
        const { ...formData }  = formFields;
        formData['name'] = event.target.value;
        formData['entityId'] = '';
        formData['contact'] = '';
        setFormFields(formData);

        if((event.target.value).length > 0){
            let suppliers = await SupplierService.getSuppliers(formFields.entityType);

            console.log(suppliers)
            suppliers = suppliers.filter(function(item) {
                return (item.name).toLowerCase().indexOf((event.target.value).toLowerCase()) !== -1
            });

            if(suppliers.length > 0){
                setSupplierSearch(suppliers);
                setShowSuppliers(true);
            }else{
                setShowSuppliers(false);
            }
        }else{
            setShowSuppliers(false);
        }
    };

    const setSupplierItem = (item) => {
        const { ...formData }  = formFields;
        formData['name'] = item.name;
        formData['entityId'] = item.id;
        formData['entityName'] = item.entityName;
        formData['contact'] = item.contact;
        setFormFields(formData);

        if(item.name.length > 2 && (item.contact).length > 9){
            setBtnState(false);
        }else{
            setBtnState(true);
        }
        setShowSuppliers(false);
    };

    /*const setBtnNextState = () => {
        if(formFields.name.length > 2 && formFields.contact.length > 9){
            setBtnState(false);
        }else{
            setBtnState(true);
        }
    };*/

    const addNewSupplier = async() => {
        setLoading(true);
        const supplier = await new SupplierService().addSupplier(formFields);

        if(supplier){
            setSuccessMsg('Supplier added to branch');
            setSuccess(true);
            setTimeout(function(){
                setSuccessMsg('');
                setSuccess(false);
            }, 2000);
            history.push(paths.add_supplier_stock)
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

    const formRef = React.createRef('form');
    const { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Everyday } = deliveryDays;

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
                    title="Suppliers"
                    leftIcon={
                        <div onClick={() => history.push(paths.view_suppliers)}>
                            <ArrowBackIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                />

                <div style={{ position: "fixed", top:"60px", width:"100%" , zIndex: '1000'}}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography style={{fontSize: "1.4rem" , fontWeight: "500"}}>
                                            Supplier Information
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                <div className={`mt-7 pt-6`}>
                    <ValidatorForm
                        ref={formRef}
                        onError={handleFormValidation}
                        className={classes.root}
                        instantValidate
                    >
                        <div className="row p-3 pt-0 mx-auto text-center w-100">
                            <div className="text-center mx-auto">
                                <FormControl variant="outlined" className={classes.formControl1}>
                                    <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                                        Client Type:
                                    </InputLabel>
                                    <ValidationSelectField
                                        //label="Client Type"
                                        onChange={handleClientTypeChange}
                                        value={formFields.entityType}
                                        labelWidth={labelWidth}
                                        inputProps={{
                                            name: 'entityType',
                                            id: 'entityType',
                                        }}
                                        className={classes.select}
                                    >
                                        {entityTypes.map((entity , index) =>
                                            <option key={index} value={entity.entity}>{entity.name}</option>
                                        )}
                                    </ValidationSelectField>
                                </FormControl>
                            </div>

                            <div className="text-center mx-auto my-2">
                                <TextField
                                    onChange={handleNameTypeChange}
                                    className={classes.formControl1}
                                    type="text"
                                    variant="outlined"
                                    label="Company name*"
                                    name="name"
                                    value={formFields.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ShopIcon style={{color: '#333333'}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {
                                    showSuppliers ?
                                        <List className={classes.dropList} dense={true} >
                                            {
                                                suppliersSearch.map((item) =>
                                                    <ListItem key={item.id} onClick={() => setSupplierItem(item)}>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                className={classes.primaryColor}
                                                            >
                                                                <Typography
                                                                    component="p"
                                                                    variant="h6"
                                                                    style={{fontWeight: '700', fontSize: '1.00rem'}}
                                                                >
                                                                    {(item.name).charAt(0).toUpperCase()}
                                                                </Typography>
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={item.name} secondary={(item.entityName + `${item.contact ? ' - ' + item.contact : ''}`).trim()} />
                                                    </ListItem>
                                                )
                                            }
                                        </List>
                                        :
                                        ''
                                }

                            </div>

                            <div className="text-center mx-auto my-2">
                                <TextField
                                    className={classes.formControl1}
                                    type="text"
                                    variant="outlined"
                                    name="contact"
                                    value={formFields.contact}
                                    label="Company contact*"
                                    onChange={handleChangeHandler}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CallIcon style={{color: '#333333'}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="text-center mx-auto my-2">
                                <TextField
                                    className={classes.formControl1}
                                    label="Salesperson"
                                    name="salespersonName"
                                    onChange={handleChangeHandler}
                                    value={formFields.salespersonName}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon style={{color: '#333333'}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <div className="text-center mx-auto my-2">
                                <TextField
                                    className={classes.formControl1}
                                    label="Supplier Contact"
                                    name="salespersonContact"
                                    onChange={handleChangeHandler}
                                    value={formFields.salespersonContact}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CallIcon style={{color: '#333333'}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            {
                                daysShow ?
                                    <div
                                        className={`mt-4`}
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            marginBottom: '5px' ,
                                            border: '1px solid #e5e5e5',
                                            borderRadius: '2px',
                                            padding: '10px'
                                        }}
                                    >
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <Typography
                                                component="h6"
                                                variant="h6"
                                                style={{
                                                    fontWeight: '500',
                                                    fontSize: '1.1rem',
                                                    marginTop: '-47px',
                                                    backgroundColor: '#FFF',
                                                    minWidth: '200px',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                Enter delivery days
                                            </Typography>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<PrimaryCheckbox checked={Monday} onChange={handleDeliveryDaysChange} name="Monday" />}
                                                    label="Monday"
                                                />
                                                <FormControlLabel
                                                    control={<PrimaryCheckbox checked={Tuesday} onChange={handleDeliveryDaysChange} name="Tuesday" />}
                                                    label="Tuesday"
                                                />
                                                <FormControlLabel
                                                    control={<PrimaryCheckbox checked={Wednesday} onChange={handleDeliveryDaysChange} name="Wednesday" />}
                                                    label="Wednesday"
                                                />
                                                <FormControlLabel
                                                    control={<PrimaryCheckbox checked={Thursday} onChange={handleDeliveryDaysChange} name="Thursday" />}
                                                    label="Thursday"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<PrimaryCheckbox checked={Friday} onChange={handleDeliveryDaysChange} name="Friday" />}
                                                    label="Friday"
                                                />
                                                <FormControlLabel
                                                    control={<PrimaryCheckbox checked={Saturday} onChange={handleDeliveryDaysChange} name="Saturday" />}
                                                    label="Saturday"
                                                />
                                                <FormControlLabel
                                                    control={<PrimaryCheckbox checked={Sunday} onChange={handleDeliveryDaysChange} name="Sunday" />}
                                                    label="Sunday"
                                                />
                                                <FormControlLabel
                                                    control={<PrimaryCheckbox checked={Everyday} onChange={handleDeliveryDaysChange} name="Everyday" />}
                                                    label="Everyday"
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </div>
                                :
                                    <Button
                                        style={{
                                            width: '75%',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '5px',
                                            color: '#333333',
                                            padding: '7px 12px',
                                            margin: '5px auto',
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            marginBottom: "20px",
                                            border: '2px solid #e5e5e5',
                                            textDecoration: 'capitalize'
                                        }}
                                        className={classes.formControl1}
                                        onClick={() => setDaysShow(true)}
                                    >
                                        <CalendarIcon style={{color: '#333333' , paddingRight: '15px' , fontSize: '40px'}} /> Enter delivery days
                                    </Button>
                            }
                        </div>

                        <Grid item xs={12} className={classes.margin} style={{textAlign: "left" , marginTop: "15px"}}>

                        </Grid>
                    </ValidatorForm>
                </div>
                <div>
                    <Box
                        boxShadow={1}
                        p={1}
                        style={{backgroundColor: '#ffffff', zIndex: '1000', position: "fixed", bottom:"0", width:"100%" }}
                    >

                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                            className={classes.button}
                            onClick={addNewSupplier}
                            disabled={btnState}
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
                                    'Next'
                            }
                        </Button>
                    </Box>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Paper style={{padding: "10px 0px 0px 0px" , width: "90%"}}>
                            <div>
                                <div style={{textAlign: "center", padding: "10px"}}>
                                    <LocationOnIcon style={{fontSize: '3.2rem' , color: "#DAAB59"}}/>

                                    <h2 id="transition-modal-title">Your current location is</h2>
                                </div>
                                <div className="shadow1" style={{borderRadius: "20px 20px 0px 0px" , padding: "10px" , textAlign: "center"}}>
                                    <div style={{paddingTop: "15px" ,paddingBottom: "3px"}}>
                                        <span>_______________________________</span>
                                        <br />

                                    </div>
                                    <Grid container style={{paddingTop: "12px" ,paddingBottom: "3px"}}>
                                        <Grid item xs={6} style={{textAlign: "center"}}>
                                            <Button
                                                variant="outlined"
                                                style={{border: '1px solid #DAAB59', color: '#DAAB59', fontSize : "13px" ,padding: '7px 5px' , width: "90%"}}
                                                className={classes.button}
                                                onClick={handleClose}
                                            >
                                                No, Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} style={{textAlign: "center"}}>

                                            <Button
                                                variant="outlined"
                                                style={{'backgroundColor': '#DAAB59' , fontSize : "13px", color: '#333333', border: '1px solid #DAAB59', padding: '7px 5px' , width: "100%"}}
                                                className={classes.button}
                                            >
                                                Yes, it is correct
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </div>
                            </div>
                        </Paper>
                    </Fade>
                </Modal>
            </React.Fragment>
        </div>
    );
};

export default withRouter(AddSupplier);
