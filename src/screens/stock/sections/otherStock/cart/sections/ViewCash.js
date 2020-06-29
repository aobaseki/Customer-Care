import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button/Button";
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    button: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '5px 50px',
        marginRight: '10px',
        marginTop: '10px',
        textTransform: 'none',
    },
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
}));

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

    const classes = useStyles();
    const [value, setValue] = React.useState('gift');
    const [check , setCheck] = useState(false);
    const [formFields , setFormFields] = useState({
        amountPaid: '',
        changeDue: '',
        customer: props.customerId,
        salesType: value,
        type: 0
    });

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!check) {
            getAmtPaid();
        }
    });

    const getAmtPaid = async () => {
        setCheck(true);
        const {...oldFormFields} = formFields;
        oldFormFields['changeDue'] = 0;
        oldFormFields['amountPaid'] = parseFloat(props.cartAmount).toFixed(2)
        setFormFields(oldFormFields);
        // props.getFormFields(oldFormFields);
    }

    const handleRadioChange = (event) => {
        console.log(event.target.value)
        setValue(parseFloat(event.target.value));
        const {...oldFormFields} = formFields;
        oldFormFields['salesType'] = event.target.value;
        setFormFields(oldFormFields)
        console.log(oldFormFields)

        //props.getFormFields(oldFormFields);
    };

    return(
        <div>
            <Paper elevation={3}>

                <Typography className='text-dark font-weight-bold' style={{ marginTop: '20px', fontSize: '18px' }} >
                    What will the stock be used as?
                </Typography>

                <Grid container  style={{textAlign: 'left', marginLeft: '5px'}}  >

                    <FormControl component="fieldset">
                    <RadioGroup aria-label="payment" name="payment" value={value} onChange={handleRadioChange.bind(this)}>
                       
                        
                            <Grid item xs={12} >
                                <FormControlLabel value={'gift'} control={<StyledRadio />} label="Gift" style={{display: 'block', marginBottom: '10px', marginLeft: '20px'}}/>
                            </Grid>
                                
                            <Grid item xs={12} >
                                <FormControlLabel value={'family'} control={<StyledRadio />} label="Family" style={{display: 'block', marginBottom: '10px', marginLeft: '20px'}}/>
                            </Grid>

                            <Grid item xs={12} >
                                <FormControlLabel value={'damaged'} control={<StyledRadio />} label="Damaged" style={{display: 'block', marginBottom: '10px', marginLeft: '20px'}}/>
                            </Grid>

                            <Grid item xs={12} >
                                <FormControlLabel value={'expired'} control={<StyledRadio />} label="Expired" style={{display: 'block', marginBottom: '10px', marginLeft: '20px'}}/>
                            </Grid>
                      
                    </RadioGroup>
                    </FormControl>
                </Grid>

                <Button
                    variant="outlined"
                    style={{fontSize: '16px', marginBottom: '10px'}}
                    className={classes.button}
                    onClick={props.openAddCustomerModal}
                >
                    {props.currentCustomer === 'Cash Customer' ? <PersonAddIcon /> : ''}
                    {props.currentCustomer}
                </Button>


            </Paper>
        </div>
    );
};

export default ViewCash;
