import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        padding: `13px 5px !important`
    },
    iconButton: {
        padding: `24px 5px !important`
    }
}));

const PrimaryTextField = props => {
    const classes = useStyles();
    const inputName = props.name;
    const [value , setValue] = useState(props.initialValue || '');

    const setValueHandler = (event) => {
        setValue(event.target.value)
        props.getValue(inputName , event.target.value);
    };

    return(
        <div className="text-center mx-auto my-3">
            <TextField
                type={props.type}
                variant="outlined"
                label={props.label}
                name={props.name}
                value={value}
                onChange={(event) => setValueHandler(event)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            classes={{
                                root: classes.iconButton
                            }}
                            position="start"
                        >
                            {props.children}
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default PrimaryTextField;
