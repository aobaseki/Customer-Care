import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button/Button";
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../../../components/Modal/Modal';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
        fontSize: 11,
           },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '80%',
        marginLeft: '25px',
    },
    paper2: {
        padding: theme.spacing(1),
        textAlign: 'center',
        width: '95%',
        marginTop: '20px',
    },
    paper3: {
        
        textAlign: 'left',
        width: '98%',
        marginTop: '20px',
        marginBottom: '40px',
    },
    dateInput: {
        borderBottomStyle: 'solid'
    }
}));

const ViewCashIn = props => {

    const classes = useStyles();
    const [mainDialog, setMainDialog] = React.useState(false);
    const [user, setUser] = React.useState(props.defaultUser);
    const items = props.items;
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
      setSelectedDate(date);
    };

    const handleChange = event => {
        setUser(event.target.value);
    };

    const handAnotherChange = e => {
        props.handAchange(e);
    };

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (e, keyItem) => {
        setMainDialog(true);
    };

    const submit = e => {
        props.addItem(e);
    };

    const handChange = e => {
        props.handle(e);
    };
    

    return(
        <div>
            <Typography className='text-dark font-weight-bold' style={{ fontSize: '15px', marginBottom: '10px', marginTop: '10px' }} >
                {props.topic}
            </Typography>

            <Paper variant="outlined" className={classes.paper}>

                <form noValidate autoComplete="off" onSubmit={submit.bind(this)} >
                    <TextField 
                        id="outlined-basic" 
                        name="amount"
                        label="Amount of cash" 
                        variant="outlined" 
                        size="small" 
                        onChange={handChange.bind(this)}
                        value={props.amtValue}
                        style={{margin: '25px 0px 50px 0px'}} 
                    />

                    <TextField
                        id="outlined-select-receive-native"
                        select
                        size="small"
                        name="receipt"
                        label={props.labels}
                        value={user}
                        style={{width: '200px', marginBottom: '40px'}}
                        onChange={handleChange}
                        color="#DAAB59"
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        >
                        {props.values.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>

                    <Button
                        type="submit"
                        variant="outlined"
                        style={{
                            border: '1px solid', 
                            color: '#DAAB59', 
                            padding: '4px 50px', 
                            marginBottom: '15px', 
                            textTransform: 'none', 
                            fontSize:'15px'}}
                    >
                            Save
                    </Button>
                </form>
            </Paper>

            <Paper variant="outlined" className={classes.paper2}>
                <Typography className='text-dark font-weight-bold' style={{ fontSize: '16px', margin: '20px, 0px' }} >
                    Saved collection(s) for today
                </Typography>

                {/* <Typography style={{ fontSize: '18px', padding: '50px', marginBottom: '30px', fontStyle: 'italic'}} >
                    No saved collections today
                </Typography> */}
                
                {items.map((item) =>
                
                    <Paper variant="outlined" className={classes.paper3} key={item.key} >
                        <Typography  style={{ fontSize: '16px',  padding: '10px' }} >
                            {item.amount} cedis from &nbsp;&nbsp;&nbsp; {item.date} 
                            <EditIcon onClick={openDialogHandler.bind(this, item.key)} style={{float: 'right'}} />
                            {/* <DeleteIcon onClick={deleteHistoryHandler.bind(this, item.key)} style={{float: 'right'}} /> */}
                        </Typography> 
                    </Paper> 
                )}
            </Paper>

            <Modal 
                handleClose={closeDialogHandler.bind(this)} 
                states={mainDialog} 
                title={
                    <Typography
                
                        style={{fontSize: '20px' }}
                        className={`text-center  w-100 text-dark font-weight-bold`}
                    >
                        Edit
                    </Typography>
                }
                footer={
                    <div className="text-center mx-auto my-3">
                        <Button
                            variant="outlined"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 30px', textTransform: 'none', fontSize:'17px'}}
                        >
                            Save
                        </Button>
                    </div>
                }
            >
                <div className="row p-3 pt-0 mx-auto text-center w-100" >
                    <div className="text-center mx-auto my-3">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={classes.dateInput}
                                disableToolbar
                                variant="outlined"
                                format="dd/MM/yyyy"
                                margin="normal"
                                size="small"
                                id="date-picker"
                                label="Change date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <TextField 
                            id="outlined-basic" 
                            name="amount"
                            onChange={handAnotherChange.bind(this)}
                            value={props.amtValue}
                            label="Edit amount" 
                            variant="outlined" 
                            size="small" 
                            style={{margin: '25px 0px 10px 0px'}} 
                        />
                    </div>
                </div>
            </Modal>


        </div>
    )
}

export default ViewCashIn;