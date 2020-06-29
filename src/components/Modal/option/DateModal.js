import MainDialog from "../Modal";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const AddCustomerModal = props => {

    const openState = props.openDateDialog;
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
        // getSaleDetails(date);
      };

    return (
        <div>
            <MainDialog 
                handleClose={props.handleClose} 
                states={openState}
                title={
                    <Typography
                        component="h2"
                        variant="h5"
                        style={{fontSize: '18px', width: "90%"}}
                        className={`text-center mb-2 mx-auto w-100 text-dark font-weight-bold`}
                    >
                        Assign date
                    </Typography>
                }
                footer={
                    <div className="text-center mx-auto">
                        <Button
                            variant="outlined"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '7px 50px', textTransform: 'none', fontSize:'17px'}}
                            onClick={props.onClick}
                        >
                            Next
                        </Button>
                    </div>
                }
            >
                <div className="row p-3 pt-0 mx-auto text-center w-100" >
                   
                    <div style={{margin: '20px 0px'}}>
                        <label className={`text-center`} style={{fontSize: '15px', marginBottom: '10px'}}> Date of sale</label>
                    </div>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="outlined"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker"
                            className='text-dark font-weight-bold'
                            style={{float: 'right', width: '140px',  border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6'}}
                            size='small'
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>                   

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 20px', margin: '20px 0px', textTransform: 'Capitalize'}}
                        
                    >
                        I do not remember the date
                    </Button> 

                </div>
            </MainDialog>
        </div>
    )
};

export default AddCustomerModal;
