import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import clsx from 'clsx';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: 'green',
        }
    },
    checkedIcon: {
        backgroundColor: green[400],
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: green[400],
        },
    },
});

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const ViewCash = props => {
    const [value, setValue] = React.useState(props.initialValue);

    const [formFields , setFormFields] = useState({
        customer: props.customerId,
        type: value,
        amountPaid: '',
        changeDue: 0,
        /*amountGiven: '',*/
    });

    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setValue(parseFloat(event.target.value));
        const {...oldFormFields} = formFields;
        oldFormFields['type'] = event.target.value;
        setFormFields(oldFormFields)
        console.log(oldFormFields)

        props.getFormFields(oldFormFields);
    };

    const setInputValue = (event) => {
        event.persist();
        console.log(formFields)

        const name = event.target.name;
        const value = event.target.value;
        const {...oldFormFields} = formFields;

        /*if(name === 'amountGiven'){
            changeDue = (parseFloat(value) - (parseFloat(formFields.amountPaid) || 0)).toFixed(2) || 0;
        }else{
            changeDue = (parseFloat(formFields.amountGiven) - (parseFloat(value) || 0)).toFixed(2) || 0;
        }*/
        const changeDue = (parseFloat(value) - parseFloat(props.cartAmount)).toFixed(2);
        oldFormFields[name] = value;

        if(changeDue > 0){
            oldFormFields['changeDue'] = changeDue;
        }

        setFormFields(oldFormFields);
        console.log(oldFormFields)

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
                        <PersonAddIcon style={{fontSize: '30px',  color: '#DAAB59', marginTop: '30px', position: 'absolute', marginLeft: '15px'}} />
                    </Tooltip>


                    <Grid container  style={{textAlign: 'left', marginLeft: '5px'}}  >
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{marginLeft: '30px'}}>Payment method</FormLabel>

                            <RadioGroup aria-label="payment" name="payment" value={value} onChange={handleRadioChange.bind(this)}>
                                <Grid item xs={6}>
                                    <FormControlLabel value={2} control={<StyledRadio />} label="Credit" style={{marginLeft: '20px'}}/>
                                    <FormControlLabel value={3} control={<StyledRadio />} label="Cheque" style={{marginLeft: '20px'}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel value={1} control={<StyledRadio />} label="Mobile money" />
                                    <FormControlLabel value={4}  control={<StyledRadio />} label="Debit/VISA card" />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {/*<TextField
                        label="Amount Given"
                        variant="outlined"
                        size="small"
                        name={`amountGiven`}
                        onChange={(event) => setInputValue(event)}
                        value={formFields['amountGiven']}
                        style={{margin: '25px 25px 10px'}}
                    />*/}

                    <TextField
                        label="Amount Paid"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setInputValue(event)}
                        name={`amountPaid`}
                        value={formFields['amountPaid']}
                        style={{margin: '25px 25px'}}
                    />
                </form>
            </Paper>
        </div>
    );
};

export default ViewCash;
