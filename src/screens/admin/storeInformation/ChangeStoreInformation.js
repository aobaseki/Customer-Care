import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import {makeStyles, withStyles} from "@material-ui/core";
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import paths from "../../../utilities/paths";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl/FormControl";
import LocationModal from '../../../components/Modal/option/LocationModal';
import Select from "@material-ui/core/Select/Select";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: '60px',
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

const AddBranch = props => {

    const { history } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [categories ] = useState([]);
    const [value, setValue] = React.useState('wholesale');
    const formRef = React.createRef('form');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleFormValidation = (result) => {
        props.isValid(result);
    };



    return (
        <div>

            <SectionNavbars
                title="Shop information"
                leftIcon={
                    <div onClick={() => history.goBack()} >
                        <ArrowBackIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <Paper style={{marginTop: '60px', marginBottom: '10px'}} >
                <Grid container spacing={2} style={{marginTop: '10px'}} className={`pt-2`}>
                    <Grid item xs={11} style={{padding: '10px'}} className={`mx-auto mt-7`}>
                        <Typography className='text-dark font-weight-bold' style={{ fontSize: '17px'}} >
                            Select a field to edit
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <div>
                <Paper style={{padding: "0px 30px 50px 30px"}}>
                    <ValidatorForm
                        ref={formRef}
                        onError={handleFormValidation}
                        instantValidate
                    >
                        <Grid item xs={12} style={{paddingTop: '20px' , textAlign: "left"}}>
                            <Typography style={{fontSize: "17px" , paddingBottom: "5px"}}>
                                Shop name
                            </Typography>
                            <ValidationTextField
                                required
                                variant="outlined"
                                name="companyName"
                                id="storeName"
                                validators={['required', 'minStringLength:3']}
                                errorMessages={['Company name is a required field', 'Company name should be more than 3']}
                                helperText=""
                                validatorListener={handleFormValidation}
                                style={{width: "100%"}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: '10px' , paddingBottom: '15px' , textAlign: "left"}}>
                            <Typography style={{fontSize: "17px" , paddingBottom: "5px"}}>
                                Location
                            </Typography>
                            <ValidationTextField
                                className={classes.margin}
                                required
                                variant="outlined"
                                name="location"
                                id="storeName"
                                validators={['required', 'minStringLength:3']}
                                errorMessages={['Company name is a required field', 'Company name should be more than 3']}
                                helperText=""
                                validatorListener={handleFormValidation}
                                style={{width: "100%"}}
                            />
                        </Grid>
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '10px 50px'}}
                            className={classes.button}
                            type="button" onClick={handleOpen}
                        >
                            Use current location
                        </Button>
                        <br /><hr style={{marginTop: "30px" , border: "0.7px solid #efebeb"}}/>

                        <Grid item xs={12} className={classes.margin} style={{paddingBottom: '1px' , textAlign: "left" , marginTop: "10px"}}>
                            <FormControl variant="outlined" className={classes.formControl} style={{width: "100%"}}>
                                
                                <Typography style={{fontSize: "17px", paddingBottom: "5px", marginTop: '10px'}}>
                                    My shop is a
                                </Typography>
                                <ValidationSelectField
                                    native
                                    
                                    inputProps={{
                                        name: 'storeCategory',
                                        id: 'storeCategory',
                                    }}
                                    className={classes.select}
                                    style={{width: "100%" , height: "40px"}}
                                >
                                    <option value={0}> </option>
                                    {categories.map((category) =>
                                        <option value={category.id}>{category.name}</option>
                                    )}
                                </ValidationSelectField>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} className={classes.margin} style={{textAlign: "left" , marginTop: "15px"}}>
                            <FormControl component="fieldset">
                                <Typography style={{fontSize: "17px" , paddingBottom: "5px"}}>
                                    We deal in:
                                </Typography>
                                <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
                                    <FormControlLabel
                                        value="wholesale"
                                        control={<Radio color="#daab59" />}
                                        label="Wholesale"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="Retail"
                                        control={<Radio color="#daab59" />}
                                        label="Retail"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="Both"
                                        control={<Radio color="#daab59" />}
                                        label="Both"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </ValidatorForm>
                </Paper>

                <LocationModal openLocation={open} handleClose={handleClose} />


            </div>

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '3.0rem', position: "fixed", bottom:"1px", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 45px', marginRight: '10px', textTransform: 'Capitalize'}}
                    onClick={() => history.push(paths.admin)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'Capitalize'}}
                    //onClick={openAddDialog.bind(this)}
                >
                    Save
                </Button>
            </Box>


        </div>
    )
}

export default withRouter(AddBranch);