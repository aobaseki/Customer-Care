import MainDialog from "../../Dialog/MainDialog";
import PersonIcon from '@material-ui/icons/Person';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from "@material-ui/core/Button/Button";
import React, {useState} from "react";
import CustomerService from "../../../services/CustomerService";
import SimpleSnackbar from "../../Snackbar/SimpleSnackbar";
import PrimaryTextField from "../../Input/TextField";

const AddCustomerModal = props => {
    const [formFields , setFormFields] = useState({
        firstName: '',
        location: '',
        otherNames: '',
        phone: '',
    });
    const [btnState , setBtnState] = useState(false);
    const [error , setError] = useState(false);
    const [errorMsg , setErrorMsg] = useState('');

    const setInputValue = async(name , value) => {
        const {...oldFormFields} = formFields;

        if(name === 'name'){
            const nameSplit = value.split(' ');
            oldFormFields['otherNames'] = nameSplit.slice(1 , nameSplit.length).join(' ');
            oldFormFields['firstName'] = nameSplit[0];
        }else{
            oldFormFields[name] = value;
        }

        if(name === 'phone'){
            if(!await new CustomerService().getCustomerExist(value)){
                setErrorMsg('Customer already exist');
                setError(true);
                setTimeout(function(){
                    setError(false);
                }, 3000);
                setBtnState(false);
                return false;
            }
        }

        if((oldFormFields.firstName !== '' || oldFormFields.firstName !== null) && (oldFormFields.phone !== '' && oldFormFields.phone !== null)){
            setBtnState(true);
        }

        setFormFields(oldFormFields);
    };

    const openState = props.openCustomerAddState;

    const addCustomerHandler = async () => {
        await new CustomerService().addCustomer(formFields);

        props.setCustomer();
    };

    return (
        <div>
            <MainDialog
                footer={
                    (
                        <Button
                            variant="outlined"
                            style={{
                                backgroundColor: '#DAAB59',
                                border: 'none',
                                color: '#333333',
                                padding: '5px 58px',
                                textTransform: 'none',
                                fontSize: '17px'
                            }}
                            onClick={addCustomerHandler.bind(this)}
                            disabled={!btnState}
                            className={`mx-auto text-center`}
                        >
                            Finish
                        </Button>
                    )
                }
                title={`Add new customer`}
                handleDialogClose={props.handleClose}
                states={openState}
            >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <SimpleSnackbar
                        type="warning"
                        openState={error}
                        message={errorMsg}
                    >
                    </SimpleSnackbar>

                    <PrimaryTextField
                        name="name"
                        label="Name"
                        type="text"
                        value={formFields.name}
                        getValue={setInputValue.bind(this)}
                    >
                        <PersonIcon style={{color: '#DAAB59'}} />
                    </PrimaryTextField>

                    <PrimaryTextField
                        name="phone"
                        label="Contact"
                        type="number"
                        value={formFields.contact}
                        getValue={setInputValue.bind(this)}
                    >
                        <CallIcon style={{color: '#DAAB59'}} />
                    </PrimaryTextField>

                    <PrimaryTextField
                        name="location"
                        label="Location"
                        type="text"
                        value={formFields.location}
                        getValue={setInputValue.bind(this)}
                    >
                        <LocationOnIcon style={{color: '#DAAB59'}} />
                    </PrimaryTextField>
                </div>
            </MainDialog>
        </div>
    )
};

export default AddCustomerModal;
