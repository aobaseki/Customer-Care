import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    padding: {
        padding: '6px 5px',
        minWidth: '250px',
    },
}));

const PrimarySelect = props => {
    const classes = useStyles();
    const selectData = props.data;
    const [value,setValue] = useState(props.initialValue ? props.initialValue.value : selectData[0].value);

    const handleChange = event => {
        setValue(event.target.value);
        props.getValue(props.name , event.target.value);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={handleChange}
                label={props.label}
                className={`${classes.padding}`}
            >
                {
                    selectData.map((option) => <MenuItem value={option.value}>{option.name}</MenuItem>)
                }

            </Select>
        </FormControl>
    );

};

export default PrimarySelect;
