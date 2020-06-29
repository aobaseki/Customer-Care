import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const StyledFormControlLabel = withStyles({
  label: {
    fontSize: '11px',
  },
})(FormControlLabel);

const CheckboxLabels = props => {
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (  
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
            icon={<CheckCircleOutlineIcon />} 
            checkedIcon={<CheckCircleIcon />}
          />
        }
        label={props.label}
      />
  );
}
export default CheckboxLabels;
