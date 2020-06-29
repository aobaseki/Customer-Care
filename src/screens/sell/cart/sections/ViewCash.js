import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const ViewCash = props => {
    const [formFields , setFormFields] = useState({
        amountPaid: '',
        changeDue: '',
        customer: props.customerId,
        type: 0
    });

    const setInputValue = (event) => {
        event.persist();

        const name = event.target.name;
        const value = event.target.value;
        const {...oldFormFields} = formFields;

        const changeDue = (parseFloat(value) - parseFloat(props.cartAmount)).toFixed(2);
        oldFormFields[name] = value;
        oldFormFields['changeDue'] = changeDue;

        setFormFields(oldFormFields);
        props.getFormFields(oldFormFields);
    };

    return(
        <div>
            <Paper elevation={3}>
                <form noValidate autoComplete="off">
                    <TextField
                        disabled={true}
                        value={props.currentCustomer}
                        label="Customer"
                        variant="outlined"
                        size="small"
                        style={{margin: '25px 0px 25px 0px'}}
                        onClick={props.openAddCustomerModal}
                    />

                    <Tooltip title="Add new" onClick={props.openAddCustomerModal}>
                        <PersonAddIcon style={{fontSize: '30px',  color: '#DAAB59', marginTop: '30px', position: 'absolute', marginLeft: '15px'}}/>
                    </Tooltip>

                    <TextField
                        label="Amount Paid"
                        variant="outlined"
                        size="small"
                        type="tel"
                        onChange={(event) => setInputValue(event)}
                        name={`amountPaid`}
                        value={formFields['amountPaid']}
                        style={{margin: '25px'}}
                    />

                    <TextField
                        label="Change Due"
                        variant="outlined"
                        size="small"
                        disabled={true}
                        name={`changeDue`}
                        value={formFields['changeDue']}
                        style={{margin: '25px 25px 50px 25px'}}
                    />
                </form>
            </Paper>
        </div>
    );
};

export default ViewCash;
