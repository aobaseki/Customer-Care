import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const MaterialUIPickers= (props) => {
    const getDate = props.initialDate ? new Date(props.initialDate) : new Date();
    const [selectedDate, setSelectedDate] = React.useState(getDate);

    const handleDateChange = async date => {
        props.getValue(date);
        setSelectedDate(new Date(date));
    };

    return (
         <MuiPickersUtilsProvider utils={DateFnsUtils} style={{
             padding: '2px 10px',
             backgroundColor: '#FFFFFF'
         }}>
             <KeyboardDatePicker
                 disableToolbar
                 variant="outlined"
                 format="dd/MM/yyyy"
                 margin="normal"
                 disableFuture={true}
                 className='text-dark font-weight-bold my-1'
                 style={{...props.style, padding: '3px 0px', paddingLeft: '20px', border: '1px solid #e5e5e5', backgroundColor: '#FFFFFF', float: 'center', fontWeight: '400', fontSize: '18px' , lineHeight: '1.6' , marginTop: '2px'}}
                 size='small'
                 value={selectedDate}
                 onChange={handleDateChange}
                 KeyboardButtonProps={{
                     'aria-label': 'change date',
                 }}
             />
         </MuiPickersUtilsProvider>
    );
}

export default MaterialUIPickers;
