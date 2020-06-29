import MainDialog from "../../Dialog/MainDialog";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import PersonIcon from '@material-ui/icons/Person';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from "@material-ui/core/Button/Button";
import React, {useState} from "react";
import CustomerService from "../../../services/CustomerService";


const UpdateCustomerModal = props => {
    const [formFields , setFormFields] = useState({
        firstName: '',
        location: '',
        otherNames: '',
        phone: '',
    });
    const [btnState , setBtnState] = useState(false);

    const setInputValue = async(event) => {
        const name = event.target.name;
        const value = event.target.value;

        const {...oldFormFields} = formFields;

        if(name === 'name'){
            const nameSplit = value.split(' ');
            oldFormFields['otherNames'] = nameSplit.slice(1 , nameSplit.length).join(' ');
            oldFormFields['firstName'] = nameSplit[0];
        }else{
            oldFormFields[name] = value;
        }

        if((oldFormFields.firstName !== '' || oldFormFields.firstName !== null) && (oldFormFields.phone !== '' && oldFormFields.phone !== null) && (oldFormFields.location !== '' && oldFormFields.location !== null)){
            setBtnState(true);
        }

        setFormFields(oldFormFields);
    };

    const openState = props.openCustomerAddState;

    const addCustomerHandler = async () => {
        await new CustomerService().updateCustomer(props.id, formFields);

        props.setCustomer();
    };

    return (
        <div>
            <MainDialog handleDialogClose={props.handleClose} states={openState} >
                <div className="row p-3 pt-0 mx-auto text-center w-100" >

                    <Typography
                        component="h2"
                        variant="h5"
                        style={{fontSize: '18px' , paddingBottom: '20px'}}
                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-bold`}
                    >
                        Update customer
                    </Typography>

                    <div className="text-center mx-auto">
                        <TextField
                            label="Name"
                            variant="outlined"
                            onChange={setInputValue.bind(this)}
                            name={`name`}
                            defaultValue={props.name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon style={{color: '#DAAB59'}} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className="text-center mx-auto my-3">
                        <TextField
                            type="number"
                            variant="outlined"
                            label="Contact"
                            name={`phone`}
                            onChange={setInputValue.bind(this)}
                            defaultValue={props.number}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CallIcon style={{color: '#DAAB59'}} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className="text-center mx-auto my-3">
                        <TextField
                            label="Location"
                            variant="outlined"
                            name={`location`}
                            onChange={setInputValue.bind(this)}
                            defaultValue={props.location}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocationOnIcon style={{color: '#DAAB59'}} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className="text-center mx-auto my-3">
                        <Button
                            variant="outlined"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 58px', textTransform: 'none', fontSize:'17px'}}
                            onClick={addCustomerHandler.bind(this)}
                            disabled={!btnState}
                        >
                            Finish
                        </Button>
                    </div>

                </div>
            </MainDialog>
        </div>
    )
};

export default UpdateCustomerModal;
